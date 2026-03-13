import { LitElement, html, css, nothing } from "lit";
import { property, customElement } from "lit/decorators.js";
import type { Pokemon, BPESettings } from "./types.js";
import { NATURE_STAT_NAMES, MOVES } from "./data.js";

function getHpColor(pct: number): string {
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

@customElement("party-hud")
export class PartyHud extends LitElement {
  @property({ type: Array })
  party: (Pokemon | null)[] = [null, null, null, null, null, null];

  @property({ type: Number })
  partyCount = 0;

  @property({ type: Number })
  selectedSlot = 0;

  @property({ type: Object })
  settings: BPESettings = { show_ivs: true, show_evs: true, show_moves: true };

  @property({ type: Boolean })
  offline = false;

  @property({ type: String })
  statusText = "Waiting...";

  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      color: var(--text);
      font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px 6px;
      flex-shrink: 0;
    }

    .title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--accent);
    }

    .party-count {
      font-size: 13px;
      color: var(--text-dim);
      font-variant-numeric: tabular-nums;
    }

    .detail {
      flex: 1;
      overflow-y: auto;
      padding: 0 12px 8px;
      -webkit-overflow-scrolling: touch;
    }

    .poke-name-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }

    .poke-name {
      font-size: 20px;
      font-weight: 700;
      color: var(--text-bright);
    }

    .poke-level {
      font-size: 15px;
      color: var(--text-dim);
      font-weight: 600;
    }

    .nature-line {
      font-size: 12px;
      color: var(--text-dim);
      margin-bottom: 8px;
    }

    .boost { color: var(--stat-boost); }
    .nerf { color: var(--stat-nerf); }

    .hp-section {
      margin-bottom: 10px;
    }

    .hp-label {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text-dim);
      margin-bottom: 3px;
    }

    .hp-bar-bg {
      width: 100%;
      height: 18px;
      background: var(--hp-bg);
      border-radius: 9px;
      overflow: hidden;
    }

    .hp-bar-fill {
      height: 100%;
      border-radius: 9px;
      transition: width 0.3s ease, background-color 0.3s ease;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 42px 1fr 36px;
      gap: 4px 8px;
      align-items: center;
      margin-bottom: 10px;
    }

    .stat-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-bar-bg {
      height: 14px;
      background: var(--hp-bg);
      border-radius: 7px;
      overflow: hidden;
    }

    .stat-bar-fill {
      height: 100%;
      border-radius: 7px;
      transition: width 0.3s ease;
      background: var(--stat-bar);
    }

    .stat-val {
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      text-align: right;
      color: var(--text);
    }

    .iv-ev-section {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--border-radius);
      padding: 8px 10px;
      margin-bottom: 8px;
    }

    .iv-ev-header {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--accent);
      margin-bottom: 4px;
    }

    .iv-ev-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 2px;
      text-align: center;
    }

    .iv-ev-grid .label {
      font-size: 9px;
      color: var(--text-dim);
      text-transform: uppercase;
    }

    .iv-ev-grid .val {
      font-size: 13px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .iv-ev-grid .val.perfect { color: var(--accent); }
    .iv-ev-grid .val.zero { color: var(--stat-nerf); }

    .hp-type-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      margin-bottom: 8px;
      padding: 0 2px;
    }

    .hp-type-row .label { color: var(--text-dim); }
    .hp-type-row .value { font-weight: 600; }

    .moves-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
      margin-bottom: 8px;
    }

    .move-slot {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 6px 8px;
      font-size: 12px;
      font-weight: 500;
    }

    .move-slot.empty {
      color: var(--text-dim);
      border-color: transparent;
    }

    .party-bar {
      display: flex;
      gap: 6px;
      padding: 8px 12px 12px;
      flex-shrink: 0;
      overflow-x: auto;
    }

    .party-slot {
      flex: 1;
      min-width: 52px;
      background: var(--card-bg);
      border: 2px solid transparent;
      border-radius: 8px;
      padding: 6px 4px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.15s ease;
    }

    .party-slot.active {
      border-color: var(--accent);
    }

    .party-slot.fainted {
      opacity: 0.4;
    }

    .party-slot.empty-slot {
      opacity: 0.15;
      pointer-events: none;
    }

    .mini-name {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .mini-level {
      font-size: 10px;
      color: var(--text-dim);
    }

    .mini-hp-bg {
      width: 100%;
      height: 4px;
      background: var(--hp-bg);
      border-radius: 2px;
      margin-top: 3px;
      overflow: hidden;
    }

    .mini-hp-fill {
      height: 100%;
      border-radius: 2px;
    }

    .status {
      text-align: center;
      font-size: 11px;
      color: var(--text-dim);
      padding: 0 0 6px;
      flex-shrink: 0;
    }

    .status.offline-status {
      color: var(--hp-low);
    }

    .empty-state {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--text-dim);
      font-size: 14px;
    }
  `;

  private _selectSlot(idx: number): void {
    if (idx < this.partyCount) {
      this.selectedSlot = idx;
    }
  }

  private _renderNature(mon: Pokemon) {
    const nat = mon.nature;
    if (nat.p >= 0) {
      return html`${nat.name} (<span class="boost">+${NATURE_STAT_NAMES[nat.p]}</span> <span class="nerf">-${NATURE_STAT_NAMES[nat.m]}</span>)`;
    }
    return html`${nat.name} (Neutral)`;
  }

  private _renderStats(mon: Pokemon) {
    const maxStat = Math.max(1, ...STAT_DEFS.map((s) => mon[s.key] as number));
    const nat = mon.nature;

    return STAT_DEFS.map((sd) => {
      const val = mon[sd.key] as number;
      const pct = (val / maxStat * 100).toFixed(1);

      let barColor = "var(--stat-bar)";
      if (nat.p >= 0 && sd.natIdx === nat.p) barColor = "var(--stat-boost)";
      if (nat.m >= 0 && sd.natIdx === nat.m) barColor = "var(--stat-nerf)";

      let labelColor = "";
      if (nat.p >= 0 && sd.natIdx === nat.p) labelColor = "color:var(--stat-boost)";
      if (nat.m >= 0 && sd.natIdx === nat.m) labelColor = "color:var(--stat-nerf)";

      return html`
        <div class="stat-label" style=${labelColor}>${sd.label}</div>
        <div class="stat-bar-bg">
          <div class="stat-bar-fill" style="width:${pct}%;background:${barColor}"></div>
        </div>
        <div class="stat-val">${val}</div>
      `;
    });
  }

  private _renderIVs(mon: Pokemon) {
    if (!this.settings.show_ivs) return nothing;
    const ivOrder: (keyof typeof mon.ivs)[] = ["hp", "atk", "def", "spatk", "spdef", "spd"];
    const ivLabels = ["HP", "Atk", "Def", "SpA", "SpD", "Spd"];

    return html`
      <div class="iv-ev-section">
        <div class="iv-ev-header">IVs</div>
        <div class="iv-ev-grid">
          ${ivLabels.map((l) => html`<div class="label">${l}</div>`)}
          ${ivOrder.map((k) => {
            const val = mon.ivs[k];
            const cls = val === 31 ? "val perfect" : val === 0 ? "val zero" : "val";
            return html`<div class=${cls}>${val}</div>`;
          })}
        </div>
      </div>
    `;
  }

  private _renderEVs(mon: Pokemon) {
    if (!this.settings.show_evs) return nothing;
    const evOrder: (keyof typeof mon.evs)[] = ["hp", "atk", "def", "spatk", "spdef", "spd"];
    const evLabels = ["HP", "Atk", "Def", "SpA", "SpD", "Spd"];

    return html`
      <div class="iv-ev-section">
        <div class="iv-ev-header">EVs</div>
        <div class="iv-ev-grid">
          ${evLabels.map((l) => html`<div class="label">${l}</div>`)}
          ${evOrder.map((k) => {
            const val = mon.evs[k];
            const cls = val === 252 ? "val perfect" : val === 0 ? "val zero" : "val";
            return html`<div class=${cls}>${val}</div>`;
          })}
        </div>
      </div>
    `;
  }

  private _renderMoves(mon: Pokemon) {
    if (!this.settings.show_moves) return nothing;
    return html`
      <div class="moves-grid">
        ${mon.moves.map((m) => {
          const name = MOVES[m] || "\u2014";
          return html`<div class="move-slot ${m === 0 ? "empty" : ""}">${name}</div>`;
        })}
      </div>
    `;
  }

  private _renderDetail() {
    const mon = this.party[this.selectedSlot] ?? null;

    if (this.partyCount === 0 || !mon) {
      const msg = this.partyCount === 0 ? "No Pokemon in party" : "Empty slot";
      return html`<div class="empty-state">${msg}</div>`;
    }

    const hpPct = mon.maxhp > 0 ? mon.hp / mon.maxhp : 0;
    const hpColor = getHpColor(hpPct);

    return html`
      <div class="poke-name-row">
        <div class="poke-name">${mon.isEgg ? "Egg" : mon.speciesName}</div>
        <div class="poke-level">${mon.isEgg ? "" : "Lv." + mon.level}</div>
      </div>

      <div class="nature-line">${this._renderNature(mon)}</div>

      <div class="hp-section">
        <div class="hp-label">
          <span>HP</span>
          <span>${mon.hp} / ${mon.maxhp}</span>
        </div>
        <div class="hp-bar-bg">
          <div class="hp-bar-fill" style="width:${(hpPct * 100).toFixed(1)}%;background-color:${hpColor}"></div>
        </div>
      </div>

      <div class="stats-grid">
        ${this._renderStats(mon)}
      </div>

      ${this._renderIVs(mon)}
      ${this._renderEVs(mon)}

      <div class="hp-type-row">
        <span><span class="label">Hidden Power: </span><span class="value">${mon.hiddenPower.type} ${mon.hiddenPower.power}</span></span>
        <span><span class="label">Friendship: </span><span class="value">${mon.friendship}</span></span>
      </div>

      ${this._renderMoves(mon)}
    `;
  }

  private _renderPartyBar() {
    const slots = [];
    for (let i = 0; i < 6; i++) {
      const mon = this.party[i];
      const isActive = i === this.selectedSlot;
      const isEmpty = !mon || i >= this.partyCount;
      const isFainted = mon && !mon.isEgg && mon.hp === 0 && !isEmpty;

      let cls = "party-slot";
      if (isActive) cls += " active";
      if (isEmpty) cls += " empty-slot";
      if (isFainted) cls += " fainted";

      if (isEmpty) {
        slots.push(html`
          <div class=${cls}>
            <div class="mini-name">\u2014</div>
            <div class="mini-level">\u2014</div>
            <div class="mini-hp-bg"><div class="mini-hp-fill"></div></div>
          </div>
        `);
      } else {
        const m = mon!;
        const abbr = m.isEgg ? "EGG" : m.speciesName.substring(0, 5).toUpperCase();
        const hpPct = m.maxhp > 0 ? (m.hp / m.maxhp * 100).toFixed(0) : "0";
        const hpColor = getHpColor(m.maxhp > 0 ? m.hp / m.maxhp : 0);
        const idx = i;

        slots.push(html`
          <div class=${cls} @click=${() => this._selectSlot(idx)}>
            <div class="mini-name">${abbr}</div>
            <div class="mini-level">${m.isEgg ? "" : "Lv." + m.level}</div>
            <div class="mini-hp-bg">
              <div class="mini-hp-fill" style="width:${hpPct}%;background:${hpColor}"></div>
            </div>
          </div>
        `);
      }
    }
    return slots;
  }

  override render() {
    return html`
      <div class="header">
        <div class="title">Pokemon Emerald</div>
        <div class="party-count">${this.partyCount} / 6</div>
      </div>

      <div class="detail">
        ${this._renderDetail()}
      </div>

      <div class="party-bar">
        ${this._renderPartyBar()}
      </div>

      <div class="status ${this.offline ? "offline-status" : ""}">
        ${this.statusText}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "party-hud": PartyHud;
  }
}
