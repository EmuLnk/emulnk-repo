import type { Gen3RomTables, Evolution } from "./types.js";
import { toNationalDex as toNationalDexHardcoded } from "../../parsers/pokemon-gen3.js";
import { NUM_SPECIES } from "./rom-tables.js";

export function getSpeciesName(tables: Gen3RomTables | undefined, internalId: number): string {
  if (tables?.speciesNames && internalId >= 0 && internalId < NUM_SPECIES) {
    return tables.speciesNames[internalId] ?? "???";
  }
  return "???";
}

export function toNationalDex(tables: Gen3RomTables | undefined, internalId: number): number {
  if (tables?.natDexTable && internalId >= 0 && internalId < NUM_SPECIES) {
    return tables.natDexTable[internalId];
  }
  return toNationalDexHardcoded(internalId);
}

export function getMoveName(tables: Gen3RomTables | undefined, moveId: number): string {
  if (moveId === 0) return "\u2014";
  return tables?.moveNames?.[moveId] ?? "???";
}

export function getAbilityName(tables: Gen3RomTables | undefined, abilityId: number): string {
  if (abilityId === 0) return "";
  return tables?.abilityNames?.[abilityId] ?? "";
}

export function getSpeciesAbilityId(tables: Gen3RomTables | undefined, internalId: number, abilityNum: number): number {
  const slots = tables?.speciesAbilities?.[internalId];
  if (!slots) return 0;
  return slots[abilityNum] || slots[0];
}

export function getCatchRate(tables: Gen3RomTables | undefined, internalId: number): number {
  return tables?.catchRates?.[internalId] ?? 0;
}

export function getFleeRate(tables: Gen3RomTables | undefined, internalId: number): number {
  return tables?.safariFleeRates?.[internalId] ?? 0;
}

export function getEvYield(tables: Gen3RomTables | undefined, internalId: number): number[] | null {
  return tables?.evYields?.[internalId] ?? null;
}

export function getEvolutions(tables: Gen3RomTables | undefined, internalId: number): Evolution[] {
  return tables?.evolutions?.[internalId] ?? [];
}

export function getItemName(tables: Gen3RomTables | undefined, itemId: number): string {
  if (itemId === 0) return "None";
  return tables?.itemNames?.[itemId] ?? "???";
}
