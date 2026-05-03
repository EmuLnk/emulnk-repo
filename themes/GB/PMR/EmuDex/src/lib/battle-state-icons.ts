import type { Gen1SideStatus, Gen1StatMods } from "@emulnk/sdk/transforms/gen1";
import { stageLabel } from "./format.js";

export type BattleStateIconKind =
  | "attack"
  | "defense"
  | "speed"
  | "special"
  | "accuracy"
  | "evasion"
  | "reflect"
  | "light-screen"
  | "mist"
  | "substitute"
  | "confusion"
  | "trapping"
  | "recharge"
  | "leech-seed"
  | "disable";

export interface BattleStateIconModel {
  kind: BattleStateIconKind;
  label: string;
  value?: string;
  tone: "buff" | "debuff" | "field" | "danger";
}

const STAT_ICONS: Array<[keyof Gen1StatMods, BattleStateIconKind, string]> = [
  ["atk", "attack", "ATTACK"],
  ["def", "defense", "DEFENSE"],
  ["speed", "speed", "SPEED"],
  ["special", "special", "SPECIAL"],
  ["accuracy", "accuracy", "ACCURACY"],
  ["evasion", "evasion", "EVASION"],
];

function withValue(label: string, value: string | undefined): string {
  return value ? `${label} ${value}` : label;
}

function disableValue(status: Gen1SideStatus): string {
  return `${status.disabledMoveSlot || "-"}/${status.disabledTurns || "-"}`;
}

export function battleStateIcons(mods: Gen1StatMods, status: Gen1SideStatus): BattleStateIconModel[] {
  const icons: BattleStateIconModel[] = STAT_ICONS
    .filter(([key]) => mods[key] !== 0)
    .map(([key, kind, label]) => {
      const value = stageLabel(mods[key]);
      return {
        kind,
        label: `${label} ${value}`,
        value,
        tone: mods[key] > 0 ? "buff" : "debuff",
      };
    });

  if (status.reflect) icons.push({ kind: "reflect", label: "REFLECT", tone: "field" });
  if (status.lightScreen) icons.push({ kind: "light-screen", label: "LIGHT SCREEN", tone: "field" });
  if (status.protectedByMist) icons.push({ kind: "mist", label: "MIST", tone: "field" });
  if (status.hasSubstitute) {
    const value = status.substituteHp ? String(status.substituteHp) : undefined;
    icons.push({ kind: "substitute", label: withValue("SUBSTITUTE", value), value, tone: "field" });
  }
  if (status.confused) {
    const value = status.confusedTurns ? String(status.confusedTurns) : undefined;
    icons.push({ kind: "confusion", label: withValue("CONFUSION", value), value, tone: "danger" });
  }
  if (status.trapping) icons.push({ kind: "trapping", label: "TRAPPING", tone: "danger" });
  if (status.needsRecharge) icons.push({ kind: "recharge", label: "RECHARGE", tone: "danger" });
  if (status.seeded) icons.push({ kind: "leech-seed", label: "LEECH SEED", tone: "danger" });
  if (status.disabledMoveSlot || status.disabledTurns) {
    const value = disableValue(status);
    icons.push({ kind: "disable", label: withValue("DISABLE", value), value, tone: "danger" });
  }

  return icons;
}
