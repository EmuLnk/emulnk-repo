// Develop without hardware: pnpm dev --theme <name> --mock
import { signal, effect } from "@preact/signals-core";
import { registerTheme, bool, onConnect, onDisconnect } from "@emulnk/sdk";
import "./style.scss";

interface GameData {
  party_count: number;
  [key: string]: unknown;
}

const isConnected = signal(false);
const values = signal<GameData>({} as GameData);
const settings = signal<Record<string, string>>({});
const batteryLevel = signal(0);
const confidence = signal<string | null>(null);

const statusEl = document.getElementById("status")!;
const contentEl = document.getElementById("content")!;
const countEl = document.getElementById("party-count")!;
const detailsEl = document.getElementById("details")!;
const batteryEl = document.getElementById("battery")!;
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
  statusEl.textContent = confidence.value === "FALLBACK" ? "Fallback mode" : "";

  countEl.textContent = `Party: ${values.value.party_count ?? 0}`;
  batteryEl.textContent = `Battery: ${batteryLevel.value}%`;

  if (bool(settings.value, "show-details")) {
    detailsEl.style.display = "block";
    detailsEl.textContent = JSON.stringify(values.value, null, 2);
  } else {
    detailsEl.style.display = "none";
  }
});

onConnect(() => { isConnected.value = true; });
onDisconnect(() => { isConnected.value = false; });

registerTheme<GameData>({
  onUpdate(payload) {
    isConnected.value = payload.isConnected;
    values.value = payload.values;
    settings.value = payload.settings;
    batteryLevel.value = payload.system.battery.level;
    confidence.value = payload.confidence;
  },
  onGameClosed() {
    isConnected.value = false;
    values.value = {} as GameData;
  },
});
