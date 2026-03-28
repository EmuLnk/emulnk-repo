<script lang="ts">
  interface Props {
    name: string;
    level: number;
    exp: number;
    active: boolean;
    onclick?: () => void;
  }

  let { name, level, exp, active, onclick }: Props = $props();

  let tier = $derived(Math.floor(level / 10));
</script>

<button class="familiar-card" class:active class:clickable={!!onclick} {onclick} type="button">
  <div class="top-row">
    <span class="familiar-name">{name}</span>
    <div class="top-right">
      {#if active}
        <span class="active-badge">ACTIVE</span>
      {/if}
      {#if onclick}
        <span class="chevron">&#9656;</span>
      {/if}
    </div>
  </div>

  <div class="level-display">Lv. {level}</div>

  <div class="bottom-row">
    <span class="exp-label">EXP: {exp}</span>
    <span class="tier-label">Tier {tier}</span>
  </div>
</button>

<style>
  .familiar-card {
    all: unset;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: var(--bg-surface);
    border: 1px solid var(--border-ornate);
    border-radius: 4px;
    padding: 12px;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    font: inherit;
    color: inherit;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .familiar-card.active {
    border-left: 3px solid var(--accent-gold);
  }

  .familiar-card.clickable {
    cursor: pointer;
  }

  .familiar-card.clickable:active {
    background: var(--bg-panel);
  }

  .top-right {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .chevron {
    color: var(--text-dim);
    font-size: 14px;
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .familiar-name {
    color: var(--text-primary);
    font-weight: 700;
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

  .level-display {
    font-size: 24px;
    color: var(--accent-gold);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .exp-label {
    color: var(--text-secondary);
    font-size: 11px;
    font-variant-numeric: tabular-nums;
  }

  .tier-label {
    color: var(--text-dim);
    font-size: 10px;
  }
</style>
