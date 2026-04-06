import { render } from "solid-js/web";
import { createSignal } from "solid-js";
import { registerTheme } from "@emulnk/sdk";
import type { BPEValues, Pokemon, BPESettings } from "./types.js";
import { processParty } from "./parser.js";
import App from "./App.js";

const [party, setParty] = createSignal<(Pokemon | null)[]>([null, null, null, null, null, null]);
const [partyCount, setPartyCount] = createSignal(0);
const [selectedSlot, setSelectedSlot] = createSignal(0);
const [settings, setSettings] = createSignal<BPESettings>({ show_ivs: true, show_evs: true, show_moves: true });
const [offline, setOffline] = createSignal(false);
const [statusText, setStatusText] = createSignal("Waiting for data...");

render(
  () => <App
    party={party()}
    partyCount={partyCount()}
    selectedSlot={selectedSlot()}
    settings={settings()}
    offline={offline()}
    statusText={statusText()}
    onSelectSlot={setSelectedSlot}
  />,
  document.getElementById("app")!,
);

registerTheme<BPEValues>({
  onUpdate(payload) {
    setSettings({
      show_ivs: payload.settings.show_ivs !== "false",
      show_evs: payload.settings.show_evs !== "false",
      show_moves: payload.settings.show_moves !== "false",
    });

    setOffline(!payload.isConnected);
    setStatusText(payload.isConnected ? "Connected" : "Offline");

    const result = processParty(payload.values, party(), partyCount());
    setParty(result.party);
    setPartyCount(result.count);

    if (selectedSlot() >= result.count && result.count > 0) {
      setSelectedSlot(0);
    }
  },

  onGameClosed() {
    setOffline(true);
    setStatusText("Game closed");
    setParty([null, null, null, null, null, null]);
    setPartyCount(0);
    setSelectedSlot(0);
  },
});
