export type RelicCategory =
  | "transformation"
  | "bat"
  | "wolf"
  | "mist"
  | "movement"
  | "passive"
  | "familiar"
  | "vlad";

export interface RelicDef {
  id: number;
  name: string;
  description: string;
  category: RelicCategory;
}

/** Category display labels and order */
export const RELIC_CATEGORIES: { key: RelicCategory; label: string }[] = [
  { key: "transformation", label: "Transformation" },
  { key: "bat", label: "Bat Abilities" },
  { key: "wolf", label: "Wolf Abilities" },
  { key: "mist", label: "Mist Abilities" },
  { key: "movement", label: "Movement" },
  { key: "passive", label: "Passive" },
  { key: "familiar", label: "Familiar Cards" },
  { key: "vlad", label: "Vlad's Relics" },
];

// prettier-ignore
export const RELICS: RelicDef[] = [
  { id: 0,  name: "Soul of Bat",     description: "Transform into a bat",           category: "transformation" },
  { id: 1,  name: "Fire of Bat",     description: "Fireball in bat form",           category: "bat" },
  { id: 2,  name: "Echo of Bat",     description: "Sonar in bat form",              category: "bat" },
  { id: 3,  name: "Force of Echo",   description: "Enhanced sonar attack",          category: "bat" },
  { id: 4,  name: "Soul of Wolf",    description: "Transform into a wolf",          category: "transformation" },
  { id: 5,  name: "Power of Wolf",   description: "Running charge attack",          category: "wolf" },
  { id: 6,  name: "Skill of Wolf",   description: "Swim against currents",          category: "wolf" },
  { id: 7,  name: "Form of Mist",    description: "Transform into mist",            category: "transformation" },
  { id: 8,  name: "Power of Mist",   description: "Damaging mist form",             category: "mist" },
  { id: 9,  name: "Gas Cloud",       description: "Poisonous mist form",            category: "mist" },
  { id: 10, name: "Cube of Zoe",     description: "Items drop from candles",        category: "passive" },
  { id: 11, name: "Spirit Orb",      description: "See enemy damage numbers",       category: "passive" },
  { id: 12, name: "Gravity Boots",   description: "High jump ability",              category: "movement" },
  { id: 13, name: "Leap Stone",      description: "Double jump ability",            category: "movement" },
  { id: 14, name: "Holy Symbol",     description: "Move freely in water",           category: "passive" },
  { id: 15, name: "Faerie Scroll",   description: "Faerie gives advice",            category: "passive" },
  { id: 16, name: "Jewel of Open",   description: "Open blue doors",               category: "passive" },
  { id: 17, name: "Merman Statue",   description: "Summon merman ferry",            category: "passive" },
  { id: 18, name: "Bat Card",        description: "Summon Bat familiar",            category: "familiar" },
  { id: 19, name: "Ghost Card",      description: "Summon Ghost familiar",          category: "familiar" },
  { id: 20, name: "Faerie Card",     description: "Summon Faerie familiar",         category: "familiar" },
  { id: 21, name: "Demon Card",      description: "Summon Demon familiar",          category: "familiar" },
  { id: 22, name: "Sword Card",      description: "Summon Sword familiar",          category: "familiar" },
  { id: 23, name: "Nose Devil",      description: "JP-only familiar",               category: "familiar" },
  { id: 24, name: "Half Faerie",     description: "JP-only familiar",               category: "familiar" },
  { id: 25, name: "Heart of Vlad",   description: "Dracula's heart",               category: "vlad" },
  { id: 26, name: "Tooth of Vlad",   description: "Dracula's tooth",               category: "vlad" },
  { id: 27, name: "Rib of Vlad",     description: "Dracula's rib",                 category: "vlad" },
  { id: 28, name: "Ring of Vlad",    description: "Dracula's ring",                category: "vlad" },
  { id: 29, name: "Eye of Vlad",     description: "Dracula's eye",                 category: "vlad" },
];
