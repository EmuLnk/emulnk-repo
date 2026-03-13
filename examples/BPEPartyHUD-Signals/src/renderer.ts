import type { Pokemon, BPESettings } from "./types.js";
import { NATURE_STAT_NAMES, MOVES } from "./data.js";

export function getHpColor(pct: number): string {
  if (pct > 0.5) return "var(--hp-full)";
  if (pct > 0.2) return "var(--hp-mid)";
  return "var(--hp-low)";
}

interface StatDef {
  key: keyof Pokemon;
  label: string;
  natIdx: number;
}

const STAT_DEFS: StatDef[] = [
  { key: "atk", label: "ATK", natIdx: 0 },
  { key: "def", label: "DEF", natIdx: 1 },
  { key: "spatk", label: "SPA", natIdx: 3 },
  { key: "spdef", label: "SPD", natIdx: 4 },
  { key: "speed", label: "SPE", natIdx: 2 },
];

/** Render the detail panel for the selected Pokemon. */
export function renderDetail(
  mon: Pokemon | null,
  partyCount: number,
  settings: BPESettings,
): void {
  const detail = document.getElementById("poke-detail")!;
  const empty = document.getElementById("empty-state")!;

  if (partyCount === 0 || !mon) {
    detail.style.display = "none";
    empty.style.display = "flex";
    empty.textContent = partyCount === 0 ? "No Pokemon in party" : "Empty slot";
    return;
  }

  detail.style.display = "block";
  empty.style.display = "none";

  // Name + Level
  document.getElementById("d-name")!.textContent = mon.isEgg ? "Egg" : mon.speciesName;
  document.getElementById("d-level")!.textContent = mon.isEgg ? "" : "Lv." + mon.level;

  // Nature
  const nat = mon.nature;
  const natureLine = document.getElementById("d-nature")!;
  natureLine.textContent = "";
  if (nat.p >= 0) {
    // Safe: NATURE_STAT_NAMES values are hardcoded string constants from data.ts
    natureLine.innerHTML = nat.name +
      ' (<span class="boost">+' + NATURE_STAT_NAMES[nat.p] + "</span>" +
      ' <span class="nerf">-' + NATURE_STAT_NAMES[nat.m] + "</span>)";
  } else {
    natureLine.textContent = nat.name + " (Neutral)";
  }

  // HP bar
  const hpPct = mon.maxhp > 0 ? mon.hp / mon.maxhp : 0;
  document.getElementById("d-hp-text")!.textContent = mon.hp + " / " + mon.maxhp;
  const hpBar = document.getElementById("d-hp-bar")! as HTMLElement;
  hpBar.style.width = (hpPct * 100).toFixed(1) + "%";
  hpBar.style.backgroundColor = getHpColor(hpPct);

  // Stats - all values are numeric from binary game memory, not user input
  const statsEl = document.getElementById("d-stats")!;
  const maxStat = Math.max(1, ...STAT_DEFS.map((s) => mon[s.key] as number));

  statsEl.innerHTML = STAT_DEFS.map((sd) => {
    const val = mon[sd.key] as number;
    const pct = (val / maxStat * 100).toFixed(1);

    let color = "var(--stat-bar)";
    if (nat.p >= 0 && sd.natIdx === nat.p) color = "var(--stat-boost)";
    if (nat.m >= 0 && sd.natIdx === nat.m) color = "var(--stat-nerf)";

    let labelColor = "";
    if (nat.p >= 0 && sd.natIdx === nat.p) labelColor = ' style="color:var(--stat-boost)"';
    if (nat.m >= 0 && sd.natIdx === nat.m) labelColor = ' style="color:var(--stat-nerf)"';

    return "<div class=\"stat-label\"" + labelColor + ">" + sd.label + "</div>" +
      "<div class=\"stat-bar-bg\"><div class=\"stat-bar-fill\" style=\"width:" + pct + "%;background:" + color + "\"></div></div>" +
      "<div class=\"stat-val\">" + val + "</div>";
  }).join("");

  // IVs - values are 0-31 integers from binary data
  const ivsSection = document.getElementById("d-ivs-section")!;
  ivsSection.style.display = settings.show_ivs ? "block" : "none";
  if (settings.show_ivs) {
    const ivsEl = document.getElementById("d-ivs")!;
    const ivOrder: (keyof typeof mon.ivs)[] = ["hp", "atk", "def", "spatk", "spdef", "spd"];
    const ivLabels = ["HP", "Atk", "Def", "SpA", "SpD", "Spd"];
    ivsEl.innerHTML = ivLabels.map((l) => '<div class="label">' + l + "</div>").join("") +
      ivOrder.map((k) => {
        const val = mon.ivs[k];
        let cls = "val";
        if (val === 31) cls += " perfect";
        else if (val === 0) cls += " zero";
        return '<div class="' + cls + '">' + val + "</div>";
      }).join("");
  }

  // EVs - values are 0-255 integers from binary data
  const evsSection = document.getElementById("d-evs-section")!;
  evsSection.style.display = settings.show_evs ? "block" : "none";
  if (settings.show_evs) {
    const evsEl = document.getElementById("d-evs")!;
    const evOrder: (keyof typeof mon.evs)[] = ["hp", "atk", "def", "spatk", "spdef", "spd"];
    const evLabels = ["HP", "Atk", "Def", "SpA", "SpD", "Spd"];
    evsEl.innerHTML = evLabels.map((l) => '<div class="label">' + l + "</div>").join("") +
      evOrder.map((k) => {
        const val = mon.evs[k];
        let cls = "val";
        if (val === 252) cls += " perfect";
        else if (val === 0) cls += " zero";
        return '<div class="' + cls + '">' + val + "</div>";
      }).join("");
  }

  // Hidden Power + Friendship
  document.getElementById("d-hp-type")!.textContent =
    mon.hiddenPower.type + " " + mon.hiddenPower.power;
  document.getElementById("d-friendship")!.textContent = String(mon.friendship);

  // Moves - names from static MOVES lookup table
  const movesEl = document.getElementById("d-moves")!;
  movesEl.style.display = settings.show_moves ? "grid" : "none";
  if (settings.show_moves) {
    movesEl.innerHTML = mon.moves.map((m) => {
      const name = MOVES[m] || "\u2014";
      return '<div class="move-slot' + (m === 0 ? " empty" : "") + '">' + name + "</div>";
    }).join("");
  }
}

/** Render the party bar at the bottom of the screen. */
export function renderPartyBar(
  party: (Pokemon | null)[],
  partyCount: number,
  selectedSlot: number,
  onSelect: (idx: number) => void,
): void {
  const bar = document.getElementById("party-bar")!;
  bar.innerHTML = "";
  document.getElementById("party-count-text")!.textContent = partyCount + " / 6";

  for (let i = 0; i < 6; i++) {
    const slot = document.createElement("div");
    slot.className = "party-slot";
    if (i === selectedSlot) slot.classList.add("active");

    const mon = party[i];
    if (!mon || i >= partyCount) {
      slot.classList.add("empty-slot");
      slot.innerHTML = '<div class="mini-name">\u2014</div><div class="mini-level">\u2014</div>' +
        '<div class="mini-hp-bg"><div class="mini-hp-fill"></div></div>';
    } else {
      if (mon.hp === 0 && !mon.isEgg) slot.classList.add("fainted");
      const abbr = mon.isEgg ? "EGG" : mon.speciesName.substring(0, 5).toUpperCase();
      const hpPct = mon.maxhp > 0 ? (mon.hp / mon.maxhp * 100).toFixed(0) : "0";

      slot.innerHTML =
        '<div class="mini-name">' + abbr + "</div>" +
        '<div class="mini-level">' + (mon.isEgg ? "" : "Lv." + mon.level) + "</div>" +
        '<div class="mini-hp-bg"><div class="mini-hp-fill" style="width:' + hpPct + "%;background:" + getHpColor(mon.maxhp > 0 ? mon.hp / mon.maxhp : 0) + '"></div></div>';
    }

    const idx = i;
    slot.addEventListener("click", () => {
      if (idx < partyCount) {
        onSelect(idx);
      }
    });

    bar.appendChild(slot);
  }
}
