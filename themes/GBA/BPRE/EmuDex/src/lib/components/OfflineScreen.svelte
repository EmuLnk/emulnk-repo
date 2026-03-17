<script lang="ts">
	let {} = $props();
</script>

<div class="offline-screen">
	<div class="frame">
		<div class="indicator"></div>
		<p class="title">Waiting for signal...</p>
		<p class="subtitle">Connect to FireRed via EmuLnk</p>
	</div>
</div>

<style>
	.offline-screen {
		background: var(--red);
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.frame {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		padding: 24px;
	}

	.indicator {
		width: 12px;
		height: 12px;
		background: var(--indicator);
		border-radius: 50%;
		animation: blink 1.5s ease infinite;
	}

	@keyframes blink {
		0%, 100% {
			opacity: 0.3;
		}
		50% {
			opacity: 1;
		}
	}

	.title {
		font-family: "PokemonGB", monospace;
		font-size: 12px;
		color: #ffffff;
		letter-spacing: 1px;
		margin: 0;
	}

	.subtitle {
		font-family: sans-serif;
		font-size: 10px;
		color: #E8C8C0;
		margin: 0;
		margin-top: 12px;
	}
</style>
