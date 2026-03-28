import { playSound, vibrate } from "@emulink/sdk"; // emulink-allow: playSound

let sfxEnabled = true;
let hapticEnabled = true;
let lastPlayTime = 0;
let lastVibTime = 0;

export function setSfxEnabled(v: boolean): void {
  sfxEnabled = v;
}

export function setHapticEnabled(v: boolean): void {
  hapticEnabled = v;
}

function play(file: string): void {
  if (!sfxEnabled) return;
  const now = Date.now();
  if (now - lastPlayTime < 200) return;
  lastPlayTime = now;
  playSound(file); // emulink-allow: playSound
}

function vib(ms: number): void {
  if (!hapticEnabled) return;
  const now = Date.now();
  if (now - lastVibTime < 50) return;
  lastVibTime = now;
  vibrate(ms);
}

export function onTabSwitch(): void {
  play("sfx/page-turn.ogg");
  vib(15);
}

export function onCardSelect(): void {
  play("sfx/select.ogg");
  vib(15);
}

export function onBack(): void {
  play("sfx/back.ogg");
  vib(15);
}

export function onBossEncounter(): void {
  play("sfx/heavy-hit.ogg");
  vib(60);
}

export function onAchievement(): void {
  play("sfx/achievement.ogg");
  vib(40);
}

export function onAlchemyCraft(): void {
  play("sfx/glass-clink.ogg");
  vib(30);
}

export function onFamiliarChirp(): void {
  play("sfx/familiar-chirp.ogg");
  vib(15);
}

export function onFamiliarFeed(): void {
  play("sfx/familiar-feed.ogg");
  vib(20);
}
