import { signal, effect } from "@preact/signals-core";
import { registerTheme } from "@emulink/sdk";
import "./style.scss";

interface GameData {
  gameTitle: string;
  [key: string]: unknown;
}

const isConnected = signal(false);
const values = signal<GameData>({} as GameData);
const settings = signal<Record<string, string>>({});

const statusEl = document.getElementById("status")!;
const contentEl = document.getElementById("content")!;
const titleEl = document.getElementById("game-title")!;
const infoEl = document.getElementById("game-info")!;
const offlineEl = document.getElementById("offline-banner")!;

effect(() => {
  if (!isConnected.value) {
    contentEl.style.display = "none";
    offlineEl.style.display = "block";
    statusEl.textContent = "";
    return;
  }

  offlineEl.style.display = "none";
  contentEl.style.display = "block";
  statusEl.textContent = "";

  titleEl.textContent = values.value.gameTitle ?? "Unknown";
  infoEl.textContent = JSON.stringify(values.value, null, 2);
});

registerTheme<GameData>({
  onUpdate(payload) {
    isConnected.value = payload.isConnected;
    values.value = payload.values;
    settings.value = payload.settings;
  },
  onGameClosed() {
    isConnected.value = false;
    values.value = {} as GameData;
  },
});
