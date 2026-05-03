export interface BattleDisplayOptions {
  showDamage: boolean;
  showAccuracy: boolean;
  showEffectLabels: boolean;
  showFieldStates: boolean;
  showTurnOrder: boolean;
  showEnemyMoves: boolean;
  showCatchRate: boolean;
  showWeaknesses: boolean;
  showSpriteAnimations: boolean;
}

export interface PartyDisplayOptions {
  showDvs: boolean;
  showStatExp: boolean;
  showEvolution: boolean;
  showSpriteAnimations: boolean;
}

export interface DexDisplayOptions {
  showAllAreas: boolean;
}

export function settingBool(settings: Record<string, string | undefined>, id: string, fallback = false): boolean {
  const value = settings[id];

  if (value === "true") return true;
  if (value === "false") return false;

  return fallback;
}

export function battleDisplayOptions(settings: Record<string, string | undefined>): BattleDisplayOptions {
  return {
    showDamage: settingBool(settings, "battle-show-damage", true),
    showAccuracy: settingBool(settings, "battle-show-accuracy", true),
    showEffectLabels: settingBool(settings, "battle-show-eff-label", true),
    showFieldStates: settingBool(settings, "battle-show-field", true),
    showTurnOrder: settingBool(settings, "battle-show-turn-order", true),
    showEnemyMoves: settingBool(settings, "battle-show-enemy-moves", true),
    showCatchRate: settingBool(settings, "battle-show-catch-rate", true),
    showWeaknesses: settingBool(settings, "battle-show-weaknesses", false),
    showSpriteAnimations: settingBool(settings, "sprite-animations", true),
  };
}

export function partyDisplayOptions(settings: Record<string, string | undefined>): PartyDisplayOptions {
  return {
    showDvs: settingBool(settings, "party-show-dvs", true),
    showStatExp: settingBool(settings, "party-show-stat-exp", true),
    showEvolution: settingBool(settings, "party-show-evolution", true),
    showSpriteAnimations: settingBool(settings, "sprite-animations", true),
  };
}

export function dexDisplayOptions(settings: Record<string, string | undefined>): DexDisplayOptions {
  return {
    showAllAreas: settingBool(settings, "dex-show-all", false),
  };
}
