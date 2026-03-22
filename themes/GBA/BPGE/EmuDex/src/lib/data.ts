import type { Nature } from "./types.js";

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
