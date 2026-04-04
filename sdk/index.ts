export { registerTheme } from "./bridge.js";
export { decodeBase64, decodeBase64ToDataView, decodeBase64ToText } from "./decode.js";
export { write, writeVar, runMacro, vibrate, playSound, save, exit, openSettings, log } from "./emulink.js";
export { bool, num, str } from "./settings.js";
export type { WriteSize } from "./emulink.js";
export type {
  EmuLnkPayload,
  ThemeCallbacks,
  SystemInfo,
  BatteryInfo,
  ThermalInfo,
  SafeArea,
  DisplayInfo,
} from "./types.js";
export { onDataChange } from "./reactive.js";
export { onConnect, onDisconnect, onSettingChange, onConfidenceChange } from "./lifecycle.js";
export { createTestHarness } from "./testing.js";
export { SDK_VERSION } from "./version.js";
export type { TransformDefinition, TransformContext, TransformResult } from "./transforms/types.js";
