<script lang="ts">
  import { MOVE_DATA } from "../moves.js";
  import { getMoveName } from "../rom-tables.js";
  import TypeBadge from "./TypeBadge.svelte";

  let { moveId, pp }: { moveId: number; pp: number } = $props();

  let move = $derived(MOVE_DATA[moveId]);
  let name = $derived(getMoveName(moveId));
  let typeIndex = $derived(move?.[2] ?? 0);
  let isEmpty = $derived(moveId === 0);
</script>

{#if isEmpty}
  <div class="move-row empty">
    <span class="move-name empty-name">—</span>
  </div>
{:else}
  <div class="move-row">
    <TypeBadge {typeIndex} />
    <span class="move-name">{name}</span>
    <span class="move-pp">PP: {pp}</span>
  </div>
{/if}

<style>
  .move-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 0;
    border-bottom: 1px solid var(--divider);
  }

  .move-name {
    flex: 1;
    font-size: 12px;
    color: var(--text);
  }

  .empty-name {
    color: #999;
  }

  .move-pp {
    font-size: 10px;
    color: var(--text-muted);
  }
</style>
