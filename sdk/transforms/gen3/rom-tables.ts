import { decodeBase64 } from "../../decode.js";
import { decodeGen3Text, toNationalDex } from "../../parsers/pokemon-gen3.js";
import type { TransformDefinition } from "../types.js";
import type { Gen3RomTables, Evolution } from "./types.js";

export const NUM_SPECIES = 411;

const SPECIES_CHUNKS = [372, 39] as const;
const SPECIES_ENTRY = 11;

const MOVE_CHUNKS = [315, 40] as const;
const MOVE_ENTRY = 13;

const ABILITY_COUNT = 78;
const ABILITY_ENTRY = 13;

const SPECIES_INFO_CHUNKS = [146, 146, 119] as const;
const SPECIES_INFO_ENTRY = 28; // sizeof(gSpeciesInfo entry), see pret/pokeemerald
const CATCH_RATE_OFFSET = 8;   // catchRate field within gSpeciesInfo
const EV_YIELD_OFFSET = 10;    // effortYield packed u16
const FLEE_RATE_OFFSET = 0x18; // safariZoneFleeRate

const ITEM_CHUNKS = [93, 93, 93, 93, 3] as const;
const ITEM_ENTRY = 44;
const ITEM_NAME_LEN = 14;

const EVO_CHUNKS = [102, 102, 102, 102, 3] as const;
const EVOS_PER_SPECIES = 5;
const EVO_ENTRY_SIZE = 8;

const ROM_INPUTS = [
  ...Array.from({ length: 2 }, (_, i) => `species_names_rom_${i}`),
  "natdex_table_rom",
  ...Array.from({ length: 2 }, (_, i) => `move_names_rom_${i}`),
  "ability_names_rom",
  ...Array.from({ length: 3 }, (_, i) => `species_info_rom_${i}`),
  ...Array.from({ length: 5 }, (_, i) => `items_rom_${i}`),
  ...Array.from({ length: 5 }, (_, i) => `evo_rom_${i}`),
];

function decodeTextChunks(
  values: Record<string, unknown>,
  prefix: string,
  chunkCounts: readonly number[],
  entrySize: number,
  nameLen: number,
  caseMode: 'sentence' | 'word',
): Record<number, string> | null {
  const result: Record<number, string> = {};
  let idx = 0;
  let hasAny = false;

  for (let c = 0; c < chunkCounts.length; c++) {
    const b64 = values[`${prefix}${c}`] as string | undefined;
    if (b64) {
      hasAny = true;
      const bytes = decodeBase64(b64);
      const count = chunkCounts[c];
      for (let i = 0; i < count; i++) {
        if (i * entrySize < bytes.length) {
          const name = decodeGen3Text(bytes, i * entrySize, nameLen, caseMode);
          if (name && name !== "???") result[idx] = name;
        }
        idx++;
      }
    } else {
      idx += chunkCounts[c];
    }
  }

  if (!hasAny || Object.keys(result).length === 0) return null;
  return result;
}

export const romTablesTransform: TransformDefinition = {
  id: "rom_tables",
  inputs: ROM_INPUTS,
  fn(ctx) {
    const values = ctx.values as Record<string, unknown>;

    // Check if any ROM data is present at all
    const hasAnyInput = ROM_INPUTS.some(k => values[k] != null);
    if (!hasAnyInput) return null;

    // --- Species names ---
    const speciesNames: Record<number, string> =
      decodeTextChunks(values, 'species_names_rom_', SPECIES_CHUNKS, SPECIES_ENTRY, SPECIES_ENTRY, 'sentence') ?? {};

    // --- NatDex table ---
    let natDexTable: number[] = [];
    if (values.natdex_table_rom) {
      const bytes = decodeBase64(values.natdex_table_rom as string);
      if (bytes.length >= NUM_SPECIES * 2) {
        natDexTable = new Array(NUM_SPECIES);
        const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        for (let i = 0; i < NUM_SPECIES; i++) {
          natDexTable[i] = dv.getUint16(i * 2, true);
        }
      }
    }

    // --- Move names ---
    const moveNames: Record<number, string> =
      decodeTextChunks(values, 'move_names_rom_', MOVE_CHUNKS, MOVE_ENTRY, MOVE_ENTRY, 'word') ?? {};

    // --- Ability names ---
    const abilityNames: Record<number, string> = {};
    const abilityB64 = values.ability_names_rom as string | undefined;
    if (abilityB64) {
      const bytes = decodeBase64(abilityB64);
      for (let i = 0; i < ABILITY_COUNT; i++) {
        if (i * ABILITY_ENTRY < bytes.length) {
          const name = decodeGen3Text(bytes, i * ABILITY_ENTRY, ABILITY_ENTRY, 'word');
          if (name && name !== "???") abilityNames[i] = name;
        }
      }
    }

    // --- Catch rates, flee rates, species abilities, EV yields (from gSpeciesInfo) ---
    let idx = 0;
    let hasSpeciesInfo = false;
    const catchRates: Record<number, number> = {};
    const safariFleeRates: Record<number, number> = {};
    const speciesAbilities: Record<number, [number, number]> = {};
    const evYields: Record<number, number[]> = {};

    for (let c = 0; c < SPECIES_INFO_CHUNKS.length; c++) {
      const b64 = values[`species_info_rom_${c}`] as string | undefined;
      if (b64) {
        hasSpeciesInfo = true;
        const bytes = decodeBase64(b64);
        const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const count = SPECIES_INFO_CHUNKS[c];
        for (let i = 0; i < count; i++) {
          const off = i * SPECIES_INFO_ENTRY;
          if (off + CATCH_RATE_OFFSET < bytes.length) catchRates[idx] = bytes[off + CATCH_RATE_OFFSET];
          if (off + EV_YIELD_OFFSET + 1 < bytes.length) {
            const packed = dv.getUint16(off + EV_YIELD_OFFSET, true);
            evYields[idx] = [
              (packed) & 3,
              (packed >> 2) & 3,
              (packed >> 4) & 3,
              (packed >> 6) & 3,
              (packed >> 8) & 3,
              (packed >> 10) & 3,
            ];
          }
          if (off + FLEE_RATE_OFFSET < bytes.length) safariFleeRates[idx] = bytes[off + FLEE_RATE_OFFSET];
          if (off + 0x17 < bytes.length) speciesAbilities[idx] = [bytes[off + 0x16], bytes[off + 0x17]];
          idx++;
        }
      } else {
        idx += SPECIES_INFO_CHUNKS[c];
      }
    }

    // --- Item names ---
    const itemNames: Record<number, string> =
      decodeTextChunks(values, 'items_rom_', ITEM_CHUNKS, ITEM_ENTRY, ITEM_NAME_LEN, 'word') ?? {};

    // --- Evolution table ---
    idx = 0;
    let hasEvos = false;
    const evolutions: Record<number, Evolution[]> = {};

    for (let c = 0; c < EVO_CHUNKS.length; c++) {
      const b64 = values[`evo_rom_${c}`] as string | undefined;
      if (b64) {
        hasEvos = true;
        const bytes = decodeBase64(b64);
        const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const count = EVO_CHUNKS[c];
        for (let s = 0; s < count; s++) {
          const entries: Evolution[] = [];
          for (let e = 0; e < EVOS_PER_SPECIES; e++) {
            const off = (s * EVOS_PER_SPECIES + e) * EVO_ENTRY_SIZE;
            if (off + 6 <= bytes.length) {
              const method = dv.getUint16(off, true);
              const param = dv.getUint16(off + 2, true);
              const target = dv.getUint16(off + 4, true);
              if (method > 0 && target > 0) entries.push({ method, param, targetSpecies: target });
            }
          }
          if (entries.length > 0) evolutions[idx] = entries;
          idx++;
        }
      } else {
        idx += EVO_CHUNKS[c];
      }
    }

    const tables: Gen3RomTables = {
      speciesNames,
      natDexTable,
      moveNames,
      abilityNames,
      catchRates: hasSpeciesInfo ? catchRates : {},
      safariFleeRates: hasSpeciesInfo ? safariFleeRates : {},
      speciesAbilities: hasSpeciesInfo ? speciesAbilities : {},
      evYields: hasSpeciesInfo ? evYields : {},
      evolutions: hasEvos ? evolutions : {},
      itemNames,
    };

    return { rom_tables: tables };
  },
};
