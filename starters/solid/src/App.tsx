import { createSignal, Show } from "solid-js";

interface GameData {
  gameTitle: string;
  [key: string]: unknown;
}

export const [isConnected, setIsConnected] = createSignal(false);
export const [values, setValues] = createSignal<GameData>({} as GameData);
export const [settings, setSettings] = createSignal<Record<string, string>>({});

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
          <h1>{values().gameTitle ?? "Unknown"}</h1>
          <pre>{JSON.stringify(values(), null, 2)}</pre>
        </div>
      </Show>
    </div>
  );
}
