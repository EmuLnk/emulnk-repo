<script lang="ts">
  import type { EncounterAreaSummary } from "../dex.js";

  export let areas: EncounterAreaSummary[] = [];
  export let safariAreas: EncounterAreaSummary[] = [];
  export let selectedMap = -1;
  export let showAllAreas = false;
  export let onSelect: (mapId: number) => void = () => {};

  $: currentArea = areas.find((area) => area.isCurrent) ?? null;

  function methodLabel(area: EncounterAreaSummary): string {
    return area.methods.map((method) => method.slice(0, 1).toUpperCase()).join("");
  }
</script>

<section class="gb-window dex-area-browser">
  <div class="area-browser-header">
    <span class="window-title">{showAllAreas ? "AREA SELECT" : "CURRENT AREA"}</span>
    {#if currentArea}
      <strong>{currentArea.mapName}</strong>
    {/if}
  </div>

  {#if !showAllAreas}
    <div class="area-current-chip">
      {#if currentArea}
        <span>{currentArea.caughtCount}/{currentArea.totalCount}</span>
        <b>{methodLabel(currentArea)}</b>
      {:else}
        <span>NO WILD DATA</span>
      {/if}
    </div>
  {:else}
    <div class="area-browser-list">
      {#each areas as area (area.mapId)}
        <button type="button" class:active={selectedMap === area.mapId} class:safari={area.isSafari} on:click={() => onSelect(area.mapId)}>
          <strong>{area.mapName}</strong>
          <span>{area.caughtCount}/{area.totalCount}</span>
          <b>{methodLabel(area)}</b>
        </button>
      {/each}
    </div>

    {#if safariAreas.length > 0}
      <div class="safari-area-row">
        <span>SAFARI</span>
        {#each safariAreas as area (area.mapId)}
          <button type="button" class:active={selectedMap === area.mapId} on:click={() => onSelect(area.mapId)}>
            {area.mapName.replace("Safari Zone ", "")}
          </button>
        {/each}
      </div>
    {/if}
  {/if}
</section>
