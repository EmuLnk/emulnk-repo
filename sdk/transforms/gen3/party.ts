import type { TransformDefinition } from "../types.js";
import type { Gen3Pokemon, Gen3RomTables } from "./types.js";
import { decodeBase64ToDataView } from "../../decode.js";
import { decryptPokemon, calcNature, calcHiddenPower, decodeNickname, toNationalDex } from "../../parsers/pokemon-gen3.js";

function parseSlot(dv: DataView, off: number, romTables?: Gen3RomTables): Gen3Pokemon | null {
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

  const speciesId = toNationalDex(dec.speciesId);
  let ability = 0;
  if (romTables?.speciesAbilities) {
    const slots = romTables.speciesAbilities[dec.speciesId];
    if (slots) ability = slots[dec.abilityNum] || slots[0];
  }

  return {
    pv, otid, speciesName,
    speciesId,
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

export const partyTransform: TransformDefinition = {
  id: "party",
  inputs: ["party_data", "party_count", "rom_tables"],
  after: ["rom_tables"],
  fn(ctx) {
    const values = ctx.values as Record<string, unknown>;
    const raw = values.party_data as string | undefined;
    const count = Math.max(0, Math.min((values.party_count as number) || 0, 6));

    if (!raw || count === 0) return { party: [] as (Gen3Pokemon | null)[] };

    const dv = decodeBase64ToDataView(raw);
    const romTables = values.rom_tables as Gen3RomTables | undefined;
    const party: (Gen3Pokemon | null)[] = [];

    for (let i = 0; i < 6; i++) {
      if (i >= count) { party.push(null); continue; }
      try {
        const mon = parseSlot(dv, i * 0x64, romTables);
        party.push(mon);
      } catch (err) {
        console.error(`[EmuLnk] Party slot ${i} parse error:`, err);
        party.push(null);
      }
    }

    return { party };
  },
};
