<script lang="ts">
  import { appState } from "../state.svelte";
  import { EQUIP_ITEMS } from "../data/items";
  import { RECIPES, findRecipe, type AlchemyRecipe } from "../data/alchemy-recipes";
  import { write } from "@emulink/sdk"; // emulink-allow: write
  import { save } from "@emulink/sdk"; // emulink-allow: save
  import { onAlchemyCraft } from "../sfx";
  import { CATEGORY_ICONS, BOOK_ICON } from "../data/icons";
  import alchemyCircleSvg from "../../../assets/alchemy-circle.svg";
  import ItemPicker from "./ItemPicker.svelte";

  let slot1: number | null = $state(null);
  let slot2: number | null = $state(null);
  let pickingSlot: 1 | 2 | null = $state(null);
  let showRecipeBook = $state(false);
  let lastCraftTime = 0;
  let craftAnimation = $state(false);
  let cooldownRemaining = $state(0);
  let cooldownTimer: ReturnType<typeof setInterval> | null = null;

  // Parse saved discovered recipes from settings (initial load)
  function loadSavedRecipes(): number[] {
    const saved = appState.settings["grimoire-recipes"];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // ignore parse errors
      }
    }
    return [];
  }

  let savedRecipes = $derived(loadSavedRecipes());
  let localDiscoveries: number[] = $state([]);

  let discoveredRecipes: number[] = $derived.by(() => {
    const merged = [...savedRecipes];
    for (const id of localDiscoveries) {
      if (!merged.includes(id)) merged.push(id);
    }
    return merged;
  });

  let matchedRecipe: AlchemyRecipe | null = $derived(
    slot1 !== null && slot2 !== null ? findRecipe(slot1, slot2) : null
  );
  let canCraft = $derived(matchedRecipe !== null && !craftAnimation && cooldownRemaining <= 0);
  let slot1Name: string | null = $derived(
    slot1 !== null ? (EQUIP_ITEMS[slot1]?.name ?? "???") : null
  );
  let slot2Name: string | null = $derived(
    slot2 !== null ? (EQUIP_ITEMS[slot2]?.name ?? "???") : null
  );
  let resultName: string | null = $derived(
    matchedRecipe ? (EQUIP_ITEMS[matchedRecipe.output]?.name ?? "???") : null
  );

  function startCooldown() {
    cooldownRemaining = 5;
    if (cooldownTimer) clearInterval(cooldownTimer);
    cooldownTimer = setInterval(() => {
      cooldownRemaining -= 1;
      if (cooldownRemaining <= 0) {
        cooldownRemaining = 0;
        if (cooldownTimer) {
          clearInterval(cooldownTimer);
          cooldownTimer = null;
        }
      }
    }, 1000);
  }

  function craft() {
    if (!matchedRecipe || craftAnimation) return;
    const now = Date.now();
    if (now - lastCraftTime < 5000) return;
    lastCraftTime = now;

    // relics_inv base (0x00097964) + hand inventory offset (0x26) = 0x0009798A
    const INV_BASE = 0x0009798a;
    const r = matchedRecipe;

    const qty1 = appState.inventoryHand[r.input1];
    const qty2 = appState.inventoryHand[r.input2];
    const sameItem = r.input1 === r.input2;
    if (sameItem ? qty1 < 2 : qty1 < 1 || qty2 < 1) return;

    // Write to game memory
    if (r.input1 === r.input2) {
      write(`0x${(INV_BASE + r.input1).toString(16)}`, 1, qty1 - 2); // emulink-allow: write
    } else {
      write(`0x${(INV_BASE + r.input1).toString(16)}`, 1, qty1 - 1); // emulink-allow: write
      write(`0x${(INV_BASE + r.input2).toString(16)}`, 1, appState.inventoryHand[r.input2] - 1); // emulink-allow: write
    }
    const resultQty = appState.inventoryHand[r.output];
    write(`0x${(INV_BASE + r.output).toString(16)}`, 1, resultQty + 1); // emulink-allow: write

    // Track discovery
    if (!discoveredRecipes.includes(r.id)) {
      localDiscoveries = [...localDiscoveries, r.id];
      save("grimoire-recipes", JSON.stringify([...discoveredRecipes, r.id])); // emulink-allow: save
    }

    // Animation + SFX
    craftAnimation = true;
    onAlchemyCraft();
    startCooldown();
    setTimeout(() => {
      craftAnimation = false;
      slot1 = null;
      slot2 = null;
    }, 1000);
  }

  function selectItem(itemId: number) {
    if (pickingSlot === 1) {
      slot1 = itemId;
    } else if (pickingSlot === 2) {
      slot2 = itemId;
    }
    pickingSlot = null;
  }

  function closePicker() {
    pickingSlot = null;
  }

  function getRecipeDisplay(recipe: AlchemyRecipe): {
    input1: string;
    input2: string;
    output: string;
    discovered: boolean;
  } {
    if (discoveredRecipes.includes(recipe.id)) {
      return {
        input1: EQUIP_ITEMS[recipe.input1]?.name ?? "???",
        input2: EQUIP_ITEMS[recipe.input2]?.name ?? "???",
        output: EQUIP_ITEMS[recipe.output]?.name ?? "???",
        discovered: true,
      };
    }
    return { input1: "???", input2: "???", output: "???", discovered: false };
  }

  function fillRecipe(recipe: AlchemyRecipe) {
    if (!discoveredRecipes.includes(recipe.id)) return;
    const has1 = appState.inventoryHand[recipe.input1] > 0;
    const has2 = recipe.input1 === recipe.input2
      ? appState.inventoryHand[recipe.input1] >= 2
      : appState.inventoryHand[recipe.input2] > 0;
    slot1 = has1 ? recipe.input1 : null;
    slot2 = has2 ? recipe.input2 : null;
    showRecipeBook = false;
  }
</script>

<div class="alchemy-view">
  <!-- Header -->
  <header class="header">
    <h2 class="heading gothic-heading">ALCHEMY LAB</h2>
    <button class="recipe-toggle" onclick={() => (showRecipeBook = !showRecipeBook)}>
      <svg class="book-icon" viewBox={BOOK_ICON.viewBox}><path d={BOOK_ICON.path}/></svg>
      {discoveredRecipes.length}/{RECIPES.length}
    </button>
  </header>

  <!-- Transmutation circle + slots -->
  <div class="circle-area" class:crafting={craftAnimation}>
    <img class="alchemy-circle" src={alchemyCircleSvg} alt="" />

    <!-- Ingredient slots overlaid -->
    <div class="slots-overlay">
      <button
        class="slot"
        class:filled={slot1 !== null}
        onclick={() => {
          if (slot1 !== null) { slot1 = null; } else { pickingSlot = 1; }
        }}
      >
        {#if slot1 !== null}
          {@const item1 = EQUIP_ITEMS[slot1]}
          {@const icon1 = item1 ? CATEGORY_ICONS[item1.category] : undefined}
          {#if icon1}
            <svg class="slot-cat-icon" viewBox={icon1.viewBox}><path d={icon1.path} /></svg>
          {/if}
          <span class="slot-name">{slot1Name}</span>
          <span class="slot-clear" role="button" tabindex="-1" onclick={(e) => { e.stopPropagation(); slot1 = null; }} onkeydown={(e) => { if (e.key === "Enter") { e.stopPropagation(); slot1 = null; }}}>&times;</span>
        {:else}
          <span class="slot-icon">+</span>
        {/if}
      </button>

      <span class="plus-symbol">+</span>

      <button
        class="slot"
        class:filled={slot2 !== null}
        onclick={() => {
          if (slot2 !== null) { slot2 = null; } else { pickingSlot = 2; }
        }}
      >
        {#if slot2 !== null}
          {@const item2 = EQUIP_ITEMS[slot2]}
          {@const icon2 = item2 ? CATEGORY_ICONS[item2.category] : undefined}
          {#if icon2}
            <svg class="slot-cat-icon" viewBox={icon2.viewBox}><path d={icon2.path} /></svg>
          {/if}
          <span class="slot-name">{slot2Name}</span>
          <span class="slot-clear" role="button" tabindex="-1" onclick={(e) => { e.stopPropagation(); slot2 = null; }} onkeydown={(e) => { if (e.key === "Enter") { e.stopPropagation(); slot2 = null; }}}>&times;</span>
        {:else}
          <span class="slot-icon">+</span>
        {/if}
      </button>
    </div>
  </div>

  <!-- Result area -->
  <div class="result-card" class:shimmer={craftAnimation}>
    {#if matchedRecipe}
      <span class="result-label">TRANSMUTATION RESULT</span>
      <span class="result-name">{resultName}</span>
      <span class="result-desc">{EQUIP_ITEMS[matchedRecipe.output]?.description ?? ""}</span>
    {:else}
      <span class="result-empty">Select two items...</span>
    {/if}
  </div>

  <!-- Craft button -->
  <button class="craft-btn" disabled={!canCraft} onclick={craft}>
    {#if cooldownRemaining > 0}
      Wait {cooldownRemaining}s...
    {:else}
      TRANSMUTE
    {/if}
  </button>

</div>

<!-- Recipe Book Drawer -->
{#if showRecipeBook}
  <div class="recipe-overlay" onclick={() => (showRecipeBook = false)} role="presentation">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="recipe-drawer" onclick={(e) => e.stopPropagation()} role="dialog" tabindex="-1">
      <div class="recipe-drawer-header">
        <h3 class="recipe-heading">RECIPE BOOK</h3>
        <button class="recipe-drawer-close" onclick={() => (showRecipeBook = false)}>&times;</button>
      </div>
      <div class="recipe-list">
        {#each RECIPES as recipe (recipe.id)}
          {@const display = getRecipeDisplay(recipe)}
          <button
            class="recipe-row"
            class:discovered={display.discovered}
            disabled={!display.discovered}
            onclick={() => fillRecipe(recipe)}
          >
            <span class="recipe-inputs">{display.input1} + {display.input2}</span>
            <span class="recipe-arrow">&rarr;</span>
            <span class="recipe-output">{display.output}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<!-- Item Picker Modal -->
{#if pickingSlot !== null}
  <ItemPicker onselect={selectItem} onclose={closePicker} />
{/if}

<style>
  .alchemy-view {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 8px;
    flex: 1;
    min-height: 0;
    gap: 10px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .heading {
    margin: 0;
    color: var(--text-accent);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
  }

  .recipe-toggle {
    all: unset;
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--text-secondary);
    font-size: 0.75rem;
    cursor: pointer;
    padding: 4px 8px;
    border: 1px solid var(--border-ornate);
    border-radius: 4px;
    letter-spacing: 0.04em;
  }

  .book-icon {
    width: 14px;
    height: 14px;
    fill: var(--text-secondary);
    flex-shrink: 0;
  }

  /* Circle area, contains the alchemy circle + ingredient slots */
  .circle-area {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-height: 120px;
  }

  .alchemy-circle {
    position: absolute;
    width: 85%;
    max-width: 320px;
    aspect-ratio: 1;
    opacity: 0.12;
    animation: circle-spin 60s linear infinite;
    pointer-events: none;
  }

  .circle-area.crafting .alchemy-circle {
    opacity: 0.4;
    animation: circle-spin 4s linear infinite;
    filter: drop-shadow(0 0 8px rgba(201, 169, 78, 0.6));
  }

  @keyframes circle-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Ingredient slots (overlaid on circle) */
  .slots-overlay {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .slot {
    all: unset;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    min-height: 90px;
    background: rgba(18, 16, 30, 0.9);
    border: 1px dashed var(--border-ornate);
    border-radius: 6px;
    cursor: pointer;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    gap: 4px;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(2px);
  }

  .slot.filled {
    flex-direction: row;
    gap: 6px;
    border-style: solid;
    border-color: var(--accent-gold-dim);
    box-shadow: 0 0 8px rgba(201, 169, 78, 0.15);
  }

  .slot-icon {
    color: var(--text-dim);
    font-size: 1.4rem;
    line-height: 1;
  }

  .slot-cat-icon {
    width: 16px;
    height: 16px;
    fill: var(--text-secondary);
    flex-shrink: 0;
    opacity: 0.6;
  }

  .slot-name {
    color: var(--text-primary);
    font-size: 0.68rem;
    font-weight: 600;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .slot-clear {
    all: unset;
    color: var(--text-secondary);
    font-size: 0.9rem;
    opacity: 0.5;
    flex-shrink: 0;
    cursor: pointer;
    padding: 0 2px;
    line-height: 1;
  }

  .plus-symbol {
    color: var(--accent-gold-dim);
    font-size: 18px;
    flex-shrink: 0;
    text-shadow: 0 0 6px rgba(201, 169, 78, 0.3);
  }

  /* Result card */
  .result-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--bg-surface);
    border: 1px solid var(--border-ornate);
    border-radius: 6px;
    padding: 16px 12px;
    min-height: 64px;
    gap: 4px;
    transition: box-shadow 0.3s, border-color 0.3s;
    flex-shrink: 0;
  }

  .result-card.shimmer {
    border-color: var(--accent-gold);
    animation: craft-glow 1.2s ease-out;
  }

  @keyframes craft-glow {
    0% {
      box-shadow: 0 0 4px rgba(201, 169, 78, 0.2);
    }
    30% {
      box-shadow: 0 0 30px rgba(201, 169, 78, 0.8), inset 0 0 20px rgba(201, 169, 78, 0.15);
    }
    100% {
      box-shadow: 0 0 0 rgba(201, 169, 78, 0);
    }
  }

  .result-label {
    color: var(--text-dim);
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  .result-name {
    color: var(--accent-gold);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-shadow: 0 0 8px rgba(201, 169, 78, 0.3);
  }

  .result-desc {
    color: var(--text-secondary);
    font-size: 0.65rem;
    font-style: italic;
  }

  .result-empty {
    color: var(--text-dim);
    font-size: 0.72rem;
    letter-spacing: 0.04em;
  }

  /* Craft button */
  .craft-btn {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px;
    background: linear-gradient(180deg, #c9a94e 0%, #8b7d3c 100%);
    color: var(--bg-deep);
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    border-radius: 6px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    transition: opacity 0.15s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .craft-btn:not(:disabled):active {
    transform: scale(0.98);
  }

  .craft-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    background: var(--bg-surface);
    color: var(--text-dim);
    box-shadow: none;
  }

  /* Recipe drawer overlay */
  .recipe-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 100;
  }

  .recipe-drawer {
    width: 100%;
    max-height: 65vh;
    background: var(--bg-panel);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slide-up 0.2s ease-out;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
  }

  @keyframes slide-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  .recipe-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-ornate);
    flex-shrink: 0;
  }

  .recipe-heading {
    margin: 0;
    color: var(--text-accent);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
  }

  .recipe-drawer-close {
    all: unset;
    color: var(--text-secondary);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 4px 8px;
    line-height: 1;
  }

  .recipe-list {
    overflow-y: auto;
    flex: 1;
  }

  .recipe-row {
    all: unset;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-ornate);
    font-size: 0.7rem;
    color: var(--text-dim);
    width: 100%;
    box-sizing: border-box;
    transition: background 0.1s;
  }

  .recipe-row:last-child {
    border-bottom: none;
  }

  .recipe-row.discovered {
    color: var(--text-primary);
    cursor: pointer;
  }

  .recipe-row.discovered:active {
    background: rgba(201, 169, 78, 0.1);
  }

  .recipe-inputs {
    flex: 1;
    min-width: 0;
  }

  .recipe-arrow {
    color: var(--accent-gold-dim);
    flex-shrink: 0;
  }

  .recipe-output {
    color: var(--accent-gold);
    font-weight: 600;
  }
</style>
