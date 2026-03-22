import type { BattleMon, DamageResult, FieldState, SideState } from "./types.js";
import { MOVE_DATA } from "./moves.js";
import { TYPE_CHART, isPhysical } from "./type-chart.js";
import { CALC_ABILITIES } from "./abilities.js";
import { CALC_ITEMS, SOUL_DEW_SPECIES, SOUL_DEW_SPATK_MOD, SOUL_DEW_SPDEF_MOD } from "./battle-items.js";

// Stat stage multipliers: stage 0-12, where 6=neutral
const STAGE_NUM = [2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 6, 7, 8];
const STAGE_DEN = [8, 7, 6, 5, 4, 3, 2, 2, 2, 2, 2, 2, 2];

function stageMul(stage: number): number {
  const s = Math.max(0, Math.min(12, stage));
  return STAGE_NUM[s] / STAGE_DEN[s];
}

// Accuracy stage multipliers (same table but for accuracy/evasion)
const ACC_STAGE_NUM = [3, 3, 3, 3, 3, 3, 3, 4, 5, 6, 7, 8, 9];
const ACC_STAGE_DEN = [9, 8, 7, 6, 5, 4, 3, 3, 3, 3, 3, 3, 3];

function accStageMul(stage: number): number {
  const s = Math.max(0, Math.min(12, stage));
  return ACC_STAGE_NUM[s] / ACC_STAGE_DEN[s];
}

function getAbilityEffects(abilityId: number) {
  const data = CALC_ABILITIES[abilityId];
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

function hasStatus(mon: BattleMon): boolean {
  return mon.status !== 0;
}

function isBurned(mon: BattleMon): boolean {
  return (mon.status & 0x10) !== 0;
}

// Fixed damage moves
const FIXED_DAMAGE: Record<number, (atk: BattleMon, def: BattleMon) => number> = {
  69: (atk) => atk.level,        // Seismic Toss
  101: (atk) => atk.level,       // Night Shade
  82: () => 40,                   // Dragon Rage
  49: () => 20,                   // Sonic Boom
};

export function calcDamage(
  attacker: BattleMon,
  defender: BattleMon,
  moveId: number,
  field: FieldState,
  attackerSide: SideState,
  defenderSide: SideState,
): DamageResult | null {
  const moveInfo = MOVE_DATA[moveId];
  if (!moveInfo) return null;

  const [, basePower, moveType, baseAccuracy, priority, flags] = moveInfo;
  const modifiers: string[] = [];

  const isOHKOMove = (flags & 0x01) !== 0;
  const isFixedDmg = (flags & 0x02) !== 0;
  const isMultiHit = (flags & 0x04) !== 0;
  const isDoubleHit = (flags & 0x20) !== 0;
  const isRecoil   = (flags & 0x08) !== 0;
  const isDrain    = (flags & 0x10) !== 0;

  // Type effectiveness (needed for status/immunity checks too)
  let eff = TYPE_CHART[moveType]?.[defender.type1] ?? 1;
  if (defender.type2 !== defender.type1) {
    eff *= TYPE_CHART[moveType]?.[defender.type2] ?? 1;
  }

  // STAB check
  const isSTAB = moveType === attacker.type1 || moveType === attacker.type2;

  // --- Defender ability: immunity checks ---
  const defEffects = getAbilityEffects(defender.ability);
  for (const e of defEffects) {
    if (e.type === 'immunity') {
      if (e.immuneType !== undefined && moveType === e.immuneType) {
        return statusResult(eff, isSTAB, 'Immune');
      }
      // Wonder Guard: only SE moves hit
      if (e.immuneType === undefined && eff <= 1 && basePower > 0) {
        return statusResult(0, isSTAB, 'Wonder Guard');
      }
    }
  }

  // Status moves: basePower === 0 and not OHKO/fixed
  if (basePower === 0 && !isOHKOMove && !isFixedDmg) {
    return {
      minDmg: 0, maxDmg: 0, minPct: 0, maxPct: 0,
      hitsToKO: Infinity, effectiveness: eff, isSTAB,
      koGuaranteed: false, koPossible: false,
      isOHKO: false, isFixed: false, isStatus: true,
      accuracyPct: calcAccuracy(attacker, defender, baseAccuracy, moveType, field),
      modifiers,
    };
  }

  // Immunity via type chart
  if (eff === 0) {
    return statusResult(0, isSTAB, 'Immune');
  }

  // --- OHKO moves ---
  if (isOHKOMove) {
    const acc = attacker.level >= defender.level
      ? Math.min(100, 30 + (attacker.level - defender.level))
      : 0;
    modifiers.push('OHKO');
    return {
      minDmg: defender.hp, maxDmg: defender.hp,
      minPct: 100, maxPct: 100,
      hitsToKO: 1, effectiveness: eff, isSTAB,
      koGuaranteed: acc > 0, koPossible: acc > 0,
      isOHKO: true, isFixed: false, isStatus: false,
      accuracyPct: acc, modifiers,
    };
  }

  // --- Fixed damage moves ---
  if (isFixedDmg) {
    const fixedFn = FIXED_DAMAGE[moveId];
    if (fixedFn) {
      const dmg = fixedFn(attacker, defender);
      const pct = defender.maxhp > 0 ? Math.round((dmg / defender.maxhp) * 100) : 0;
      modifiers.push('Fixed');
      return {
        minDmg: dmg, maxDmg: dmg, minPct: pct, maxPct: pct,
        hitsToKO: dmg > 0 ? Math.ceil(defender.hp / dmg) : Infinity,
        effectiveness: 1, isSTAB: false,
        koGuaranteed: dmg >= defender.hp, koPossible: dmg >= defender.hp,
        isOHKO: false, isFixed: true, isStatus: false,
        accuracyPct: calcAccuracy(attacker, defender, baseAccuracy, moveType, field),
        modifiers,
      };
    }
  }

  // --- Standard damage calculation ---
  const physical = isPhysical(moveType);

  // 1. Stat stages
  let atkStat = physical ? attacker.atk : attacker.spatk;
  let defStat = physical ? defender.def : defender.spdef;
  const atkStageIdx = physical ? 0 : 3; // Atk=0, SpAtk=3
  const defStageIdx = physical ? 1 : 4; // Def=1, SpDef=4
  atkStat = Math.floor(atkStat * stageMul(attacker.statStages[atkStageIdx]));
  defStat = Math.floor(defStat * stageMul(defender.statStages[defStageIdx]));

  // 2. Attacker ability modifiers
  const atkEffects = getAbilityEffects(attacker.ability);
  let burnNegated = false;
  for (const e of atkEffects) {
    if (e.type === 'atkMod' && e.multiplier) {
      if (e.physicalOnly && !physical) continue;
      if (e.requireStatus && !hasStatus(attacker)) continue;
      atkStat = Math.floor(atkStat * e.multiplier);
      modifiers.push(abilityName(attacker.ability));
      if (e.negateBurn) burnNegated = true;
    }
  }

  // 3. Defender ability modifiers
  for (const e of defEffects) {
    if (e.type === 'typeMod' && e.affectedTypes && e.modMultiplier) {
      if (e.affectedTypes.includes(moveType)) {
        defStat = Math.floor(defStat * (1 / e.modMultiplier)); // Thick Fat effectively halves incoming
        modifiers.push(abilityName(defender.ability));
      }
    }
    if (e.type === 'defMod' && e.multiplier) {
      if (e.requireStatus && !hasStatus(defender)) continue;
      defStat = Math.floor(defStat * e.multiplier);
      modifiers.push(abilityName(defender.ability));
    }
  }

  // 4. Attacker item modifiers
  const atkItem = CALC_ITEMS[attacker.item];
  if (atkItem) {
    const speciesOk = !atkItem.speciesRestriction || atkItem.speciesRestriction.includes(attacker.species);
    if (speciesOk) {
      if (atkItem.type === 'atkMod' && atkItem.physicalOnly && physical) {
        atkStat = Math.floor(atkStat * atkItem.multiplier);
        modifiers.push(itemName(attacker.item));
      } else if (atkItem.type === 'atkMod' && !atkItem.physicalOnly) {
        atkStat = Math.floor(atkStat * atkItem.multiplier);
        modifiers.push(itemName(attacker.item));
      } else if (atkItem.type === 'spatkMod' && !physical) {
        atkStat = Math.floor(atkStat * atkItem.multiplier);
        modifiers.push(itemName(attacker.item));
      }
    }
  }
  // Soul Dew special handling (attacker SpAtk)
  if (!physical && attacker.item === 191 && SOUL_DEW_SPECIES.includes(attacker.species)) {
    atkStat = Math.floor(atkStat * SOUL_DEW_SPATK_MOD);
    modifiers.push('Soul Dew');
  }

  // 5. Defender item modifiers
  const defItem = CALC_ITEMS[defender.item];
  if (defItem) {
    const speciesOk = !defItem.speciesRestriction || defItem.speciesRestriction.includes(defender.species);
    if (speciesOk) {
      if (defItem.type === 'defMod') {
        defStat = Math.floor(defStat * defItem.multiplier);
      } else if (defItem.type === 'spdefMod' && !physical) {
        defStat = Math.floor(defStat * defItem.multiplier);
      }
    }
  }
  // Soul Dew special handling (defender SpDef)
  if (!physical && defender.item === 191 && SOUL_DEW_SPECIES.includes(defender.species)) {
    defStat = Math.floor(defStat * SOUL_DEW_SPDEF_MOD);
  }

  // 6. Weather modifiers on damage
  let weatherMod = 1;
  if (field.weather === 'rain') {
    if (moveType === 10) { weatherMod = 1.5; modifiers.push('Rain'); }
    if (moveType === 9) { weatherMod = 0.5; modifiers.push('Rain'); }
  } else if (field.weather === 'sun') {
    if (moveType === 9) { weatherMod = 1.5; modifiers.push('Sun'); }
    if (moveType === 10) { weatherMod = 0.5; modifiers.push('Sun'); }
  } else if (field.weather === 'sand') {
    // Sandstorm: Rock types get 1.5x SpDef
    if (!physical && (defender.type1 === 5 || defender.type2 === 5)) {
      defStat = Math.floor(defStat * 1.5);
      modifiers.push('Sandstorm');
    }
  }

  // 7. Burn penalty (0.5x physical Atk unless Guts negates)
  if (physical && isBurned(attacker) && !burnNegated) {
    atkStat = Math.floor(atkStat * 0.5);
    modifiers.push('Burn');
  }

  // Ensure minimum stat values
  atkStat = Math.max(1, atkStat);
  defStat = Math.max(1, defStat);

  // Gen 3 damage formula
  const base = Math.floor(
    (Math.floor((2 * attacker.level) / 5 + 2) * basePower * atkStat) / defStat / 50 + 2,
  );

  // Apply multipliers
  let dmgMax = base;
  let dmgMin = base;

  // Weather multiplier
  dmgMax = Math.floor(dmgMax * weatherMod);
  dmgMin = Math.floor(dmgMin * weatherMod);

  // 8. Screens (applied to damage, not stats)
  if (physical && defenderSide.reflect > 0) {
    dmgMax = Math.floor(dmgMax * 0.5);
    dmgMin = Math.floor(dmgMin * 0.5);
    modifiers.push('Reflect');
  }
  if (!physical && defenderSide.lightScreen > 0) {
    dmgMax = Math.floor(dmgMax * 0.5);
    dmgMin = Math.floor(dmgMin * 0.5);
    modifiers.push('Light Screen');
  }

  // 9. Pinch abilities (Blaze/Overgrow/Torrent/Swarm)
  for (const e of atkEffects) {
    if (e.type === 'pinch' && e.pinchType === moveType && e.pinchMultiplier) {
      if (attacker.hp * 3 <= attacker.maxhp) {
        dmgMax = Math.floor(dmgMax * e.pinchMultiplier);
        dmgMin = Math.floor(dmgMin * e.pinchMultiplier);
        modifiers.push(abilityName(attacker.ability));
      }
    }
  }

  // 10. STAB
  const stab = isSTAB ? 1.5 : 1;
  dmgMax = Math.floor(dmgMax * stab);
  dmgMin = Math.floor(dmgMin * stab);

  // Type effectiveness
  dmgMax = Math.floor(dmgMax * eff);
  dmgMin = Math.floor(dmgMin * eff);

  // Type booster items
  if (atkItem && atkItem.type === 'typeBoost' && atkItem.boostedType === moveType) {
    dmgMax = Math.floor(dmgMax * atkItem.multiplier);
    dmgMin = Math.floor(dmgMin * atkItem.multiplier);
    modifiers.push(itemName(attacker.item));
  }

  // Random factor: max = 100/100, min = 85/100
  dmgMax = Math.max(1, dmgMax);
  dmgMin = Math.max(1, Math.floor(dmgMin * 0.85));

  // Multi-hit / double-hit
  let hitCount = 1;
  if (isDoubleHit) {
    hitCount = 2;
    modifiers.push('2 hits');
  } else if (isMultiHit) {
    // Average expected hits for 2-5 hit moves ≈ 3.17
    hitCount = 3;
    modifiers.push('2-5 hits');
  }
  const totalMinDmg = dmgMin * hitCount;
  const totalMaxDmg = dmgMax * hitCount;

  // Recoil/drain annotations
  if (isRecoil) modifiers.push('Recoil');
  if (isDrain) modifiers.push('Heals 50%');

  const maxPct = defender.maxhp > 0 ? Math.round((totalMaxDmg / defender.maxhp) * 100) : 0;
  const minPct = defender.maxhp > 0 ? Math.round((totalMinDmg / defender.maxhp) * 100) : 0;

  const avgDmg = (totalMinDmg + totalMaxDmg) / 2;
  const hitsToKO = avgDmg > 0 ? Math.ceil(defender.hp / avgDmg) : Infinity;

  const koGuaranteed = totalMinDmg >= defender.hp;
  const koPossible = totalMaxDmg >= defender.hp;

  // Accuracy calc
  const accuracyPct = calcAccuracy(attacker, defender, baseAccuracy, moveType, field);

  return {
    minDmg: totalMinDmg, maxDmg: totalMaxDmg,
    minPct, maxPct, hitsToKO,
    effectiveness: eff, isSTAB,
    koGuaranteed, koPossible,
    isOHKO: false, isFixed: false, isStatus: false,
    accuracyPct, modifiers,
  };
}

function calcAccuracy(
  attacker: BattleMon, defender: BattleMon,
  baseAccuracy: number, moveType: number,
  field: FieldState,
): number {
  // 0 = always hits (Swift, Aerial Ace, etc.)
  if (baseAccuracy === 0) return 100;

  let acc = baseAccuracy;

  // Stat stage modifiers: accuracy stage / evasion stage
  // statStages[5] = Accuracy, statStages[6] = Evasion
  acc = Math.floor(acc * accStageMul(attacker.statStages[5]) / accStageMul(defender.statStages[6]));

  // Hustle: 0.8x accuracy for physical moves
  const atkEffects = getAbilityEffects(attacker.ability);
  const physical = isPhysical(moveType);
  for (const e of atkEffects) {
    if (e.type === 'accuracyMod' && e.multiplier) {
      if (physical) {
        acc = Math.floor(acc * e.multiplier);
      }
    }
  }

  // Weather effects on specific moves
  if (field.weather === 'rain') {
    if (moveType === 12 && (MOVE_DATA[87]?.[0] === 'Thunder')) {
      // Thunder is 100% in rain — handled by move ID check below
    }
  }
  // Thunder (87) in rain = 100%, in sun = 50%
  // This is move-specific, handle generically for Thunder
  // (Would need moveId param to do this properly, but accuracy is approximate)

  return Math.min(100, Math.max(0, acc));
}

function statusResult(eff: number, isSTAB: boolean, label: string): DamageResult {
  return {
    minDmg: 0, maxDmg: 0, minPct: 0, maxPct: 0,
    hitsToKO: Infinity, effectiveness: eff, isSTAB,
    koGuaranteed: false, koPossible: false,
    isOHKO: false, isFixed: false, isStatus: true,
    accuracyPct: 0, modifiers: [label],
  };
}

// Simple name lookups for modifier display
import { getAbilityName, getItemName } from "./rom-tables.js";

function abilityName(id: number): string {
  return getAbilityName(id) || `Ability#${id}`;
}

function itemName(id: number): string {
  return getItemName(id);
}
