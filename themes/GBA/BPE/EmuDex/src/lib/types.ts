import type { Nature, StatBlock, HiddenPower, DecryptedData } from "@emulink/sdk/parsers/pokemon-gen3";
export type { Nature, StatBlock, HiddenPower, DecryptedData };

export interface Pokemon {
  pv: number;
  otid: number;
  speciesName: string;
  speciesId: number;
  internalSpeciesId: number;
  level: number;
  hp: number;
  maxhp: number;
  atk: number;
  def: number;
  speed: number;
  spatk: number;
  spdef: number;
  status: number;
  nature: Nature;
  ivs: StatBlock;
  evs: StatBlock;
  moves: number[];
  pp: number[];
  friendship: number;
  hiddenPower: HiddenPower;
  isEgg: boolean;
  heldItem: number;
  ability: number;
}

export interface BattleMon {
  species: number;
  internalSpeciesId: number;
  speciesName: string;
  atk: number;
  def: number;
  speed: number;
  spatk: number;
  spdef: number;
  moves: number[];
  ivs: StatBlock;
  pp: number[];
  hp: number;
  level: number;
  maxhp: number;
  type1: number;
  type2: number;
  status: number;
  pv: number;
  ability: number;
  item: number;
  statStages: number[];
  personality: number;
  friendship: number;
  status2: number;
}

export type WeatherType = 'none' | 'rain' | 'sun' | 'sand' | 'hail';

export interface SideState {
  reflect: number;
  lightScreen: number;
  safeguard: number;
  mist: number;
  spikes: number;
}

export interface FieldState {
  weather: WeatherType;
  weatherRaw: number;
  playerSide: SideState;
  enemySide: SideState;
}

export interface BattleState {
  active: boolean;
  isTrainer: boolean;
  isSafari: boolean;
  isDoubles: boolean;
  player: BattleMon | null;
  enemy: BattleMon | null;
  player2: BattleMon | null;
  enemy2: BattleMon | null;
  field: FieldState;
}

export interface SafariState {
  ballsLeft: number;
  stepsLeft: number;
  catchFactor: number;
  escapeFactor: number;
  goNearCount: number;
  pkblCount: number;
  inZone: boolean;
  /** Best Pokeblock reaction achievable from inventory for current enemy nature */
  bestReaction: PokeblockReaction;
  /** Display name of the best Pokeblock to use (e.g. "Red Pokeblock") */
  bestPokeblock: string;
  /** Whether the player has any Pokeblocks at all */
  hasPokeblocks: boolean;
}

export type PokeblockReaction = 'enthralled' | 'curious' | 'ignored';

export interface SafariRecommendation {
  action: 'ball' | 'gonear' | 'pokeblock';
  catchProb: number;
  fleeProb: number;
  overallProb: number;
}

export interface DamageResult {
  minDmg: number;
  maxDmg: number;
  minPct: number;
  maxPct: number;
  hitsToKO: number;
  effectiveness: number;
  isSTAB: boolean;
  koGuaranteed: boolean;
  koPossible: boolean;
  isOHKO: boolean;
  isFixed: boolean;
  isStatus: boolean;
  accuracyPct: number;
  modifiers: string[];
}

export interface Evolution {
  method: number;
  param: number;
  targetSpecies: number; // internal species ID
}

export interface MapState {
  mapGroup: number;
  mapNum: number;
  mapKey: string;
  mapName: string;
  playerGender: number; // 0 = male, 1 = female
  feebasSeed: number;
  playerX: number;
  playerY: number;
}

export interface DexState {
  owned: Set<number>;
  seen: Set<number>;
}

export interface BagBall {
  itemId: number;
  quantity: number;
}

export interface BPEValues {
  party_count?: number;
  party_data?: string;
  battle_flags?: number;
  battle_mons?: string;
  battle_outcome?: number;
  in_battle?: number;
  battle_weather?: number;
  side_status_player?: number;
  side_status_enemy?: number;
  side_timers_player?: string;
  side_timers_enemy?: string;
  battlers_count?: number;
  safari_balls?: number;
  safari_steps?: number;
  safari_battle_state?: string;
  save1_ptr?: number;
  save2_ptr?: number;
  save1_block?: string;
  save1_hi_block?: string;
  save2_lo_block?: string;
  save2_hi_block?: string;
  species_names_rom_0?: string;
  species_names_rom_1?: string;
  natdex_table_rom?: string;
  move_names_rom_0?: string;
  move_names_rom_1?: string;
  ability_names_rom?: string;
  species_info_rom_0?: string;
  species_info_rom_1?: string;
  species_info_rom_2?: string;
  items_rom_0?: string;
  items_rom_1?: string;
  items_rom_2?: string;
  items_rom_3?: string;
  items_rom_4?: string;
  feebas_block?: string;
  player_objects?: string;
  player_avatar_id?: number;
  evo_rom_0?: string;
  evo_rom_1?: string;
  evo_rom_2?: string;
  evo_rom_3?: string;
  evo_rom_4?: string;
  [key: string]: unknown;
}

export interface BPESettings {
  "party-show-ivs": boolean;
  "party-show-evs": boolean;
  "party-show-nature": boolean;
  "party-show-hp-type": boolean;
  "party-show-item": boolean;
  "battle-show-damage": boolean;
  "battle-show-accuracy": boolean;
  "battle-show-eff-label": boolean;
  "battle-show-enemy-ivs": boolean;
  "battle-show-enemy-moves": boolean;
  "battle-show-field": boolean;
  "battle-show-turn-order": boolean;
  "battle-show-weaknesses": boolean;
  "battle-show-ability": boolean;
  "battle-show-catch-rate": boolean;
  "map-show-all": boolean;
}
