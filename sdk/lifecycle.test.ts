import { describe, it, expect, beforeEach } from "vitest";
import { onConnect, onDisconnect, onSettingChange, onConfidenceChange, _dispatchLifecycle, _reset } from "./lifecycle.js";

const makePayload = (overrides: Partial<{ isConnected: boolean; settings: Record<string, string>; confidence: string | null }> = {}) => ({
  isConnected: true, values: {}, raw: {}, settings: {}, system: {} as any, confidence: null, gameHash: null,
  ...overrides,
});

beforeEach(() => _reset());

describe("onConnect", () => {
  it("fires on false to true transition", () => {
    let count = 0;
    onConnect(() => count++);
    _dispatchLifecycle(makePayload({ isConnected: false })); // baseline
    _dispatchLifecycle(makePayload({ isConnected: true }));
    expect(count).toBe(1);
  });

  it("does not fire on first call (baseline set)", () => {
    let count = 0;
    onConnect(() => count++);
    _dispatchLifecycle(makePayload({ isConnected: true }));
    expect(count).toBe(0);
  });

  it("unsubscribe stops callbacks", () => {
    let count = 0;
    const unsub = onConnect(() => count++);
    _dispatchLifecycle(makePayload({ isConnected: false }));
    unsub();
    _dispatchLifecycle(makePayload({ isConnected: true }));
    expect(count).toBe(0);
  });
});

describe("onDisconnect", () => {
  it("fires on true to false transition", () => {
    let count = 0;
    onDisconnect(() => count++);
    _dispatchLifecycle(makePayload({ isConnected: true }));
    _dispatchLifecycle(makePayload({ isConnected: false }));
    expect(count).toBe(1);
  });
});

describe("onSettingChange", () => {
  it("fires when a setting changes", () => {
    const calls: string[] = [];
    onSettingChange("theme", (k, v) => calls.push(v));
    _dispatchLifecycle(makePayload({ settings: { theme: "dark" } }));
    expect(calls).toEqual(["dark"]);
  });

  it("does not fire when setting is unchanged", () => {
    const calls: string[] = [];
    onSettingChange("theme", (k, v) => calls.push(v));
    _dispatchLifecycle(makePayload({ settings: { theme: "dark" } }));
    _dispatchLifecycle(makePayload({ settings: { theme: "dark" } }));
    expect(calls.length).toBe(1);
  });

  it("wildcard fires for any setting change", () => {
    const keys: string[] = [];
    onSettingChange("*", (k) => keys.push(k));
    _dispatchLifecycle(makePayload({ settings: { a: "1", b: "2" } }));
    expect(keys).toContain("a");
    expect(keys).toContain("b");
  });
});

describe("onConfidenceChange", () => {
  it("fires when confidence changes", () => {
    const calls: (string | null)[] = [];
    onConfidenceChange((v) => calls.push(v));
    _dispatchLifecycle(makePayload({ confidence: null }));      // baseline
    _dispatchLifecycle(makePayload({ confidence: "MATCHED" }));
    expect(calls).toEqual(["MATCHED"]);
  });

  it("does not fire on first call (baseline)", () => {
    const calls: (string | null)[] = [];
    onConfidenceChange((v) => calls.push(v));
    _dispatchLifecycle(makePayload({ confidence: "MATCHED" }));
    expect(calls.length).toBe(0);
  });
});
