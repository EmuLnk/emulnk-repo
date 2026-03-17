<script lang="ts">
	import { SvelteMap, SvelteSet } from "svelte/reactivity";
	import { ROUTE_ENCOUNTERS, METHOD_ORDER, METHOD_LABELS, type EncounterMethod, type RouteEncounter } from "../encounters.js";
	import { getSpeciesNameByNatDex } from "../rom-tables.js";
	import iconsUrl from "../../assets/icons.webp";

	interface Props {
		mapKey: string;
		mapName: string;
		dexOwned: Set<number>;
		dexSeen: Set<number>;
		showAll: boolean;
	}

	let { mapKey, mapName, dexOwned, dexSeen, showAll }: Props = $props();

	let encounters = $derived(ROUTE_ENCOUNTERS[mapKey] ?? []);

	let grouped = $derived.by(() => {
		const map = new SvelteMap<EncounterMethod, RouteEncounter[]>();
		for (const enc of encounters) {
			let list = map.get(enc.method);
			if (!list) {
				list = [];
				map.set(enc.method, list);
			}
			list.push(enc);
		}
		return map;
	});

	let methodsPresent = $derived(
		METHOD_ORDER.filter((m) => grouped.has(m))
	);

	let allSpecies = $derived.by(() => {
		const ids = new SvelteSet<number>();
		for (const enc of encounters) {
			ids.add(enc.species);
		}
		return ids;
	});

	let routeCaughtCount = $derived.by(() => {
		let count = 0;
		for (const id of allSpecies) {
			if (dexOwned.has(id)) count++;
		}
		return count;
	});

	let routeComplete = $derived(allSpecies.size > 0 && routeCaughtCount === allSpecies.size);

	function methodCaughtCount(method: EncounterMethod): number {
		const list = grouped.get(method);
		if (!list) return 0;
		const species = new Set(list.map((e) => e.species));
		let count = 0;
		for (const id of species) {
			if (dexOwned.has(id)) count++;
		}
		return count;
	}

	function methodTotalCount(method: EncounterMethod): number {
		const list = grouped.get(method);
		if (!list) return 0;
		return new Set(list.map((e) => e.species)).size;
	}

	function getStatus(speciesId: number): "caught" | "seen" | "unseen" {
		if (showAll || dexOwned.has(speciesId)) return "caught";
		if (dexSeen.has(speciesId)) return "seen";
		return "unseen";
	}

	function cardKey(enc: RouteEncounter): string {
		return `${enc.method}-${enc.species}`;
	}
</script>

<div class="dex-view">
	<header class="dex-header">
		<svg class="header-icon" viewBox="0 0 12 12" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
			<path d="M6 1C6 1 3 4 3 7a3 3 0 0 0 6 0c0-3-3-6-3-6z" />
			<circle cx="6" cy="7" r="1" fill="currentColor" stroke="none" />
		</svg>
		<span class="header-title">{mapName}</span>
		{#if allSpecies.size > 0}
			<span class="header-count">{routeCaughtCount}/{allSpecies.size}</span>
		{/if}
	</header>

	{#if encounters.length === 0}
		<div class="empty-message">No wild Pokemon found.</div>
	{:else}
		<div class="sections">
			{#each methodsPresent as method (method)}
				{@const list = grouped.get(method) ?? []}
				{@const caught = methodCaughtCount(method)}
				{@const total = methodTotalCount(method)}
				<section class="method-section">
					<div class="method-header">
						<svg class="method-icon" viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
							{#if method === "grass"}
								<path d="M6 10V6M4 10V8l-2 2M8 10V8l2 2M6 6C6 3 4 1 2 1c0 2 2 4 4 5M6 6c0-3 2-5 4-5 0 2-2 4-4 5" />
							{:else if method === "water"}
								<path d="M1 7c1-1.5 2-2 3-1s2 1.5 3 0 2-2 3-1 2 1.5 3 0M1 10c1-1.5 2-2 3-1s2 1.5 3 0 2-2 3-1 2 1.5 3 0" />
							{:else if method === "fish-old"}
								<path d="M3 1v7l3 3M6 11l3-3M3 4h2" stroke-width="1" />
							{:else if method === "fish-good"}
								<path d="M3 1v7l3 3M6 11l3-3M3 4h2" stroke-width="1.4" />
							{:else if method === "fish-super"}
								<path d="M3 1v7l3 3M6 11l3-3M3 4h2" stroke-width="1.8" />
							{:else if method === "rock"}
								<path d="M4 2l-3 5 2 4h6l2-4-3-5H4z" />
							{/if}
						</svg>
						<span class="method-label">{METHOD_LABELS[method]}</span>
						<span class="method-count">{caught}/{total}</span>
					</div>

					<div class="pokemon-grid">
						{#each list as enc (cardKey(enc))}
							{@const status = getStatus(enc.species)}
							<div
								class="pokemon-card"
								class:caught={status === "caught"}
								class:seen={status === "seen"}
								class:unseen={status === "unseen"}
							>
								<div
									class="species-icon"
									class:silhouette={status === "unseen"}
									class:faded={status === "seen"}
									style:background-image="url({iconsUrl})"
									style:background-size="640px 640px"
									style:background-position="{(enc.species - 1) % 20 * -32}px {Math.floor((enc.species - 1) / 20) * -32}px"
								></div>
								<div class="card-info">
									<span class="species-name">
										{status === "unseen" ? "???" : getSpeciesNameByNatDex(enc.species)}
									</span>
									<span class="card-rate">{enc.rate}%</span>
								</div>
								{#if status === "caught"}
									<svg class="status-icon" viewBox="0 0 12 12" width="10" height="10">
										<circle cx="6" cy="6" r="5" fill="#E83820" stroke="#383838" stroke-width="1"/>
										<path d="M1 6a5 5 0 0 0 10 0z" fill="#F0E8D0"/>
										<line x1="1" y1="6" x2="11" y2="6" stroke="#383838" stroke-width="1.2"/>
										<circle cx="6" cy="6" r="1.5" fill="#F0E8D0" stroke="#383838" stroke-width="0.8"/>
									</svg>
								{:else if status === "seen"}
									<svg class="status-icon" viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="#3060A8" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M1 6s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4z" />
										<circle cx="6" cy="6" r="1.5" />
									</svg>
								{/if}
							</div>
						{/each}
					</div>
				</section>
			{/each}

			{#if routeComplete}
				<div class="route-complete">
					<svg class="complete-icon" viewBox="0 0 12 12" width="14" height="14" fill="none" stroke="#383838" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M2 6l3 3 5-5" />
					</svg>
					<span>Route Complete! {allSpecies.size}/{allSpecies.size}</span>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.dex-view {
		height: 100%;
		overflow-y: auto;
		background: var(--red);
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.dex-header {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 10px;
		background: var(--red-dark);
		border-radius: 6px;
		color: #F8F0E0;
	}

	.header-icon {
		flex-shrink: 0;
		color: #F8F0E0;
	}

	.header-title {
		font-family: "PokemonGB", monospace;
		font-size: 10px;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.header-count {
		font-family: "PokemonGB", monospace;
		font-size: 9px;
		opacity: 0.8;
		flex-shrink: 0;
	}

	.empty-message {
		font-family: "PokemonGB", monospace;
		font-size: 9px;
		color: #F8F0E0;
		text-align: center;
		padding: 32px 16px;
		opacity: 0.7;
	}

	.sections {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.method-section {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.method-header {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 4px 6px;
		color: #F8F0E0;
		border-bottom: 1px solid rgba(255,255,255,0.1);
		padding-bottom: 4px;
	}

	.method-icon {
		flex-shrink: 0;
		color: #F8F0E0;
	}

	.method-label {
		font-family: "PokemonGB", monospace;
		font-size: 10px;
		color: #F8F0E0;
		flex: 1;
	}

	.method-count {
		font-family: "PokemonGB", monospace;
		font-size: 8px;
		color: #F8F0E0;
		opacity: 0.7;
		flex-shrink: 0;
	}

	.pokemon-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
		gap: 4px;
	}

	.pokemon-card {
		all: unset;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		background: var(--surface);
		border-radius: 6px;
		padding: 8px 6px;
		border-left: 4px solid var(--border-inner);
	}

	.pokemon-card.caught {
		border-left-color: var(--hp-green);
	}

	.pokemon-card.seen {
		border-left-color: var(--indicator);
	}

	.pokemon-card.unseen {
		border-left-color: var(--border-inner);
	}

	.pokemon-card.unseen .species-name {
		filter: brightness(0);
		opacity: 0.3;
	}

	.species-icon {
		width: 32px;
		height: 32px;
		image-rendering: pixelated;
		flex-shrink: 0;
	}

	.species-icon.silhouette {
		filter: brightness(0);
		opacity: 0.18;
	}

	.species-icon.faded {
		opacity: 0.5;
	}

	.card-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1px;
		min-width: 0;
		width: 100%;
	}

	.species-name {
		font-family: "PokemonGB", monospace;
		font-size: 8px;
		color: var(--text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
	}

	.card-rate {
		font-size: 9px;
		color: var(--text-muted);
	}

	.status-icon {
		display: block;
		flex-shrink: 0;
	}

	.route-complete {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		background: #F8D030;
		border-radius: 6px;
		padding: 8px 12px;
		margin-top: 2px;
	}

	.route-complete span {
		font-family: "PokemonGB", monospace;
		font-size: 9px;
		color: var(--text);
	}

	.complete-icon {
		flex-shrink: 0;
	}
</style>
