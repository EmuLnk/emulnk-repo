import type { SafariRecommendation, PokeblockReaction } from "./types.js";
import { NATURES } from "@emulink/sdk/parsers/pokemon-gen3";

/**
 * Safari Zone catch probability (Safari Ball, full HP, no status).
 * Matches Cmd_catchpokemon from pokeemerald decomp.
 */
function safariCatchProb(catchFactor: number): number {
  const catchRate = Math.floor(catchFactor * 1275 / 100);
  const a1 = Math.floor(catchRate / 3);
  const x = Math.floor(a1 * 15 / 10);
  if (x <= 0) return 0;
  if (x >= 255) return 1;
  const y = Math.floor(1048560 / Math.sqrt(Math.sqrt(16711680 / x)));
  const p = y / 65536;
  return Math.pow(p, 4);
}

/**
 * Safari Zone flee probability.
 * Emerald: safariFleeRate = escapeFactor * 5; flee if Random()%100 < rate
 */
function safariFleeProb(escapeFactor: number): number {
  return Math.min((escapeFactor * 5) / 100, 1);
}

// Go Near tables (indexed by goNearCounter BEFORE increment)
const GO_NEAR_CATCH = [4, 3, 2, 1] as const;
const GO_NEAR_ESCAPE = [4, 4, 4, 4] as const;

// Pokeblock escape reduction table (indexed by counter AFTER increment)
// Columns: CURIOUS(0), ENTHRALLED(1), IGNORED(2)
const PKBL_ESCAPE: readonly (readonly number[])[] = [
  [0, 0, 0], // [0] never accessed
  [3, 5, 0], // [1] first throw
  [2, 3, 0], // [2] second throw
  [1, 2, 0], // [3] third+ throw
];

const REACTION_INDEX: Record<PokeblockReaction, number> = {
  curious: 0,
  enthralled: 1,
  ignored: 2,
};

interface DPResult { value: number; action: 'ball' | 'gonear' | 'pokeblock'; }

/**
 * MDP solver for Emerald Safari Zone.
 * State: (ballsLeft, catchFactor, escapeFactor, goNearCount, pkblCount)
 * 31 x 21 x 21 x 4 x 4 = 218,736 states per reaction type.
 */
function createSolver(reaction: PokeblockReaction) {
  const memo = new Map<number, DPResult>();
  const ri = REACTION_INDEX[reaction];

  function key(b: number, cf: number, ef: number, gn: number, pk: number): number {
    return (b << 14) | (cf << 9) | (ef << 4) | (gn << 2) | pk;
  }

  function dp(balls: number, cf: number, ef: number, gn: number, pk: number): DPResult {
    if (balls <= 0) return { value: 0, action: 'ball' };

    const k = key(balls, cf, ef, gn, pk);
    const cached = memo.get(k);
    if (cached) return cached;

    let best: DPResult = { value: -1, action: 'ball' };

    // Throw Ball
    {
      const pCatch = safariCatchProb(cf);
      const pFlee = safariFleeProb(ef);
      const vNext = dp(balls - 1, cf, ef, gn, pk).value;
      const value = pCatch + (1 - pCatch) * (1 - pFlee) * vNext;
      if (value > best.value) best = { value, action: 'ball' };
    }

    // Go Near (if counter < 3)
    if (gn < 3) {
      const newCF = Math.min(cf + GO_NEAR_CATCH[gn], 20);
      const newEF = Math.min(ef + GO_NEAR_ESCAPE[gn], 20);
      const pFlee = safariFleeProb(newEF);
      const value = (1 - pFlee) * dp(balls, newCF, newEF, gn + 1, pk).value;
      if (value > best.value) best = { value, action: 'gonear' };
    }

    // Throw Pokeblock (if counter < 3 and reaction isn't IGNORED)
    if (pk < 3 && ri !== 2) {
      const newPK = pk + 1;
      const reduction = PKBL_ESCAPE[newPK][ri];
      let newEF: number;
      if (ef > 1) {
        // ROM bug: uses < instead of <=, so ef can reach 0 when ef === reduction
        if (ef < reduction) newEF = 1;
        else newEF = ef - reduction;
      } else {
        newEF = ef;
      }
      const pFlee = safariFleeProb(newEF);
      const value = (1 - pFlee) * dp(balls, cf, newEF, gn, newPK).value;
      if (value > best.value) best = { value, action: 'pokeblock' };
    }

    memo.set(k, best);
    return best;
  }

  return dp;
}

// Cache solvers per reaction type
const solverCache = new Map<PokeblockReaction, ReturnType<typeof createSolver>>();

function getSolver(reaction: PokeblockReaction): ReturnType<typeof createSolver> {
  let solver = solverCache.get(reaction);
  if (!solver) {
    solver = createSolver(reaction);
    solverCache.set(reaction, solver);
  }
  return solver;
}

export function getSafariRecommendation(
  ballsLeft: number,
  catchFactor: number,
  escapeFactor: number,
  goNearCount: number,
  pkblCount: number,
  reaction: PokeblockReaction,
): SafariRecommendation {
  const solver = getSolver(reaction);
  const result = solver(ballsLeft, catchFactor, escapeFactor, goNearCount, pkblCount);

  return {
    action: result.action,
    catchProb: safariCatchProb(catchFactor),
    fleeProb: safariFleeProb(escapeFactor),
    overallProb: result.value,
  };
}

/** Compute initial catch factor from species base catch rate. */
export function initialCatchFactor(speciesCatchRate: number): number {
  return Math.floor(speciesCatchRate * 100 / 1275);
}

// Pokeblock inventory analysis

// Flavor compatibility table: gPokeblockFlavorCompatibilityTable[nature * 5 + flavor]
// Values: +1 = likes, 0 = neutral, -1 = dislikes
// Flavors: 0=Spicy, 1=Dry, 2=Sweet, 3=Bitter, 4=Sour
const FLAVOR_TABLE: readonly number[] = [
//  Spicy Dry  Sweet Bitter Sour
     0,   0,   0,    0,    0,  // Hardy
     1,   0,   0,    0,   -1,  // Lonely
     1,   0,  -1,    0,    0,  // Brave
     1,  -1,   0,    0,    0,  // Adamant
     1,   0,   0,   -1,    0,  // Naughty
    -1,   0,   0,    0,    1,  // Bold
     0,   0,   0,    0,    0,  // Docile
     0,   0,  -1,    0,    1,  // Relaxed
     0,  -1,   0,    0,    1,  // Impish
     0,   0,   0,   -1,    1,  // Lax
    -1,   0,   1,    0,    0,  // Timid
     0,   0,   1,    0,   -1,  // Hasty
     0,   0,   0,    0,    0,  // Serious
     0,  -1,   1,    0,    0,  // Jolly
     0,   0,   1,   -1,    0,  // Naive
    -1,   1,   0,    0,    0,  // Modest
     0,   1,   0,    0,   -1,  // Mild
     0,   1,  -1,    0,    0,  // Quiet
     0,   0,   0,    0,    0,  // Bashful
     0,   1,   0,   -1,    0,  // Rash
    -1,   0,   0,    1,    0,  // Calm
     0,   0,   0,    1,   -1,  // Gentle
     0,   0,  -1,    1,    0,  // Sassy
     0,  -1,   0,    1,    0,  // Careful
     0,   0,   0,    0,    0,  // Quirky
];

const POKEBLOCK_COLORS = [
  '', 'Red', 'Blue', 'Pink', 'Green', 'Yellow',
  'Purple', 'Indigo', 'Brown', 'LiteBlue', 'Olive',
  'Gray', 'Black', 'White', 'Gold',
];

interface PokeblockSlot {
  color: number;
  spicy: number;
  dry: number;
  sweet: number;
  bitter: number;
  sour: number;
}

/**
 * Compute the reaction a Pokeblock would get from a given nature.
 * Matches PokeblockGetGain from pokeemerald: sums value * compatibility for each flavor.
 */
function pokeblockReaction(block: PokeblockSlot, natureIndex: number): PokeblockReaction {
  const flavors = [block.spicy, block.dry, block.sweet, block.bitter, block.sour];
  let gain = 0;
  for (let f = 0; f < 5; f++) {
    if (flavors[f] > 0) {
      gain += flavors[f] * FLAVOR_TABLE[natureIndex * 5 + f];
    }
  }
  if (gain > 0) return 'enthralled';
  if (gain < 0) return 'ignored';
  return 'curious';
}

/**
 * Parse the Pokeblock case from save1_hi_block and find the best one
 * for the given nature.
 *
 * @param hiBlock - Raw bytes of save1_hi region (512 bytes from 0x02026200)
 * @param save1Ptr - SaveBlock1 pointer value
 * @param natureIndex - Wild Pokemon's nature (personality % 25)
 * @returns Best reaction achievable and which Pokeblock to use
 */
export function analyzePokeblocksForNature(
  hiBlock: Uint8Array,
  save1Ptr: number,
  natureIndex: number,
): { reaction: PokeblockReaction; pokeblockName: string; hasAny: boolean } {
  // Pokeblocks at SaveBlock1 + 0x848
  // save1_hi base = 0x02026200 = SAVE1_REGION(0x02025A00) + 0x800
  const off = (save1Ptr - 0x02025A00) + 0x848 - 0x800; // offset within hi block

  if (off < 0 || off + 280 > hiBlock.length) {
    return { reaction: 'ignored', pokeblockName: '', hasAny: false };
  }

  // 0=ignored, 1=curious, 2=enthralled (higher is better)
  let bestRank = 0;
  let bestName = '';
  let hasAny = false;

  for (let i = 0; i < 40; i++) {
    const base = off + i * 7;
    const color = hiBlock[base];
    if (color === 0) continue; // empty slot

    hasAny = true;
    const block: PokeblockSlot = {
      color,
      spicy: hiBlock[base + 1],
      dry: hiBlock[base + 2],
      sweet: hiBlock[base + 3],
      bitter: hiBlock[base + 4],
      sour: hiBlock[base + 5],
    };

    const reaction = pokeblockReaction(block, natureIndex);
    const rank = reaction === 'enthralled' ? 2 : reaction === 'curious' ? 1 : 0;

    if (rank > bestRank) {
      bestRank = rank;
      bestName = (POKEBLOCK_COLORS[color] || '???') + ' Pokeblock';
    }

    if (bestRank === 2) break; // found best possible
  }

  const bestReaction: PokeblockReaction = bestRank === 2 ? 'enthralled' : bestRank === 1 ? 'curious' : 'ignored';

  return { reaction: bestReaction, pokeblockName: bestName, hasAny };
}

/**
 * Get the ideal Pokeblock flavor for a nature (for display when inventory is unavailable).
 */
// Stat index to flavor index: Atk=Spicy, Def=Sour, Spd=Sweet, SpA=Dry, SpD=Bitter
const STAT_TO_FLAVOR = [0, 4, 2, 1, 3] as const;
const FLAVOR_NAMES = ['Spicy', 'Dry', 'Sweet', 'Bitter', 'Sour'] as const;
const FLAVOR_COLORS = ['Red', 'Blue', 'Pink', 'Green', 'Yellow'] as const;

export function idealFlavorForNature(natureIndex: number): { flavor: string; color: string } | null {
  const nature = NATURES[natureIndex];
  if (!nature || nature.p < 0) return null;
  const fi = STAT_TO_FLAVOR[nature.p];
  return { flavor: FLAVOR_NAMES[fi], color: FLAVOR_COLORS[fi] };
}
