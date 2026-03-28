export type FamiliarKey = "bat" | "ghost" | "faerie" | "demon" | "sword";

export interface FamiliarDef {
  key: FamiliarKey;
  name: string;
  description: string;
  /** Relic index (18-22) that activates this familiar */
  relicIndex: number;
  /** Memory address for familiar EXP (4-byte s32) */
  expAddr: string;
}

// prettier-ignore
export const FAMILIARS: FamiliarDef[] = [
  { key: "bat",    name: "Bat",    description: "Attacks enemies by swooping",     relicIndex: 18, expAddr: "0x00097C48" },
  { key: "ghost",  name: "Ghost",  description: "Attacks and steals enemy souls",  relicIndex: 19, expAddr: "0x00097C54" },
  { key: "faerie", name: "Faerie", description: "Heals and gives item hints",      relicIndex: 20, expAddr: "0x00097C60" },
  { key: "demon",  name: "Demon",  description: "Casts powerful attack spells",    relicIndex: 21, expAddr: "0x00097C6C" },
  { key: "sword",  name: "Sword",  description: "Fights alongside as a blade",    relicIndex: 22, expAddr: "0x00097C78" },
];
