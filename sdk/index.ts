export { registerTheme } from "./bridge.js";
export { decodeBase64, decodeBase64ToDataView, decodeBase64ToText } from "./decode.js";
export { write, writeVar, runMacro, vibrate, playSound, save, exit, openSettings, log } from "./emulink.js";
export type { WriteSize } from "./emulink.js";
export type { EmuLnkPayload, ThemeCallbacks } from "./types.js";
