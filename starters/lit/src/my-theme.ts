// Develop without hardware: pnpm dev --theme <name> --mock
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { registerTheme, bool, onConnect, onDisconnect } from "@emulink/sdk";
import "./style.scss";

interface GameData {
  party_count: number;
  [key: string]: unknown;
}

@customElement("my-theme")
export class MyTheme extends LitElement {
  @property({ type: Boolean }) isConnected = false;
  @property({ type: Object }) values: GameData = {} as GameData;
  @property({ type: Object }) settings: Record<string, string> = {};
  @property({ type: Number }) batteryLevel = 0;
  @property({ type: String }) confidence: string | null = null;

  static styles = css`
    :host { display: block; text-align: center; padding: 1rem; }
    .offline { color: #f44; font-weight: bold; }
    .fallback { color: #fa0; font-size: 0.8rem; }
  `;

  render() {
    if (!this.isConnected) {
      return html`<div class="offline"><p>Emulator disconnected</p></div>`;
    }
    return html`
      ${this.confidence === "FALLBACK" ? html`<p class="fallback">Fallback mode</p>` : ""}
      <h1>Party: ${this.values.party_count ?? 0}</h1>
      <p>Battery: ${this.batteryLevel}%</p>
      ${bool(this.settings, "show-details")
        ? html`<pre>${JSON.stringify(this.values, null, 2)}</pre>`
        : ""}
    `;
  }
}

const el = document.querySelector<MyTheme>("my-theme")!;

onConnect(() => { el.isConnected = true; });
onDisconnect(() => { el.isConnected = false; });

registerTheme<GameData>({
  onUpdate({ isConnected, values, settings, system, confidence }) {
    el.isConnected = isConnected;
    el.values = values;
    el.settings = settings;
    el.batteryLevel = system.battery.level;
    el.confidence = confidence;
  },
  onGameClosed() {
    el.isConnected = false;
    el.values = {} as GameData;
  },
});
