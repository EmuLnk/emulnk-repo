/** Raw values received from the SDK via registerTheme<SotnValues> */
export interface SotnValues {
  player_stats_block?: string;
  relics_spells_inv?: string;
  player_pos?: string;
  room_id?: number;
  entity_stage_data?: string;
  tilemap_room_pos?: string;
  stage_id?: number;
  [key: string]: unknown;
}

export interface EquipmentState {
  rightHand: number;
  leftHand: number;
  head: number;
  body: number;
  cloak: number;
  accessory1: number;
  accessory2: number;
}

export interface FamiliarData {
  level: number;
  exp: number;
}

export interface FamiliarState {
  bat: FamiliarData;
  ghost: FamiliarData;
  faerie: FamiliarData;
  demon: FamiliarData;
  sword: FamiliarData;
}

export interface ClockState {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ActiveEnemy {
  slot: number;
  enemyId: number;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  attackElement: number;
  posX: number;
  posY: number;
  weaknesses: number;
  strengths: number;
  immunes: number;
  absorbs: number;
  level: number;
  exp: number;
}

export interface EnemyDef {
  id: number;
  name: string;
  maxHp: number;
  attack: number;
  defense: number;
  weaknesses: number;
  strengths: number;
  immunes: number;
  absorbs: number;
  level: number;
  exp: number;
  rareItemId: number;
  uncommonItemId: number;
  rareDropRate: number;
  uncommonDropRate: number;
}

/** Element bitmask constants from game.h */
export const ELEMENT = {
  HIT: 0x20,
  CUT: 0x40,
  POISON: 0x80,
  CURSE: 0x100,
  STONE: 0x200,
  WATER: 0x400,
  DARK: 0x800,
  HOLY: 0x1000,
  ICE: 0x2000,
  THUNDER: 0x4000,
  FIRE: 0x8000,
} as const;

export const ELEMENT_NAMES: Record<number, string> = {
  [ELEMENT.HIT]: "Hit",
  [ELEMENT.CUT]: "Cut",
  [ELEMENT.POISON]: "Poison",
  [ELEMENT.CURSE]: "Curse",
  [ELEMENT.STONE]: "Stone",
  [ELEMENT.WATER]: "Water",
  [ELEMENT.DARK]: "Dark",
  [ELEMENT.HOLY]: "Holy",
  [ELEMENT.ICE]: "Ice",
  [ELEMENT.THUNDER]: "Thunder",
  [ELEMENT.FIRE]: "Fire",
};

/** All element bits for iteration */
export const ELEMENT_BITS = [
  ELEMENT.HIT, ELEMENT.CUT, ELEMENT.POISON, ELEMENT.CURSE, ELEMENT.STONE,
  ELEMENT.WATER, ELEMENT.DARK, ELEMENT.HOLY, ELEMENT.ICE, ELEMENT.THUNDER,
  ELEMENT.FIRE,
] as const;

/** Entity flags from game.h */
export const FLAG_NOT_AN_ENEMY = 0x01000000;
export const FLAG_DEAD = 0x100;

/** Entity struct size */
export const ENTITY_SIZE = 0xBC;
