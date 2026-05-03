import type { TransformDefinition } from "../types.js";
import { decodeBase64 } from "../../decode.js";
import { decodeDexFlags, GEN1_MAP_NAMES } from "../../parsers/pokemon-gen1.js";
import type { Gen1ProgressState } from "./types.js";

function badgeFlags(raw: number): boolean[] {
  return Array.from({ length: 8 }, (_, i) => (raw & (1 << i)) !== 0);
}

export const progressTransform: TransformDefinition = {
  id: "progress",
  inputs: ["pokedex_owned", "pokedex_seen", "badges", "current_map"],
  fn(ctx) {
    const values = ctx.values as Record<string, unknown>;
    const ownedBytes = values.pokedex_owned ? decodeBase64(values.pokedex_owned as string) : new Uint8Array();
    const seenBytes = values.pokedex_seen ? decodeBase64(values.pokedex_seen as string) : new Uint8Array();
    const currentMap = (values.current_map as number) ?? -1;
    const badges = badgeFlags((values.badges as number) || 0);

    const owned = decodeDexFlags(ownedBytes, 151);
    const seen = decodeDexFlags(seenBytes, 151);
    const progress: Gen1ProgressState = {
      owned,
      seen,
      ownedCount: owned.length,
      seenCount: seen.length,
      badges,
      badgeCount: badges.filter(Boolean).length,
      currentMap,
      mapName: GEN1_MAP_NAMES[currentMap] ?? `Map ${currentMap}`,
    };

    return { progress };
  },
};
