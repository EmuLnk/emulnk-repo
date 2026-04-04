// Develop without hardware: pnpm dev --theme <name> --mock
import { render } from "solid-js/web";
import { registerTheme, onConnect, onDisconnect } from "@emulink/sdk";
import App, { setIsConnected, setValues, setSettings, setBatteryLevel, setConfidence } from "./App";
import "./style.scss";

interface GameData {
  party_count: number;
  [key: string]: unknown;
}

render(() => <App />, document.getElementById("app")!);

onConnect(() => setIsConnected(true));
onDisconnect(() => setIsConnected(false));

registerTheme<GameData>({
  onUpdate({ isConnected, values, settings, system, confidence }) {
    setIsConnected(isConnected);
    setValues(values);
    setSettings(settings);
    setBatteryLevel(system.battery.level);
    setConfidence(confidence);
  },
  onGameClosed() {
    setIsConnected(false);
    setValues({} as GameData);
  },
});
