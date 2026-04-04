import type { Nature, StatBlock, HiddenPower } from "../../parsers/pokemon-gen3.js";
export type { Nature, StatBlock, HiddenPower };

export interface Evolution {
  method: number;
  param: number;
  targetSpecies: number;
}

export interface Gen3RomTables {
  speciesNames: Record<number, string>;
  natDexTable: number[];
  moveNames: Record<number, string>;
  abilityNames: Record<number, string>;
  catchRates: Record<number, number>;
  safariFleeRates: Record<number, number>;
  speciesAbilities: Record<number, [number, number]>;
  evYields: Record<number, number[]>;
  evolutions: Record<number, Evolution[]>;
  itemNames: Record<number, string>;
}

export interface Gen3Pokemon {
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

export interface Gen3BattleMon {
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

export interface Gen3BattleState {
  active: boolean;
  isTrainer: boolean;
  isSafari: boolean;
  isDoubles: boolean;
  player: Gen3BattleMon | null;
  enemy: Gen3BattleMon | null;
  player2: Gen3BattleMon | null;
  enemy2: Gen3BattleMon | null;
  field: FieldState;
}
