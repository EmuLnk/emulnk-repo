<script lang="ts">
	import type { NuzlockeData } from "../nuzlocke-types.js";
	import { ROUTE_ENCOUNTERS } from "../encounters.js";
	import { getSpeciesNameByNatDex } from "../rom-tables.js";
	import { MAP_NAMES } from "../map-names.js";
	import { resetNuzlocke } from "../nuzlocke.svelte.js";
	import { heavyVibrate } from "../sfx.js";
	import iconsUrl from "../../assets/icons.webp";

	interface Props {
		data: NuzlockeData;
		currentMapKey: string;
	}

	let { data, currentMapKey }: Props = $props();

	let confirmReset = $state(false);

	// All routes that have wild encounters, in encounter data key order
	let allRouteKeys = $derived(Object.keys(ROUTE_ENCOUNTERS));

	let caughtCount = $derived.by(() => {
		let count = 0;
		for (const key in data.routes) {
			if (data.routes[key].status === "caught") count++;
		}
		return count;
	});

	let deadCount = $derived(Object.keys(data.graveyard).length);

	let unseenCount = $derived(allRouteKeys.length - Object.keys(data.routes).length);

	let graveyardEntries = $derived.by(() => {
		return Object.entries(data.graveyard).map(([pv, entry]) => ({
			pv,
			...entry,
			isViolation: data.violations.includes(pv),
		}));
	});

	function handleReset() {
		if (!confirmReset) {
			confirmReset = true;
			return;
		}
		heavyVibrate();
		resetNuzlocke();
		confirmReset = false;
	}

	function iconPos(speciesId: number): string {
		const col = (speciesId - 1) % 20;
		const row = Math.floor((speciesId - 1) / 20);
		return `${col * -32}px ${row * -32}px`;
	}
</script>

<div class="nuz-view">
	<header class="nuz-header">
		<div class="header-top">
			<span class="header-title">NUZLOCKE RUN</span>
			<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
			<span class="reset-btn" onclick={handleReset}>
				{confirmReset ? "CONFIRM?" : "RESET"}
			</span>
		</div>
		<div class="stats-row">
			<span class="stat">
				<span class="stat-val">{caughtCount}</span> caught
			</span>
			<span class="stat">
				<span class="stat-val">{deadCount}</span> dead
			</span>
			<span class="stat">
				<span class="stat-val">{unseenCount}</span> unseen
			</span>
		</div>
	</header>

	<section class="route-section">
		<div class="section-title">ROUTE TRACKER</div>
		<div class="route-list">
			{#each allRouteKeys as routeKey (routeKey)}
				{@const routeName = MAP_NAMES[routeKey] ?? routeKey}
				{@const entry = data.routes[routeKey]}
				{@const isCurrent = routeKey === currentMapKey}
				<div class="route-row" class:current={isCurrent} class:visited={!!entry} class:unvisited={!entry}>
					<span class="route-name">{routeName}</span>
					{#if entry}
						<div class="route-encounter">
							<div
								class="species-icon"
								class:grayscale={entry.status === "missed"}
								style:background-image="url({iconsUrl})"
								style:background-size="640px 640px"
								style:background-position={iconPos(entry.species)}
							></div>
							<span class="encounter-name">{getSpeciesNameByNatDex(entry.species)}</span>
							{#if entry.status === "caught"}
								<svg class="catch-icon" viewBox="0 0 12 12" width="12" height="12">
									<circle cx="6" cy="6" r="5" fill="#E83820" stroke="#383838" stroke-width="1"/>
									<path d="M1 6a5 5 0 0 0 10 0z" fill="#F0E8D0"/>
									<line x1="1" y1="6" x2="11" y2="6" stroke="#383838" stroke-width="1.2"/>
									<circle cx="6" cy="6" r="1.5" fill="#F0E8D0" stroke="#383838" stroke-width="0.8"/>
								</svg>
							{:else if entry.status === "missed"}
								<svg class="catch-icon" viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="#C03028" stroke-width="2" stroke-linecap="round">
									<line x1="3" y1="3" x2="9" y2="9" />
									<line x1="9" y1="3" x2="3" y2="9" />
								</svg>
							{:else}
								<span class="pending-dot"></span>
							{/if}
						</div>
					{:else}
						<span class="unvisited-label">---</span>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<section class="graveyard-section">
		<div class="section-title">GRAVEYARD</div>
		{#if graveyardEntries.length === 0}
			<div class="empty-msg">No casualties yet</div>
		{:else}
			<div class="grave-list">
				{#each graveyardEntries as entry (entry.pv)}
					<div class="grave-row" class:violation={entry.isViolation}>
						<div
							class="species-icon grayscale"
							style:background-image="url({iconsUrl})"
							style:background-size="640px 640px"
							style:background-position={iconPos(entry.species)}
						></div>
						<div class="grave-info">
							<span class="grave-name">
								{getSpeciesNameByNatDex(entry.species)}
								{#if entry.isViolation}
									<svg class="warn-icon" viewBox="0 0 12 12" width="10" height="10" fill="#F8D030" stroke="#383838" stroke-width="0.8">
										<path d="M6 1L1 11h10L6 1z" />
										<text x="6" y="10" text-anchor="middle" font-size="7" fill="#383838" stroke="none" font-weight="bold">!</text>
									</svg>
								{/if}
							</span>
							<span class="grave-detail">
								Lv.{entry.level} - {MAP_NAMES[entry.mapKey] ?? entry.mapKey}
							</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	.nuz-view {
		height: 100%;
		overflow-y: auto;
		background: var(--red);
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.nuz-header {
		background: var(--red-dark);
		border-radius: 6px;
		padding: 8px 10px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.header-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header-title {
		font-family: "PokemonGB", monospace;
		font-size: 10px;
		color: #F8F0E0;
	}

	.reset-btn {
		font-family: "PokemonGB", monospace;
		font-size: 7px;
		color: #F8F0E0;
		background: var(--red);
		padding: 3px 8px;
		border-radius: 4px;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.reset-btn:active {
		filter: brightness(0.8);
	}

	.stats-row {
		display: flex;
		gap: 12px;
	}

	.stat {
		font-family: "PokemonGB", monospace;
		font-size: 7px;
		color: #F8F0E0;
		opacity: 0.8;
	}

	.stat-val {
		font-size: 9px;
		opacity: 1;
	}

	.section-title {
		font-family: "PokemonGB", monospace;
		font-size: 8px;
		color: #F8F0E0;
		padding: 4px 6px;
		opacity: 0.8;
	}

	.route-section, .graveyard-section {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.route-list {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.route-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5px 8px;
		background: var(--surface);
		border-radius: 4px;
		border-left: 3px solid var(--border-inner);
		min-height: 32px;
	}

	.route-row.current {
		border-left-color: var(--indicator);
		background: var(--surface-dim);
		animation: current-pulse 2s ease-in-out infinite;
	}

	@keyframes current-pulse {
		0%, 100% { border-left-color: var(--indicator); }
		50% { border-left-color: #5080C8; }
	}

	.route-row.visited {
		border-left-color: var(--hp-green);
	}

	.route-row.visited.current {
		border-left-color: var(--indicator);
	}

	.route-row.unvisited {
		opacity: 0.5;
	}

	.route-name {
		font-family: "PokemonGB", monospace;
		font-size: 8px;
		color: var(--text);
		flex-shrink: 0;
		margin-right: 8px;
	}

	.route-encounter {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.species-icon {
		width: 32px;
		height: 32px;
		image-rendering: pixelated;
		flex-shrink: 0;
	}

	.species-icon.grayscale {
		filter: grayscale(1) sepia(0.2) brightness(0.55);
	}

	.encounter-name {
		font-family: "PokemonGB", monospace;
		font-size: 8px;
		color: var(--text);
		white-space: nowrap;
	}

	.catch-icon {
		flex-shrink: 0;
	}

	.pending-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #F8D030;
		flex-shrink: 0;
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.unvisited-label {
		font-family: "PokemonGB", monospace;
		font-size: 8px;
		color: var(--text-muted);
	}

	.grave-list {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.grave-row {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 5px 8px;
		background: var(--surface-dim);
		border-radius: 4px;
		border-left: 3px solid var(--text-muted);
	}

	.grave-row.violation {
		border-left-color: #F8D030;
	}

	.grave-info {
		display: flex;
		flex-direction: column;
		gap: 1px;
		min-width: 0;
	}

	.grave-name {
		font-family: "PokemonGB", monospace;
		font-size: 8px;
		color: var(--text);
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.warn-icon {
		flex-shrink: 0;
	}

	.grave-detail {
		font-size: 9px;
		color: var(--text-muted);
	}

	.empty-msg {
		font-family: "PokemonGB", monospace;
		font-size: 9px;
		color: #F8F0E0;
		text-align: center;
		padding: 16px;
		opacity: 0.7;
	}
</style>
