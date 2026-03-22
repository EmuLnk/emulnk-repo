import type { SafariRecommendation } from "./types.js";

/**
 * Safari Zone catch probability (Safari Ball, full HP, no status).
 * Matches Cmd_catchpokemon from pokefirered decomp.
 */
function safariCatchProb(catchFactor: number): number {
  const catchRate = Math.floor(catchFactor * 1275 / 100);
  // Safari Ball 1.5x at full HP: x = floor(floor(catchRate / 3) * 15 / 10)
  const a1 = Math.floor(catchRate / 3);
  const x = Math.floor(a1 * 15 / 10);
  if (x <= 0) return 0;
  if (x >= 255) return 1;
  const y = Math.floor(1048560 / Math.sqrt(Math.sqrt(16711680 / x)));
  const p = y / 65536;
  return Math.pow(p, 4);
}

/**
 * Safari Zone flee probability based on escape factor and active timers.
 * Matches Cmd_if_random_safari_flee from pokefirered decomp.
 */
function safariFleeProb(escapeFactor: number, rockCounter: number, baitCounter: number): number {
  let rate: number;
  if (rockCounter > 0) {
    rate = Math.min(escapeFactor * 2, 20);
  } else if (baitCounter > 0) {
    rate = Math.max(Math.floor(escapeFactor / 4), 1);
  } else {
    rate = escapeFactor;
  }
  return Math.min((rate * 5) / 100, 1);
}

interface DPResult { value: number; action: 'ball' | 'bait' | 'rock' | 'watch'; }

/**
 * MDP solver for optimal Safari Zone strategy.
 * Uses backward induction over the state space:
 *   (ballsLeft, catchFactor, rockCounter, baitCounter)
 *
 * State space: 30 × 20 × 7 × 7 ≈ 29,400 states — trivially fast.
 *
 * Transition rules match pokefirered decomp:
 * - Ball: catch check → flee check → balls-1 (timers unchanged)
 * - Bait: cf >>= 1 (min 3), clear rock, bait += 2-6 (cap 6) → flee check
 * - Rock: cf <<= 1 (max 20), clear bait, rock += 2-6 (cap 6) → flee check
 * - Watch: decrement active timer; if rock expires, cf resets to base → flee check
 */
function createSolver(baseCatchFactor: number, escapeFactor: number) {
  const memo = new Map<number, DPResult>();
  const computing = new Set<number>();

  function key(b: number, cf: number, rc: number, bc: number): number {
    return ((b << 15) | (cf << 6) | (rc << 3) | bc);
  }

  function dp(balls: number, cf: number, rc: number, bc: number): DPResult {
    if (balls <= 0) return { value: 0, action: 'ball' };

    const k = key(balls, cf, rc, bc);
    const cached = memo.get(k);
    if (cached) return cached;

    // Cycle detection: non-ball actions don't decrease balls,
    // so states can recurse to themselves at fixed points (e.g. cf=3 with bait).
    // Breaking the cycle with value=0 is correct: repeating a non-progressing
    // action forever means the Pokemon eventually flees (value → 0).
    if (computing.has(k)) return { value: 0, action: 'ball' };
    computing.add(k);

    let best: DPResult = { value: -1, action: 'ball' };

    // Action: Ball — catch check, then flee check, timers unchanged
    {
      const pCatch = safariCatchProb(cf);
      const pFlee = safariFleeProb(escapeFactor, rc, bc);
      const vNext = dp(balls - 1, cf, rc, bc).value;
      const value = pCatch + (1 - pCatch) * (1 - pFlee) * vNext;
      if (value > best.value) best = { value, action: 'ball' };
    }

    // Action: Bait — halve catch factor, clear rock, add bait timer
    {
      const newCF = Math.max(cf >> 1, 3);
      let value = 0;
      for (let add = 2; add <= 6; add++) {
        const newBC = Math.min(bc + add, 6);
        const pFlee = safariFleeProb(escapeFactor, 0, newBC);
        value += 0.2 * (1 - pFlee) * dp(balls, newCF, 0, newBC).value;
      }
      if (value > best.value) best = { value, action: 'bait' };
    }

    // Action: Rock — double catch factor, clear bait, add rock timer
    {
      const newCF = Math.min(cf << 1, 20);
      let value = 0;
      for (let add = 2; add <= 6; add++) {
        const newRC = Math.min(rc + add, 6);
        const pFlee = safariFleeProb(escapeFactor, newRC, 0);
        value += 0.2 * (1 - pFlee) * dp(balls, newCF, newRC, 0).value;
      }
      if (value > best.value) best = { value, action: 'rock' };
    }

    // Action: Watch — decrement active timer, possibly reset catch factor
    {
      let newRC = rc, newBC = bc, newCF = cf;
      if (rc > 0) {
        newRC = rc - 1;
        if (newRC === 0) newCF = baseCatchFactor;
      } else if (bc > 0) {
        newBC = bc - 1;
      }
      const pFlee = safariFleeProb(escapeFactor, newRC, newBC);
      const value = (1 - pFlee) * dp(balls, newCF, newRC, newBC).value;
      if (value > best.value) best = { value, action: 'watch' };
    }

    computing.delete(k);
    memo.set(k, best);
    return best;
  }

  return dp;
}

// Cache solver per encounter parameters
let cachedBaseCF = -1;
let cachedEF = -1;
let cachedSolver: ReturnType<typeof createSolver> | null = null;

export function getSafariRecommendation(
  ballsLeft: number,
  catchFactor: number,
  escapeFactor: number,
  rockCounter: number,
  baitCounter: number,
  baseCatchFactor: number,
): SafariRecommendation {
  // Rebuild solver if encounter parameters changed
  if (baseCatchFactor !== cachedBaseCF || escapeFactor !== cachedEF) {
    cachedBaseCF = baseCatchFactor;
    cachedEF = escapeFactor;
    cachedSolver = createSolver(baseCatchFactor, escapeFactor);
  }

  const result = cachedSolver!(ballsLeft, catchFactor, rockCounter, baitCounter);

  return {
    action: result.action,
    catchProb: safariCatchProb(catchFactor),
    fleeProb: safariFleeProb(escapeFactor, rockCounter, baitCounter),
    overallProb: result.value,
  };
}

/** Compute initial catch factor from species base catch rate. */
export function initialCatchFactor(speciesCatchRate: number): number {
  return Math.floor(speciesCatchRate * 100 / 1275);
}

/** Compute initial escape factor from species safari flee rate. */
export function initialEscapeFactor(safariFleeRate: number): number {
  const ef = Math.floor(safariFleeRate * 100 / 1275);
  return ef <= 1 ? 2 : ef;
}
