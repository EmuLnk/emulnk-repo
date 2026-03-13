export interface Nature {
  name: string;
  /** Boosted stat index (0=Atk,1=Def,2=Spd,3=SpA,4=SpD). -1 = neutral */
  p: number;
  /** Nerfed stat index. -1 = neutral */
  m: number;
}

export interface StatBlock {
  hp: number;
  atk: number;
  def: number;
  spd: number;
  spatk: number;
  spdef: number;
}

export interface HiddenPower {
  type: string;
  power: number;
}

export interface DecryptedData {
  heldItem: number;
  experience: number;
  friendship: number;
  moves: number[];
  pp: number[];
  evs: StatBlock;
  ivs: StatBlock;
  isEgg: boolean;
}

export interface Pokemon {
  pv: number;
  otid: number;
  speciesName: string;
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
}

export interface BPEValues {
  party_count?: number;
  party_data?: string;
  [key: string]: unknown;
}

export interface BPESettings {
  show_ivs: boolean;
  show_evs: boolean;
  show_moves: boolean;
}
