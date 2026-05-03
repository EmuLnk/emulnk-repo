<script lang="ts">
  import type { Gen1BagState, Gen1BattleState, Gen1ProgressState, Gen1SafariState } from "@emulnk/sdk/transforms/gen1";
  import { buildCatchContext, buildCatchOptions } from "../catch.js";
  import type { Gen1GameVersion } from "../encounter-data.generated.js";
  import { percent } from "../format.js";
  import { buildSafariDecision, buildSafariOverview, type SafariAreaSpot } from "../safari.js";
  import { onCardSelect, onCatchAction } from "../sfx.js";
  import HpBar from "./HpBar.svelte";
  import PokemonSprite from "./PokemonSprite.svelte";
  import SafariAreaMap from "./SafariAreaMap.svelte";
  import SafariDecisionPanel from "./SafariDecisionPanel.svelte";
  import SafariOverviewPanel from "./SafariOverviewPanel.svelte";
  import StatusBadge from "./StatusBadge.svelte";

  export let battle: Gen1BattleState;
  export let bag: Gen1BagState;
  export let safari: Gen1SafariState;
  export let progress: Gen1ProgressState;
  export let gameVersion: Gen1GameVersion = "red";
  export let showCatchRate = true;

  let selectedSafariMap = progress.currentMap;
  let lastProgressMap = progress.currentMap;

  $: catchOptions = buildCatchOptions({ battle, bag, safari });
  $: catchContext = buildCatchContext({ battle, options: catchOptions });
  $: isSafariView = battle.isSafari || safari.active;
  $: if (progress.currentMap !== lastProgressMap) {
    lastProgressMap = progress.currentMap;
    if (progress.mapName.startsWith("Safari Zone")) selectedSafariMap = progress.currentMap;
  }
  $: safariOverview = buildSafariOverview({
    progress,
    safari,
    battle,
    version: gameVersion,
    selectedMap: selectedSafariMap,
  });
  $: safariDecision = buildSafariDecision({ safari, battle, catchOptions });

  function selectSafariMap(mapId: number): void {
    onCardSelect();
    selectedSafariMap = mapId;
  }

  function levelLabel(spot: SafariAreaSpot): string {
    return spot.minLevel === spot.maxLevel ? `L${spot.minLevel}` : `L${spot.minLevel}-${spot.maxLevel}`;
  }
</script>

{#if isSafariView}
  <section class="view catch-view safari-view">
    <SafariOverviewPanel overview={safariOverview} />
    <SafariAreaMap overview={safariOverview} onSelect={selectSafariMap} />

    <div class="gb-window catch-target safari-target-panel">
      <div class="window-title">SAFARI TARGET</div>
      {#if battle.enemy && battle.catch}
        <PokemonSprite speciesName={battle.enemy.speciesName} label={battle.enemy.speciesName} />
        <h2>{battle.enemy.speciesName}</h2>
        <div class="target-row">
          <span>L{battle.enemy.level}</span>
          <StatusBadge label={battle.enemy.status.label} />
        </div>
        <HpBar hp={battle.enemy.hp} maxhp={battle.enemy.maxhp} />
        <div class="catch-context-strip">
          <span class="catch-chip best">{catchContext.bestLabel}</span>
          <span>{catchContext.inventoryLabel}</span>
          <span class={`catch-${catchContext.hpTone}`}>{catchContext.hpLabel}</span>
          <span class={`catch-${catchContext.statusTone}`}>{catchContext.statusLabel}</span>
        </div>
      {:else}
        <p class="empty-message">NO SAFARI TARGET</p>
      {/if}
    </div>

    <SafariDecisionPanel decision={safariDecision} {showCatchRate} />

    <div class="gb-window safari-target-list">
      <div class="window-title">AREA TARGETS</div>
      {#if safariOverview.spots.length === 0}
        <p class="empty-message">NO SAFARI DATA</p>
      {:else}
        <div class="safari-spot-grid">
          {#each safariOverview.spots.slice(0, 10) as spot (spot.dexId)}
            <article class={`safari-spot-card ${spot.status}`} class:rare={spot.rare}>
              <PokemonSprite speciesName={spot.speciesName} label={spot.speciesName} />
              <div>
                <strong>{spot.status === "unseen" ? "???" : spot.speciesName}</strong>
                <span>{levelLabel(spot)} / {spot.bestRate}%</span>
              </div>
              <small>{spot.status.toUpperCase()}</small>
            </article>
          {/each}
        </div>
      {/if}
    </div>
  </section>
{:else}
  <section class="view catch-view">
    <div class="gb-window catch-target">
      <div class="window-title">CATCH TARGET</div>
      {#if battle.enemy && battle.catch}
        <PokemonSprite speciesName={battle.enemy.speciesName} label={battle.enemy.speciesName} />
        <h2>{battle.enemy.speciesName}</h2>
        <div class="target-row">
          <span>L{battle.enemy.level}</span>
          <StatusBadge label={battle.enemy.status.label} />
        </div>
        <HpBar hp={battle.enemy.hp} maxhp={battle.enemy.maxhp} />
        <div class="catch-context-strip">
          <span class="catch-chip best">{catchContext.bestLabel}</span>
          <span>{catchContext.inventoryLabel}</span>
          <span class={`catch-${catchContext.hpTone}`}>{catchContext.hpLabel}</span>
          <span class={`catch-${catchContext.statusTone}`}>{catchContext.statusLabel}</span>
        </div>
      {:else}
        <p class="empty-message">{battle.isTrainer ? "TRAINER BLOCKS BALLS" : "NO WILD TARGET"}</p>
      {/if}
    </div>

    <div class="gb-window">
      <div class="window-title">BALL ODDS</div>
      {#if battle.catch && showCatchRate}
        <div class="catch-grid">
          {#if catchOptions.length > 0}
            {#each catchOptions as option}
              <button type="button" class:best-ball={option.best} on:click={onCatchAction}>
                <i class={`ball-icon ball-${option.key}`} aria-hidden="true"></i>
                <span>{option.label} x{option.quantity}</span>
                <strong>{percent(option.odds.chance)}</strong>
                <small>{option.odds.guaranteed ? "GUARANTEED" : `${option.odds.shakes} SHAKE${option.odds.shakes === 1 ? "" : "S"}`}</small>
              </button>
            {/each}
          {:else}
            <p class="gb-note">NO BALLS IN BAG</p>
          {/if}
        </div>
      {:else}
        <p class="gb-note">CATCH ODDS HIDDEN BY SETTINGS.</p>
      {/if}
    </div>

    <div class="gb-window">
      <div class="window-title">BAG</div>
      <div class="mini-grid four">
        <span>BEST <b>{catchContext.bestLabel.replace("BEST ", "")}</b></span>
        <span>BALLS <b>{catchContext.inventoryLabel.replace("BAG x", "")}</b></span>
        <span>HP <b>{catchContext.hpLabel.replace("HP ", "")}</b></span>
        <span>STATUS <b>{catchContext.statusLabel.replace(" BOOST", "")}</b></span>
      </div>
    </div>
  </section>
{/if}
