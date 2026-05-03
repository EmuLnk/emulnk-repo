<script lang="ts">
  import { pokemonSpritePath } from "../format.js";

  export let speciesName = "";
  export let label = speciesName;
  export let animate = false;
  export let statusLabel = "OK";

  let failed = false;
  let lastSrc: string | null = null;

  $: src = pokemonSpritePath(speciesName);
  $: if (src !== lastSrc) {
    failed = false;
    lastSrc = src;
  }
</script>

<div
  class="pokemon-sprite front"
  class:animated={animate}
  class:status-poison={statusLabel === "PSN"}
  class:status-paralysis={statusLabel === "PAR"}
  class:status-sleep={statusLabel === "SLP"}
  class:status-freeze={statusLabel === "FRZ"}
  class:status-burn={statusLabel === "BRN"}
>
  {#if src && !failed}
    <img src={src} alt={label} on:error={() => (failed = true)} />
  {:else}
    <div class="sprite-missing" aria-label={label}>?</div>
  {/if}
</div>
