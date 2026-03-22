import type { Pokemon, BattleState, MapState, DexState, BagBall, SafariState } from "./types.js";

export const appState = $state({
  isConnected: false,
  party: [null, null, null, null, null, null] as (Pokemon | null)[],
  battleState: {
    active: false,
    isTrainer: false,
    isDoubles: false,
    player: null,
    enemy: null,
    player2: null,
    enemy2: null,
    field: {
      weather: 'none',
      weatherRaw: 0,
      playerSide: { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 },
      enemySide: { reflect: 0, lightScreen: 0, safeguard: 0, mist: 0, spikes: 0 },
    },
  } as BattleState,
  mapState: {
    mapGroup: 0,
    mapNum: 0,
    mapKey: "0:0",
    mapName: "Unknown",
    playerGender: 0,
  } as MapState,
  dexState: {
    owned: new Set<number>(),
    seen: new Set<number>(),
  } as DexState,
  bagBalls: [] as BagBall[],
  safariState: {
    ballsLeft: 0,
    stepsLeft: 0,
    catchFactor: 0,
    escapeFactor: 0,
    rockCounter: 0,
    baitCounter: 0,
    inZone: false,
  } as SafariState,
  settings: {} as Record<string, string>,
});
