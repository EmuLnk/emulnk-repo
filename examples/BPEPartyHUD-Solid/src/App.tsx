import { Show, For } from "solid-js";
import type { Pokemon, BPESettings } from "./types.js";
import { NATURE_STAT_NAMES, MOVES } from "./data.js";

const STAT_DEFS = [
  { key: "atk" as const, label: "ATK", natIdx: 0 },
  { key: "def" as const, label: "DEF", natIdx: 1 },
  { key: "spatk" as const, label: "SPA", natIdx: 3 },
  { key: "spdef" as const, label: "SPD", natIdx: 4 },
  { key: "speed" as const, label: "SPE", natIdx: 2 },
];

const IV_ORDER = ["hp", "atk", "def", "spatk", "spdef", "spd"] as const;
const IV_LABELS = ["HP", "Atk", "Def", "SpA", "SpD", "Spd"];
const SLOTS = [0, 1, 2, 3, 4, 5];

function getHpColor(pct: number): string {
  if (pct > 0.5) return "var(--hp-full)";
  if (pct > 0.2) return "var(--hp-mid)";
  return "var(--hp-low)";
}

interface AppProps {
  party: (Pokemon | null)[];
  partyCount: number;
  selectedSlot: number;
  settings: BPESettings;
  offline: boolean;
  statusText: string;
  onSelectSlot: (idx: number) => void;
}

export default function App(props: AppProps) {
  const mon = () => props.party[props.selectedSlot] ?? null;

  const hpPct = () => {
    const m = mon();
    return m && m.maxhp > 0 ? m.hp / m.maxhp : 0;
  };

  const maxStat = () => {
    const m = mon();
    if (!m) return 1;
    return Math.max(1, ...STAT_DEFS.map((s) => m[s.key] as number));
  };

  return (
    <div classList={{ offline: props.offline }}>
      <div id="header">
        <div class="title">Pokemon Emerald</div>
        <div class="party-count">{props.partyCount} / 6</div>
      </div>

      <div id="detail">
        <Show when={props.partyCount > 0 && mon()} fallback={
          <div class="empty-state">
            {props.partyCount === 0 ? "No Pokemon in party" : "Empty slot"}
          </div>
        }>
          {(m) => {
            const pokemon = m();
            const nat = pokemon.nature;

            return (
              <>
                {/* Name + Level */}
                <div class="poke-name-row">
                  <div class="poke-name">{pokemon.isEgg ? "Egg" : pokemon.speciesName}</div>
                  <div class="poke-level">{pokemon.isEgg ? "" : "Lv." + pokemon.level}</div>
                </div>

                {/* Nature */}
                <div class="nature-line">
                  <Show when={nat.p >= 0} fallback={<>{nat.name} (Neutral)</>}>
                    {nat.name} (<span class="boost">+{NATURE_STAT_NAMES[nat.p]}</span>{" "}
                    <span class="nerf">-{NATURE_STAT_NAMES[nat.m]}</span>)
                  </Show>
                </div>

                {/* HP bar */}
                <div class="hp-section">
                  <div class="hp-label">
                    <span>HP</span>
                    <span>{pokemon.hp} / {pokemon.maxhp}</span>
                  </div>
                  <div class="hp-bar-bg">
                    <div
                      class="hp-bar-fill"
                      style={{
                        width: (hpPct() * 100).toFixed(1) + "%",
                        "background-color": getHpColor(hpPct()),
                      }}
                    />
                  </div>
                </div>

                {/* Stats grid */}
                <div class="stats-grid">
                  <For each={STAT_DEFS}>
                    {(sd) => {
                      const val = () => pokemon[sd.key] as number;
                      const pct = () => (val() / maxStat() * 100).toFixed(1);
                      const barColor = () => {
                        if (nat.p >= 0 && sd.natIdx === nat.p) return "var(--stat-boost)";
                        if (nat.m >= 0 && sd.natIdx === nat.m) return "var(--stat-nerf)";
                        return "var(--stat-bar)";
                      };
                      const labelColor = () => {
                        if (nat.p >= 0 && sd.natIdx === nat.p) return "var(--stat-boost)";
                        if (nat.m >= 0 && sd.natIdx === nat.m) return "var(--stat-nerf)";
                        return undefined;
                      };

                      return (
                        <>
                          <div class="stat-label" style={{ color: labelColor() }}>{sd.label}</div>
                          <div class="stat-bar-bg">
                            <div
                              class="stat-bar-fill"
                              style={{ width: pct() + "%", background: barColor() }}
                            />
                          </div>
                          <div class="stat-val">{val()}</div>
                        </>
                      );
                    }}
                  </For>
                </div>

                {/* IVs */}
                <Show when={props.settings.show_ivs}>
                  <div class="iv-ev-section">
                    <div class="iv-ev-header">IVs</div>
                    <div class="iv-ev-grid">
                      <For each={IV_LABELS}>{(l) => <div class="label">{l}</div>}</For>
                      <For each={IV_ORDER}>
                        {(k) => {
                          const val = pokemon.ivs[k];
                          return (
                            <div classList={{ val: true, perfect: val === 31, zero: val === 0 }}>
                              {val}
                            </div>
                          );
                        }}
                      </For>
                    </div>
                  </div>
                </Show>

                {/* EVs */}
                <Show when={props.settings.show_evs}>
                  <div class="iv-ev-section">
                    <div class="iv-ev-header">EVs</div>
                    <div class="iv-ev-grid">
                      <For each={IV_LABELS}>{(l) => <div class="label">{l}</div>}</For>
                      <For each={IV_ORDER}>
                        {(k) => {
                          const val = pokemon.evs[k];
                          return (
                            <div classList={{ val: true, perfect: val === 252, zero: val === 0 }}>
                              {val}
                            </div>
                          );
                        }}
                      </For>
                    </div>
                  </div>
                </Show>

                {/* Hidden Power + Friendship */}
                <div class="hp-type-row">
                  <span><span class="label">Hidden Power: </span><span class="value">{pokemon.hiddenPower.type} {pokemon.hiddenPower.power}</span></span>
                  <span><span class="label">Friendship: </span><span class="value">{pokemon.friendship}</span></span>
                </div>

                {/* Moves */}
                <Show when={props.settings.show_moves}>
                  <div class="moves-grid">
                    <For each={pokemon.moves}>
                      {(moveId) => (
                        <div classList={{ "move-slot": true, empty: moveId === 0 }}>
                          {MOVES[moveId] || "\u2014"}
                        </div>
                      )}
                    </For>
                  </div>
                </Show>
              </>
            );
          }}
        </Show>
      </div>

      {/* Party bar */}
      <div id="party-bar">
        <For each={SLOTS}>
          {(i) => {
            const slotMon = () => props.party[i];
            const isEmpty = () => !slotMon() || i >= props.partyCount;
            const isFainted = () => {
              const m = slotMon();
              return m ? m.hp === 0 && !m.isEgg : false;
            };
            const abbr = () => {
              const m = slotMon();
              if (!m) return "\u2014";
              return m.isEgg ? "EGG" : m.speciesName.substring(0, 5).toUpperCase();
            };
            const lvl = () => {
              const m = slotMon();
              if (!m) return "\u2014";
              return m.isEgg ? "" : "Lv." + m.level;
            };
            const miniHpPct = () => {
              const m = slotMon();
              if (!m || m.maxhp === 0) return 0;
              return m.hp / m.maxhp;
            };

            return (
              <div
                classList={{
                  "party-slot": true,
                  active: i === props.selectedSlot,
                  fainted: !isEmpty() && isFainted(),
                  "empty-slot": isEmpty(),
                }}
                onClick={() => { if (i < props.partyCount) props.onSelectSlot(i); }}
              >
                <div class="mini-name">{isEmpty() ? "\u2014" : abbr()}</div>
                <div class="mini-level">{isEmpty() ? "\u2014" : lvl()}</div>
                <div class="mini-hp-bg">
                  <div
                    class="mini-hp-fill"
                    style={{
                      width: (isEmpty() ? 0 : miniHpPct() * 100).toFixed(0) + "%",
                      background: isEmpty() ? "transparent" : getHpColor(miniHpPct()),
                    }}
                  />
                </div>
              </div>
            );
          }}
        </For>
      </div>

      <div id="status">{props.statusText}</div>
    </div>
  );
}
