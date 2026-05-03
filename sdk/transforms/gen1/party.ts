import type { TransformDefinition } from "../types.js";
import { decodeBase64, decodeBase64ToDataView } from "../../decode.js";
import { parseGen1PartyMon } from "../../parsers/pokemon-gen1.js";
import type { Gen1Pokemon } from "./types.js";

const PARTY_SIZE = 6;
const PARTY_MON_SIZE = 0x2c;
const NICKNAME_SIZE = 11;

export const partyTransform: TransformDefinition = {
  id: "party",
  inputs: ["party_data", "party_count", "party_nicknames"],
  fn(ctx) {
    const values = ctx.values as Record<string, unknown>;
    const raw = values.party_data as string | undefined;
    const count = Math.max(0, Math.min((values.party_count as number) || 0, PARTY_SIZE));
    const nicknameRaw = values.party_nicknames as string | undefined;

    if (!raw) return { party: Array(PARTY_SIZE).fill(null) as Array<Gen1Pokemon | null> };

    const dv = decodeBase64ToDataView(raw);
    const nicknameBytes = nicknameRaw ? decodeBase64(nicknameRaw) : undefined;
    const party: Array<Gen1Pokemon | null> = [];

    for (let i = 0; i < PARTY_SIZE; i++) {
      if (i >= count) {
        party.push(null);
        continue;
      }
      const nickSlice = nicknameBytes?.slice(i * NICKNAME_SIZE, i * NICKNAME_SIZE + NICKNAME_SIZE);
      party.push(parseGen1PartyMon(dv, i * PARTY_MON_SIZE, 0, nickSlice));
    }

    return { party };
  },
};
