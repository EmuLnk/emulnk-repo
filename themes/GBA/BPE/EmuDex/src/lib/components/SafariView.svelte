<script lang="ts">
	import type { SafariState } from "../types.js";
	import iconsUrl from "../../assets/icons.webp";
	import itemsUrl from "../../assets/items.webp";
	import playerBrendanUrl from "../../assets/player-brendan.webp";
	import playerMayUrl from "../../assets/player-may.webp";

	interface Props {
		safari: SafariState;
		currentMapKey: string;
		dexOwned: Set<number>;
		dexSeen: Set<number>;
		playerGender: number;
		onZoneTap: (mapKey: string) => void;
	}

	let { safari, currentMapKey, dexOwned, dexSeen, playerGender, onZoneTap }: Props = $props();

	const SAFARI_BALL_ID = 5;
	const BALL_COL = (SAFARI_BALL_ID - 1) % 20;
	const BALL_ROW = Math.floor((SAFARI_BALL_ID - 1) / 20);

	interface ZoneEntry {
		key: string;
		name: string;
		rares: number[];
		col: number;
		row: number;
	}

	const ZONES: ZoneEntry[] = [
		{ key: "26:0",  name: "NW", rares: [127, 85],  col: 1, row: 1 },
		{ key: "26:1",  name: "N",  rares: [214, 178], col: 2, row: 1 },
		{ key: "26:12", name: "NE", rares: [228, 241], col: 3, row: 1 },
		{ key: "26:2",  name: "SW", rares: [25, 202],  col: 1, row: 2 },
		{ key: "26:3",  name: "S",  rares: [25, 202],  col: 2, row: 2 },
		{ key: "26:13", name: "SE", rares: [234, 207], col: 3, row: 2 },
	];

	let playerIcon = $derived(playerGender === 1 ? playerMayUrl : playerBrendanUrl);
	let stepsPercent = $derived(Math.round((safari.stepsLeft / 500) * 100));
	let ballsPercent = $derived(Math.round((safari.ballsLeft / 30) * 100));
	let dotBgImage = `url(${itemsUrl})`;
	let dotBgPos = `${BALL_COL * -12}px ${BALL_ROW * -12}px`;

	function resourceColor(pct: number): string {
		if (pct > 60) return '#48B048';
		if (pct > 30) return '#E8C838';
		if (pct > 15) return '#D08020';
		return '#C03028';
	}

	let stepsColor = $derived(resourceColor(stepsPercent));
	let ballsColor = $derived(resourceColor(ballsPercent));

	function rareStatus(sp: number): 'caught' | 'seen' | 'unseen' {
		if (dexOwned.has(sp)) return 'caught';
		if (dexSeen.has(sp)) return 'seen';
		return 'unseen';
	}
</script>

<div class="view">
	<!-- Balls -->
	<div class="counter-row">
		<div
			class="ball-icon"
			style:background-image="url({itemsUrl})"
			style:background-size="480px auto"
			style:background-position="{BALL_COL * -24}px {BALL_ROW * -24}px"
		></div>
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
		<span class="counter-num" style:color={ballsColor}>{safari.ballsLeft}</span>
	</div>

	<!-- Safari Zone Map -->
	<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
	<div class="map-card">
		<div class="terrain">
			{#each ZONES as zone (zone.key)}
				<div
					class="zone-tile"
					class:current={currentMapKey === zone.key}
					style:grid-column={zone.col}
					style:grid-row={zone.row}
					onclick={() => onZoneTap(zone.key)}
				>
					{#if currentMapKey === zone.key}
						<img class="player-icon" src={playerIcon} alt="You" />
					{/if}
					<div class="zone-name">{zone.name}</div>
					<div class="zone-rares">
						{#each zone.rares as sp}
							<div
								class="rare"
								class:caught={rareStatus(sp) === 'caught'}
								class:seen={rareStatus(sp) === 'seen'}
								style:background-image="url({iconsUrl})"
								style:background-size="640px auto"
								style:background-position="{(sp - 1) % 20 * -32}px {Math.floor((sp - 1) / 20) * -32}px"
							></div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Steps -->
	<div class="steps-row">
		<svg class="steps-icon" viewBox="0 -960 960 960">
			<path d="M260-920q85 0 132.5 75.5T440-680q0 41-8.5 78T412-536l-285 57q-15-29-31-80.5T80-680q0-103 51-171.5T260-920Zm55 680q-71 0-110.5-49.5T160-404l258-52q8 17 15 38.5t7 44.5q0 57-35.5 95T315-240Zm385-480q78 0 129 68.5T880-480q0 69-16 120.5T833-279l-285-57q-11-29-19.5-66t-8.5-78q0-89 47.5-164.5T700-720ZM645-40q-54 0-89.5-38T520-173q0-23 7-44.5t15-38.5l257 52q-5 65-44 114.5T645-40Z"/>
		</svg>
		<div class="steps-bar">
			<div class="steps-fill" style:width="{stepsPercent}%" style:background={stepsColor}></div>
		</div>
		<span class="steps-num" style:color={stepsColor}>{safari.stepsLeft}</span>
	</div>
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
		gap: 6px;
		overflow: hidden;
	}

	.counter-row {
		display: flex;
		align-items: center;
		gap: 6px;
		background: var(--surface);
		border-radius: var(--card-radius);
		padding: 5px 10px;
	}

	.ball-icon {
		width: 24px;
		height: 24px;
		image-rendering: pixelated;
		flex-shrink: 0;
	}

	.ball-dots { display: flex; flex-wrap: wrap; gap: 2px; flex: 1; }

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		image-rendering: pixelated;
	}

	.dot:not(.filled) {
		background: var(--surface-dim);
		border: 1px solid var(--border-inner);
	}

	.counter-num { font-size: 12px; font-weight: bold; flex-shrink: 0; }

	.map-card {
		flex: 1;
		min-height: 0;
		background: var(--surface);
		border-radius: var(--card-radius);
		padding: 6px;
		display: flex;
		align-items: stretch;
	}

	.terrain {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 4px;
		width: 100%;
		image-rendering: pixelated;
	}

	.zone-tile {
		background: #48903A;
		border-radius: 6px;
		border: 2px solid #2D5A1E;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
		cursor: pointer;
		position: relative;
		-webkit-tap-highlight-color: transparent;
		transition: border-color 0.15s;
	}

	.zone-tile:active { filter: brightness(0.9); }

	.zone-tile.current {
		border-color: #F8D030;
		box-shadow: 0 0 8px rgba(248, 208, 48, 0.5);
	}

	.zone-name {
		font-size: 10px;
		color: #F8F0E0;
		font-weight: bold;
		text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
	}

	.zone-rares { display: flex; gap: 2px; }

	.rare {
		width: 32px;
		height: 32px;
		image-rendering: pixelated;
		filter: brightness(0) invert(1) opacity(0.35);
	}

	.rare.caught { filter: none; }
	.rare.seen { filter: brightness(0.6) sepia(1) saturate(3) hue-rotate(180deg) opacity(0.7); }

	.player-icon {
		width: 24px;
		height: 24px;
		image-rendering: pixelated;
		position: absolute;
		top: 2px;
		right: 2px;
	}

	.steps-row {
		display: flex;
		align-items: center;
		gap: 8px;
		background: var(--surface);
		border-radius: var(--card-radius);
		padding: 5px 10px;
	}

	.steps-icon {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		fill: var(--text-muted);
	}

	.steps-bar {
		flex: 1;
		height: 6px;
		background: var(--surface-alt);
		border-radius: 3px;
		overflow: hidden;
	}

	.steps-fill {
		height: 100%;
		border-radius: 3px;
		transition: width 0.3s ease, background 0.3s ease;
	}

	.steps-num { font-size: 10px; font-weight: bold; flex-shrink: 0; }
</style>
