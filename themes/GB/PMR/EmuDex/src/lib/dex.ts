import type { Gen1ProgressState } from "@emulnk/sdk/transforms/gen1";
import { GEN1_MAP_NAMES } from "@emulnk/sdk/parsers/pokemon-gen1";
import {
  GEN1_AREA_ENCOUNTERS_BY_VERSION,
  type Gen1AreaEncounter,
  type Gen1EncounterMethod,
  type Gen1GameVersion,
} from "./encounter-data.generated.js";

export type AreaDexStatus = "caught" | "seen" | "unseen";

export interface AreaDexEncounter extends Gen1AreaEncounter {
  status: AreaDexStatus;
}

export interface AreaDexSection {
  method: Gen1EncounterMethod;
  label: string;
  caughtCount: number;
  totalCount: number;
  encounters: AreaDexEncounter[];
}

export interface AreaDexModel {
  mapName: string;
  caughtCount: number;
  totalCount: number;
  complete: boolean;
  sections: AreaDexSection[];
}

export interface EncounterAreaSummary {
  mapId: number;
  mapName: string;
  isCurrent: boolean;
  isSafari: boolean;
  caughtCount: number;
  seenCount: number;
  totalCount: number;
  complete: boolean;
  methods: Gen1EncounterMethod[];
}

export interface SpeciesAreaAppearance {
  mapId: number;
  mapName: string;
  isSafari: boolean;
  methods: Gen1EncounterMethod[];
  minLevel: number;
  maxLevel: number;
  bestRate: number;
  status: AreaDexStatus;
}

export interface SpeciesAreaSummary {
  dexId: number;
  speciesName: string;
  status: AreaDexStatus;
  areas: SpeciesAreaAppearance[];
}

export interface GlobalDexProgress {
  seenCount: number;
  ownedCount: number;
  remainingCount: number;
  badgeCount: number;
  badges: boolean[];
}

export const AREA_DEX_METHOD_ORDER: Gen1EncounterMethod[] = ["walk", "surf", "old-rod", "good-rod", "super-rod"];

export const AREA_DEX_METHOD_LABELS: Record<Gen1EncounterMethod, string> = {
  walk: "WALK",
  surf: "SURF",
  "old-rod": "OLD ROD",
  "good-rod": "GOOD ROD",
  "super-rod": "SUPER ROD",
};

const ROUTE_4_MAP_ID = 0x0f;
const FISHING_METHODS: ReadonlySet<Gen1EncounterMethod> = new Set(["old-rod", "good-rod", "super-rod"]);

export function getAreaEncounters(currentMap: number, version: Gen1GameVersion = "red"): Gen1AreaEncounter[] {
  const encounters = GEN1_AREA_ENCOUNTERS_BY_VERSION[version][currentMap] ?? [];

  // The ROM has Route 4 fishing data, but the only water there requires Surf and Gen 1 blocks fishing while surfing.
  if (currentMap === ROUTE_4_MAP_ID) {
    return encounters.filter((encounter) => !FISHING_METHODS.has(encounter.method));
  }

  return encounters;
}

function encounterStatus(dexId: number, owned: Set<number>, seen: Set<number>): AreaDexStatus {
  if (owned.has(dexId)) return "caught";
  if (seen.has(dexId)) return "seen";
  return "unseen";
}

function uniqueDexCount(encounters: readonly Pick<Gen1AreaEncounter, "dexId">[], filter?: (dexId: number) => boolean): number {
  const ids = new Set<number>();
  for (const encounter of encounters) {
    if (!filter || filter(encounter.dexId)) ids.add(encounter.dexId);
  }
  return ids.size;
}

export function buildAreaDex(progress: Gen1ProgressState, version: Gen1GameVersion = "red"): AreaDexModel {
  const owned = new Set(progress.owned);
  const seen = new Set(progress.seen);
  const encounters = getAreaEncounters(progress.currentMap, version);
  const totalCount = uniqueDexCount(encounters);
  const caughtCount = uniqueDexCount(encounters, (dexId) => owned.has(dexId));

  const sections = AREA_DEX_METHOD_ORDER
    .map((method): AreaDexSection | null => {
      const methodEncounters = encounters.filter((encounter) => encounter.method === method);
      if (methodEncounters.length === 0) return null;

      const withStatus = methodEncounters.map((encounter) => ({
        ...encounter,
        status: encounterStatus(encounter.dexId, owned, seen),
      }));

      return {
        method,
        label: AREA_DEX_METHOD_LABELS[method],
        caughtCount: uniqueDexCount(methodEncounters, (dexId) => owned.has(dexId)),
        totalCount: uniqueDexCount(methodEncounters),
        encounters: withStatus,
      };
    })
    .filter((section): section is AreaDexSection => !!section);

  return {
    mapName: progress.mapName,
    caughtCount,
    totalCount,
    complete: totalCount > 0 && caughtCount === totalCount,
    sections,
  };
}

export function mapNameForId(mapId: number): string {
  return GEN1_MAP_NAMES[mapId] ?? `Map ${mapId}`;
}

function isSafariMap(mapId: number): boolean {
  return mapNameForId(mapId).startsWith("Safari Zone");
}

function orderedMethods(encounters: readonly Pick<Gen1AreaEncounter, "method">[]): Gen1EncounterMethod[] {
  const present = new Set(encounters.map((encounter) => encounter.method));
  return AREA_DEX_METHOD_ORDER.filter((method) => present.has(method));
}

export function listEncounterAreas(version: Gen1GameVersion, progress: Gen1ProgressState): EncounterAreaSummary[] {
  const owned = new Set(progress.owned);
  const seen = new Set(progress.seen);

  return Object.keys(GEN1_AREA_ENCOUNTERS_BY_VERSION[version])
    .map(Number)
    .sort((a, b) => a - b)
    .map((mapId): EncounterAreaSummary | null => {
      const encounters = getAreaEncounters(mapId, version);
      if (encounters.length === 0) return null;

      const caughtCount = uniqueDexCount(encounters, (dexId) => owned.has(dexId));
      const seenCount = uniqueDexCount(encounters, (dexId) => seen.has(dexId) && !owned.has(dexId));
      const totalCount = uniqueDexCount(encounters);

      return {
        mapId,
        mapName: mapNameForId(mapId),
        isCurrent: mapId === progress.currentMap,
        isSafari: isSafariMap(mapId),
        caughtCount,
        seenCount,
        totalCount,
        complete: totalCount > 0 && caughtCount === totalCount,
        methods: orderedMethods(encounters),
      };
    })
    .filter((area): area is EncounterAreaSummary => !!area);
}

export function listSafariEncounterAreas(version: Gen1GameVersion, progress: Gen1ProgressState): EncounterAreaSummary[] {
  return listEncounterAreas(version, progress).filter((area) => area.isSafari);
}

export function buildAreaDexForMap(progress: Gen1ProgressState, version: Gen1GameVersion, mapId: number): AreaDexModel {
  return buildAreaDex({
    ...progress,
    currentMap: mapId,
    mapName: mapNameForId(mapId),
  }, version);
}

export function buildSpeciesAreaSummary(dexId: number, progress: Gen1ProgressState, version: Gen1GameVersion): SpeciesAreaSummary {
  const owned = new Set(progress.owned);
  const seen = new Set(progress.seen);
  const byMap = new Map<number, {
    mapId: number;
    speciesName: string;
    encounters: Gen1AreaEncounter[];
  }>();

  for (const mapId of Object.keys(GEN1_AREA_ENCOUNTERS_BY_VERSION[version]).map(Number)) {
    const encounters = getAreaEncounters(mapId, version).filter((encounter) => encounter.dexId === dexId);
    if (encounters.length === 0) continue;
    byMap.set(mapId, {
      mapId,
      speciesName: encounters[0].speciesName,
      encounters,
    });
  }

  const areas = [...byMap.values()]
    .sort((a, b) => a.mapId - b.mapId)
    .map(({ mapId, encounters }): SpeciesAreaAppearance => ({
      mapId,
      mapName: mapNameForId(mapId),
      isSafari: isSafariMap(mapId),
      methods: orderedMethods(encounters),
      minLevel: Math.min(...encounters.map((encounter) => encounter.minLevel)),
      maxLevel: Math.max(...encounters.map((encounter) => encounter.maxLevel)),
      bestRate: Math.max(...encounters.map((encounter) => encounter.rate)),
      status: encounterStatus(dexId, owned, seen),
    }));

  return {
    dexId,
    speciesName: [...byMap.values()][0]?.speciesName ?? `No.${dexId}`,
    status: encounterStatus(dexId, owned, seen),
    areas,
  };
}

export function buildGlobalDexProgress(progress: Gen1ProgressState): GlobalDexProgress {
  return {
    seenCount: progress.seenCount,
    ownedCount: progress.ownedCount,
    remainingCount: Math.max(0, 151 - progress.ownedCount),
    badgeCount: progress.badgeCount,
    badges: progress.badges,
  };
}
