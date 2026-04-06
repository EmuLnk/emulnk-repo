import { registerTheme, decodeBase64 } from "@emulink/sdk";
import { mount } from "svelte";
import App from "./App.svelte";
import "./style.scss";
import type { BPREValues, BattleState, Pokemon, BagBall } from "./lib/types.js";
import { appState } from "./lib/state.svelte.js";
import { MAP_NAMES } from "./lib/map-names.js";
import { loadNuzlockeData, processNuzlockeFrame, snapshotOwnedDex } from "./lib/nuzlocke.svelte.js";
import { setRomTables } from "./lib/rom-tables.js";
import { romTablesTransform, partyTransform, battleTransform } from "@emulink/sdk/transforms/gen3";
import type { Gen3RomTables, Gen3Pokemon, Gen3BattleState } from "@emulink/sdk/transforms/gen3";

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

const SAVE1_REGION = 0x02025200;
const BAG_POKEBALLS_OFFSET = 0x0430;
const BAG_POKEBALLS_COUNT = 13;
const SAVE2_LO_REGION = 0x02024500;
const SAVE2_HI_REGION = 0x02025400;
const SAFARI_MAP_KEYS = new Set(["1:63", "1:64", "1:65", "1:66"]);

registerTheme<BPREValues>({
  transforms: [romTablesTransform, partyTransform, battleTransform],
  onUpdate({ isConnected, values, settings }) {
    try {
      appState.isConnected = isConnected;
      appState.settings = settings;

      if (!isConnected) return;

      const romTables = values.rom_tables as Gen3RomTables | undefined;
      if (romTables != null) setRomTables(romTables);

      // Party from transform (with anti-flicker: keep previous if count drops to 0)
      const transformParty = values.party as (Gen3Pokemon | null)[] | undefined;
      const newCount = Math.max(0, Math.min((values.party_count as number) || 0, 6));
      if (transformParty && (newCount > 0 || partyCount === 0)) {
        currentParty = transformParty;
        partyCount = newCount;
      }
      appState.party = [...currentParty] as (Pokemon | null)[];

      const battle = (values.battle as Gen3BattleState | undefined) ?? {
        active: false, isTrainer: false, isSafari: false, isDoubles: false,
        player: null, enemy: null, player2: null, enemy2: null,
        field: { weather: 'none', weatherRaw: 0, playerSide: { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 }, enemySide: { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 } },
      };
      appState.battleState = battle as BattleState;

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
            ...appState.mapState,
            mapGroup,
            mapNum,
            mapKey,
            mapName: MAP_NAMES[mapKey] ?? "Unknown",
          };
        }

        // Parse Poké Balls bag pocket (13 slots × 4 bytes at SaveBlock1+0x0430)
        const ballsStart = off + BAG_POKEBALLS_OFFSET;
        const ballsEnd = ballsStart + BAG_POKEBALLS_COUNT * 4;
        if (ballsEnd <= block.length) {
          const dv = new DataView(block.buffer, block.byteOffset, block.byteLength);
          const balls: BagBall[] = [];
          for (let i = 0; i < BAG_POKEBALLS_COUNT; i++) {
            const slotOff = ballsStart + i * 4;
            const itemId = dv.getUint16(slotOff, true);
            const quantity = dv.getUint16(slotOff + 2, true);
            if (itemId > 0 && quantity > 0) {
              balls.push({ itemId, quantity });
            }
          }
          appState.bagBalls = balls;
        }
      }

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
          appState.mapState.playerGender = save2Block[off + 0x08]; // 0=male, 1=female
        }
      }
      // Safari Zone state
      const inZone = SAFARI_MAP_KEYS.has(appState.mapState.mapKey);
      let catchFactor = 0, escapeFactor = 0, rockCounter = 0, baitCounter = 0;
      if (battle.isSafari && values.safari_battle_state) {
        const sb = decodeBase64(values.safari_battle_state);
        if (sb.length >= 4) {
          rockCounter = sb[0];   // +0x79
          baitCounter = sb[1];   // +0x7A
          escapeFactor = sb[2];  // +0x7B
          catchFactor = sb[3];   // +0x7C
        }
      }
      appState.safariState = {
        ballsLeft: values.safari_balls ?? 0,
        stepsLeft: values.safari_steps ?? 0,
        catchFactor,
        escapeFactor,
        rockCounter,
        baitCounter,
        inZone,
      };

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
      console.log("[BPGE] ERROR: " + String(e));
    }
  },

  onGameClosed() {
    appState.isConnected = false;
    partyCount = 0;
    currentParty = [null, null, null, null, null, null];
    appState.party = [...currentParty];
    appState.battleState = {
      active: false, isTrainer: false, isSafari: false, isDoubles: false,
      player: null, enemy: null, player2: null, enemy2: null,
      field: {
        weather: 'none', weatherRaw: 0,
        playerSide: { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 },
        enemySide: { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 },
      },
    };
    appState.mapState = { mapGroup: 0, mapNum: 0, mapKey: "0:0", mapName: "Unknown", playerGender: 0 };
    appState.dexState = { owned: new Set(), seen: new Set() };
    appState.bagBalls = [];
    appState.safariState = {
      ballsLeft: 0, stepsLeft: 0,
      catchFactor: 0, escapeFactor: 0, rockCounter: 0, baitCounter: 0, inZone: false,
    };
  },
});
