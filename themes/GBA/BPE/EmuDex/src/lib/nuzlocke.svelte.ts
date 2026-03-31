import { save } from "@emulink/sdk";
import type { Pokemon, BattleState } from "./types.js";
import type { NuzlockeData } from "./nuzlocke-types.js";
import { createEmptyNuzlockeData } from "./nuzlocke-types.js";

const SAVE_KEY = "nuzlocke-data";

export const nuzState = $state({
  data: null as NuzlockeData | null,
});

// Track previous frame state for edge detection
let prevBattleActive = false;
let prevIsWild = false;
let pendingMapKey = "";
let loaded = false;

export function loadNuzlockeData(raw: string | undefined): void {
  if (loaded) return; // Only load once from settings; in-memory state is authoritative after that
  loaded = true;
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 1) {
      nuzState.data = parsed as NuzlockeData;
    }
  } catch {
    // Corrupt data — ignore
  }
}

export function resetNuzlocke(): void {
  nuzState.data = createEmptyNuzlockeData();
  persist();
}

function persist(): void {
  if (!nuzState.data) return;
  save(SAVE_KEY, JSON.stringify(nuzState.data));
}

export function processNuzlockeFrame(
  party: (Pokemon | null)[],
  battle: BattleState,
  mapKey: string,
  dexOwned: Set<number>,
  nuzlockeEnabled: boolean,
): void {
  if (!nuzlockeEnabled) return;

  // Initialize data on first frame if not loaded
  if (!nuzState.data) {
    nuzState.data = createEmptyNuzlockeData();
    persist();
  }

  const data = nuzState.data;
  let dirty = false;

  // === First Encounter Detection ===
  const isWild = battle.active && !battle.isTrainer;
  const battleJustStarted = isWild && !prevBattleActive;
  const battleJustEnded = !battle.active && prevBattleActive && prevIsWild;

  if (battleJustStarted && battle.enemy) {
    const enemy = battle.enemy;
    // Wild battle just started — check if this route has an encounter recorded
    if (!(mapKey in data.routes)) {
      // Species Clause: skip if this species was already caught on another route
      const alreadyCaught = Object.values(data.routes).some(
        (r) => r.species === enemy.species && r.status === "caught",
      );
      if (!alreadyCaught) {
        data.routes[mapKey] = {
          species: enemy.species,
          status: "pending",
        };
        pendingMapKey = mapKey;
        dirty = true;
      }
    }
  }

  if (battleJustEnded && pendingMapKey) {
    // Battle just ended — resolve pending encounter
    const entry = data.routes[pendingMapKey];
    if (entry && entry.status === "pending") {
      // Check if the pending species was caught (now in dex owned)
      if (dexOwned.has(entry.species) && !prevOwnedWas(entry.species)) {
        entry.status = "caught";
      } else {
        entry.status = "missed";
      }
      dirty = true;
    }
    pendingMapKey = "";
  }

  // Resolve stale pending encounters from previous sessions
  for (const key in data.routes) {
    const entry = data.routes[key];
    if (entry.status === "pending" && key !== pendingMapKey) {
      // Not in an active battle for this route — mark as missed
      entry.status = "missed";
      dirty = true;
    }
  }

  // === Faint Detection ===
  for (const mon of party) {
    if (!mon || mon.maxhp === 0) continue;
    const pvKey = String(mon.pv);

    if (mon.hp === 0) {
      // Mon is fainted — add to graveyard if not already there
      if (!(pvKey in data.graveyard)) {
        data.graveyard[pvKey] = {
          species: mon.speciesId,
          level: mon.level,
          mapKey,
          diedAt: Date.now(),
        };
        dirty = true;
      }
    } else if (pvKey in data.graveyard) {
      // Mon was in graveyard but now has HP — violation (revived)
      if (!data.violations.includes(pvKey)) {
        data.violations.push(pvKey);
        dirty = true;
      }
    }
  }

  // Update previous frame tracking
  prevBattleActive = battle.active;
  prevIsWild = isWild;

  if (dirty) persist();
}

// Track which species were already owned before this battle
let prevOwnedSnapshot = new Set<number>();

function prevOwnedWas(species: number): boolean {
  return prevOwnedSnapshot.has(species);
}

// Called at battle start to snapshot owned dex
export function snapshotOwnedDex(owned: Set<number>): void {
  prevOwnedSnapshot = new Set(owned);
}
