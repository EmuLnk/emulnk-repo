<script lang="ts">
  interface GameData {
    gameTitle: string;
    [key: string]: unknown;
  }

  let { isConnected = $bindable(false), values = $bindable({} as GameData), settings = $bindable({} as Record<string, string>) } = $props();

  let infoText = $derived(JSON.stringify(values, null, 2));
</script>

{#if !isConnected}
  <div class="offline-banner">
    <p>Emulator disconnected</p>
  </div>
{:else}
  <div class="content">
    <h1>{values.gameTitle ?? "Unknown"}</h1>
    <pre>{infoText}</pre>
  </div>
{/if}
