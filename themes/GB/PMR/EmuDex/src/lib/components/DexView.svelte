<script lang="ts">
  import type { Gen1ProgressState } from "@emulnk/sdk/transforms/gen1";
  import {
    buildAreaDexForMap,
    buildGlobalDexProgress,
    buildSpeciesAreaSummary,
    listEncounterAreas,
    listSafariEncounterAreas,
    type AreaDexEncounter,
  } from "../dex.js";
  import type { Gen1GameVersion } from "../encounter-data.generated.js";
  import type { DexDisplayOptions } from "../settings.js";
  import { onCardSelect } from "../sfx.js";
  import DexAreaBrowser from "./DexAreaBrowser.svelte";
  import DexProgressPanel from "./DexProgressPanel.svelte";
  import PokemonSprite from "./PokemonSprite.svelte";
  import SpeciesAreaPanel from "./SpeciesAreaPanel.svelte";

  export let progress: Gen1ProgressState;
  export let gameVersion: Gen1GameVersion = "red";
  export let options: DexDisplayOptions = { showAllAreas: false };

  let selectedMap = progress.currentMap;
  let selectedDexId: number | null = null;
  let lastCurrentMap = progress.currentMap;

  $: areas = listEncounterAreas(gameVersion, progress);
  $: safariAreas = listSafariEncounterAreas(gameVersion, progress);
  $: globalProgress = buildGlobalDexProgress(progress);
  $: if (progress.currentMap !== lastCurrentMap) {
    lastCurrentMap = progress.currentMap;
    if (!options.showAllAreas) selectedMap = progress.currentMap;
    selectedDexId = null;
  }
  $: activeMap = options.showAllAreas ? selectedMap : progress.currentMap;
  $: areaDex = buildAreaDexForMap(progress, gameVersion, activeMap);
  $: selectedSpecies = selectedDexId ? buildSpeciesAreaSummary(selectedDexId, progress, gameVersion) : null;

  function selectMap(mapId: number): void {
    onCardSelect();
    selectedMap = mapId;
    selectedDexId = null;
  }

  function selectSpecies(dexId: number): void {
    onCardSelect();
    selectedDexId = selectedDexId === dexId ? null : dexId;
  }

  function levelLabel(encounter: AreaDexEncounter): string {
    return encounter.minLevel === encounter.maxLevel ? `L${encounter.minLevel}` : `L${encounter.minLevel}-${encounter.maxLevel}`;
  }

  function rateLabel(rate: number): string {
    return `${Number.isInteger(rate) ? rate : rate.toFixed(1)}%`;
  }
</script>

<section class="view dex-view area-dex-view">
  <DexProgressPanel progress={globalProgress} />
  <DexAreaBrowser
    {areas}
    {safariAreas}
    selectedMap={activeMap}
    showAllAreas={options.showAllAreas}
    onSelect={selectMap}
  />

  <div class="gb-window area-dex-shell">
    <header class="area-dex-header">
      <div>
        <span class="window-title">AREA DEX</span>
        <h2>{areaDex.mapName}</h2>
      </div>
      {#if areaDex.totalCount > 0}
        <div class:complete={areaDex.complete} class="area-dex-total">
          <strong>{areaDex.caughtCount}/{areaDex.totalCount}</strong>
          <span>CAUGHT</span>
        </div>
      {/if}
    </header>

    {#if areaDex.sections.length === 0}
      <div class="area-dex-empty">
        <strong>NO WILD DATA</strong>
        <span>{areaDex.mapName}</span>
      </div>
    {:else}
      <div class="area-dex-sections">
        {#each areaDex.sections as section (section.method)}
          <section class="area-method-section">
            <div class="area-method-header">
              <span class={`area-method-icon method-${section.method}`} aria-hidden="true">
                {#if section.method === "walk"}
                  <svg class="walk-svg" viewBox="0 0 16 16">
                    <g class="grass-dark">
                      <rect x="12" y="0" width="2" height="2" />
                      <rect x="10" y="2" width="2" height="2" />
                      <rect x="14" y="2" width="2" height="2" />
                      <rect x="0" y="4" width="4" height="2" />
                      <rect x="8" y="4" width="2" height="2" />
                      <rect x="14" y="4" width="2" height="2" />
                      <rect x="0" y="6" width="2" height="2" />
                      <rect x="4" y="6" width="2" height="2" />
                      <rect x="8" y="6" width="2" height="2" />
                      <rect x="12" y="6" width="2" height="2" />
                      <rect x="0" y="8" width="2" height="2" />
                      <rect x="6" y="8" width="8" height="2" />
                      <rect x="2" y="10" width="2" height="2" />
                      <rect x="8" y="10" width="4" height="2" />
                      <rect x="4" y="12" width="2" height="2" />
                      <rect x="8" y="12" width="4" height="2" />
                      <rect x="6" y="14" width="4" height="2" />
                    </g>
                    <g class="grass-mid">
                      <rect x="14" y="0" width="2" height="2" />
                      <rect x="10" y="4" width="4" height="2" />
                      <rect x="10" y="6" width="2" height="2" />
                      <rect x="14" y="6" width="2" height="2" />
                      <rect x="4" y="8" width="2" height="2" />
                      <rect x="6" y="10" width="2" height="2" />
                      <rect x="12" y="10" width="2" height="2" />
                      <rect x="0" y="12" width="4" height="2" />
                      <rect x="6" y="12" width="2" height="2" />
                      <rect x="2" y="14" width="4" height="2" />
                      <rect x="10" y="14" width="2" height="2" />
                    </g>
                  </svg>
                {:else if section.method === "surf"}
                  <svg viewBox="0 0 16 16">
                    <rect x="1" y="5" width="3" height="2" />
                    <rect x="4" y="7" width="4" height="2" />
                    <rect x="8" y="5" width="4" height="2" />
                    <rect x="12" y="7" width="3" height="2" />
                    <rect x="1" y="11" width="3" height="2" />
                    <rect x="4" y="9" width="4" height="2" />
                    <rect x="8" y="11" width="4" height="2" />
                    <rect x="12" y="9" width="3" height="2" />
                  </svg>
                {:else}
                  <svg class="rod-svg" viewBox="0 0 16 16">
                    <path d="M3 2 L11 10" />
                    <path d="M11 10 V13" />
                    <path d="M11 13 H13 V11" />
                    {#if section.method !== "old-rod"}
                      <rect x="5" y="5" width="3" height="3" />
                    {/if}
                    {#if section.method === "super-rod"}
                      <rect x="12" y="2" width="2" height="2" />
                      <rect x="2" y="12" width="2" height="2" />
                    {/if}
                  </svg>
                {/if}
              </span>
              <strong>{section.label}</strong>
              <span>{section.caughtCount}/{section.totalCount}</span>
            </div>

            <div class="area-pokemon-grid">
              {#each section.encounters as encounter (`${section.method}-${encounter.dexId}`)}
                <button
                  type="button"
                  class:caught={encounter.status === "caught"}
                  class:seen={encounter.status === "seen"}
                  class:unseen={encounter.status === "unseen"}
                  class:selected={selectedDexId === encounter.dexId}
                  class="area-pokemon-card"
                  on:click={() => selectSpecies(encounter.dexId)}
                >
                  <div class="area-card-sprite">
                    <PokemonSprite speciesName={encounter.speciesName} label={encounter.speciesName} />
                  </div>
                  <div class="area-card-main">
                    <strong>{encounter.status === "unseen" ? "???" : encounter.speciesName}</strong>
                    <span>No.{encounter.dexId} {levelLabel(encounter)}</span>
                  </div>
                  <span class="area-rate">{rateLabel(encounter.rate)}</span>
                  {#if encounter.status === "caught"}
                    <svg class="dex-ball-icon" viewBox="0 0 16 16" aria-label="Caught">
                      <rect x="5" y="1" width="6" height="2" />
                      <rect x="3" y="3" width="10" height="2" />
                      <rect x="2" y="5" width="12" height="2" class="ball-top" />
                      <rect x="1" y="7" width="14" height="2" />
                      <rect x="2" y="9" width="12" height="2" class="ball-bottom" />
                      <rect x="3" y="11" width="10" height="2" class="ball-bottom" />
                      <rect x="5" y="13" width="6" height="2" />
                      <rect x="6" y="6" width="4" height="4" class="ball-button" />
                    </svg>
                  {:else if encounter.status === "seen"}
                    <span class="seen-dot" aria-label="Seen"></span>
                  {/if}
                </button>
              {/each}
            </div>
          </section>
        {/each}
      </div>
    {/if}
  </div>

  <SpeciesAreaPanel summary={selectedSpecies} />
</section>
