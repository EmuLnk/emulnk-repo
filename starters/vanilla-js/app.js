// Vanilla JS starter — no build step, no SDK import.
// EmuLnk calls window.updateData(base64String) on every frame.
// Develop without hardware: pnpm dev --theme <name> --mock

var statusEl = document.getElementById("status");
var contentEl = document.getElementById("content");
var countEl = document.getElementById("party-count");
var detailsEl = document.getElementById("details");
var batteryEl = document.getElementById("battery");
var offlineEl = document.getElementById("offline-banner");

window.updateData = function (b64) {
  var data;
  try {
    data = JSON.parse(atob(b64));
  } catch (e) {
    return;
  }

  // data.isConnected  — whether the emulator is running
  // data.values       — memory-read values (defined by your profile)
  // data.settings     — user-configured theme settings (always strings)
  // data.system       — device info: battery, thermal, display, safe area
  // data.confidence   — "MATCHED" | "FALLBACK" | null

  if (!data.isConnected) {
    contentEl.style.display = "none";
    offlineEl.style.display = "block";
    statusEl.textContent = "";
    return;
  }

  offlineEl.style.display = "none";
  contentEl.style.display = "block";
  statusEl.textContent = data.confidence === "FALLBACK" ? "Fallback mode" : "";

  countEl.textContent = "Party: " + (data.values.party_count || 0);
  batteryEl.textContent = "Battery: " + data.system.battery.level + "%";

  // Settings are always strings — compare with "true", not true
  if (data.settings["show-details"] === "true") {
    detailsEl.style.display = "block";
    detailsEl.textContent = JSON.stringify(data.values, null, 2);
  } else {
    detailsEl.style.display = "none";
  }
};

window.onGameClosed = function () {
  contentEl.style.display = "none";
  offlineEl.style.display = "none";
  statusEl.textContent = "Waiting for data...";
};
