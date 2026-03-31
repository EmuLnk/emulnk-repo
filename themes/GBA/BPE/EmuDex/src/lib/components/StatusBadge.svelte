<script lang="ts">
	interface Props {
		status: number;
	}

	const STATUS_MAP: Record<string, { label: string; color: string; darkText?: boolean }> = {
		SLP: { label: 'SLP', color: '#787878' },
		PSN: { label: 'PSN', color: '#A040A0' },
		BRN: { label: 'BRN', color: '#F08030' },
		FRZ: { label: 'FRZ', color: '#98D8D8', darkText: true },
		PAR: { label: 'PAR', color: '#F8D030', darkText: true },
		TOX: { label: 'TOX', color: '#A040A0' },
	};

	let { status }: Props = $props();

	let decoded = $derived.by(() => {
		if (status === 0) return null;

		const sleepTurns = status & 0x7;
		if (sleepTurns > 0) return STATUS_MAP.SLP;
		if (status & (1 << 3)) return STATUS_MAP.PSN;
		if (status & (1 << 4)) return STATUS_MAP.BRN;
		if (status & (1 << 5)) return STATUS_MAP.FRZ;
		if (status & (1 << 6)) return STATUS_MAP.PAR;
		if (status & (1 << 7)) return STATUS_MAP.TOX;

		return null;
	});
</script>

{#if decoded}
	<span
		class="status-badge"
		style:background-color={decoded.color}
		style:color={decoded.darkText ? '#222' : '#fff'}
	>
		{decoded.label}
	</span>
{/if}

<style>
	.status-badge {
		display: inline-block;
		font-size: 9px;
		font-weight: bold;
		border-radius: 3px;
		padding: 1px 5px;
		line-height: normal;
		vertical-align: middle;
		text-transform: uppercase;
		animation: status-pulse 3s ease-in-out infinite;
	}

	@keyframes status-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.8; }
	}
</style>
