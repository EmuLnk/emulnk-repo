<script lang="ts">
  import type { SafariOverviewModel } from "../safari.js";

  export let overview: SafariOverviewModel;
  export let onSelect: (mapId: number) => void = () => {};

  function shortName(name: string): string {
    return name.replace("Safari Zone ", "").toUpperCase();
  }

  function zoneClass(name: string): string {
    const label = shortName(name).toLowerCase();
    if (label.includes("north")) return "north";
    if (label.includes("east")) return "east";
    if (label.includes("west")) return "west";
    return "center";
  }
</script>

<section class="gb-window safari-area-map">
  <div class="window-title">AREA MAP</div>
  <div class="safari-map-grid">
    {#each overview.areas as area (area.mapId)}
      <button
        type="button"
        class={`safari-zone ${zoneClass(area.mapName)}`}
        class:active={overview.mapId === area.mapId}
        class:complete={area.complete}
        on:click={() => onSelect(area.mapId)}
      >
        <strong>{shortName(area.mapName)}</strong>
        <span>{area.caughtCount}/{area.totalCount}</span>
      </button>
    {/each}
  </div>
</section>
