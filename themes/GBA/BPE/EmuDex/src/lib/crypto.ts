import type { Nature, StatBlock, HiddenPower, DecryptedData } from "./types.js";
import { SUBSTRUCTURE_ORDER, NATURES, HP_TYPES } from "./data.js";

export function decryptPokemon(pv: number, otid: number, encWords: number[]): DecryptedData {
  const key = (pv ^ otid) >>> 0;
  const dec = new Uint32Array(12);
  for (let i = 0; i < 12; i++) {
    dec[i] = ((encWords[i] || 0) ^ key) >>> 0;
  }

  const order = SUBSTRUCTURE_ORDER[pv % 24];
  const sub: Record<number, DataView> = {};
  for (let i = 0; i < 4; i++) {
    const startWord = i * 3;
    const buf = new ArrayBuffer(12);
    const dv = new DataView(buf);
    dv.setUint32(0, dec[startWord], true);
    dv.setUint32(4, dec[startWord + 1], true);
    dv.setUint32(8, dec[startWord + 2], true);
    sub[order[i]] = dv;
  }

  // Growth (type 0)
  const g = sub[0];
  const speciesId = g.getUint16(0, true);
  const heldItem = g.getUint16(2, true);
  const experience = g.getUint32(4, true);
  const friendship = g.getUint8(9);

  // Attacks (type 1)
  const a = sub[1];
  const moves = [
    a.getUint16(0, true), a.getUint16(2, true),
    a.getUint16(4, true), a.getUint16(6, true),
  ];
  const pp = [a.getUint8(8), a.getUint8(9), a.getUint8(10), a.getUint8(11)];

  // EVs/Condition (type 2)
  const e = sub[2];
  const evs: StatBlock = {
    hp: e.getUint8(0), atk: e.getUint8(1), def: e.getUint8(2),
    spd: e.getUint8(3), spatk: e.getUint8(4), spdef: e.getUint8(5),
  };

  // Misc (type 3)
  const m = sub[3];
  const ivData = m.getUint32(4, true);
  const ivs: StatBlock = {
    hp:    (ivData)       & 0x1F,
    atk:   (ivData >> 5)  & 0x1F,
    def:   (ivData >> 10) & 0x1F,
    spd:   (ivData >> 15) & 0x1F,
    spatk: (ivData >> 20) & 0x1F,
    spdef: (ivData >> 25) & 0x1F,
  };
  const isEgg = ((ivData >> 30) & 1) === 1;
  const abilityNum = (ivData >> 31) & 1;

  return { heldItem, experience, friendship, moves, pp, evs, ivs, isEgg, speciesId, abilityNum };
}

export function calcNature(pv: number): Nature {
  return NATURES[pv % 25];
}

export function calcHiddenPower(ivs: StatBlock): HiddenPower {
  const lsb = (iv: number): number => iv & 1;
  const bit1 = (iv: number): number => (iv >> 1) & 1;

  const typeVal = lsb(ivs.hp) + 2 * lsb(ivs.atk) + 4 * lsb(ivs.def)
    + 8 * lsb(ivs.spd) + 16 * lsb(ivs.spatk) + 32 * lsb(ivs.spdef);
  const typeIdx = Math.floor(typeVal * 15 / 63);

  const powVal = bit1(ivs.hp) + 2 * bit1(ivs.atk) + 4 * bit1(ivs.def)
    + 8 * bit1(ivs.spd) + 16 * bit1(ivs.spatk) + 32 * bit1(ivs.spdef);
  const power = Math.floor(powVal * 40 / 63) + 30;

  return { type: HP_TYPES[typeIdx], power };
}

/**
 * Decode Gen 3 encoded text from raw bytes.
 * caseMode: 'sentence' (default) = first char upper, rest lower.
 *           'word' = capitalize first char of each word.
 *           'none' = raw decode (all uppercase from ROM).
 */
export function decodeGen3Text(
  bytes: Uint8Array, offset: number, maxLen: number,
  caseMode: 'sentence' | 'word' | 'none' = 'sentence',
): string {
  let name = "";
  for (let i = 0; i < maxLen; i++) {
    const b = bytes[offset + i];
    if (b === 0xFF) break;
    if (b >= 0xBB && b <= 0xD4) name += String.fromCharCode(65 + (b - 0xBB));
    else if (b >= 0xD5 && b <= 0xEE) name += String.fromCharCode(97 + (b - 0xD5));
    else if (b >= 0xA1 && b <= 0xAA) name += String.fromCharCode(48 + (b - 0xA1));
    else if (b === 0xAB) name += "!";
    else if (b === 0xAC) name += "?";
    else if (b === 0xAD) name += ".";
    else if (b === 0xAE) name += "-";
    else if (b === 0xB4) name += "'";
    else if (b === 0x1B) name += "é";
    else if (b === 0x00) name += " ";
    else name += "?";
  }
  if (name.length > 0) {
    if (caseMode === 'sentence') {
      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    } else if (caseMode === 'word') {
      name = name.toLowerCase().replace(/(^|\s|-)(\S)/g, (_, pre, ch) => pre + ch.toUpperCase());
    }
  }
  return name || "???";
}

export function decodeNickname(dv: DataView, slotOff: number): string {
  const bytes = new Uint8Array(dv.buffer, dv.byteOffset + slotOff + 0x08, 10);
  return decodeGen3Text(bytes, 0, 10);
}
