import { render } from "solid-js/web";
import { registerTheme } from "@emulink/sdk";
import App, { setIsConnected, setValues, setSettings } from "./App";
import "./style.scss";

interface GameData {
  gameTitle: string;
  [key: string]: unknown;
}

render(() => <App />, document.getElementById("app")!);

registerTheme<GameData>({
  onUpdate({ isConnected, values, settings }) {
    setIsConnected(isConnected);
    setValues(values);
    setSettings(settings);
  },
  onGameClosed() {
    setIsConnected(false);
    setValues({} as GameData);
  },
});
