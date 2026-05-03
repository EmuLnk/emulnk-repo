<script lang="ts">
  import type { BattleStateIconKind, BattleStateIconModel } from "../battle-state-icons.js";

  export let icon: BattleStateIconModel;

  const PATHS: Record<BattleStateIconKind, string> = {
    attack: "M7 1h2v2h2v2h2v2h-3v7H6V7H3V5h2V3h2z",
    defense: "M4 2h8v2h2v4h-2v3h-2v2H6v-2H4V8H2V4h2z",
    speed: "M9 1H5L3 8h4l-1 7 7-9H9z",
    special: "M7 1h2v4h4v2H9v2h2v2H9v4H7v-4H5V9h2V7H3V5h4z",
    accuracy: "M7 1h2v2h3v2h2v6h-2v2H9v2H7v-2H4v-2H2V5h2V3h3zM6 6v4h4V6z",
    evasion: "M2 4h7V2l5 5-5 5v-2H4v2H2zm5 8h7v2H7z",
    reflect: "M3 2h8v2H5v9H3zm5 3h5v2h-3v7H8z",
    "light-screen": "M2 2h12v12H2zm2 2v8h2V4zm4 0v8h2V4zm4 0v8h1V4z",
    mist: "M2 4h7v2H2zm5 3h7v2H7zm-5 3h7v2H2z",
    substitute: "M5 2h6v2h2v7h-2v3H5v-3H3V4h2zm2 4h2v2H7z",
    confusion: "M5 3h6v2H7v2h5v2H5V7H3V5h2zm3 8h2v2H8z",
    trapping: "M2 3h3v10H2zm9 0h3v10h-3zM6 5h4v2H6zm0 4h4v2H6z",
    recharge: "M3 4h9v2h2v4h-2v2H3zm2 2v4h2V6z",
    "leech-seed": "M7 10H4V8h2V6h2V4h4v4h-2v2H9v4H7zM3 11h3v2H3z",
    disable: "M3 2h3v2h2V2h3v3h2v3h-2v2h2v3h-3v-2H8v2H5v-3H3V7h2V5H3z",
  };
</script>

<span class={`battle-state-icon state-${icon.tone}`} title={icon.label} aria-label={icon.label}>
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d={PATHS[icon.kind]} fill-rule="evenodd" clip-rule="evenodd" />
  </svg>
  {#if icon.value}
    <span class="state-value" aria-hidden="true">{icon.value}</span>
  {/if}
</span>
