<script lang="ts">
	import type { FieldState } from '../types.js';
	import BattleIcon from './BattleIcon.svelte';

	let { field }: { field: FieldState } = $props();

	const WEATHER_INFO: Record<string, { icon: string; color: string; label: string }> = {
		rain: { icon: 'rain', color: '#6890F0', label: 'Rain' },
		sun: { icon: 'sun', color: '#F8D030', label: 'Sun' },
		sand: { icon: 'sand', color: '#E0C068', label: 'Sand' },
		hail: { icon: 'hail', color: '#98D8D8', label: 'Hail' },
	};

	let weatherInfo = $derived(field.weather !== 'none' ? WEATHER_INFO[field.weather] : null);
	let hasAnything = $derived(
		field.weather !== 'none' ||
		field.playerSide.reflect > 0 || field.playerSide.lightScreen > 0 ||
		field.playerSide.spikes > 0 || field.playerSide.safeguard > 0 ||
		field.enemySide.reflect > 0 || field.enemySide.lightScreen > 0 ||
		field.enemySide.spikes > 0 || field.enemySide.safeguard > 0
	);
</script>

{#if hasAnything}
	<div class="field-status">
		{#if weatherInfo}
			<span class="chip">
				<BattleIcon icon={weatherInfo.icon} size={10} color={weatherInfo.color} />
				<span>{weatherInfo.label}</span>
			</span>
		{/if}
		{#if field.playerSide.reflect > 0}
			<span class="chip player-screen">
				<BattleIcon icon="shield" size={10} color="#F85888" />
				<span>R{field.playerSide.reflect > 1 ? field.playerSide.reflect : ''}</span>
			</span>
		{/if}
		{#if field.playerSide.lightScreen > 0}
			<span class="chip player-screen">
				<BattleIcon icon="shield" size={10} color="#F85888" />
				<span>LS{field.playerSide.lightScreen > 1 ? field.playerSide.lightScreen : ''}</span>
			</span>
		{/if}
		{#if field.enemySide.reflect > 0}
			<span class="chip enemy-screen">
				<BattleIcon icon="shield" size={10} color="#6890F0" />
				<span>E:R{field.enemySide.reflect > 1 ? field.enemySide.reflect : ''}</span>
			</span>
		{/if}
		{#if field.enemySide.lightScreen > 0}
			<span class="chip enemy-screen">
				<BattleIcon icon="shield" size={10} color="#6890F0" />
				<span>E:LS{field.enemySide.lightScreen > 1 ? field.enemySide.lightScreen : ''}</span>
			</span>
		{/if}
		{#if field.playerSide.spikes > 0}
			<span class="chip">
				<BattleIcon icon="spikes" size={10} color="#E0C068" />
				<span>Spk x{field.playerSide.spikes}</span>
			</span>
		{/if}
	</div>
{/if}

<style>
	.field-status {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-wrap: wrap;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		font-family: 'PokemonGB', monospace;
		font-size: 8px;
		color: #fff;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 3px;
		padding: 1px 4px;
		white-space: nowrap;
	}
</style>
