import { createSignal, Show } from "solid-js";
import { bool } from "@emulnk/sdk";

interface GameData {
  party_count: number;
  [key: string]: unknown;
}

export const [isConnected, setIsConnected] = createSignal(false);
export const [values, setValues] = createSignal<GameData>({} as GameData);
export const [settings, setSettings] = createSignal<Record<string, string>>({});
export const [batteryLevel, setBatteryLevel] = createSignal(0);
export const [confidence, setConfidence] = createSignal<string | null>(null);

export default function App() {
  return (
    <div class="app">
      <Show
        when={isConnected()}
        fallback={
          <div class="offline-banner">
            <p>Emulator disconnected</p>
          </div>
        }
      >
        <div class="content">
          <Show when={confidence() === "FALLBACK"}>
            <p class="fallback">Fallback mode</p>
          </Show>
          <h1>Party: {values().party_count ?? 0}</h1>
          <p>Battery: {batteryLevel()}%</p>
          <Show when={bool(settings(), "show-details")}>
            <pre>{JSON.stringify(values(), null, 2)}</pre>
          </Show>
        </div>
      </Show>
    </div>
  );
}
