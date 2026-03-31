<script lang="ts">
	import type { BattleState, SafariState } from "../types.js";
	import TypeBadge from "./TypeBadge.svelte";
	import { getCatchRate } from "../rom-tables.js";
	import { getSafariRecommendation, initialCatchFactor, idealFlavorForNature } from "../safari-solver.js";
	import iconsUrl from "../../assets/icons.webp";
	import itemsUrl from "../../assets/items.webp";

	interface Props {
		battle: BattleState;
		safari: SafariState;
	}

	let { battle, safari }: Props = $props();

	let enemy = $derived(battle.enemy);
	let speciesName = $derived(enemy ? (enemy.speciesName || `#${enemy.species}`) : "???");

	let baseCF = $derived(enemy ? initialCatchFactor(getCatchRate(enemy.internalSpeciesId) || 45) : 3);
	const baseEF = 3;

	// Use the inventory-analyzed reaction from safari state
	let reaction = $derived(safari.hasPokeblocks ? safari.bestReaction : 'ignored');
	let natureIdx = $derived(enemy ? enemy.personality % 25 : 0);
	let idealFlavor = $derived(idealFlavorForNature(natureIdx));

	let rec = $derived.by(() => {
		if (!enemy || safari.ballsLeft <= 0) return null;
		return getSafariRecommendation(
			safari.ballsLeft,
			safari.catchFactor || baseCF,
			safari.escapeFactor || baseEF,
			safari.goNearCount,
			safari.pkblCount,
			reaction,
		);
	});

	function fmtPct(p: number): string {
		if (p >= 1) return '100%';
		if (p < 0.001) return '<0.1%';
		return (p * 100).toFixed(1) + '%';
	}

	function probColor(p: number): string {
		if (p >= 0.5) return '#48B048';
		if (p >= 0.2) return '#E8C838';
		if (p >= 0.1) return '#D08020';
		return '#C03028';
	}

	const SAFARI_BALL_ID = 5;
	const BALL_COL = (SAFARI_BALL_ID - 1) % 20;
	const BALL_ROW = Math.floor((SAFARI_BALL_ID - 1) / 20);
	let dotBgImage = `url(${itemsUrl})`;
	let dotBgPos = `${BALL_COL * -12}px ${BALL_ROW * -12}px`;

	const TARGET_SVG = 'M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm238-240q82-82 82-198t-82-198q-82-82-198-82t-198 82q-82 82-82 198t82 198q82 82 198 82t198-82Zm-311-85q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Z';
	const FLEE_SVG = 'm216-160-56-56 384-384H440v80h-80v-160h233q16 0 31 6t26 17l120 119q27 27 66 42t84 16v80q-62 0-112.5-19T718-476l-40-42-88 88 90 90-262 151-40-69 172-99-68-68-266 265Zm-96-280v-80h200v80H120ZM40-560v-80h200v80H40Zm739-80q-33 0-57-23.5T698-720q0-33 24-56.5t57-23.5q33 0 57 23.5t24 56.5q0 33-24 56.5T779-640Zm-659-40v-80h200v80H120Z';
	const GONEAR_SVG = 'M260-920q85 0 132.5 75.5T440-680q0 41-8.5 78T412-536l-285 57q-15-29-31-80.5T80-680q0-103 51-171.5T260-920Zm55 680q-71 0-110.5-49.5T160-404l258-52q8 17 15 38.5t7 44.5q0 57-35.5 95T315-240Zm385-480q78 0 129 68.5T880-480q0 69-16 120.5T833-279l-285-57q-11-29-19.5-66t-8.5-78q0-89 47.5-164.5T700-720ZM645-40q-54 0-89.5-38T520-173q0-23 7-44.5t15-38.5l257 52q-5 65-44 114.5T645-40Z';
	const PKBL_SVG = 'M480-80 120-280v-400l360-200 360 200v400L480-80Zm0-114 244-138v-248L480-442 236-580v248l244 138Z';

	let catchPctNum = $derived(rec ? Math.round(rec.catchProb * 100) : 0);
	let fleePctNum = $derived(rec ? Math.round(rec.fleeProb * 100) : 0);
	let overallPctNum = $derived(rec ? Math.round(rec.overallProb * 100) : 0);

	// Show specific block name from inventory, or ideal flavor as fallback
	let pkblLabel = $derived.by(() => {
		if (rec?.action !== 'pokeblock') return '';
		if (safari.bestPokeblock) return safari.bestPokeblock.toUpperCase();
		if (idealFlavor) return idealFlavor.color.toUpperCase() + ' POKEBLOCK';
		return 'POKEBLOCK';
	});

	const REACTION_COLORS: Record<string, string> = {
		enthralled: '#388038',
		curious: '#C0A028',
		ignored: '#888888',
	};
</script>

<div class="view">
	{#if enemy && rec}
		<!-- Pokemon -->
		<div class="pokemon-row">
			<div
				class="pokemon-sprite"
				style:background-image="url({iconsUrl})"
				style:background-size="960px auto"
				style:background-position="{(enemy.species - 1) % 20 * -48}px {Math.floor((enemy.species - 1) / 20) * -48}px"
			></div>
			<div class="pokemon-info">
				<div class="pokemon-name">{speciesName}</div>
				<div class="pokemon-level">Lv.{enemy.level}</div>
				{#if enemy.type1 >= 0 && enemy.type1 <= 16}
					<div class="pokemon-types">
						<TypeBadge typeIndex={enemy.type1} />
						{#if enemy.type2 !== enemy.type1}
							<TypeBadge typeIndex={enemy.type2} />
						{/if}
					</div>
				{/if}
			</div>
		</div>

		<!-- Action recommendation -->
		<div class="action-block" class:ball={rec.action === 'ball'} class:gonear={rec.action === 'gonear'} class:pokeblock={rec.action === 'pokeblock'}>
			<div class="action-item">
				{#if rec.action === 'ball'}
					<div class="action-sprite"
						style:background-image="url({itemsUrl})"
						style:background-size="720px auto"
						style:background-position="{BALL_COL * -36}px {BALL_ROW * -36}px"
					></div>
				{:else if rec.action === 'gonear'}
					<svg class="action-svg" viewBox="0 -960 960 960" fill="#F8F0E0"><path d={GONEAR_SVG}/></svg>
				{:else}
					<svg class="action-svg" viewBox="0 -960 960 960" fill="#F8F0E0"><path d={PKBL_SVG}/></svg>
				{/if}
			</div>
			<div class="action-name">
				{#if rec.action === 'ball'}THROW BALL{:else if rec.action === 'gonear'}GO NEAR{:else}{pkblLabel}{/if}
			</div>
			<div class="action-overall">{fmtPct(rec.overallProb)} chance to catch</div>
		</div>

		<!-- Gauges -->
		<div class="gauges">
			<div class="gauge">
				<div class="gauge-header">
					<svg class="gauge-icon" viewBox="0 -960 960 960"><path d={TARGET_SVG}/></svg>
					<span class="gauge-title">Catch Rate</span>
					<span class="gauge-pct" style:color={probColor(rec.catchProb)}>{fmtPct(rec.catchProb)}</span>
				</div>
				<div class="gauge-track">
					<div class="gauge-fill" style:width="{catchPctNum}%" style:background={probColor(rec.catchProb)}></div>
				</div>
			</div>

			<div class="gauge">
				<div class="gauge-header">
					<svg class="gauge-icon" viewBox="0 -960 960 960"><path d={FLEE_SVG}/></svg>
					<span class="gauge-title">Flee Risk</span>
					<span class="gauge-pct" style:color={probColor(1 - rec.fleeProb)}>{fmtPct(rec.fleeProb)}</span>
				</div>
				<div class="gauge-track">
					<div class="gauge-fill" style:width="{fleePctNum}%" style:background={probColor(1 - rec.fleeProb)}></div>
				</div>
			</div>

			<div class="gauge">
				<div class="gauge-header">
					<svg class="gauge-icon" viewBox="0 -960 960 960"><path d={TARGET_SVG}/></svg>
					<span class="gauge-title">Overall Odds</span>
					<span class="gauge-pct" style:color={probColor(rec.overallProb)}>{fmtPct(rec.overallProb)}</span>
				</div>
				<div class="gauge-track">
					<div class="gauge-fill" style:width="{overallPctNum}%" style:background={probColor(rec.overallProb)}></div>
				</div>
			</div>
		</div>

		<!-- State -->
		<div class="state-row">
			<div class="state-badge">
				<svg class="state-icon" viewBox="0 -960 960 960"><path d={GONEAR_SVG}/></svg>
				<span>Near {safari.goNearCount}/3</span>
			</div>
			<div class="state-badge">
				<svg class="state-icon" viewBox="0 -960 960 960"><path d={PKBL_SVG}/></svg>
				<span>Block {safari.pkblCount}/3</span>
			</div>
			<div class="state-badge reaction" style:background={REACTION_COLORS[safari.bestReaction] || '#888'}>
				{#if !safari.hasPokeblocks}
					No blocks
				{:else if safari.bestPokeblock}
					{safari.bestPokeblock}
				{:else if idealFlavor}
					Use {idealFlavor.color}
				{:else}
					Any block
				{/if}
			</div>
		</div>

		<!-- Ball tracker -->
		<div class="ball-tracker">
			<div class="ball-dots">
				{#each {length: 30} as _, i}
					<div
						class="dot"
						class:filled={i < safari.ballsLeft}
						style:background-image={i < safari.ballsLeft ? dotBgImage : 'none'}
						style:background-size={i < safari.ballsLeft ? '240px auto' : 'auto'}
						style:background-position={i < safari.ballsLeft ? dotBgPos : ''}
					></div>
				{/each}
			</div>
			<div class="ball-count">{safari.ballsLeft}/30</div>
		</div>
	{:else}
		<div class="empty">Waiting for encounter...</div>
	{/if}
</div>

<style>
	.view {
		position: absolute;
		inset: 0;
		background: var(--red);
		padding: 8px;
		font-family: 'PokemonGB', monospace;
		display: flex;
		flex-direction: column;
		gap: 0;
		overflow: hidden;
	}

	.pokemon-row {
		display: flex;
		align-items: center;
		gap: 10px;
		background: var(--surface);
		border-radius: 10px 10px 4px 4px;
		padding: 10px 14px;
	}

	.pokemon-sprite {
		width: 48px;
		height: 48px;
		image-rendering: pixelated;
		flex-shrink: 0;
	}

	.pokemon-info { flex: 1; }
	.pokemon-name { font-size: 14px; color: var(--text); font-weight: bold; }
	.pokemon-level { font-size: 10px; color: var(--text-muted); margin: 2px 0 4px; }
	.pokemon-types { display: flex; gap: 3px; }

	.action-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px 12px;
		margin-top: 2px;
		border-radius: 4px;
	}

	.action-block.ball { background: #2858A0; }
	.action-block.gonear { background: #B07028; }
	.action-block.pokeblock { background: #388038; }

	.action-item { margin-bottom: 6px; }

	.action-sprite {
		width: 36px;
		height: 36px;
		image-rendering: pixelated;
	}

	.action-svg {
		width: 32px;
		height: 32px;
	}

	.action-name {
		font-size: 14px;
		font-weight: bold;
		color: #F8F0E0;
		letter-spacing: 1px;
	}

	.action-overall {
		font-size: 10px;
		color: #F8F0E0;
		opacity: 0.85;
		margin-top: 4px;
	}

	.gauges {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0;
		background: var(--surface);
		margin-top: 2px;
		padding: 10px 12px;
		border-radius: 4px;
		flex: 1;
		min-height: 0;
	}

	.gauge { padding: 5px 0; }
	.gauge + .gauge { border-top: 1px solid var(--divider); }

	.gauge-header {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 4px;
	}

	.gauge-icon {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
		fill: var(--text-muted);
	}

	.gauge-title { font-size: 9px; color: var(--text); flex: 1; }
	.gauge-pct { font-size: 12px; font-weight: bold; }

	.gauge-track {
		height: 8px;
		background: var(--surface-alt);
		border-radius: 4px;
		overflow: hidden;
	}

	.gauge-fill {
		height: 100%;
		border-radius: 4px;
		transition: width 0.3s ease, background 0.3s ease;
	}

	.state-row {
		display: flex;
		gap: 4px;
		margin-top: 2px;
	}

	.state-badge {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		font-size: 8px;
		font-weight: bold;
		background: var(--surface);
		color: var(--text-muted);
		padding: 5px 4px;
		border-radius: 4px;
	}

	.state-badge.reaction {
		color: #F8F0E0;
	}

	.state-icon {
		width: 12px;
		height: 12px;
		fill: var(--text-muted);
	}

	.ball-tracker {
		background: var(--surface);
		margin-top: 2px;
		padding: 10px 12px;
		border-radius: 4px 4px 10px 10px;
		text-align: center;
	}

	.ball-dots {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 3px;
		margin-bottom: 6px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		image-rendering: pixelated;
	}

	.dot:not(.filled) {
		background: var(--surface-dim);
		border: 1px solid var(--border-inner);
	}

	.ball-count {
		font-size: 9px;
		color: var(--text-muted);
	}

	.empty {
		font-size: 10px;
		color: #F8F0E0;
		opacity: 0.7;
		text-align: center;
		padding: 40px 20px;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
