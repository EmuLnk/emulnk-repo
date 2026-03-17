<script lang="ts">
  import { TYPE_NAMES, TYPE_COLORS } from "../type-chart.js";

  let { typeIndex }: { typeIndex: number } = $props();

  let name = $derived(TYPE_NAMES[typeIndex] ?? "???");
  let abbreviation = $derived(name.slice(0, 3).toUpperCase());
  let backgroundColor = $derived(TYPE_COLORS[typeIndex] ?? "#888");
</script>

<span class="type-badge" style:background-color={backgroundColor}>
  {abbreviation}
</span>

<style>
  .type-badge {
    display: inline-block;
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.15);
    letter-spacing: 0.5px;
  }
</style>
