<script lang="ts">
  import { appState } from "./state.svelte.js";

  let showDetails = $derived(appState.settings["show-details"] === "true");
  let detailsText = $derived(JSON.stringify(appState.values, null, 2));
</script>

{#if !appState.isConnected}
  <div class="offline-banner">
    <p>Emulator disconnected</p>
  </div>
{:else}
  <div class="content">
    {#if appState.confidence === "FALLBACK"}
      <p class="fallback">Fallback mode</p>
    {/if}
    <h1>Party: {appState.values.party_count ?? 0}</h1>
    <p>Battery: {appState.batteryLevel}%</p>
    {#if showDetails}
      <pre>{detailsText}</pre>
    {/if}
  </div>
{/if}
