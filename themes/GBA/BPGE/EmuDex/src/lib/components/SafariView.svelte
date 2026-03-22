<script lang="ts">
	import type { SafariState } from "../types.js";
	import iconsUrl from "../../assets/icons.webp";
	import itemsUrl from "../../assets/items.webp";
	import playerRedUrl from "../../assets/player-red.webp";
	import playerLeafUrl from "../../assets/player-leaf.webp";

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
		{ key: "1:65", name: "North",  rares: [128, 113, 49], col: 3, row: 1 },
		{ key: "1:66", name: "West",   rares: [115, 128, 49], col: 1, row: 2 },
		{ key: "1:63", name: "Center", rares: [113, 123, 47], col: 3, row: 2 },
		{ key: "1:64", name: "East",   rares: [115, 123, 47], col: 5, row: 2 },
	];

	let playerIcon = $derived(playerGender === 1 ? playerLeafUrl : playerRedUrl);
	let stepsPercent = $derived(Math.round((safari.stepsLeft / 600) * 100));
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
			<!-- Tree tiles -->
			<div class="tile tree" style:grid-column="1" style:grid-row="1"></div>
			<div class="tile tree" style:grid-column="2" style:grid-row="1"></div>
			<div class="tile tree" style:grid-column="4" style:grid-row="1"></div>
			<div class="tile tree" style:grid-column="5" style:grid-row="1"></div>
			<div class="tile tree" style:grid-column="2" style:grid-row="3"></div>
			<div class="tile tree" style:grid-column="4" style:grid-row="3"></div>

			<!-- Path tiles with arrows -->
			<div class="tile path" style:grid-column="2" style:grid-row="2">
				<svg class="path-arrow left" viewBox="0 -960 960 960"><path d="M320-120v-240H120l360-440 360 440H640v240H320Z"/></svg>
			</div>
			<div class="tile path" style:grid-column="4" style:grid-row="2">
				<svg class="path-arrow right" viewBox="0 -960 960 960"><path d="M320-120v-240H120l360-440 360 440H640v240H320Z"/></svg>
			</div>
			<div class="tile path exit-path" style:grid-column="3" style:grid-row="3">
				<svg class="exit-icon" viewBox="0 -960 960 960"><path d="M120-120v-80h80v-560q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v560h80v80H120Zm160-80h400v-560H280v560Zm120-240q17 0 28.5-11.5T440-480q0-17-11.5-28.5T400-520q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440Z"/></svg>
			</div>

			<!-- Water tiles -->
			<div class="tile water" style:grid-column="1" style:grid-row="3"></div>
			<div class="tile water" style:grid-column="5" style:grid-row="3"></div>

			<!-- Zone tiles -->
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
		grid-template-columns: 1fr 1fr 2.5fr 1fr 1fr;
		grid-template-rows: 2fr 2fr 1fr;
		gap: 2px;
		width: 100%;
		image-rendering: pixelated;
	}

	.tile { border-radius: 2px; }

	.tile.tree {
		background: #2D5A1E;
		background-image:
			radial-gradient(circle at 30% 40%, #3A7028 3px, transparent 3px),
			radial-gradient(circle at 70% 60%, #3A7028 2px, transparent 2px),
			radial-gradient(circle at 50% 20%, #326824 2px, transparent 2px);
	}

	.tile.path {
		background: #B0885C;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tile.water {
		background: #3088C8;
		background-image:
			repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 5px);
	}

	.path-arrow {
		width: 24px;
		height: 24px;
		fill: rgba(255,255,255,0.6);
		filter: drop-shadow(1px 1px 0 rgba(0,0,0,0.3));
	}

	.path-arrow.left { transform: rotate(-90deg); }
	.path-arrow.right { transform: rotate(90deg); }

	.exit-path { flex-direction: column; gap: 1px; }

	.exit-icon {
		width: 20px;
		height: 20px;
		fill: rgba(255,255,255,0.6);
		filter: drop-shadow(1px 1px 0 rgba(0,0,0,0.3));
	}

	.zone-tile {
		background: #48903A;
		border-radius: 3px;
		border: 2px solid #2D5A1E;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 3px;
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
