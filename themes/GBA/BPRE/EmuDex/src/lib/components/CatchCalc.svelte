<script lang="ts">
	import { calculateCatchRates, type BallResult } from "../catch-calc.js";
	import type { BagBall } from "../types.js";
	import itemsUrl from "../../assets/items.webp";

	interface Props {
		species: number;
		maxHp: number;
		currentHp: number;
		status: number;
		level: number;
		type1: number;
		type2: number;
		alreadyCaught: boolean;
		bagBalls: BagBall[];
	}

	let { species, maxHp, currentHp, status, level, type1, type2, alreadyCaught, bagBalls }: Props = $props();

	let results: BallResult[] = $derived.by(() => {
		return calculateCatchRates(species, maxHp, currentHp, status, level, type1, type2, alreadyCaught, bagBalls);
	});

	let bestItemId = $derived(results.length > 0 ? results[0].itemId : -1);

	function probColor(probability: number): string {
		if (probability >= 0.5) return '#48B048';
		if (probability >= 0.2) return '#D08020';
		return '#C03028';
	}
</script>

<div class="catch-calc">
	<div class="header">CATCH RATE</div>
	{#if results.length === 0}
		<div class="empty">No Poké Balls in bag</div>
	{:else}
		<div class="grid">
			{#each results as ball (ball.itemId)}
				<div class="ball-cell" class:best={ball.itemId === bestItemId}>
					<div
						class="ball-sprite"
						style:background-image="url({itemsUrl})"
						style:background-size="480px auto"
						style:background-position="{(ball.itemId - 1) % 20 * -24}px {Math.floor((ball.itemId - 1) / 20) * -24}px"
					></div>
					<div class="ball-name">{ball.name}</div>
					<div class="ball-prob" style:color={probColor(ball.probability)}>
						{(ball.probability * 100).toFixed(1)}%
					</div>
					{#if ball.note}
						<div class="ball-note">{ball.note}</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.catch-calc {
		font-family: 'PokemonGB', monospace;
		background: var(--surface);
		border: 2px solid var(--border);
		border-radius: var(--card-radius);
		box-shadow: var(--card-shadow);
		padding: 7px 9px;
	}

	.header {
		font-family: 'PokemonGB', monospace;
		font-size: 9px;
		color: var(--text-muted);
		text-transform: uppercase;
		margin-bottom: 5px;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.header::before {
		content: '';
		width: 3px;
		height: 10px;
		background: var(--red);
		border-radius: 1px;
		flex-shrink: 0;
	}

	.empty {
		font-size: 9px;
		color: var(--text-muted);
		text-align: center;
		padding: 4px 0;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
		gap: 4px;
	}

	.ball-cell {
		background: var(--surface-alt);
		border-radius: 4px;
		padding: 4px 6px;
		text-align: center;
		border: 2px solid transparent;
	}

	.ball-cell.best {
		border-color: var(--player-color, #3060A8);
		box-shadow: 0 0 4px rgba(48, 96, 168, 0.4);
	}

	.ball-sprite {
		width: 24px;
		height: 24px;
		image-rendering: pixelated;
		margin: 0 auto 2px;
	}

	.ball-name {
		font-size: 9px;
		color: var(--border);
	}

	.ball-prob {
		font-size: 11px;
		font-weight: bold;
	}

	.ball-note {
		font-size: 8px;
		color: var(--text-muted);
	}
</style>
