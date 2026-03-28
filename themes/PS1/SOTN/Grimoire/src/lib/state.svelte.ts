import type {
  EquipmentState,
  FamiliarState,
  ClockState,
  ActiveEnemy,
} from "./types";

export const appState = $state({
  isConnected: false,
  settings: {} as Record<string, string>,

  // Player stats
  hp: 0,
  hpMax: 0,
  mp: 0,
  mpMax: 0,
  hearts: 0,
  heartsMax: 0,
  str: 0,
  con: 0,
  int: 0,
  lck: 0,
  exp: 0,
  gold: 0,
  killCount: 0,

  // Equipment (item IDs)
  equipment: {
    rightHand: 0,
    leftHand: 0,
    head: 0,
    body: 0,
    cloak: 0,
    accessory1: 0,
    accessory2: 0,
  } as EquipmentState,

  // Inventory: hand items (weapons/shields/consumables/food) + body items (armor/accessories)
  inventoryHand: Array.from<number>({ length: 169 }).fill(0),
  inventoryBody: Array.from<number>({ length: 90 }).fill(0),

  // Relics: 30 status bytes (0=none, 1=owned, 3=equipped)
  relics: Array.from<number>({ length: 30 }).fill(0),

  // Spells: 8 bytes
  spells: Array.from<number>({ length: 8 }).fill(0),

  // Position
  posX: 0,
  posY: 0,

  // Room / Map
  roomId: 0,
  roomX: 0,
  roomY: 0,
  roomRight: 0,
  roomBottom: 0,
  stageId: 0,

  // Familiars
  familiars: {
    bat: { level: 0, exp: 0 },
    ghost: { level: 0, exp: 0 },
    faerie: { level: 0, exp: 0 },
    demon: { level: 0, exp: 0 },
    sword: { level: 0, exp: 0 },
  } as FamiliarState,

  // Clock
  clock: { hours: 0, minutes: 0, seconds: 0 } as ClockState,

  // Active enemies (parsed from entity data)
  enemies: [] as ActiveEnemy[],

  // Persistent state (loaded from settings)
  visitedRooms: new Set<string>(),
  annotations: {} as Record<string, string>,
});
