<script>
  let { label, value, iv, ev, natureMod, showIvs, showEvs } = $props();

  let barPercent = $derived(Math.min((value / 255) * 100, 100));

  let statColor = $derived(
    natureMod === 1 ? '#3860A8' : natureMod === -1 ? '#C03028' : '#383838'
  );

  let barColor = $derived(
    natureMod === 1 ? '#3860A8' : natureMod === -1 ? '#C03028' : '#48B048'
  );
</script>

<div class="stat-row">
  <span class="label">{label}</span>
  <span class="value" style:color={statColor}>
    {#if natureMod === 1}<span class="nature-arrow">+</span>{:else if natureMod === -1}<span class="nature-arrow">-</span>{/if}{value}
  </span>
  <div class="bar-track">
    <div class="bar-fill" style:width="{barPercent}%" style:background-color={barColor}></div>
  </div>
  {#if showIvs || showEvs}
    <span class="ivev">
      {#if showIvs}<span class="tag">IV:{iv}</span>{/if}
      {#if showEvs}<span class="tag">EV:{ev}</span>{/if}
    </span>
  {/if}
</div>

<style>
  .stat-row {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 18px;
  }

  .label {
    font-family: 'PokemonGB', monospace;
    font-size: 9px;
    width: 32px;
    flex-shrink: 0;
    text-transform: uppercase;
    color: var(--text);
  }

  .value {
    font-family: 'PokemonGB', monospace;
    font-size: 9px;
    font-weight: bold;
    width: 36px;
    text-align: right;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
  }

  .bar-track {
    flex: 1;
    height: 8px;
    background: var(--divider);
    border-radius: 3px;
    overflow: hidden;
    min-width: 40px;
  }

  .bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.2s ease, background-color 0.3s ease;
  }

  .ivev {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
  }

  .tag {
    font-family: 'PokemonGB', monospace;
    font-size: 7px;
    color: var(--text-muted);
  }

  .nature-arrow {
    font-size: 8px;
    font-weight: bold;
    margin-right: 1px;
  }
</style>
