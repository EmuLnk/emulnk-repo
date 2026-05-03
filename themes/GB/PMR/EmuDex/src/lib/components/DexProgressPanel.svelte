<script lang="ts">
  import type { GlobalDexProgress } from "../dex.js";

  export let progress: GlobalDexProgress;

  const BADGES = ["BOULDER", "CASCADE", "THUNDER", "RAINBOW", "SOUL", "MARSH", "VOLCANO", "EARTH"];
</script>

<section class="gb-window dex-progress-panel">
  <div class="window-title">GLOBAL DEX</div>
  <div class="dex-progress-meters">
    <div>
      <strong>{progress.ownedCount}</strong>
      <span>OWN</span>
    </div>
    <div>
      <strong>{progress.seenCount}</strong>
      <span>SEEN</span>
    </div>
    <div>
      <strong>{progress.remainingCount}</strong>
      <span>LEFT</span>
    </div>
  </div>

  <div class="badge-row" aria-label={`${progress.badgeCount} badges`}>
    {#each BADGES as badge, i}
      <span class:earned={progress.badges[i]} title={badge}>{i + 1}</span>
    {/each}
  </div>

  <div class="dex-quirks">
    <span>DVs + STAT EXP</span>
    <span>SPECIAL IS ONE STAT</span>
    <span>GEN 1 TYPE CHART</span>
  </div>
</section>
