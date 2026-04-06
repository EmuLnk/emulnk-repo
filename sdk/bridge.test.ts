import { describe, it, expect, beforeEach } from "vitest";
import { registerTheme } from "./bridge.js";
import { _reset as resetReactive } from "./reactive.js";
import { _reset as resetLifecycle } from "./lifecycle.js";
import { _resetTransforms } from "./transforms/index.js";

beforeEach(() => {
  (globalThis as any).window = globalThis;
  resetReactive();
  resetLifecycle();
  _resetTransforms();
});

describe("registerTheme", () => {
  it("fires onUpdate with decoded payload", () => {
    const payload = { isConnected: true, values: { hp: 100 }, raw: {}, settings: {}, system: {}, confidence: null, gameHash: null };
    let received: unknown;
    registerTheme({ onUpdate: (p) => { received = p; } });
    (globalThis as any).updateData(btoa(JSON.stringify(payload)));
    expect((received as any).values.hp).toBe(100);
  });

  it("logs error and does not throw on malformed base64", () => {
    let called = false;
    registerTheme({ onUpdate: () => { called = true; } });
    expect(() => (globalThis as any).updateData("!!!not-base64!!!")).not.toThrow();
    expect(called).toBe(false);
  });

  it("fires onGameClosed callback", () => {
    let closed = false;
    registerTheme({ onUpdate: () => {}, onGameClosed: () => { closed = true; } });
    (globalThis as any).onGameClosed();
    expect(closed).toBe(true);
  });

  it("transform augments values before onUpdate", () => {
    const payload = { isConnected: true, values: { x: 4 }, raw: {}, settings: {}, system: {}, confidence: null, gameHash: null };
    let received: unknown;
    registerTheme({
      onUpdate: (p) => { received = p; },
      transforms: [{ id: "double", inputs: ["x"], fn: (ctx) => ({ doubled: (ctx.values as any).x * 2 }) }],
    });
    (globalThis as any).updateData(btoa(JSON.stringify(payload)));
    expect((received as any).values.doubled).toBe(8);
    expect((received as any).values.x).toBe(4);
    delete (globalThis as any).window;
  });
});
