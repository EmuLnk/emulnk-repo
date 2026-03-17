export interface NuzlockeRouteEntry {
  species: number;
  status: "pending" | "caught" | "missed";
}

export interface NuzlockeGraveyardEntry {
  species: number;
  level: number;
  mapKey: string;
  diedAt: number;
}

export interface NuzlockeData {
  version: 1;
  startedAt: number;
  routes: Record<string, NuzlockeRouteEntry>;
  graveyard: Record<string, NuzlockeGraveyardEntry>;  // keyed by PV (string)
  violations: string[];  // PVs of revived "dead" mons
}

export function createEmptyNuzlockeData(): NuzlockeData {
  return {
    version: 1,
    startedAt: Date.now(),
    routes: {},
    graveyard: {},
    violations: [],
  };
}
