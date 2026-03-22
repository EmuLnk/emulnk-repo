import type { BattleMon, FieldState } from "./types.js";
import { CALC_ABILITIES } from "./abilities.js";

export interface TurnOrderEntry {
  mon: BattleMon;
  side: 'player' | 'enemy' | 'partner';
  effectiveSpeed: number;
  tied: boolean;
}

// Stat stage multipliers: stage 0-12, where 6=neutral
// stage 0=2/8, 1=2/7, ..., 6=2/2=1.0, 7=3/2, ..., 12=8/2
const STAGE_NUMERATORS   = [2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 6, 7, 8];
const STAGE_DENOMINATORS = [8, 7, 6, 5, 4, 3, 2, 2, 2, 2, 2, 2, 2];

function stageMultiplier(stage: number): number {
  const s = Math.max(0, Math.min(12, stage));
  return STAGE_NUMERATORS[s] / STAGE_DENOMINATORS[s];
}

export function calcTurnOrder(
  mons: { mon: BattleMon; side: 'player' | 'enemy' | 'partner' }[],
  field: FieldState,
): TurnOrderEntry[] {
  const entries: TurnOrderEntry[] = mons.map(({ mon, side }) => {
    // Base speed * stat stage multiplier
    // statStages[2] is the Speed stage (index: Atk=0, Def=1, Speed=2, SpAtk=3, SpDef=4, Acc=5, Eva=6)
    let speed = Math.floor(mon.speed * stageMultiplier(mon.statStages[2]));

    // Weather-based speed abilities
    const abilityData = CALC_ABILITIES[mon.ability];
    const effects = Array.isArray(abilityData) ? abilityData : abilityData ? [abilityData] : [];
    for (const effect of effects) {
      if (effect.type === 'speed' && effect.weatherCondition === field.weather && effect.multiplier) {
        speed = Math.floor(speed * effect.multiplier);
      }
    }

    // Paralysis: 0.25x speed (status & 0x40)
    if (mon.status & 0x40) {
      speed = Math.floor(speed * 0.25);
    }

    return { mon, side, effectiveSpeed: speed, tied: false };
  });

  // Sort descending by effective speed (fastest first)
  entries.sort((a, b) => b.effectiveSpeed - a.effectiveSpeed);

  // Mark ties
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      if (entries[j].effectiveSpeed === entries[i].effectiveSpeed) {
        entries[i].tied = true;
        entries[j].tied = true;
      }
    }
  }

  return entries;
}
