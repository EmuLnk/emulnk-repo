<script lang="ts">
	let { hp, maxhp, showValue = true }: { hp: number; maxhp: number; showValue?: boolean } = $props();

	let percentage = $derived(maxhp > 0 ? (hp / maxhp) * 100 : 0);

	let barColor = $derived.by(() => {
		if (percentage > 50) return '#48B048';
		if (percentage >= 25) return '#E8C838';
		return '#E04038';
	});
</script>

<div class="hp-container">
	<div class="hp-bar-outer">
		<div class="hp-bar-inner" style:width="{percentage}%" style:background-color={barColor}></div>
	</div>
	{#if showValue}
		<span class="hp-text">{hp}/{maxhp}</span>
	{/if}
</div>

<style>
	.hp-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1px;
	}

	.hp-bar-outer {
		width: 100%;
		height: 12px;
		border: 2px solid var(--border);
		border-radius: 2px;
		background-color: var(--surface);
		box-sizing: border-box;
		overflow: hidden;
		padding: 1px;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);
	}

	.hp-bar-inner {
		height: 100%;
		border-radius: 1px;
		min-width: 0;
		transition: width 0.4s ease, background-color 0.4s ease;
	}

	.hp-text {
		font-size: 10px;
		color: var(--text-muted);
		font-family: monospace;
		text-align: center;
	}
</style>
