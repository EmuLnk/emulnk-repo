<script lang="ts">
  import type { SafariDecision, SafariDecisionCard } from "../safari.js";
  import { onCatchAction, onToggle } from "../sfx.js";

  export let decision: SafariDecision;
  export let showCatchRate = true;

  function clickCard(card: SafariDecisionCard): void {
    if (card.disabled) return;
    if (card.action === "ball") onCatchAction();
    else onToggle();
  }
</script>

<section class="gb-window safari-decision-panel">
  <div class="safari-decision-head">
    <span class="window-title">SAFARI CALL</span>
    <strong class={`decision-${decision.tone}`}>{decision.label}</strong>
    <small>{decision.reason}</small>
  </div>

  <div class="safari-action-grid">
    {#each decision.cards as card (card.action)}
      <button
        type="button"
        class={`safari-action-card ${card.action} ${card.tone}`}
        disabled={card.disabled}
        on:click={() => clickCard(card)}
      >
        <svg class="safari-action-icon" viewBox="0 0 24 24" aria-hidden="true">
          {#if card.action === "ball"}
            <rect x="8" y="2" width="8" height="2" />
            <rect x="5" y="4" width="14" height="3" />
            <rect x="3" y="7" width="18" height="4" class="icon-fill" />
            <rect x="2" y="11" width="20" height="2" />
            <rect x="3" y="13" width="18" height="4" class="icon-light" />
            <rect x="5" y="17" width="14" height="3" class="icon-light" />
            <rect x="8" y="20" width="8" height="2" />
            <rect x="9" y="9" width="6" height="6" class="icon-light" />
          {:else if card.action === "bait"}
            <rect x="10" y="3" width="4" height="3" />
            <rect x="7" y="6" width="10" height="3" class="icon-fill" />
            <rect x="5" y="9" width="14" height="5" class="icon-fill" />
            <rect x="7" y="14" width="10" height="3" class="icon-light" />
            <rect x="9" y="17" width="6" height="2" class="icon-light" />
            <rect x="4" y="18" width="3" height="2" />
            <rect x="17" y="18" width="3" height="2" />
          {:else}
            <rect x="9" y="4" width="7" height="3" />
            <rect x="6" y="7" width="12" height="4" class="icon-fill" />
            <rect x="4" y="11" width="15" height="5" class="icon-fill" />
            <rect x="7" y="16" width="10" height="3" />
            <rect x="12" y="9" width="4" height="3" class="icon-light" />
          {/if}
        </svg>
        <span>{card.label}</span>
        <strong>{showCatchRate ? card.value : "--"}</strong>
        <small>{card.note}</small>
      </button>
    {/each}
  </div>
</section>
