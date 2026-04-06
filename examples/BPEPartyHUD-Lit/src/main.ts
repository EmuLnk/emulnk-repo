import { registerTheme } from "@emulnk/sdk";
import type { BPEValues } from "./types.js";
import { processParty } from "./parser.js";
import type { PartyHud } from "./party-hud.js";
import "./party-hud.js";

// State
let partyData: (import("./types.js").Pokemon | null)[] = [null, null, null, null, null, null];
let partyCount = 0;

function getHud(): PartyHud {
  return document.querySelector("party-hud")! as PartyHud;
}

registerTheme<BPEValues>({
  onUpdate(payload) {
    const hud = getHud();

    hud.settings = {
      show_ivs: payload.settings.show_ivs !== "false",
      show_evs: payload.settings.show_evs !== "false",
      show_moves: payload.settings.show_moves !== "false",
    };

    hud.offline = !payload.isConnected;
    hud.statusText = payload.isConnected ? "Connected" : "Offline";

    const result = processParty(payload.values, partyData, partyCount);
    partyData = result.party;
    partyCount = result.count;

    hud.party = [...partyData];
    hud.partyCount = partyCount;

    // Auto-select first occupied slot if current is invalid
    if (hud.selectedSlot >= partyCount && partyCount > 0) {
      hud.selectedSlot = 0;
    }
  },

  onGameClosed() {
    const hud = getHud();
    hud.offline = true;
    hud.statusText = "Game closed";
    partyData = [null, null, null, null, null, null];
    partyCount = 0;
    hud.party = [...partyData];
    hud.partyCount = 0;
    hud.selectedSlot = 0;
  },
});
