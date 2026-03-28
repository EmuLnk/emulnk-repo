export interface AlchemyRecipe {
  id: number;
  input1: number;
  input2: number;
  output: number;
  /** Whether input order matters (false = either order works) */
  ordered: boolean;
  /** Recipe category for the recipe book grouping */
  category: "food" | "potion" | "resistance" | "weapon" | "thrown";
}

/**
 * Alchemy recipes designed around real SotN player pain points.
 *
 * FOOD: common candle drops combine into premium healing items.
 * POTIONS: craft instead of buying (800g to 8000g at the Librarian).
 * RESISTANCE: situational resist potions from common consumables.
 * WEAPONS: mid-tier gear 1 to 2 areas earlier than normal drops.
 * THROWN: upgrade surplus throwables into better versions.
 *
 * Item ID reference (HandItems enum / g_EquipDefs):
 *   Food: Apple(30) Grapes(32) Peanuts(35) Hamburger(45) Pizza(46) Cheese(47)
 *         Grape juice(56) Sushi(62) Pot roast(67) Sirloin(68) Turkey(69) Meal ticket(70)
 *   Status: Antivenom(144) Uncurse(145) Life apple(146) Hammer(147)
 *           Str.pot(148) Luck pot(149) Smart pot(150) Attack pot(151) Shield pot(152)
 *   Resist: Fire(153) Thunder(154) Ice(155) Stone(156) Holy(157) Dark(158)
 *   Potions: Potion(159) High potion(160) Elixir(161) Manna prism(162)
 *   Thrown: Shuriken(75) Cross shuriken(76) Buffalo star(77) Flame star(78) TNT(79)
 *          Bwaka knife(80) Boomerang(81) Javelin(82) Fire boomerang(134)
 */
// prettier-ignore
export const RECIPES: AlchemyRecipe[] = [
  // ═══ FOOD ALCHEMY: common food into premium healing ═══
  // Players accumulate low-tier food from candle drops. Now it has value.
  { id: 0,  input1: 30,  input2: 32,  output: 45,  ordered: false, category: "food" },  // Apple + Grapes → Hamburger (9+5 HP → 20 HP)
  { id: 1,  input1: 45,  input2: 46,  output: 67,  ordered: false, category: "food" },  // Hamburger + Pizza → Pot roast (20+21 → 50 HP)
  { id: 2,  input1: 47,  input2: 56,  output: 69,  ordered: false, category: "food" },  // Cheese + Grape juice → Turkey (18+20 → 80 HP)
  { id: 3,  input1: 67,  input2: 69,  output: 68,  ordered: false, category: "food" },  // Pot roast + Turkey → Sirloin (50+80 → 100 HP)
  { id: 4,  input1: 68,  input2: 68,  output: 62,  ordered: false, category: "food" },  // Sirloin + Sirloin → Sushi (100+100 → 100 HP, but Sushi is rarer)
  { id: 5,  input1: 35,  input2: 38,  output: 69,  ordered: false, category: "food" },  // Peanuts + Cheesecake → Turkey (50+14 → 80 HP)

  // ═══ POTION CRAFTING: save gold on healing ═══
  // Potion costs 800g, High Potion 2000g, Elixir 8000g. Early gold is precious.
  { id: 6,  input1: 67,  input2: 68,  output: 159, ordered: false, category: "potion" }, // Pot roast + Sirloin → Potion (premium food → proper healing)
  { id: 7,  input1: 159, input2: 159, output: 160, ordered: false, category: "potion" }, // Potion + Potion → High potion (saves 400g)
  { id: 8,  input1: 160, input2: 160, output: 161, ordered: false, category: "potion" }, // High potion + High potion → Elixir (saves 4000g!)
  { id: 9,  input1: 62,  input2: 62,  output: 162, ordered: false, category: "potion" }, // Sushi + Sushi → Manna prism (top food → MP restore)
  { id: 10, input1: 144, input2: 145, output: 159, ordered: false, category: "potion" }, // Antivenom + Uncurse → Potion (status cures → healing)

  // ═══ STAT POTION CRAFTING: prep for boss fights ═══
  // Stat potions are rare drops. Craft them from resist potions (which are cheaper).
  { id: 11, input1: 153, input2: 155, output: 151, ordered: false, category: "potion" }, // Resist fire + Resist ice → Attack potion
  { id: 12, input1: 154, input2: 156, output: 152, ordered: false, category: "potion" }, // Resist thunder + Resist stone → Shield potion
  { id: 13, input1: 148, input2: 149, output: 70,  ordered: false, category: "potion" }, // Str. potion + Luck potion → Meal ticket (buff → food)

  // ═══ RESISTANCE CRAFTING: prep for specific bosses ═══
  // Resist potions are 4000g each. Craft from common consumables.
  { id: 14, input1: 79,  input2: 79,  output: 153, ordered: false, category: "resistance" }, // TNT + TNT → Resist fire (fire materials → fire resist)
  { id: 15, input1: 78,  input2: 81,  output: 155, ordered: false, category: "resistance" }, // Flame star + Boomerang → Resist ice
  { id: 16, input1: 25,  input2: 25,  output: 154, ordered: false, category: "resistance" }, // Magic Missile + Magic Missile → Resist thunder
  { id: 17, input1: 24,  input2: 80,  output: 157, ordered: false, category: "resistance" }, // Karma Coin + Bwaka knife → Resist holy
  { id: 18, input1: 71,  input2: 71,  output: 158, ordered: false, category: "resistance" }, // Neutron bomb + Neutron bomb → Resist dark

  // ═══ THROWN WEAPON UPGRADES: surplus throwables into better versions ═══
  { id: 19, input1: 75,  input2: 75,  output: 76,  ordered: false, category: "thrown" },  // Shuriken + Shuriken → Cross shuriken
  { id: 20, input1: 76,  input2: 76,  output: 77,  ordered: false, category: "thrown" },  // Cross shuriken + Cross shuriken → Buffalo star
  { id: 21, input1: 75,  input2: 79,  output: 78,  ordered: false, category: "thrown" },  // Shuriken + TNT → Flame star
  { id: 22, input1: 80,  input2: 80,  output: 82,  ordered: false, category: "thrown" },  // Bwaka knife + Bwaka knife → Javelin
  { id: 23, input1: 81,  input2: 79,  output: 134, ordered: false, category: "thrown" },  // Boomerang + TNT → Fire boomerang

  // ═══ WEAPON SHORTCUTS: mid-tier weapons 1 to 2 areas early ═══
  { id: 24, input1: 19,  input2: 19,  output: 23,  ordered: false, category: "weapon" },  // Short sword + Short sword → Rapier
  { id: 25, input1: 23,  input2: 23,  output: 96,  ordered: false, category: "weapon" },  // Rapier + Rapier → Bastard sword
  { id: 26, input1: 5,   input2: 5,   output: 6,   ordered: false, category: "weapon" },  // Leather shield + Leather shield → Knight shield
  { id: 27, input1: 128, input2: 130, output: 115, ordered: false, category: "weapon" },  // Mace + Holy rod → Holy sword
];

/** Find a recipe matching two input item IDs (order-independent) */
export function findRecipe(item1: number, item2: number): AlchemyRecipe | null {
  for (const r of RECIPES) {
    if (r.ordered) {
      if (r.input1 === item1 && r.input2 === item2) return r;
    } else {
      if (
        (r.input1 === item1 && r.input2 === item2) ||
        (r.input1 === item2 && r.input2 === item1)
      )
        return r;
    }
  }
  return null;
}

/** Recipe category labels for the recipe book */
export const RECIPE_CATEGORIES: { key: AlchemyRecipe["category"]; label: string }[] = [
  { key: "food", label: "Food Alchemy" },
  { key: "potion", label: "Potion Crafting" },
  { key: "resistance", label: "Resistance Brewing" },
  { key: "thrown", label: "Thrown Upgrades" },
  { key: "weapon", label: "Weapon Forging" },
];
