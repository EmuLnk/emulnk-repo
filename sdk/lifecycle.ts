import type { EmuLnkPayload } from "./types.js";

type Unsubscribe = () => void;
type ConnectHandler = () => void;
type SettingHandler = (key: string, val: string, prev: string) => void;
type ConfidenceHandler = (level: string | null, prev: string | null) => void;

let _prevConnected: boolean | undefined;
let _prevSettings: Record<string, string> = {};
let _prevConfidence: string | null | undefined;

const _connectHandlers: Set<ConnectHandler> = new Set();
const _disconnectHandlers: Set<ConnectHandler> = new Set();
const _settingHandlers: Map<string, Set<SettingHandler>> = new Map();
const _confidenceHandlers: Set<ConfidenceHandler> = new Set();

export function onConnect(handler: ConnectHandler): Unsubscribe {
  _connectHandlers.add(handler);
  return () => _connectHandlers.delete(handler);
}

export function onDisconnect(handler: ConnectHandler): Unsubscribe {
  _disconnectHandlers.add(handler);
  return () => _disconnectHandlers.delete(handler);
}

export function onSettingChange(key: string, handler: SettingHandler): Unsubscribe {
  if (!_settingHandlers.has(key)) _settingHandlers.set(key, new Set());
  _settingHandlers.get(key)!.add(handler);
  return () => _settingHandlers.get(key)?.delete(handler);
}

export function onConfidenceChange(handler: ConfidenceHandler): Unsubscribe {
  _confidenceHandlers.add(handler);
  return () => _confidenceHandlers.delete(handler);
}

export function _dispatchLifecycle(payload: EmuLnkPayload): void {
  if (_prevConnected === false && payload.isConnected) {
    _connectHandlers.forEach(fn => fn());
  } else if (_prevConnected === true && !payload.isConnected) {
    _disconnectHandlers.forEach(fn => fn());
  }
  _prevConnected = payload.isConnected;

  const cur = payload.settings;
  const allKeys = new Set([...Object.keys(_prevSettings), ...Object.keys(cur)]);
  for (const k of allKeys) {
    if (_prevSettings[k] !== cur[k]) {
      _settingHandlers.get(k)?.forEach(fn => fn(k, cur[k] ?? '', _prevSettings[k] ?? ''));
      _settingHandlers.get('*')?.forEach(fn => fn(k, cur[k] ?? '', _prevSettings[k] ?? ''));
    }
  }
  _prevSettings = { ...cur };

  if (_prevConfidence !== undefined && _prevConfidence !== payload.confidence) {
    _confidenceHandlers.forEach(fn => fn(payload.confidence, _prevConfidence!));
  }
  _prevConfidence = payload.confidence;
}

export function _reset(): void {
  _prevConnected = undefined;
  _prevSettings = {};
  _prevConfidence = undefined;
  _connectHandlers.clear();
  _disconnectHandlers.clear();
  _settingHandlers.clear();
  _confidenceHandlers.clear();
}
