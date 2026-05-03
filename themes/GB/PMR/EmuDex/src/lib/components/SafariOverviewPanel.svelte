<script lang="ts">
  import type { SafariOverviewModel } from "../safari.js";
  import PokemonSprite from "./PokemonSprite.svelte";

  export let overview: SafariOverviewModel;

  function moodLabel(mood: SafariOverviewModel["mood"]): string {
    if (mood === "baited") return "EATING";
    if (mood === "angry") return "ANGRY";
    return "CALM";
  }

  function levelLabel(min: number, max: number): string {
    return min === max ? `L${min}` : `L${min}-${max}`;
  }
</script>

<section class="gb-window safari-overview-panel">
  <div class="safari-overview-head">
    <div>
      <span class="window-title">SAFARI ZONE</span>
      <h2>{overview.mapName}</h2>
    </div>
    <span class={`safari-mood ${overview.mood}`}>{moodLabel(overview.mood)}</span>
  </div>

  <div class="safari-meters">
    <span class:warn={overview.lowBalls}>BALLS <b>{overview.balls}</b></span>
    <span class:warn={overview.lowSteps}>STEPS <b>{overview.steps}</b></span>
    <span>OWN <b>{overview.caughtCount}/{overview.totalCount}</b></span>
    <span>SEEN <b>{overview.seenCount}</b></span>
  </div>

  {#if overview.inSafariBattle && overview.targetName}
    <div class="safari-active-target">
      <strong>ACTIVE TARGET</strong>
      <span>{overview.targetName}</span>
    </div>
  {/if}

  <div class="safari-rare-strip">
    <span class="window-title">RARE</span>
    {#if overview.rareTargets.length === 0}
      <p class="gb-note">NO RARE TARGETS HERE</p>
    {:else}
      <div class="safari-rare-grid">
        {#each overview.rareTargets.slice(0, 4) as target (target.dexId)}
          <article class={`safari-rare-card ${target.status}`}>
            <PokemonSprite speciesName={target.speciesName} label={target.speciesName} />
            <strong>{target.status === "unseen" ? "???" : target.speciesName}</strong>
            <span>{levelLabel(target.minLevel, target.maxLevel)} / {target.bestRate}%</span>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>
