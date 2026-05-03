<script lang="ts">
  export let label = "OK";
</script>

{#if label !== "OK"}
  <span class="status-badge">{label}</span>
{/if}
