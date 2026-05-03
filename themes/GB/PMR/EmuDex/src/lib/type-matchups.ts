import { GEN1_TYPE_NAMES, typeEffectiveness } from "@emulnk/sdk/parsers/pokemon-gen1";

export interface DefensiveTypeEntry {
  typeId: number;
  type: string;
  multiplier: number;
}

export interface DefensiveTypeSummary {
  weak: DefensiveTypeEntry[];
  resist: DefensiveTypeEntry[];
  immune: DefensiveTypeEntry[];
}

const DISPLAY_GEN1_TYPES = Object.entries(GEN1_TYPE_NAMES)
  .map(([typeId, type]) => ({ typeId: Number(typeId), type }))
  .filter((entry) => entry.type !== "Bird");

export function defensiveTypeSummary(type1: number, type2 = type1): DefensiveTypeSummary {
  const summary: DefensiveTypeSummary = {
    weak: [],
    resist: [],
    immune: [],
  };

  for (const entry of DISPLAY_GEN1_TYPES) {
    const multiplier = typeEffectiveness(entry.typeId, type1, type2);
    const result = { ...entry, multiplier };

    if (multiplier > 1) summary.weak.push(result);
    else if (multiplier > 0 && multiplier < 1) summary.resist.push(result);
    else if (multiplier === 0) summary.immune.push(result);
  }

  return summary;
}
