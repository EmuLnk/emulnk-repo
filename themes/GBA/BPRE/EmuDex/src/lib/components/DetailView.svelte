<script lang="ts">
	import type { Pokemon } from "../types.js";
	import HpBar from "./HpBar.svelte";
	import TypeBadge from "./TypeBadge.svelte";
	import StatBar from "./StatBar.svelte";
	import MoveSlot from "./MoveSlot.svelte";
	import StatusBadge from "./StatusBadge.svelte";
	import { getSpeciesNameByNatDex, getAbilityName, getItemName } from "../rom-tables.js";
	import { MOVE_DATA } from "../moves.js";
	import { NATURE_STAT_NAMES } from "../data.js";
	import { TYPE_NAMES } from "../type-chart.js";
	import iconsUrl from "../../assets/icons.webp";
	import itemsUrl from "../../assets/items.webp";

	interface Props {
		pokemon: Pokemon;
		showIvs: boolean;
		showEvs: boolean;
		showNature: boolean;
		showHpType: boolean;
		showItem: boolean;
		onback: () => void;
	}

	let { pokemon, showIvs, showEvs, showNature, showHpType, showItem, onback }: Props = $props();

	let displayName = $derived(pokemon.speciesName || getSpeciesNameByNatDex(pokemon.speciesId) || "???");
	let officialName = $derived(getSpeciesNameByNatDex(pokemon.speciesId));
	let hasNickname = $derived(displayName.toLowerCase() !== officialName.toLowerCase());
	let iconCol = $derived((pokemon.speciesId - 1) % 20);
	let iconRow = $derived(Math.floor((pokemon.speciesId - 1) / 20));
	let showIcon = $derived(pokemon.speciesId > 0 && !pokemon.isEgg);

	let isNeutral = $derived(pokemon.nature.p === -1);
	let boostedName = $derived(!isNeutral ? NATURE_STAT_NAMES[pokemon.nature.p] : "");
	let nerfedName = $derived(!isNeutral ? NATURE_STAT_NAMES[pokemon.nature.m] : "");
	let abilityName = $derived(getAbilityName(pokemon.ability));

	// Nature indices: 0=Atk, 1=Def, 2=Spd, 3=SpA, 4=SpD
	// Stat order for StatBar: HP(no nature), Atk(0), Def(1), SpA(3), SpD(4), Spd(2)
	const STAT_DEFS: { label: string; key: string; ivKey: string; evKey: string; natureIdx: number }[] = [
		{ label: "HP", key: "maxhp", ivKey: "hp", evKey: "hp", natureIdx: -1 },
		{ label: "Atk", key: "atk", ivKey: "atk", evKey: "atk", natureIdx: 0 },
		{ label: "Def", key: "def", ivKey: "def", evKey: "def", natureIdx: 1 },
		{ label: "SpA", key: "spatk", ivKey: "spatk", evKey: "spatk", natureIdx: 3 },
		{ label: "SpD", key: "spdef", ivKey: "spdef", evKey: "spdef", natureIdx: 4 },
		{ label: "Spd", key: "speed", ivKey: "spd", evKey: "spd", natureIdx: 2 },
	];

	function getNatureMod(natureIdx: number): number {
		if (natureIdx === -1) return 0;
		if (pokemon.nature.p === natureIdx) return 1;
		if (pokemon.nature.m === natureIdx) return -1;
		return 0;
	}

	let hpTypeIndex = $derived(TYPE_NAMES.indexOf(pokemon.hiddenPower.type));

	let itemIconCol = $derived((pokemon.heldItem - 1) % 20);
	let itemIconRow = $derived(Math.floor((pokemon.heldItem - 1) / 20));
</script>

<div class="detail-view">
	<header class="header">
		<button class="back-btn" onclick={onback} aria-label="Go back">←</button>
		<div class="header-info">
			{#if showIcon}
				<div
					class="icon"
					style:background-image="url({iconsUrl})"
					style:background-size="640px 640px"
					style:background-position="calc({iconCol} * -32px) calc({iconRow} * -32px)"
				></div>
			{/if}
			<div class="header-names">
				<span class="header-name">{displayName}</span>
				{#if hasNickname}
					<span class="header-species">{officialName}</span>
				{/if}
			</div>
		</div>
		<span class="header-level">Lv. {pokemon.level}</span>
	</header>

	<div class="content">
		<section class="section">
			<HpBar hp={pokemon.hp} maxhp={pokemon.maxhp} />
		</section>

		{#if pokemon.status !== 0}
			<section class="section">
				<StatusBadge status={pokemon.status} />
			</section>
		{/if}

		{#if showNature}
			<section class="section">
				<h3 class="section-header">NATURE</h3>
				<p class="nature-text">
					{pokemon.nature.name}
					{#if !isNeutral}
						(<span class="nature-boost">+{boostedName}</span>, <span class="nature-nerf">-{nerfedName}</span>)
					{/if}
				</p>
			</section>
		{/if}

		{#if abilityName}
			<section class="section">
				<h3 class="section-header">ABILITY</h3>
				<span class="info-chip">{abilityName}</span>
			</section>
		{/if}

		<section class="section">
			<h3 class="section-header">STATS</h3>
			<div class="stats-list">
				{#each STAT_DEFS as stat (stat.label)}
					<StatBar
						label={stat.label}
						value={pokemon[stat.key as keyof Pokemon] as number}
						iv={pokemon.ivs[stat.ivKey as keyof typeof pokemon.ivs]}
						ev={pokemon.evs[stat.evKey as keyof typeof pokemon.evs]}
						natureMod={getNatureMod(stat.natureIdx)}
						{showIvs}
						{showEvs}
					/>
				{/each}
			</div>
		</section>

		{#if showHpType}
			<section class="section">
				<h3 class="section-header">HIDDEN POWER</h3>
				<div class="hp-type-row">
					{#if hpTypeIndex >= 0}
						<TypeBadge typeIndex={hpTypeIndex} />
					{/if}
					<span class="hp-power">{pokemon.hiddenPower.power}</span>
				</div>
			</section>
		{/if}

		<section class="section">
			<h3 class="section-header">MOVES</h3>
			<div class="moves-list">
				{#each { length: 4 } as _, i (i)}
					<MoveSlot moveId={pokemon.moves[i] ?? 0} pp={pokemon.pp[i] ?? 0} />
				{/each}
			</div>
		</section>

		{#if showItem && pokemon.heldItem > 0}
			<section class="section">
				<h3 class="section-header">HELD ITEM</h3>
				<div class="item-row">
					<div
						class="item-icon"
						style:background-image="url({itemsUrl})"
						style:background-size="480px auto"
						style:background-position="{itemIconCol * -24}px {itemIconRow * -24}px"
					></div>
					<span class="item-text">{getItemName(pokemon.heldItem)}</span>
				</div>
			</section>
		{/if}

		<section class="section">
			<h3 class="section-header">FRIENDSHIP</h3>
			<div class="friendship-row">
				<svg class="heart-icon" viewBox="0 0 16 16" width="14" height="14">
					<path d="M8 14s-5.5-3.5-5.5-7A3 3 0 0 1 8 5a3 3 0 0 1 5.5 2c0 3.5-5.5 7-5.5 7z" fill="#F85888"/>
				</svg>
				<span class="friendship-text">{pokemon.friendship}</span>
				<div class="friendship-bar-track">
					<div class="friendship-bar-fill" style:width="{Math.min((pokemon.friendship / 255) * 100, 100)}%"></div>
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	.detail-view {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--surface);
	}

	.header {
		display: flex;
		align-items: center;
		gap: 8px;
		background: linear-gradient(180deg, #606060, #505050);
		color: #fff;
		padding: 8px 12px;
		flex-shrink: 0;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.back-btn {
		all: unset;
		font-size: 18px;
		color: #fff;
		cursor: pointer;
		padding: 0 4px;
		-webkit-tap-highlight-color: transparent;
	}

	.header-info {
		display: flex;
		align-items: center;
		gap: 6px;
		flex: 1;
		min-width: 0;
	}

	.icon {
		width: 32px;
		height: 32px;
		image-rendering: pixelated;
		flex-shrink: 0;
	}

	.header-names {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.header-name {
		font-size: 14px;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.header-species {
		font-size: 10px;
		opacity: 0.7;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.header-level {
		font-size: 12px;
		font-family: monospace;
		flex-shrink: 0;
		opacity: 0.85;
	}

	.content {
		flex: 1;
		overflow-y: auto;
		padding: 8px 0;
	}

	.section {
		padding: 10px 12px;
		border-bottom: 1px solid var(--divider);
	}

	.section-header {
		font-family: 'PokemonGB', monospace;
		font-size: 9px;
		text-transform: uppercase;
		color: var(--text-muted);
		margin: 0 0 4px 0;
		font-weight: normal;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.section-header::before {
		content: '';
		width: 3px;
		height: 10px;
		background: var(--red);
		border-radius: 1px;
		flex-shrink: 0;
	}

	.info-chip {
		font-size: 10px;
		color: var(--border);
		background: var(--surface-alt);
		border-radius: 3px;
		padding: 1px 5px;
		display: inline-flex;
		align-items: center;
		gap: 3px;
	}

	.nature-text {
		font-size: 13px;
		color: var(--text);
		margin: 0;
	}

	.nature-boost {
		color: var(--stat-boost);
		font-weight: bold;
	}

	.nature-nerf {
		color: var(--stat-penalty);
		font-weight: bold;
	}

	.stats-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.hp-type-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.hp-power {
		font-size: 13px;
		font-weight: bold;
		color: var(--text);
	}

	.moves-list {
		display: flex;
		flex-direction: column;
	}

	.item-row {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.item-icon {
		width: 24px;
		height: 24px;
		image-rendering: pixelated;
		flex-shrink: 0;
	}

	.item-text {
		font-size: 13px;
		color: var(--text);
		margin: 0;
	}

	.heart-icon {
		flex-shrink: 0;
	}

	.friendship-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.friendship-bar-track {
		flex: 1;
		height: 6px;
		background: var(--divider);
		border-radius: 3px;
		overflow: hidden;
	}

	.friendship-bar-fill {
		height: 100%;
		background: #F85888;
		border-radius: 3px;
		transition: width 0.3s ease;
	}

	.friendship-text {
		font-size: 13px;
		color: var(--text);
		margin: 0;
	}
</style>
