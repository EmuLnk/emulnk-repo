<script lang="ts">
	import type { Pokemon } from "../types.js";
	import PartyCard from "./PartyCard.svelte";
	import DetailView from "./DetailView.svelte";
	import { onCardSelect, onBack } from "../sfx.js";

	interface Props {
		party: (Pokemon | null)[];
		showIvs: boolean;
		showEvs: boolean;
		showNature: boolean;
		showHpType: boolean;
		showItem: boolean;
	}

	let { party, showIvs, showEvs, showNature, showHpType, showItem }: Props = $props();

	let requestedSlot = $state<number | null>(null);

	let selectedSlot = $derived(
		requestedSlot !== null && party[requestedSlot] != null ? requestedSlot : null
	);

	let selectedPokemon = $derived(
		selectedSlot !== null ? party[selectedSlot] ?? null : null
	);

	function selectSlot(index: number) {
		onCardSelect();
		requestedSlot = index;
	}

	function closeDetail() {
		onBack();
		requestedSlot = null;
	}
</script>

<div class="container">
	<div class="panels" class:detail-open={selectedSlot !== null}>
		<div class="panel grid-panel">
			<div class="grid">
				{#each { length: 6 } as _, i (i)}
					<PartyCard
						pokemon={party[i] ?? null}
						slot={i}
						onclick={() => selectSlot(i)}
					/>
				{/each}
			</div>
		</div>

		<div class="panel detail-panel">
			{#if selectedPokemon}
				<DetailView
					pokemon={selectedPokemon}
					{showIvs}
					{showEvs}
					{showNature}
					{showHpType}
					{showItem}
					onback={closeDetail}
				/>
			{/if}
		</div>
	</div>
</div>

<style>
	.container {
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	.panels {
		display: flex;
		width: 200%;
		height: 100%;
		transition: transform 0.25s ease;
		transform: translateX(0);
	}

	.panels.detail-open {
		transform: translateX(-50%);
	}

	.panel {
		width: 50%;
		height: 100%;
		flex-shrink: 0;
	}

	.grid-panel {
		overflow-y: auto;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 8px;
		padding: 8px;
		height: 100%;
	}

	.detail-panel {
		overflow-y: auto;
	}
</style>
