// Develop without hardware: pnpm dev --theme <name> --mock
import { registerTheme, onConnect, onDisconnect } from "@emulnk/sdk";
import { mount } from "svelte";
import App from "./App.svelte";
import "./style.scss";
import { appState } from "./state.svelte.js";

interface GameData {
  party_count: number;
  [key: string]: unknown;
}

mount(App, { target: document.getElementById("app")! });

onConnect(() => {
  appState.isConnected = true;
});

onDisconnect(() => {
  appState.isConnected = false;
});

registerTheme<GameData>({
  onUpdate({ isConnected, values, settings, system, confidence }) {
    appState.isConnected = isConnected;
    appState.values = values;
    appState.settings = settings;
    appState.batteryLevel = system.battery.level;
    appState.confidence = confidence;
  },
  onGameClosed() {
    appState.isConnected = false;
    appState.values = {} as GameData;
  },
});
