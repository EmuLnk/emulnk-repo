import type { EmuLnkPayload, ThemeCallbacks } from "./types.js";

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
  (window as any).updateData = (base64Data: string, _isInitial?: boolean) => {
    try {
      const json: EmuLnkPayload<T> = JSON.parse(atob(base64Data));
      callbacks.onUpdate(json);
    } catch {
      // Malformed payload - silently ignore to avoid crashing the overlay.
    }
  };

  if (callbacks.onGameClosed) {
    (window as any).onGameClosed = callbacks.onGameClosed;
  }
}
