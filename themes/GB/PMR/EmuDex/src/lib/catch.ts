import type {
  Gen1BagBallKey,
  Gen1BagState,
  Gen1BattleState,
  Gen1BallInventory,
  Gen1BallKey,
  Gen1CatchResult,
  Gen1SafariState,
} from "@emulnk/sdk/transforms/gen1";

const BALL_LABELS: Record<Gen1BallKey, string> = {
  master: "MASTER",
  ultra: "ULTRA",
  great: "GREAT",
  poke: "POKe",
  safari: "SAFARI",
};

export interface CatchOption {
  key: Gen1BallKey;
  label: string;
  name: string;
  quantity: number;
  source: "bag" | "safari";
  itemId: number;
  odds: Gen1CatchResult;
  best: boolean;
}

export interface CatchContext {
  bestLabel: string;
  hpLabel: string;
  hpTone: "good" | "warn" | "bad";
  statusLabel: string;
  statusTone: "good" | "warn" | "bad";
  inventoryLabel: string;
}

interface BuildCatchOptionsInput {
  battle: Pick<Gen1BattleState, "isSafari" | "catch">;
  bag: Pick<Gen1BagState, "balls">;
  safari: Pick<Gen1SafariState, "balls">;
}

interface BuildCatchContextInput {
  battle: Pick<Gen1BattleState, "enemy"> & Partial<Pick<Gen1BattleState, "isSafari">>;
  options: CatchOption[];
}

function isBagBall(ball: Gen1BallInventory): ball is Gen1BallInventory & { key: Gen1BagBallKey; source: "bag" } {
  return ball.source === "bag" && ball.key !== "safari";
}

function markBest(options: Omit<CatchOption, "best">[]): CatchOption[] {
  let bestIndex = -1;
  let bestPercent = -1;
  for (let i = 0; i < options.length; i++) {
    const percent = options[i].odds.percent;
    if (percent > bestPercent) {
      bestPercent = percent;
      bestIndex = i;
    }
  }
  return options.map((option, index) => ({ ...option, best: index === bestIndex }));
}

export function buildCatchOptions({ battle, bag, safari }: BuildCatchOptionsInput): CatchOption[] {
  if (!battle.catch) return [];

  if (battle.isSafari) {
    if (safari.balls <= 0) return [];
    return markBest([{
      key: "safari",
      label: BALL_LABELS.safari,
      name: "SAFARI BALL",
      quantity: safari.balls,
      source: "safari",
      itemId: 0x08,
      odds: battle.catch.safari,
    }]);
  }

  return markBest(
    bag.balls
      .filter((ball) => ball.quantity > 0 && isBagBall(ball))
      .map((ball) => ({
        key: ball.key,
        label: BALL_LABELS[ball.key],
        name: ball.name,
        quantity: ball.quantity,
        source: ball.source,
        itemId: ball.itemId,
        odds: battle.catch![ball.key],
      })),
  );
}

export function shouldShowBattleCatchStrip(options: readonly CatchOption[]): boolean {
  return options.length > 0;
}

export function buildCatchContext({ battle, options }: BuildCatchContextInput): CatchContext {
  const best = options.find((option) => option.best) ?? options[0] ?? null;
  const totalBalls = options.reduce((sum, option) => sum + option.quantity, 0);
  const sourceLabel = battle.isSafari || options.some((option) => option.source === "safari") ? "SAFARI" : "BAG";
  const hpPercent = battle.enemy && battle.enemy.maxhp > 0 ? Math.round((battle.enemy.hp / battle.enemy.maxhp) * 100) : 100;
  const hpLabel = hpPercent <= 33 ? "HP LOW" : hpPercent <= 66 ? "HP MID" : "HP HIGH";
  const hpTone = hpPercent <= 33 ? "good" : hpPercent <= 66 ? "warn" : "bad";
  const status = battle.enemy?.status;
  const statusBoosted = !!status && status.label !== "OK" && status.catchBonus > 0;

  return {
    bestLabel: best ? `BEST ${best.label}` : "NO BALLS",
    hpLabel,
    hpTone,
    statusLabel: statusBoosted ? `${status.label} BOOST` : "NO STATUS",
    statusTone: statusBoosted ? "good" : "bad",
    inventoryLabel: `${sourceLabel} x${totalBalls}`,
  };
}
