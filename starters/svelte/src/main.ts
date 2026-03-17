import { registerTheme } from "@emulink/sdk";
import { mount } from "svelte";
import App from "./App.svelte";
import "./style.scss";
import { appState } from "./state.svelte.js";

interface GameData {
  gameTitle: string;
  [key: string]: unknown;
}

mount(App, { target: document.getElementById("app")! });

registerTheme<GameData>({
  onUpdate({ isConnected, values, settings }) {
    appState.isConnected = isConnected;
    appState.values = values;
    appState.settings = settings;
  },
  onGameClosed() {
    appState.isConnected = false;
    appState.values = {} as GameData;
  },
});
