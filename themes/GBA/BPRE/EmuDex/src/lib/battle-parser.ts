import type { BattleMon, BattleState, FieldState, SideState, StatBlock, BPREValues, WeatherType } from "./types.js";
import { decodeBase64ToDataView } from "@emulink/sdk";
import { getSpeciesName } from "./rom-tables.js";
import { NATURES } from "./data.js";

// gBattleMons struct: 88 bytes per mon (0x58)
// Index 0 = player's active, Index 1 = enemy active
// Index 2 = player2 (doubles), Index 3 = enemy2 (doubles)
const BATTLE_MON_SIZE = 0x58;

// Gen 3 has a gap at index 9 (TYPE_MYSTERY / ???).
// Game IDs 0-8 map 1:1 to our chart indices (Normal..Steel).
// Game IDs 10+ (Fire, Water, ..., Dark) are shifted by -1.
function gameTypeToIndex(gameType: number): number {
  if (gameType <= 8) return gameType;   // Normal through Steel — same
  if (gameType >= 10) return gameType - 1; // Fire+ shifted by -1 (skip gap)
  return 0; // TYPE_MYSTERY (9) → fallback to Normal
}

function parseBattleMon(dv: DataView, off: number): BattleMon | null {
  if (off + BATTLE_MON_SIZE > dv.byteLength) return null;

  const species = dv.getUint16(off + 0x00, true);
  if (species === 0 || species > 412) return null;

  const atk    = dv.getUint16(off + 0x02, true);
  const def_   = dv.getUint16(off + 0x04, true);
  const speed  = dv.getUint16(off + 0x06, true);
  const spatk  = dv.getUint16(off + 0x08, true);
  const spdef  = dv.getUint16(off + 0x0A, true);

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

  // Stat stages: 8 signed bytes at offset 0x18
  // Order: Atk, Def, Speed, SpAtk, SpDef, Accuracy, Evasion, ??? (8th unused)
  // Default = 6 (neutral), <6 = drop, >6 = boost
  const statStages: number[] = [];
  for (let i = 0; i < 8; i++) {
    statStages.push(dv.getInt8(off + 0x18 + i));
  }

  const ability = dv.getUint8(off + 0x20);

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

  const type1  = gameTypeToIndex(dv.getUint8(off + 0x21));
  const type2  = gameTypeToIndex(dv.getUint8(off + 0x22));
  const status = dv.getUint32(off + 0x4C, true);

  // Bug fix: personality is at 0x48, NOT 0x50 (0x50 is status2)
  const personality = dv.getUint32(off + 0x48, true);
  const status2     = dv.getUint32(off + 0x50, true);

  return {
    species,
    speciesName: getSpeciesName(species),
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

// Side status flags
const SIDE_REFLECT     = 0x01;
const SIDE_LIGHTSCREEN = 0x02;
const SIDE_SPIKES      = 0x10;
const SIDE_SAFEGUARD   = 0x20;
const SIDE_MIST        = 0x100;

function parseSideState(statusFlags: number, timersB64: string | undefined): SideState {
  const state: SideState = { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 };

  if (timersB64) {
    const dv = decodeBase64ToDataView(timersB64);
    if (dv.byteLength >= 12) {
      // Timer struct: reflectTimer@+0, lightscreenTimer@+2, mistTimer@+4, safeguardTimer@+6, spikesAmount@+0xA
      if (statusFlags & SIDE_REFLECT) state.reflect = dv.getUint16(0, true);
      if (statusFlags & SIDE_LIGHTSCREEN) state.lightScreen = dv.getUint16(2, true);
      if (statusFlags & SIDE_MIST) state.mist = dv.getUint16(4, true);
      if (statusFlags & SIDE_SAFEGUARD) state.safeguard = dv.getUint16(6, true);
      if (statusFlags & SIDE_SPIKES) state.spikes = dv.getUint8(0x0A);
    }
  } else {
    // No timer data, just use flag presence
    if (statusFlags & SIDE_REFLECT) state.reflect = 1;
    if (statusFlags & SIDE_LIGHTSCREEN) state.lightScreen = 1;
    if (statusFlags & SIDE_SAFEGUARD) state.safeguard = 1;
    if (statusFlags & SIDE_MIST) state.mist = 1;
    if (statusFlags & SIDE_SPIKES) state.spikes = 1;
  }

  return state;
}

function parseFieldState(values: BPREValues): FieldState {
  const weatherRaw = values.battle_weather ?? 0;
  return {
    weather: parseWeather(weatherRaw),
    weatherRaw,
    playerSide: parseSideState(values.side_status_player ?? 0, values.side_timers_player),
    enemySide: parseSideState(values.side_status_enemy ?? 0, values.side_timers_enemy),
  };
}

const EMPTY_SIDE: SideState = { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 };
const EMPTY_FIELD: FieldState = { weather: 'none', weatherRaw: 0, playerSide: { ...EMPTY_SIDE }, enemySide: { ...EMPTY_SIDE } };

const INACTIVE: BattleState = {
  active: false, isTrainer: false, isDoubles: false,
  player: null, enemy: null, player2: null, enemy2: null,
  field: EMPTY_FIELD,
};

function parseMons(values: BPREValues): BattleState {
  const raw = values.battle_mons;
  if (!raw) return INACTIVE;

  const dv = decodeBase64ToDataView(raw);
  const player = parseBattleMon(dv, 0);
  const enemy = parseBattleMon(dv, BATTLE_MON_SIZE);
  if (!player || !enemy) return INACTIVE;

  const isTrainer = ((values.battle_flags || 0) & 0x08) !== 0;
  const battlersCount = values.battlers_count ?? 2;
  const isDoubles = battlersCount >= 4;

  let player2: BattleMon | null = null;
  let enemy2: BattleMon | null = null;
  if (isDoubles) {
    player2 = parseBattleMon(dv, BATTLE_MON_SIZE * 2);
    enemy2 = parseBattleMon(dv, BATTLE_MON_SIZE * 3);
  }

  const field = parseFieldState(values);

  return { active: true, isTrainer, isDoubles, player, enemy, player2, enemy2, field };
}

export function parseBattle(values: BPREValues): BattleState {
  const inBattle = values.in_battle;

  // Primary gate: gMain.inBattle bit 1 (IWRAM 0x03003529)
  // Set at battle init, cleared at cleanup — every exit path.
  if (inBattle !== undefined) {
    if ((inBattle & 0x02) === 0) return INACTIVE;
    return parseMons(values);
  }

  // Safety-net fallback: IWRAM not readable (should not happen).
  // Use outcome + species/HP as a basic heuristic.
  const outcome = values.battle_outcome ?? 0;
  if (outcome !== 0) return INACTIVE;

  const raw = values.battle_mons;
  if (!raw) return INACTIVE;

  const dv = decodeBase64ToDataView(raw);
  const playerSpecies = dv.byteLength >= 2 ? dv.getUint16(0, true) : 0;
  const enemySpecies = dv.byteLength >= BATTLE_MON_SIZE + 2 ? dv.getUint16(BATTLE_MON_SIZE, true) : 0;

  if (playerSpecies > 0 && playerSpecies <= 386 && enemySpecies > 0 && enemySpecies <= 386) {
    const player = parseBattleMon(dv, 0);
    const enemy = parseBattleMon(dv, BATTLE_MON_SIZE);
    if (player && enemy && player.hp > 0 && enemy.hp > 0) {
      const isTrainer = ((values.battle_flags || 0) & 0x08) !== 0;
      const field = parseFieldState(values);
      return { active: true, isTrainer, isDoubles: false, player, enemy, player2: null, enemy2: null, field };
    }
  }

  return INACTIVE;
}

export function getNatureFromPV(pv: number) {
  return NATURES[pv % 25];
}
