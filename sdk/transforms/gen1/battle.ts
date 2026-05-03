import type { TransformDefinition } from "../types.js";
import { decodeBase64 } from "../../decode.js";
import {
  calcGen1CatchChance,
  getGen1SpeciesName,
  getGen1SpeciesInfo,
  getGen1TypeName,
  parseGen1BattleMon,
  parseGen1Status,
} from "../../parsers/pokemon-gen1.js";
import type { Gen1BattleState, Gen1Pokemon, Gen1SideStatus, Gen1StatMods } from "./types.js";

const EMPTY_STAT_MODS: Gen1StatMods = { atk: 0, def: 0, speed: 0, special: 0, accuracy: 0, evasion: 0 };
const EMPTY_SIDE_STATUS: Gen1SideStatus = {
  storingEnergy: false,
  thrashing: false,
  attackingMultipleTimes: false,
  flinched: false,
  charging: false,
  trapping: false,
  invulnerable: false,
  confused: false,
  usingXAccuracy: false,
  protectedByMist: false,
  gettingPumped: false,
  hasSubstitute: false,
  needsRecharge: false,
  usingRage: false,
  seeded: false,
  badlyPoisoned: false,
  lightScreen: false,
  reflect: false,
  transformed: false,
  numAttacksLeft: 0,
  confusedTurns: 0,
  toxicCounter: 0,
  disabledMoveSlot: 0,
  disabledTurns: 0,
  substituteHp: 0,
  selectedMoveId: 0,
  usedMoveId: 0,
  raw: [0, 0, 0],
};

interface EnemyHeaderHint {
  speciesId: number;
  type1: number;
  type2: number;
  catchRate: number;
  typeNames: [string, string];
}

export const INACTIVE_BATTLE: Gen1BattleState = {
  active: false,
  isTrainer: false,
  isSafari: false,
  isOldMan: false,
  player: null,
  enemy: null,
  playerStatMods: EMPTY_STAT_MODS,
  enemyStatMods: EMPTY_STAT_MODS,
  playerStatus: EMPTY_SIDE_STATUS,
  enemyStatus: EMPTY_SIDE_STATUS,
  catch: null,
};

function parseStatMods(raw?: string): Gen1StatMods {
  if (!raw) return EMPTY_STAT_MODS;
  const bytes = decodeBase64(raw);
  const stage = (idx: number) => {
    const value = bytes[idx];
    if (value == null || value < 1 || value > 13) return 0;
    return value - 7;
  };
  return {
    atk: stage(0),
    def: stage(1),
    speed: stage(2),
    special: stage(3),
    accuracy: stage(4),
    evasion: stage(5),
  };
}

interface SideStatusMemory {
  numAttacksLeft?: number;
  confusedTurns?: number;
  toxicCounter?: number;
  disabledMove?: number;
  substituteHp?: number;
  selectedMoveId?: number;
  usedMoveId?: number;
}

function parseSideStatus(raw?: string, memory: SideStatusMemory = {}): Gen1SideStatus {
  if (!raw) return { ...EMPTY_SIDE_STATUS, ...decodeSideStatusMemory(memory) };
  const bytes = decodeBase64(raw);
  const b0 = bytes[0] ?? 0;
  const b1 = bytes[1] ?? 0;
  const b2 = bytes[2] ?? 0;
  return {
    storingEnergy: (b0 & 0x01) !== 0,
    thrashing: (b0 & 0x02) !== 0,
    attackingMultipleTimes: (b0 & 0x04) !== 0,
    flinched: (b0 & 0x08) !== 0,
    charging: (b0 & 0x10) !== 0,
    trapping: (b0 & 0x20) !== 0,
    invulnerable: (b0 & 0x40) !== 0,
    confused: (b0 & 0x80) !== 0,
    usingXAccuracy: (b1 & 0x01) !== 0,
    protectedByMist: (b1 & 0x02) !== 0,
    gettingPumped: (b1 & 0x04) !== 0,
    hasSubstitute: (b1 & 0x10) !== 0,
    needsRecharge: (b1 & 0x20) !== 0,
    usingRage: (b1 & 0x40) !== 0,
    seeded: (b1 & 0x80) !== 0,
    badlyPoisoned: (b2 & 0x01) !== 0,
    lightScreen: (b2 & 0x02) !== 0,
    reflect: (b2 & 0x04) !== 0,
    transformed: (b2 & 0x08) !== 0,
    ...decodeSideStatusMemory(memory),
    raw: [b0, b1, b2],
  };
}

function decodeSideStatusMemory(memory: SideStatusMemory): Pick<
  Gen1SideStatus,
  "numAttacksLeft" | "confusedTurns" | "toxicCounter" | "disabledMoveSlot" |
  "disabledTurns" | "substituteHp" | "selectedMoveId" | "usedMoveId"
> {
  const disabledMove = memory.disabledMove ?? 0;
  return {
    numAttacksLeft: memory.numAttacksLeft ?? 0,
    confusedTurns: memory.confusedTurns ?? 0,
    toxicCounter: memory.toxicCounter ?? 0,
    disabledMoveSlot: disabledMove >> 4,
    disabledTurns: disabledMove & 0x0f,
    substituteHp: memory.substituteHp ?? 0,
    selectedMoveId: memory.selectedMoveId ?? 0,
    usedMoveId: memory.usedMoveId ?? 0,
  };
}

function cleanSpeciesHint(value: unknown): number | null {
  if (typeof value !== "number" || value <= 0 || value > 0xff) return null;
  return value;
}

function parseEnemyHeaderHint(values: Record<string, unknown>, expectedSpecies: number | null): EnemyHeaderHint | null {
  if (!expectedSpecies) return null;
  const headerSpecies = cleanSpeciesHint(values.mon_header_species);
  const raw = values.mon_header_types as string | undefined;
  if (headerSpecies !== expectedSpecies || !raw) return null;

  try {
    const bytes = decodeBase64(raw);
    const type1 = bytes[0];
    const type2 = bytes[1];
    const catchRate = bytes[2];
    if (type1 == null || type2 == null || catchRate == null) return null;
    return {
      speciesId: headerSpecies,
      type1,
      type2,
      catchRate,
      typeNames: [getGen1TypeName(type1), getGen1TypeName(type2)],
    };
  } catch {
    return null;
  }
}

function rawSideStatusTransformed(raw?: string): boolean {
  if (!raw) return false;
  try {
    const bytes = decodeBase64(raw);
    return ((bytes[2] ?? 0) & 0x08) !== 0;
  } catch {
    return false;
  }
}

function rejectMismatchedSpecies(mon: Gen1Pokemon | null, expectedSpecies?: number | null): Gen1Pokemon | null {
  if (!mon || !expectedSpecies || mon.speciesId === expectedSpecies) return mon;
  return null;
}

function parseBattleMon(raw?: string, speciesHint?: number | null, expectedSpecies?: number | null) {
  if (!raw) return null;
  try {
    const bytes = decodeBase64(raw);
    if (!hasUsefulBattleMonBytes(bytes)) return null;
    if (speciesHint) {
      if ((bytes[0] ?? 0) === 0) {
        bytes[0] = speciesHint;
        return rejectMismatchedSpecies(
          parseGen1BattleMon(new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), 0),
          expectedSpecies,
        );
      }
    }
    return rejectMismatchedSpecies(
      parseGen1BattleMon(new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), 0),
      expectedSpecies,
    );
  } catch {
    return null;
  }
}

function hasUsefulBattleMonBytes(bytes: Uint8Array): boolean {
  return bytes.some((byte) => byte !== 0);
}

function parseSplitBattleMon(headRaw?: string, tailRaw?: string, speciesHint?: number | null, expectedSpecies?: number | null) {
  if (!headRaw) return null;
  try {
    const head = decodeBase64(headRaw);
    const tail = tailRaw ? decodeBase64(tailRaw) : new Uint8Array();
    if (!hasUsefulBattleMonBytes(head) && !hasUsefulBattleMonBytes(tail)) return null;

    const bytes = new Uint8Array(0x1d);
    bytes.set(head.slice(0, 0x1b), 0);
    bytes.set(tail.slice(0, 2), 0x1b);
    if (speciesHint && bytes[0] === 0) bytes[0] = speciesHint;
    return rejectMismatchedSpecies(parseGen1BattleMon(new DataView(bytes.buffer), 0), expectedSpecies);
  } catch {
    return null;
  }
}

function applyEnemyHeaderHint(mon: Gen1Pokemon | null, header: EnemyHeaderHint | null): Gen1Pokemon | null {
  if (!mon || !header || mon.speciesId !== header.speciesId) return mon;
  return {
    ...mon,
    type1: header.type1,
    type2: header.type2,
    typeNames: header.typeNames,
    catchRate: header.catchRate,
  };
}

function fillEmptyPlayerMoves(player: Gen1Pokemon | null, partyValue: unknown): Gen1Pokemon | null {
  if (!player || player.moves.length > 0 || !Array.isArray(partyValue)) return player;
  const party = partyValue.filter((mon): mon is Gen1Pokemon => !!mon && typeof mon === "object");
  const fallback = party.find((mon) =>
    mon.speciesId === player.speciesId &&
    mon.level === player.level &&
    mon.maxhp === player.maxhp
  ) ?? party.find((mon) => mon.speciesId === player.speciesId);
  if (!fallback || fallback.moves.length === 0) return player;
  return { ...player, moves: fallback.moves };
}

function hasBattleStats(mon: Gen1Pokemon): boolean {
  return mon.stats.atk > 0 || mon.stats.def > 0 || mon.stats.speed > 0 || mon.stats.special > 0;
}

function activePartyFallback(partyValue: unknown, playerMonNumber: unknown, player: Gen1Pokemon | null): Gen1Pokemon | null {
  if (!Array.isArray(partyValue)) return player;
  const partySlots = partyValue as Array<Gen1Pokemon | null>;
  const party = partySlots.filter((mon): mon is Gen1Pokemon => !!mon && typeof mon === "object");
  const activeIndex = typeof playerMonNumber === "number" && playerMonNumber >= 0 && playerMonNumber < partySlots.length ? playerMonNumber : -1;
  const fallback = (activeIndex >= 0 ? partySlots[activeIndex] : null)
    ?? (player ? party.find((mon) => mon.speciesId === player.speciesId && mon.level === player.level) : null)
    ?? (player ? party.find((mon) => mon.speciesId === player.speciesId) : null)
    ?? party.find((mon) => mon.hp > 0)
    ?? null;
  if (!fallback) return player;
  if (!player) return fallback;

  return {
    ...player,
    nickname: player.nickname || fallback.nickname,
    hp: player.maxhp > 0 ? player.hp : fallback.hp,
    maxhp: player.maxhp > 0 ? player.maxhp : fallback.maxhp,
    moves: player.moves.length > 0 ? player.moves : fallback.moves,
    stats: hasBattleStats(player) ? player.stats : fallback.stats,
  };
}

function partialEnemyFromHint(speciesHint: number | null, level: number, header: EnemyHeaderHint | null): Gen1Pokemon | null {
  if (!speciesHint) return null;
  const speciesName = getGen1SpeciesName(speciesHint);
  const speciesInfo = getGen1SpeciesInfo(speciesHint);
  const typeNames: [string, string] = header?.typeNames ?? speciesInfo?.typeNames ?? ["???", "???"];
  return {
    speciesId: speciesHint,
    speciesName,
    nickname: speciesName,
    level,
    hp: 0,
    maxhp: 0,
    status: parseGen1Status(0),
    type1: header?.type1 ?? speciesInfo?.type1 ?? 0xff,
    type2: header?.type2 ?? speciesInfo?.type2 ?? 0xff,
    typeNames,
    catchRate: header?.catchRate ?? speciesInfo?.catchRate ?? 0,
    moves: [],
    dvs: { hp: 0, atk: 0, def: 0, speed: 0, special: 0 },
    stats: { atk: 0, def: 0, speed: 0, special: 0 },
  };
}

export const battleTransform: TransformDefinition = {
  id: "battle",
  inputs: [
    "party",
    "player_mon_number",
    "battle_result",
    "enemy_species_hint",
    "mon_header_species",
    "mon_header_types",
    "enemy_mon",
    "enemy_mon_head",
    "enemy_mon_tail",
    "enemy_actual_catch_rate",
    "player_battle_mon",
    "cur_enemy_level",
    "in_battle",
    "battle_type",
    "player_stat_mods",
    "player_battle_status",
    "enemy_battle_status",
    "enemy_stat_mods",
    "player_num_attacks_left",
    "player_confused_counter",
    "player_toxic_counter",
    "player_disabled_move",
    "enemy_num_attacks_left",
    "enemy_confused_counter",
    "enemy_toxic_counter",
    "enemy_disabled_move",
    "player_substitute_hp",
    "enemy_substitute_hp",
    "player_selected_move",
    "enemy_selected_move",
    "player_used_move",
    "enemy_used_move",
  ],
  after: ["party"],
  fn(ctx) {
    const values = ctx.values as Record<string, unknown>;
    const inBattle = (values.in_battle as number) || 0;
    if (inBattle === 0 || inBattle === 0xff) {
      return { battle: INACTIVE_BATTLE };
    }

    const enemySpeciesHint = cleanSpeciesHint(values.enemy_species_hint);
    const enemyHeaderHint = parseEnemyHeaderHint(values, enemySpeciesHint);
    const enemyExpectedSpecies = enemyHeaderHint && !rawSideStatusTransformed(values.enemy_battle_status as string | undefined)
      ? enemyHeaderHint.speciesId
      : null;
    const enemyLevel = (values.cur_enemy_level as number) || 0;
    const enemy = applyEnemyHeaderHint(
      parseBattleMon(values.enemy_mon as string | undefined, enemySpeciesHint, enemyExpectedSpecies)
        ?? parseSplitBattleMon(
          values.enemy_mon_head as string | undefined,
          values.enemy_mon_tail as string | undefined,
          enemySpeciesHint,
          enemyExpectedSpecies,
        ),
      enemyHeaderHint,
    )
      ?? partialEnemyFromHint(enemySpeciesHint, enemyLevel, enemyHeaderHint);
    const parsedPlayer = fillEmptyPlayerMoves(parseBattleMon(values.player_battle_mon as string | undefined), values.party);
    const player = activePartyFallback(values.party, values.player_mon_number, parsedPlayer);

    const battleType = (values.battle_type as number) || 0;
    const isSafari = battleType === 2;
    const isOldMan = battleType === 1;
    const isTrainer = inBattle === 2;
    const catchRate = enemy ? ((values.enemy_actual_catch_rate as number | undefined) ?? enemy.catchRate) : 0;
    const hasCatchStats = !!enemy && enemy.maxhp > 0 && enemy.hp > 0 && catchRate > 0;

    const catchOdds = !enemy || isTrainer || !hasCatchStats ? null : {
      poke: calcGen1CatchChance({ ball: "poke", maxHp: enemy.maxhp, currentHp: enemy.hp, catchRate, status: enemy.status.raw }),
      great: calcGen1CatchChance({ ball: "great", maxHp: enemy.maxhp, currentHp: enemy.hp, catchRate, status: enemy.status.raw }),
      ultra: calcGen1CatchChance({ ball: "ultra", maxHp: enemy.maxhp, currentHp: enemy.hp, catchRate, status: enemy.status.raw }),
      safari: calcGen1CatchChance({ ball: "safari", maxHp: enemy.maxhp, currentHp: enemy.hp, catchRate, status: enemy.status.raw }),
      master: calcGen1CatchChance({ ball: "master", maxHp: enemy.maxhp, currentHp: enemy.hp, catchRate, status: enemy.status.raw }),
    };

    const battle: Gen1BattleState = {
      active: true,
      isTrainer,
      isSafari,
      isOldMan,
      player,
      enemy,
      playerStatMods: parseStatMods(values.player_stat_mods as string | undefined),
      enemyStatMods: parseStatMods(values.enemy_stat_mods as string | undefined),
      playerStatus: parseSideStatus(values.player_battle_status as string | undefined, {
        numAttacksLeft: values.player_num_attacks_left as number | undefined,
        confusedTurns: values.player_confused_counter as number | undefined,
        toxicCounter: values.player_toxic_counter as number | undefined,
        disabledMove: values.player_disabled_move as number | undefined,
        substituteHp: values.player_substitute_hp as number | undefined,
        selectedMoveId: values.player_selected_move as number | undefined,
        usedMoveId: values.player_used_move as number | undefined,
      }),
      enemyStatus: parseSideStatus(values.enemy_battle_status as string | undefined, {
        numAttacksLeft: values.enemy_num_attacks_left as number | undefined,
        confusedTurns: values.enemy_confused_counter as number | undefined,
        toxicCounter: values.enemy_toxic_counter as number | undefined,
        disabledMove: values.enemy_disabled_move as number | undefined,
        substituteHp: values.enemy_substitute_hp as number | undefined,
        selectedMoveId: values.enemy_selected_move as number | undefined,
        usedMoveId: values.enemy_used_move as number | undefined,
      }),
      catch: catchOdds,
    };

    return { battle };
  },
};
