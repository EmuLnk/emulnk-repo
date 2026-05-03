<script lang="ts">
  import { typeToken } from "../format.js";

  export let name = "???";

  $: token = typeToken(name);
</script>

<span class={`type-badge type-${token}`}>{name.slice(0, 3).toUpperCase()}</span>
