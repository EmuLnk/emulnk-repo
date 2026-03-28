import type { FamiliarDef } from "./familiars";
import { EQUIP_ITEMS } from "./items";

/** Food item IDs each familiar prefers (2x EXP bonus) */
export const FAMILIAR_FOOD_PREFS: Record<string, Set<number>> = {
  // Bat: fruits (frugivore)
  bat: new Set([29, 30, 31, 32, 33, 34]),
  // Ghost: Japanese/exotic food (ethereal)
  ghost: new Set([37, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66]),
  // Faerie: sweets + potions (healer nature)
  faerie: new Set([38, 39, 40, 41, 42, 43, 56]),
  // Demon: meat + heavy meals (carnivore)
  demon: new Set([44, 45, 46, 47, 48, 49, 67, 68, 69]),
  // Sword: no preferences (accepts all equally)
  sword: new Set<number>(),
};

/** All feedable item IDs (food category only) */
export const ALL_FOOD_IDS: number[] = Object.values(EQUIP_ITEMS)
  .filter((item) => item.category === "food")
  .map((item) => item.id);

/** Calculate EXP gained from feeding an item to a familiar */
export function calculateFeedExp(
  familiarKey: string,
  itemId: number,
): number {
  const item = EQUIP_ITEMS[itemId];
  if (!item || item.category !== "food") return 0;
  const baseExp = item.attack; // HP restore value = base EXP
  const prefs = FAMILIAR_FOOD_PREFS[familiarKey];
  const isPreferred = prefs && prefs.has(itemId);
  return baseExp * (isPreferred ? 2 : 1);
}

/** Check if an item is a preferred food for a familiar */
export function isPreferredFood(
  familiarKey: string,
  itemId: number,
): boolean {
  const prefs = FAMILIAR_FOOD_PREFS[familiarKey];
  return prefs ? prefs.has(itemId) : false;
}
