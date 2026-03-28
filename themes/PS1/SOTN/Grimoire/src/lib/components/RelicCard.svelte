<script lang="ts">
  interface Props {
    name: string;
    status: number; // 0=locked, 1=owned, 3=equipped
  }

  let { name, status }: Props = $props();

  let stateClass = $derived(
    status === 3 ? "equipped" : status >= 1 ? "owned" : "locked"
  );

  let displayName = $derived(status === 0 ? "???" : name);
</script>

<div class="relic-card {stateClass}">
  <span class="relic-name">{displayName}</span>
  {#if status === 3}
    <span class="status-dot gold"></span>
  {:else if status >= 1}
    <span class="status-dot green"></span>
  {/if}
</div>

<style>
  .relic-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
    padding: 6px 8px;
    background: var(--bg-surface);
    border: 1px solid var(--border-ornate);
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 1px 3px rgba(0, 0, 0, 0.25);
  }

  .relic-name {
    font-size: 11px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .status-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .status-dot.gold {
    background: var(--accent-gold);
  }

  .status-dot.green {
    background: #508050;
  }

  /* Equipped state */
  .relic-card.equipped {
    border-color: var(--accent-gold);
    animation: relic-glow 3s ease-in-out infinite alternate;
  }

  @keyframes relic-glow {
    0% {
      box-shadow: 0 0 4px rgba(201, 169, 78, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }
    100% {
      box-shadow: 0 0 10px rgba(201, 169, 78, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }
  }

  .relic-card.equipped .relic-name {
    color: var(--accent-gold);
  }

  /* Owned state */
  .relic-card.owned .relic-name {
    color: var(--text-primary);
  }

  /* Locked state */
  .relic-card.locked {
    background: rgba(13, 10, 26, 0.6);
  }

  .relic-card.locked .relic-name {
    color: var(--text-dim);
  }
</style>
