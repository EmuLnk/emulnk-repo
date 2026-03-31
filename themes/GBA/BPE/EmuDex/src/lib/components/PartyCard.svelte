<script lang="ts">
	import type { Pokemon } from "../types.js";
	import HpBar from "./HpBar.svelte";
	import StatusBadge from "./StatusBadge.svelte";
	import { getSpeciesNameByNatDex } from "../rom-tables.js";
	import iconsUrl from "../../assets/icons.webp";

	interface Props {
		pokemon: Pokemon | null;
		slot: number;
		onclick: () => void;
	}

	let { pokemon, slot, onclick }: Props = $props();

	let speciesName = $derived(
		pokemon ? (pokemon.speciesName || getSpeciesNameByNatDex(pokemon.speciesId) || "???") : ""
	);

	let iconCol = $derived(pokemon ? (pokemon.speciesId - 1) % 20 : 0);
	let iconRow = $derived(pokemon ? Math.floor((pokemon.speciesId - 1) / 20) : 0);

	let showIcon = $derived(pokemon !== null && pokemon.speciesId > 0 && !pokemon.isEgg);

	let statusEffect = $derived.by(() => {
		if (!pokemon || pokemon.status === 0) return null;
		const s = pokemon.status;
		if (s & 0x07) return "slp";
		if (s & 0x08) return "psn";
		if (s & 0x10) return "brn";
		if (s & 0x20) return "frz";
		if (s & 0x40) return "par";
		if (s & 0x80) return "tox";
		return null;
	});

	let isFainted = $derived(pokemon !== null && pokemon.hp === 0 && pokemon.maxhp > 0);
	let canIdle = $derived(!isFainted && statusEffect !== 'par' && statusEffect !== 'frz');
</script>

{#if pokemon === null}
	<button class="card card--empty" {onclick} aria-label="Empty party slot {slot + 1}">
		<span class="empty-label">---</span>
	</button>
{:else if pokemon.isEgg}
	<button class="card" {onclick} aria-label="Egg in slot {slot + 1}">
		<span class="egg-label">Egg</span>
	</button>
{:else}
	<button class="card" {onclick} aria-label="{speciesName} in slot {slot + 1}">
		{#if showIcon}
			<div class="icon-wrap" class:fainted={isFainted} class:frozen={statusEffect === 'frz'} class:paralyzed={statusEffect === 'par'} class:idle={canIdle} style:animation-delay={canIdle ? `${slot * 0.42}s` : undefined}>
				<div
					class="icon"
					style:background-image="url({iconsUrl})"
					style:background-size="960px 960px"
					style:background-position="calc({iconCol} * -48px) calc({iconRow} * -48px)"
				></div>
				{#if statusEffect === 'slp'}
					<span class="zzz z1">Z</span>
					<span class="zzz z2">Z</span>
					<span class="zzz z3">Z</span>
				{/if}
				{#if statusEffect === 'psn' || statusEffect === 'tox'}
					<span class="bubble b1"></span>
					<span class="bubble b2"></span>
					<span class="bubble b3"></span>
				{/if}
				{#if statusEffect === 'brn'}
					<span class="flame f1"></span>
					<span class="flame f2"></span>
					<span class="flame f3"></span>
				{/if}
				{#if statusEffect === 'frz'}
					<div class="ice-block"></div>
				{/if}
				{#if statusEffect === 'par'}
					<span class="spark s1"></span>
					<span class="spark s2"></span>
					<span class="spark s3"></span>
				{/if}
			</div>
		{/if}
		<div class="name-row">
			<span class="name">{speciesName}</span>
			{#if pokemon.status !== 0}
				<StatusBadge status={pokemon.status} />
			{/if}
		</div>
		<div class="level-row">
			<span class="level">Lv. {pokemon.level}</span>
			{#if pokemon.friendship >= 220}
				<svg class="heart-icon heart-ready" viewBox="0 0 10 10" width="8" height="8"><path d="M5 9C3 7 0 5 0 3a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0c0 2-3 4-5 6z" fill="currentColor"/></svg>
			{/if}
		</div>
		<div class="card-bottom">
			<HpBar hp={pokemon.hp} maxhp={pokemon.maxhp} />
		</div>
	</button>
{/if}

<style>
	.card {
		all: unset;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
		background: linear-gradient(180deg, #FDFAF0 0%, var(--surface) 30%);
		border: 2px solid var(--border);
		border-radius: var(--card-radius);
		padding: 4px 8px;
		box-shadow: var(--card-shadow);
		cursor: pointer;
		width: 100%;
		height: 100%;
		-webkit-tap-highlight-color: transparent;
	}

	.card:active {
		filter: brightness(0.95);
		transform: scale(0.98);
	}

	.card--empty {
		border-style: dotted;
		opacity: 0.3;
	}

	.empty-label {
		font-size: 16px;
		color: #888;
		font-family: monospace;
	}

	.egg-label {
		font-size: 16px;
		font-weight: bold;
		color: var(--border);
		text-align: center;
	}

	.icon-wrap {
		position: relative;
		width: 48px;
		height: 48px;
		flex-shrink: 0;
	}

	.icon-wrap.idle {
		animation: idle-bob 2.5s ease-in-out infinite;
	}

	@keyframes idle-bob {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-3px); }
	}

	.icon-wrap.fainted {
		filter: grayscale(1) brightness(0.6);
	}

	.icon {
		width: 48px;
		height: 48px;
		image-rendering: pixelated;
	}

	/* SLP — staggered Z's floating up */
	.zzz {
		position: absolute;
		right: 0;
		font-family: "PokemonGB", monospace;
		color: #787878;
		opacity: 0;
		pointer-events: none;
		animation: zzz-float 3s ease-in-out infinite;
	}

	.z1 { font-size: 8px; right: 2px; top: 24px; animation-delay: 0s; }
	.z2 { font-size: 11px; right: -4px; top: 14px; animation-delay: 1s; }
	.z3 { font-size: 14px; right: -8px; top: 4px; animation-delay: 2s; }

	@keyframes zzz-float {
		0% { transform: translateY(4px); opacity: 0; }
		20% { opacity: 1; }
		80% { opacity: 1; }
		100% { transform: translateY(-8px); opacity: 0; }
	}

	/* PSN/TOX — rising bubbles */
	.bubble {
		position: absolute;
		bottom: 4px;
		width: 6px;
		height: 6px;
		background: #A040A0;
		border-radius: 50%;
		opacity: 0;
		animation: rise 2s ease-out infinite;
		pointer-events: none;
	}

	.b1 { left: 12px; animation-delay: 0s; }
	.b2 { left: 28px; animation-delay: 0.6s; }
	.b3 { left: 44px; animation-delay: 1.2s; }

	@keyframes rise {
		0% { transform: translateY(0); opacity: 0.8; }
		100% { transform: translateY(-48px); opacity: 0; }
	}

	/* BRN — small flames rising */
	.flame {
		position: absolute;
		bottom: 8px;
		width: 8px;
		height: 12px;
		border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
		opacity: 0;
		animation: flame-rise 1.6s ease-out infinite;
		pointer-events: none;
	}

	.f1 { left: 10px; background: #F08030; animation-delay: 0s; }
	.f2 { left: 28px; background: #F8D030; animation-delay: 0.5s; width: 6px; height: 10px; }
	.f3 { left: 44px; background: #F08030; animation-delay: 1s; }

	@keyframes flame-rise {
		0% { transform: translateY(0) scaleX(1); opacity: 0.9; }
		50% { transform: translateY(-20px) scaleX(0.8); opacity: 0.7; }
		100% { transform: translateY(-40px) scaleX(0.4); opacity: 0; }
	}

	/* FRZ — frozen block overlay */
	.icon-wrap.frozen {
		filter: saturate(0.4) brightness(1.1);
	}

	.ice-block {
		position: absolute;
		inset: 2px;
		border-radius: 6px;
		background: rgba(152, 216, 240, 0.2);
		border: 2px solid rgba(152, 216, 216, 0.5);
		pointer-events: none;
		animation: ice-shimmer 2.5s ease-in-out infinite;
	}

	@keyframes ice-shimmer {
		0%, 100% { border-color: rgba(152, 216, 216, 0.35); background: rgba(152, 216, 240, 0.15); }
		50% { border-color: rgba(152, 216, 216, 0.7); background: rgba(152, 216, 240, 0.3); }
	}

	/* PAR — icon shakes left/right */
	.icon-wrap.paralyzed {
		animation: par-jitter 2.5s step-end infinite;
	}

	@keyframes par-jitter {
		0%, 18% { transform: translate(0, 0); }
		20% { transform: translate(-2px, 1px); }
		22% { transform: translate(2px, -1px); }
		24% { transform: translate(-1px, 0); }
		26%, 64% { transform: translate(0, 0); }
		66% { transform: translate(1px, 1px); }
		68% { transform: translate(-2px, 0); }
		70%, 100% { transform: translate(0, 0); }
	}

	/* PAR — yellow sparks */
	.spark {
		position: absolute;
		width: 8px;
		height: 8px;
		opacity: 0;
		pointer-events: none;
		animation: spark-flash 2.5s ease-out infinite;
	}

	.spark::before,
	.spark::after {
		content: '';
		position: absolute;
		background: #F8D030;
		border-radius: 1px;
	}

	.spark::before {
		width: 6px;
		height: 2px;
		top: 3px;
		left: 1px;
		transform: rotate(45deg);
	}

	.spark::after {
		width: 6px;
		height: 2px;
		top: 3px;
		left: 1px;
		transform: rotate(-45deg);
	}

	.s1 { top: 8px; left: 20px; animation-delay: 0.2s; }
	.s2 { top: 28px; left: 38px; animation-delay: 0.8s; }
	.s3 { top: 18px; left: 10px; animation-delay: 1.5s; }

	@keyframes spark-flash {
		0%, 18% { opacity: 0; }
		20% { opacity: 1; transform: scale(1); }
		30% { opacity: 0.8; transform: scale(1.2); }
		40% { opacity: 0; transform: scale(0.6); }
		100% { opacity: 0; }
	}

	.name {
		font-size: 13px;
		font-weight: 700;
		color: var(--text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
		text-align: center;
	}

	.name-row {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.level-row {
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.level {
		font-size: 9px;
		color: #686868;
		font-family: "PokemonGB", monospace;
	}

	.heart-icon {
		color: #B8B8B8;
	}

	.heart-ready {
		color: #E04838;
	}

	.card-bottom {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}
</style>
