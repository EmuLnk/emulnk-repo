import type { Gen1ProgressState } from "@emulnk/sdk/transforms/gen1";
import { getAreaEncounters, type AreaDexStatus } from "./dex.js";
import type { Gen1EncounterMethod, Gen1GameVersion } from "./encounter-data.generated.js";

export type NuzlockeStatus = "open" | "caught" | "failed";

export interface NuzlockeEntry {
  status: NuzlockeStatus;
  name: string;
}

export interface NuzlockeSuggestion {
  dexId: number;
  speciesName: string;
  dexStatus: AreaDexStatus;
  minLevel: number;
  maxLevel: number;
  bestRate: number;
  methods: Gen1EncounterMethod[];
}

export interface NuzlockeGuidance {
  mapId: number;
  mapName: string;
  status: NuzlockeStatus;
  hasEncounters: boolean;
  targets: NuzlockeSuggestion[];
}

interface SuggestionGroup {
  dexId: number;
  speciesName: string;
  minLevel: number;
  maxLevel: number;
  bestRate: number;
  methods: Set<Gen1EncounterMethod>;
}

const METHOD_ORDER: Gen1EncounterMethod[] = ["walk", "surf", "old-rod", "good-rod", "super-rod"];

function dexStatus(dexId: number, owned: Set<number>, seen: Set<number>): AreaDexStatus {
  if (owned.has(dexId)) return "caught";
  if (seen.has(dexId)) return "seen";
  return "unseen";
}

function entryStatus(
  entries: Array<[string, NuzlockeEntry]>,
  mapId: number,
): NuzlockeStatus {
  const entry = entries.find(([key]) => key === String(mapId));
  return entry?.[1].status ?? "open";
}

export function buildNuzlockeGuidance({
  progress,
  version,
  entries,
}: {
  progress: Gen1ProgressState;
  version: Gen1GameVersion;
  entries: Array<[string, NuzlockeEntry]>;
}): NuzlockeGuidance {
  const owned = new Set(progress.owned);
  const seen = new Set(progress.seen);
  const groups = new Map<number, SuggestionGroup>();

  for (const encounter of getAreaEncounters(progress.currentMap, version)) {
    const current = groups.get(encounter.dexId);
    if (current) {
      current.minLevel = Math.min(current.minLevel, encounter.minLevel);
      current.maxLevel = Math.max(current.maxLevel, encounter.maxLevel);
      current.bestRate = Math.max(current.bestRate, encounter.rate);
      current.methods.add(encounter.method);
    } else {
      groups.set(encounter.dexId, {
        dexId: encounter.dexId,
        speciesName: encounter.speciesName,
        minLevel: encounter.minLevel,
        maxLevel: encounter.maxLevel,
        bestRate: encounter.rate,
        methods: new Set([encounter.method]),
      });
    }
  }

  const targets = [...groups.values()]
    .map((target): NuzlockeSuggestion => ({
      dexId: target.dexId,
      speciesName: target.speciesName,
      dexStatus: dexStatus(target.dexId, owned, seen),
      minLevel: target.minLevel,
      maxLevel: target.maxLevel,
      bestRate: target.bestRate,
      methods: METHOD_ORDER.filter((method) => target.methods.has(method)),
    }))
    .sort((a, b) => b.bestRate - a.bestRate || a.dexId - b.dexId);

  return {
    mapId: progress.currentMap,
    mapName: progress.mapName,
    status: entryStatus(entries, progress.currentMap),
    hasEncounters: targets.length > 0,
    targets,
  };
}
