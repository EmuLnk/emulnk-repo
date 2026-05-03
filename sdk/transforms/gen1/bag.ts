import { decodeBase64 } from "../../decode.js";
import type { TransformDefinition } from "../types.js";
import type { Gen1BagItem, Gen1BagState, Gen1BallInventory, Gen1BagBallKey } from "./types.js";

const BAG_CAPACITY = 20;

const BALL_ITEMS: Record<number, { key: Gen1BagBallKey; name: string }> = {
  0x01: { key: "master", name: "MASTER BALL" },
  0x02: { key: "ultra", name: "ULTRA BALL" },
  0x03: { key: "great", name: "GREAT BALL" },
  0x04: { key: "poke", name: "POKe BALL" },
};

const BALL_ORDER: Gen1BagBallKey[] = ["master", "ultra", "great", "poke"];

function clampCount(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(BAG_CAPACITY, Math.floor(value));
}

function itemName(itemId: number): string {
  return BALL_ITEMS[itemId]?.name ?? `ITEM ${itemId.toString(16).toUpperCase().padStart(2, "0")}`;
}

export function parseGen1Bag(raw?: string): Gen1BagState {
  if (!raw) {
    return { count: 0, declaredCount: 0, capacity: BAG_CAPACITY, items: [], balls: [] };
  }

  let bytes: Uint8Array;
  try {
    bytes = decodeBase64(raw);
  } catch {
    return { count: 0, declaredCount: 0, capacity: BAG_CAPACITY, items: [], balls: [] };
  }

  const declaredCount = clampCount(bytes[0] ?? 0);
  const items: Gen1BagItem[] = [];
  const ballTotals = new Map<Gen1BagBallKey, number>();

  for (let slot = 0; slot < declaredCount; slot++) {
    const offset = 1 + slot * 2;
    if (offset >= bytes.length) break;

    const id = bytes[offset] ?? 0xff;
    if (id === 0xff) break;

    const quantity = bytes[offset + 1] ?? 0;
    const ball = BALL_ITEMS[id];
    const item: Gen1BagItem = {
      id,
      name: itemName(id),
      quantity,
    };
    if (ball) {
      item.ballKey = ball.key;
      ballTotals.set(ball.key, (ballTotals.get(ball.key) ?? 0) + quantity);
    }
    items.push(item);
  }

  const balls: Gen1BallInventory[] = BALL_ORDER.flatMap((key) => {
    const quantity = ballTotals.get(key) ?? 0;
    if (quantity <= 0) return [];
    const itemId = Number(Object.keys(BALL_ITEMS).find((id) => BALL_ITEMS[Number(id)].key === key));
    return [{ key, itemId, name: BALL_ITEMS[itemId].name, quantity, source: "bag" as const }];
  });

  return {
    count: items.length,
    declaredCount,
    capacity: BAG_CAPACITY,
    items,
    balls,
  };
}

export const bagTransform: TransformDefinition = {
  id: "bag",
  inputs: ["bag_items"],
  fn(ctx) {
    const values = ctx.values as Record<string, unknown>;
    return { bag: parseGen1Bag(values.bag_items as string | undefined) };
  },
};
