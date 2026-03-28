<script lang="ts">
  import { appState } from "../state.svelte";
  import { FAMILIARS } from "../data/familiars";
  import { onCardSelect, onBack } from "../sfx";
  import FamiliarCard from "./FamiliarCard.svelte";
  import FamiliarCompanion from "./FamiliarCompanion.svelte";

  let selectedFamiliar: string | null = $state(null);

  let familiarData = $derived.by(() =>
    FAMILIARS.map((f) => ({
      key: f.key,
      name: f.name,
      level: appState.familiars[f.key].level,
      exp: appState.familiars[f.key].exp,
      active: appState.relics[f.relicIndex] === 3,
    }))
  );

  function openCompanion(key: string): void {
    selectedFamiliar = key;
    onCardSelect();
  }

  function closeCompanion(): void {
    selectedFamiliar = null;
    onBack();
  }
</script>

<div class="slide-panels" class:companion-open={selectedFamiliar !== null}>
  <div class="slide-panel">
    <div class="familiar-view">
      <h3 class="heading gothic-heading">FAMILIARS</h3>

      <div class="familiar-list">
        {#each familiarData as f (f.key)}
          <FamiliarCard
            name={f.name}
            level={f.level}
            exp={f.exp}
            active={f.active}
            onclick={() => openCompanion(f.key)}
          />
        {/each}
      </div>
    </div>
  </div>

  <div class="slide-panel">
    {#if selectedFamiliar}
      <FamiliarCompanion
        familiarKey={selectedFamiliar}
        onback={closeCompanion}
      />
    {/if}
  </div>
</div>

<style>
  .slide-panels {
    display: flex;
    width: 200%;
    height: 100%;
    transition: transform 0.25s ease;
    transform: translateX(0);
  }

  .slide-panels.companion-open {
    transform: translateX(-50%);
  }

  .slide-panel {
    width: 50%;
    flex-shrink: 0;
    height: 100%;
    overflow-y: auto;
  }

  .familiar-view {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
  }

  .heading {
    margin: 0;
    color: var(--text-accent, var(--accent-crimson));
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
  }

  .familiar-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
