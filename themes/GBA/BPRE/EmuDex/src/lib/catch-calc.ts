import { getCatchRate } from "./rom-tables.js";

// Type indices matching type-chart.ts
const TYPE_BUG = 6;
const TYPE_WATER = 10;

// Status condition bitmasks (matching StatusBadge.svelte)
function getStatusMultiplier(status: number): number {
  if (status === 0) return 1;
  if ((status & 0x7) > 0) return 2;     // Sleep
  if (status & (1 << 5)) return 2;       // Freeze
  if (status & (1 << 3)) return 1.5;     // Poison
  if (status & (1 << 4)) return 1.5;     // Burn
  if (status & (1 << 6)) return 1.5;     // Paralysis
  if (status & (1 << 7)) return 1.5;     // Toxic
  return 1;
}

export interface BallResult {
  name: string;
  multiplier: number;
  probability: number;
  /** Contextual note (e.g. "Water/Bug type") */
  note: string;
}

/**
 * Gen 3 catch probability formula.
 * Returns probability 0-1 (1 = guaranteed).
 */
function catchProbability(
  maxHp: number,
  currentHp: number,
  catchRate: number,
  ballMultiplier: number,
  statusMultiplier: number,
): number {
  if (maxHp === 0) return 0;

  // Modified catch rate (X)
  const numerator = (3 * maxHp - 2 * currentHp) * catchRate * ballMultiplier;
  let x = Math.floor(numerator / (3 * maxHp));
  x = Math.floor(x * statusMultiplier);
  if (x < 1) x = 1;
  if (x >= 255) return 1;

  // Shake check threshold (Y)
  const y = Math.floor(1048560 / Math.sqrt(Math.sqrt(16711680 / x)));

  // Four independent shake checks
  const p = y / 65536;
  return Math.pow(p, 4);
}

export function calculateCatchRates(
  species: number,
  maxHp: number,
  currentHp: number,
  status: number,
  level: number,
  type1: number,
  type2: number,
  alreadyCaught: boolean,
): BallResult[] {
  const baseCatchRate = getCatchRate(species) || 45;
  const statusMult = getStatusMultiplier(status);
  const isWaterOrBug = type1 === TYPE_WATER || type2 === TYPE_WATER || type1 === TYPE_BUG || type2 === TYPE_BUG;

  const calc = (mult: number) => catchProbability(maxHp, currentHp, baseCatchRate, mult, statusMult);

  const results: BallResult[] = [
    { name: "Poké", multiplier: 1, probability: calc(1), note: "" },
    { name: "Great", multiplier: 1.5, probability: calc(1.5), note: "" },
    { name: "Ultra", multiplier: 2, probability: calc(2), note: "" },
  ];

  // Net Ball: 3x for Water or Bug types
  if (isWaterOrBug) {
    results.push({ name: "Net", multiplier: 3, probability: calc(3), note: "Water/Bug" });
  }

  // Nest Ball: (40 - level) / 10, minimum 1x — only useful below level 30
  if (level < 30) {
    const nestMult = (40 - level) / 10;
    results.push({ name: "Nest", multiplier: nestMult, probability: calc(nestMult), note: `Lv.${level}` });
  }

  // Repeat Ball: 3x if already caught
  if (alreadyCaught) {
    results.push({ name: "Repeat", multiplier: 3, probability: calc(3), note: "Caught" });
  }

  // Sort by probability descending (best ball first), but keep Poké/Great/Ultra at top
  const core = results.slice(0, 3);
  const special = results.slice(3).sort((a, b) => b.probability - a.probability);

  return [...core, ...special];
}
