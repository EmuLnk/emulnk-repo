<script lang="ts">
	import type { BattleState, BattleMon, DamageResult, BagBall } from "../types.js";
	import InfoStrip from "./InfoStrip.svelte";
	import EnemyCard from "./EnemyCard.svelte";
	import BattleMoveRow from "./BattleMoveRow.svelte";
	import BattleIcon from "./BattleIcon.svelte";
	import TypeBadge from "./TypeBadge.svelte";
	import CatchCalc from "./CatchCalc.svelte";
	import { calcDamage } from "../damage-calc.js";
	import { slide } from "svelte/transition";
	import { getSpeciesName } from "../rom-tables.js";
	import { onToggle } from "../sfx.js";
	import iconsUrl from "../../assets/icons.webp";

	let {
		battle,
		showDamage,
		showAccuracy,
		showEffLabel,
		showEnemyIvs,
		showEnemyMoves,
		showField,
		showTurnOrder,
		showWeaknesses,
		showAbility,
		showCatchRate = false,
		dexOwned,
		bagBalls = [],
	}: {
		battle: BattleState;
		showDamage: boolean;
		showAccuracy: boolean;
		showEffLabel: boolean;
		showEnemyIvs: boolean;
		showEnemyMoves: boolean;
		showField: boolean;
		showTurnOrder: boolean;
		showWeaknesses: boolean;
		showAbility: boolean;
		showCatchRate?: boolean;
		dexOwned?: Set<number>;
		bagBalls?: BagBall[];
	} = $props();

	// Doubles: focused enemy index (0 or 1)
	let focusedEnemy = $state(0);

	// Primary targets
	let focusedEnemyMon = $derived(
		battle.isDoubles && focusedEnemy === 1 && battle.enemy2
			? battle.enemy2
			: battle.enemy
	);

	// Player move damage vs focused enemy
	function calcPlayerDamage(player: BattleMon, enemy: BattleMon): (DamageResult | null)[] {
		return player.moves.map((moveId) =>
			calcDamage(player, enemy, moveId, battle.field, battle.field.playerSide, battle.field.enemySide)
		);
	}

	let playerDamage = $derived.by(() => {
		if (!battle.player || !focusedEnemyMon) return [null, null, null, null];
		return calcPlayerDamage(battle.player, focusedEnemyMon);
	});

	let player2Damage = $derived.by(() => {
		if (!battle.player2 || !focusedEnemyMon) return [null, null, null, null];
		return calcPlayerDamage(battle.player2, focusedEnemyMon);
	});

	// Enemy move damage vs player (reverse calc)
	function calcEnemyDamage(enemy: BattleMon, player: BattleMon): (DamageResult | null)[] {
		return enemy.moves.map((moveId) =>
			calcDamage(enemy, player, moveId, battle.field, battle.field.enemySide, battle.field.playerSide)
		);
	}

	let enemyDamage = $derived.by(() => {
		if (!battle.enemy || !battle.player) return [null, null, null, null];
		return calcEnemyDamage(battle.enemy, battle.player);
	});

	let enemy2Damage = $derived.by(() => {
		if (!battle.enemy2 || !battle.player) return [null, null, null, null];
		return calcEnemyDamage(battle.enemy2, battle.player);
	});

	// Filter out empty move slots (moveId === 0)
	function activeMoves(mon: BattleMon): { moveId: number; idx: number }[] {
		return mon.moves
			.map((moveId, idx) => ({ moveId, idx }))
			.filter(m => m.moveId !== 0);
	}

	let playerMoves = $derived(battle.player ? activeMoves(battle.player) : []);
	let player2Moves = $derived(battle.player2 ? activeMoves(battle.player2) : []);
	let enemyMoves = $derived(battle.enemy ? activeMoves(battle.enemy) : []);
	let enemy2Moves = $derived(battle.enemy2 ? activeMoves(battle.enemy2) : []);

	// Collapsible states
	let playerMovesOpen = $state(true);
	let partnerMovesOpen = $state(true);
	let enemyMovesOpen = $state(false);  // doubles only

	// Player icon sprite positions
	let playerSpeciesName = $derived(battle.player ? (getSpeciesName(battle.player.species) ?? battle.player.speciesName) : '');
	let playerIconCol = $derived(battle.player ? (battle.player.species - 1) % 20 : 0);
	let playerIconRow = $derived(battle.player ? Math.floor((battle.player.species - 1) / 20) : 0);

	let player2SpeciesName = $derived(battle.player2 ? (getSpeciesName(battle.player2.species) ?? battle.player2.speciesName) : '');
	let player2IconCol = $derived(battle.player2 ? (battle.player2.species - 1) % 20 : 0);
	let player2IconRow = $derived(battle.player2 ? Math.floor((battle.player2.species - 1) / 20) : 0);

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

	let playerStatChanges = $derived(battle.player ? stageDisplay(battle.player.statStages) : []);
	let player2StatChanges = $derived(battle.player2 ? stageDisplay(battle.player2.statStages) : []);
</script>

{#if !battle.player || !battle.enemy}
	<div class="battle-container">
		<div class="loading">Battle loading...</div>
	</div>
{:else}
	<div class="battle-container">
		<InfoStrip {battle} {showField} {showTurnOrder} />

		<!-- Enemy Cards -->
		{#if battle.isDoubles && battle.enemy2}
			<div class="enemy-row doubles">
				<div class="enemy-half">
					<EnemyCard
						enemy={battle.enemy}
						isTrainer={battle.isTrainer}
						{showEnemyIvs}
						{showWeaknesses}
						{showAbility}
						compact
						focused={focusedEnemy === 0}
						onFocus={() => focusedEnemy = 0}
					/>
				</div>
				<div class="enemy-half">
					<EnemyCard
						enemy={battle.enemy2}
						isTrainer={battle.isTrainer}
						{showEnemyIvs}
						{showWeaknesses}
						{showAbility}
						compact
						focused={focusedEnemy === 1}
						onFocus={() => focusedEnemy = 1}
					/>
				</div>
			</div>
		{:else}
			<div class="enemy-row">
				<EnemyCard
					enemy={battle.enemy}
					isTrainer={battle.isTrainer}
					{showEnemyIvs}
					{showWeaknesses}
					{showAbility}
					enemyMoves={showEnemyMoves ? enemyMoves : undefined}
					enemyDamage={showEnemyMoves ? enemyDamage : undefined}
					{showDamage}
					{showAccuracy}
					{showEffLabel}
				/>
			</div>
		{/if}

		<!-- Catch Rate (wild/safari encounters only) -->
		{#if showCatchRate && !battle.isTrainer && battle.enemy}
			<div class="catch-section">
				<CatchCalc
					species={battle.enemy.species}
					maxHp={battle.enemy.maxhp}
					currentHp={battle.enemy.hp}
					status={battle.enemy.status}
					level={battle.enemy.level}
					type1={battle.enemy.type1}
					type2={battle.enemy.type2}
					alreadyCaught={dexOwned?.has(battle.enemy.species) ?? false}
					{bagBalls}
				/>
			</div>
		{/if}

		<!-- Your Moves (player slot 1) -->
		<div class="moves-section">
			<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
			<div class="moves-header" onclick={() => { onToggle(); playerMovesOpen = !playerMovesOpen; }}>
				<div class="section-header-content">
					<div
						class="header-icon"
						style:background-image="url({iconsUrl})"
						style:background-size="640px 640px"
						style:background-position="calc({playerIconCol} * -32px) calc({playerIconRow} * -32px)"
					></div>
					<span class="species-name player">{playerSpeciesName}</span>
					<span class="header-level">Lv.{battle.player.level}</span>
				</div>
				<div class="header-right">
					<div class="header-badges">
						<TypeBadge typeIndex={battle.player.type1} />
						{#if battle.player.type2 !== battle.player.type1}
							<TypeBadge typeIndex={battle.player.type2} />
						{/if}
					</div>
					<span class="chevron" class:open={playerMovesOpen}>
						<BattleIcon icon="chevron" size={10} color="#787878" />
					</span>
				</div>
			</div>
			{#if playerStatChanges.length > 0}
				<div class="player-stages">
					{#each playerStatChanges as sc (sc.label)}
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
			{#if playerMovesOpen}
				<div class="moves-grid" transition:slide={{ duration: 150 }}>
					{#each playerMoves as { moveId, idx } (idx)}
						<BattleMoveRow
							{moveId}
							pp={battle.player.pp[idx]}
							damage={playerDamage[idx]}
							{showDamage}
							{showAccuracy}
							{showEffLabel}
							grid
						/>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Your Moves (player slot 2, doubles only) -->
		{#if battle.isDoubles && battle.player2}
			<div class="moves-section">
				<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
				<div class="moves-header" onclick={() => { onToggle(); partnerMovesOpen = !partnerMovesOpen; }}>
					<div class="section-header-content">
						<div
							class="header-icon"
							style:background-image="url({iconsUrl})"
							style:background-size="640px 640px"
							style:background-position="calc({player2IconCol} * -32px) calc({player2IconRow} * -32px)"
						></div>
						<span class="species-name player">{player2SpeciesName}</span>
						<span class="header-level">Lv.{battle.player2.level}</span>
					</div>
					<div class="header-right">
						<div class="header-badges">
							<TypeBadge typeIndex={battle.player2.type1} />
							{#if battle.player2.type2 !== battle.player2.type1}
								<TypeBadge typeIndex={battle.player2.type2} />
							{/if}
						</div>
						<span class="chevron" class:open={partnerMovesOpen}>
							<BattleIcon icon="chevron" size={10} color="#787878" />
						</span>
					</div>
				</div>
				{#if player2StatChanges.length > 0}
					<div class="player-stages">
						{#each player2StatChanges as sc (sc.label)}
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
				{#if partnerMovesOpen}
					<div class="moves-grid" transition:slide={{ duration: 150 }}>
						{#each player2Moves as { moveId, idx } (idx)}
							<BattleMoveRow
								{moveId}
								pp={battle.player2.pp[idx]}
								damage={player2Damage[idx]}
								{showDamage}
								{showAccuracy}
								{showEffLabel}
								grid
							/>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Doubles: enemy moves collapsible -->
		{#if battle.isDoubles && showEnemyMoves}
			<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
			<div class="enemy-moves-section">
				<div class="enemy-moves-header" onclick={() => { onToggle(); enemyMovesOpen = !enemyMovesOpen; }}>
					<span class="section-header">ENEMY MOVES</span>
					<span class="chevron" class:open={enemyMovesOpen}>
						<BattleIcon icon="chevron" size={10} color="#787878" />
					</span>
				</div>

				{#if enemyMovesOpen}
					<div class="enemy-moves-list" transition:slide={{ duration: 150 }}>
						{#if enemyMoves.length > 0}
							<span class="enemy-mon-label">{battle.enemy.speciesName}</span>
							{#each enemyMoves as { moveId, idx } (idx)}
								<BattleMoveRow
									{moveId}
									pp={battle.enemy.pp[idx]}
									damage={enemyDamage[idx]}
									{showDamage}
									{showAccuracy}
									{showEffLabel}
								/>
							{/each}
						{/if}

						{#if battle.enemy2 && enemy2Moves.length > 0}
							<span class="enemy-mon-label">{battle.enemy2.speciesName}</span>
							{#each enemy2Moves as { moveId, idx } (idx)}
								<BattleMoveRow
									{moveId}
									pp={battle.enemy2.pp[idx]}
									damage={enemy2Damage[idx]}
									{showDamage}
									{showAccuracy}
									{showEffLabel}
								/>
							{/each}
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style>
	.battle-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		overflow-y: auto;
		height: 100%;
		padding-bottom: 10px;
	}

	.catch-section {
		margin: 0 8px;
	}

	.enemy-row {
		padding: 0 8px;
	}

	.enemy-row.doubles {
		display: flex;
		gap: 6px;
	}

	.enemy-half {
		flex: 1;
		min-width: 0;
	}

	.moves-section {
		margin: 0 8px;
		background: var(--surface);
		border: 2px solid var(--border);
		border-radius: var(--card-radius);
		box-shadow: var(--card-shadow);
	}

	.moves-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5px;
		padding: 7px;
		border-top: 1px solid var(--divider);
	}

	.moves-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 7px 10px;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		min-height: 40px;
	}

	.section-header-content {
		display: flex;
		align-items: center;
		gap: 6px;
		flex: 1;
		min-width: 0;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}

	.header-icon {
		width: 30px;
		height: 30px;
		image-rendering: pixelated;
		flex-shrink: 0;
	}

	.species-name {
		font-family: "PokemonGB", monospace;
		font-size: 12px;
		font-weight: bold;
		color: var(--text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.species-name.player {
		color: var(--player-color);
	}

	.header-level {
		font-family: "PokemonGB", monospace;
		font-size: 9px;
		color: var(--border);
		white-space: nowrap;
	}

	.header-badges {
		display: flex;
		align-items: center;
		gap: 3px;
		flex-shrink: 0;
	}

	.section-header {
		font-family: "PokemonGB", monospace;
		font-size: 9px;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.chevron {
		transition: transform 0.15s ease;
		display: inline-flex;
	}

	.chevron.open {
		transform: rotate(180deg);
	}

	.enemy-moves-section {
		background: var(--surface);
		border: 2px solid var(--border);
		border-radius: var(--card-radius);
		box-shadow: var(--card-shadow);
		margin: 0 8px;
		margin-bottom: 8px;
	}

	.enemy-moves-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 7px 10px;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		min-height: 40px;
	}

	.enemy-moves-list {
		padding: 0 0 8px;
		border-top: 1px solid var(--divider);
	}

	.enemy-mon-label {
		font-family: "PokemonGB", monospace;
		font-size: 9px;
		color: var(--enemy-color);
		padding: 6px 10px 2px;
		display: block;
	}

	.player-stages {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		padding: 4px 10px 6px;
		border-top: 1px solid var(--divider);
	}

	.stage-item {
		display: inline-flex;
		align-items: center;
		gap: 1px;
		font-size: 10px;
		color: var(--text);
		font-weight: bold;
	}

	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #fff;
		font-family: "PokemonGB", monospace;
		font-size: 11px;
	}
</style>
