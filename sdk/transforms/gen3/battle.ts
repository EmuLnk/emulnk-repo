import type { TransformDefinition } from "../types.js";
import type { Gen3BattleMon, Gen3BattleState, FieldState, SideState, WeatherType, Gen3RomTables, StatBlock } from "./types.js";
import { decodeBase64ToDataView } from "../../decode.js";
import { toNationalDex } from "../../parsers/pokemon-gen3.js";
import { NUM_SPECIES } from "./rom-tables.js";

const BATTLE_MON_SIZE = 0x58;
const SIDE_REFLECT = 0x01;
const SIDE_LIGHTSCREEN = 0x02;
const SIDE_SPIKES = 0x10;
const SIDE_SAFEGUARD = 0x20;
const SIDE_MIST = 0x100;

const EMPTY_SIDE: SideState = { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 };
const EMPTY_FIELD: FieldState = { weather: 'none', weatherRaw: 0, playerSide: { ...EMPTY_SIDE }, enemySide: { ...EMPTY_SIDE } };
const INACTIVE: Gen3BattleState = {
  active: false, isTrainer: false, isSafari: false, isDoubles: false,
  player: null, enemy: null, player2: null, enemy2: null,
  field: EMPTY_FIELD,
};

// Gen 3 has a gap at index 9 (TYPE_MYSTERY / ???).
// Game IDs 0-8 map 1:1 to our chart indices (Normal..Steel).
// Game IDs 10+ (Fire, Water, ..., Dark) are shifted by -1.
function gameTypeToIndex(gameType: number): number {
  if (gameType <= 8) return gameType;
  if (gameType >= 10) return gameType - 1;
  return 0; // TYPE_MYSTERY (9) → fallback to Normal
}

function parseBattleMon(dv: DataView, off: number, romTables?: Gen3RomTables): Gen3BattleMon | null {
  if (off + BATTLE_MON_SIZE > dv.byteLength) return null;

  const species = dv.getUint16(off + 0x00, true);
  if (species === 0 || species > 412) return null;

  const atk   = dv.getUint16(off + 0x02, true);
  const def_  = dv.getUint16(off + 0x04, true);
  const speed = dv.getUint16(off + 0x06, true);
  const spatk = dv.getUint16(off + 0x08, true);
  const spdef = dv.getUint16(off + 0x0A, true);

  const moves = [
    dv.getUint16(off + 0x0C, true),
    dv.getUint16(off + 0x0E, true),
    dv.getUint16(off + 0x10, true),
    dv.getUint16(off + 0x12, true),
  ];

  const ivData = dv.getUint32(off + 0x14, true);
  const ivs: StatBlock = {
    hp:    (ivData)       & 0x1F,
    atk:   (ivData >> 5)  & 0x1F,
    def:   (ivData >> 10) & 0x1F,
    spd:   (ivData >> 15) & 0x1F,
    spatk: (ivData >> 20) & 0x1F,
    spdef: (ivData >> 25) & 0x1F,
  };

  // Stat stages: 8 signed bytes at +0x18
  // Order: Atk, Def, Speed, SpAtk, SpDef, Accuracy, Evasion, ??? (8th unused)
  // Default = 6 (neutral), <6 = drop, >6 = boost
  const statStages: number[] = [];
  for (let i = 0; i < 8; i++) {
    statStages.push(dv.getInt8(off + 0x18 + i));
  }

  const ability = dv.getUint8(off + 0x20);
  const type1   = gameTypeToIndex(dv.getUint8(off + 0x21));
  const type2   = gameTypeToIndex(dv.getUint8(off + 0x22));

  const pp = [
    dv.getUint8(off + 0x24),
    dv.getUint8(off + 0x25),
    dv.getUint8(off + 0x26),
    dv.getUint8(off + 0x27),
  ];

  const hp    = dv.getUint16(off + 0x28, true);
  const level = dv.getUint8(off + 0x2A);
  const maxhp = dv.getUint16(off + 0x2C, true);
  const item  = dv.getUint16(off + 0x2E, true);

  const status      = dv.getUint32(off + 0x4C, true);
  const personality = dv.getUint32(off + 0x48, true);
  const status2     = dv.getUint32(off + 0x50, true);

  const nationalSpecies = toNationalDex(species);
  const speciesName = romTables?.speciesNames[species] ?? String(nationalSpecies);

  return {
    species: nationalSpecies,
    internalSpeciesId: species,
    speciesName,
    atk, def: def_, speed, spatk, spdef,
    moves, ivs, pp,
    hp, level, maxhp,
    type1, type2, status,
    pv: personality,
    ability,
    item,
    statStages,
    personality,
    friendship: 0,
    status2,
  };
}

function parseWeather(raw: number): WeatherType {
  if (raw & 0x07) return 'rain';
  if (raw & 0x18) return 'sand';
  if (raw & 0x60) return 'sun';
  if (raw & 0x80) return 'hail';
  return 'none';
}

function parseSideState(statusFlags: number, timersB64?: string): SideState {
  const state: SideState = { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 };

  if (timersB64) {
    const dv = decodeBase64ToDataView(timersB64);
    if (dv.byteLength >= 12) {
      // Timer struct: reflectTimer@+0, lightscreenTimer@+2, mistTimer@+4, safeguardTimer@+6, spikesAmount@+0xA
      if (statusFlags & SIDE_REFLECT)     state.reflect     = dv.getUint16(0, true);
      if (statusFlags & SIDE_LIGHTSCREEN) state.lightScreen = dv.getUint16(2, true);
      if (statusFlags & SIDE_MIST)        state.mist        = dv.getUint16(4, true);
      if (statusFlags & SIDE_SAFEGUARD)   state.safeguard   = dv.getUint16(6, true);
      if (statusFlags & SIDE_SPIKES)      state.spikes      = dv.getUint8(0x0A);
    }
  } else {
    // No timer data, use flag presence only
    if (statusFlags & SIDE_REFLECT)     state.reflect     = 1;
    if (statusFlags & SIDE_LIGHTSCREEN) state.lightScreen = 1;
    if (statusFlags & SIDE_SAFEGUARD)   state.safeguard   = 1;
    if (statusFlags & SIDE_MIST)        state.mist        = 1;
    if (statusFlags & SIDE_SPIKES)      state.spikes      = 1;
  }

  return state;
}

function parseFieldState(values: Record<string, unknown>): FieldState {
  const weatherRaw = (values.battle_weather as number) ?? 0;
  return {
    weather: parseWeather(weatherRaw),
    weatherRaw,
    playerSide: parseSideState(
      (values.side_status_player as number) ?? 0,
      values.side_timers_player as string | undefined,
    ),
    enemySide: parseSideState(
      (values.side_status_enemy as number) ?? 0,
      values.side_timers_enemy as string | undefined,
    ),
  };
}

function parseMons(values: Record<string, unknown>, romTables?: Gen3RomTables): Gen3BattleState {
  const raw = values.battle_mons as string | undefined;
  if (!raw) return INACTIVE;
  const dv = decodeBase64ToDataView(raw);
  const flags = (values.battle_flags as number) || 0;
  const isSafari = (flags & 0x80) !== 0;
  const player = parseBattleMon(dv, 0, romTables);
  const enemy = parseBattleMon(dv, BATTLE_MON_SIZE, romTables);
  if (isSafari) {
    if (!enemy) return INACTIVE;
  } else {
    if (!player || !enemy) return INACTIVE;
  }
  const isTrainer = (flags & 0x08) !== 0;
  const battlersCount = (values.battlers_count as number) ?? 2;
  const isDoubles = battlersCount >= 4;
  let player2: Gen3BattleMon | null = null;
  let enemy2: Gen3BattleMon | null = null;
  if (isDoubles) {
    player2 = parseBattleMon(dv, BATTLE_MON_SIZE * 2, romTables);
    enemy2 = parseBattleMon(dv, BATTLE_MON_SIZE * 3, romTables);
  }
  const field = parseFieldState(values);
  return { active: true, isTrainer, isSafari, isDoubles, player, enemy, player2, enemy2, field };
}

export const battleTransform: TransformDefinition = {
  id: "battle",
  inputs: ["battle_mons", "battle_flags", "in_battle", "battle_outcome",
           "battlers_count", "battle_weather", "side_status_player",
           "side_status_enemy", "side_timers_player", "side_timers_enemy",
           "rom_tables"],
  after: ["rom_tables"],
  fn(ctx) {
    const values = ctx.values as Record<string, unknown>;
    const romTables = values.rom_tables as Gen3RomTables | undefined;

    const inBattle = values.in_battle as number | undefined;

    // Primary gate: gMain.inBattle bit 1
    if (inBattle !== undefined) {
      if ((inBattle & 0x02) === 0) return { battle: INACTIVE };
      const flags = (values.battle_flags as number) ?? 0;
      const outcome = (values.battle_outcome as number) ?? 0;
      if (flags === 0 || outcome !== 0) return { battle: INACTIVE };
      return { battle: parseMons(values, romTables) };
    }

    // Fallback heuristic (should not happen)
    const outcome = (values.battle_outcome as number) ?? 0;
    if (outcome !== 0) return { battle: INACTIVE };
    const raw = values.battle_mons as string | undefined;
    if (!raw) return { battle: INACTIVE };
    const dv = decodeBase64ToDataView(raw);
    const playerSpecies = dv.byteLength >= 2 ? dv.getUint16(0, true) : 0;
    const enemySpecies = dv.byteLength >= BATTLE_MON_SIZE + 2 ? dv.getUint16(BATTLE_MON_SIZE, true) : 0;
    if (playerSpecies > 0 && playerSpecies <= NUM_SPECIES && enemySpecies > 0 && enemySpecies <= NUM_SPECIES) {
      const player = parseBattleMon(dv, 0, romTables);
      const enemy = parseBattleMon(dv, BATTLE_MON_SIZE, romTables);
      if (player && enemy && player.hp > 0 && enemy.hp > 0) {
        const fbFlags = (values.battle_flags as number) || 0;
        const field = parseFieldState(values);
        return { battle: { active: true, isTrainer: (fbFlags & 0x08) !== 0, isSafari: (fbFlags & 0x80) !== 0, isDoubles: false, player, enemy, player2: null, enemy2: null, field } };
      }
    }
    return { battle: INACTIVE };
  },
};
