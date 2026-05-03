import { playSound, vibrate } from "@emulnk/sdk";

const SOUNDS = {
  tab: "sfx/tab.wav",
  select: "sfx/select.wav",
  back: "sfx/back.wav",
  battleIn: "sfx/battle-in.wav",
  battleOut: "sfx/battle-out.wav",
  toggle: "sfx/toggle.wav",
  catch: "sfx/catch.wav",
} as const;

type SoundId = keyof typeof SOUNDS;

let sfxEnabled = true;
let hapticEnabled = true;
let lastPlayTime = 0;
let lastVibrateTime = 0;

export function setSfxEnabled(value: boolean): void {
  sfxEnabled = value;
}

export function setHapticEnabled(value: boolean): void {
  hapticEnabled = value;
}

function play(id: SoundId): void {
  if (!sfxEnabled) return;
  const now = Date.now();
  if (now - lastPlayTime < 120) return;
  lastPlayTime = now;
  playSound(SOUNDS[id]); // emulnk-allow: playSound
}

function buzz(ms: number): void {
  if (!hapticEnabled) return;
  const now = Date.now();
  if (now - lastVibrateTime < 50) return;
  lastVibrateTime = now;
  vibrate(ms);
}

export function onTabSwitch(): void {
  play("tab");
}

export function onCardSelect(): void {
  play("select");
  buzz(8);
}

export function onBack(): void {
  play("back");
  buzz(8);
}

export function onToggle(): void {
  play("toggle");
}

export function onBattleStart(): void {
  play("battleIn");
  buzz(28);
}

export function onBattleEnd(): void {
  play("battleOut");
  buzz(14);
}

export function onCatchAction(): void {
  play("catch");
  buzz(18);
}
