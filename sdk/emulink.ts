/** Typed wrappers for the emulink bridge; safe to call when the bridge is unavailable. */

/** Valid byte sizes for raw memory writes. */
export type WriteSize = 1 | 2 | 4;

interface EmulinkBridge {
  write(address: string, size: WriteSize, value: number): void;
  writeVar(varId: string, value: number): void;
  runMacro(macroId: string): void;
  vibrate(ms: number): void;
  playSound(fileName: string): void;
  save(key: string, value: string): void;
  exit(): void;
  openSettings(): void;
  log(message: string): void;
}

declare global {
  interface Window {
    emulink?: EmulinkBridge;
  }
}

function getBridge(): EmulinkBridge | undefined {
  return typeof window !== "undefined" ? window.emulink : undefined;
}

/**
 * Write a value directly to emulator memory.
 *
 * @param address - Hex address string, e.g. '"0x09C6"'.
 * @param size    - Byte width: 1, 2, or 4.
 * @param value   - Integer value to write.
 *
 * Rate-limited to 30 writes/second (shared with {@link writeVar}).
 */
export function write(address: string, size: WriteSize, value: number): void {
  getBridge()?.write(address, size, value);
}

/**
 * Write a value to a named data point defined in the active profile.
 *
 * @param varId - Data point identifier from the profile.
 * @param value - Integer value to write.
 *
 * Rate-limited to 30 writes/second (shared with {@link write}).
 */
export function writeVar(varId: string, value: number): void {
  getBridge()?.writeVar(varId, value);
}

/**
 * Execute a multi-step write sequence defined in the active profile.
 *
 * @param macroId - Macro identifier from the profile's 'macros' array.
 */
export function runMacro(macroId: string): void {
  getBridge()?.runMacro(macroId);
}

/**
 * Trigger device haptic feedback.
 *
 * @param ms - Duration in milliseconds (clamped to 1-5000, min 50 ms between calls).
 */
export function vibrate(ms: number): void {
  getBridge()?.vibrate(ms);
}

/**
 * Play an audio file from the theme directory.
 *
 * @param fileName - Path relative to the theme folder (no '..' or leading '/').
 *
 * Minimum 200 ms between calls.
 */
export function playSound(fileName: string): void {
  getBridge()?.playSound(fileName);
}

/**
 * Persist a theme setting. The value will appear in subsequent
 * 'payload.settings' and survives across sessions.
 *
 * @param key   - Setting ID matching a 'theme.json' definition.
 * @param value - New setting value.
 */
export function save(key: string, value: string): void {
  getBridge()?.save(key, value);
}

/** Open the theme settings dialog. */
export function openSettings(): void {
  getBridge()?.openSettings();
}

/** Close the current theme and return to the theme picker. */
export function exit(): void {
  getBridge()?.exit();
}

/**
 * Write a message to the app's debug log.
 *
 * Standard 'console.log()' output is also captured with a '[JS]' prefix.
 */
export function log(message: string): void {
  getBridge()?.log(message);
}
