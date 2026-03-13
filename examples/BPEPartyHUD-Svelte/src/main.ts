import { registerTheme } from "@emulink/sdk";
import type { BPEValues, Pokemon } from "./types.js";
import { processParty } from "./parser.js";
import { mount } from "svelte";
import App from "./App.svelte";

// Shared reactive state - Svelte 5 runes only work inside .svelte files,
// so we use a plain object that the App component reads.
export const state = {
  party: [null, null, null, null, null, null] as (Pokemon | null)[],
  partyCount: 0,
  selectedSlot: 0,
  settings: { show_ivs: true, show_evs: true, show_moves: true },
  offline: false,
  statusText: "Waiting for data...",
};

let onStateChange: (() => void) | null = null;
export function subscribe(fn: () => void) { onStateChange = fn; }

mount(App, { target: document.getElementById("app")! });

registerTheme<BPEValues>({
  onUpdate(payload) {
    state.settings.show_ivs = payload.settings.show_ivs !== "false";
    state.settings.show_evs = payload.settings.show_evs !== "false";
    state.settings.show_moves = payload.settings.show_moves !== "false";

    state.offline = !payload.isConnected;
    state.statusText = payload.isConnected ? "Connected" : "Offline";

    const result = processParty(payload.values, state.party, state.partyCount);
    state.party = result.party;
    state.partyCount = result.count;

    if (state.selectedSlot >= state.partyCount && state.partyCount > 0) {
      state.selectedSlot = 0;
    }

    onStateChange?.();
  },

  onGameClosed() {
    state.offline = true;
    state.statusText = "Game closed";
    state.party = [null, null, null, null, null, null];
    state.partyCount = 0;
    state.selectedSlot = 0;
    onStateChange?.();
  },
});
