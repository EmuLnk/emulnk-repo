// Vanilla JS starter - no build step, no SDK import.
// EmuLnk calls window.updateData(base64String) on every frame.

var statusEl = document.getElementById("status");
var contentEl = document.getElementById("content");
var titleEl = document.getElementById("game-title");
var infoEl = document.getElementById("game-info");
var offlineEl = document.getElementById("offline-banner");

var isConnected = false;

window.updateData = function (b64) {
  var json, data;
  try {
    json = atob(b64);
    data = JSON.parse(json);
  } catch (e) {
    return;
  }

  // data.isConnected - whether the emulator is running
  // data.values      - your memory-read values
  // data.settings    - user-configured theme settings

  isConnected = data.isConnected;

  if (!isConnected) {
    contentEl.style.display = "none";
    offlineEl.style.display = "block";
    statusEl.textContent = "";
    return;
  }

  offlineEl.style.display = "none";
  contentEl.style.display = "block";
  statusEl.textContent = "";

  // Render your values - replace these with real fields
  titleEl.textContent = data.values.gameTitle || "Unknown";
  infoEl.textContent = JSON.stringify(data.values, null, 2);
};
