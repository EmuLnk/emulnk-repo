import type { EmuLnkPayload, ThemeCallbacks } from "./types.js";
import { _dispatchChanges } from "./reactive.js";
import { _dispatchLifecycle } from "./lifecycle.js";
import { SDK_VERSION } from "./version.js";
import { _registerTransforms, _runTransforms } from "./transforms/index.js";
import type { TransformDefinition } from "./transforms/types.js";

/**
 * Register a theme with the EmuLnk app.
 *
 * Sets up `window.updateData` and `window.onGameClosed` handlers
 * that decode the base64 payload and forward typed data to your callbacks.
 *
 * @example
 * ```ts
 * import { registerTheme } from "@emulink/sdk";
 *
 * registerTheme({
 *   onUpdate(payload) {
 *     console.log(payload.values);
 *   },
 *   onGameClosed() {
 *     console.log("disconnected");
 *   },
 * });
 * ```
 */
export function registerTheme<T extends Record<string, unknown> = Record<string, unknown>>(
  callbacks: ThemeCallbacks<T>,
): void {
  (window as any).__emulink?.log?.(`[SDK] v${SDK_VERSION}`);

  if (callbacks.transforms?.length) {
    _registerTransforms(callbacks.transforms as TransformDefinition[]);
  }

  (window as any).updateData = (base64Data: string, _isInitial?: boolean) => {
    let json: EmuLnkPayload<T>;
    try {
      json = JSON.parse(atob(base64Data));
      json = _runTransforms(json);
    } catch (err) {
      // Swallow decode/transform errors to prevent WebView bridge death on OEM devices.
      console.error("[EmuLnk] updateData decode error:", err);
      return;
    }
    callbacks.onUpdate(json);
    _dispatchChanges(json);
    _dispatchLifecycle(json);
  };

  if (callbacks.onGameClosed) {
    (window as any).onGameClosed = callbacks.onGameClosed;
  }
}
