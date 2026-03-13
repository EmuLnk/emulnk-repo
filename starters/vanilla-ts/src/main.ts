import { registerTheme } from "@emulink/sdk";

interface GameData {
  gameTitle: string;
  [key: string]: unknown;
}

const statusEl = document.getElementById("status")!;
const contentEl = document.getElementById("content")!;
const titleEl = document.getElementById("game-title")!;
const infoEl = document.getElementById("game-info")!;
const offlineEl = document.getElementById("offline-banner")!;

registerTheme<GameData>({
  onUpdate({ isConnected, values, settings }) {
    if (!isConnected) {
      contentEl.style.display = "none";
      offlineEl.style.display = "block";
      statusEl.textContent = "";
      return;
    }

    offlineEl.style.display = "none";
    contentEl.style.display = "block";
    statusEl.textContent = "";

    titleEl.textContent = values.gameTitle ?? "Unknown";
    infoEl.textContent = JSON.stringify(values, null, 2);
  },
  onGameClosed() {
    contentEl.style.display = "none";
    offlineEl.style.display = "none";
    statusEl.textContent = "Waiting for data...";
  },
});
