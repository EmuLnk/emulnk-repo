import type { EmuLnkPayload } from "./types.js";
import { _dispatchChanges } from "./reactive.js";
import { _dispatchLifecycle } from "./lifecycle.js";
import { _runTransforms } from "./transforms/index.js";

const DEFAULT_SYSTEM = {
  safeArea: { top: 0, bottom: 0, left: 0, right: 0 },
  display: { width: 0, height: 0, orientation: 0, isDualScreen: false, secondaryWidth: 0, secondaryHeight: 0 },
  battery: { level: 100, isCharging: false },
  thermal: { cpuTemp: 0, isThrottling: false },
};

export function createTestHarness<T extends Record<string, unknown> = Record<string, unknown>>() {
  return {
    inject(partial: Partial<EmuLnkPayload<T>>) {
      const payload = {
        isConnected: true,
        values: {} as T,
        raw: {},
        settings: {},
        system: DEFAULT_SYSTEM,
        confidence: null,
        gameHash: null,
        ...partial,
      } as EmuLnkPayload<T>;
      if (typeof (globalThis as any).window?.updateData === "function") {
        (globalThis as any).window.updateData(btoa(JSON.stringify(payload)));
      } else {
        const augmented = _runTransforms(payload);
        _dispatchChanges(augmented);
        _dispatchLifecycle(augmented);
      }
    },
    cleanup() {},
  };
}
