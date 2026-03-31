<script lang="ts">
	import type { BattleState } from "../types.js";
	import TurnOrder from "./TurnOrder.svelte";
	import FieldStatus from "./FieldStatus.svelte";

	let { battle, showField, showTurnOrder = true }: { battle: BattleState; showField: boolean; showTurnOrder?: boolean } = $props();

	let turnMons = $derived.by(() => {
		const result: { mon: any; side: 'player' | 'enemy' | 'partner' }[] = [];
		if (battle.player) result.push({ mon: battle.player, side: 'player' });
		if (battle.enemy) result.push({ mon: battle.enemy, side: 'enemy' });
		if (battle.player2) result.push({ mon: battle.player2, side: 'partner' });
		if (battle.enemy2) result.push({ mon: battle.enemy2, side: 'enemy' });
		return result;
	});
</script>

<div class="info-strip">
	{#if showTurnOrder}
		<div class="strip-main">
			<TurnOrder mons={turnMons} field={battle.field} />
		</div>
	{/if}
	{#if showField}
		<div class="strip-field">
			<FieldStatus field={battle.field} />
		</div>
	{/if}
</div>

<style>
	.info-strip {
		display: flex;
		flex-direction: column;
		padding: 6px 8px;
		background: var(--red-deep);
		gap: 4px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.15);
	}

	.strip-main {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.strip-field {
		display: flex;
		align-items: center;
	}
</style>
