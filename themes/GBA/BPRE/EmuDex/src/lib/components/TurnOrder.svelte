<script lang="ts">
  import type { BattleMon, FieldState } from "../types.js";
  import { calcTurnOrder } from "../turn-order.js";
  import iconsUrl from "../../assets/icons.webp";

  let { mons, field }: {
    mons: { mon: BattleMon; side: 'player' | 'enemy' | 'partner' }[];
    field: FieldState;
  } = $props();

  let turnOrder = $derived(calcTurnOrder(mons, field));

  const SIDE_COLORS: Record<string, string> = {
    player: '#48B048',
    enemy: '#E04038',
    partner: '#6890F0',
  };

  function iconPos(species: number) {
    const col = (species - 1) % 20;
    const row = Math.floor((species - 1) / 20);
    return `calc(${col} * -32px) calc(${row} * -32px)`;
  }
</script>

{#if turnOrder.length > 0}
  <div class="turn-order">
    {#each turnOrder as entry, idx (entry.mon.species + '-' + entry.side)}
      {#if idx > 0}
        <span class="arrow">&#9654;</span>
      {/if}
      <div class="turn-entry">
        <div
          class="turn-icon"
          style:border-color={SIDE_COLORS[entry.side] ?? '#888'}
          style:background-image="url({iconsUrl})"
          style:background-size="640px 640px"
          style:background-position={iconPos(entry.mon.species)}
        ></div>
        <span class="turn-name">
          {entry.mon.speciesName}
        </span>
        <span class="turn-speed">{entry.effectiveSpeed}</span>
      </div>
    {/each}
  </div>
{/if}

<style>
  .turn-order {
    display: flex;
    align-items: center;
    gap: 2px;
    flex: 1;
  }

  .turn-entry {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    flex: 1;
    min-width: 0;
  }

  .turn-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid;
    background-color: rgba(255, 255, 255, 0.85);
    image-rendering: pixelated;
    flex-shrink: 0;
    overflow: hidden;
  }

  .turn-name {
    font-family: "PokemonGB", monospace;
    font-size: 7px;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    text-align: center;
    line-height: 1;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  }

  .turn-speed {
    font-size: 8px;
    color: rgba(255, 255, 255, 0.6);
    font-family: monospace;
    line-height: 1;
  }

  .arrow {
    color: rgba(255, 255, 255, 0.4);
    font-size: 10px;
    flex-shrink: 0;
    line-height: 1;
    margin-bottom: 12px;
  }
</style>
