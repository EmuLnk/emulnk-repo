<script lang="ts">
	import type { BattleMon, DamageResult } from "../types.js";
	import HpBar from "./HpBar.svelte";
	import TypeBadge from "./TypeBadge.svelte";
	import StatusBadge from "./StatusBadge.svelte";
	import BattleIcon from "./BattleIcon.svelte";
	import BattleMoveRow from "./BattleMoveRow.svelte";
	import { getSpeciesName } from "../rom-tables.js";
	import { getWeaknesses } from "../type-chart.js";
	import { calcNature } from "@emulink/sdk/parsers/pokemon-gen3";
	import { getAbilityName, getItemName } from "../rom-tables.js";
	import { NATURE_STAT_NAMES } from "@emulink/sdk/parsers/pokemon-gen3";
	import iconsUrl from "../../assets/icons.webp";
	import itemsUrl from "../../assets/items.webp";
	import { slide } from "svelte/transition";
	import { onToggle } from "../sfx.js";

	let {
		enemy,
		isTrainer,
		showEnemyIvs,
		showWeaknesses = true,
		showAbility = true,
		compact = false,
		focused = false,
		onFocus,
		enemyMoves,
		enemyDamage,
		showDamage = false,
		showAccuracy = false,
		showEffLabel = false,
	}: {
		enemy: BattleMon;
		isTrainer: boolean;
		showEnemyIvs: boolean;
		showWeaknesses?: boolean;
		showAbility?: boolean;
		compact?: boolean;
		focused?: boolean;
		onFocus?: () => void;
		enemyMoves?: { moveId: number; idx: number }[];
		enemyDamage?: (DamageResult | null)[];
		showDamage?: boolean;
		showAccuracy?: boolean;
		showEffLabel?: boolean;
	} = $props();

	// Expand toggle for details (both compact doubles and singles)
	let expanded = $state(false);
	let enemyMovesOpen = $state(false);
	let speciesName = $derived(getSpeciesName(enemy.species));
	let iconCol = $derived((enemy.species - 1) % 20);
	let iconRow = $derived(Math.floor((enemy.species - 1) / 20));
	let weaknesses = $derived(getWeaknesses(enemy.type1, enemy.type2));
	let nature = $derived(calcNature(enemy.pv));
	let abilityName = $derived(getAbilityName(enemy.ability));
	let itemName = $derived(enemy.item ? getItemName(enemy.item) : 'None');
	let isFainted = $derived(enemy.hp === 0 && enemy.maxhp > 0);

	function stageDisplay(stages: number[]): { label: string; up: number; down: number }[] {
		const STAT_LABELS = ['Atk', 'Def', 'Spd', 'SpA', 'SpD', 'Acc', 'Eva'];
		const result: { label: string; up: number; down: number }[] = [];
		for (let i = 0; i < 7; i++) {
			const stage = stages[i] - 6;
			if (stage !== 0) {
				result.push({ label: STAT_LABELS[i], up: Math.max(0, stage), down: Math.max(0, -stage) });
			}
		}
		return result;
	}

	let statChanges = $derived(stageDisplay(enemy.statStages));

	function toggleExpand() {
		onToggle();
		if (onFocus) onFocus();
		expanded = !expanded;
	}
</script>

{#if compact}
	<!-- DOUBLES: compact card with tap-to-expand -->
	<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
	<div class="enemy-card compact" class:focused class:fainted={isFainted} onclick={toggleExpand}>
		<div class="compact-row">
			<div
				class="poke-icon"
				style:background-image="url({iconsUrl})"
				style:background-size="640px 640px"
				style:background-position="calc({iconCol} * -32px) calc({iconRow} * -32px)"
			></div>
			<div class="compact-info">
				<div class="compact-name-row">
					<span class="species-name-sm">{speciesName}</span>
					<span class="level-label-sm">Lv.{enemy.level}</span>
				</div>
				<HpBar hp={enemy.hp} maxhp={enemy.maxhp} />
			</div>
		</div>

		{#if expanded}
			<div class="expanded-section" transition:slide={{ duration: 150 }}>
				<div class="badges-row">
					<TypeBadge typeIndex={enemy.type1} />
					{#if enemy.type2 !== enemy.type1}
						<TypeBadge typeIndex={enemy.type2} />
					{/if}
					{#if enemy.status !== 0}
						<StatusBadge status={enemy.status} />
					{/if}
				</div>
				{#if showAbility && abilityName}
					<span class="detail-text">{abilityName}</span>
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<!-- SINGLES: basic info always visible, details collapsible -->
	<div class="enemy-card full" class:fainted={isFainted}>
		<!-- Always visible: sprite, name, level, types, status, ability, HP, weaknesses -->
		<div class="full-main">
			<div class="header-row">
				<div
					class="poke-icon"
					style:background-image="url({iconsUrl})"
					style:background-size="640px 640px"
					style:background-position="calc({iconCol} * -32px) calc({iconRow} * -32px)"
				></div>
				<div class="name-block">
					<span class="species-name">{speciesName}</span>
					<span class="level-label">Lv.{enemy.level}</span>
				</div>
				<div class="badges">
					<TypeBadge typeIndex={enemy.type1} />
					{#if enemy.type2 !== enemy.type1}
						<TypeBadge typeIndex={enemy.type2} />
					{/if}
					{#if enemy.status !== 0}
						<StatusBadge status={enemy.status} />
					{/if}
				</div>
				</div>

			<div class="info-row">
				{#if showAbility && abilityName}
					<span class="info-chip">{abilityName}</span>
				{/if}
				<span class="nature-chip">
					{nature.name}
					{#if nature.p !== -1}
						(<span class="boost">+{NATURE_STAT_NAMES[nature.p]}</span>, <span class="nerf">-{NATURE_STAT_NAMES[nature.m]}</span>)
					{/if}
				</span>
				{#if itemName !== 'None'}
					<span class="info-chip">
						<div
							class="item-sprite"
							style:background-image="url({itemsUrl})"
							style:background-size="480px auto"
							style:background-position="{(enemy.item - 1) % 20 * -24}px {Math.floor((enemy.item - 1) / 20) * -24}px"
						></div>
						{itemName}
					</span>
				{/if}
			</div>

			<div class="hp-row">
				<HpBar hp={enemy.hp} maxhp={enemy.maxhp} />
			</div>

			{#if showWeaknesses && weaknesses.length > 0}
				<div class="weakness-row">
					<span class="row-label">Weak:</span>
					{#each weaknesses as typeIdx (typeIdx)}
						<TypeBadge typeIndex={typeIdx} />
					{/each}
				</div>
			{/if}

			{#if statChanges.length > 0}
				<div class="stage-row">
					{#each statChanges as sc (sc.label)}
						<span class="stage-item">
							{sc.label}
							{#each { length: sc.up } as _, i (i)}
								<BattleIcon icon="arrow-up" size={10} color="#48B048" />
							{/each}
							{#each { length: sc.down } as _, i (i)}
								<BattleIcon icon="arrow-down" size={10} color="#E04038" />
							{/each}
						</span>
					{/each}
				</div>
			{/if}

			{#if showEnemyIvs}
				<div class="iv-row">
					<span class="row-label">IVs:</span>
					<span class="iv-values">{enemy.ivs.hp}/{enemy.ivs.atk}/{enemy.ivs.def}/{enemy.ivs.spatk}/{enemy.ivs.spdef}/{enemy.ivs.spd}</span>
				</div>
			{/if}
		</div>

		<!-- Enemy moves collapsible section (singles) -->
		{#if enemyMoves && enemyMoves.length > 0}
			<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
			<div class="enemy-moves-toggle" onclick={() => { onToggle(); enemyMovesOpen = !enemyMovesOpen; }}>
				<span class="details-label">ENEMY MOVES</span>
				<span class="chevron" class:open={enemyMovesOpen}>
					<BattleIcon icon="chevron" size={10} color="#787878" />
				</span>
			</div>

			{#if enemyMovesOpen}
				<div class="enemy-moves-grid" transition:slide={{ duration: 150 }}>
					{#each enemyMoves as { moveId, idx } (idx)}
						<BattleMoveRow
							{moveId}
							pp={enemy.pp[idx]}
							damage={enemyDamage?.[idx] ?? null}
							{showDamage}
							{showAccuracy}
							{showEffLabel}
							grid
						/>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
{/if}

<style>
	.enemy-card {
		background: var(--surface);
		border: 2px solid var(--border);
		border-radius: var(--card-radius);
		box-shadow: var(--card-shadow), 0 2px 8px rgba(0,0,0,0.12);
	}

	.enemy-card.fainted {
		opacity: 0.45;
		filter: grayscale(0.6);
	}

	/* --- FULL (singles) layout --- */
	.enemy-card.full {
		display: flex;
		flex-direction: column;
	}

	.full-main {
		padding: 9px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.header-row {
		display: flex;
		align-items: center;
		gap: 7px;
		flex-wrap: wrap;
	}

	.poke-icon {
		width: 30px;
		height: 30px;
		image-rendering: pixelated;
		flex-shrink: 0;
	}

	.name-block {
		display: flex;
		align-items: baseline;
		gap: 5px;
		flex: 1;
		min-width: 0;
	}

	.species-name {
		font-family: "PokemonGB", monospace;
		font-size: 12px;
		font-weight: bold;
		color: var(--enemy-color);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.level-label {
		font-family: "PokemonGB", monospace;
		font-size: 9px;
		color: var(--border);
		white-space: nowrap;
	}

	.badges {
		display: flex;
		align-items: center;
		gap: 3px;
		flex-shrink: 0;
	}

	.hp-row {
		width: 100%;
	}

	.info-row {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
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

	.item-sprite {
		width: 24px;
		height: 24px;
		image-rendering: pixelated;
		flex-shrink: 0;
	}

	.nature-chip {
		font-size: 10px;
		color: var(--border);
		border-left: 2px solid var(--stat-boost);
		padding-left: 5px;
	}

	.boost {
		color: var(--stat-boost);
		font-weight: bold;
	}

	.nerf {
		color: var(--stat-penalty);
		font-weight: bold;
	}

	.weakness-row {
		display: flex;
		align-items: center;
		gap: 3px;
		flex-wrap: wrap;
	}

	.row-label {
		font-family: "PokemonGB", monospace;
		font-size: 9px;
		color: var(--border);
		margin-right: 2px;
	}

	.stage-row {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.stage-item {
		display: inline-flex;
		align-items: center;
		gap: 1px;
		font-size: 10px;
		color: var(--text);
		font-weight: bold;
	}

	.iv-row {
		display: flex;
		align-items: baseline;
		gap: 4px;
	}

	.iv-values {
		font-size: 11px;
		font-weight: bold;
		color: var(--text);
		font-family: monospace;
	}

	/* Enemy moves toggle header */
	.enemy-moves-toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5px 9px;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		border-top: 1px solid var(--divider);
		min-height: 33px;
	}

	.details-label {
		font-family: "PokemonGB", monospace;
		font-size: 9px;
		text-transform: uppercase;
		color: var(--text-muted);
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.details-label::before {
		content: '';
		width: 3px;
		height: 10px;
		background: var(--red);
		border-radius: 1px;
		flex-shrink: 0;
	}

	.chevron {
		transition: transform 0.15s ease;
		display: inline-flex;
	}

	.chevron.open {
		transform: rotate(180deg);
	}

	.enemy-moves-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5px;
		padding: 7px;
		border-top: 1px solid var(--divider);
	}

	/* --- COMPACT (doubles) layout --- */
	.enemy-card.compact {
		padding: 5px 7px;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.enemy-card.compact.focused {
		border-color: var(--red);
		box-shadow: inset 0 0 0 1px var(--border-inner), 0 0 0 2px var(--red);
	}

	.compact-row {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.compact-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.compact-name-row {
		display: flex;
		align-items: baseline;
		gap: 4px;
	}

	.species-name-sm {
		font-family: "PokemonGB", monospace;
		font-size: 10px;
		font-weight: bold;
		color: var(--text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.level-label-sm {
		font-family: "PokemonGB", monospace;
		font-size: 8px;
		color: var(--border);
		white-space: nowrap;
	}

	.expanded-section {
		border-top: 1px solid #D8D0C0;
		padding-top: 6px;
		margin-top: 6px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.badges-row {
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.detail-text {
		font-size: 9px;
		color: var(--text-muted);
	}
</style>
