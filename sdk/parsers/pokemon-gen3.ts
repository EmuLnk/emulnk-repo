export interface Nature {
  name: string;
  /** Boosted stat index (0=Atk,1=Def,2=Spd,3=SpA,4=SpD). -1 = neutral */
  p: number;
  /** Nerfed stat index. -1 = neutral */
  m: number;
}

export interface StatBlock {
  hp: number;
  atk: number;
  def: number;
  spd: number;
  spatk: number;
  spdef: number;
}

export interface HiddenPower {
  type: string;
  power: number;
}

export interface DecryptedData {
  speciesId: number;
  heldItem: number;
  experience: number;
  friendship: number;
  moves: number[];
  pp: number[];
  evs: StatBlock;
  ivs: StatBlock;
  isEgg: boolean;
  abilityNum: number;
}

export const SUBSTRUCTURE_ORDER: readonly number[][] = [
  [0,1,2,3],[0,1,3,2],[0,2,1,3],[0,2,3,1],[0,3,1,2],[0,3,2,1],
  [1,0,2,3],[1,0,3,2],[1,2,0,3],[1,2,3,0],[1,3,0,2],[1,3,2,0],
  [2,0,1,3],[2,0,3,1],[2,1,0,3],[2,1,3,0],[2,3,0,1],[2,3,1,0],
  [3,0,1,2],[3,0,2,1],[3,1,0,2],[3,1,2,0],[3,2,0,1],[3,2,1,0],
];

export const NATURES: readonly Nature[] = [
  {name:"Hardy",  p:-1,m:-1},{name:"Lonely", p:0,m:1},{name:"Brave",  p:0,m:2},
  {name:"Adamant",p:0,m:3}, {name:"Naughty",p:0,m:4},{name:"Bold",   p:1,m:0},
  {name:"Docile", p:-1,m:-1},{name:"Relaxed",p:1,m:2},{name:"Impish", p:1,m:3},
  {name:"Lax",    p:1,m:4}, {name:"Timid",  p:2,m:0},{name:"Hasty",  p:2,m:1},
  {name:"Serious",p:-1,m:-1},{name:"Jolly",  p:2,m:3},{name:"Naive",  p:2,m:4},
  {name:"Modest", p:3,m:0}, {name:"Mild",   p:3,m:1},{name:"Quiet",  p:3,m:2},
  {name:"Bashful",p:-1,m:-1},{name:"Rash",   p:3,m:4},{name:"Calm",   p:4,m:0},
  {name:"Gentle", p:4,m:1}, {name:"Sassy",  p:4,m:2},{name:"Careful",p:4,m:3},
  {name:"Quirky", p:-1,m:-1},
];

export const NATURE_STAT_NAMES: readonly string[] = ["Atk", "Def", "Spd", "SpA", "SpD"];

export const HP_TYPES: readonly string[] = [
  "Fighting","Flying","Poison","Ground","Rock","Bug",
  "Ghost","Steel","Fire","Water","Grass","Electric",
  "Psychic","Ice","Dragon","Dark",
];

// Gen 3 internal species IDs 277-410 → National Dex 252-386
// Internal order follows Hoenn Regional Dex, not National Dex
// prettier-ignore
const HOENN_TO_NATIONAL: readonly number[] = [
  252,253,254,255,256,257,258,259,260,261, // 277-286: Treecko–Poochyena
  262,263,264,265,266,267,268,269,270,271, // 287-296: Mightyena–Lombre
  272,273,274,275,290,291,292,276,277,285, // 297-306: Ludicolo–Shroomish
  286,327,278,279,283,284,320,321,300,301, // 307-316: Breloom–Delcatty
  352,343,344,299,324,302,339,340,370,341, // 317-326: Kecleon–Corphish
  342,349,350,318,319,328,329,330,296,297, // 327-336: Crawdaunt–Hariyama
  309,310,322,323,363,364,365,331,332,361, // 337-346: Electrike–Snorunt
  362,337,338,298,325,326,311,312,303,307, // 347-356: Glalie–Meditite
  308,333,334,360,355,356,315,287,288,289, // 357-366: Medicham–Slaking
  316,317,357,293,294,295,366,367,368,359, // 367-376: Gulpin–Absol
  353,354,336,335,369,304,305,306,351,313, // 377-386: Shuppet–Volbeat
  314,345,346,347,348,280,281,282,371,372, // 387-396: Illumise–Shelgon
  373,374,375,376,377,378,379,382,383,384, // 397-406: Salamence–Rayquaza
  380,381,385,386,                          // 407-410: Latias–Deoxys
];

/** Convert Gen 3 internal species ID to National Dex number. */
export function toNationalDex(internalId: number): number {
  if (internalId >= 1 && internalId <= 251) return internalId;
  if (internalId >= 277 && internalId <= 410) return HOENN_TO_NATIONAL[internalId - 277];
  return 0;
}

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
