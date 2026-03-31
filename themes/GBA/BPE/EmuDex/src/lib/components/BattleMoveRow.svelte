<script lang="ts">
  import type { DamageResult } from "../types.js";
  import { MOVE_DATA } from "../moves.js";
  import { getMoveName } from "../rom-tables.js";
  import { TYPE_COLORS } from "../type-chart.js";
  import BattleIcon from "./BattleIcon.svelte";

  let { moveId, pp, damage, showDamage, showAccuracy, showEffLabel, grid = false }: {
    moveId: number;
    pp: number;
    damage: DamageResult | null;
    showDamage: boolean;
    showAccuracy: boolean;
    showEffLabel: boolean;
    grid?: boolean;
  } = $props();

  let move = $derived(MOVE_DATA[moveId]);
  let name = $derived(getMoveName(moveId));
  let typeIndex = $derived(move?.[2] ?? 0);
  let basePower = $derived(move?.[1] ?? 0);
  let priority = $derived(move?.[4] ?? 0);
  let isEmpty = $derived(moveId === 0);
  let typeColor = $derived(TYPE_COLORS[typeIndex] ?? '#888');

  // STAB: much thicker border + glow
  let isSTAB = $derived(damage?.isSTAB ?? false);
  let borderWidth = $derived(isSTAB ? '8px' : '5px');
  let boxShadow = $derived(isSTAB ? `inset 6px 0 12px -3px ${typeColor}60` : 'none');

  // Effectiveness tint
  let effTint = $derived.by(() => {
    if (!damage) return 'transparent';
    const eff = damage.effectiveness;
    if (eff >= 4) return 'rgba(255, 152, 0, 0.15)';
    if (eff >= 2) return 'rgba(76, 175, 80, 0.12)';
    if (eff === 1) return `${typeColor}0F`;
    if (eff > 0 && eff < 1 && eff >= 0.25) return 'rgba(0, 0, 0, 0.04)';
    if (eff > 0 && eff < 0.25) return 'rgba(0, 0, 0, 0.08)';
    if (eff === 0) return 'rgba(0, 0, 0, 0.12)';
    return 'transparent';
  });

  let isImmune = $derived(damage?.effectiveness === 0);

  // Effectiveness label
  let effLabel = $derived.by(() => {
    if (!damage) return '';
    const eff = damage.effectiveness;
    if (eff === 0) return 'x0';
    if (eff === 0.25) return 'x0.25';
    if (eff === 0.5) return 'x0.5';
    if (eff === 1) return '';
    if (eff === 2) return 'x2';
    if (eff === 4) return 'x4';
    return `x${eff}`;
  });

  let effColor = $derived.by(() => {
    if (!damage) return '';
    const eff = damage.effectiveness;
    if (eff >= 4) return '#1B5E20';
    if (eff >= 2) return '#4CAF50';
    if (eff === 0) return '#C03028';
    if (eff <= 0.25) return '#E65100';
    if (eff < 1) return '#E8C838';
    return '';
  });
</script>

{#if isEmpty}
  {#if grid}
    <div class="grid-cell grid-empty">
      <span class="move-name empty-name">&mdash;</span>
    </div>
  {:else}
    <div class="move-row empty">
      <span class="move-name empty-name">&mdash;</span>
    </div>
  {/if}
{:else if grid}
  <div
    class="grid-cell"
    class:immune={isImmune}
    style:border-left-width={borderWidth}
    style:border-left-color={typeColor}
    style:box-shadow={boxShadow}
    style:background={effTint}
  >
    <div class="grid-top">
      <div class="grid-name-row">
        {#if priority > 0}
          <BattleIcon icon="bolt" size={10} color="#F8D030" />
        {/if}
        <span class="move-name" class:strikethrough={isImmune}>{name}</span>
      </div>
      <div class="grid-meta">
        <span class="move-pp">PP:{pp}</span>
        {#if damage?.koGuaranteed}
          <BattleIcon icon="skull" size={12} color="#E04038" />
        {:else if damage?.koPossible}
          <BattleIcon icon="skull-outline" size={12} color="#E04038" />
        {/if}
      </div>
    </div>
    {#if (showDamage || showAccuracy || showEffLabel) && damage && !damage.isStatus}
      <div class="nerd-row">
        {#if showDamage}
          <span class="damage-text">{damage.minPct}-{damage.maxPct}%</span>
        {/if}
        {#if showAccuracy}
          <span class="acc-text">{damage.accuracyPct}%</span>
        {/if}
        {#if showEffLabel && effLabel}
          <span class="eff-text" style:color={effColor}>{effLabel}</span>
        {/if}
      </div>
    {/if}
    {#if damage?.isStatus}
      <div class="status-label">Status</div>
    {/if}
  </div>
{:else}
  <div
    class="move-row"
    class:immune={isImmune}
    style:border-left-width={borderWidth}
    style:border-left-color={typeColor}
    style:box-shadow={boxShadow}
    style:background={effTint}
  >
    <div class="move-main">
      <div class="move-left">
        {#if priority > 0}
          <BattleIcon icon="bolt" size={10} color="#F8D030" />
        {/if}
        <span class="move-name" class:strikethrough={isImmune}>{name}</span>
      </div>
      <div class="move-right">
        <span class="move-pp">PP:{pp}</span>
        {#if damage?.koGuaranteed}
          <BattleIcon icon="skull" size={12} color="#E04038" />
        {:else if damage?.koPossible}
          <BattleIcon icon="skull-outline" size={12} color="#E04038" />
        {/if}
      </div>
    </div>

    {#if (showDamage || showAccuracy || showEffLabel) && damage && !damage.isStatus}
      <div class="nerd-row">
        {#if showDamage}
          <span class="damage-text">{damage.minDmg}-{damage.maxDmg} ({damage.minPct}-{damage.maxPct}%)</span>
        {/if}
        {#if showAccuracy}
          <span class="acc-text">{damage.accuracyPct}%</span>
        {/if}
        {#if showEffLabel && effLabel}
          <span class="eff-text" style:color={effColor}>{effLabel}</span>
        {/if}
      </div>
    {/if}

    {#if damage?.isStatus}
      <div class="status-label">Status</div>
    {/if}
  </div>
{/if}

<style>
  .move-row {
    padding: 7px 7px 7px 9px;
    border-bottom: 1px solid var(--divider);
    border-left-style: solid;
    min-height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .move-row:last-child {
    border-bottom: none;
  }

  .move-row.empty {
    display: flex;
    align-items: center;
    border-left: 5px solid #ccc;
    min-height: 33px;
  }

  .move-row.immune {
    opacity: 0.5;
  }

  .move-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .move-left {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    min-width: 0;
  }

  .move-right {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .move-name {
    font-size: 12px;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .move-name.strikethrough {
    text-decoration: line-through;
  }

  .empty-name {
    color: #999;
  }

  .move-pp {
    font-size: 10px;
    color: var(--text-muted);
    font-family: monospace;
  }

  .nerd-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 2px;
    padding-left: 0;
  }

  .damage-text {
    font-size: 10px;
    font-weight: bold;
    color: var(--border);
  }

  .acc-text {
    font-size: 10px;
    color: var(--text-muted);
  }

  .eff-text {
    font-size: 10px;
    font-weight: bold;
    color: #4CAF50;
  }

  .status-label {
    font-size: 10px;
    color: var(--text-muted);
    font-style: italic;
    margin-top: 1px;
  }

  /* --- Grid cell mode --- */
  .grid-cell {
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: var(--card-radius);
    border-left-style: solid;
    box-shadow: var(--card-shadow);
    padding: 7px 7px 7px 9px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 52px;
  }

  .grid-cell:active {
    transform: scale(0.98);
  }

  .grid-cell.immune {
    opacity: 0.5;
  }

  .grid-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 5px solid #ccc;
    opacity: 0.4;
  }

  .grid-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
  }

  .grid-name-row {
    display: flex;
    align-items: center;
    gap: 3px;
    flex: 1;
    min-width: 0;
  }

  .grid-meta {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }
</style>
