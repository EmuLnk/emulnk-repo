<script lang="ts">
	import OfflineScreen from "./lib/components/OfflineScreen.svelte";
	import PartyView from "./lib/components/PartyView.svelte";
	import BattleView from "./lib/components/BattleView.svelte";
	import SafariBattleView from "./lib/components/SafariBattleView.svelte";
	import SafariView from "./lib/components/SafariView.svelte";
	import MapView from "./lib/components/MapView.svelte";
	import NuzlockeView from "./lib/components/NuzlockeView.svelte";
	import { appState } from "./lib/state.svelte.js";
	import { nuzState } from "./lib/nuzlocke.svelte.js";
	import { setSfxEnabled, setHapticEnabled, onTabSwitch, onBattleStart, onBattleEnd } from "./lib/sfx.js";
	import { screenWipe } from "./lib/transitions.js";
	import { MAP_NAMES } from "./lib/map-names.js";

	let debugOpen = $state(false);
	let viewMode = $state<'party' | 'battle' | 'safari' | 'catching' | 'map' | 'nuz'>('party');

	// --- Default tab setting ---
	const DEFAULT_TAB_MAP: Record<string, 'party' | 'map'> = { "Party": "party", "DEX": "map" };
	let defaultTab = $derived<'party' | 'map'>(DEFAULT_TAB_MAP[appState.settings["default-tab"]] ?? 'party');

	// --- SFX settings ---
	let sfxEnabled = $derived(appState.settings["sfx-enabled"] !== "false");
	let hapticEnabled = $derived(appState.settings["haptic-enabled"] !== "false");
	$effect(() => { setSfxEnabled(sfxEnabled); });
	$effect(() => { setHapticEnabled(hapticEnabled); });

	// --- Directional tab tracking ---
	const TAB_ORDER = { party: 0, battle: 1, safari: 2, catching: 2, map: 3, nuz: 4 } as const;
	let prevTabIndex = $state(0);

	let direction = $derived<"left" | "right">(
		TAB_ORDER[viewMode] >= prevTabIndex ? "left" : "right"
	);

	function switchTab(tab: typeof viewMode) {
		if (tab === viewMode) return;
		prevTabIndex = TAB_ORDER[viewMode];
		onTabSwitch();
		viewMode = tab;
	}

	// --- Derived state ---
	let safariInZone = $derived(appState.safariState.inZone);
	let isSafariBattle = $derived(appState.battleState.active && appState.battleState.isSafari);

	// --- Pokédex clamshell wipe ---
	let wipeState = $state<'idle' | 'closing' | 'opening'>('idle');
	let battleWipeShown = $state(false);
	let wipeTarget = $state<typeof viewMode>('party');
	let preBattleTab = $state<typeof viewMode>('party');

	$effect(() => {
		const active = appState.battleState.active;
		const isSafari = appState.battleState.isSafari;
		if (active && !battleWipeShown) {
			battleWipeShown = true;
			preBattleTab = viewMode;
			wipeTarget = isSafari ? 'catching' : 'battle';
			wipeState = 'closing';
			onBattleStart();
		} else if (!active && battleWipeShown) {
			battleWipeShown = false;
			if (viewMode === 'battle') {
				wipeTarget = defaultTab;
				wipeState = 'closing';
				onBattleEnd();
			} else if (viewMode === 'catching') {
				wipeTarget = preBattleTab === 'catching' ? 'safari' : preBattleTab;
				wipeState = 'closing';
				onBattleEnd();
			} else {
				onBattleEnd();
			}
		}
	});

	function onWipeCloseDone() {
		viewMode = wipeTarget;
		setTimeout(() => { wipeState = 'opening'; }, 200);
	}

	function onWipeOpenDone() {
		wipeState = 'idle';
	}

	// --- Safari Zone entry: one-time switch (not zone-to-zone) ---
	let prevSafariInZone = $state(false);
	$effect(() => {
		if (safariInZone && !prevSafariInZone) {
			wipeTarget = 'safari';
			wipeState = 'closing';
		}
		prevSafariInZone = safariInZone;
	});

	// --- DEX map key override (for Safari zone navigation) ---
	let mapKeyOverride = $state<string | null>(null);
	function navigateToDex(mapKey: string) {
		mapKeyOverride = mapKey;
		switchTab('map');
	}
	// Clear override when leaving DEX tab
	$effect(() => {
		if (viewMode !== 'map') mapKeyOverride = null;
	});

	// --- Guard: clean up invalid tabs ---
	$effect(() => {
		if (viewMode === 'nuz' && !nuzlockeEnabled) {
			viewMode = defaultTab;
		}
		if (viewMode === 'safari' && !safariInZone) {
			viewMode = defaultTab;
		}
	});

	function debugWrite(status: number) {
		const mon = appState.party[0];
		if (mon) {
			appState.party[0] = { ...mon, status };
			appState.party = [...appState.party];
		}
	}

	let showIvs = $derived(appState.settings["party-show-ivs"] !== "false");
	let showEvs = $derived(appState.settings["party-show-evs"] !== "false");
	let showNature = $derived(appState.settings["party-show-nature"] !== "false");
	let showHpType = $derived(appState.settings["party-show-hp-type"] !== "false");
	let showItem = $derived(appState.settings["party-show-item"] !== "false");
	let showDamage = $derived(appState.settings["battle-show-damage"] === "true");
	let showAccuracy = $derived(appState.settings["battle-show-accuracy"] === "true");
	let showEffLabel = $derived(appState.settings["battle-show-eff-label"] === "true");
	let showEnemyIvs = $derived(appState.settings["battle-show-enemy-ivs"] === "true");
	let showEnemyMoves = $derived(appState.settings["battle-show-enemy-moves"] !== "false");
	let showField = $derived(appState.settings["battle-show-field"] !== "false");
	let showTurnOrder = $derived(appState.settings["battle-show-turn-order"] !== "false");
	let showWeaknesses = $derived(appState.settings["battle-show-weaknesses"] !== "false");
	let showAbility = $derived(appState.settings["battle-show-ability"] !== "false");
	let showCatchRate = $derived(appState.settings["battle-show-catch-rate"] !== "false");
	let mapShowAll = $derived(appState.settings["map-show-all"] === "true");
	let nuzlockeEnabled = $derived(appState.settings["nuzlocke-mode"] === "true");
</script>

{#if !appState.isConnected}
	<OfflineScreen />
{:else}
	<div class="shell">
		<div class="topbar">
			<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
			<div class="topbar-left" onclick={() => debugOpen = !debugOpen}>
				<span class="indicator"></span>
			</div>
			<span class="topbar-title">EMULNK</span>
			<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
			<div class="topbar-tabs">
				<span class="tab" class:active={viewMode === 'party'} onclick={() => switchTab('party')}>PARTY</span>
				{#if appState.battleState.active && !appState.battleState.isSafari}
					<span class="tab" class:active={viewMode === 'battle'} onclick={() => switchTab('battle')}>BATTLE</span>
				{/if}
				{#if safariInZone}
					<span class="tab" class:active={viewMode === 'safari'} onclick={() => switchTab('safari')}>SAFARI</span>
				{/if}
				{#if isSafariBattle}
					<span class="tab" class:active={viewMode === 'catching'} onclick={() => switchTab('catching')}>CATCH</span>
				{/if}
				<span class="tab" class:active={viewMode === 'map'} onclick={() => switchTab('map')}>DEX</span>
				{#if nuzlockeEnabled}
					<span class="tab" class:active={viewMode === 'nuz'} onclick={() => switchTab('nuz')}>NUZ</span>
				{/if}
			</div>
		</div>

		{#if debugOpen}
			<div class="debug-bar">
				<button class="dbtn" style:background="#A040A0" onclick={() => debugWrite(0x08)}>PSN</button>
				<button class="dbtn" style:background="#F08030" onclick={() => debugWrite(0x10)}>BRN</button>
				<button class="dbtn" style:background="#F8D030" style:color="#383838" onclick={() => debugWrite(0x40)}>PAR</button>
				<button class="dbtn" style:background="#98D8D8" style:color="#383838" onclick={() => debugWrite(0x20)}>FRZ</button>
				<button class="dbtn" style:background="#787878" onclick={() => debugWrite(0x03)}>SLP</button>
				<button class="dbtn" style:background="#A040A0" onclick={() => debugWrite(0x80)}>TOX</button>
				<button class="dbtn" style:background="#48B048" onclick={() => debugWrite(0x00)}>HEAL</button>
			</div>
		{/if}

		<div class="content">
			{#if viewMode === 'catching'}
				<div class="view-wrap">
					<SafariBattleView
						battle={appState.battleState}
						safari={appState.safariState}
					/>
				</div>
			{:else if viewMode === 'safari'}
				<div class="view-wrap">
					<SafariView
						safari={appState.safariState}
						currentMapKey={appState.mapState.mapKey}
						dexOwned={appState.dexState.owned}
						dexSeen={appState.dexState.seen}
						playerGender={appState.mapState.playerGender}
						onZoneTap={navigateToDex}
					/>
				</div>
			{:else if viewMode === 'battle'}
				<div class="view-wrap" in:screenWipe={{ direction, duration: 200 }}>
					<BattleView
						battle={appState.battleState}
						{showDamage}
						{showAccuracy}
						{showEffLabel}
						{showEnemyIvs}
						{showEnemyMoves}
						{showField}
						{showTurnOrder}
						{showWeaknesses}
						{showAbility}
						{showCatchRate}
						dexOwned={appState.dexState.owned}
						bagBalls={appState.bagBalls}
					/>
				</div>
			{:else if viewMode === 'map'}
				<div class="view-wrap" in:screenWipe={{ direction, duration: 200 }}>
					<MapView
						mapKey={mapKeyOverride ?? appState.mapState.mapKey}
						mapName={mapKeyOverride ? (MAP_NAMES[mapKeyOverride] ?? appState.mapState.mapName) : appState.mapState.mapName}
						dexOwned={appState.dexState.owned}
						dexSeen={appState.dexState.seen}
						showAll={mapShowAll}
						onBack={mapKeyOverride ? () => { mapKeyOverride = null; onTabSwitch(); } : undefined}
					/>
				</div>
			{:else if viewMode === 'nuz' && nuzlockeEnabled && nuzState.data}
				<div class="view-wrap" in:screenWipe={{ direction, duration: 200 }}>
					<NuzlockeView
						data={nuzState.data}
						currentMapKey={appState.mapState.mapKey}
					/>
				</div>
			{:else}
				<div class="view-wrap" in:screenWipe={{ direction, duration: 200 }}>
					<PartyView
						party={appState.party}
						{showIvs}
						{showEvs}
						{showNature}
						{showHpType}
						{showItem}
					/>
				</div>
			{/if}

			{#if wipeState !== 'idle'}
				<div class="pokedex-wipe">
					<div
						class="wipe-panel top"
						class:closing={wipeState === 'closing'}
						class:opening={wipeState === 'opening'}
						onanimationend={wipeState === 'closing' ? onWipeCloseDone : onWipeOpenDone}
					></div>
					<div
						class="wipe-panel bottom"
						class:closing={wipeState === 'closing'}
						class:opening={wipeState === 'opening'}
					></div>
				</div>
			{/if}
		</div>

		<div class="bottom-accent"></div>
	</div>
{/if}

<style>
	.shell {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.topbar {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 40px;
		min-height: 40px;
		background: var(--red);
		padding: 0 12px;
		border-bottom: 1px solid var(--red-dark);
		position: relative;
		z-index: 20;
	}

	.topbar-left {
		display: flex;
		align-items: center;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.indicator {
		width: 8px;
		height: 8px;
		background: var(--indicator);
		border-radius: 50%;
		box-shadow: 0 0 4px 1px rgba(48,96,168,0.6);
	}

	.debug-bar {
		display: flex;
		gap: 4px;
		padding: 4px 8px;
		background: #282828;
		overflow-x: auto;
	}

	.dbtn {
		all: unset;
		box-sizing: border-box;
		padding: 3px 8px;
		border-radius: 4px;
		font-size: 10px;
		font-weight: bold;
		color: #fff;
		cursor: pointer;
		white-space: nowrap;
		-webkit-tap-highlight-color: transparent;
	}

	.dbtn:active {
		filter: brightness(0.8);
	}

	.topbar-title {
		flex: 1;
		text-align: center;
		font-family: "PokemonGB", monospace;
		font-size: 10px;
		color: #ffffff;
		letter-spacing: 1px;
	}

	.topbar-tabs {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.tab {
		font-family: "PokemonGB", monospace;
		font-size: 8px;
		color: #ffffff;
		text-transform: uppercase;
		opacity: 0.6;
		padding: 8px 4px 2px;
		border-bottom: 3px solid transparent;
		line-height: 1;
		cursor: pointer;
		transition: opacity var(--transition-fast);
		-webkit-tap-highlight-color: transparent;
	}

	.tab.active {
		opacity: 1;
		border-bottom: 3px solid #ffffff;
	}

	.content {
		flex: 1;
		overflow: hidden;
		background: var(--red);
		position: relative;
	}

	.bottom-accent {
		height: 3px;
		min-height: 3px;
		background: var(--red-dark);
	}

	.view-wrap {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	/* Pokédex clamshell wipe overlay */
	.pokedex-wipe {
		position: absolute;
		inset: 0;
		z-index: 15;
		pointer-events: none;
	}

	.wipe-panel {
		position: absolute;
		left: 0;
		right: 0;
		height: 50%;
		background: var(--red-dark);
		box-shadow: 0 0 12px rgba(0,0,0,0.4);
	}

	.wipe-panel.top { top: 0; }
	.wipe-panel.bottom { bottom: 0; }

	.wipe-panel.top.closing { animation: close-top 500ms ease-in forwards; }
	.wipe-panel.bottom.closing { animation: close-bottom 500ms ease-in forwards; }

	.wipe-panel.top.opening { animation: open-top 500ms ease-out forwards; }
	.wipe-panel.bottom.opening { animation: open-bottom 500ms ease-out forwards; }

	@keyframes close-top    { from { transform: translateY(-100%); } to { transform: translateY(0); } }
	@keyframes close-bottom { from { transform: translateY(100%); }  to { transform: translateY(0); } }
	@keyframes open-top     { from { transform: translateY(0); }     to { transform: translateY(-100%); } }
	@keyframes open-bottom  { from { transform: translateY(0); }     to { transform: translateY(100%); } }

</style>
