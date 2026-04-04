import type { EmuLnkPayload } from "../types.js";
import type { TransformDefinition, TransformContext, TransformResult } from "./types.js";

let _transforms: TransformDefinition[] = [];
let _prevInputs: Map<string, Record<string, unknown>> = new Map();
let _prevOutputs: Map<string, TransformResult> = new Map();

function _topoSort(defs: TransformDefinition[]): TransformDefinition[] {
  const idToIdx = new Map<string, number>(defs.map((d, i) => [d.id, i]));
  const visited = new Set<string>();
  const inStack = new Set<string>();
  const sorted: TransformDefinition[] = [];
  let hasCycle = false;

  function visit(id: string): void {
    if (hasCycle) return;
    if (inStack.has(id)) {
      hasCycle = true;
      return;
    }
    if (visited.has(id)) return;
    inStack.add(id);
    const idx = idToIdx.get(id);
    if (idx !== undefined) {
      const def = defs[idx];
      for (const dep of def.after ?? []) {
        visit(dep);
        if (hasCycle) return;
      }
    }
    inStack.delete(id);
    visited.add(id);
    if (idx !== undefined) {
      sorted.push(defs[idx]);
    }
  }

  for (const def of defs) {
    visit(def.id);
    if (hasCycle) break;
  }

  if (hasCycle) {
    console.error("[EmuLnk] Cycle detected in transform dependencies, falling back to registration order.");
    return defs;
  }

  return sorted;
}

export function _registerTransforms(defs: TransformDefinition[]): void {
  _transforms = _topoSort(defs);
  _prevInputs = new Map();
  _prevOutputs = new Map();
}

export function _runTransforms<T extends Record<string, unknown>>(
  payload: EmuLnkPayload<T>
): EmuLnkPayload<T> {
  if (_transforms.length === 0) return payload;

  const working: Record<string, unknown> = { ...payload.values };

  for (const def of _transforms) {
    const prevSnapshot = _prevInputs.get(def.id);
    const inputsUnchanged =
      prevSnapshot !== undefined &&
      def.inputs.every((key) => working[key] === prevSnapshot[key]);

    if (inputsUnchanged) {
      const cached = _prevOutputs.get(def.id);
      if (cached !== undefined) {
        Object.assign(working, cached);
      }
      continue;
    }

    const snapshot: Record<string, unknown> = {};
    for (const key of def.inputs) {
      snapshot[key] = working[key];
    }
    _prevInputs.set(def.id, snapshot);

    let result: TransformResult | null = null;
    try {
      const ctx: TransformContext = {
        values: working as Readonly<Record<string, unknown>>,
        settings: payload.settings,
        isConnected: payload.isConnected,
      };
      result = def.fn(ctx);
    } catch (err) {
      console.error(`[EmuLnk] Transform "${def.id}" threw an error:`, err);
    }

    if (result !== null) {
      _prevOutputs.set(def.id, result);
      Object.assign(working, result);
    } else {
      _prevOutputs.delete(def.id);
    }
  }

  return { ...payload, values: working as T };
}

export function _resetTransforms(): void {
  _transforms = [];
  _prevInputs = new Map();
  _prevOutputs = new Map();
}
