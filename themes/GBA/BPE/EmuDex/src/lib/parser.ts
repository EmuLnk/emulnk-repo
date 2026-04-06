import type { Pokemon, BPEValues } from "./types.js";
import { decryptPokemon, calcNature, calcHiddenPower, decodeNickname } from "./crypto.js";
import { decodeBase64ToDataView } from "@emulnk/sdk";
import { toNationalDex, getSpeciesAbilityId } from "./rom-tables.js";

export function parseSlot(dv: DataView, off: number): Pokemon | null {
  if (off + 0x64 > dv.byteLength) return null;

  const pv = dv.getUint32(off + 0x00, true);
  const otid = dv.getUint32(off + 0x04, true);

  const encWords: number[] = [];
  for (let j = 0; j < 12; j++) {
    encWords.push(dv.getUint32(off + 0x20 + j * 4, true));
  }

  const status = dv.getUint32(off + 0x50, true);
  const level = dv.getUint8(off + 0x54);
  const hp = dv.getUint16(off + 0x56, true);
  const maxhp = dv.getUint16(off + 0x58, true);
  const atk = dv.getUint16(off + 0x5A, true);
  const def_ = dv.getUint16(off + 0x5C, true);
  const speed = dv.getUint16(off + 0x5E, true);
  const spatk = dv.getUint16(off + 0x60, true);
  const spdef = dv.getUint16(off + 0x62, true);

  const dec = decryptPokemon(pv, otid, encWords);
  const nature = calcNature(pv);
  const hiddenPower = calcHiddenPower(dec.ivs);
  const speciesName = decodeNickname(dv, off);
  const ability = getSpeciesAbilityId(dec.speciesId, dec.abilityNum);

  return {
    pv, otid, speciesName,
    speciesId: toNationalDex(dec.speciesId),
    internalSpeciesId: dec.speciesId,
    level, hp, maxhp, atk, def: def_, speed, spatk, spdef, status,
    nature,
    ivs: dec.ivs,
    evs: dec.evs,
    moves: dec.moves,
    pp: dec.pp,
    friendship: dec.friendship,
    hiddenPower,
    isEgg: dec.isEgg,
    heldItem: dec.heldItem,
    ability,
  };
}

export function processParty(
  values: BPEValues,
  currentParty: (Pokemon | null)[],
  currentCount: number,
): { party: (Pokemon | null)[]; count: number } {
  const newCount = Math.max(0, Math.min(values.party_count || 0, 6));
  if (newCount === 0 && currentCount > 0) {
    return { party: currentParty, count: currentCount };
  }

  const raw = values.party_data;
  if (!raw) {
    return { party: currentParty, count: newCount };
  }

  const dv = decodeBase64ToDataView(raw);
  const party = [...currentParty];

  for (let i = 0; i < 6; i++) {
    if (i >= newCount) {
      party[i] = null;
      continue;
    }
    try {
      const parsed = parseSlot(dv, i * 0x64);
      if (parsed) {
        party[i] = parsed;
      } else if (!party[i]) {
        party[i] = null;
      }
    } catch {
      // Keep previous data for this slot on parse error
    }
  }

  return { party, count: newCount };
}
