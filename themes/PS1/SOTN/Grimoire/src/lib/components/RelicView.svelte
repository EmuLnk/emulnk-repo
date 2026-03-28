<script lang="ts">
  import { appState } from "../state.svelte";
  import { RELICS, RELIC_CATEGORIES, type RelicCategory } from "../data/relics";
  import RelicCard from "./RelicCard.svelte";

  /** IDs 23 and 24 are JP-only relics, excluded from display and count */
  const JP_ONLY_IDS = new Set([23, 24]);

  let displayRelics = $derived(RELICS.filter((r) => !JP_ONLY_IDS.has(r.id)));

  let groupedRelics = $derived.by(() => {
    const groups = new Map<RelicCategory, typeof RELICS>();
    for (const relic of displayRelics) {
      let list = groups.get(relic.category);
      if (!list) {
        list = [];
        groups.set(relic.category, list);
      }
      list.push(relic);
    }
    return groups;
  });

  let ownedCount = $derived(
    displayRelics.filter((r) => appState.relics[r.id] >= 1).length
  );

  let totalCount = $derived(displayRelics.length);
</script>

<div class="relic-view">
  <header class="relic-header">
    <h2 class="relic-heading gothic-heading">RELICS</h2>
    <span class="relic-count">{ownedCount}/{totalCount}</span>
  </header>

  {#each RELIC_CATEGORIES as cat (cat.key)}
    {@const relics = groupedRelics.get(cat.key)}
    {#if relics && relics.length > 0}
      <section class="relic-category">
        <h3 class="category-label">{cat.label}</h3>
        <div class="relic-grid">
          {#each relics as relic (relic.id)}
            <RelicCard name={relic.name} status={appState.relics[relic.id]} />
          {/each}
        </div>
      </section>
    {/if}
  {/each}
</div>

<style>
  .relic-view {
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    padding: 8px;
  }

  .relic-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .relic-heading {
    margin: 0;
    color: var(--text-accent);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .relic-count {
    color: var(--accent-gold);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    padding: 2px 8px;
    background: var(--bg-surface);
    border: 1px solid var(--border-ornate);
    border-radius: 10px;
  }

  .relic-category {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .category-label {
    margin: 10px 0 0 0;
    color: var(--text-secondary);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .relic-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 6px;
  }
</style>
