<script lang="ts">
  import type { Gen1Pokemon } from "@emulnk/sdk/transforms/gen1";
  import { evolutionSummaryForSpecies } from "../evolution.js";
  import { resolvePartyDetailSwipeSlot } from "../party-navigation.js";
  import type { PartyDisplayOptions } from "../settings.js";
  import { onBack, onCardSelect } from "../sfx.js";
  import HpBar from "./HpBar.svelte";
  import MoveRow from "./MoveRow.svelte";
  import PokemonSprite from "./PokemonSprite.svelte";
  import StatusBadge from "./StatusBadge.svelte";
  import TypeBadge from "./TypeBadge.svelte";

  const DEFAULT_OPTIONS: PartyDisplayOptions = {
    showDvs: true,
    showStatExp: true,
    showEvolution: true,
    showSpriteAnimations: true,
  };

  export let party: Array<Gen1Pokemon | null> = [];
  export let options: PartyDisplayOptions = DEFAULT_OPTIONS;

  let selectedSlot: number | null = null;
  let detailSwipeStart: { x: number; y: number } | null = null;

  $: selectedMon = selectedSlot == null ? null : party[selectedSlot] ?? null;
  $: hasNickname = !!selectedMon && selectedMon.nickname.toLowerCase() !== selectedMon.speciesName.toLowerCase();
  $: evolution = selectedMon ? evolutionSummaryForSpecies(selectedMon.speciesName, selectedMon.level) : null;
  $: if (selectedSlot != null && !party[selectedSlot]) selectedSlot = null;

  function selectSlot(index: number): void {
    if (!party[index]) return;
    onCardSelect();
    selectedSlot = index;
  }

  function closeDetail(): void {
    onBack();
    selectedSlot = null;
  }

  function beginDetailSwipe(event: TouchEvent): void {
    if (!selectedMon || event.touches.length !== 1) return;
    const touch = event.touches.item(0);
    if (!touch) return;
    detailSwipeStart = { x: touch.clientX, y: touch.clientY };
    event.stopPropagation();
  }

  function finishDetailSwipe(event: TouchEvent): void {
    event.stopPropagation();
    if (!detailSwipeStart || event.changedTouches.length !== 1) {
      detailSwipeStart = null;
      return;
    }

    const touch = event.changedTouches.item(0);
    if (!touch) {
      detailSwipeStart = null;
      return;
    }

    const nextSlot = resolvePartyDetailSwipeSlot(
      selectedSlot,
      party,
      touch.clientX - detailSwipeStart.x,
      touch.clientY - detailSwipeStart.y,
    );
    detailSwipeStart = null;

    if (nextSlot == null) return;
    event.preventDefault();
    onCardSelect();
    selectedSlot = nextSlot;
  }

  function cancelDetailSwipe(event: TouchEvent): void {
    event.stopPropagation();
    detailSwipeStart = null;
  }
</script>

<section class="view party-view">
  <div class="party-panels" class:detail-open={!!selectedMon}>
    <div class="party-panel party-list-panel">
      <div class="gb-window party-grid">
        {#each { length: 6 } as _, i}
          {@const mon = party[i] ?? null}
          <button type="button" class:empty={!mon} class="party-slot" onclick={() => selectSlot(i)}>
            {#if mon}
              <div class="party-slot-top">
                <span class="slot-no">No.{i + 1}</span>
                {#if mon.status.label !== "OK"}
                  <StatusBadge label={mon.status.label} />
                {/if}
              </div>
              <div class="party-slot-main">
                <PokemonSprite
                  speciesName={mon.speciesName}
                  label={mon.nickname}
                  animate={options.showSpriteAnimations}
                  statusLabel={mon.status.label}
                />
                <div class="party-slot-info">
                  <strong>{mon.nickname}</strong>
                  <small>{mon.speciesName} L{mon.level}</small>
                  <div class="type-line">
                    <TypeBadge name={mon.typeNames[0]} />
                    {#if mon.typeNames[1] !== mon.typeNames[0]}
                      <TypeBadge name={mon.typeNames[1]} />
                    {/if}
                  </div>
                  <HpBar hp={mon.hp} maxhp={mon.maxhp} compact />
                </div>
              </div>
              <div class="party-slot-stats">
                <span>ATK <b>{mon.stats.atk}</b></span>
                <span>DEF <b>{mon.stats.def}</b></span>
                <span>SPD <b>{mon.stats.speed}</b></span>
              </div>
            {:else}
              <span class="slot-no">No.{i + 1}</span>
              <strong>---</strong>
              <small>EMPTY</small>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    <div class="party-panel party-detail-panel">
      {#if selectedMon}
        <div
          class="gb-window party-detail"
          ontouchstart={beginDetailSwipe}
          ontouchend={finishDetailSwipe}
          ontouchcancel={cancelDetailSwipe}
        >
          <div class="party-detail-header">
            <button type="button" class="back-icon" aria-label="Back" onclick={closeDetail}>
              <span aria-hidden="true">←</span>
            </button>
            <span class="window-title">POKEMON DATA</span>
          </div>

          <div class="party-detail-content">
            <section class="party-detail-summary">
              <div class="party-detail-sprite">
                <PokemonSprite
                  speciesName={selectedMon.speciesName}
                  label={selectedMon.nickname}
                  animate={options.showSpriteAnimations}
                  statusLabel={selectedMon.status.label}
                />
              </div>
              <div class="party-detail-vitals">
                <div class="party-detail-nameplate">
                  <div class="party-detail-name">
                    <h2>{selectedMon.nickname}</h2>
                    {#if hasNickname}
                      <small>{selectedMon.speciesName}</small>
                    {/if}
                  </div>
                  <div class="party-detail-name-meta">
                    <span class="party-detail-level">L{selectedMon.level}</span>
                    {#if selectedMon.status.label !== "OK"}
                      <StatusBadge label={selectedMon.status.label} />
                    {/if}
                  </div>
                </div>
                <div class="type-line">
                  <TypeBadge name={selectedMon.typeNames[0]} />
                  {#if selectedMon.typeNames[1] !== selectedMon.typeNames[0]}
                    <TypeBadge name={selectedMon.typeNames[1]} />
                  {/if}
                </div>
                <HpBar hp={selectedMon.hp} maxhp={selectedMon.maxhp} />
              </div>
            </section>

            <div class="party-detail-sections">
              <section class="party-detail-section stats-section">
                <h3>STATS</h3>
                <div class="mini-grid detail-metrics">
                  <span>HP <b>{selectedMon.maxhp}</b></span>
                  <span>ATK <b>{selectedMon.stats.atk}</b></span>
                  <span>DEF <b>{selectedMon.stats.def}</b></span>
                  <span>SPD <b>{selectedMon.stats.speed}</b></span>
                  <span>SPECIAL <b>{selectedMon.stats.special}</b></span>
                </div>
              </section>

              {#if options.showEvolution && evolution}
                <section class="party-detail-section evolution-section">
                  <h3>EVOLUTION</h3>
                  <div class="evolution-chip" class:ready={evolution.ready}>
                    <strong>{evolution.label}</strong>
                  </div>
                </section>
              {/if}

              <section class="party-detail-section moves-section">
                <h3>MOVES</h3>
                <div class="move-list">
                  {#each { length: 4 } as _, i}
                    {@const move = selectedMon.moves[i] ?? null}
                    <MoveRow {move} />
                  {/each}
                </div>
              </section>

              {#if options.showDvs || (options.showStatExp && selectedMon.statExp)}
                <section class="party-detail-section hidden-stats-section">
                  {#if options.showDvs}
                    <h3>DVs</h3>
                    <div class="mini-grid detail-metrics compact">
                      <span>HP <b>{selectedMon.dvs.hp}</b></span>
                      <span>ATK <b>{selectedMon.dvs.atk}</b></span>
                      <span>DEF <b>{selectedMon.dvs.def}</b></span>
                      <span>SPD <b>{selectedMon.dvs.speed}</b></span>
                      <span>SPECIAL <b>{selectedMon.dvs.special}</b></span>
                    </div>
                  {/if}

                  {#if options.showStatExp && selectedMon.statExp}
                    <div class="stat-exp-section" class:solo={!options.showDvs}>
                      <h3>STAT EXP</h3>
                      <div class="mini-grid detail-metrics compact">
                        <span>HP <b>{selectedMon.statExp.hp}</b></span>
                        <span>ATK <b>{selectedMon.statExp.atk}</b></span>
                        <span>DEF <b>{selectedMon.statExp.def}</b></span>
                        <span>SPD <b>{selectedMon.statExp.speed}</b></span>
                        <span>SPECIAL <b>{selectedMon.statExp.special}</b></span>
                      </div>
                    </div>
                  {/if}
                </section>
              {/if}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>
