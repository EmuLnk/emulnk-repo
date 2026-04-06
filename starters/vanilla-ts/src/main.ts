// Develop without hardware: pnpm dev --theme <name> --mock
import { registerTheme, onDataChange, onConnect, onDisconnect, bool } from "@emulnk/sdk";

interface GameData {
  party_count: number;
  [key: string]: unknown;
}

const statusEl = document.getElementById("status")!;
const contentEl = document.getElementById("content")!;
const countEl = document.getElementById("party-count")!;
const detailsEl = document.getElementById("details")!;
const batteryEl = document.getElementById("battery")!;
const offlineEl = document.getElementById("offline-banner")!;

onConnect(() => {
  offlineEl.style.display = "none";
  contentEl.style.display = "block";
  statusEl.textContent = "";
});

onDisconnect(() => {
  contentEl.style.display = "none";
  offlineEl.style.display = "block";
});

onDataChange("party_count", (_key, val) => {
  countEl.textContent = `Party: ${val}`;
});

registerTheme<GameData>({
  onUpdate({ isConnected, values, settings, system, confidence }) {
    if (!isConnected) {
      contentEl.style.display = "none";
      offlineEl.style.display = "block";
      statusEl.textContent = "";
      return;
    }

    offlineEl.style.display = "none";
    contentEl.style.display = "block";
    statusEl.textContent = confidence === "FALLBACK" ? "Fallback mode" : "";

    countEl.textContent = `Party: ${values.party_count ?? 0}`;
    batteryEl.textContent = `Battery: ${system.battery.level}%`;

    if (bool(settings, "show-details")) {
      detailsEl.style.display = "block";
      detailsEl.textContent = JSON.stringify(values, null, 2);
    } else {
      detailsEl.style.display = "none";
    }
  },
  onGameClosed() {
    contentEl.style.display = "none";
    offlineEl.style.display = "none";
    statusEl.textContent = "Waiting for data...";
  },
});
