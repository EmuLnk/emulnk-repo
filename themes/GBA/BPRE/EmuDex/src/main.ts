import { registerTheme, decodeBase64 } from "@emulink/sdk";
import { mount } from "svelte";
import App from "./App.svelte";
import "./style.scss";
import type { BPREValues, BattleState, Pokemon } from "./lib/types.js";
import { processParty } from "./lib/parser.js";
import { parseBattle } from "./lib/battle-parser.js";
import { appState } from "./lib/state.svelte.js";
import { MAP_NAMES } from "./lib/map-names.js";
import { loadNuzlockeData, processNuzlockeFrame, snapshotOwnedDex } from "./lib/nuzlocke.svelte.js";
import { initRomTables } from "./lib/rom-tables.js";

let prevBattleActiveForNuz = false;

mount(App, { target: document.getElementById("app")! });

let partyCount = 0;
let currentParty: (Pokemon | null)[] = [null, null, null, null, null, null];

function decodeDexFlags(bytes: Uint8Array, offset: number, size: number): Set<number> {
  const set = new Set<number>();
  for (let i = 0; i < size * 8; i++) {
    if (bytes[offset + (i >> 3)] & (1 << (i & 7))) set.add(i + 1); // species are 1-indexed
  }
  return set;
}

// EWRAM region bases — must match profile bundle addresses
const SAVE1_REGION = 0x02025200;
const SAVE2_LO_REGION = 0x02024500;
const SAVE2_HI_REGION = 0x02025400;

registerTheme<BPREValues>({
  onUpdate({ isConnected, values, settings }) {
    console.log("[BPRE] connected=" + isConnected + " party=" + values.party_count + " in_battle=" + values.in_battle + " save1_ptr=0x" + (values.save1_ptr ?? 0).toString(16) + " save2_ptr=0x" + (values.save2_ptr ?? 0).toString(16));

    try {
      appState.isConnected = isConnected;
      appState.settings = settings;

      if (!isConnected) return;

      // Initialize ROM tables once (species names, NatDex, moves, abilities, items, catch rates)
      initRomTables(values);

      const result = processParty(values, currentParty, partyCount);
      currentParty = result.party;
      partyCount = result.count;
      appState.party = [...currentParty];

      const battle: BattleState = parseBattle(values);
      appState.battleState = battle;

      // Manual pointer dereference for save1 (map data)
      const save1Ptr = values.save1_ptr ?? 0;
      if (save1Ptr >= SAVE1_REGION && values.save1_block) {
        const block = decodeBase64(values.save1_block);
        const off = save1Ptr - SAVE1_REGION;
        if (off + 6 <= block.length) {
          const mapGroup = block[off + 0x04];
          const mapNum = block[off + 0x05];
          const mapKey = `${mapGroup}:${mapNum}`;
          appState.mapState = {
            mapGroup,
            mapNum,
            mapKey,
            mapName: MAP_NAMES[mapKey] ?? "Unknown",
          };
        }
      }

      // Manual pointer dereference for save2 (dex data)
      const save2Ptr = values.save2_ptr ?? 0;
      let save2Block: Uint8Array | null = null;
      let save2Base = 0;
      if (save2Ptr >= SAVE2_HI_REGION && values.save2_hi_block) {
        save2Block = decodeBase64(values.save2_hi_block);
        save2Base = SAVE2_HI_REGION;
      } else if (save2Ptr >= SAVE2_LO_REGION && values.save2_lo_block) {
        save2Block = decodeBase64(values.save2_lo_block);
        save2Base = SAVE2_LO_REGION;
      }
      if (save2Block) {
        const off = save2Ptr - save2Base;
        if (off + 0x90 <= save2Block.length) {
          appState.dexState.owned = decodeDexFlags(save2Block, off + 0x28, 52);
          appState.dexState.seen = decodeDexFlags(save2Block, off + 0x5C, 52);
        }
      }
      // Nuzlocke tracking
      const nuzEnabled = settings["nuzlocke-mode"] === "true";
      loadNuzlockeData(settings["nuzlocke-data"]);
      const isWildBattle = battle.active && !battle.isTrainer;
      if (nuzEnabled && isWildBattle && !prevBattleActiveForNuz) {
        // Snapshot owned dex at wild battle start for catch detection
        snapshotOwnedDex(appState.dexState.owned);
      }
      prevBattleActiveForNuz = battle.active;
      processNuzlockeFrame(
        appState.party,
        battle,
        appState.mapState.mapKey,
        appState.dexState.owned,
        nuzEnabled,
      );
    } catch (e) {
      console.log("[BPRE] ERROR: " + String(e));
    }
  },

  onGameClosed() {
    appState.isConnected = false;
    partyCount = 0;
    currentParty = [null, null, null, null, null, null];
    appState.party = [...currentParty];
    appState.battleState = {
      active: false, isTrainer: false, isDoubles: false,
      player: null, enemy: null, player2: null, enemy2: null,
      field: {
        weather: 'none', weatherRaw: 0,
        playerSide: { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 },
        enemySide: { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 },
      },
    };
    appState.mapState = { mapGroup: 0, mapNum: 0, mapKey: "0:0", mapName: "Unknown" };
    appState.dexState = { owned: new Set(), seen: new Set() };
  },
});
