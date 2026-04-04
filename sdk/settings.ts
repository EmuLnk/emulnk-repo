/** Values treated as boolean `true`. */
const TRUTHY = new Set(["true", "1", "yes"]);
/** Values treated as boolean `false`. */
const FALSY = new Set(["false", "0", "no"]);

/**
 * Read a boolean setting.
 *
 * Recognises `"true"/"1"/"yes"` as `true` and `"false"/"0"/"no"` as `false`.
 * Returns {@link fallback} when the key is missing or has an unrecognised value.
 */
export function bool(settings: Record<string, string>, key: string, fallback = false): boolean {
  const v = settings[key];
  if (v === undefined) return fallback;
  const lower = v.toLowerCase();
  if (TRUTHY.has(lower)) return true;
  if (FALSY.has(lower)) return false;
  return fallback;
}

/**
 * Read a numeric setting.
 *
 * Returns {@link fallback} when the key is missing or the value is not a valid number.
 */
export function num(settings: Record<string, string>, key: string, fallback = 0): number {
  const v = settings[key];
  if (v === undefined) return fallback;
  const n = parseFloat(v);
  return Number.isNaN(n) ? fallback : n;
}

/**
 * Read a string setting.
 *
 * Returns {@link fallback} when the key is missing.
 */
export function str(settings: Record<string, string>, key: string, fallback = ""): string {
  const v = settings[key];
  return v === undefined ? fallback : v;
}
