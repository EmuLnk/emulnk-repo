<script lang="ts">
  import type { Gen1MoveSlot } from "@emulnk/sdk/transforms/gen1";
  import { accuracyChipValue, type Gen1AccuracySummary } from "../accuracy.js";
  import { damageChipValue, type Gen1DamageSummary } from "../damage.js";
  import { ppLabel, type BattleMoveSignals, type MoveSlotConfidence } from "../format.js";
  import TypeBadge from "./TypeBadge.svelte";

  export let move: Gen1MoveSlot | null;
  export let note = "";
  export let signals: BattleMoveSignals | null = null;
  export let damage: Gen1DamageSummary | null = null;
  export let accuracy: Gen1AccuracySummary | null = null;
  export let confidence: MoveSlotConfidence | null = null;
  export let showPp = true;
  export let showEffectLabel = true;

  $: trailing = move && !signals ? (note || (showPp ? ppLabel(move) : "")) : "";
</script>

<div class:empty={!move} class:unknown={confidence?.kind === "unknown"} class:stab={!!signals?.stab} class:status-move={!!signals?.status} class="move-row">
  {#if move}
    <strong>{move.name}</strong>
    <span class="move-signals">
      {#if showEffectLabel && signals?.effectLabel}
        <span class={`effect-chip effect-${signals.effectTone}`}>{signals.effectLabel}</span>
      {/if}
      {#if damage && !damage.isStatus}
        <span class={`damage-chip damage-${damage.tone}`} title="Damage range">
          <svg class="chip-icon damage-icon" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="7" y="1" width="2" height="4" />
            <rect x="7" y="11" width="2" height="4" />
            <rect x="1" y="7" width="4" height="2" />
            <rect x="11" y="7" width="4" height="2" />
            <rect x="4" y="4" width="2" height="2" />
            <rect x="10" y="4" width="2" height="2" />
            <rect x="4" y="10" width="2" height="2" />
            <rect x="10" y="10" width="2" height="2" />
            <rect x="6" y="6" width="4" height="4" />
          </svg>
          {damageChipValue(damage)}
        </span>
        {#if damage.koLabel}
          <b class={`ko-chip damage-${damage.tone}`}>{damage.koLabel}</b>
        {/if}
      {/if}
      {#if accuracy?.show}
        <span class={`accuracy-chip accuracy-${accuracy.tone}`} title="Hit chance">
          <svg class="chip-icon hit-icon" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="6" y="1" width="4" height="2" />
            <rect x="3" y="3" width="2" height="2" />
            <rect x="11" y="3" width="2" height="2" />
            <rect x="1" y="6" width="2" height="4" />
            <rect x="13" y="6" width="2" height="4" />
            <rect x="6" y="13" width="4" height="2" />
            <rect x="3" y="11" width="2" height="2" />
            <rect x="11" y="11" width="2" height="2" />
            <rect x="7" y="7" width="2" height="2" />
          </svg>
          {accuracyChipValue(accuracy)}
        </span>
      {:else if signals?.status}
        <span class="status-dot" title="Status move"></span>
      {:else if trailing}
        <span class="move-note">{trailing}</span>
      {/if}
    </span>
    <TypeBadge name={move.typeName} />
  {:else}
    <strong>{confidence?.kind === "unknown" ? "???" : "---"}</strong>
    <span></span>
    <span class="type-badge type-empty">{confidence?.label ?? "EMPTY"}</span>
  {/if}
</div>
