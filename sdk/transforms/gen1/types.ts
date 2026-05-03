import type { Gen1CatchResult, Gen1MoveSlot, Gen1Pokemon, Gen1Status } from "../../parsers/pokemon-gen1.js";

export type { Gen1CatchResult, Gen1MoveSlot, Gen1Pokemon, Gen1Status };

export interface Gen1StatMods {
  atk: number;
  def: number;
  speed: number;
  special: number;
  accuracy: number;
  evasion: number;
}

export interface Gen1SideStatus {
  storingEnergy: boolean;
  thrashing: boolean;
  attackingMultipleTimes: boolean;
  flinched: boolean;
  charging: boolean;
  trapping: boolean;
  invulnerable: boolean;
  confused: boolean;
  usingXAccuracy: boolean;
  protectedByMist: boolean;
  gettingPumped: boolean;
  hasSubstitute: boolean;
  needsRecharge: boolean;
  usingRage: boolean;
  seeded: boolean;
  badlyPoisoned: boolean;
  lightScreen: boolean;
  reflect: boolean;
  transformed: boolean;
  numAttacksLeft: number;
  confusedTurns: number;
  toxicCounter: number;
  disabledMoveSlot: number;
  disabledTurns: number;
  substituteHp: number;
  selectedMoveId: number;
  usedMoveId: number;
  raw: [number, number, number];
}

export interface Gen1BattleState {
  active: boolean;
  isTrainer: boolean;
  isSafari: boolean;
  isOldMan: boolean;
  player: Gen1Pokemon | null;
  enemy: Gen1Pokemon | null;
  playerStatMods: Gen1StatMods;
  enemyStatMods: Gen1StatMods;
  playerStatus: Gen1SideStatus;
  enemyStatus: Gen1SideStatus;
  catch: Record<"poke" | "great" | "ultra" | "safari" | "master", Gen1CatchResult> | null;
}

export type Gen1BagBallKey = "master" | "ultra" | "great" | "poke";
export type Gen1BallKey = Gen1BagBallKey | "safari";

export interface Gen1BagItem {
  id: number;
  name: string;
  quantity: number;
  ballKey?: Gen1BagBallKey;
}

export interface Gen1BallInventory {
  key: Gen1BallKey;
  itemId: number;
  name: string;
  quantity: number;
  source: "bag" | "safari";
}

export interface Gen1BagState {
  count: number;
  declaredCount: number;
  capacity: number;
  items: Gen1BagItem[];
  balls: Gen1BallInventory[];
}

export interface Gen1ProgressState {
  owned: number[];
  seen: number[];
  ownedCount: number;
  seenCount: number;
  badges: boolean[];
  badgeCount: number;
  currentMap: number;
  mapName: string;
}

export interface Gen1SafariState {
  escapeFactor: number;
  baitFactor: number;
  steps: number;
  balls: number;
  active: boolean;
}
