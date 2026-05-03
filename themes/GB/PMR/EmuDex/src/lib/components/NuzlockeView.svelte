<script lang="ts">
  import type { Gen1ProgressState } from "@emulnk/sdk/transforms/gen1";
  import { buildNuzlockeGuidance, type NuzlockeStatus } from "../nuzlocke.js";
  import type { Gen1EncounterMethod, Gen1GameVersion } from "../encounter-data.generated.js";
  import { onToggle } from "../sfx.js";
  import PokemonSprite from "./PokemonSprite.svelte";

  export let progress: Gen1ProgressState;
  export let gameVersion: Gen1GameVersion = "red";
  export let currentStatus: NuzlockeStatus = "open";
  export let entries: Array<[string, { status: NuzlockeStatus; name: string }]> = [];
  export let onSet: (status: NuzlockeStatus) => void = () => {};

  $: guidance = buildNuzlockeGuidance({
    progress,
    version: gameVersion,
    entries,
  });

  function setStatus(status: NuzlockeStatus): void {
    onToggle();
    onSet(status);
  }

  function levelLabel(min: number, max: number): string {
    return min === max ? `L${min}` : `L${min}-${max}`;
  }

  function rateLabel(rate: number): string {
    return `${Number.isInteger(rate) ? rate : rate.toFixed(1)}%`;
  }

  function methodLabel(methods: Gen1EncounterMethod[]): string {
    return methods.map((method) => method.replace("-rod", " ROD").toUpperCase()).join(" / ");
  }
</script>

<section class="view nuzlocke-view">
  <div class="gb-window nuzlocke-current">
    <div class="window-title">CURRENT AREA</div>
    <div class="nuzlocke-area-title">
      <h2>{guidance.mapName}</h2>
      <span class={`nuzlocke-status-chip ${guidance.status}`}>{guidance.status.toUpperCase()}</span>
    </div>
    <div class="segmented">
      <button type="button" class:active={currentStatus === "open"} on:click={() => setStatus("open")}>OPEN</button>
      <button type="button" class:active={currentStatus === "caught"} on:click={() => setStatus("caught")}>CAUGHT</button>
      <button type="button" class:active={currentStatus === "failed"} on:click={() => setStatus("failed")}>FAILED</button>
    </div>
  </div>

  <div class="gb-window nuzlocke-guidance">
    <div class="window-title">ROUTE TARGETS</div>
    {#if !guidance.hasEncounters}
      <p class="empty-message">NO WILD DATA</p>
    {:else}
      <div class="nuzlocke-target-grid">
        {#each guidance.targets as target (target.dexId)}
          <article class={`nuzlocke-target-card ${target.dexStatus}`}>
            <div class="nuzlocke-target-sprite">
              <PokemonSprite speciesName={target.speciesName} label={target.speciesName} />
            </div>
            <div class="nuzlocke-target-main">
              <strong>{target.dexStatus === "unseen" ? "???" : target.speciesName}</strong>
              <span>No.{target.dexId} {levelLabel(target.minLevel, target.maxLevel)}</span>
              <small>{methodLabel(target.methods)}</small>
            </div>
            <div class="nuzlocke-target-meta">
              <b>{rateLabel(target.bestRate)}</b>
              <span>{target.dexStatus.toUpperCase()}</span>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>

  <div class="gb-window">
    <div class="window-title">ROUTE LEDGER</div>
    <div class="route-ledger">
      {#each entries as [map, entry]}
        <div>
          <strong>{entry.name || `MAP ${map}`}</strong>
          <span>{entry.status.toUpperCase()}</span>
        </div>
      {/each}
      {#if entries.length === 0}
        <p class="empty-message">NO MARKED ROUTES</p>
      {/if}
    </div>
  </div>
</section>
