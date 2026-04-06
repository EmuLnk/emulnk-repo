import { save } from "@emulnk/sdk"; // emulnk-allow: save
import { appState } from "./state.svelte";

const MAP_SAVE_KEY = "grimoire-map-data";
const ANNOTATIONS_SAVE_KEY = "grimoire-annotations";

let lastSaveTime = 0;
const SAVE_DEBOUNCE = 2000;

/** Load persisted map data from settings (call once on first frame) */
export function loadMapData(settings: Record<string, string>): void {
  // Load visited rooms
  const mapRaw = settings[MAP_SAVE_KEY];
  if (mapRaw) {
    try {
      const arr = JSON.parse(mapRaw) as string[];
      for (const key of arr) appState.visitedRooms.add(key);
    } catch {
      // corrupt data, start fresh
    }
  }

  // Load annotations
  const annoRaw = settings[ANNOTATIONS_SAVE_KEY];
  if (annoRaw) {
    try {
      appState.annotations = JSON.parse(annoRaw) as Record<string, string>;
    } catch {
      // corrupt data, start fresh
    }
  }
}

/** Track current room visit as a rectangle. Call each frame after parsing tilemap + stageId. */
export function trackRoom(): void {
  const { stageId, roomX, roomY, roomRight, roomBottom } = appState;

  // Skip invalid coordinates (0,0 at stageId 0 is startup state)
  if (stageId === 0 && roomX === 0 && roomY === 0) return;

  const key = `${stageId}:${roomX}:${roomY}:${roomRight}:${roomBottom}`;

  if (!appState.visitedRooms.has(key)) {
    appState.visitedRooms.add(key);
    debounceSaveMap();
  }
}

/** Save visited rooms with debounce to avoid rate limiting */
function debounceSaveMap(): void {
  const now = Date.now();
  if (now - lastSaveTime < SAVE_DEBOUNCE) return;
  lastSaveTime = now;
  save(MAP_SAVE_KEY, JSON.stringify([...appState.visitedRooms])); // emulnk-allow: save
}

/** Save annotations (called from MapView when user adds a note) */
export function saveAnnotations(): void {
  save(ANNOTATIONS_SAVE_KEY, JSON.stringify(appState.annotations)); // emulnk-allow: save
}

/** Reset all map data. Clears visited rooms and persists empty. */
export function resetMapData(): void {
  appState.visitedRooms.clear();
  save(MAP_SAVE_KEY, "[]"); // emulnk-allow: save
}
