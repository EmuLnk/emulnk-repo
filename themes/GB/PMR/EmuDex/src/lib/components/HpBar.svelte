<script lang="ts">
  import { hpPercent, hpTone } from "../format.js";

  export let hp = 0;
  export let maxhp = 0;
  export let compact = false;

  $: pct = hpPercent({ hp, maxhp });
  $: tone = hpTone({ hp, maxhp });
</script>

<div class:compact class="hp-box">
  <div class="hp-label">
    <span>HP</span>
    <strong>{hp}/{maxhp}</strong>
  </div>
  <div class="hp-meter" class:mid={tone === "mid"} class:low={tone === "low"}>
    <i style={`width:${pct}%`}></i>
  </div>
</div>
