<script lang="ts">
  import { appState } from "./lib/state.svelte";
  import { onTabSwitch, onCardSelect, onBack, setSfxEnabled, setHapticEnabled } from "./lib/sfx";
  import { pageWipe } from "./lib/transitions";
  import StatsView from "./lib/components/StatsView.svelte";
  import EquipView from "./lib/components/EquipView.svelte";
  import InventoryGrid from "./lib/components/InventoryGrid.svelte";
  import RelicView from "./lib/components/RelicView.svelte";
  import FamiliarView from "./lib/components/FamiliarView.svelte";
  import MapView from "./lib/components/MapView.svelte";
  import AlchemyView from "./lib/components/AlchemyView.svelte";
  type Tab = "ALUCARD" | "ITEMS" | "RELICS" | "FAMILIAR" | "CASTLE" | "ALCHEMY";

  const tabs: Tab[] = ["ALUCARD", "ITEMS", "RELICS", "FAMILIAR", "CASTLE", "ALCHEMY"];
  const TAB_INDEX: Record<Tab, number> = { ALUCARD: 0, ITEMS: 1, RELICS: 2, FAMILIAR: 3, CASTLE: 4, ALCHEMY: 5 };
  let activeTab: Tab = $state("ALUCARD");
  let prevTabIndex = $state(0);
  let wipeDirection: "left" | "right" = $state("right");

  /** Stats ↔ Equipment slide panel state for ALUCARD tab */
  let showEquip = $state(false);

  let sfxEnabled = $derived(appState.settings["sfx-enabled"] !== "false");
  let hapticEnabled = $derived(appState.settings["haptic-enabled"] !== "false");

  $effect(() => {
    setSfxEnabled(sfxEnabled);
  });

  $effect(() => {
    setHapticEnabled(hapticEnabled);
  });

  function selectTab(tab: Tab): void {
    if (tab === activeTab) return;
    wipeDirection = TAB_INDEX[tab] >= prevTabIndex ? "right" : "left";
    prevTabIndex = TAB_INDEX[tab];
    activeTab = tab;
    showEquip = false;
    onTabSwitch();
  }

  function openEquip(): void {
    showEquip = true;
    onCardSelect();
  }

  function closeEquip(): void {
    showEquip = false;
    onBack();
  }
</script>

{#if !appState.isConnected}
  <div class="offline">
    <span class="offline-text">Waiting for connection...</span>
    <span class="offline-hint">Grimoire v0.1 (SOTN US)</span>
  </div>
{:else}
  <nav class="tab-bar">
    {#each tabs as tab (tab)}
      <button
        class="tab-btn"
        class:active={activeTab === tab}
        onclick={() => selectTab(tab)}
      >
        {tab}
      </button>
    {/each}
  </nav>

  <main class="view-area">
    {#key activeTab}
      <div class="view-panel" in:pageWipe={{ direction: wipeDirection }}>
        {#if activeTab === "ALUCARD"}
          <div class="slide-panels" class:equip-open={showEquip}>
            <div class="slide-panel">
              <StatsView onequip={openEquip} />
            </div>
            <div class="slide-panel">
              <EquipView onback={closeEquip} />
            </div>
          </div>
        {:else if activeTab === "ITEMS"}
          <InventoryGrid />
        {:else if activeTab === "RELICS"}
          <RelicView />
        {:else if activeTab === "FAMILIAR"}
          <FamiliarView />
        {:else if activeTab === "CASTLE"}
          <MapView />
        {:else if activeTab === "ALCHEMY"}
          <AlchemyView />
        {/if}
      </div>
    {/key}
  </main>
{/if}

<div class="fog-overlay"></div>

<style>
  .offline {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 1;
    z-index: 5;
    position: relative;
  }

  .offline-text {
    color: #9b8ec4;
    font-size: 14px;
    letter-spacing: 0.05em;
    animation: candle-flicker 2s ease-in-out infinite;
  }

  .offline-hint {
    color: #6b6080;
    font-size: 10px;
    margin-top: 8px;
  }

  .tab-bar {
    display: flex;
    background: var(--bg-panel);
    border-bottom: 1px solid var(--border-ornate);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    position: sticky;
    top: 0;
    z-index: 10;
    flex-shrink: 0;
  }

  .tab-btn {
    flex: 1;
    padding: 14px 0;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--text-dim);
    font-family: inherit;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .tab-btn.active {
    color: var(--accent-gold);
    border-bottom-color: var(--accent-gold);
    text-shadow: 0 0 8px rgba(201, 169, 78, 0.4);
  }

  .view-area {
    flex: 1;
    overflow: hidden;
    position: relative;
    z-index: 1;
    min-height: 0;
  }

  .view-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* Stats ↔ Equipment slide panel (EmuDex PartyView pattern) */
  .slide-panels {
    display: flex;
    width: 200%;
    flex: 1;
    min-height: 0;
    transition: transform 0.25s ease;
    transform: translateX(0);
  }

  .slide-panels.equip-open {
    transform: translateX(-50%);
  }

  .slide-panel {
    width: 50%;
    flex-shrink: 0;
    height: 100%;
    overflow-y: auto;
  }
</style>
