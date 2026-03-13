import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { registerTheme } from "@emulink/sdk";
import "./style.scss";

interface GameData {
  gameTitle: string;
  [key: string]: unknown;
}

@customElement("my-theme")
export class MyTheme extends LitElement {
  @property({ type: Boolean }) isConnected = false;
  @property({ type: Object }) values: GameData = {} as GameData;
  @property({ type: Object }) settings: Record<string, string> = {};

  static styles = css`
    :host { display: block; text-align: center; padding: 1rem; }
    .offline { color: #f44; font-weight: bold; }
  `;

  render() {
    if (!this.isConnected) {
      return html`<div class="offline"><p>Emulator disconnected</p></div>`;
    }
    return html`
      <h1>${this.values.gameTitle ?? "Unknown"}</h1>
      <pre>${JSON.stringify(this.values, null, 2)}</pre>
    `;
  }
}

const el = document.querySelector<MyTheme>("my-theme")!;

registerTheme<GameData>({
  onUpdate({ isConnected, values, settings }) {
    el.isConnected = isConnected;
    el.values = values;
    el.settings = settings;
  },
  onGameClosed() {
    el.isConnected = false;
    el.values = {} as GameData;
  },
});
