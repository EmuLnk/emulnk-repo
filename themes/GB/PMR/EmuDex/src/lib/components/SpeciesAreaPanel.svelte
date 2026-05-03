<script lang="ts">
  import type { SpeciesAreaSummary } from "../dex.js";
  import PokemonSprite from "./PokemonSprite.svelte";

  export let summary: SpeciesAreaSummary | null = null;

  function levelLabel(min: number, max: number): string {
    return min === max ? `L${min}` : `L${min}-${max}`;
  }

  function rateLabel(rate: number): string {
    return `${Number.isInteger(rate) ? rate : rate.toFixed(1)}%`;
  }

  function methodLabel(methods: readonly string[]): string {
    return methods.map((method) => method.replace("-rod", " ROD").toUpperCase()).join(" / ");
  }
</script>

{#if summary}
  <section class="gb-window species-area-panel">
    <div class="species-area-header">
      <div class="species-area-sprite">
        <PokemonSprite speciesName={summary.speciesName} label={summary.speciesName} />
      </div>
      <div>
        <span class="window-title">AREA FILE</span>
        <h3>{summary.status === "unseen" ? "???" : summary.speciesName}</h3>
        <p>No.{summary.dexId} {summary.status.toUpperCase()}</p>
      </div>
    </div>

    {#if summary.areas.length === 0}
      <p class="empty-message">NO AREA DATA</p>
    {:else}
      <div class="species-area-list">
        {#each summary.areas as area (area.mapId)}
          <div class:safari={area.isSafari}>
            <strong>{area.mapName}</strong>
            <span>{levelLabel(area.minLevel, area.maxLevel)}</span>
            <b>{rateLabel(area.bestRate)}</b>
            <small>{methodLabel(area.methods)}</small>
          </div>
        {/each}
      </div>
    {/if}
  </section>
{/if}
