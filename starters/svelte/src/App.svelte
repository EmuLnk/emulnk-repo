<script lang="ts">
  import { appState } from "./state.svelte.js";

  let infoText = $derived(JSON.stringify(appState.values, null, 2));
</script>

{#if !appState.isConnected}
  <div class="offline-banner">
    <p>Emulator disconnected</p>
  </div>
{:else}
  <div class="content">
    <h1>{appState.values.gameTitle ?? "Unknown"}</h1>
    <pre>{infoText}</pre>
  </div>
{/if}
