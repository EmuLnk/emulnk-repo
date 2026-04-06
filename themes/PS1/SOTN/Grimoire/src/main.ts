import { mount } from "svelte";
import { registerTheme } from "@emulnk/sdk";
import type { SotnValues } from "./lib/types";
import { appState } from "./lib/state.svelte";
import { parseStatsBlock, parseRelicsInv, parsePosition, parseTilemap } from "./lib/parser";
import { parseEntities } from "./lib/enemy-parser";
import { loadMapData, trackRoom } from "./lib/persistence";
import App from "./App.svelte";

import "./style.scss";

// Mount FIRST (matching EmuDex pattern), then register theme callbacks
try {
  const target = document.getElementById("app")!;
  target.textContent = "";
  mount(App, { target });
} catch (e: unknown) {
  const el = document.getElementById("err");
  if (el) el.textContent = "MOUNT ERROR: " + String(e);
}

let mapLoaded = false;

registerTheme<SotnValues>({
  onUpdate({ isConnected, values, settings }) {
    try {
      appState.isConnected = isConnected;
      appState.settings = settings;

      if (!isConnected) return;

      if (!mapLoaded) {
        loadMapData(settings);
        mapLoaded = true;
      }

      if (values.player_stats_block) parseStatsBlock(values.player_stats_block);
      if (values.relics_spells_inv) parseRelicsInv(values.relics_spells_inv);
      if (values.player_pos) parsePosition(values.player_pos);
      if (values.room_id !== undefined) appState.roomId = values.room_id;
      if (values.tilemap_room_pos) parseTilemap(values.tilemap_room_pos);
      if (values.stage_id !== undefined) appState.stageId = values.stage_id;

      trackRoom();

      if (values.entity_stage_data) parseEntities(values.entity_stage_data);
    } catch (e: unknown) {
      console.error("Grimoire onUpdate error:", e);
    }
  },

  onGameClosed() {
    appState.isConnected = false;
    appState.hp = 0;
    appState.hpMax = 0;
    appState.enemies = [];
  },
});
