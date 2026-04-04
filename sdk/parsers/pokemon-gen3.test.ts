import { describe, it, expect } from "vitest";
import {
  decryptPokemon,
  calcNature,
  calcHiddenPower,
  decodeGen3Text,
  decodeNickname,
  toNationalDex,
  NATURES,
  NATURE_STAT_NAMES,
  HP_TYPES,
  SUBSTRUCTURE_ORDER,
} from "./pokemon-gen3.js";
import type { StatBlock } from "./pokemon-gen3.js";

describe("calcNature", () => {
  it("returns Hardy for PV % 25 === 0", () => {
    expect(calcNature(0).name).toBe("Hardy");
    expect(calcNature(25).name).toBe("Hardy");
    expect(calcNature(50).name).toBe("Hardy");
  });

  it("returns Adamant for PV % 25 === 3", () => {
    const n = calcNature(3);
    expect(n.name).toBe("Adamant");
    expect(n.p).toBe(0); // +Atk
    expect(n.m).toBe(3); // -SpA
  });

  it("returns Jolly for PV % 25 === 13", () => {
    const n = calcNature(13);
    expect(n.name).toBe("Jolly");
    expect(n.p).toBe(2); // +Spd
    expect(n.m).toBe(3); // -SpA
  });

  it("neutral natures have p=-1, m=-1", () => {
    const neutrals = [0, 6, 12, 18, 24];
    for (const idx of neutrals) {
      const n = NATURES[idx];
      expect(n.p).toBe(-1);
      expect(n.m).toBe(-1);
    }
  });
});

describe("calcHiddenPower", () => {
  it("all 31 IVs → Dark 70", () => {
    const ivs: StatBlock = { hp: 31, atk: 31, def: 31, spd: 31, spatk: 31, spdef: 31 };
    const hp = calcHiddenPower(ivs);
    expect(hp.type).toBe("Dark");
    expect(hp.power).toBe(70);
  });

  it("all 0 IVs → Fighting 30", () => {
    const ivs: StatBlock = { hp: 0, atk: 0, def: 0, spd: 0, spatk: 0, spdef: 0 };
    const hp = calcHiddenPower(ivs);
    expect(hp.type).toBe("Fighting");
    expect(hp.power).toBe(30);
  });

  it("specific IV spread → known type", () => {
    // 31/30/30/31/31/31 → Ice 70
    const ivs: StatBlock = { hp: 31, atk: 30, def: 30, spd: 31, spatk: 31, spdef: 31 };
    const hp = calcHiddenPower(ivs);
    expect(hp.type).toBe("Ice");
    expect(hp.power).toBe(70);
  });
});

describe("decryptPokemon", () => {
  it("decrypts with known PV/OTID producing correct substructure order", () => {
    // PV=0 → order index 0 → [0,1,2,3] (identity)
    // Key = PV ^ OTID = 0 ^ 0 = 0, so encrypted = decrypted
    const pv = 0;
    const otid = 0;

    // Build 12 words for 4 substructures (3 words each)
    // Growth (sub 0): species=25 (Pikachu), heldItem=0, exp=1000, friendship at byte 9
    // Attacks (sub 1): moves [85,0,0,0], pp [35,0,0,0]
    // EVs (sub 2): all zeros
    // Misc (sub 3): word0=0, word1=ivData with all 15 IVs
    const buf = new ArrayBuffer(48);
    const dv = new DataView(buf);

    // Growth: species=25 at offset 0 (u16le), heldItem=0, exp=1000 at offset 4 (u32le)
    dv.setUint16(0, 25, true);
    dv.setUint16(2, 0, true);
    dv.setUint32(4, 1000, true);
    dv.setUint8(9, 70); // friendship

    // Attacks (words 3-5): move1=85 (Thunderbolt)
    dv.setUint16(12, 85, true);
    dv.setUint16(14, 0, true);
    dv.setUint16(16, 0, true);
    dv.setUint16(18, 0, true);
    dv.setUint8(20, 35); // pp[0]

    // EVs (words 6-8): all zeros (already)

    // Misc (words 9-11): ivData at word offset 1 (byte 4 within sub)
    // All IVs = 15: hp=15, atk=15<<5, def=15<<10, spd=15<<15, spatk=15<<20, spdef=15<<25
    const ivData = 15 | (15 << 5) | (15 << 10) | (15 << 15) | (15 << 20) | (15 << 25);
    dv.setUint32(40, ivData, true); // word 10 = sub3 word 1

    const words: number[] = [];
    for (let i = 0; i < 12; i++) words.push(dv.getUint32(i * 4, true));

    const result = decryptPokemon(pv, otid, words);
    expect(result.speciesId).toBe(25);
    expect(result.experience).toBe(1000);
    expect(result.friendship).toBe(70);
    expect(result.moves[0]).toBe(85);
    expect(result.pp[0]).toBe(35);
    expect(result.ivs.hp).toBe(15);
    expect(result.ivs.atk).toBe(15);
    expect(result.ivs.def).toBe(15);
    expect(result.ivs.spd).toBe(15);
    expect(result.ivs.spatk).toBe(15);
    expect(result.ivs.spdef).toBe(15);
    expect(result.isEgg).toBe(false);
  });

  it("XOR decryption reverses the key correctly", () => {
    const pv = 0x12345678;
    const otid = 0xABCD0000;
    const key = (pv ^ otid) >>> 0;

    // Encrypt 12 zeros: after XOR with key, each word becomes key
    const encWords = new Array(12).fill(key);

    // PV % 24 = 0x12345678 % 24 = 8 → order [1,2,0,3]
    // After decrypt, all words are 0, so all values are 0
    const result = decryptPokemon(pv, otid, encWords);
    expect(result.speciesId).toBe(0);
    expect(result.moves).toEqual([0, 0, 0, 0]);
  });
});

describe("decodeGen3Text", () => {
  it("decodes uppercase letters (0xBB-0xD4)", () => {
    // A=0xBB, B=0xBC, C=0xBD
    const bytes = new Uint8Array([0xBB, 0xBC, 0xBD, 0xFF]);
    expect(decodeGen3Text(bytes, 0, 4, "none")).toBe("ABC");
  });

  it("decodes lowercase letters (0xD5-0xEE)", () => {
    // a=0xD5, b=0xD6, c=0xD7
    const bytes = new Uint8Array([0xD5, 0xD6, 0xD7, 0xFF]);
    expect(decodeGen3Text(bytes, 0, 4, "none")).toBe("abc");
  });

  it("decodes digits (0xA1-0xAA)", () => {
    // 0=0xA1, 1=0xA2, 9=0xAA
    const bytes = new Uint8Array([0xA1, 0xA2, 0xAA, 0xFF]);
    expect(decodeGen3Text(bytes, 0, 4, "none")).toBe("019");
  });

  it("sentence case: first upper, rest lower", () => {
    // P=0xCA, I=0xC3, K=0xC5, A=0xBB, C=0xBD, H=0xC2, U=0xCF
    const bytes = new Uint8Array([0xCA, 0xC3, 0xC5, 0xBB, 0xBD, 0xC2, 0xCF, 0xFF]);
    expect(decodeGen3Text(bytes, 0, 8, "sentence")).toBe("Pikachu");
  });

  it("stops at 0xFF terminator", () => {
    const bytes = new Uint8Array([0xBB, 0xBC, 0xFF, 0xBD, 0xBE]);
    expect(decodeGen3Text(bytes, 0, 5, "none")).toBe("AB");
  });

  it("returns ??? for empty input", () => {
    const bytes = new Uint8Array([0xFF]);
    expect(decodeGen3Text(bytes, 0, 1)).toBe("???");
  });

  it("respects offset parameter", () => {
    const bytes = new Uint8Array([0x00, 0x00, 0xBB, 0xBC, 0xFF]);
    expect(decodeGen3Text(bytes, 2, 3, "none")).toBe("AB");
  });

  it("decodes special characters", () => {
    // ! = 0xAB, ? = 0xAC, . = 0xAD, - = 0xAE, ' = 0xB4, é = 0x1B
    const bytes = new Uint8Array([0xAB, 0xAC, 0xAD, 0xAE, 0xB4, 0x1B, 0xFF]);
    expect(decodeGen3Text(bytes, 0, 7, "none")).toBe("!?.-'é");
  });

  it("word case capitalizes each word", () => {
    // "MR MIME" in Gen 3 encoding
    // M=0xC7, R=0xCC, space=0x00, M=0xC7, I=0xC3, M=0xC7, E=0xBF
    const bytes = new Uint8Array([0xC7, 0xCC, 0x00, 0xC7, 0xC3, 0xC7, 0xBF, 0xFF]);
    expect(decodeGen3Text(bytes, 0, 8, "word")).toBe("Mr Mime");
  });
});

describe("decodeNickname", () => {
  it("reads 10 bytes starting at slotOff + 0x08", () => {
    const buf = new ArrayBuffer(32);
    const dv = new DataView(buf);
    const arr = new Uint8Array(buf);
    // Write "ABC" at offset 0x08 (slot offset 0)
    arr[0x08] = 0xBB; // A
    arr[0x09] = 0xBC; // B
    arr[0x0A] = 0xBD; // C
    arr[0x0B] = 0xFF; // terminator
    expect(decodeNickname(dv, 0)).toBe("Abc");
  });
});

describe("toNationalDex", () => {
  it("returns identity for Gen 1-2 IDs (1-251)", () => {
    expect(toNationalDex(1)).toBe(1);
    expect(toNationalDex(25)).toBe(25);
    expect(toNationalDex(251)).toBe(251);
  });

  it("maps Hoenn IDs to National Dex (277-410)", () => {
    expect(toNationalDex(277)).toBe(252); // Treecko
    expect(toNationalDex(410)).toBe(386); // Deoxys
  });

  it("returns 0 for out-of-range IDs", () => {
    expect(toNationalDex(0)).toBe(0);
    expect(toNationalDex(252)).toBe(0);
    expect(toNationalDex(276)).toBe(0);
    expect(toNationalDex(411)).toBe(0);
  });
});

describe("constants", () => {
  it("SUBSTRUCTURE_ORDER has 24 entries", () => {
    expect(SUBSTRUCTURE_ORDER).toHaveLength(24);
  });

  it("NATURES has 25 entries", () => {
    expect(NATURES).toHaveLength(25);
  });

  it("NATURE_STAT_NAMES has 5 entries", () => {
    expect(NATURE_STAT_NAMES).toEqual(["Atk", "Def", "Spd", "SpA", "SpD"]);
  });

  it("HP_TYPES has 16 entries", () => {
    expect(HP_TYPES).toHaveLength(16);
  });
});
