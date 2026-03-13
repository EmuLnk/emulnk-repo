<script lang="ts">
  import { state as appState, subscribe } from "./main.js";
  import { NATURE_STAT_NAMES, MOVES } from "./data.js";
  import type { Pokemon } from "./types.js";
  import "./style.scss";

  const STAT_DEFS = [
    { key: "atk", label: "ATK", natIdx: 0 },
    { key: "def", label: "DEF", natIdx: 1 },
    { key: "spatk", label: "SPA", natIdx: 3 },
    { key: "spdef", label: "SPD", natIdx: 4 },
    { key: "speed", label: "SPE", natIdx: 2 },
  ] as const;

  const IV_EV_ORDER: (keyof Pokemon["ivs"])[] = ["hp", "atk", "def", "spatk", "spdef", "spd"];
  const IV_EV_LABELS = ["HP", "Atk", "Def", "SpA", "SpD", "Spd"];

  // Local reactive state driven by main.ts pushes
  let party = $state<(Pokemon | null)[]>([null, null, null, null, null, null]);
  let partyCount = $state(0);
  let selectedSlot = $state(0);
  let showIvs = $state(true);
  let showEvs = $state(true);
  let showMoves = $state(true);
  let offline = $state(false);
  let statusText = $state("Waiting for data...");

  // Sync from shared state object on every push
  function sync() {
    party = [...appState.party];
    partyCount = appState.partyCount;
    selectedSlot = appState.selectedSlot;
    showIvs = appState.settings.show_ivs;
    showEvs = appState.settings.show_evs;
    showMoves = appState.settings.show_moves;
    offline = appState.offline;
    statusText = appState.statusText;
  }

  subscribe(sync);

  let mon = $derived(party[selectedSlot] ?? null);
  let hasParty = $derived(partyCount > 0 && mon !== null);

  function getHpColor(pct: number): string {
    if (pct > 0.5) return "var(--hp-full)";
    if (pct > 0.2) return "var(--hp-mid)";
    return "var(--hp-low)";
  }

  function hpPct(m: Pokemon): number {
    return m.maxhp > 0 ? m.hp / m.maxhp : 0;
  }

  function maxStat(m: Pokemon): number {
    return Math.max(1, ...STAT_DEFS.map((s) => m[s.key] as number));
  }

  function statColor(m: Pokemon, natIdx: number): string {
    if (m.nature.p >= 0 && natIdx === m.nature.p) return "var(--stat-boost)";
    if (m.nature.m >= 0 && natIdx === m.nature.m) return "var(--stat-nerf)";
    return "var(--stat-bar)";
  }

  function statLabelColor(m: Pokemon, natIdx: number): string | undefined {
    if (m.nature.p >= 0 && natIdx === m.nature.p) return "color:var(--stat-boost)";
    if (m.nature.m >= 0 && natIdx === m.nature.m) return "color:var(--stat-nerf)";
    return undefined;
  }

  function ivClass(val: number): string {
    if (val === 31) return "val perfect";
    if (val === 0) return "val zero";
    return "val";
  }

  function evClass(val: number): string {
    if (val === 252) return "val perfect";
    if (val === 0) return "val zero";
    return "val";
  }

  function selectSlot(idx: number) {
    if (idx < partyCount) {
      selectedSlot = idx;
      appState.selectedSlot = idx;
    }
  }

  function slotAbbr(m: Pokemon): string {
    return m.isEgg ? "EGG" : m.speciesName.substring(0, 5).toUpperCase();
  }
</script>

<div class:offline>
  <div id="header">
    <span class="title">Pokemon Emerald</span>
    <span class="party-count">{partyCount} / 6</span>
  </div>

  <div id="detail">
    {#if !hasParty}
      <div class="empty-state">
        {partyCount === 0 ? "No Pokemon in party" : "Empty slot"}
      </div>
    {:else if mon}
      <div class="poke-name-row">
        <span class="poke-name">{mon.isEgg ? "Egg" : mon.speciesName}</span>
        <span class="poke-level">{mon.isEgg ? "" : "Lv." + mon.level}</span>
      </div>

      <div class="nature-line">
        {#if mon.nature.p >= 0}
          {mon.nature.name} (<span class="boost">+{NATURE_STAT_NAMES[mon.nature.p]}</span> <span class="nerf">-{NATURE_STAT_NAMES[mon.nature.m]}</span>)
        {:else}
          {mon.nature.name} (Neutral)
        {/if}
      </div>

      <div class="hp-section">
        <div class="hp-label">
          <span>HP</span>
          <span>{mon.hp} / {mon.maxhp}</span>
        </div>
        <div class="hp-bar-bg">
          <div
            class="hp-bar-fill"
            style="width:{(hpPct(mon) * 100).toFixed(1)}%;background-color:{getHpColor(hpPct(mon))}"
          ></div>
        </div>
      </div>

      <div class="stats-grid">
        {#each STAT_DEFS as sd}
          {@const val = mon[sd.key] as number}
          {@const pct = (val / maxStat(mon) * 100).toFixed(1)}
          <div class="stat-label" style={statLabelColor(mon, sd.natIdx)}>{sd.label}</div>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill" style="width:{pct}%;background:{statColor(mon, sd.natIdx)}"></div>
          </div>
          <div class="stat-val">{val}</div>
        {/each}
      </div>

      {#if showIvs}
        <div class="iv-ev-section">
          <div class="iv-ev-header">IVs</div>
          <div class="iv-ev-grid">
            {#each IV_EV_LABELS as label}
              <div class="label">{label}</div>
            {/each}
            {#each IV_EV_ORDER as key}
              <div class={ivClass(mon.ivs[key])}>{mon.ivs[key]}</div>
            {/each}
          </div>
        </div>
      {/if}

      {#if showEvs}
        <div class="iv-ev-section">
          <div class="iv-ev-header">EVs</div>
          <div class="iv-ev-grid">
            {#each IV_EV_LABELS as label}
              <div class="label">{label}</div>
            {/each}
            {#each IV_EV_ORDER as key}
              <div class={evClass(mon.evs[key])}>{mon.evs[key]}</div>
            {/each}
          </div>
        </div>
      {/if}

      <div class="hp-type-row">
        <span>
          <span class="label">Hidden Power: </span>
          <span class="value">{mon.hiddenPower.type} {mon.hiddenPower.power}</span>
        </span>
        <span>
          <span class="label">Friendship: </span>
          <span class="value">{mon.friendship}</span>
        </span>
      </div>

      {#if showMoves}
        <div class="moves-grid">
          {#each mon.moves as m}
            <div class="move-slot" class:empty={m === 0}>{MOVES[m] || "\u2014"}</div>
          {/each}
        </div>
      {/if}
    {/if}
  </div>

  <div id="party-bar">
    {#each Array(6) as _, i}
      {@const slotMon = party[i]}
      <div
        class="party-slot"
        class:active={i === selectedSlot}
        class:fainted={slotMon !== null && i < partyCount && slotMon.hp === 0 && !slotMon.isEgg}
        class:empty-slot={!slotMon || i >= partyCount}
        role="button"
        tabindex="0"
        onclick={() => selectSlot(i)}
        onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") selectSlot(i); }}
      >
        {#if slotMon && i < partyCount}
          <div class="mini-name">{slotAbbr(slotMon)}</div>
          <div class="mini-level">{slotMon.isEgg ? "" : "Lv." + slotMon.level}</div>
          <div class="mini-hp-bg">
            <div
              class="mini-hp-fill"
              style="width:{(hpPct(slotMon) * 100).toFixed(0)}%;background:{getHpColor(hpPct(slotMon))}"
            ></div>
          </div>
        {:else}
          <div class="mini-name">{"\u2014"}</div>
          <div class="mini-level">{"\u2014"}</div>
          <div class="mini-hp-bg"><div class="mini-hp-fill"></div></div>
        {/if}
      </div>
    {/each}
  </div>

  <div id="status">{statusText}</div>
</div>
