import { describe, it, expect, beforeEach } from "vitest";
import { onDataChange, _dispatchChanges, _reset } from "./reactive.js";

const makePayload = (values: Record<string, unknown>) => ({
  isConnected: true, values, raw: {}, settings: {}, system: {} as any, confidence: null, gameHash: null,
});

beforeEach(() => _reset());

describe("onDataChange", () => {
  it("fires when a value changes", () => {
    const calls: unknown[] = [];
    onDataChange("hp", (k, v) => calls.push(v));
    _dispatchChanges(makePayload({ hp: 50 }));
    expect(calls).toEqual([50]);
  });

  it("does not fire when value is unchanged", () => {
    const calls: unknown[] = [];
    onDataChange("hp", (k, v) => calls.push(v));
    _dispatchChanges(makePayload({ hp: 50 }));
    _dispatchChanges(makePayload({ hp: 50 }));
    expect(calls.length).toBe(1);
  });

  it("wildcard fires for every changed key", () => {
    const keys: string[] = [];
    onDataChange("*", (k) => keys.push(k));
    _dispatchChanges(makePayload({ hp: 50, mp: 30 }));
    expect(keys).toContain("hp");
    expect(keys).toContain("mp");
  });

  it("unsubscribe stops callbacks", () => {
    const calls: unknown[] = [];
    const unsub = onDataChange("hp", (k, v) => calls.push(v));
    _dispatchChanges(makePayload({ hp: 50 }));
    unsub();
    _dispatchChanges(makePayload({ hp: 99 }));
    expect(calls).toEqual([50]);
  });

  it("fires for all keys on first dispatch from empty state", () => {
    const keys: string[] = [];
    onDataChange("*", (k) => keys.push(k));
    _dispatchChanges(makePayload({ hp: 50, mp: 30 }));
    expect(keys).toContain("hp");
    expect(keys).toContain("mp");
  });
});
