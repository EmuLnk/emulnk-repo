import { getCatchRate } from "./rom-tables.js";
import type { BagBall } from "./types.js";

const TYPE_BUG = 6;
const TYPE_WATER = 10;

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
  itemId: number;
  multiplier: number;
  probability: number;
  /** Contextual note (e.g. "Water/Bug") */
  note: string;
}

interface BallContext {
  isWaterOrBug: boolean;
  level: number;
  alreadyCaught: boolean;
}

interface BallDef {
  name: string;
  getMultiplier: (ctx: BallContext) => number;
  getNote: (ctx: BallContext) => string;
}

const BALL_DEFS: Record<number, BallDef> = {
  2:  { name: "Ultra",   getMultiplier: () => 2,   getNote: () => "" },
  3:  { name: "Great",   getMultiplier: () => 1.5, getNote: () => "" },
  4:  { name: "Poké",    getMultiplier: () => 1,   getNote: () => "" },
  6:  { name: "Net",     getMultiplier: (c) => c.isWaterOrBug ? 3 : 1, getNote: (c) => c.isWaterOrBug ? "Water/Bug" : "" },
  7:  { name: "Dive",    getMultiplier: () => 1,   getNote: () => "" },
  8:  { name: "Nest",    getMultiplier: (c) => c.level < 40 ? Math.max((40 - c.level) / 10, 1) : 1, getNote: (c) => c.level < 40 ? `Lv.${c.level}` : "" },
  9:  { name: "Repeat",  getMultiplier: (c) => c.alreadyCaught ? 3 : 1, getNote: (c) => c.alreadyCaught ? "Caught" : "" },
  10: { name: "Timer",   getMultiplier: () => 1,   getNote: () => "" },
  11: { name: "Luxury",  getMultiplier: () => 1,   getNote: () => "" },
  12: { name: "Premier", getMultiplier: () => 1,   getNote: () => "" },
};

function catchProbability(
  maxHp: number,
  currentHp: number,
  catchRate: number,
  ballMultiplier: number,
  statusMultiplier: number,
): number {
  if (maxHp === 0) return 0;

  const numerator = (3 * maxHp - 2 * currentHp) * catchRate * ballMultiplier;
  let x = Math.floor(numerator / (3 * maxHp));
  x = Math.floor(x * statusMultiplier);
  if (x < 1) x = 1;
  if (x >= 255) return 1;

  const y = Math.floor(1048560 / Math.sqrt(Math.sqrt(16711680 / x)));
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
  bagBalls: BagBall[],
): BallResult[] {
  const baseCatchRate = getCatchRate(species) || 45;
  const statusMult = getStatusMultiplier(status);
  const isWaterOrBug = type1 === TYPE_WATER || type2 === TYPE_WATER || type1 === TYPE_BUG || type2 === TYPE_BUG;
  const ctx: BallContext = { isWaterOrBug, level, alreadyCaught };

  const calc = (mult: number) => catchProbability(maxHp, currentHp, baseCatchRate, mult, statusMult);

  const results: BallResult[] = [];
  for (const { itemId } of bagBalls) {
    const def = BALL_DEFS[itemId];
    if (!def) continue;
    const mult = def.getMultiplier(ctx);
    results.push({
      name: def.name,
      itemId,
      multiplier: mult,
      probability: calc(mult),
      note: def.getNote(ctx),
    });
  }

  results.sort((a, b) => b.probability - a.probability);
  return results;
}
