<script lang="ts">
  import { appState } from "../state.svelte";
  import { ELEMENT_NAMES, ELEMENT_BITS } from "../types";

  interface Props {
    onequip?: () => void;
  }

  let { onequip }: Props = $props();

  const ELEMENT_COLORS: Record<string, string> = {
    Fire: "#e04040",
    Ice: "#40a0e0",
    Thunder: "#e0c040",
    Holy: "#f0e0a0",
    Dark: "#6040a0",
    Water: "#4080c0",
    Poison: "#80c040",
    Curse: "#a040a0",
    Stone: "#a09070",
    Cut: "#c0c0c0",
    Hit: "#e0e0e0",
  };

  function decodeElements(bitmask: number): string[] {
    const elements: string[] = [];
    for (const bit of ELEMENT_BITS) {
      if (bitmask & bit) {
        const name = ELEMENT_NAMES[bit];
        if (name) elements.push(name);
      }
    }
    return elements;
  }

  function barPercent(current: number, max: number): number {
    if (max <= 0) return 0;
    return Math.min(100, (current / max) * 100);
  }

  let hpPercent = $derived(barPercent(appState.hp, appState.hpMax));
  let mpPercent = $derived(barPercent(appState.mp, appState.mpMax));
  let heartsPercent = $derived(barPercent(appState.hearts, appState.heartsMax));

  let formattedClock = $derived(
    `${String(appState.clock.hours).padStart(2, "0")}:${String(appState.clock.minutes).padStart(2, "0")}:${String(appState.clock.seconds).padStart(2, "0")}`
  );

  let showWeaknesses = $derived(
    appState.settings["show-enemy-weaknesses"] !== "false"
  );

  let hasEnemies = $derived(appState.enemies.length > 0);
  let visibleEnemies = $derived(appState.enemies.slice(0, 5));
</script>

<div class="stats-view">
  <!-- Player Vitals -->
  <section class="vitals">
    <div class="bar-group">
      <div class="bar-header">
        <span class="bar-label">HP</span>
        <span class="bar-value">{appState.hp}/{appState.hpMax}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill hp-fill" class:low={hpPercent < 25 && hpPercent > 0} style:width="{hpPercent}%"></div>
      </div>
    </div>

    <div class="bar-group">
      <div class="bar-header">
        <span class="bar-label">MP</span>
        <span class="bar-value">{appState.mp}/{appState.mpMax}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill mp-fill" style:width="{mpPercent}%"></div>
      </div>
    </div>

    <div class="bar-group">
      <div class="bar-header">
        <span class="bar-label">Hearts</span>
        <span class="bar-value">{appState.hearts}/{appState.heartsMax}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill hearts-fill" style:width="{heartsPercent}%"></div>
      </div>
    </div>
  </section>

  <!-- Equipment Button -->
  {#if onequip}
    <button class="equip-btn" onclick={onequip}>
      EQUIPMENT ▸
    </button>
  {/if}

  <!-- Stats Grid -->
  <section class="stats-grid">
    <div class="stat-card">
      <span class="stat-label">STR</span>
      <span class="stat-value">{appState.str}</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">CON</span>
      <span class="stat-value">{appState.con}</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">INT</span>
      <span class="stat-value">{appState.int}</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">LCK</span>
      <span class="stat-value">{appState.lck}</span>
    </div>
  </section>

  <!-- Info Row -->
  <section class="info-row">
    <span class="info-item">
      <span class="info-label">EXP</span>
      <span class="info-value gold">{appState.exp}</span>
    </span>
    <span class="info-divider"></span>
    <span class="info-item">
      <span class="info-label">Gold</span>
      <span class="info-value gold">G {appState.gold}</span>
    </span>
    <span class="info-divider"></span>
    <span class="info-item">
      <span class="info-label">Kills</span>
      <span class="info-value">{appState.killCount}</span>
    </span>
    <span class="info-divider"></span>
    <span class="info-item">
      <span class="info-label">Clock</span>
      <span class="info-value">{formattedClock}</span>
    </span>
  </section>

  <!-- Enemy HP Section -->
  {#if hasEnemies}
    <section class="enemies-section">
      <h3 class="enemies-heading gothic-heading">ENEMIES</h3>

      {#each visibleEnemies as enemy (enemy.slot)}
        {@const enemyHpPercent = barPercent(enemy.hp, enemy.maxHp)}
        {@const weaknesses = decodeElements(enemy.weaknesses)}
        {@const resistances = decodeElements(enemy.strengths | enemy.immunes | enemy.absorbs)}

        <div class="enemy-entry">
          <div class="bar-header">
            <span class="enemy-name">{enemy.name}</span>
            <span class="bar-value">HP: {enemy.hp}/{enemy.maxHp}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill hp-fill" style:width="{enemyHpPercent}%"></div>
          </div>

          {#if showWeaknesses}
            {#if weaknesses.length > 0}
              <div class="element-badges">
                {#each weaknesses as elem (elem)}
                  <span
                    class="badge weakness"
                    style:background-color={ELEMENT_COLORS[elem]}
                  >{elem}</span>
                {/each}
              </div>
            {/if}
            {#if resistances.length > 0}
              <div class="element-badges">
                {#each resistances as elem (elem)}
                  <span
                    class="badge resistance"
                    style:background-color={ELEMENT_COLORS[elem]}
                  >{elem}</span>
                {/each}
              </div>
            {/if}
          {/if}
        </div>
      {/each}
    </section>
  {/if}
</div>

<style>
  .stats-view {
    display: flex;
    flex-direction: column;
    gap: 14px;
    overflow-y: auto;
    padding: 10px;
    flex: 1;
    min-height: 0;
    justify-content: space-evenly;
  }

  /* Equipment button */
  .equip-btn {
    width: 100%;
    padding: 8px;
    background: var(--bg-surface);
    border: 1px solid var(--border-ornate);
    border-radius: var(--card-radius);
    color: var(--accent-gold);
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;
    transition: background 0.15s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    text-shadow: 0 0 6px rgba(201, 169, 78, 0.3);
  }

  .equip-btn:active {
    background: var(--bg-panel);
    transform: scale(0.98);
  }

  /* Vitals */
  .vitals {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .bar-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .bar-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .bar-label {
    color: var(--text-secondary);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .bar-value {
    color: var(--text-primary);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
  }

  .bar-track {
    height: 8px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.04);
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .hp-fill {
    background: var(--hp-color, var(--accent-crimson));
  }

  .hp-fill.low {
    animation: hp-pulse 1s ease-in-out infinite;
  }

  .mp-fill {
    background: var(--mp-color, #3040a0);
  }

  .hearts-fill {
    background: var(--hearts-color, var(--accent-gold));
  }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .stat-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    background: var(--bg-surface);
    border: 1px solid var(--border-ornate);
    border-radius: var(--card-radius);
    box-shadow:
      inset 0 1px 0 var(--border-inner, rgba(255, 255, 255, 0.03)),
      0 2px 4px rgba(0, 0, 0, 0.4);
  }

  .stat-label {
    color: var(--text-secondary);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat-value {
    color: var(--text-primary);
    font-size: 1.1rem;
    font-variant-numeric: tabular-nums;
    font-weight: 700;
  }

  /* Info Row */
  .info-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    padding: 10px 12px;
    background: var(--bg-surface);
    border: 1px solid var(--border-ornate);
    border-radius: var(--card-radius);
    box-shadow:
      inset 0 1px 0 var(--border-inner, rgba(255, 255, 255, 0.03)),
      0 2px 4px rgba(0, 0, 0, 0.4);
  }

  .info-item {
    display: flex;
    gap: 4px;
    align-items: baseline;
  }

  .info-label {
    color: var(--text-secondary);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .info-value {
    color: var(--text-primary);
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
  }

  .info-value.gold {
    color: var(--accent-gold);
  }

  .info-divider {
    width: 1px;
    height: 12px;
    background: var(--border-ornate);
  }

  /* Enemies Section */
  .enemies-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .enemies-heading {
    margin: 0;
    color: var(--text-accent, var(--accent-crimson));
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
  }

  .enemy-entry {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 6px 8px;
    background: var(--bg-panel);
    border: 1px solid var(--border-ornate);
    border-left: 2px solid var(--accent-crimson);
    border-radius: var(--card-radius);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  }

  .enemy-name {
    color: var(--text-primary);
    font-size: 0.8rem;
    font-weight: 500;
  }

  /* Element Badges */
  .element-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 2px;
  }

  .badge {
    display: inline-block;
    padding: 1px 6px;
    border-radius: 8px;
    font-size: 0.6rem;
    font-weight: 600;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .badge.resistance {
    opacity: 0.45;
  }
</style>
