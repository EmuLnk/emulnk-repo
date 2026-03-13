import { registerTheme } from "@emulink/sdk";
import type { BPEValues, BPESettings, Pokemon } from "./types.js";
import { processParty } from "./parser.js";
import { renderDetail, renderPartyBar } from "./renderer.js";

// State
let selectedSlot = 0;
let partyData: (Pokemon | null)[] = [null, null, null, null, null, null];
let partyCount = 0;
const settings: BPESettings = { show_ivs: true, show_evs: true, show_moves: true };

function render(): void {
  renderPartyBar(partyData, partyCount, selectedSlot, (idx) => {
    selectedSlot = idx;
    render();
  });
  renderDetail(partyData[selectedSlot] ?? null, partyCount, settings);
}

registerTheme<BPEValues>({
  onUpdate(payload) {
    settings.show_ivs = payload.settings.show_ivs !== "false";
    settings.show_evs = payload.settings.show_evs !== "false";
    settings.show_moves = payload.settings.show_moves !== "false";

    document.body.classList.toggle("offline", !payload.isConnected);
    document.getElementById("status")!.textContent =
      payload.isConnected ? "Connected" : "Offline";

    const result = processParty(payload.values, partyData, partyCount);
    partyData = result.party;
    partyCount = result.count;

    // Auto-select first occupied slot if current is invalid
    if (selectedSlot >= partyCount && partyCount > 0) {
      selectedSlot = 0;
    }

    render();
  },

  onGameClosed() {
    document.body.classList.add("offline");
    document.getElementById("status")!.textContent = "Game closed";
    partyData = [null, null, null, null, null, null];
    partyCount = 0;
    selectedSlot = 0;
    render();
  },
});
