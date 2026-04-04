import { describe, it, expect, vi, beforeEach } from "vitest";
import { _registerTransforms, _runTransforms, _resetTransforms } from "./registry.js";
import type { EmuLnkPayload } from "../types.js";
import type { TransformDefinition } from "./types.js";

function makePayload<T extends Record<string, unknown>>(values: T): EmuLnkPayload<T> {
  return {
    isConnected: true,
    values,
    raw: {},
    settings: {},
    system: {
      safeArea: { top: 0, bottom: 0, left: 0, right: 0 },
      display: { width: 0, height: 0, orientation: 0, isDualScreen: false, secondaryWidth: 0, secondaryHeight: 0 },
      battery: { level: 100, isCharging: false },
      thermal: { cpuTemp: 0, isThrottling: false },
    },
    confidence: null,
    gameHash: null,
  };
}

describe("transforms registry", () => {
  beforeEach(() => {
    _resetTransforms();
  });

  it("returns payload unchanged when no transforms registered", () => {
    const payload = makePayload({ x: 1 });
    const result = _runTransforms(payload);
    expect(result).toBe(payload);
  });

  it("single transform augments values", () => {
    const def: TransformDefinition = {
      id: "double",
      inputs: ["x"],
      fn: (ctx) => ({ doubled: (ctx.values as any).x * 2 }),
    };
    _registerTransforms([def]);
    const result = _runTransforms(makePayload({ x: 5 }));
    expect((result.values as any).doubled).toBe(10);
    expect((result.values as any).x).toBe(5);
  });

  it("transform that throws is skipped", () => {
    const throwing: TransformDefinition = {
      id: "bad",
      inputs: ["x"],
      fn: () => { throw new Error("boom"); },
    };
    const ok: TransformDefinition = {
      id: "ok",
      inputs: ["x"],
      fn: () => ({ ok: true }),
    };
    _registerTransforms([throwing, ok]);
    const result = _runTransforms(makePayload({ x: 1 }));
    expect((result.values as any).ok).toBe(true);
    expect((result.values as any).bad_output).toBeUndefined();
  });

  it("after ordering is respected", () => {
    // A declares it runs after B, but is registered first.
    // B writes b_val; A reads b_val and produces a_val.
    const a: TransformDefinition = {
      id: "a",
      inputs: ["b_val"],
      after: ["b"],
      fn: (ctx) => ({ a_val: (ctx.values as any).b_val + 1 }),
    };
    const b: TransformDefinition = {
      id: "b",
      inputs: [],
      fn: () => ({ b_val: 1 }),
    };
    _registerTransforms([a, b]);
    const result = _runTransforms(makePayload({}));
    expect((result.values as any).a_val).toBe(2);
  });

  it("skip-if-unchanged reuses cached output", () => {
    const fn = vi.fn(() => ({ computed: 42 }));
    const def: TransformDefinition = { id: "cached", inputs: ["x"], fn };
    _registerTransforms([def]);
    const payload = makePayload({ x: 7 });
    _runTransforms(payload);
    _runTransforms(payload);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("skip-if-unchanged re-runs when inputs change", () => {
    const fn = vi.fn((ctx: any) => ({ computed: ctx.values.x * 10 }));
    const def: TransformDefinition = { id: "reactive", inputs: ["x"], fn };
    _registerTransforms([def]);
    _runTransforms(makePayload({ x: 1 }));
    _runTransforms(makePayload({ x: 2 }));
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("resetTransforms clears state", () => {
    const def: TransformDefinition = {
      id: "adder",
      inputs: ["x"],
      fn: () => ({ added: true }),
    };
    _registerTransforms([def]);
    _resetTransforms();
    const payload = makePayload({ x: 1 });
    const result = _runTransforms(payload);
    expect((result.values as any).added).toBeUndefined();
    expect(result).toBe(payload);
  });
});
