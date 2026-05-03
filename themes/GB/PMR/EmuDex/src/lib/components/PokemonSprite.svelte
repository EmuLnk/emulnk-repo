<script lang="ts">
  import {
    POKEMON_SPRITE_ATLAS_HEIGHT,
    POKEMON_SPRITE_ATLAS_WIDTH,
    pokemonSpriteFrame,
    pokemonSpritePath,
  } from "../format.js";

  export let speciesName = "";
  export let label = speciesName;
  export let animate = false;
  export let statusLabel = "OK";

  $: src = pokemonSpritePath(speciesName);
  $: frame = pokemonSpriteFrame(speciesName);
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
  {#if src && frame}
    <svg
      class="sprite-atlas"
      aria-label={label}
      role="img"
      width={frame.w}
      height={frame.h}
      viewBox={`0 0 ${frame.w} ${frame.h}`}
    >
      <image
        href={src}
        x={-frame.x}
        y={-frame.y}
        width={POKEMON_SPRITE_ATLAS_WIDTH}
        height={POKEMON_SPRITE_ATLAS_HEIGHT}
      />
    </svg>
  {:else}
    <div class="sprite-missing" aria-label={label}>?</div>
  {/if}
</div>
