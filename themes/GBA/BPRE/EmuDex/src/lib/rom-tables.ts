/**
 * ROM table decoder — reads species names, NatDex conversion, move names,
 * ability names, catch rates (from gSpeciesInfo), and item names from ROM data.
 *
 * Falls back to hardcoded species.ts / data.ts when ROM data is unavailable.
 * Phase 2 tables (moves, abilities, catch rates, items) have NO fallback
 * so failures are visible for testing.
 */

import { decodeBase64 } from "@emulink/sdk";
import { decodeGen3Text } from "./crypto.js";
import { SPECIES } from "./species.js";
import { toNationalDex as toNationalDexHardcoded } from "./data.js";
import type { BPREValues } from "./types.js";

const NUM_SPECIES = 411;

// --- Cached decoded tables (ROM data never changes mid-session) ---
let speciesNames: Record<number, string> | null = null;
let natDexTable: number[] | null = null;
let moveNames: Record<number, string> | null = null;
let abilityNames: Record<number, string> | null = null;
let catchRates: Record<number, number> | null = null;
let speciesAbilities: Record<number, [number, number]> | null = null;
let itemNames: Record<number, string> | null = null;

let initialized = false;

// Species: 411 entries split into 5 chunks of 82/82/82/82/83 (11 bytes each)
const SPECIES_CHUNKS = [82, 82, 82, 82, 83] as const;
const SPECIES_ENTRY = 11;

// Moves: 355 entries split into 5 chunks of 71 (13 bytes each)
const MOVE_CHUNKS = [71, 71, 71, 71, 71] as const;
const MOVE_ENTRY = 13;

// Abilities: 78 entries in 1 chunk (13 bytes each)
const ABILITY_COUNT = 78;
const ABILITY_ENTRY = 13;

// SpeciesInfo: 411 entries split into 6 chunks of 69/69/69/69/69/66 (28 bytes each)
const SPECIES_INFO_CHUNKS = [69, 69, 69, 69, 69, 66] as const;
const SPECIES_INFO_ENTRY = 28;
const CATCH_RATE_OFFSET = 8; // u8 at offset +8 within each 28-byte struct

// Items: 375 entries split into 9 chunks of 45×8 + 15 (44 bytes each, name in first 14)
const ITEM_CHUNKS = [45, 45, 45, 45, 45, 45, 45, 45, 15] as const;
const ITEM_ENTRY = 44;
const ITEM_NAME_LEN = 14;

/** Helper: decode chunked Gen 3 text table from base64 data points. */
function decodeTextChunks(
  values: BPREValues,
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
          if (name && name !== "???") {
            result[idx] = name;
          }
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

/** Initialize all ROM tables from base64 profile data. Call once on first update. */
export function initRomTables(values: BPREValues): void {
  if (initialized) return;

  // --- Species names (Phase 1) ---
  speciesNames = decodeTextChunks(
    values, 'species_names_rom_', SPECIES_CHUNKS, SPECIES_ENTRY, SPECIES_ENTRY, 'sentence',
  );

  // --- NatDex table (Phase 1) ---
  if (values.natdex_table_rom) {
    const bytes = decodeBase64(values.natdex_table_rom);
    if (bytes.length >= NUM_SPECIES * 2) {
      natDexTable = new Array(NUM_SPECIES);
      const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      for (let i = 0; i < NUM_SPECIES; i++) {
        natDexTable[i] = dv.getUint16(i * 2, true);
      }
    }
  }

  // --- Move names (Phase 2) ---
  moveNames = decodeTextChunks(
    values, 'move_names_rom_', MOVE_CHUNKS, MOVE_ENTRY, MOVE_ENTRY, 'word',
  );

  // --- Ability names (Phase 2) ---
  const abilityB64 = values.ability_names_rom;
  if (abilityB64) {
    const bytes = decodeBase64(abilityB64);
    abilityNames = {};
    for (let i = 0; i < ABILITY_COUNT; i++) {
      if (i * ABILITY_ENTRY < bytes.length) {
        const name = decodeGen3Text(bytes, i * ABILITY_ENTRY, ABILITY_ENTRY, 'word');
        if (name && name !== "???") {
          abilityNames[i] = name;
        }
      }
    }
    if (Object.keys(abilityNames).length === 0) abilityNames = null;
  }

  // --- Catch rates + abilities from gSpeciesInfo (Phase 2) ---
  {
    let idx = 0;
    let hasAny = false;
    const rates: Record<number, number> = {};
    const abilities: Record<number, [number, number]> = {};
    for (let c = 0; c < SPECIES_INFO_CHUNKS.length; c++) {
      const b64 = values[`species_info_rom_${c}`] as string | undefined;
      if (b64) {
        hasAny = true;
        const bytes = decodeBase64(b64);
        const count = SPECIES_INFO_CHUNKS[c];
        for (let i = 0; i < count; i++) {
          const off = i * SPECIES_INFO_ENTRY;
          if (off + CATCH_RATE_OFFSET < bytes.length) {
            rates[idx] = bytes[off + CATCH_RATE_OFFSET];
          }
          if (off + 0x17 < bytes.length) {
            abilities[idx] = [bytes[off + 0x16], bytes[off + 0x17]];
          }
          idx++;
        }
      } else {
        idx += SPECIES_INFO_CHUNKS[c];
      }
    }
    catchRates = hasAny && Object.keys(rates).length > 0 ? rates : null;
    speciesAbilities = hasAny && Object.keys(abilities).length > 0 ? abilities : null;
  }

  // --- Item names (Phase 2) ---
  itemNames = decodeTextChunks(
    values, 'items_rom_', ITEM_CHUNKS, ITEM_ENTRY, ITEM_NAME_LEN, 'word',
  );

  initialized = true;

  // Expose status on window for debugging
  const status = {
    names: speciesNames ? "rom" : "fallback",
    natdex: natDexTable ? "rom" : "fallback",
    moves: moveNames ? "rom" : "none",
    abilities: abilityNames ? "rom" : "none",
    catchRates: catchRates ? "rom" : "none",
    items: itemNames ? "rom" : "none",
    speciesCount: speciesNames ? Object.keys(speciesNames).length : 0,
    moveCount: moveNames ? Object.keys(moveNames).length : 0,
    abilityCount: abilityNames ? Object.keys(abilityNames).length : 0,
    catchRateCount: catchRates ? Object.keys(catchRates).length : 0,
    itemCount: itemNames ? Object.keys(itemNames).length : 0,
  };
  (window as any).romStatus = status; // emulink-allow: debug
  console.log("[ROM] " + JSON.stringify(status));
}

/** Whether ROM tables have been successfully loaded. */
export function romTablesReady(): boolean {
  return speciesNames !== null && natDexTable !== null;
}

/**
 * Get species name by internal ID. Uses ROM data if available, falls back to
 * hardcoded SPECIES lookup via National Dex conversion.
 */
export function getSpeciesName(internalId: number): string {
  if (speciesNames && internalId >= 0 && internalId < NUM_SPECIES) {
    return speciesNames[internalId] ?? "???";
  }
  const natDex = toNationalDexHardcoded(internalId);
  return SPECIES[natDex] ?? "???";
}

/** Get species name by National Dex number. Falls back to hardcoded SPECIES. */
export function getSpeciesNameByNatDex(natDexId: number): string {
  return SPECIES[natDexId] ?? "???";
}

/** Convert internal species ID to National Dex number. Falls back to hardcoded. */
export function toNationalDex(internalId: number): number {
  if (natDexTable && internalId >= 0 && internalId < NUM_SPECIES) {
    return natDexTable[internalId];
  }
  return toNationalDexHardcoded(internalId);
}

/** Get move name by move ID. No fallback — returns "???" if not loaded. */
export function getMoveName(moveId: number): string {
  if (moveId === 0) return "\u2014";
  return moveNames?.[moveId] ?? "???";
}

/** Get ability name by ability ID. No fallback — returns "" if 0 or not loaded. */
export function getAbilityName(abilityId: number): string {
  if (abilityId === 0) return "";
  return abilityNames?.[abilityId] ?? "";
}

/** Get ability ID by internal species ID and ability slot. Falls back to slot 0 if slot 1 is 0. */
export function getSpeciesAbilityId(internalId: number, abilityNum: number): number {
  const slots = speciesAbilities?.[internalId];
  if (!slots) return 0;
  const id = slots[abilityNum] || slots[0];
  return id;
}

/** Get catch rate by internal species ID. No fallback — returns 0 if not loaded. */
export function getCatchRate(internalId: number): number {
  return catchRates?.[internalId] ?? 0;
}

/** Get item name by item ID. No fallback — returns "???" if not loaded. */
export function getItemName(itemId: number): string {
  if (itemId === 0) return "None";
  return itemNames?.[itemId] ?? "???";
}
