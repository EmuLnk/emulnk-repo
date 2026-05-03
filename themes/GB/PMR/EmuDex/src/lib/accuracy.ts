import type { Gen1MoveSlot, Gen1SideStatus, Gen1StatMods } from "@emulnk/sdk/transforms/gen1";

export interface Gen1AccuracySummary {
  chance: number;
  label: string;
  show: boolean;
  tone: "good" | "warn" | "bad";
  modified: boolean;
  bypassed: boolean;
}

export function accuracyChipValue(summary: Pick<Gen1AccuracySummary, "label">): string {
  return summary.label.replace(/^HIT\s+/, "");
}

const STAGE_RATIOS: Array<[number, number]> = [
  [25, 100],
  [28, 100],
  [33, 100],
  [40, 100],
  [50, 100],
  [66, 100],
  [1, 1],
  [15, 10],
  [2, 1],
  [25, 10],
  [3, 1],
  [35, 10],
  [4, 1],
];

function ratioForStage(stage: number): [number, number] {
  const index = Math.max(0, Math.min(12, Math.round(stage) + 6));
  return STAGE_RATIOS[index] ?? [1, 1];
}

function applyRatio(value: number, stage: number): number {
  const [num, den] = ratioForStage(stage);
  return Math.max(1, Math.floor((value * num) / den));
}

function toneForChance(chance: number): Gen1AccuracySummary["tone"] {
  if (chance >= 90) return "good";
  if (chance >= 80) return "warn";
  return "bad";
}

export function gen1AccuracySummary(
  move: Gen1MoveSlot,
  attackerMods: Gen1StatMods,
  targetMods: Gen1StatMods,
  attackerStatus: Gen1SideStatus,
): Gen1AccuracySummary {
  if (attackerStatus.usingXAccuracy) {
    return {
      chance: 100,
      label: "X-ACC",
      show: true,
      tone: "good",
      modified: true,
      bypassed: true,
    };
  }

  const baseAccuracy = Math.max(1, Math.min(100, move.accuracy || 100));
  const modified = attackerMods.accuracy !== 0 || targetMods.evasion !== 0;
  const afterAccuracy = applyRatio(baseAccuracy, attackerMods.accuracy);
  const chance = Math.max(1, Math.min(100, applyRatio(afterAccuracy, -targetMods.evasion)));
  const show = modified || chance < 90 || (move.power <= 0 && chance < 100);

  return {
    chance,
    label: show ? `HIT ${chance}%` : "",
    show,
    tone: toneForChance(chance),
    modified,
    bypassed: false,
  };
}
