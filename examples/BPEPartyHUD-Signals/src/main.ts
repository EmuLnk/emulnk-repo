import { signal, effect } from "@preact/signals-core"; // emulink-allow: signals-only, no VDOM
import { registerTheme } from "@emulink/sdk";
import type { BPEValues, Pokemon, BPESettings } from "./types.js";
import { processParty } from "./parser.js";
import { renderDetail, renderPartyBar } from "./renderer.js";

// Reactive state
const party = signal<(Pokemon | null)[]>([null, null, null, null, null, null]);
const partyCount = signal(0);
const selectedSlot = signal(0);
const settings = signal<BPESettings>({ show_ivs: true, show_evs: true, show_moves: true });

// Auto-render when any signal changes
effect(() => {
  renderPartyBar(party.value, partyCount.value, selectedSlot.value, (idx) => {
    selectedSlot.value = idx;
  });
  renderDetail(party.value[selectedSlot.value] ?? null, partyCount.value, settings.value);
});

registerTheme<BPEValues>({
  onUpdate(payload) {
    settings.value = {
      show_ivs: payload.settings.show_ivs !== "false",
      show_evs: payload.settings.show_evs !== "false",
      show_moves: payload.settings.show_moves !== "false",
    };

    document.body.classList.toggle("offline", !payload.isConnected);
    document.getElementById("status")!.textContent =
      payload.isConnected ? "Connected" : "Offline";

    const result = processParty(payload.values, party.value, partyCount.value);
    partyCount.value = result.count;
    party.value = result.party;

    if (selectedSlot.value >= result.count && result.count > 0) {
      selectedSlot.value = 0;
    }
  },

  onGameClosed() {
    document.body.classList.add("offline");
    document.getElementById("status")!.textContent = "Game closed";
    party.value = [null, null, null, null, null, null];
    partyCount.value = 0;
    selectedSlot.value = 0;
  },
});
