<script lang="ts">
  import { ELEMENT_BITS, ELEMENT_NAMES } from "../types";

  interface Props {
    label: string;
    itemName: string;
    description: string;
    attack: number;
    defense: number;
    element?: number;
    statBonus?: [number, number, number, number];
    resistElements?: number;
  }

  let {
    label,
    itemName,
    description,
    attack,
    defense,
    element = 0,
    statBonus,
    resistElements = 0,
  }: Props = $props();

  const STAT_LABELS = ["STR", "CON", "INT", "LCK"] as const;

  function decodeElementNames(bitmask: number): string[] {
    const names: string[] = [];
    for (const bit of ELEMENT_BITS) {
      if (bitmask & bit) {
        const name = ELEMENT_NAMES[bit];
        if (name) names.push(name);
      }
    }
    return names;
  }

  let elementNames = $derived(element ? decodeElementNames(element) : []);
  let resistNames = $derived(resistElements ? decodeElementNames(resistElements) : []);

  let bonusEntries = $derived(
    statBonus
      ? statBonus
          .map((v, i) => (v > 0 ? `+${v} ${STAT_LABELS[i]}` : ""))
          .filter(Boolean)
      : []
  );
</script>

<div class="slot-card">
  <span class="slot-label">{label}</span>
  <span class="slot-name">{itemName}</span>
  {#if description}
    <span class="slot-desc">{description}</span>
  {/if}

  <div class="stats-row">
    {#if attack !== 0}
      <span class="stat">ATK <strong>{attack}</strong></span>
    {/if}
    {#if defense !== 0}
      <span class="stat">DEF <strong>{defense}</strong></span>
    {/if}
  </div>

  {#if bonusEntries.length > 0}
    <div class="bonus-row">
      {#each bonusEntries as entry (entry)}
        <span class="bonus">{entry}</span>
      {/each}
    </div>
  {/if}

  {#if elementNames.length > 0}
    <div class="element-row">
      <span class="element-label">Element:</span>
      <span class="element-value">{elementNames.join(", ")}</span>
    </div>
  {/if}

  {#if resistNames.length > 0}
    <div class="element-row">
      <span class="element-label">Resists:</span>
      <span class="element-value">{resistNames.join(", ")}</span>
    </div>
  {/if}
</div>

<style>
  .slot-card {
    display: flex;
    flex-direction: column;
    gap: 2px;
    background: var(--bg-surface);
    border: 1px solid var(--border-ornate);
    border-radius: 4px;
    padding: 10px;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .slot-label {
    color: var(--text-secondary);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .slot-name {
    color: var(--text-primary);
    font-weight: 700;
    font-size: 0.9rem;
  }

  .slot-desc {
    color: var(--text-dim);
    font-size: 0.72rem;
    font-style: italic;
  }

  .stats-row {
    display: flex;
    gap: 12px;
    margin-top: 4px;
  }

  .stat {
    color: var(--text-secondary);
    font-size: 0.72rem;
    font-variant-numeric: tabular-nums;
  }

  .stat strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  .bonus-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .bonus {
    color: var(--accent-gold, #d4a840);
    font-size: 0.7rem;
    font-weight: 600;
  }

  .element-row {
    display: flex;
    gap: 4px;
    align-items: baseline;
  }

  .element-label {
    color: var(--text-secondary);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .element-value {
    color: var(--text-accent, var(--accent-crimson));
    font-size: 0.72rem;
  }
</style>
