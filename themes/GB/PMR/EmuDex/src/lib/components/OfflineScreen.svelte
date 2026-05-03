<script lang="ts">
  import type { Gen1GameVersion } from "../encounter-data.generated.js";

  export let gameVersion: Gen1GameVersion = "red";

  $: title = gameVersion === "blue" ? "POKeMON BLUE" : "POKeMON RED";
</script>

<section class="offline-screen">
  <div class="gb-window offline-window">
    <div class="signal-dot"></div>
    <h1>{title}</h1>
    <p>WAITING FOR LINK...</p>
  </div>
</section>
