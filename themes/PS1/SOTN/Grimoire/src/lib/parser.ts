import { decodeBase64ToDataView } from "@emulink/sdk";
import { appState } from "./state.svelte";

/**
 * Parse the player_stats_block blob (224 bytes, base 0x00097BA0).
 * Contains HP, MP, Hearts, stats, EXP, Gold, Kills, Equipment, Clock, Familiars.
 */
export function parseStatsBlock(b64: string): void {
  const dv = decodeBase64ToDataView(b64);
  if (dv.byteLength < 224) return;

  // Core stats (all s32 little-endian)
  appState.hp = dv.getInt32(0x00, true);
  appState.hpMax = dv.getInt32(0x04, true);
  appState.hearts = dv.getInt32(0x08, true);
  appState.heartsMax = dv.getInt32(0x0c, true);
  appState.mp = dv.getInt32(0x10, true);
  appState.mpMax = dv.getInt32(0x14, true);
  appState.str = dv.getInt32(0x18, true);
  appState.con = dv.getInt32(0x1c, true);
  appState.int = dv.getInt32(0x20, true);
  appState.lck = dv.getInt32(0x24, true);

  // EXP, Gold, Kill Count
  appState.exp = dv.getInt32(0x4c, true);
  appState.gold = dv.getInt32(0x50, true);
  appState.killCount = dv.getInt32(0x54, true);

  // Equipment (7 slots, each s32 = item ID)
  appState.equipment.leftHand = dv.getInt32(0x60, true);
  appState.equipment.rightHand = dv.getInt32(0x64, true);
  appState.equipment.head = dv.getInt32(0x68, true);
  appState.equipment.body = dv.getInt32(0x6c, true);
  appState.equipment.cloak = dv.getInt32(0x70, true);
  appState.equipment.accessory1 = dv.getInt32(0x74, true);
  appState.equipment.accessory2 = dv.getInt32(0x78, true);

  // Game clock
  appState.clock.hours = dv.getInt32(0x90, true);
  appState.clock.minutes = dv.getInt32(0x94, true);
  appState.clock.seconds = dv.getInt32(0x98, true);

  // Familiars (5 pairs of level + EXP, each s32)
  appState.familiars.bat.level = dv.getInt32(0xa4, true);
  appState.familiars.bat.exp = dv.getInt32(0xa8, true);
  appState.familiars.ghost.level = dv.getInt32(0xb0, true);
  appState.familiars.ghost.exp = dv.getInt32(0xb4, true);
  appState.familiars.faerie.level = dv.getInt32(0xbc, true);
  appState.familiars.faerie.exp = dv.getInt32(0xc0, true);
  appState.familiars.demon.level = dv.getInt32(0xc8, true);
  appState.familiars.demon.exp = dv.getInt32(0xcc, true);
  appState.familiars.sword.level = dv.getInt32(0xd4, true);
  appState.familiars.sword.exp = dv.getInt32(0xd8, true);
}

/**
 * Parse the relics_spells_inv blob (297 bytes, base 0x00097964).
 * Layout: Relics (30 bytes) + Spells (8 bytes at 0x1E)
 *       + equipHandCount (169 bytes at 0x26) + equipBodyCount (90 bytes at 0xCF).
 */
export function parseRelicsInv(b64: string): void {
  const dv = decodeBase64ToDataView(b64);
  if (dv.byteLength < 297) return;

  const buf = new Uint8Array(dv.buffer, dv.byteOffset, dv.byteLength);

  // Relics: 30 bytes at offset 0
  for (let i = 0; i < 30; i++) {
    appState.relics[i] = buf[i];
  }

  // Spells: 8 bytes at offset 0x1E
  for (let i = 0; i < 8; i++) {
    appState.spells[i] = buf[0x1e + i];
  }

  // Hand items (weapons/shields/consumables/food): 169 bytes at offset 0x26
  for (let i = 0; i < 169; i++) {
    appState.inventoryHand[i] = buf[0x26 + i];
  }

  // Body items (armor/accessories): 90 bytes at offset 0xCF
  for (let i = 0; i < 90; i++) {
    appState.inventoryBody[i] = buf[0xcf + i];
  }
}

/**
 * Parse the player_pos blob (8 bytes).
 */
export function parsePosition(b64: string): void {
  const dv = decodeBase64ToDataView(b64);
  if (dv.byteLength < 8) return;

  appState.posX = dv.getInt32(0, true);
  appState.posY = dv.getInt32(4, true);
}

/**
 * Parse the tilemap_room_pos blob (16 bytes).
 * g_Tilemap: left, top, right, bottom. Full room rectangle on the castle grid.
 */
export function parseTilemap(b64: string): void {
  const dv = decodeBase64ToDataView(b64);
  if (dv.byteLength < 16) return;

  appState.roomX = dv.getInt32(0, true);       // left
  appState.roomY = dv.getInt32(4, true);        // top
  appState.roomRight = dv.getInt32(8, true);    // right
  appState.roomBottom = dv.getInt32(12, true);  // bottom
}
