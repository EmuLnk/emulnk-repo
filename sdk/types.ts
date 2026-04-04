/**
 * Battery status from the host device.
 */
export interface BatteryInfo {
  level: number;
  isCharging: boolean;
}

/**
 * Thermal status from the host device.
 */
export interface ThermalInfo {
  cpuTemp: number;
  isThrottling: boolean;
}

/**
 * Display safe-area insets (status bar, navigation bar, notch).
 */
export interface SafeArea {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Display geometry for primary and secondary screens.
 */
export interface DisplayInfo {
  width: number;
  height: number;
  /** Screen rotation: 0, 90, 180, or 270. */
  orientation: number;
  isDualScreen: boolean;
  secondaryWidth: number;
  secondaryHeight: number;
}

/**
 * Host device system information (battery, thermal, display, safe area).
 */
export interface SystemInfo {
  safeArea: SafeArea;
  display: DisplayInfo;
  battery: BatteryInfo;
  thermal: ThermalInfo;
}

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
  /** Raw (pre-formula) data point values. */
  raw: Record<string, unknown>;
  /** User-configurable theme settings (all string values). */
  settings: Record<string, string>;
  /** Host device system information. */
  system: SystemInfo;
  /** Profile match confidence: `"MATCHED"`, `"FALLBACK"`, or `null` if unknown. */
  confidence: string | null;
  /** MD5 hash of the detected ROM, or `null` if unavailable. */
  gameHash: string | null;
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
  transforms?: import("./transforms/types.js").TransformDefinition<T>[];
}
