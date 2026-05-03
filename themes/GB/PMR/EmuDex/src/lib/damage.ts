import type { Gen1MoveSlot, Gen1Pokemon, Gen1Status } from "@emulnk/sdk/transforms/gen1";
import { typeEffectiveness } from "@emulnk/sdk/parsers/pokemon-gen1";

export interface Gen1DamageContext {
  attackerStatus?: Pick<Gen1Status, "raw"> | null;
  // Active Gen 1 battle stats already include burn/paralysis penalties.
  attackerStatsIncludeStatusPenalties?: boolean;
  targetReflect?: boolean;
  targetLightScreen?: boolean;
  critical?: boolean;
}

export interface Gen1DamageSummary {
  min: number;
  max: number;
  minPct: number;
  maxPct: number;
  label: string;
  koLabel: string;
  hitsToKoBest: number | null;
  hitsToKoWorst: number | null;
  koGuaranteed: boolean;
  koPossible: boolean;
  tone: "status" | "immune" | "chip" | "threat" | "ko";
  stab: boolean;
  effectiveness: number;
  isStatus: boolean;
}

export function damageChipValue(summary: Pick<Gen1DamageSummary, "label">): string {
  return summary.label.replace(/^(?:DMG|CRIT)\s+/, "");
}

function emptySummary(overrides: Partial<Gen1DamageSummary> = {}): Gen1DamageSummary {
  return {
    min: 0,
    max: 0,
    minPct: 0,
    maxPct: 0,
    label: "",
    koLabel: "",
    hitsToKoBest: null,
    hitsToKoWorst: null,
    koGuaranteed: false,
    koPossible: false,
    tone: "status",
    stab: false,
    effectiveness: 1,
    isStatus: true,
    ...overrides,
  };
}

function isSpecialType(typeId: number): boolean {
  return typeId >= 0x14;
}

function scaledDamageStats(attack: number, defense: number): { attack: number; defense: number } {
  if (attack <= 255 && defense <= 255) {
    return { attack: Math.max(1, attack), defense: Math.max(1, defense) };
  }

  return {
    attack: Math.max(1, Math.floor(attack / 4)),
    defense: Math.max(1, Math.floor(defense / 4)),
  };
}

function baseDamage(level: number, power: number, attack: number, defense: number): number {
  const levelFactor = Math.floor((Math.max(1, level) * 2) / 5) + 2;
  const neutral = Math.floor(Math.floor(Math.floor((levelFactor * power * attack) / defense) / 50)) + 2;
  return Math.min(999, Math.max(1, neutral));
}

function applyRandom(damage: number, roll: number): number {
  if (damage < 2) return damage;
  return Math.floor((damage * roll) / 255);
}

export function gen1DamageSummary(
  move: Gen1MoveSlot,
  attacker: Gen1Pokemon | null,
  target: Gen1Pokemon | null,
  context: Gen1DamageContext = {},
): Gen1DamageSummary {
  if (!attacker || !target || move.power <= 0) {
    return emptySummary();
  }

  const special = isSpecialType(move.typeId);
  const critical = !!context.critical;
  const burned = !!context.attackerStatus && (context.attackerStatus.raw & 0x10) !== 0;
  let rawAttack = special ? attacker.stats.special : attacker.stats.atk;
  let rawDefense = special ? target.stats.special : target.stats.def;
  if (!critical) {
    if (!special && burned && !context.attackerStatsIncludeStatusPenalties) rawAttack = Math.floor(rawAttack / 2);
    if (!special && context.targetReflect) rawDefense *= 2;
    if (special && context.targetLightScreen) rawDefense *= 2;
  }
  const stats = scaledDamageStats(rawAttack, rawDefense);
  const stab = move.typeId === attacker.type1 || move.typeId === attacker.type2;
  const effectiveness = typeEffectiveness(move.typeId, target.type1, target.type2);

  if (effectiveness === 0) {
    return emptySummary({
      label: "0%",
      koLabel: "IMM",
      tone: "immune",
      stab,
      effectiveness,
      isStatus: false,
    });
  }

  let damage = baseDamage(critical ? attacker.level * 2 : attacker.level, move.power, stats.attack, stats.defense);
  if (stab) damage = Math.floor((damage * 3) / 2);
  damage = Math.floor(damage * effectiveness);

  const min = applyRandom(damage, 217);
  const max = applyRandom(damage, 255);
  const currentHp = Math.max(1, target.hp);
  const minPct = Math.round((min / currentHp) * 100);
  const maxPct = Math.round((max / currentHp) * 100);
  const koGuaranteed = min >= currentHp;
  const koPossible = max >= currentHp;
  const hitsToKoBest = max > 0 ? Math.ceil(currentHp / max) : null;
  const hitsToKoWorst = min > 0 ? Math.ceil(currentHp / min) : null;

  const prefix = critical ? "CRIT" : "DMG";

  return {
    min,
    max,
    minPct,
    maxPct,
    label: minPct === maxPct ? `${prefix} ${maxPct}%` : `${prefix} ${minPct}-${maxPct}%`,
    koLabel: koGuaranteed ? "KO!" : "",
    hitsToKoBest,
    hitsToKoWorst,
    koGuaranteed,
    koPossible,
    tone: koGuaranteed ? "ko" : "chip",
    stab,
    effectiveness,
    isStatus: false,
  };
}
