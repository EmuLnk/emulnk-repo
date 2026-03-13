/**
 * Decoded payload pushed to themes via `window.updateData()`.
 *
 * @typeParam T - Shape of the `values` object (varies per game profile).
 */
export interface EmuLnkPayload<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Whether the emulator is currently connected. */
  isConnected: boolean;
  /** Game data points as defined by the active profile. */
  values: T;
  /** User-configurable theme settings (all string values). */
  settings: Record<string, string>;
}

/**
 * Callbacks a theme registers to receive data from the EmuLnk app.
 *
 * @typeParam T - Shape of the `values` object.
 */
export interface ThemeCallbacks<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Called on every data update from the emulator. */
  onUpdate: (payload: EmuLnkPayload<T>) => void;
  /** Called when the game/emulator closes. */
  onGameClosed?: () => void;
}
