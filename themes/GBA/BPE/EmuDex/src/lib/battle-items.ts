export interface ItemCalcEffect {
  type: 'atkMod' | 'defMod' | 'spatkMod' | 'spdefMod' | 'typeBoost';
  multiplier: number;
  /** For typeBoost: which type gets boosted */
  boostedType?: number;
  /** For species-restricted items */
  speciesRestriction?: number[];
  /** Physical or special only */
  physicalOnly?: boolean;
  specialOnly?: boolean;
}

// Soul Dew has dual effects (SpAtk + SpDef), handled specially by the damage calc
export const SOUL_DEW_SPECIES = [380, 381];
export const SOUL_DEW_SPATK_MOD = 1.5;
export const SOUL_DEW_SPDEF_MOD = 1.5;

export const CALC_ITEMS: Record<number, ItemCalcEffect> = {
  // Choice Band
  186: { type: 'atkMod', multiplier: 1.5, physicalOnly: true },

  // Type boosters (1.1x)
  217: { type: 'typeBoost', multiplier: 1.1, boostedType: 0 },   // Silk Scarf (Normal)
  207: { type: 'typeBoost', multiplier: 1.1, boostedType: 1 },   // Black Belt (Fighting)
  210: { type: 'typeBoost', multiplier: 1.1, boostedType: 2 },   // Sharp Beak (Flying)
  211: { type: 'typeBoost', multiplier: 1.1, boostedType: 3 },   // Poison Barb (Poison)
  203: { type: 'typeBoost', multiplier: 1.1, boostedType: 4 },   // Soft Sand (Ground)
  204: { type: 'typeBoost', multiplier: 1.1, boostedType: 5 },   // Hard Stone (Rock)
  188: { type: 'typeBoost', multiplier: 1.1, boostedType: 6 },   // Silver Powder (Bug)
  213: { type: 'typeBoost', multiplier: 1.1, boostedType: 7 },   // Spell Tag (Ghost)
  199: { type: 'typeBoost', multiplier: 1.1, boostedType: 8 },   // Metal Coat (Steel)
  215: { type: 'typeBoost', multiplier: 1.1, boostedType: 9 },   // Charcoal (Fire)
  209: { type: 'typeBoost', multiplier: 1.1, boostedType: 10 },  // Mystic Water (Water)
  205: { type: 'typeBoost', multiplier: 1.1, boostedType: 11 },  // Miracle Seed (Grass)
  208: { type: 'typeBoost', multiplier: 1.1, boostedType: 12 },  // Magnet (Electric)
  214: { type: 'typeBoost', multiplier: 1.1, boostedType: 13 },  // Twisted Spoon (Psychic)
  212: { type: 'typeBoost', multiplier: 1.1, boostedType: 14 },  // Never-Melt Ice (Ice)
  216: { type: 'typeBoost', multiplier: 1.1, boostedType: 15 },  // Dragon Fang (Dragon)
  206: { type: 'typeBoost', multiplier: 1.1, boostedType: 16 },  // Black Glasses (Dark)

  // Sea Incense (weaker Water boost)
  220: { type: 'typeBoost', multiplier: 1.05, boostedType: 10 }, // Sea Incense (Water)

  // Species-restricted items
  224: { type: 'atkMod', multiplier: 2.0, physicalOnly: true, speciesRestriction: [104, 105] }, // Thick Club (Cubone, Marowak)
  202: { type: 'spatkMod', multiplier: 2.0, speciesRestriction: [25] },   // Light Ball (Pikachu)
  192: { type: 'spatkMod', multiplier: 2.0, speciesRestriction: [366] },  // Deep Sea Tooth (Clamperl)
  193: { type: 'spdefMod', multiplier: 2.0, speciesRestriction: [366] },  // Deep Sea Scale (Clamperl)
  223: { type: 'defMod', multiplier: 2.0, speciesRestriction: [132] },    // Metal Powder (Ditto)
};
