import { playSound, vibrate } from "@emulink/sdk";

const SOUNDS = {
	tab:       "sfx/tab.ogg",
	select:    "sfx/select.ogg",
	back:      "sfx/back.ogg",
	battleIn:  "sfx/battle-in.ogg",
	battleOut: "sfx/battle-out.ogg",
	toggle:    "sfx/toggle.ogg",
} as const;

type SoundId = keyof typeof SOUNDS;

let sfxEnabled = true;
let hapticEnabled = true;
let lastPlayTime = 0;

export function setSfxEnabled(v: boolean) { sfxEnabled = v; }
export function setHapticEnabled(v: boolean) { hapticEnabled = v; }

export function play(id: SoundId) {
	if (!sfxEnabled) return;
	const now = Date.now();
	if (now - lastPlayTime < 200) return;
	lastPlayTime = now;
	playSound(SOUNDS[id]); // emulink-allow: playSound
}

let lastVib = 0;
function vib(ms: number) {
	if (!hapticEnabled) return;
	const now = Date.now();
	if (now - lastVib < 50) return;
	lastVib = now;
	vibrate(ms);
}

export function tapVibrate() { vib(15); }
export function heavyVibrate() { vib(40); }

export function onTabSwitch()   { play("tab"); tapVibrate(); }
export function onCardSelect()  { play("select"); tapVibrate(); }
export function onBack()        { play("back"); tapVibrate(); }
export function onBattleStart() { play("battleIn"); heavyVibrate(); }
export function onBattleEnd()   { play("battleOut"); tapVibrate(); }
export function onToggle()      { play("toggle"); }
