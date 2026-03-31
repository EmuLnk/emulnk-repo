export const ABILITY_NAMES: Record<number, string> = {
  0: 'None',
  1: 'Stench',
  2: 'Drizzle',
  3: 'Speed Boost',
  4: 'Battle Armor',
  5: 'Sturdy',
  6: 'Damp',
  7: 'Limber',
  8: 'Sand Veil',
  9: 'Static',
  10: 'Volt Absorb',
  11: 'Water Absorb',
  12: 'Oblivious',
  13: 'Cloud Nine',
  14: 'Compound Eyes',
  15: 'Insomnia',
  16: 'Color Change',
  17: 'Immunity',
  18: 'Flash Fire',
  19: 'Shield Dust',
  20: 'Own Tempo',
  21: 'Suction Cups',
  22: 'Intimidate',
  23: 'Shadow Tag',
  24: 'Rough Skin',
  25: 'Wonder Guard',
  26: 'Levitate',
  27: 'Effect Spore',
  28: 'Synchronize',
  29: 'Clear Body',
  30: 'Natural Cure',
  31: 'Lightning Rod',
  32: 'Serene Grace',
  33: 'Swift Swim',
  34: 'Chlorophyll',
  35: 'Illuminate',
  36: 'Trace',
  37: 'Huge Power',
  38: 'Poison Point',
  39: 'Inner Focus',
  40: 'Magma Armor',
  41: 'Water Veil',
  42: 'Magnet Pull',
  43: 'Soundproof',
  44: 'Rain Dish',
  45: 'Sand Stream',
  46: 'Pressure',
  47: 'Thick Fat',
  48: 'Early Bird',
  49: 'Flame Body',
  50: 'Run Away',
  51: 'Keen Eye',
  52: 'Hyper Cutter',
  53: 'Pickup',
  54: 'Truant',
  55: 'Hustle',
  56: 'Cute Charm',
  57: 'Plus',
  58: 'Minus',
  59: 'Forecast',
  60: 'Sticky Hold',
  61: 'Shed Skin',
  62: 'Guts',
  63: 'Marvel Scale',
  64: 'Liquid Ooze',
  65: 'Overgrow',
  66: 'Blaze',
  67: 'Torrent',
  68: 'Swarm',
  69: 'Rock Head',
  70: 'Drought',
  71: 'Arena Trap',
  72: 'Vital Spirit',
  73: 'White Smoke',
  74: 'Pure Power',
  75: 'Shell Armor',
  76: 'Cacophony',
  77: 'Air Lock',
};

interface AbilityCalcEffect {
  type:
    | 'atkMod'
    | 'defMod'
    | 'immunity'
    | 'typeMod'
    | 'pinch'
    | 'speed'
    | 'noRecoil'
    | 'accuracyMod';
  /** For atkMod/defMod: multiplier applied */
  multiplier?: number;
  /** For immunity: which type is immune */
  immuneType?: number;
  /** For typeMod: which types are affected and multiplier */
  affectedTypes?: number[];
  modMultiplier?: number;
  /** For pinch: which type gets boosted and multiplier */
  pinchType?: number;
  pinchMultiplier?: number;
  /** For speed: multiplier and weather condition */
  weatherCondition?: string;
  /** Extra conditions */
  physicalOnly?: boolean;
  requireStatus?: boolean;
  negateBurn?: boolean;
}

export const CALC_ABILITIES: Record<number, AbilityCalcEffect | AbilityCalcEffect[]> = {
  // Huge Power — doubles physical Attack
  37: { type: 'atkMod', multiplier: 2, physicalOnly: true },

  // Pure Power — doubles physical Attack
  74: { type: 'atkMod', multiplier: 2, physicalOnly: true },

  // Hustle — 1.5x physical Attack but 0.8x accuracy
  55: [
    { type: 'atkMod', multiplier: 1.5, physicalOnly: true },
    { type: 'accuracyMod', multiplier: 0.8 },
  ],

  // Guts — 1.5x Attack when statused, negates burn penalty
  62: { type: 'atkMod', multiplier: 1.5, requireStatus: true, negateBurn: true },

  // Thick Fat — halves Fire and Ice damage taken
  47: { type: 'typeMod', affectedTypes: [9, 14], modMultiplier: 0.5 },

  // Flash Fire — immune to Fire
  18: { type: 'immunity', immuneType: 9 },

  // Levitate — immune to Ground
  26: { type: 'immunity', immuneType: 4 },

  // Water Absorb — immune to Water
  11: { type: 'immunity', immuneType: 10 },

  // Volt Absorb — immune to Electric
  10: { type: 'immunity', immuneType: 12 },

  // Wonder Guard — only super-effective moves hit (special handling in calc)
  25: { type: 'immunity' },

  // Overgrow — 1.5x Grass moves at low HP
  65: { type: 'pinch', pinchType: 11, pinchMultiplier: 1.5 },

  // Blaze — 1.5x Fire moves at low HP
  66: { type: 'pinch', pinchType: 9, pinchMultiplier: 1.5 },

  // Torrent — 1.5x Water moves at low HP
  67: { type: 'pinch', pinchType: 10, pinchMultiplier: 1.5 },

  // Swarm — 1.5x Bug moves at low HP
  68: { type: 'pinch', pinchType: 6, pinchMultiplier: 1.5 },

  // Swift Swim — 2x Speed in rain
  33: { type: 'speed', multiplier: 2, weatherCondition: 'rain' },

  // Chlorophyll — 2x Speed in sun
  34: { type: 'speed', multiplier: 2, weatherCondition: 'sun' },

  // Marvel Scale — 1.5x Defense when statused
  63: { type: 'defMod', multiplier: 1.5, requireStatus: true },

  // Rock Head — prevents recoil damage
  69: { type: 'noRecoil' },
};
