<script lang="ts">
  import { save } from "@emulnk/sdk";
  import BattleView from "./lib/components/BattleView.svelte";
  import CatchView from "./lib/components/CatchView.svelte";
  import DexView from "./lib/components/DexView.svelte";
  import NuzlockeView from "./lib/components/NuzlockeView.svelte";
  import OfflineScreen from "./lib/components/OfflineScreen.svelte";
  import PartyView from "./lib/components/PartyView.svelte";
  import {
    getVisibleTabs,
    resolveBattleWipeTransition,
    resolveInvalidTab,
    resolveSwipeTab,
    resolveTabWipeDirection,
    type ScreenWipeDirection,
    type WipeState,
    type ViewMode,
  } from "./lib/navigation.js";
  import { battleDisplayOptions, dexDisplayOptions, partyDisplayOptions, settingBool } from "./lib/settings.js";
  import {
    onBattleEnd,
    onBattleStart,
    onTabSwitch,
    setHapticEnabled,
    setSfxEnabled,
  } from "./lib/sfx.js";
  import { appState } from "./lib/state.svelte.js";
  import { screenWipe } from "./lib/transitions.js";

  type NuzlockeStatus = "open" | "caught" | "failed";

  const TAB_LABELS: Record<ViewMode, string> = {
    party: "PARTY",
    battle: "BATTLE",
    catching: "CATCH",
    safari: "SAFARI",
    dex: "DEX",
    nuz: "NUZ",
  };

  const DEFAULT_TAB_MAP: Record<string, ViewMode> = {
    Party: "party",
    Dex: "dex",
    DEX: "dex",
  };

  let activeTab = $state<ViewMode>("party");
  let initialized = $state(false);
  let wipeState = $state<WipeState>("idle");
  let wipeTarget = $state<ViewMode>("party");
  let preBattleTab = $state<ViewMode>("party");
  let battleWipeShown = $state(false);
  let battleSnapshot = $state(appState.battle);
  let viewWipeDirection = $state<ScreenWipeDirection>("right");
  let swipeStart = $state<{ x: number; y: number } | null>(null);

  function parseNuzlockeData(raw: string): Record<string, { status: NuzlockeStatus; name: string }> {
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw) as Record<string, { status?: string; name?: string }>;
      const clean: Record<string, { status: NuzlockeStatus; name: string }> = {};
      for (const [key, value] of Object.entries(parsed)) {
        if (value.status === "caught" || value.status === "failed") {
          clean[key] = { status: value.status, name: value.name ?? `Map ${key}` };
        }
      }
      return clean;
    } catch {
      return {};
    }
  }

  function setNuzlocke(status: NuzlockeStatus): void {
    const next = { ...nuzlockeData };
    if (status === "open") delete next[currentMapKey];
    else next[currentMapKey] = { status, name: appState.progress.mapName };
    const encoded = JSON.stringify(next);
    appState.settings["nuzlocke-data"] = encoded;
    save("nuzlocke-data", encoded);
  }

  function switchTab(tab: ViewMode): void {
    if (tab === activeTab || !visibleTabs.includes(tab)) return;
    viewWipeDirection = resolveTabWipeDirection(activeTab, tab, visibleTabs);
    onTabSwitch();
    activeTab = tab;
  }

  function setActiveTab(tab: ViewMode): void {
    if (tab !== activeTab) {
      viewWipeDirection = resolveTabWipeDirection(activeTab, tab, visibleTabs);
    }
    activeTab = tab;
  }

  function onWipeCloseDone(): void {
    setActiveTab(resolveInvalidTab(wipeTarget, visibleTabs, defaultTab));
    window.setTimeout(() => {
      wipeState = "opening";
    }, 200);
  }

  function onWipeOpenDone(): void {
    wipeState = "idle";
  }

  function beginSwipe(event: TouchEvent): void {
    if (!appState.isConnected || wipeState !== "idle" || event.touches.length !== 1) return;
    if (event.target instanceof Element && event.target.closest(".party-panels.detail-open")) return;
    const touch = event.touches.item(0);
    if (!touch) return;
    swipeStart = { x: touch.clientX, y: touch.clientY };
  }

  function finishSwipe(event: TouchEvent): void {
    if (!swipeStart || event.changedTouches.length !== 1) {
      swipeStart = null;
      return;
    }

    const touch = event.changedTouches.item(0);
    if (!touch) {
      swipeStart = null;
      return;
    }

    const target = resolveSwipeTab(
      activeTab,
      visibleTabs,
      touch.clientX - swipeStart.x,
      touch.clientY - swipeStart.y,
    );
    swipeStart = null;

    if (!target) return;
    event.preventDefault();
    switchTab(target);
  }

  function cancelSwipe(): void {
    swipeStart = null;
  }

  let battleOptions = $derived.by(() => battleDisplayOptions(appState.settings));
  let dexOptions = $derived.by(() => dexDisplayOptions(appState.settings));
  let partyOptions = $derived.by(() => partyDisplayOptions(appState.settings));
  let nuzlockeEnabled = $derived.by(() => settingBool(appState.settings, "nuzlocke-mode"));
  let defaultTab = $derived.by(() => DEFAULT_TAB_MAP[appState.settings["default-tab"] ?? "Party"] ?? "party");
  let nuzlockeData = $derived.by(() => parseNuzlockeData(appState.settings["nuzlocke-data"] ?? ""));
  let currentMapKey = $derived.by(() => String(appState.progress.currentMap));
  let currentNuzlocke = $derived.by(() => nuzlockeData[currentMapKey]?.status ?? "open");
  let nuzlockeEntries = $derived.by(() => Object.entries(nuzlockeData));
  let displayedBattle = $derived.by(() => (
    wipeState === "closing"
      && !appState.battle.active
      && (activeTab === "battle" || activeTab === "catching")
      && battleSnapshot.active
      ? battleSnapshot
      : appState.battle
  ));

  $effect(() => {
    if (appState.battle.active) battleSnapshot = appState.battle;
  });

  $effect(() => {
    setSfxEnabled(settingBool(appState.settings, "sfx-enabled", true));
  });

  $effect(() => {
    setHapticEnabled(settingBool(appState.settings, "haptic-enabled", true));
  });

  let visibleTabs = $derived.by(() => getVisibleTabs({
    battleActive: appState.battle.active,
    isSafariBattle: appState.battle.isSafari,
    catchable: !!appState.battle.catch,
    safariActive: appState.safari.active,
    nuzlockeEnabled,
  }));

  $effect(() => {
    if (!appState.isConnected) {
      activeTab = "party";
      viewWipeDirection = "right";
      preBattleTab = "party";
      battleWipeShown = false;
      wipeTarget = "party";
      wipeState = "idle";
      initialized = false;
      return;
    }

    if (!initialized) {
      setActiveTab(resolveInvalidTab(defaultTab, visibleTabs, "party"));
      initialized = true;
    }
  });

  $effect(() => {
    if (!appState.isConnected || !initialized) return;

    const transition = resolveBattleWipeTransition({
      activeTab,
      preBattleTab,
      battleWipeShown,
      battleActive: appState.battle.active,
      isSafariBattle: appState.battle.isSafari,
      catchable: !!appState.battle.catch,
      wipeIdle: wipeState === "idle",
      defaultTab,
    });

    if (transition.sound === "battleIn") onBattleStart();
    if (transition.sound === "battleOut") onBattleEnd();

    battleWipeShown = transition.battleWipeShown;
    preBattleTab = transition.preBattleTab;

    if (transition.wipeTarget && transition.wipeState) {
      wipeTarget = transition.wipeTarget;
      wipeState = transition.wipeState;
    }
  });

  $effect(() => {
    if (!appState.isConnected || !initialized || wipeState !== "idle") return;
    if (!visibleTabs.includes(activeTab)) {
      setActiveTab(resolveInvalidTab(activeTab, visibleTabs, defaultTab));
    }
  });
</script>

{#if !appState.isConnected}
  <OfflineScreen gameVersion={appState.gameVersion} />
{:else}
  <main class="shell">
    <header class="topbar">
      <div class="link-light" aria-hidden="true"></div>
      <strong>POKeDEX</strong>
      <nav aria-label={appState.gameVersion === "blue" ? "Pokemon Blue views" : "Pokemon Red views"}>
        {#each visibleTabs as tab}
          <button type="button" class:active={activeTab === tab} onclick={() => switchTab(tab)}>
            {TAB_LABELS[tab]}
          </button>
        {/each}
      </nav>
    </header>

    <div class="screen" ontouchstart={beginSwipe} ontouchend={finishSwipe} ontouchcancel={cancelSwipe}>
      {#key activeTab}
        <div class="view-frame" in:screenWipe={{ direction: viewWipeDirection, duration: 120 }}>
          {#if activeTab === "battle"}
            <BattleView
              battle={displayedBattle}
              bag={appState.bag}
              safari={appState.safari}
              showEnemyMoves={battleOptions.showEnemyMoves}
              showCatchRate={battleOptions.showCatchRate}
              showFieldStates={battleOptions.showFieldStates}
              showDamage={battleOptions.showDamage}
              showAccuracy={battleOptions.showAccuracy}
              showEffectLabels={battleOptions.showEffectLabels}
              showWeaknesses={battleOptions.showWeaknesses}
              showTurnOrder={battleOptions.showTurnOrder}
              showSpriteAnimations={battleOptions.showSpriteAnimations}
            />
          {:else if activeTab === "catching" || activeTab === "safari"}
            <CatchView
              battle={displayedBattle}
              bag={appState.bag}
              safari={appState.safari}
              progress={appState.progress}
              gameVersion={appState.gameVersion}
              showCatchRate={battleOptions.showCatchRate}
            />
          {:else if activeTab === "dex"}
            <DexView progress={appState.progress} gameVersion={appState.gameVersion} options={dexOptions} />
          {:else if activeTab === "nuz"}
            <NuzlockeView
              progress={appState.progress}
              gameVersion={appState.gameVersion}
              currentStatus={currentNuzlocke}
              entries={nuzlockeEntries}
              onSet={setNuzlocke}
            />
          {:else}
            <PartyView party={appState.party} options={partyOptions} />
          {/if}
        </div>
      {/key}

      {#if wipeState !== "idle"}
        <div class="pokedex-wipe" aria-hidden="true">
          <div
            class="wipe-panel top"
            class:closing={wipeState === "closing"}
            class:opening={wipeState === "opening"}
            onanimationend={wipeState === "closing" ? onWipeCloseDone : onWipeOpenDone}
          ></div>
          <div
            class="wipe-panel bottom"
            class:closing={wipeState === "closing"}
            class:opening={wipeState === "opening"}
          ></div>
        </div>
      {/if}
    </div>
  </main>
{/if}
