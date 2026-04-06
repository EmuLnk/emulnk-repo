<script lang="ts">
  import { appState } from "../state.svelte";
  import { FAMILIARS } from "../data/familiars";
  import { EQUIP_ITEMS } from "../data/items";
  import { ALL_FOOD_IDS, calculateFeedExp, isPreferredFood } from "../data/familiar-prefs";
  import { write } from "@emulnk/sdk"; // emulnk-allow: write
  import { onFamiliarChirp, onFamiliarFeed } from "../sfx";
  import FamiliarSprite from "./FamiliarSprite.svelte";

  interface Props {
    familiarKey: string;
    onback: () => void;
  }

  let { familiarKey, onback }: Props = $props();

  // --- State ---
  let animState: "idle" | "react" | "eat" = $state("idle");
  let showFeedList = $state(false);
  let cooldownRemaining = $state(0);
  let cooldownTimer: ReturnType<typeof setInterval> | null = null;
  let lastFed: { name: string; exp: number } | null = $state(null);

  let spriteOffsetX = $state(0);
  let spriteOffsetY = $state(0);
  let snapBack = $state(false);
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = false;
  let longPressTimer: ReturnType<typeof setTimeout> | null = null;
  let touchStartTime = 0;

  // --- Derived ---
  let familiarDef = $derived(FAMILIARS.find((f) => f.key === familiarKey)!);
  let familiarData = $derived(appState.familiars[familiarKey as keyof typeof appState.familiars]);
  let isActive = $derived(appState.relics[familiarDef.relicIndex] === 3);

  let ownedFood = $derived.by(() => {
    const items: { id: number; name: string; qty: number; isPreferred: boolean; exp: number }[] = [];
    for (const foodId of ALL_FOOD_IDS) {
      const qty = appState.inventoryHand[foodId];
      if (qty > 0) {
        const item = EQUIP_ITEMS[foodId];
        items.push({
          id: foodId,
          name: item?.name ?? "???",
          qty,
          isPreferred: isPreferredFood(familiarKey, foodId),
          exp: calculateFeedExp(familiarKey, foodId),
        });
      }
    }
    items.sort((a, b) => {
      if (a.isPreferred !== b.isPreferred) return a.isPreferred ? -1 : 1;
      return a.id - b.id;
    });
    return items;
  });

  // --- Cooldown ---
  function startCooldown() {
    cooldownRemaining = 2;
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

  // --- Feed ---
  function feedFamiliar(itemId: number) {
    const INV_BASE = 0x0009798a;
    const qty = appState.inventoryHand[itemId];
    if (qty < 1 || cooldownRemaining > 0) return;

    const item = EQUIP_ITEMS[itemId];
    const expGain = calculateFeedExp(familiarKey, itemId);

    // Decrement inventory
    write(`0x${(INV_BASE + itemId).toString(16)}`, 1, qty - 1); // emulnk-allow: write

    // Add EXP
    const currentExp = appState.familiars[familiarKey as keyof typeof appState.familiars].exp;
    write(familiarDef.expAddr, 4, currentExp + expGain); // emulnk-allow: write

    // Close feed list so sprite + eat animation is visible
    showFeedList = false;

    // Show feedback
    lastFed = { name: item?.name ?? "???", exp: expGain };
    setTimeout(() => { lastFed = null; }, 2000);

    // Animation + SFX
    animState = "eat";
    onFamiliarFeed();
    setTimeout(() => { animState = "idle"; }, 500);

    // Start 2s cooldown
    startCooldown();
  }

  // --- Touch handlers ---
  function handleTouchStart(e: TouchEvent) {
    if (!isActive || showFeedList) return;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartTime = Date.now();
    isDragging = false;
    snapBack = false;

    longPressTimer = setTimeout(() => {
      if (!isDragging) {
        showFeedList = true;
      }
    }, 500);
  }

  function handleTouchMove(e: TouchEvent) {
    if (!isActive || showFeedList) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
      isDragging = true;
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
      spriteOffsetX = dx;
      spriteOffsetY = dy;
    }
  }

  function handleTouchEnd() {
    if (!isActive || showFeedList) return;
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }

    const elapsed = Date.now() - touchStartTime;

    if (isDragging) {
      snapBack = true;
      spriteOffsetX = 0;
      spriteOffsetY = 0;
    } else if (elapsed < 300) {
      animState = "react";
      onFamiliarChirp();
      setTimeout(() => { animState = "idle"; }, 300);
    }

    isDragging = false;
  }
</script>

<div class="companion-screen">
  <!-- Header -->
  <header class="header">
    <button class="back-btn" onclick={onback}>&#9666; BACK</button>
    <h2 class="familiar-title">{familiarDef.name}</h2>
    <div class="header-right">
      {#if isActive}
        <span class="active-badge">ACTIVE</span>
      {/if}
    </div>
  </header>

  <!-- Stats bar -->
  <div class="stats-bar">
    <span class="stat">Lv. {familiarData.level}</span>
    <span class="stat">EXP: {familiarData.exp}</span>
  </div>

  {#if showFeedList}
    <!-- Inline food list -->
    <div class="food-list">
      {#each ownedFood as food (food.id)}
        <div
          class="food-item"
          class:on-cooldown={cooldownRemaining > 0}
          onclick={() => feedFamiliar(food.id)}
          role="button"
          tabindex="0"
          onkeydown={(e) => { if (e.key === "Enter") feedFamiliar(food.id); }}
        >
          <div class="food-left">
            <span class="food-label">{food.name}</span>
            {#if food.isPreferred}<span class="food-star">&#9733;</span>{/if}
          </div>
          <div class="food-right">
            <span class="food-exp">+{food.exp}</span>
            <span class="food-count">{food.qty}</span>
          </div>
        </div>
      {:else}
        <div class="food-empty">No food in inventory</div>
      {/each}
    </div>

    <button class="action-btn close-btn" onclick={() => (showFeedList = false)}>CLOSE</button>
  {:else}
    <!-- Sprite area -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="sprite-area"
      class:inactive={!isActive}
      ontouchstart={handleTouchStart}
      ontouchmove={handleTouchMove}
      ontouchend={handleTouchEnd}
    >
      <FamiliarSprite familiar={familiarKey} {animState} offsetX={spriteOffsetX} offsetY={spriteOffsetY} {snapBack} />
    </div>

    {#if lastFed}
      <div class="feed-toast">Fed {lastFed.name} &mdash; +{lastFed.exp} EXP</div>
    {/if}

    <button
      class="action-btn feed-btn"
      disabled={!isActive || cooldownRemaining > 0}
      onclick={() => { if (isActive && cooldownRemaining <= 0) showFeedList = true; }}
    >
      {#if !isActive}
        Not Active
      {:else if cooldownRemaining > 0}
        Wait {cooldownRemaining}s...
      {:else}
        FEED
      {/if}
    </button>
  {/if}
</div>

<style>
  .companion-screen {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 8px;
    gap: 8px;
    box-sizing: border-box;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: 4px 0;
  }

  .back-btn {
    background: none;
    border: 1px solid var(--border-ornate);
    color: var(--text-secondary);
    font-family: inherit;
    font-size: 12px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 600;
  }

  .familiar-title {
    margin: 0;
    color: var(--text-accent);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
  }

  .header-right {
    min-width: 60px;
    display: flex;
    justify-content: flex-end;
  }

  .active-badge {
    background: var(--accent-gold);
    color: var(--bg-deep);
    font-size: 9px;
    padding: 2px 6px;
    border-radius: 8px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Stats bar */
  .stats-bar {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-shrink: 0;
  }

  .stat {
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.04em;
  }

  /* Sprite area */
  .sprite-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
    overflow: visible;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }

  .sprite-area.inactive {
    opacity: 0.3;
    pointer-events: none;
  }

  /* Shared action button */
  .action-btn {
    display: block;
    width: 100%;
    padding: 14px;
    background: var(--accent-gold, #d4af37);
    color: var(--bg-deep, #0d0a1a);
    font-family: inherit;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    flex-shrink: 0;
  }

  .action-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .close-btn {
    background: var(--bg-surface);
    color: var(--text-secondary);
  }

  /* Inline food list */
  .food-list {
    flex: 1;
    overflow-y: auto;
    border: 1px solid var(--border-ornate);
    border-radius: 4px;
    background: var(--bg-panel);
  }

  .food-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid var(--border-ornate);
    cursor: pointer;
  }

  .food-item:last-child {
    border-bottom: none;
  }

  .food-item:active {
    background: var(--bg-surface);
  }

  .food-item.on-cooldown {
    opacity: 0.4;
    pointer-events: none;
  }

  .food-left {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .food-label {
    color: var(--text-primary);
    font-size: 13px;
  }

  .food-star {
    color: var(--accent-gold);
    font-size: 12px;
  }

  .food-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .food-exp {
    color: var(--accent-gold);
    font-size: 12px;
    font-weight: 600;
  }

  .food-count {
    color: var(--text-dim);
    font-size: 11px;
    background: var(--bg-surface);
    padding: 2px 8px;
    border-radius: 10px;
    min-width: 20px;
    text-align: center;
  }

  .food-empty {
    padding: 24px 12px;
    text-align: center;
    color: var(--text-dim);
    font-size: 13px;
  }

  /* Feed toast */
  .feed-toast {
    text-align: center;
    color: var(--accent-gold);
    font-size: 12px;
    font-weight: 600;
    padding: 6px;
    flex-shrink: 0;
  }
</style>
