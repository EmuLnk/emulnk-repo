import type { EmuLnkPayload } from "./types.js";

type ChangeHandler = (key: string, newVal: unknown, oldVal: unknown, data: EmuLnkPayload) => void;
type Unsubscribe = () => void;

let _prev: Record<string, unknown> = {};
const _handlers: Map<string, Set<ChangeHandler>> = new Map();

export function onDataChange(key: string, handler: ChangeHandler): Unsubscribe {
  if (!_handlers.has(key)) _handlers.set(key, new Set());
  _handlers.get(key)!.add(handler);
  return () => _handlers.get(key)?.delete(handler);
}

export function _dispatchChanges(payload: EmuLnkPayload): void {
  const cur = payload.values as Record<string, unknown>;
  const allKeys = new Set([...Object.keys(_prev), ...Object.keys(cur)]);
  for (const k of allKeys) {
    if (_prev[k] !== cur[k]) {
      _handlers.get(k)?.forEach(fn => fn(k, cur[k], _prev[k], payload));
      _handlers.get('*')?.forEach(fn => fn(k, cur[k], _prev[k], payload));
    }
  }
  _prev = { ...cur };
}

export function _reset(): void {
  _prev = {};
  _handlers.clear();
}
