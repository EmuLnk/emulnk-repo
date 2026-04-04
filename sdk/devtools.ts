import { onDataChange } from "./reactive.js";
import { onConnect, onDisconnect } from "./lifecycle.js";

export function initDevtools(bottomOffset = 0): void {
  const MAX_EVENTS = 20;
  const events: { key: string; from: unknown; to: unknown; ts: number }[] = [];
  let connected = false;

  const panel = document.createElement("div");
  panel.style.cssText =
    `position:fixed;bottom:${bottomOffset}px;right:0;z-index:99998;width:320px;background:#111;color:#eee;` +
    "font:11px monospace;border-top-left-radius:4px;overflow:hidden;";

  const header = document.createElement("div");
  header.style.cssText =
    "background:#222;padding:4px 8px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;";

  const headerLabel = document.createElement("span");
  headerLabel.textContent = "[devtools]";
  const statusDot = document.createElement("span");
  statusDot.textContent = "●";
  header.appendChild(headerLabel);
  header.appendChild(statusDot);

  const body = document.createElement("div");
  body.style.cssText = "max-height:200px;overflow-y:auto;padding:4px 0;";

  panel.appendChild(header);
  panel.appendChild(body);
  document.body.appendChild(panel);

  let collapsed = false;
  header.addEventListener("click", () => {
    collapsed = !collapsed;
    body.style.display = collapsed ? "none" : "block";
  });

  function render() {
    statusDot.style.color = connected ? "#4f4" : "#f44";
    while (body.firstChild) body.removeChild(body.firstChild);
    for (const e of [...events].reverse()) {
      const row = document.createElement("div");
      row.style.cssText = "padding:2px 8px;border-bottom:1px solid #222;";
      const t = new Date(e.ts).toISOString().slice(11, 23);
      row.textContent = `[${t}] ${e.key}: ${JSON.stringify(e.from)} -> ${JSON.stringify(e.to)}`;
      body.appendChild(row);
    }
  }

  onConnect(() => { connected = true; render(); });
  onDisconnect(() => { connected = false; render(); });

  onDataChange("*", (key, newVal, oldVal) => {
    events.push({ key, from: oldVal, to: newVal, ts: Date.now() });
    if (events.length > MAX_EVENTS) events.shift();
    render();
  });
}
