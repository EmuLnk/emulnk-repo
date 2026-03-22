// Pokemon FireRed (BPRE) wild encounter data
// Extracted from pokefirered decomp wild_encounters.json
// Species are national dex IDs, rates are deduplicated slot percentages
// Dungeon map IDs verified from decomp map_groups.json

export type EncounterMethod = "grass" | "water" | "fish-old" | "fish-good" | "fish-super" | "rock";

export interface RouteEncounter {
  species: number;
  method: EncounterMethod;
  minLevel: number;
  maxLevel: number;
  rate: number;
}

// Key: "mapGroup:mapNum"
export const ROUTE_ENCOUNTERS: Record<string, RouteEncounter[]> = {

  // ==================== TOWNS & CITIES (Group 3) ====================

  // Pallet Town (3:0)
  "3:0": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 },        // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },     // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },    // Horsea
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },     // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },    // Magikarp
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },  // Horsea
    { species: 90, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },   // Shellder
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 },  // Gyarados
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 },   // Seadra
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 },    // Psyduck
  ],

  // Viridian City (3:1)
  "3:1": [
    { species: 54, method: "water", minLevel: 20, maxLevel: 40, rate: 100 },       // Psyduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },     // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },     // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },    // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },    // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },   // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 },   // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 },  // Gyarados
    { species: 54, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 },    // Psyduck
  ],

  // Cerulean City (3:3)
  "3:3": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 },        // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },     // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },    // Horsea
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },     // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },    // Magikarp
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 84 },  // Horsea
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 },  // Gyarados
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 },    // Psyduck
  ],

  // Vermilion City (3:5)
  "3:5": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 },        // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },     // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },    // Horsea
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },     // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },    // Magikarp
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 44 },  // Horsea
    { species: 90, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },   // Shellder
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 },  // Gyarados
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 },    // Psyduck
  ],

  // Celadon City (3:6)
  "3:6": [
    { species: 54, method: "water", minLevel: 5, maxLevel: 40, rate: 99 },         // Psyduck
    { species: 109, method: "water", minLevel: 30, maxLevel: 40, rate: 1 },        // Koffing
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },     // Magikarp
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 100 },   // Magikarp
    { species: 129, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 99 },  // Magikarp
    { species: 88, method: "fish-super", minLevel: 30, maxLevel: 40, rate: 1 },    // Grimer
  ],

  // Fuchsia City (3:7)
  "3:7": [
    { species: 54, method: "water", minLevel: 20, maxLevel: 40, rate: 100 },       // Psyduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },     // Magikarp
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },    // Goldeen
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },     // Poliwag
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },    // Magikarp
    { species: 118, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },  // Goldeen
    { species: 119, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 },  // Seaking
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 },  // Gyarados
    { species: 54, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 },    // Psyduck
  ],

  // Cinnabar Island (3:8)
  "3:8": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 },        // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },     // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },    // Horsea
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },     // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },    // Magikarp
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },  // Horsea
    { species: 90, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },   // Shellder
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 },  // Gyarados
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 },   // Seadra
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 },    // Psyduck
  ],

  // One Island (3:12)
  "3:12": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 },         // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },         // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },     // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 },    // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 },    // Magikarp
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },  // Horsea
    { species: 90, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },   // Shellder
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 },  // Gyarados
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 },   // Seadra
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 },    // Psyduck
  ],

  // ==================== ROUTES (Group 3) ====================

  // Route 1
  "3:19": [
    { species: 16, method: "grass", minLevel: 2, maxLevel: 5, rate: 50 },  // Pidgey
    { species: 19, method: "grass", minLevel: 2, maxLevel: 4, rate: 50 },  // Rattata
  ],

  // Route 2
  "3:20": [
    { species: 19, method: "grass", minLevel: 2, maxLevel: 5, rate: 45 },  // Rattata
    { species: 16, method: "grass", minLevel: 2, maxLevel: 5, rate: 45 },  // Pidgey
    { species: 10, method: "grass", minLevel: 4, maxLevel: 5, rate: 5 },   // Caterpie
    { species: 13, method: "grass", minLevel: 4, maxLevel: 5, rate: 5 },   // Weedle
  ],

  // Route 3
  "3:21": [
    { species: 21, method: "grass", minLevel: 6, maxLevel: 8, rate: 35 },  // Spearow
    { species: 16, method: "grass", minLevel: 6, maxLevel: 7, rate: 30 },  // Pidgey
    { species: 32, method: "grass", minLevel: 6, maxLevel: 7, rate: 14 },  // Nidoran♂
    { species: 56, method: "grass", minLevel: 7, maxLevel: 7, rate: 10 },  // Mankey
    { species: 39, method: "grass", minLevel: 3, maxLevel: 7, rate: 10 },  // Jigglypuff
    { species: 29, method: "grass", minLevel: 6, maxLevel: 6, rate: 1 },   // Nidoran♀
  ],

  // Route 4
  "3:22": [
    { species: 21, method: "grass", minLevel: 8, maxLevel: 12, rate: 35 },  // Spearow
    { species: 19, method: "grass", minLevel: 8, maxLevel: 12, rate: 35 },  // Rattata
    { species: 23, method: "grass", minLevel: 6, maxLevel: 12, rate: 25 },  // Ekans
    { species: 56, method: "grass", minLevel: 10, maxLevel: 12, rate: 5 },  // Mankey
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 },  // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },  // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },  // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Horsea
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Gyarados
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 15 }, // Seadra
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },   // Psyduck
  ],

  // Route 5
  "3:23": [
    { species: 16, method: "grass", minLevel: 13, maxLevel: 16, rate: 40 }, // Pidgey
    { species: 52, method: "grass", minLevel: 10, maxLevel: 16, rate: 35 }, // Meowth
    { species: 43, method: "grass", minLevel: 13, maxLevel: 16, rate: 25 }, // Oddish
  ],

  // Route 6
  "3:24": [
    { species: 16, method: "grass", minLevel: 13, maxLevel: 16, rate: 40 }, // Pidgey
    { species: 52, method: "grass", minLevel: 10, maxLevel: 16, rate: 35 }, // Meowth
    { species: 43, method: "grass", minLevel: 13, maxLevel: 16, rate: 25 }, // Oddish
    { species: 54, method: "water", minLevel: 20, maxLevel: 40, rate: 95 }, // Psyduck
    { species: 55, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },  // Golduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },  // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 }, // Goldeen
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 40 }, // Poliwhirl
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 15 }, // Psyduck
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 5 },  // Gyarados
  ],

  // Route 7
  "3:25": [
    { species: 52, method: "grass", minLevel: 17, maxLevel: 20, rate: 40 }, // Meowth
    { species: 16, method: "grass", minLevel: 19, maxLevel: 22, rate: 30 }, // Pidgey
    { species: 43, method: "grass", minLevel: 19, maxLevel: 22, rate: 20 }, // Oddish
    { species: 58, method: "grass", minLevel: 18, maxLevel: 20, rate: 10 }, // Growlithe
  ],

  // Route 8
  "3:26": [
    { species: 52, method: "grass", minLevel: 18, maxLevel: 22, rate: 35 }, // Meowth
    { species: 16, method: "grass", minLevel: 18, maxLevel: 20, rate: 30 }, // Pidgey
    { species: 23, method: "grass", minLevel: 17, maxLevel: 19, rate: 20 }, // Ekans
    { species: 58, method: "grass", minLevel: 15, maxLevel: 18, rate: 15 }, // Growlithe
  ],

  // Route 9
  "3:27": [
    { species: 21, method: "grass", minLevel: 13, maxLevel: 17, rate: 35 }, // Spearow
    { species: 19, method: "grass", minLevel: 14, maxLevel: 17, rate: 35 }, // Rattata
    { species: 23, method: "grass", minLevel: 11, maxLevel: 17, rate: 30 }, // Ekans
  ],

  // Route 10
  "3:28": [
    { species: 100, method: "grass", minLevel: 14, maxLevel: 17, rate: 40 }, // Voltorb
    { species: 21, method: "grass", minLevel: 13, maxLevel: 17, rate: 30 },  // Spearow
    { species: 23, method: "grass", minLevel: 11, maxLevel: 17, rate: 30 },  // Ekans
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 },   // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },   // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },  // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Horsea
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Gyarados
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 15 }, // Seadra
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },   // Psyduck
  ],

  // Route 11
  "3:29": [
    { species: 23, method: "grass", minLevel: 11, maxLevel: 15, rate: 40 },  // Ekans
    { species: 21, method: "grass", minLevel: 13, maxLevel: 17, rate: 35 },  // Spearow
    { species: 96, method: "grass", minLevel: 11, maxLevel: 15, rate: 25 },  // Drowzee
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 },   // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },   // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Horsea
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Krabby
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Horsea
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 40 }, // Seadra
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 90, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 5 },   // Shellder
  ],

  // Route 12
  "3:30": [
    { species: 43, method: "grass", minLevel: 22, maxLevel: 26, rate: 40 }, // Oddish
    { species: 48, method: "grass", minLevel: 24, maxLevel: 26, rate: 25 }, // Venonat
    { species: 16, method: "grass", minLevel: 23, maxLevel: 27, rate: 25 }, // Pidgey
    { species: 44, method: "grass", minLevel: 28, maxLevel: 30, rate: 10 }, // Gloom
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 },  // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },  // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Horsea
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Krabby
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Horsea
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 40 }, // Seadra
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 90, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 5 },   // Shellder
  ],

  // Route 13
  "3:31": [
    { species: 43, method: "grass", minLevel: 22, maxLevel: 26, rate: 35 }, // Oddish
    { species: 48, method: "grass", minLevel: 24, maxLevel: 26, rate: 25 }, // Venonat
    { species: 16, method: "grass", minLevel: 25, maxLevel: 27, rate: 20 }, // Pidgey
    { species: 44, method: "grass", minLevel: 28, maxLevel: 30, rate: 10 }, // Gloom
    { species: 132, method: "grass", minLevel: 25, maxLevel: 25, rate: 5 }, // Ditto
    { species: 17, method: "grass", minLevel: 29, maxLevel: 29, rate: 5 },  // Pidgeotto
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 },  // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },  // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Horsea
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Krabby
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Horsea
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 40 }, // Seadra
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 90, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 5 },   // Shellder
  ],

  // Route 14
  "3:32": [
    { species: 43, method: "grass", minLevel: 22, maxLevel: 26, rate: 35 }, // Oddish
    { species: 48, method: "grass", minLevel: 24, maxLevel: 26, rate: 25 }, // Venonat
    { species: 16, method: "grass", minLevel: 27, maxLevel: 27, rate: 15 }, // Pidgey
    { species: 44, method: "grass", minLevel: 30, maxLevel: 30, rate: 10 }, // Gloom
    { species: 132, method: "grass", minLevel: 23, maxLevel: 23, rate: 5 }, // Ditto
    { species: 17, method: "grass", minLevel: 29, maxLevel: 29, rate: 5 },  // Pidgeotto
  ],

  // Route 15
  "3:33": [
    { species: 43, method: "grass", minLevel: 22, maxLevel: 26, rate: 35 }, // Oddish
    { species: 48, method: "grass", minLevel: 24, maxLevel: 26, rate: 25 }, // Venonat
    { species: 16, method: "grass", minLevel: 25, maxLevel: 27, rate: 20 }, // Pidgey
    { species: 44, method: "grass", minLevel: 28, maxLevel: 30, rate: 10 }, // Gloom
    { species: 132, method: "grass", minLevel: 23, maxLevel: 23, rate: 5 }, // Ditto
    { species: 17, method: "grass", minLevel: 29, maxLevel: 29, rate: 5 },  // Pidgeotto
  ],

  // Route 16
  "3:34": [
    { species: 21, method: "grass", minLevel: 20, maxLevel: 22, rate: 30 }, // Spearow
    { species: 84, method: "grass", minLevel: 18, maxLevel: 22, rate: 30 }, // Doduo
    { species: 19, method: "grass", minLevel: 18, maxLevel: 22, rate: 30 }, // Rattata
    { species: 20, method: "grass", minLevel: 23, maxLevel: 25, rate: 10 }, // Raticate
  ],

  // Route 17 (Cycling Road)
  "3:35": [
    { species: 84, method: "grass", minLevel: 24, maxLevel: 28, rate: 40 }, // Doduo
    { species: 21, method: "grass", minLevel: 20, maxLevel: 22, rate: 20 }, // Spearow
    { species: 20, method: "grass", minLevel: 25, maxLevel: 29, rate: 20 }, // Raticate
    { species: 19, method: "grass", minLevel: 22, maxLevel: 22, rate: 10 }, // Rattata
    { species: 22, method: "grass", minLevel: 25, maxLevel: 27, rate: 10 }, // Fearow
  ],

  // Route 18
  "3:36": [
    { species: 84, method: "grass", minLevel: 24, maxLevel: 28, rate: 40 }, // Doduo
    { species: 21, method: "grass", minLevel: 20, maxLevel: 22, rate: 20 }, // Spearow
    { species: 20, method: "grass", minLevel: 25, maxLevel: 29, rate: 15 }, // Raticate
    { species: 22, method: "grass", minLevel: 25, maxLevel: 29, rate: 15 }, // Fearow
    { species: 19, method: "grass", minLevel: 22, maxLevel: 22, rate: 10 }, // Rattata
  ],

  // Route 19
  "3:37": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 },  // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },  // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Horsea
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Krabby
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Horsea
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 40 }, // Seadra
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },   // Psyduck
  ],

  // Route 20
  "3:38": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 },  // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },  // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Horsea
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Krabby
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Horsea
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 40 }, // Seadra
    { species: 120, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Staryu
    { species: 90, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 5 },   // Shellder
  ],

  // Route 21 North
  "3:39": [
    { species: 114, method: "grass", minLevel: 17, maxLevel: 28, rate: 100 }, // Tangela
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 },    // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },    // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Horsea
    { species: 90, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Shellder
    { species: 90, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Shellder
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Gyarados
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 15 }, // Horsea
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },  // Seadra
  ],

  // Route 21 South
  "3:40": [
    { species: 114, method: "grass", minLevel: 17, maxLevel: 28, rate: 100 }, // Tangela
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 },    // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },    // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Horsea
    { species: 90, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Shellder
    { species: 90, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Shellder
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Gyarados
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 15 }, // Horsea
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },  // Seadra
  ],

  // Route 22
  "3:41": [
    { species: 19, method: "grass", minLevel: 2, maxLevel: 5, rate: 45 },   // Rattata
    { species: 56, method: "grass", minLevel: 2, maxLevel: 5, rate: 30 },   // Mankey
    { species: 21, method: "grass", minLevel: 3, maxLevel: 5, rate: 25 },   // Spearow
    { species: 54, method: "water", minLevel: 20, maxLevel: 40, rate: 95 }, // Psyduck
    { species: 55, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },  // Golduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },  // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 }, // Goldeen
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 40 }, // Poliwhirl
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 15 }, // Psyduck
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 5 },  // Gyarados
  ],

  // Route 23
  "3:42": [
    { species: 56, method: "grass", minLevel: 32, maxLevel: 34, rate: 30 },  // Mankey
    { species: 21, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Spearow
    { species: 23, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Ekans
    { species: 22, method: "grass", minLevel: 40, maxLevel: 44, rate: 15 },  // Fearow
    { species: 57, method: "grass", minLevel: 42, maxLevel: 42, rate: 5 },   // Primeape
    { species: 24, method: "grass", minLevel: 44, maxLevel: 44, rate: 5 },   // Arbok
    { species: 54, method: "water", minLevel: 20, maxLevel: 40, rate: 95 },  // Psyduck
    { species: 55, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },   // Golduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },  // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 }, // Goldeen
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 40 }, // Poliwhirl
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 15 }, // Slowpoke
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },  // Kingler
  ],

  // Route 24 (Nugget Bridge)
  "3:43": [
    { species: 43, method: "grass", minLevel: 12, maxLevel: 14, rate: 30 }, // Oddish
    { species: 16, method: "grass", minLevel: 11, maxLevel: 13, rate: 25 }, // Pidgey
    { species: 63, method: "grass", minLevel: 8, maxLevel: 12, rate: 20 },  // Abra
    { species: 13, method: "grass", minLevel: 7, maxLevel: 7, rate: 10 },   // Weedle
    { species: 10, method: "grass", minLevel: 7, maxLevel: 7, rate: 5 },    // Caterpie
    { species: 14, method: "grass", minLevel: 8, maxLevel: 8, rate: 5 },    // Kakuna
    { species: 11, method: "grass", minLevel: 8, maxLevel: 8, rate: 5 },    // Metapod
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 },  // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },  // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },  // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 40 }, // Poliwhirl
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 15 }, // Psyduck
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },  // Slowpoke
  ],

  // Route 25
  "3:44": [
    { species: 43, method: "grass", minLevel: 12, maxLevel: 14, rate: 30 }, // Oddish
    { species: 16, method: "grass", minLevel: 11, maxLevel: 13, rate: 25 }, // Pidgey
    { species: 63, method: "grass", minLevel: 9, maxLevel: 13, rate: 20 },  // Abra
    { species: 13, method: "grass", minLevel: 8, maxLevel: 8, rate: 10 },   // Weedle
    { species: 10, method: "grass", minLevel: 8, maxLevel: 8, rate: 5 },    // Caterpie
    { species: 14, method: "grass", minLevel: 9, maxLevel: 9, rate: 5 },    // Kakuna
    { species: 11, method: "grass", minLevel: 9, maxLevel: 9, rate: 5 },    // Metapod
    { species: 54, method: "water", minLevel: 20, maxLevel: 40, rate: 95 }, // Psyduck
    { species: 55, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },  // Golduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },  // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 40 }, // Poliwhirl
    { species: 54, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 15 }, // Psyduck
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },  // Slowpoke
  ],

  // ==================== DUNGEONS (Group 1) ====================

  // Viridian Forest (1:0)
  "1:0": [
    { species: 10, method: "grass", minLevel: 3, maxLevel: 5, rate: 40 },  // Caterpie
    { species: 13, method: "grass", minLevel: 3, maxLevel: 5, rate: 20 },  // Weedle
    { species: 11, method: "grass", minLevel: 5, maxLevel: 5, rate: 15 },  // Metapod
    { species: 14, method: "grass", minLevel: 4, maxLevel: 6, rate: 10 },  // Kakuna
    { species: 25, method: "grass", minLevel: 3, maxLevel: 5, rate: 10 },  // Pikachu
    { species: 16, method: "grass", minLevel: 5, maxLevel: 5, rate: 5 },   // Pidgey
  ],

  // Mt. Moon 1F (1:1)
  "1:1": [
    { species: 41, method: "grass", minLevel: 7, maxLevel: 10, rate: 64 },  // Zubat
    { species: 74, method: "grass", minLevel: 7, maxLevel: 9, rate: 25 },   // Geodude
    { species: 35, method: "grass", minLevel: 8, maxLevel: 8, rate: 6 },    // Clefairy
    { species: 46, method: "grass", minLevel: 8, maxLevel: 8, rate: 5 },    // Paras
  ],

  // Mt. Moon B1F (1:2)
  "1:2": [
    { species: 46, method: "grass", minLevel: 5, maxLevel: 10, rate: 100 }, // Paras
  ],

  // Mt. Moon B2F (1:3)
  "1:3": [
    { species: 41, method: "grass", minLevel: 8, maxLevel: 11, rate: 49 },  // Zubat
    { species: 74, method: "grass", minLevel: 9, maxLevel: 10, rate: 25 },  // Geodude
    { species: 46, method: "grass", minLevel: 10, maxLevel: 12, rate: 16 }, // Paras
    { species: 35, method: "grass", minLevel: 10, maxLevel: 12, rate: 10 }, // Clefairy
  ],

  // Digletts Cave B1F (1:37)
  "1:37": [
    { species: 50, method: "grass", minLevel: 15, maxLevel: 22, rate: 95 }, // Diglett
    { species: 51, method: "grass", minLevel: 29, maxLevel: 31, rate: 5 },  // Dugtrio
  ],

  // Victory Road 1F (1:39)
  "1:39": [
    { species: 66, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Machop
    { species: 74, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Geodude
    { species: 41, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Zubat
    { species: 95, method: "grass", minLevel: 40, maxLevel: 46, rate: 10 },  // Onix
    { species: 24, method: "grass", minLevel: 44, maxLevel: 46, rate: 10 },  // Arbok
    { species: 42, method: "grass", minLevel: 44, maxLevel: 46, rate: 10 },  // Golbat
    { species: 105, method: "grass", minLevel: 44, maxLevel: 48, rate: 5 },  // Marowak
    { species: 67, method: "grass", minLevel: 44, maxLevel: 48, rate: 5 },   // Machoke
  ],

  // Victory Road 2F (1:40)
  "1:40": [
    { species: 66, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Machop
    { species: 74, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Geodude
    { species: 41, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Zubat
    { species: 95, method: "grass", minLevel: 40, maxLevel: 48, rate: 10 },  // Onix
    { species: 24, method: "grass", minLevel: 44, maxLevel: 46, rate: 10 },  // Arbok
    { species: 42, method: "grass", minLevel: 44, maxLevel: 46, rate: 10 },  // Golbat
    { species: 67, method: "grass", minLevel: 44, maxLevel: 48, rate: 5 },   // Machoke
    { species: 57, method: "grass", minLevel: 42, maxLevel: 42, rate: 5 },   // Primeape
  ],

  // Victory Road 3F (1:41)
  "1:41": [
    { species: 66, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Machop
    { species: 74, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Geodude
    { species: 41, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Zubat
    { species: 95, method: "grass", minLevel: 40, maxLevel: 48, rate: 10 },  // Onix
    { species: 42, method: "grass", minLevel: 44, maxLevel: 46, rate: 10 },  // Golbat
    { species: 105, method: "grass", minLevel: 44, maxLevel: 48, rate: 10 }, // Marowak
    { species: 67, method: "grass", minLevel: 44, maxLevel: 48, rate: 5 },   // Machoke
    { species: 24, method: "grass", minLevel: 44, maxLevel: 46, rate: 5 },   // Arbok
  ],

  // Pokemon Mansion 1F (1:59)
  "1:59": [
    { species: 109, method: "grass", minLevel: 28, maxLevel: 30, rate: 30 }, // Koffing
    { species: 20, method: "grass", minLevel: 32, maxLevel: 36, rate: 20 },  // Raticate
    { species: 58, method: "grass", minLevel: 30, maxLevel: 32, rate: 20 },  // Growlithe
    { species: 19, method: "grass", minLevel: 26, maxLevel: 28, rate: 15 },  // Rattata
    { species: 88, method: "grass", minLevel: 28, maxLevel: 28, rate: 10 },  // Grimer
    { species: 110, method: "grass", minLevel: 32, maxLevel: 32, rate: 5 },  // Weezing
  ],

  // Pokemon Mansion 2F (1:60)
  "1:60": [
    { species: 109, method: "grass", minLevel: 28, maxLevel: 30, rate: 30 }, // Koffing
    { species: 20, method: "grass", minLevel: 32, maxLevel: 36, rate: 20 },  // Raticate
    { species: 58, method: "grass", minLevel: 30, maxLevel: 32, rate: 20 },  // Growlithe
    { species: 19, method: "grass", minLevel: 26, maxLevel: 28, rate: 15 },  // Rattata
    { species: 88, method: "grass", minLevel: 28, maxLevel: 28, rate: 10 },  // Grimer
    { species: 110, method: "grass", minLevel: 32, maxLevel: 32, rate: 5 },  // Weezing
  ],

  // Pokemon Mansion 3F (1:61)
  "1:61": [
    { species: 109, method: "grass", minLevel: 28, maxLevel: 30, rate: 30 }, // Koffing
    { species: 20, method: "grass", minLevel: 32, maxLevel: 36, rate: 20 },  // Raticate
    { species: 58, method: "grass", minLevel: 30, maxLevel: 32, rate: 20 },  // Growlithe
    { species: 19, method: "grass", minLevel: 26, maxLevel: 28, rate: 15 },  // Rattata
    { species: 88, method: "grass", minLevel: 28, maxLevel: 28, rate: 10 },  // Grimer
    { species: 110, method: "grass", minLevel: 32, maxLevel: 32, rate: 5 },  // Weezing
  ],

  // Pokemon Mansion B1F (1:62)
  "1:62": [
    { species: 109, method: "grass", minLevel: 28, maxLevel: 30, rate: 25 }, // Koffing
    { species: 20, method: "grass", minLevel: 32, maxLevel: 36, rate: 20 },  // Raticate
    { species: 58, method: "grass", minLevel: 30, maxLevel: 32, rate: 20 },  // Growlithe
    { species: 19, method: "grass", minLevel: 26, maxLevel: 28, rate: 15 },  // Rattata
    { species: 132, method: "grass", minLevel: 30, maxLevel: 30, rate: 10 }, // Ditto
    { species: 88, method: "grass", minLevel: 28, maxLevel: 28, rate: 5 },   // Grimer
    { species: 110, method: "grass", minLevel: 32, maxLevel: 32, rate: 5 },  // Weezing
  ],

  // Safari Zone Center (1:63)
  "1:63": [
    { species: 111, method: "grass", minLevel: 25, maxLevel: 25, rate: 20 }, // Rhyhorn
    { species: 32, method: "grass", minLevel: 22, maxLevel: 22, rate: 20 },  // Nidoran♂
    { species: 102, method: "grass", minLevel: 24, maxLevel: 25, rate: 20 }, // Exeggcute
    { species: 48, method: "grass", minLevel: 22, maxLevel: 22, rate: 10 },  // Venonat
    { species: 33, method: "grass", minLevel: 31, maxLevel: 31, rate: 10 },  // Nidorino
    { species: 30, method: "grass", minLevel: 31, maxLevel: 31, rate: 5 },   // Nidorina
    { species: 47, method: "grass", minLevel: 30, maxLevel: 30, rate: 5 },   // Parasect
    { species: 123, method: "grass", minLevel: 23, maxLevel: 23, rate: 5 },  // Scyther
    { species: 113, method: "grass", minLevel: 23, maxLevel: 23, rate: 5 },  // Chansey
    { species: 54, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Psyduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Goldeen
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Poliwag
    { species: 119, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Seaking
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },  // Poliwag
    { species: 147, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Dratini
    { species: 148, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },  // Dragonair
  ],

  // Safari Zone East (1:64)
  "1:64": [
    { species: 32, method: "grass", minLevel: 24, maxLevel: 24, rate: 20 },  // Nidoran♂
    { species: 84, method: "grass", minLevel: 26, maxLevel: 26, rate: 20 },  // Doduo
    { species: 102, method: "grass", minLevel: 23, maxLevel: 25, rate: 20 }, // Exeggcute
    { species: 46, method: "grass", minLevel: 22, maxLevel: 22, rate: 10 },  // Paras
    { species: 33, method: "grass", minLevel: 33, maxLevel: 33, rate: 10 },  // Nidorino
    { species: 29, method: "grass", minLevel: 24, maxLevel: 24, rate: 5 },   // Nidoran♀
    { species: 47, method: "grass", minLevel: 25, maxLevel: 25, rate: 5 },   // Parasect
    { species: 115, method: "grass", minLevel: 25, maxLevel: 25, rate: 5 },  // Kangaskhan
    { species: 123, method: "grass", minLevel: 28, maxLevel: 28, rate: 5 },  // Scyther
    { species: 54, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Psyduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Goldeen
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Poliwag
    { species: 119, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Seaking
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },  // Poliwag
    { species: 147, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Dratini
    { species: 148, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },  // Dragonair
  ],

  // Safari Zone North (1:65)
  "1:65": [
    { species: 111, method: "grass", minLevel: 26, maxLevel: 26, rate: 20 }, // Rhyhorn
    { species: 32, method: "grass", minLevel: 30, maxLevel: 30, rate: 15 },  // Nidoran♂
    { species: 102, method: "grass", minLevel: 25, maxLevel: 27, rate: 20 }, // Exeggcute
    { species: 46, method: "grass", minLevel: 23, maxLevel: 23, rate: 10 },  // Paras
    { species: 33, method: "grass", minLevel: 30, maxLevel: 30, rate: 10 },  // Nidorino
    { species: 30, method: "grass", minLevel: 30, maxLevel: 30, rate: 5 },   // Nidorina
    { species: 49, method: "grass", minLevel: 32, maxLevel: 32, rate: 5 },   // Venomoth
    { species: 113, method: "grass", minLevel: 26, maxLevel: 26, rate: 5 },  // Chansey
    { species: 128, method: "grass", minLevel: 28, maxLevel: 28, rate: 5 },  // Tauros
    { species: 29, method: "grass", minLevel: 30, maxLevel: 30, rate: 5 },   // Nidoran♀
    { species: 54, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Psyduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Goldeen
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Poliwag
    { species: 119, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Seaking
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },  // Poliwag
    { species: 147, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Dratini
    { species: 148, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },  // Dragonair
  ],

  // Safari Zone West (1:66)
  "1:66": [
    { species: 84, method: "grass", minLevel: 26, maxLevel: 26, rate: 20 },  // Doduo
    { species: 32, method: "grass", minLevel: 22, maxLevel: 22, rate: 15 },  // Nidoran♂
    { species: 102, method: "grass", minLevel: 25, maxLevel: 27, rate: 20 }, // Exeggcute
    { species: 48, method: "grass", minLevel: 23, maxLevel: 23, rate: 10 },  // Venonat
    { species: 33, method: "grass", minLevel: 30, maxLevel: 30, rate: 10 },  // Nidorino
    { species: 29, method: "grass", minLevel: 30, maxLevel: 30, rate: 5 },   // Nidoran♀
    { species: 49, method: "grass", minLevel: 32, maxLevel: 32, rate: 5 },   // Venomoth
    { species: 128, method: "grass", minLevel: 25, maxLevel: 25, rate: 5 },  // Tauros
    { species: 115, method: "grass", minLevel: 28, maxLevel: 28, rate: 5 },  // Kangaskhan
    { species: 30, method: "grass", minLevel: 30, maxLevel: 30, rate: 5 },   // Nidorina
    { species: 54, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Psyduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Goldeen
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Poliwag
    { species: 119, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Seaking
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 },  // Poliwag
    { species: 147, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Dratini
    { species: 148, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },  // Dragonair
  ],

  // Cerulean Cave 1F (1:72)
  "1:72": [
    { species: 82, method: "grass", minLevel: 49, maxLevel: 49, rate: 15 },   // Magneton
    { species: 47, method: "grass", minLevel: 49, maxLevel: 58, rate: 15 },   // Parasect
    { species: 42, method: "grass", minLevel: 46, maxLevel: 55, rate: 15 },   // Golbat
    { species: 57, method: "grass", minLevel: 52, maxLevel: 61, rate: 15 },   // Primeape
    { species: 67, method: "grass", minLevel: 46, maxLevel: 46, rate: 10 },   // Machoke
    { species: 132, method: "grass", minLevel: 52, maxLevel: 61, rate: 10 },  // Ditto
    { species: 101, method: "grass", minLevel: 58, maxLevel: 58, rate: 10 },  // Electrode
    { species: 202, method: "grass", minLevel: 55, maxLevel: 55, rate: 10 },  // Wobbuffet
    { species: 54, method: "water", minLevel: 30, maxLevel: 50, rate: 90 },   // Psyduck
    { species: 55, method: "water", minLevel: 40, maxLevel: 55, rate: 10 },   // Golduck
    { species: 74, method: "rock", minLevel: 30, maxLevel: 50, rate: 90 },    // Geodude
    { species: 75, method: "rock", minLevel: 40, maxLevel: 55, rate: 10 },    // Graveler
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },  // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 }, // Goldeen
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Gyarados
    { species: 54, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 15 },  // Psyduck
    { species: 60, method: "fish-super", minLevel: 5, maxLevel: 15, rate: 5 },    // Poliwag
  ],

  // Cerulean Cave 2F (1:73)
  "1:73": [
    { species: 42, method: "grass", minLevel: 49, maxLevel: 58, rate: 15 },  // Golbat
    { species: 67, method: "grass", minLevel: 49, maxLevel: 58, rate: 15 },  // Machoke
    { species: 82, method: "grass", minLevel: 52, maxLevel: 52, rate: 10 },  // Magneton
    { species: 47, method: "grass", minLevel: 52, maxLevel: 61, rate: 10 },  // Parasect
    { species: 64, method: "grass", minLevel: 55, maxLevel: 64, rate: 15 },  // Kadabra
    { species: 132, method: "grass", minLevel: 55, maxLevel: 64, rate: 10 }, // Ditto
    { species: 202, method: "grass", minLevel: 58, maxLevel: 58, rate: 10 }, // Wobbuffet
    { species: 101, method: "grass", minLevel: 61, maxLevel: 61, rate: 5 },  // Electrode
    { species: 74, method: "rock", minLevel: 35, maxLevel: 55, rate: 90 },   // Geodude
    { species: 75, method: "rock", minLevel: 45, maxLevel: 60, rate: 10 },   // Graveler
  ],

  // Cerulean Cave B1F (1:74)
  "1:74": [
    { species: 64, method: "grass", minLevel: 58, maxLevel: 67, rate: 15 },  // Kadabra
    { species: 132, method: "grass", minLevel: 58, maxLevel: 67, rate: 15 }, // Ditto
    { species: 42, method: "grass", minLevel: 52, maxLevel: 61, rate: 15 },  // Golbat
    { species: 82, method: "grass", minLevel: 55, maxLevel: 55, rate: 10 },  // Magneton
    { species: 47, method: "grass", minLevel: 55, maxLevel: 55, rate: 10 },  // Parasect
    { species: 67, method: "grass", minLevel: 52, maxLevel: 52, rate: 10 },  // Machoke
    { species: 101, method: "grass", minLevel: 64, maxLevel: 64, rate: 10 }, // Electrode
    { species: 202, method: "grass", minLevel: 61, maxLevel: 61, rate: 10 }, // Wobbuffet
    { species: 54, method: "water", minLevel: 40, maxLevel: 60, rate: 90 },  // Psyduck
    { species: 55, method: "water", minLevel: 50, maxLevel: 65, rate: 10 },  // Golduck
    { species: 74, method: "rock", minLevel: 40, maxLevel: 60, rate: 90 },   // Geodude
    { species: 75, method: "rock", minLevel: 50, maxLevel: 60, rate: 10 },   // Graveler
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 },  // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 }, // Goldeen
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 40 }, // Gyarados
    { species: 54, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 15 },  // Psyduck
    { species: 60, method: "fish-super", minLevel: 5, maxLevel: 15, rate: 5 },    // Poliwag
  ],

  // Rock Tunnel 1F (1:81)
  "1:81": [
    { species: 41, method: "grass", minLevel: 15, maxLevel: 16, rate: 30 }, // Zubat
    { species: 74, method: "grass", minLevel: 15, maxLevel: 17, rate: 25 }, // Geodude
    { species: 56, method: "grass", minLevel: 16, maxLevel: 17, rate: 20 }, // Mankey
    { species: 66, method: "grass", minLevel: 16, maxLevel: 16, rate: 15 }, // Machop
    { species: 95, method: "grass", minLevel: 13, maxLevel: 15, rate: 10 }, // Onix
  ],

  // Rock Tunnel B1F (1:82)
  "1:82": [
    { species: 41, method: "grass", minLevel: 15, maxLevel: 16, rate: 30 }, // Zubat
    { species: 74, method: "grass", minLevel: 15, maxLevel: 17, rate: 25 }, // Geodude
    { species: 56, method: "grass", minLevel: 16, maxLevel: 17, rate: 15 }, // Mankey
    { species: 66, method: "grass", minLevel: 17, maxLevel: 17, rate: 15 }, // Machop
    { species: 95, method: "grass", minLevel: 13, maxLevel: 17, rate: 15 }, // Onix
    { species: 74, method: "rock", minLevel: 5, maxLevel: 30, rate: 90 },   // Geodude
    { species: 75, method: "rock", minLevel: 25, maxLevel: 40, rate: 10 },  // Graveler
  ],

  // Seafoam Islands 1F (1:83)
  "1:83": [
    { species: 54, method: "grass", minLevel: 27, maxLevel: 33, rate: 50 }, // Psyduck
    { species: 41, method: "grass", minLevel: 22, maxLevel: 26, rate: 30 }, // Zubat
    { species: 42, method: "grass", minLevel: 26, maxLevel: 30, rate: 20 }, // Golbat
  ],

  // Seafoam Islands B1F (1:84)
  "1:84": [
    { species: 54, method: "grass", minLevel: 29, maxLevel: 31, rate: 30 }, // Psyduck
    { species: 41, method: "grass", minLevel: 22, maxLevel: 26, rate: 25 }, // Zubat
    { species: 42, method: "grass", minLevel: 26, maxLevel: 30, rate: 20 }, // Golbat
    { species: 86, method: "grass", minLevel: 28, maxLevel: 28, rate: 15 }, // Seel
    { species: 55, method: "grass", minLevel: 33, maxLevel: 33, rate: 10 }, // Golduck
  ],

  // Seafoam Islands B2F (1:85)
  "1:85": [
    { species: 54, method: "grass", minLevel: 30, maxLevel: 32, rate: 30 }, // Psyduck
    { species: 86, method: "grass", minLevel: 30, maxLevel: 32, rate: 25 }, // Seel
    { species: 41, method: "grass", minLevel: 22, maxLevel: 26, rate: 20 }, // Zubat
    { species: 42, method: "grass", minLevel: 26, maxLevel: 30, rate: 15 }, // Golbat
    { species: 55, method: "grass", minLevel: 32, maxLevel: 32, rate: 10 }, // Golduck
  ],

  // Seafoam Islands B3F (1:86)
  "1:86": [
    { species: 86, method: "grass", minLevel: 30, maxLevel: 32, rate: 30 },  // Seel
    { species: 54, method: "grass", minLevel: 30, maxLevel: 32, rate: 20 },  // Psyduck
    { species: 55, method: "grass", minLevel: 32, maxLevel: 34, rate: 15 },  // Golduck
    { species: 42, method: "grass", minLevel: 26, maxLevel: 30, rate: 15 },  // Golbat
    { species: 87, method: "grass", minLevel: 32, maxLevel: 34, rate: 10 },  // Dewgong
    { species: 41, method: "grass", minLevel: 24, maxLevel: 24, rate: 10 },  // Zubat
    { species: 86, method: "water", minLevel: 25, maxLevel: 35, rate: 60 },  // Seel
    { species: 116, method: "water", minLevel: 25, maxLevel: 30, rate: 30 }, // Horsea
    { species: 87, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },   // Dewgong
    { species: 54, method: "water", minLevel: 30, maxLevel: 40, rate: 4 },   // Psyduck
    { species: 55, method: "water", minLevel: 35, maxLevel: 40, rate: 1 },   // Golduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 25, rate: 60 }, // Horsea
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Krabby
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 30, rate: 40 }, // Horsea
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Gyarados
    { species: 54, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 },  // Psyduck
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },  // Seadra
  ],

  // Seafoam Islands B4F (1:87)
  "1:87": [
    { species: 86, method: "grass", minLevel: 30, maxLevel: 34, rate: 35 },  // Seel
    { species: 55, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 },  // Golduck
    { species: 54, method: "grass", minLevel: 32, maxLevel: 32, rate: 15 },  // Psyduck
    { species: 87, method: "grass", minLevel: 34, maxLevel: 36, rate: 15 },  // Dewgong
    { species: 42, method: "grass", minLevel: 26, maxLevel: 26, rate: 15 },  // Golbat
    { species: 86, method: "water", minLevel: 25, maxLevel: 35, rate: 60 },  // Seel
    { species: 116, method: "water", minLevel: 25, maxLevel: 30, rate: 30 }, // Horsea
    { species: 87, method: "water", minLevel: 35, maxLevel: 40, rate: 5 },   // Dewgong
    { species: 54, method: "water", minLevel: 30, maxLevel: 40, rate: 4 },   // Psyduck
    { species: 55, method: "water", minLevel: 35, maxLevel: 40, rate: 1 },   // Golduck
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 },  // Magikarp
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 25, rate: 60 }, // Horsea
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 40 },  // Krabby
    { species: 116, method: "fish-super", minLevel: 15, maxLevel: 30, rate: 40 }, // Horsea
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Gyarados
    { species: 54, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 },  // Psyduck
    { species: 117, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 5 },  // Seadra
  ],

  // Pokemon Tower 3F (1:90)
  "1:90": [
    { species: 92, method: "grass", minLevel: 13, maxLevel: 19, rate: 88 },  // Gastly
    { species: 104, method: "grass", minLevel: 15, maxLevel: 17, rate: 10 }, // Cubone
    { species: 93, method: "grass", minLevel: 20, maxLevel: 20, rate: 2 },   // Haunter
  ],

  // Pokemon Tower 4F (1:91)
  "1:91": [
    { species: 92, method: "grass", minLevel: 13, maxLevel: 17, rate: 88 },  // Gastly
    { species: 104, method: "grass", minLevel: 15, maxLevel: 17, rate: 10 }, // Cubone
    { species: 93, method: "grass", minLevel: 20, maxLevel: 20, rate: 2 },   // Haunter
  ],

  // Pokemon Tower 5F (1:92)
  "1:92": [
    { species: 92, method: "grass", minLevel: 13, maxLevel: 17, rate: 88 },  // Gastly
    { species: 104, method: "grass", minLevel: 15, maxLevel: 17, rate: 10 }, // Cubone
    { species: 93, method: "grass", minLevel: 20, maxLevel: 20, rate: 2 },   // Haunter
  ],

  // Pokemon Tower 6F (1:93)
  "1:93": [
    { species: 92, method: "grass", minLevel: 14, maxLevel: 19, rate: 88 },  // Gastly
    { species: 104, method: "grass", minLevel: 17, maxLevel: 19, rate: 10 }, // Cubone
    { species: 93, method: "grass", minLevel: 21, maxLevel: 21, rate: 2 },   // Haunter
  ],

  // Pokemon Tower 7F (1:94)
  "1:94": [
    { species: 92, method: "grass", minLevel: 15, maxLevel: 19, rate: 86 },  // Gastly
    { species: 104, method: "grass", minLevel: 17, maxLevel: 19, rate: 10 }, // Cubone
    { species: 93, method: "grass", minLevel: 23, maxLevel: 25, rate: 4 },   // Haunter
  ],

  // Power Plant (1:95)
  "1:95": [
    { species: 100, method: "grass", minLevel: 22, maxLevel: 25, rate: 30 }, // Voltorb
    { species: 81, method: "grass", minLevel: 22, maxLevel: 25, rate: 30 },  // Magnemite
    { species: 25, method: "grass", minLevel: 22, maxLevel: 26, rate: 25 },  // Pikachu
    { species: 82, method: "grass", minLevel: 31, maxLevel: 34, rate: 10 },  // Magneton
    { species: 125, method: "grass", minLevel: 32, maxLevel: 35, rate: 5 },  // Electabuzz
  ],

  // Tanoby Ruins (2:27-33)
  "2:27": [{ species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }], // Unown
  "2:28": [{ species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }],
  "2:29": [{ species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }],
  "2:30": [{ species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }],
  "2:31": [{ species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }],
  "2:32": [{ species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }],
  "2:33": [{ species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }],
};

/** Method display order */
export const METHOD_ORDER: EncounterMethod[] = ["grass", "water", "rock", "fish-old", "fish-good", "fish-super"];

/** Human-readable method labels */
export const METHOD_LABELS: Record<EncounterMethod, string> = {
  "grass": "Grass",
  "water": "Surfing",
  "fish-old": "Old Rod",
  "fish-good": "Good Rod",
  "fish-super": "Super Rod",
  "rock": "Rock Smash",
};
