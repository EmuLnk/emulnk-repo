import type { Gen3RomTables, Evolution } from "@emulink/sdk/transforms/gen3";
import { NUM_SPECIES } from "@emulink/sdk/transforms/gen3";
import { toNationalDex as toNationalDexHardcoded } from "@emulink/sdk/parsers/pokemon-gen3";
import { SPECIES } from "./species.js";

let tables: Gen3RomTables | undefined;
let natDexReverse: Record<number, number> = {};

export function setRomTables(t: Gen3RomTables | undefined): void {
  tables = t;
  natDexReverse = {};
  if (t?.natDexTable) {
    for (let i = 0; i < t.natDexTable.length; i++) {
      natDexReverse[t.natDexTable[i]] = i;
    }
  }
}

export function romTablesReady(): boolean {
  return tables?.speciesNames !== undefined && tables?.natDexTable !== undefined;
}

export function getSpeciesName(internalId: number): string {
  if (tables?.speciesNames && internalId >= 0 && internalId < NUM_SPECIES) {
    return tables.speciesNames[internalId] ?? "???";
  }
  const natDex = toNationalDexHardcoded(internalId);
  return SPECIES[natDex] ?? "???";
}

export function getSpeciesNameByNatDex(natDexId: number): string {
  return SPECIES[natDexId] ?? "???";
}

export function toNationalDex(internalId: number): number {
  if (tables?.natDexTable && internalId >= 0 && internalId < NUM_SPECIES) {
    return tables.natDexTable[internalId];
  }
  return toNationalDexHardcoded(internalId);
}

export function getMoveName(moveId: number): string {
  if (moveId === 0) return "\u2014";
  return tables?.moveNames?.[moveId] ?? "???";
}

export function getAbilityName(abilityId: number): string {
  if (abilityId === 0) return "";
  return tables?.abilityNames?.[abilityId] ?? "";
}

export function getSpeciesAbilityId(internalId: number, abilityNum: number): number {
  const slots = tables?.speciesAbilities?.[internalId];
  if (!slots) return 0;
  return slots[abilityNum] || slots[0];
}

export function getEvYield(internalId: number): number[] | null {
  return tables?.evYields?.[internalId] ?? null;
}

export function getEvYieldByNatDex(natDex: number): number[] | null {
  const internal = natDexReverse[natDex];
  if (internal === undefined) return null;
  return tables?.evYields?.[internal] ?? null;
}

const EV_STAT_NAMES = ['HP', 'Atk', 'Def', 'Spd', 'SpA', 'SpD'];

export function formatEvYield(natDex: number): string {
  const evs = getEvYieldByNatDex(natDex);
  if (!evs) return '';
  const parts: string[] = [];
  for (let i = 0; i < 6; i++) {
    if (evs[i] > 0) parts.push(`${EV_STAT_NAMES[i]}+${evs[i]}`);
  }
  return parts.join(' ');
}

export function getCatchRate(internalId: number): number {
  return tables?.catchRates?.[internalId] ?? 0;
}

export function getFleeRate(internalId: number): number {
  return tables?.safariFleeRates?.[internalId] ?? 0;
}

export function getEvolutions(internalId: number): Evolution[] {
  return tables?.evolutions?.[internalId] ?? [];
}

const EVO_METHOD_NAMES: Record<number, string> = {
  1: 'Friendship', 2: 'Friendship (Day)', 3: 'Friendship (Night)',
  4: 'Level', 5: 'Trade', 6: 'Trade +', 7: 'Item',
  8: 'Lv (Atk>Def)', 9: 'Lv (Atk=Def)', 10: 'Lv (Atk<Def)',
  11: 'Level', 12: 'Level', 13: 'Level', 14: 'Level', 15: 'Beauty',
};

export function formatEvolution(evo: Evolution): string {
  const method = EVO_METHOD_NAMES[evo.method] ?? `Method ${evo.method}`;
  const target = getSpeciesName(evo.targetSpecies);
  if (evo.method === 4 || (evo.method >= 8 && evo.method <= 14)) {
    return `${target} (${method} ${evo.param})`;
  }
  if (evo.method === 7 || evo.method === 6) {
    return `${target} (${method} ${getItemName(evo.param)})`;
  }
  if (evo.method === 15) {
    return `${target} (Beauty ${evo.param}+)`;
  }
  return `${target} (${method})`;
}

export function getItemName(itemId: number): string {
  if (itemId === 0) return "None";
  return tables?.itemNames?.[itemId] ?? "???";
}
