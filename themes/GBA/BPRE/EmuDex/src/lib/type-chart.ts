// Gen 3 type system (17 types, no Fairy)
// Index: 0=Normal,1=Fighting,2=Flying,3=Poison,4=Ground,5=Rock,6=Bug,7=Ghost,8=Steel,
//        9=Fire,10=Water,11=Grass,12=Electric,13=Psychic,14=Ice,15=Dragon,16=Dark

export const TYPE_NAMES: readonly string[] = [
  "Normal","Fighting","Flying","Poison","Ground","Rock","Bug","Ghost","Steel",
  "Fire","Water","Grass","Electric","Psychic","Ice","Dragon","Dark",
];

export const TYPE_COLORS: Record<number, string> = {
  0:"#A8A878",  // Normal
  1:"#C03028",  // Fighting
  2:"#A890F0",  // Flying
  3:"#A040A0",  // Poison
  4:"#E0C068",  // Ground
  5:"#B8A038",  // Rock
  6:"#A8B820",  // Bug
  7:"#705898",  // Ghost
  8:"#B8B8D0",  // Steel
  9:"#F08030",  // Fire
  10:"#6890F0", // Water
  11:"#78C850", // Grass
  12:"#F8D030", // Electric
  13:"#F85888", // Psychic
  14:"#98D8D8", // Ice
  15:"#7038F8", // Dragon
  16:"#705848", // Dark
};

// Effectiveness matrix: CHART[attackType][defenseType] = multiplier
// 0=immune, 0.5=not very effective, 1=normal, 2=super effective
const x = 1, h = 0.5, o = 0, d = 2;
export const TYPE_CHART: readonly (readonly number[])[] = [
  //          Nor Fig Fly Poi Gro Roc Bug Gho Ste Fir Wat Gra Ele Psy Ice Dra Dar
  /* Normal  */[x,  x,  x,  x,  x,  h,  x,  o,  h,  x,  x,  x,  x,  x,  x,  x,  x],
  /* Fight   */[d,  x,  h,  h,  x,  d,  h,  o,  d,  x,  x,  x,  x,  h,  d,  x,  d],
  /* Flying  */[x,  d,  x,  x,  x,  h,  d,  x,  h,  x,  x,  d,  h,  x,  x,  x,  x],
  /* Poison  */[x,  x,  x,  h,  h,  h,  d,  h,  o,  x,  x,  d,  x,  x,  x,  x,  x],
  /* Ground  */[x,  x,  o,  d,  x,  d,  h,  x,  d,  d,  x,  h,  d,  x,  x,  x,  x],
  /* Rock    */[x,  h,  d,  x,  h,  x,  d,  x,  h,  d,  x,  x,  x,  x,  d,  x,  x],
  /* Bug     */[x,  h,  h,  h,  x,  x,  x,  h,  h,  h,  x,  d,  x,  d,  x,  x,  d],
  /* Ghost   */[o,  x,  x,  x,  x,  x,  x,  d,  h,  x,  x,  x,  x,  d,  x,  x,  h],
  /* Steel   */[x,  x,  x,  x,  x,  d,  x,  x,  h,  h,  h,  x,  h,  x,  d,  x,  x],
  /* Fire    */[x,  x,  x,  x,  x,  h,  d,  x,  d,  h,  h,  d,  x,  x,  d,  h,  x],
  /* Water   */[x,  x,  x,  x,  d,  d,  x,  x,  x,  d,  h,  h,  x,  x,  x,  h,  x],
  /* Grass   */[x,  x,  h,  h,  d,  d,  h,  x,  h,  h,  d,  h,  x,  x,  x,  h,  x],
  /* Electr  */[x,  x,  d,  x,  o,  x,  x,  x,  x,  x,  d,  h,  h,  x,  x,  h,  x],
  /* Psychic */[x,  d,  x,  d,  x,  x,  x,  x,  h,  x,  x,  x,  x,  h,  x,  x,  o],
  /* Ice     */[x,  x,  d,  x,  d,  x,  x,  x,  h,  h,  h,  d,  x,  x,  h,  d,  x],
  /* Dragon  */[x,  x,  x,  x,  x,  x,  x,  x,  h,  x,  x,  x,  x,  x,  x,  d,  x],
  /* Dark    */[x,  h,  x,  x,  x,  x,  x,  d,  h,  x,  x,  x,  x,  d,  x,  x,  h],
];

export function getEffectiveness(atkType: number, defType1: number, defType2: number): number {
  let eff = TYPE_CHART[atkType]?.[defType1] ?? 1;
  if (defType2 !== defType1) {
    eff *= TYPE_CHART[atkType]?.[defType2] ?? 1;
  }
  return eff;
}

export function getWeaknesses(type1: number, type2: number): number[] {
  const weak: number[] = [];
  for (let t = 0; t < 17; t++) {
    const eff = getEffectiveness(t, type1, type2);
    if (eff > 1) weak.push(t);
  }
  return weak;
}

export function getResistances(type1: number, type2: number): number[] {
  const res: number[] = [];
  for (let t = 0; t < 17; t++) {
    const eff = getEffectiveness(t, type1, type2);
    if (eff > 0 && eff < 1) res.push(t);
  }
  return res;
}

export function getImmunities(type1: number, type2: number): number[] {
  const imm: number[] = [];
  for (let t = 0; t < 17; t++) {
    const eff = getEffectiveness(t, type1, type2);
    if (eff === 0) imm.push(t);
  }
  return imm;
}

// Gen 3: physical/special split is by TYPE, not per-move
// Physical types: Normal, Fighting, Flying, Ground, Rock, Bug, Ghost, Poison, Steel
// Special types: Fire, Water, Grass, Electric, Psychic, Ice, Dragon, Dark
const PHYSICAL_TYPES = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);

export function isPhysical(typeIdx: number): boolean {
  return PHYSICAL_TYPES.has(typeIdx);
}
