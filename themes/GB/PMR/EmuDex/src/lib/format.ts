import { typeEffectiveness } from "@emulnk/sdk/parsers/pokemon-gen1";
import type { Gen1MoveSlot, Gen1Pokemon } from "@emulnk/sdk/transforms/gen1";
import {
  FRONT_SPRITE_ATLAS_HEIGHT,
  FRONT_SPRITE_ATLAS_PATH,
  FRONT_SPRITE_ATLAS_WIDTH,
  FRONT_SPRITE_FRAMES,
  type FrontSpriteFrame,
} from "./front-atlas.generated.js";

export const POKEMON_SPRITE_ATLAS_WIDTH = FRONT_SPRITE_ATLAS_WIDTH;
export const POKEMON_SPRITE_ATLAS_HEIGHT = FRONT_SPRITE_ATLAS_HEIGHT;

const SPRITE_OVERRIDES: Record<string, string> = {
  "NIDORAN♂": "nidoranm",
  "NIDORAN♀": "nidoranf",
  "MR.MIME": "mr.mime",
  "FARFETCH'D": "farfetchd",
};

export function hpPercent(mon: Pick<Gen1Pokemon, "hp" | "maxhp"> | null): number {
  if (!mon || mon.maxhp <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((mon.hp / mon.maxhp) * 100)));
}

export function hpTone(mon: Pick<Gen1Pokemon, "hp" | "maxhp"> | null): "high" | "mid" | "low" {
  const pct = hpPercent(mon);
  if (pct > 50) return "high";
  if (pct >= 25) return "mid";
  return "low";
}

export function percent(value: number): string {
  return `${Math.max(0, Math.min(100, value * 100)).toFixed(1)}%`;
}

export function stageLabel(value: number): string {
  return value > 0 ? `+${value}` : String(value);
}

export function ppLabel(move: Gen1MoveSlot): string {
  return `${move.pp}/${move.maxPp || "--"}`;
}

export function battleEffectLabel(move: Pick<Gen1MoveSlot, "typeId" | "power">, target: Pick<Gen1Pokemon, "type1" | "type2"> | null): string {
  if (!target || move.power <= 0) return "";
  const mult = typeEffectiveness(move.typeId, target.type1, target.type2);
  if (mult === 0) return "0x";
  if (mult === 0.25) return "1/4x";
  if (mult === 0.5) return "1/2x";
  if (mult === 2) return "2x";
  if (mult === 4) return "4x";
  return "1x";
}

export type BattleEffectTone = "status" | "unknown" | "immune" | "resist2" | "resist" | "neutral" | "super" | "super2";

export interface BattleMoveSignals {
  effectLabel: string;
  effectTone: BattleEffectTone;
  stab: boolean;
  status: boolean;
}

export interface MoveSlotConfidence {
  kind: "known" | "unknown" | "empty";
  label: string;
}

function battleEffectTone(label: string): BattleEffectTone {
  if (label === "0x") return "immune";
  if (label === "1/4x") return "resist2";
  if (label === "1/2x") return "resist";
  if (label === "2x") return "super";
  if (label === "4x") return "super2";
  if (label === "1x") return "neutral";
  return "unknown";
}

export function battleMoveSignals(
  move: Gen1MoveSlot,
  target: Pick<Gen1Pokemon, "type1" | "type2"> | null,
  attacker?: Pick<Gen1Pokemon, "type1" | "type2"> | null,
): BattleMoveSignals {
  if (move.power <= 0) {
    return {
      effectLabel: "",
      effectTone: "status",
      stab: false,
      status: true,
    };
  }

  const effectLabel = battleEffectLabel(move, target);
  return {
    effectLabel,
    effectTone: battleEffectTone(effectLabel),
    stab: !!attacker && (move.typeId === attacker.type1 || move.typeId === attacker.type2),
    status: false,
  };
}

export function moveSlotConfidence(move: Pick<Gen1MoveSlot, "id"> | null, side: "player" | "enemy"): MoveSlotConfidence {
  if (move) return { kind: "known", label: side === "enemy" ? "SCANNED" : "KNOWN" };
  return { kind: "empty", label: "EMPTY" };
}

export function visibleBattleMoves(moves: readonly (Gen1MoveSlot | null | undefined)[]): Gen1MoveSlot[] {
  return moves.filter((move): move is Gen1MoveSlot => !!move && move.id > 0);
}

export function battleMoveNote(
  move: Gen1MoveSlot,
  target: Pick<Gen1Pokemon, "type1" | "type2"> | null,
  attacker?: Pick<Gen1Pokemon, "type1" | "type2"> | null,
): string {
  const signals = battleMoveSignals(move, target, attacker);
  if (signals.status) return "STATUS";

  const notes: string[] = [];
  if (signals.stab) notes.push("STAB");

  if (signals.effectLabel && signals.effectLabel !== "1x") notes.push(signals.effectLabel);

  return notes.join(" ");
}

export function typeToken(typeName: string): string {
  return typeName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function spriteBase(speciesName: string): string | null {
  if (!speciesName || speciesName.includes("MISSINGNO")) return null;
  const upper = speciesName.toUpperCase();
  return SPRITE_OVERRIDES[upper] ?? upper.toLowerCase().replace(/[' ]/g, "");
}

export function pokemonSpritePath(speciesName: string | undefined): string | null {
  const base = speciesName ? spriteBase(speciesName) : null;
  if (!base) return null;
  return FRONT_SPRITE_FRAMES[base] ? FRONT_SPRITE_ATLAS_PATH : null;
}

export function pokemonSpriteFrame(speciesName: string | undefined): FrontSpriteFrame | null {
  const base = speciesName ? spriteBase(speciesName) : null;
  return base ? FRONT_SPRITE_FRAMES[base] ?? null : null;
}

function gen1MovePriority(moveId: number): number {
  if (moveId === 98) return 1; // Quick Attack.
  if (moveId === 68) return -1; // Counter.
  return 0;
}

export type TurnOrderSide = "player" | "enemy" | "tie";
export type TurnOrderReason = "priority" | "speed" | "tie";

export interface TurnOrderSummary {
  first: TurnOrderSide;
  second: Exclude<TurnOrderSide, "tie"> | null;
  label: string;
  reason: TurnOrderReason;
  playerSpeed: number;
  enemySpeed: number;
}

export function turnOrderSummary(
  player: Pick<Gen1Pokemon, "stats"> | null,
  enemy: Pick<Gen1Pokemon, "stats"> | null,
  playerMoveId = 0,
  enemyMoveId = 0,
): TurnOrderSummary | null {
  if (!player || !enemy) return null;

  const playerSpeed = player.stats.speed;
  const enemySpeed = enemy.stats.speed;
  const playerPriority = gen1MovePriority(playerMoveId);
  const enemyPriority = gen1MovePriority(enemyMoveId);

  if (playerPriority > enemyPriority) {
    return {
      first: "player",
      second: "enemy",
      label: playerPriority > 0 ? "YOU QUICK" : "YOU FIRST",
      reason: "priority",
      playerSpeed,
      enemySpeed,
    };
  }
  if (enemyPriority > playerPriority) {
    return {
      first: "enemy",
      second: "player",
      label: enemyPriority > 0 ? "FOE QUICK" : "FOE FIRST",
      reason: "priority",
      playerSpeed,
      enemySpeed,
    };
  }

  if (playerSpeed > enemySpeed) {
    return { first: "player", second: "enemy", label: "YOU FIRST", reason: "speed", playerSpeed, enemySpeed };
  }
  if (enemySpeed > playerSpeed) {
    return { first: "enemy", second: "player", label: "FOE FIRST", reason: "speed", playerSpeed, enemySpeed };
  }
  return { first: "tie", second: null, label: "SPEED TIE", reason: "tie", playerSpeed, enemySpeed };
}
