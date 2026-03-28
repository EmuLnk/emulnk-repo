import { decodeBase64ToDataView } from "@emulink/sdk";
import { appState } from "./state.svelte";
import { ENEMY_DEFS } from "./data/enemies";
import {
  ENTITY_SIZE,
  FLAG_NOT_AN_ENEMY,
  FLAG_DEAD,
  type ActiveEnemy,
} from "./types";

/** Number of entity slots we read (0x40-0x4F = 16 slots) */
const ENTITY_SLOT_COUNT = 16;

/**
 * Parse the entity_stage_data blob (16 × 0xBC bytes).
 * Extracts active enemies with HP, name, weaknesses from the entity array.
 */
export function parseEntities(b64: string): void {
  const dv = decodeBase64ToDataView(b64);
  if (dv.byteLength < ENTITY_SLOT_COUNT * ENTITY_SIZE) return;

  const enemies: ActiveEnemy[] = [];

  for (let i = 0; i < ENTITY_SLOT_COUNT; i++) {
    const off = i * ENTITY_SIZE;

    // Read flags at offset 0x34 (s32)
    const flags = dv.getInt32(off + 0x34, true);

    // Skip if not an enemy or dead
    if (flags & FLAG_NOT_AN_ENEMY) continue;
    if (flags & FLAG_DEAD) continue;

    // Read enemy identification
    const enemyId = dv.getUint16(off + 0x3a, true);
    const currentHp = dv.getInt16(off + 0x3e, true);

    // Skip entities with no HP (decorations, inactive)
    if (currentHp <= 0) continue;

    // Look up enemy definition from embedded table
    const def = ENEMY_DEFS[enemyId];
    if (!def) continue;

    // Read position and combat data
    const posX = dv.getInt32(off + 0x00, true);
    const posY = dv.getInt32(off + 0x04, true);
    const attack = dv.getInt16(off + 0x40, true);
    const attackElement = dv.getUint16(off + 0x42, true);

    enemies.push({
      slot: 0x40 + i,
      enemyId,
      name: def.name,
      hp: currentHp,
      maxHp: def.maxHp,
      attack,
      attackElement,
      posX,
      posY,
      weaknesses: def.weaknesses,
      strengths: def.strengths,
      immunes: def.immunes,
      absorbs: def.absorbs,
      level: def.level,
      exp: def.exp,
    });
  }

  appState.enemies = enemies;
}
