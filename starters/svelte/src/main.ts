import { registerTheme } from "@emulink/sdk";
import { mount } from "svelte";
import App from "./App.svelte";
import "./style.scss";

interface GameData {
  gameTitle: string;
  [key: string]: unknown;
}

const app = mount(App, { target: document.getElementById("app")! });

registerTheme<GameData>({
  onUpdate({ isConnected, values, settings }) {
    app.isConnected = isConnected;
    app.values = values;
    app.settings = settings;
  },
  onGameClosed() {
    app.isConnected = false;
    app.values = {} as GameData;
  },
});
