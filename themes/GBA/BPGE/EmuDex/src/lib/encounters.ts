// Pokemon LeafGreen (BPGE) wild encounter data
// Generated from pokefirered decomp wild_encounters.json
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

  // Pallet Town
  "3:0": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 10, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 120, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Staryu
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Viridian City
  "3:1": [
    { species: 79, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Slowpoke
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // Cerulean City
  "3:3": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 84 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Vermilion City
  "3:5": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 120, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Staryu
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 116, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Horsea
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Celadon City
  "3:6": [
    { species: 79, method: "water", minLevel: 5, maxLevel: 40, rate: 99 }, // Slowpoke
    { species: 109, method: "water", minLevel: 30, maxLevel: 40, rate: 1 }, // Koffing
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 100 }, // Magikarp
    { species: 129, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 99 }, // Magikarp
    { species: 88, method: "fish-super", minLevel: 30, maxLevel: 40, rate: 1 }, // Grimer
  ],

  // Fuchsia City
  "3:7": [
    { species: 79, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Slowpoke
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Goldeen
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Poliwag
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 118, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Goldeen
    { species: 119, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Seaking
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // Cinnabar Island
  "3:8": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 120, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Staryu
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 80, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Slowbro
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // ==================== ROUTES (Group 3) ====================

  // Route 1
  "3:19": [
    { species: 16, method: "grass", minLevel: 2, maxLevel: 5, rate: 50 }, // Pidgey
    { species: 19, method: "grass", minLevel: 2, maxLevel: 4, rate: 50 }, // Rattata
  ],

  // Route 2
  "3:20": [
    { species: 16, method: "grass", minLevel: 2, maxLevel: 5, rate: 45 }, // Pidgey
    { species: 19, method: "grass", minLevel: 2, maxLevel: 5, rate: 45 }, // Rattata
    { species: 10, method: "grass", minLevel: 4, maxLevel: 5, rate: 5 }, // Caterpie
    { species: 13, method: "grass", minLevel: 4, maxLevel: 5, rate: 5 }, // Weedle
  ],

  // Route 3
  "3:21": [
    { species: 21, method: "grass", minLevel: 6, maxLevel: 8, rate: 35 }, // Spearow
    { species: 16, method: "grass", minLevel: 6, maxLevel: 7, rate: 30 }, // Pidgey
    { species: 29, method: "grass", minLevel: 6, maxLevel: 7, rate: 14 }, // Nidoran♀
    { species: 39, method: "grass", minLevel: 3, maxLevel: 7, rate: 10 }, // Jigglypuff
    { species: 56, method: "grass", minLevel: 7, maxLevel: 7, rate: 10 }, // Mankey
    { species: 32, method: "grass", minLevel: 6, maxLevel: 6, rate: 1 }, // Nidoran♂
  ],

  // Route 4
  "3:22": [
    { species: 19, method: "grass", minLevel: 8, maxLevel: 12, rate: 35 }, // Rattata
    { species: 21, method: "grass", minLevel: 8, maxLevel: 12, rate: 35 }, // Spearow
    { species: 27, method: "grass", minLevel: 6, maxLevel: 12, rate: 25 }, // Sandshrew
    { species: 56, method: "grass", minLevel: 10, maxLevel: 12, rate: 5 }, // Mankey
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 84 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Route 5
  "3:23": [
    { species: 16, method: "grass", minLevel: 13, maxLevel: 16, rate: 40 }, // Pidgey
    { species: 52, method: "grass", minLevel: 10, maxLevel: 16, rate: 35 }, // Meowth
    { species: 69, method: "grass", minLevel: 13, maxLevel: 16, rate: 25 }, // Bellsprout
  ],

  // Route 6
  "3:24": [
    { species: 16, method: "grass", minLevel: 13, maxLevel: 16, rate: 40 }, // Pidgey
    { species: 52, method: "grass", minLevel: 10, maxLevel: 16, rate: 35 }, // Meowth
    { species: 69, method: "grass", minLevel: 13, maxLevel: 16, rate: 25 }, // Bellsprout
    { species: 79, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Slowpoke
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // Route 7
  "3:25": [
    { species: 52, method: "grass", minLevel: 17, maxLevel: 20, rate: 40 }, // Meowth
    { species: 16, method: "grass", minLevel: 19, maxLevel: 22, rate: 30 }, // Pidgey
    { species: 69, method: "grass", minLevel: 19, maxLevel: 22, rate: 20 }, // Bellsprout
    { species: 37, method: "grass", minLevel: 18, maxLevel: 20, rate: 10 }, // Vulpix
  ],

  // Route 8
  "3:26": [
    { species: 16, method: "grass", minLevel: 18, maxLevel: 20, rate: 30 }, // Pidgey
    { species: 52, method: "grass", minLevel: 18, maxLevel: 20, rate: 30 }, // Meowth
    { species: 27, method: "grass", minLevel: 17, maxLevel: 19, rate: 20 }, // Sandshrew
    { species: 37, method: "grass", minLevel: 15, maxLevel: 18, rate: 20 }, // Vulpix
  ],

  // Route 9
  "3:27": [
    { species: 19, method: "grass", minLevel: 14, maxLevel: 17, rate: 40 }, // Rattata
    { species: 21, method: "grass", minLevel: 13, maxLevel: 17, rate: 35 }, // Spearow
    { species: 27, method: "grass", minLevel: 11, maxLevel: 17, rate: 25 }, // Sandshrew
  ],

  // Route 10
  "3:28": [
    { species: 100, method: "grass", minLevel: 14, maxLevel: 17, rate: 40 }, // Voltorb
    { species: 21, method: "grass", minLevel: 13, maxLevel: 17, rate: 35 }, // Spearow
    { species: 27, method: "grass", minLevel: 11, maxLevel: 17, rate: 25 }, // Sandshrew
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 84 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Route 11
  "3:29": [
    { species: 27, method: "grass", minLevel: 12, maxLevel: 15, rate: 40 }, // Sandshrew
    { species: 21, method: "grass", minLevel: 13, maxLevel: 17, rate: 35 }, // Spearow
    { species: 96, method: "grass", minLevel: 11, maxLevel: 15, rate: 25 }, // Drowzee
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 84 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Route 12
  "3:30": [
    { species: 69, method: "grass", minLevel: 22, maxLevel: 26, rate: 35 }, // Bellsprout
    { species: 16, method: "grass", minLevel: 23, maxLevel: 27, rate: 30 }, // Pidgey
    { species: 48, method: "grass", minLevel: 24, maxLevel: 26, rate: 30 }, // Venonat
    { species: 70, method: "grass", minLevel: 28, maxLevel: 30, rate: 5 }, // Weepinbell
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 84 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Route 13
  "3:31": [
    { species: 69, method: "grass", minLevel: 22, maxLevel: 26, rate: 35 }, // Bellsprout
    { species: 48, method: "grass", minLevel: 24, maxLevel: 26, rate: 30 }, // Venonat
    { species: 16, method: "grass", minLevel: 25, maxLevel: 27, rate: 20 }, // Pidgey
    { species: 17, method: "grass", minLevel: 29, maxLevel: 29, rate: 5 }, // Pidgeotto
    { species: 70, method: "grass", minLevel: 28, maxLevel: 30, rate: 5 }, // Weepinbell
    { species: 132, method: "grass", minLevel: 25, maxLevel: 25, rate: 5 }, // Ditto
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 84 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Route 14
  "3:32": [
    { species: 69, method: "grass", minLevel: 22, maxLevel: 26, rate: 35 }, // Bellsprout
    { species: 48, method: "grass", minLevel: 24, maxLevel: 26, rate: 30 }, // Venonat
    { species: 132, method: "grass", minLevel: 23, maxLevel: 23, rate: 15 }, // Ditto
    { species: 16, method: "grass", minLevel: 27, maxLevel: 27, rate: 10 }, // Pidgey
    { species: 17, method: "grass", minLevel: 29, maxLevel: 29, rate: 5 }, // Pidgeotto
    { species: 70, method: "grass", minLevel: 30, maxLevel: 30, rate: 5 }, // Weepinbell
  ],

  // Route 15
  "3:33": [
    { species: 69, method: "grass", minLevel: 22, maxLevel: 26, rate: 35 }, // Bellsprout
    { species: 48, method: "grass", minLevel: 24, maxLevel: 26, rate: 30 }, // Venonat
    { species: 16, method: "grass", minLevel: 25, maxLevel: 27, rate: 20 }, // Pidgey
    { species: 17, method: "grass", minLevel: 29, maxLevel: 29, rate: 5 }, // Pidgeotto
    { species: 70, method: "grass", minLevel: 28, maxLevel: 30, rate: 5 }, // Weepinbell
    { species: 132, method: "grass", minLevel: 25, maxLevel: 25, rate: 5 }, // Ditto
  ],

  // Route 16
  "3:34": [
    { species: 84, method: "grass", minLevel: 18, maxLevel: 22, rate: 35 }, // Doduo
    { species: 19, method: "grass", minLevel: 18, maxLevel: 22, rate: 30 }, // Rattata
    { species: 21, method: "grass", minLevel: 20, maxLevel: 22, rate: 30 }, // Spearow
    { species: 20, method: "grass", minLevel: 23, maxLevel: 25, rate: 5 }, // Raticate
  ],

  // Route 17
  "3:35": [
    { species: 84, method: "grass", minLevel: 24, maxLevel: 28, rate: 35 }, // Doduo
    { species: 21, method: "grass", minLevel: 20, maxLevel: 22, rate: 30 }, // Spearow
    { species: 20, method: "grass", minLevel: 25, maxLevel: 29, rate: 25 }, // Raticate
    { species: 19, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Rattata
    { species: 22, method: "grass", minLevel: 25, maxLevel: 27, rate: 5 }, // Fearow
  ],

  // Route 18
  "3:36": [
    { species: 84, method: "grass", minLevel: 24, maxLevel: 28, rate: 35 }, // Doduo
    { species: 21, method: "grass", minLevel: 20, maxLevel: 22, rate: 30 }, // Spearow
    { species: 20, method: "grass", minLevel: 25, maxLevel: 29, rate: 15 }, // Raticate
    { species: 22, method: "grass", minLevel: 25, maxLevel: 29, rate: 15 }, // Fearow
    { species: 19, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Rattata
  ],

  // Route 19
  "3:37": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 80 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Route 20
  "3:38": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 80 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Route 21 North
  "3:39": [
    { species: 114, method: "grass", minLevel: 17, maxLevel: 28, rate: 100 }, // Tangela
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 80 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Route 21 South
  "3:40": [
    { species: 114, method: "grass", minLevel: 17, maxLevel: 28, rate: 100 }, // Tangela
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 80 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Route 22
  "3:41": [
    { species: 19, method: "grass", minLevel: 2, maxLevel: 5, rate: 45 }, // Rattata
    { species: 56, method: "grass", minLevel: 2, maxLevel: 5, rate: 45 }, // Mankey
    { species: 21, method: "grass", minLevel: 3, maxLevel: 5, rate: 10 }, // Spearow
    { species: 79, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Slowpoke
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // Route 23
  "3:42": [
    { species: 56, method: "grass", minLevel: 32, maxLevel: 34, rate: 30 }, // Mankey
    { species: 22, method: "grass", minLevel: 40, maxLevel: 44, rate: 25 }, // Fearow
    { species: 27, method: "grass", minLevel: 32, maxLevel: 34, rate: 20 }, // Sandshrew
    { species: 21, method: "grass", minLevel: 32, maxLevel: 34, rate: 15 }, // Spearow
    { species: 28, method: "grass", minLevel: 44, maxLevel: 44, rate: 5 }, // Sandslash
    { species: 57, method: "grass", minLevel: 42, maxLevel: 42, rate: 5 }, // Primeape
    { species: 79, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Slowpoke
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // Route 24
  "3:43": [
    { species: 69, method: "grass", minLevel: 12, maxLevel: 14, rate: 25 }, // Bellsprout
    { species: 10, method: "grass", minLevel: 7, maxLevel: 7, rate: 20 }, // Caterpie
    { species: 13, method: "grass", minLevel: 7, maxLevel: 7, rate: 20 }, // Weedle
    { species: 16, method: "grass", minLevel: 11, maxLevel: 13, rate: 15 }, // Pidgey
    { species: 63, method: "grass", minLevel: 8, maxLevel: 12, rate: 15 }, // Abra
    { species: 11, method: "grass", minLevel: 8, maxLevel: 8, rate: 4 }, // Metapod
    { species: 14, method: "grass", minLevel: 8, maxLevel: 8, rate: 1 }, // Kakuna
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 84 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Route 25
  "3:44": [
    { species: 69, method: "grass", minLevel: 12, maxLevel: 14, rate: 25 }, // Bellsprout
    { species: 10, method: "grass", minLevel: 8, maxLevel: 8, rate: 20 }, // Caterpie
    { species: 13, method: "grass", minLevel: 8, maxLevel: 8, rate: 20 }, // Weedle
    { species: 16, method: "grass", minLevel: 11, maxLevel: 13, rate: 15 }, // Pidgey
    { species: 63, method: "grass", minLevel: 9, maxLevel: 13, rate: 15 }, // Abra
    { species: 11, method: "grass", minLevel: 9, maxLevel: 9, rate: 4 }, // Metapod
    { species: 14, method: "grass", minLevel: 9, maxLevel: 9, rate: 1 }, // Kakuna
    { species: 79, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Slowpoke
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // ==================== SEVII ISLANDS (Group 3) ====================

  // One Island
  "3:12": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 }, // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 120, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Staryu
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Four Island
  "3:15": [
    { species: 183, method: "water", minLevel: 5, maxLevel: 25, rate: 70 }, // Marill
    { species: 79, method: "water", minLevel: 5, maxLevel: 35, rate: 30 }, // Slowpoke
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // Five Island
  "3:16": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 65 }, // Tentacool
    { species: 187, method: "water", minLevel: 5, maxLevel: 15, rate: 30 }, // Hoppip
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 120, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Staryu
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Kindle Road
  "3:45": [
    { species: 77, method: "grass", minLevel: 31, maxLevel: 34, rate: 30 }, // Ponyta
    { species: 21, method: "grass", minLevel: 30, maxLevel: 32, rate: 25 }, // Spearow
    { species: 22, method: "grass", minLevel: 36, maxLevel: 36, rate: 10 }, // Fearow
    { species: 52, method: "grass", minLevel: 31, maxLevel: 31, rate: 10 }, // Meowth
    { species: 74, method: "grass", minLevel: 31, maxLevel: 31, rate: 10 }, // Geodude
    { species: 53, method: "grass", minLevel: 37, maxLevel: 40, rate: 5 }, // Persian
    { species: 78, method: "grass", minLevel: 37, maxLevel: 40, rate: 5 }, // Rapidash
    { species: 79, method: "grass", minLevel: 34, maxLevel: 34, rate: 5 }, // Slowpoke
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 }, // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 74, method: "rock", minLevel: 5, maxLevel: 30, rate: 95 }, // Geodude
    { species: 75, method: "rock", minLevel: 25, maxLevel: 40, rate: 5 }, // Graveler
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 80 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Treasure Beach
  "3:46": [
    { species: 21, method: "grass", minLevel: 31, maxLevel: 32, rate: 30 }, // Spearow
    { species: 114, method: "grass", minLevel: 33, maxLevel: 35, rate: 30 }, // Tangela
    { species: 22, method: "grass", minLevel: 36, maxLevel: 40, rate: 20 }, // Fearow
    { species: 52, method: "grass", minLevel: 31, maxLevel: 31, rate: 10 }, // Meowth
    { species: 53, method: "grass", minLevel: 37, maxLevel: 40, rate: 5 }, // Persian
    { species: 79, method: "grass", minLevel: 31, maxLevel: 31, rate: 5 }, // Slowpoke
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 }, // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 80 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Cape Brink
  "3:47": [
    { species: 69, method: "grass", minLevel: 30, maxLevel: 32, rate: 30 }, // Bellsprout
    { species: 21, method: "grass", minLevel: 31, maxLevel: 31, rate: 20 }, // Spearow
    { species: 70, method: "grass", minLevel: 36, maxLevel: 38, rate: 15 }, // Weepinbell
    { species: 22, method: "grass", minLevel: 36, maxLevel: 36, rate: 10 }, // Fearow
    { species: 52, method: "grass", minLevel: 31, maxLevel: 31, rate: 10 }, // Meowth
    { species: 53, method: "grass", minLevel: 37, maxLevel: 40, rate: 5 }, // Persian
    { species: 79, method: "grass", minLevel: 31, maxLevel: 31, rate: 5 }, // Slowpoke
    { species: 80, method: "grass", minLevel: 37, maxLevel: 40, rate: 5 }, // Slowbro
    { species: 79, method: "water", minLevel: 5, maxLevel: 40, rate: 95 }, // Slowpoke
    { species: 80, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Slowbro
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // Bond Bridge
  "3:48": [
    { species: 16, method: "grass", minLevel: 29, maxLevel: 32, rate: 30 }, // Pidgey
    { species: 69, method: "grass", minLevel: 31, maxLevel: 31, rate: 20 }, // Bellsprout
    { species: 17, method: "grass", minLevel: 34, maxLevel: 40, rate: 15 }, // Pidgeotto
    { species: 52, method: "grass", minLevel: 31, maxLevel: 31, rate: 10 }, // Meowth
    { species: 70, method: "grass", minLevel: 36, maxLevel: 36, rate: 10 }, // Weepinbell
    { species: 48, method: "grass", minLevel: 34, maxLevel: 34, rate: 5 }, // Venonat
    { species: 53, method: "grass", minLevel: 37, maxLevel: 40, rate: 5 }, // Persian
    { species: 79, method: "grass", minLevel: 31, maxLevel: 31, rate: 5 }, // Slowpoke
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 }, // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 80 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Three Island Port
  "3:49": [
    { species: 206, method: "grass", minLevel: 5, maxLevel: 35, rate: 100 }, // Dunsparce
  ],

  // Resort Gorgeous
  "3:54": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 65 }, // Tentacool
    { species: 187, method: "water", minLevel: 5, maxLevel: 15, rate: 30 }, // Hoppip
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 223, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Remoraid
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Water Labyrinth
  "3:55": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 65 }, // Tentacool
    { species: 187, method: "water", minLevel: 5, maxLevel: 15, rate: 30 }, // Hoppip
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 223, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Remoraid
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Five Isle Meadow
  "3:56": [
    { species: 161, method: "grass", minLevel: 10, maxLevel: 15, rate: 30 }, // Sentret
    { species: 16, method: "grass", minLevel: 44, maxLevel: 44, rate: 20 }, // Pidgey
    { species: 17, method: "grass", minLevel: 48, maxLevel: 50, rate: 15 }, // Pidgeotto
    { species: 187, method: "grass", minLevel: 10, maxLevel: 15, rate: 15 }, // Hoppip
    { species: 52, method: "grass", minLevel: 41, maxLevel: 41, rate: 10 }, // Meowth
    { species: 53, method: "grass", minLevel: 47, maxLevel: 50, rate: 5 }, // Persian
    { species: 79, method: "grass", minLevel: 41, maxLevel: 41, rate: 5 }, // Slowpoke
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 65 }, // Tentacool
    { species: 187, method: "water", minLevel: 5, maxLevel: 15, rate: 30 }, // Hoppip
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 223, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Remoraid
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Memorial Pillar
  "3:57": [
    { species: 187, method: "grass", minLevel: 6, maxLevel: 16, rate: 100 }, // Hoppip
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 65 }, // Tentacool
    { species: 187, method: "water", minLevel: 5, maxLevel: 15, rate: 30 }, // Hoppip
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 223, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Remoraid
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Outcast Island
  "3:58": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 }, // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 223, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Remoraid
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Green Path
  "3:59": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 }, // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 223, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Remoraid
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Water Path
  "3:60": [
    { species: 161, method: "grass", minLevel: 10, maxLevel: 15, rate: 30 }, // Sentret
    { species: 21, method: "grass", minLevel: 44, maxLevel: 44, rate: 20 }, // Spearow
    { species: 22, method: "grass", minLevel: 48, maxLevel: 50, rate: 15 }, // Fearow
    { species: 52, method: "grass", minLevel: 41, maxLevel: 41, rate: 10 }, // Meowth
    { species: 69, method: "grass", minLevel: 44, maxLevel: 44, rate: 10 }, // Bellsprout
    { species: 53, method: "grass", minLevel: 47, maxLevel: 50, rate: 5 }, // Persian
    { species: 70, method: "grass", minLevel: 48, maxLevel: 48, rate: 5 }, // Weepinbell
    { species: 79, method: "grass", minLevel: 41, maxLevel: 41, rate: 5 }, // Slowpoke
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 95 }, // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 223, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Remoraid
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Ruin Valley
  "3:61": [
    { species: 177, method: "grass", minLevel: 15, maxLevel: 20, rate: 25 }, // Natu
    { species: 21, method: "grass", minLevel: 44, maxLevel: 44, rate: 20 }, // Spearow
    { species: 22, method: "grass", minLevel: 49, maxLevel: 49, rate: 10 }, // Fearow
    { species: 52, method: "grass", minLevel: 43, maxLevel: 43, rate: 10 }, // Meowth
    { species: 183, method: "grass", minLevel: 15, maxLevel: 15, rate: 10 }, // Marill
    { species: 193, method: "grass", minLevel: 18, maxLevel: 18, rate: 10 }, // Yanma
    { species: 53, method: "grass", minLevel: 49, maxLevel: 52, rate: 5 }, // Persian
    { species: 79, method: "grass", minLevel: 41, maxLevel: 41, rate: 5 }, // Slowpoke
    { species: 202, method: "grass", minLevel: 25, maxLevel: 25, rate: 5 }, // Wobbuffet
    { species: 183, method: "water", minLevel: 5, maxLevel: 25, rate: 100 }, // Marill
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // Trainer Tower
  "3:62": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 35, rate: 90 }, // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 226, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Mantine
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 223, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Remoraid
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Sevault Canyon Entrance
  "3:63": [
    { species: 161, method: "grass", minLevel: 10, maxLevel: 15, rate: 30 }, // Sentret
    { species: 21, method: "grass", minLevel: 44, maxLevel: 44, rate: 20 }, // Spearow
    { species: 22, method: "grass", minLevel: 48, maxLevel: 50, rate: 15 }, // Fearow
    { species: 231, method: "grass", minLevel: 10, maxLevel: 15, rate: 15 }, // Phanpy
    { species: 52, method: "grass", minLevel: 41, maxLevel: 41, rate: 10 }, // Meowth
    { species: 53, method: "grass", minLevel: 47, maxLevel: 50, rate: 5 }, // Persian
    { species: 79, method: "grass", minLevel: 41, maxLevel: 41, rate: 5 }, // Slowpoke
  ],

  // Sevault Canyon
  "3:64": [
    { species: 74, method: "grass", minLevel: 46, maxLevel: 46, rate: 20 }, // Geodude
    { species: 231, method: "grass", minLevel: 15, maxLevel: 15, rate: 20 }, // Phanpy
    { species: 22, method: "grass", minLevel: 50, maxLevel: 50, rate: 15 }, // Fearow
    { species: 52, method: "grass", minLevel: 43, maxLevel: 43, rate: 10 }, // Meowth
    { species: 104, method: "grass", minLevel: 46, maxLevel: 46, rate: 10 }, // Cubone
    { species: 105, method: "grass", minLevel: 52, maxLevel: 52, rate: 10 }, // Marowak
    { species: 53, method: "grass", minLevel: 49, maxLevel: 52, rate: 5 }, // Persian
    { species: 95, method: "grass", minLevel: 54, maxLevel: 54, rate: 5 }, // Onix
    { species: 246, method: "grass", minLevel: 15, maxLevel: 20, rate: 5 }, // Larvitar
    { species: 74, method: "rock", minLevel: 25, maxLevel: 40, rate: 65 }, // Geodude
    { species: 75, method: "rock", minLevel: 30, maxLevel: 50, rate: 35 }, // Graveler
  ],

  // Tanoby Ruins
  "3:65": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 35, rate: 90 }, // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Tentacruel
    { species: 226, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Mantine
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 223, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Remoraid
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // ==================== DUNGEONS (Group 1) ====================

  // Viridian Forest
  "1:0": [
    { species: 10, method: "grass", minLevel: 3, maxLevel: 5, rate: 40 }, // Caterpie
    { species: 13, method: "grass", minLevel: 3, maxLevel: 5, rate: 40 }, // Weedle
    { species: 11, method: "grass", minLevel: 4, maxLevel: 6, rate: 10 }, // Metapod
    { species: 14, method: "grass", minLevel: 5, maxLevel: 5, rate: 5 }, // Kakuna
    { species: 25, method: "grass", minLevel: 3, maxLevel: 5, rate: 5 }, // Pikachu
  ],

  // Mt. Moon 1F
  "1:1": [
    { species: 41, method: "grass", minLevel: 7, maxLevel: 10, rate: 69 }, // Zubat
    { species: 74, method: "grass", minLevel: 7, maxLevel: 9, rate: 25 }, // Geodude
    { species: 46, method: "grass", minLevel: 8, maxLevel: 8, rate: 5 }, // Paras
    { species: 35, method: "grass", minLevel: 8, maxLevel: 8, rate: 1 }, // Clefairy
  ],

  // Mt. Moon B1F
  "1:2": [
    { species: 46, method: "grass", minLevel: 5, maxLevel: 10, rate: 100 }, // Paras
  ],

  // Mt. Moon B2F
  "1:3": [
    { species: 41, method: "grass", minLevel: 8, maxLevel: 11, rate: 49 }, // Zubat
    { species: 74, method: "grass", minLevel: 9, maxLevel: 10, rate: 30 }, // Geodude
    { species: 46, method: "grass", minLevel: 10, maxLevel: 12, rate: 15 }, // Paras
    { species: 35, method: "grass", minLevel: 10, maxLevel: 12, rate: 6 }, // Clefairy
  ],

  // S.S. Anne Exterior
  "1:4": [
    { species: 72, method: "water", minLevel: 5, maxLevel: 40, rate: 100 }, // Tentacool
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 44 }, // Krabby
    { species: 120, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Staryu
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Digletts Cave B1F
  "1:37": [
    { species: 50, method: "grass", minLevel: 15, maxLevel: 22, rate: 95 }, // Diglett
    { species: 51, method: "grass", minLevel: 29, maxLevel: 31, rate: 5 }, // Dugtrio
  ],

  // Victory Road 1F
  "1:39": [
    { species: 95, method: "grass", minLevel: 40, maxLevel: 46, rate: 30 }, // Onix
    { species: 66, method: "grass", minLevel: 32, maxLevel: 32, rate: 20 }, // Machop
    { species: 74, method: "grass", minLevel: 32, maxLevel: 32, rate: 20 }, // Geodude
    { species: 41, method: "grass", minLevel: 32, maxLevel: 32, rate: 10 }, // Zubat
    { species: 28, method: "grass", minLevel: 44, maxLevel: 44, rate: 5 }, // Sandslash
    { species: 42, method: "grass", minLevel: 44, maxLevel: 44, rate: 5 }, // Golbat
    { species: 67, method: "grass", minLevel: 44, maxLevel: 46, rate: 5 }, // Machoke
    { species: 105, method: "grass", minLevel: 44, maxLevel: 46, rate: 5 }, // Marowak
  ],

  // Victory Road 2F
  "1:40": [
    { species: 66, method: "grass", minLevel: 34, maxLevel: 34, rate: 20 }, // Machop
    { species: 74, method: "grass", minLevel: 34, maxLevel: 34, rate: 20 }, // Geodude
    { species: 95, method: "grass", minLevel: 45, maxLevel: 48, rate: 20 }, // Onix
    { species: 41, method: "grass", minLevel: 34, maxLevel: 34, rate: 10 }, // Zubat
    { species: 57, method: "grass", minLevel: 42, maxLevel: 42, rate: 10 }, // Primeape
    { species: 28, method: "grass", minLevel: 46, maxLevel: 46, rate: 5 }, // Sandslash
    { species: 42, method: "grass", minLevel: 46, maxLevel: 46, rate: 5 }, // Golbat
    { species: 67, method: "grass", minLevel: 46, maxLevel: 48, rate: 5 }, // Machoke
    { species: 105, method: "grass", minLevel: 46, maxLevel: 48, rate: 5 }, // Marowak
  ],

  // Victory Road 3F
  "1:41": [
    { species: 95, method: "grass", minLevel: 40, maxLevel: 46, rate: 30 }, // Onix
    { species: 66, method: "grass", minLevel: 32, maxLevel: 32, rate: 20 }, // Machop
    { species: 74, method: "grass", minLevel: 32, maxLevel: 32, rate: 20 }, // Geodude
    { species: 41, method: "grass", minLevel: 32, maxLevel: 32, rate: 10 }, // Zubat
    { species: 28, method: "grass", minLevel: 44, maxLevel: 44, rate: 5 }, // Sandslash
    { species: 42, method: "grass", minLevel: 44, maxLevel: 44, rate: 5 }, // Golbat
    { species: 67, method: "grass", minLevel: 44, maxLevel: 46, rate: 5 }, // Machoke
    { species: 105, method: "grass", minLevel: 44, maxLevel: 46, rate: 5 }, // Marowak
  ],

  // Pokemon Mansion 1F
  "1:59": [
    { species: 20, method: "grass", minLevel: 32, maxLevel: 36, rate: 30 }, // Raticate
    { species: 88, method: "grass", minLevel: 28, maxLevel: 30, rate: 30 }, // Grimer
    { species: 19, method: "grass", minLevel: 26, maxLevel: 28, rate: 15 }, // Rattata
    { species: 37, method: "grass", minLevel: 30, maxLevel: 32, rate: 15 }, // Vulpix
    { species: 89, method: "grass", minLevel: 32, maxLevel: 32, rate: 5 }, // Muk
    { species: 109, method: "grass", minLevel: 28, maxLevel: 28, rate: 5 }, // Koffing
  ],

  // Pokemon Mansion 2F
  "1:60": [
    { species: 20, method: "grass", minLevel: 32, maxLevel: 36, rate: 30 }, // Raticate
    { species: 88, method: "grass", minLevel: 28, maxLevel: 30, rate: 30 }, // Grimer
    { species: 19, method: "grass", minLevel: 26, maxLevel: 28, rate: 15 }, // Rattata
    { species: 37, method: "grass", minLevel: 30, maxLevel: 32, rate: 15 }, // Vulpix
    { species: 89, method: "grass", minLevel: 32, maxLevel: 32, rate: 5 }, // Muk
    { species: 109, method: "grass", minLevel: 28, maxLevel: 28, rate: 5 }, // Koffing
  ],

  // Pokemon Mansion 3F
  "1:61": [
    { species: 20, method: "grass", minLevel: 32, maxLevel: 36, rate: 30 }, // Raticate
    { species: 88, method: "grass", minLevel: 28, maxLevel: 30, rate: 30 }, // Grimer
    { species: 19, method: "grass", minLevel: 26, maxLevel: 28, rate: 15 }, // Rattata
    { species: 37, method: "grass", minLevel: 30, maxLevel: 32, rate: 15 }, // Vulpix
    { species: 89, method: "grass", minLevel: 32, maxLevel: 32, rate: 5 }, // Muk
    { species: 109, method: "grass", minLevel: 28, maxLevel: 28, rate: 5 }, // Koffing
  ],

  // Pokemon Mansion B1F
  "1:62": [
    { species: 20, method: "grass", minLevel: 34, maxLevel: 38, rate: 30 }, // Raticate
    { species: 88, method: "grass", minLevel: 28, maxLevel: 30, rate: 30 }, // Grimer
    { species: 37, method: "grass", minLevel: 30, maxLevel: 32, rate: 15 }, // Vulpix
    { species: 132, method: "grass", minLevel: 30, maxLevel: 30, rate: 10 }, // Ditto
    { species: 19, method: "grass", minLevel: 26, maxLevel: 26, rate: 5 }, // Rattata
    { species: 89, method: "grass", minLevel: 34, maxLevel: 34, rate: 5 }, // Muk
    { species: 109, method: "grass", minLevel: 28, maxLevel: 28, rate: 5 }, // Koffing
  ],

  // Safari Zone Center
  "1:63": [
    { species: 29, method: "grass", minLevel: 22, maxLevel: 22, rate: 20 }, // Nidoran♀
    { species: 102, method: "grass", minLevel: 24, maxLevel: 25, rate: 20 }, // Exeggcute
    { species: 111, method: "grass", minLevel: 25, maxLevel: 25, rate: 20 }, // Rhyhorn
    { species: 48, method: "grass", minLevel: 22, maxLevel: 22, rate: 15 }, // Venonat
    { species: 30, method: "grass", minLevel: 31, maxLevel: 31, rate: 10 }, // Nidorina
    { species: 33, method: "grass", minLevel: 31, maxLevel: 31, rate: 5 }, // Nidorino
    { species: 47, method: "grass", minLevel: 30, maxLevel: 30, rate: 5 }, // Parasect
    { species: 127, method: "grass", minLevel: 23, maxLevel: 23, rate: 4 }, // Pinsir
    { species: 113, method: "grass", minLevel: 23, maxLevel: 23, rate: 1 }, // Chansey
    { species: 79, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Slowpoke
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Goldeen
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Poliwag
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 118, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Goldeen
    { species: 119, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Seaking
    { species: 147, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Dratini
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 4 }, // Slowpoke
    { species: 148, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Dragonair
  ],

  // Safari Zone East
  "1:64": [
    { species: 29, method: "grass", minLevel: 24, maxLevel: 24, rate: 20 }, // Nidoran♀
    { species: 84, method: "grass", minLevel: 26, maxLevel: 26, rate: 20 }, // Doduo
    { species: 102, method: "grass", minLevel: 23, maxLevel: 25, rate: 20 }, // Exeggcute
    { species: 46, method: "grass", minLevel: 22, maxLevel: 22, rate: 15 }, // Paras
    { species: 30, method: "grass", minLevel: 33, maxLevel: 33, rate: 10 }, // Nidorina
    { species: 32, method: "grass", minLevel: 24, maxLevel: 24, rate: 5 }, // Nidoran♂
    { species: 47, method: "grass", minLevel: 25, maxLevel: 25, rate: 5 }, // Parasect
    { species: 115, method: "grass", minLevel: 25, maxLevel: 25, rate: 4 }, // Kangaskhan
    { species: 127, method: "grass", minLevel: 28, maxLevel: 28, rate: 1 }, // Pinsir
    { species: 79, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Slowpoke
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Goldeen
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Poliwag
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 118, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Goldeen
    { species: 119, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Seaking
    { species: 147, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Dratini
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 4 }, // Slowpoke
    { species: 148, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Dragonair
  ],

  // Safari Zone North
  "1:65": [
    { species: 29, method: "grass", minLevel: 30, maxLevel: 30, rate: 20 }, // Nidoran♀
    { species: 102, method: "grass", minLevel: 25, maxLevel: 27, rate: 20 }, // Exeggcute
    { species: 111, method: "grass", minLevel: 26, maxLevel: 26, rate: 20 }, // Rhyhorn
    { species: 46, method: "grass", minLevel: 23, maxLevel: 23, rate: 15 }, // Paras
    { species: 30, method: "grass", minLevel: 30, maxLevel: 30, rate: 10 }, // Nidorina
    { species: 33, method: "grass", minLevel: 30, maxLevel: 30, rate: 5 }, // Nidorino
    { species: 49, method: "grass", minLevel: 32, maxLevel: 32, rate: 5 }, // Venomoth
    { species: 113, method: "grass", minLevel: 26, maxLevel: 26, rate: 4 }, // Chansey
    { species: 128, method: "grass", minLevel: 28, maxLevel: 28, rate: 1 }, // Tauros
    { species: 79, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Slowpoke
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Goldeen
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Poliwag
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 118, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Goldeen
    { species: 119, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Seaking
    { species: 147, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Dratini
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 4 }, // Slowpoke
    { species: 148, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Dragonair
  ],

  // Safari Zone West
  "1:66": [
    { species: 29, method: "grass", minLevel: 22, maxLevel: 22, rate: 20 }, // Nidoran♀
    { species: 84, method: "grass", minLevel: 26, maxLevel: 26, rate: 20 }, // Doduo
    { species: 102, method: "grass", minLevel: 25, maxLevel: 27, rate: 20 }, // Exeggcute
    { species: 48, method: "grass", minLevel: 23, maxLevel: 23, rate: 15 }, // Venonat
    { species: 30, method: "grass", minLevel: 30, maxLevel: 30, rate: 10 }, // Nidorina
    { species: 32, method: "grass", minLevel: 30, maxLevel: 30, rate: 5 }, // Nidoran♂
    { species: 49, method: "grass", minLevel: 32, maxLevel: 32, rate: 5 }, // Venomoth
    { species: 128, method: "grass", minLevel: 25, maxLevel: 25, rate: 4 }, // Tauros
    { species: 115, method: "grass", minLevel: 28, maxLevel: 28, rate: 1 }, // Kangaskhan
    { species: 79, method: "water", minLevel: 20, maxLevel: 40, rate: 100 }, // Slowpoke
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Goldeen
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Poliwag
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 118, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Goldeen
    { species: 119, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Seaking
    { species: 147, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Dratini
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 4 }, // Slowpoke
    { species: 148, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Dragonair
  ],

  // Cerulean Cave 1F
  "1:72": [
    { species: 47, method: "grass", minLevel: 49, maxLevel: 58, rate: 25 }, // Parasect
    { species: 82, method: "grass", minLevel: 49, maxLevel: 49, rate: 20 }, // Magneton
    { species: 42, method: "grass", minLevel: 46, maxLevel: 55, rate: 14 }, // Golbat
    { species: 57, method: "grass", minLevel: 52, maxLevel: 61, rate: 11 }, // Primeape
    { species: 132, method: "grass", minLevel: 52, maxLevel: 61, rate: 11 }, // Ditto
    { species: 67, method: "grass", minLevel: 46, maxLevel: 46, rate: 10 }, // Machoke
    { species: 101, method: "grass", minLevel: 58, maxLevel: 58, rate: 5 }, // Electrode
    { species: 202, method: "grass", minLevel: 55, maxLevel: 55, rate: 4 }, // Wobbuffet
    { species: 79, method: "water", minLevel: 30, maxLevel: 50, rate: 65 }, // Slowpoke
    { species: 80, method: "water", minLevel: 40, maxLevel: 55, rate: 35 }, // Slowbro
    { species: 74, method: "rock", minLevel: 30, maxLevel: 50, rate: 65 }, // Geodude
    { species: 75, method: "rock", minLevel: 40, maxLevel: 55, rate: 35 }, // Graveler
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // Cerulean Cave 2F
  "1:73": [
    { species: 42, method: "grass", minLevel: 49, maxLevel: 58, rate: 25 }, // Golbat
    { species: 67, method: "grass", minLevel: 49, maxLevel: 49, rate: 20 }, // Machoke
    { species: 47, method: "grass", minLevel: 52, maxLevel: 61, rate: 14 }, // Parasect
    { species: 64, method: "grass", minLevel: 55, maxLevel: 64, rate: 11 }, // Kadabra
    { species: 132, method: "grass", minLevel: 55, maxLevel: 64, rate: 11 }, // Ditto
    { species: 82, method: "grass", minLevel: 52, maxLevel: 52, rate: 10 }, // Magneton
    { species: 202, method: "grass", minLevel: 58, maxLevel: 58, rate: 5 }, // Wobbuffet
    { species: 101, method: "grass", minLevel: 61, maxLevel: 61, rate: 4 }, // Electrode
    { species: 74, method: "rock", minLevel: 35, maxLevel: 55, rate: 65 }, // Geodude
    { species: 75, method: "rock", minLevel: 45, maxLevel: 60, rate: 35 }, // Graveler
  ],

  // Cerulean Cave B1F
  "1:74": [
    { species: 64, method: "grass", minLevel: 58, maxLevel: 67, rate: 25 }, // Kadabra
    { species: 132, method: "grass", minLevel: 58, maxLevel: 67, rate: 25 }, // Ditto
    { species: 47, method: "grass", minLevel: 55, maxLevel: 64, rate: 14 }, // Parasect
    { species: 42, method: "grass", minLevel: 52, maxLevel: 61, rate: 11 }, // Golbat
    { species: 67, method: "grass", minLevel: 52, maxLevel: 52, rate: 10 }, // Machoke
    { species: 82, method: "grass", minLevel: 55, maxLevel: 55, rate: 10 }, // Magneton
    { species: 101, method: "grass", minLevel: 64, maxLevel: 64, rate: 4 }, // Electrode
    { species: 202, method: "grass", minLevel: 61, maxLevel: 61, rate: 1 }, // Wobbuffet
    { species: 79, method: "water", minLevel: 40, maxLevel: 60, rate: 65 }, // Slowpoke
    { species: 80, method: "water", minLevel: 50, maxLevel: 65, rate: 35 }, // Slowbro
    { species: 74, method: "rock", minLevel: 40, maxLevel: 60, rate: 65 }, // Geodude
    { species: 75, method: "rock", minLevel: 50, maxLevel: 65, rate: 35 }, // Graveler
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 16 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 4 }, // Slowpoke
  ],

  // Rock Tunnel 1F
  "1:81": [
    { species: 74, method: "grass", minLevel: 15, maxLevel: 17, rate: 35 }, // Geodude
    { species: 41, method: "grass", minLevel: 15, maxLevel: 16, rate: 30 }, // Zubat
    { species: 56, method: "grass", minLevel: 16, maxLevel: 17, rate: 15 }, // Mankey
    { species: 66, method: "grass", minLevel: 16, maxLevel: 17, rate: 15 }, // Machop
    { species: 95, method: "grass", minLevel: 13, maxLevel: 15, rate: 5 }, // Onix
  ],

  // Rock Tunnel B1F
  "1:82": [
    { species: 74, method: "grass", minLevel: 15, maxLevel: 17, rate: 35 }, // Geodude
    { species: 41, method: "grass", minLevel: 15, maxLevel: 16, rate: 30 }, // Zubat
    { species: 56, method: "grass", minLevel: 16, maxLevel: 17, rate: 15 }, // Mankey
    { species: 66, method: "grass", minLevel: 17, maxLevel: 17, rate: 10 }, // Machop
    { species: 95, method: "grass", minLevel: 13, maxLevel: 17, rate: 10 }, // Onix
    { species: 74, method: "rock", minLevel: 5, maxLevel: 30, rate: 95 }, // Geodude
    { species: 75, method: "rock", minLevel: 25, maxLevel: 40, rate: 5 }, // Graveler
  ],

  // Seafoam Islands 1F
  "1:83": [
    { species: 79, method: "grass", minLevel: 26, maxLevel: 33, rate: 55 }, // Slowpoke
    { species: 41, method: "grass", minLevel: 22, maxLevel: 26, rate: 34 }, // Zubat
    { species: 42, method: "grass", minLevel: 26, maxLevel: 30, rate: 11 }, // Golbat
  ],

  // Seafoam Islands B1F
  "1:84": [
    { species: 79, method: "grass", minLevel: 29, maxLevel: 31, rate: 40 }, // Slowpoke
    { species: 41, method: "grass", minLevel: 22, maxLevel: 26, rate: 34 }, // Zubat
    { species: 42, method: "grass", minLevel: 26, maxLevel: 30, rate: 11 }, // Golbat
    { species: 86, method: "grass", minLevel: 28, maxLevel: 28, rate: 10 }, // Seel
    { species: 80, method: "grass", minLevel: 33, maxLevel: 35, rate: 5 }, // Slowbro
  ],

  // Seafoam Islands B2F
  "1:85": [
    { species: 79, method: "grass", minLevel: 30, maxLevel: 32, rate: 40 }, // Slowpoke
    { species: 41, method: "grass", minLevel: 22, maxLevel: 24, rate: 20 }, // Zubat
    { species: 86, method: "grass", minLevel: 30, maxLevel: 32, rate: 20 }, // Seel
    { species: 42, method: "grass", minLevel: 26, maxLevel: 30, rate: 10 }, // Golbat
    { species: 80, method: "grass", minLevel: 32, maxLevel: 34, rate: 10 }, // Slowbro
  ],

  // Seafoam Islands B3F
  "1:86": [
    { species: 86, method: "grass", minLevel: 30, maxLevel: 32, rate: 40 }, // Seel
    { species: 79, method: "grass", minLevel: 30, maxLevel: 32, rate: 20 }, // Slowpoke
    { species: 80, method: "grass", minLevel: 32, maxLevel: 34, rate: 15 }, // Slowbro
    { species: 41, method: "grass", minLevel: 24, maxLevel: 24, rate: 10 }, // Zubat
    { species: 42, method: "grass", minLevel: 26, maxLevel: 30, rate: 10 }, // Golbat
    { species: 87, method: "grass", minLevel: 32, maxLevel: 34, rate: 5 }, // Dewgong
    { species: 86, method: "water", minLevel: 25, maxLevel: 35, rate: 60 }, // Seel
    { species: 98, method: "water", minLevel: 25, maxLevel: 30, rate: 30 }, // Krabby
    { species: 87, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Dewgong
    { species: 79, method: "water", minLevel: 30, maxLevel: 40, rate: 4 }, // Slowpoke
    { species: 80, method: "water", minLevel: 35, maxLevel: 40, rate: 1 }, // Slowbro
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 30, rate: 80 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 16 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 4 }, // Slowpoke
  ],

  // Seafoam Islands B4F
  "1:87": [
    { species: 86, method: "grass", minLevel: 30, maxLevel: 34, rate: 50 }, // Seel
    { species: 42, method: "grass", minLevel: 26, maxLevel: 30, rate: 15 }, // Golbat
    { species: 80, method: "grass", minLevel: 32, maxLevel: 34, rate: 15 }, // Slowbro
    { species: 79, method: "grass", minLevel: 32, maxLevel: 32, rate: 10 }, // Slowpoke
    { species: 87, method: "grass", minLevel: 34, maxLevel: 36, rate: 10 }, // Dewgong
    { species: 86, method: "water", minLevel: 25, maxLevel: 35, rate: 60 }, // Seel
    { species: 98, method: "water", minLevel: 25, maxLevel: 30, rate: 30 }, // Krabby
    { species: 87, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Dewgong
    { species: 79, method: "water", minLevel: 30, maxLevel: 40, rate: 4 }, // Slowpoke
    { species: 80, method: "water", minLevel: 35, maxLevel: 40, rate: 1 }, // Slowbro
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Krabby
    { species: 116, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Horsea
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 30, rate: 80 }, // Krabby
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 16 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 4 }, // Slowpoke
  ],

  // Pokemon Tower 3F
  "1:90": [
    { species: 92, method: "grass", minLevel: 13, maxLevel: 19, rate: 90 }, // Gastly
    { species: 104, method: "grass", minLevel: 15, maxLevel: 17, rate: 9 }, // Cubone
    { species: 93, method: "grass", minLevel: 20, maxLevel: 20, rate: 1 }, // Haunter
  ],

  // Pokemon Tower 4F
  "1:91": [
    { species: 92, method: "grass", minLevel: 13, maxLevel: 19, rate: 86 }, // Gastly
    { species: 104, method: "grass", minLevel: 15, maxLevel: 17, rate: 9 }, // Cubone
    { species: 93, method: "grass", minLevel: 20, maxLevel: 20, rate: 5 }, // Haunter
  ],

  // Pokemon Tower 5F
  "1:92": [
    { species: 92, method: "grass", minLevel: 13, maxLevel: 19, rate: 86 }, // Gastly
    { species: 104, method: "grass", minLevel: 15, maxLevel: 17, rate: 9 }, // Cubone
    { species: 93, method: "grass", minLevel: 20, maxLevel: 20, rate: 5 }, // Haunter
  ],

  // Pokemon Tower 6F
  "1:93": [
    { species: 92, method: "grass", minLevel: 14, maxLevel: 19, rate: 85 }, // Gastly
    { species: 104, method: "grass", minLevel: 17, maxLevel: 19, rate: 9 }, // Cubone
    { species: 93, method: "grass", minLevel: 21, maxLevel: 23, rate: 6 }, // Haunter
  ],

  // Pokemon Tower 7F
  "1:94": [
    { species: 92, method: "grass", minLevel: 15, maxLevel: 19, rate: 75 }, // Gastly
    { species: 93, method: "grass", minLevel: 23, maxLevel: 25, rate: 15 }, // Haunter
    { species: 104, method: "grass", minLevel: 17, maxLevel: 19, rate: 10 }, // Cubone
  ],

  // Power Plant
  "1:95": [
    { species: 81, method: "grass", minLevel: 22, maxLevel: 25, rate: 30 }, // Magnemite
    { species: 100, method: "grass", minLevel: 22, maxLevel: 25, rate: 30 }, // Voltorb
    { species: 25, method: "grass", minLevel: 22, maxLevel: 26, rate: 25 }, // Pikachu
    { species: 82, method: "grass", minLevel: 31, maxLevel: 34, rate: 15 }, // Magneton
  ],

  // Mt. Ember Exterior
  "1:97": [
    { species: 77, method: "grass", minLevel: 30, maxLevel: 36, rate: 35 }, // Ponyta
    { species: 22, method: "grass", minLevel: 38, maxLevel: 40, rate: 25 }, // Fearow
    { species: 21, method: "grass", minLevel: 32, maxLevel: 32, rate: 10 }, // Spearow
    { species: 66, method: "grass", minLevel: 35, maxLevel: 35, rate: 10 }, // Machop
    { species: 74, method: "grass", minLevel: 33, maxLevel: 33, rate: 10 }, // Geodude
    { species: 78, method: "grass", minLevel: 39, maxLevel: 42, rate: 5 }, // Rapidash
    { species: 126, method: "grass", minLevel: 38, maxLevel: 40, rate: 5 }, // Magmar
    { species: 74, method: "rock", minLevel: 5, maxLevel: 30, rate: 95 }, // Geodude
    { species: 75, method: "rock", minLevel: 25, maxLevel: 40, rate: 5 }, // Graveler
  ],

  // Mt. Ember Summit 1F
  "1:98": [
    { species: 66, method: "grass", minLevel: 31, maxLevel: 39, rate: 50 }, // Machop
    { species: 74, method: "grass", minLevel: 29, maxLevel: 37, rate: 50 }, // Geodude
  ],

  // Mt. Ember Summit 2F
  "1:99": [
    { species: 66, method: "grass", minLevel: 32, maxLevel: 36, rate: 40 }, // Machop
    { species: 74, method: "grass", minLevel: 30, maxLevel: 34, rate: 40 }, // Geodude
    { species: 67, method: "grass", minLevel: 38, maxLevel: 40, rate: 20 }, // Machoke
    { species: 74, method: "rock", minLevel: 5, maxLevel: 30, rate: 95 }, // Geodude
    { species: 75, method: "rock", minLevel: 25, maxLevel: 40, rate: 5 }, // Graveler
  ],

  // Mt. Ember Summit 3F
  "1:100": [
    { species: 66, method: "grass", minLevel: 31, maxLevel: 39, rate: 50 }, // Machop
    { species: 74, method: "grass", minLevel: 29, maxLevel: 37, rate: 50 }, // Geodude
  ],

  // Mt. Ember Ruby Path 1F
  "1:103": [
    { species: 74, method: "grass", minLevel: 32, maxLevel: 40, rate: 50 }, // Geodude
    { species: 66, method: "grass", minLevel: 34, maxLevel: 38, rate: 40 }, // Machop
    { species: 67, method: "grass", minLevel: 40, maxLevel: 42, rate: 10 }, // Machoke
    { species: 74, method: "rock", minLevel: 25, maxLevel: 40, rate: 65 }, // Geodude
    { species: 75, method: "rock", minLevel: 30, maxLevel: 50, rate: 35 }, // Graveler
  ],

  // Mt. Ember Ruby Path B1F
  "1:104": [
    { species: 74, method: "grass", minLevel: 34, maxLevel: 42, rate: 70 }, // Geodude
    { species: 218, method: "grass", minLevel: 24, maxLevel: 30, rate: 30 }, // Slugma
    { species: 74, method: "rock", minLevel: 25, maxLevel: 40, rate: 65 }, // Geodude
    { species: 75, method: "rock", minLevel: 30, maxLevel: 50, rate: 35 }, // Graveler
  ],

  // Mt. Ember Ruby Path B2F
  "1:105": [
    { species: 218, method: "grass", minLevel: 22, maxLevel: 32, rate: 60 }, // Slugma
    { species: 74, method: "grass", minLevel: 40, maxLevel: 44, rate: 40 }, // Geodude
    { species: 74, method: "rock", minLevel: 25, maxLevel: 40, rate: 65 }, // Geodude
    { species: 75, method: "rock", minLevel: 30, maxLevel: 50, rate: 35 }, // Graveler
  ],

  // Mt. Ember Ruby Path B3F
  "1:106": [
    { species: 218, method: "grass", minLevel: 18, maxLevel: 36, rate: 100 }, // Slugma
    { species: 218, method: "rock", minLevel: 15, maxLevel: 35, rate: 90 }, // Slugma
    { species: 219, method: "rock", minLevel: 25, maxLevel: 45, rate: 10 }, // Magcargo
  ],

  // Mt. Ember Ruby Path B1F Stairs
  "1:107": [
    { species: 218, method: "grass", minLevel: 22, maxLevel: 32, rate: 60 }, // Slugma
    { species: 74, method: "grass", minLevel: 40, maxLevel: 44, rate: 40 }, // Geodude
    { species: 74, method: "rock", minLevel: 25, maxLevel: 40, rate: 65 }, // Geodude
    { species: 75, method: "rock", minLevel: 30, maxLevel: 50, rate: 35 }, // Graveler
  ],

  // Mt. Ember Ruby Path B2F Stairs
  "1:108": [
    { species: 74, method: "grass", minLevel: 34, maxLevel: 42, rate: 70 }, // Geodude
    { species: 218, method: "grass", minLevel: 24, maxLevel: 30, rate: 30 }, // Slugma
    { species: 74, method: "rock", minLevel: 25, maxLevel: 40, rate: 65 }, // Geodude
    { species: 75, method: "rock", minLevel: 30, maxLevel: 50, rate: 35 }, // Graveler
  ],

  // Berry Forest
  "1:109": [
    { species: 17, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Pidgeotto
    { species: 70, method: "grass", minLevel: 35, maxLevel: 35, rate: 20 }, // Weepinbell
    { species: 16, method: "grass", minLevel: 32, maxLevel: 32, rate: 10 }, // Pidgey
    { species: 48, method: "grass", minLevel: 34, maxLevel: 34, rate: 10 }, // Venonat
    { species: 69, method: "grass", minLevel: 30, maxLevel: 30, rate: 10 }, // Bellsprout
    { species: 96, method: "grass", minLevel: 34, maxLevel: 34, rate: 10 }, // Drowzee
    { species: 49, method: "grass", minLevel: 37, maxLevel: 40, rate: 5 }, // Venomoth
    { species: 79, method: "grass", minLevel: 31, maxLevel: 31, rate: 5 }, // Slowpoke
    { species: 97, method: "grass", minLevel: 37, maxLevel: 40, rate: 5 }, // Hypno
    { species: 102, method: "grass", minLevel: 35, maxLevel: 35, rate: 5 }, // Exeggcute
    { species: 79, method: "water", minLevel: 5, maxLevel: 40, rate: 95 }, // Slowpoke
    { species: 80, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Slowbro
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Goldeen
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Poliwag
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 118, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Goldeen
    { species: 119, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Seaking
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // Icefall Cave Entrance
  "1:110": [
    { species: 86, method: "grass", minLevel: 43, maxLevel: 47, rate: 40 }, // Seel
    { species: 42, method: "grass", minLevel: 45, maxLevel: 48, rate: 25 }, // Golbat
    { species: 87, method: "grass", minLevel: 49, maxLevel: 53, rate: 20 }, // Dewgong
    { species: 41, method: "grass", minLevel: 40, maxLevel: 40, rate: 10 }, // Zubat
    { species: 79, method: "grass", minLevel: 41, maxLevel: 41, rate: 5 }, // Slowpoke
    { species: 86, method: "water", minLevel: 5, maxLevel: 35, rate: 60 }, // Seel
    { species: 79, method: "water", minLevel: 5, maxLevel: 35, rate: 30 }, // Slowpoke
    { species: 87, method: "water", minLevel: 35, maxLevel: 40, rate: 5 }, // Dewgong
    { species: 183, method: "water", minLevel: 5, maxLevel: 15, rate: 5 }, // Marill
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 60, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 60 }, // Poliwag
    { species: 118, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Goldeen
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 60, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Poliwag
    { species: 61, method: "fish-super", minLevel: 20, maxLevel: 30, rate: 40 }, // Poliwhirl
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 79, method: "fish-super", minLevel: 15, maxLevel: 35, rate: 5 }, // Slowpoke
  ],

  // Icefall Cave 1F
  "1:111": [
    { species: 220, method: "grass", minLevel: 23, maxLevel: 31, rate: 50 }, // Swinub
    { species: 42, method: "grass", minLevel: 45, maxLevel: 48, rate: 25 }, // Golbat
    { species: 41, method: "grass", minLevel: 40, maxLevel: 40, rate: 10 }, // Zubat
    { species: 86, method: "grass", minLevel: 45, maxLevel: 45, rate: 10 }, // Seel
    { species: 215, method: "grass", minLevel: 30, maxLevel: 30, rate: 5 }, // Sneasel
  ],

  // Icefall Cave B1F
  "1:112": [
    { species: 220, method: "grass", minLevel: 23, maxLevel: 31, rate: 50 }, // Swinub
    { species: 42, method: "grass", minLevel: 45, maxLevel: 48, rate: 25 }, // Golbat
    { species: 41, method: "grass", minLevel: 40, maxLevel: 40, rate: 10 }, // Zubat
    { species: 86, method: "grass", minLevel: 45, maxLevel: 45, rate: 10 }, // Seel
    { species: 215, method: "grass", minLevel: 30, maxLevel: 30, rate: 5 }, // Sneasel
  ],

  // Icefall Cave Back
  "1:113": [
    { species: 86, method: "grass", minLevel: 43, maxLevel: 47, rate: 40 }, // Seel
    { species: 42, method: "grass", minLevel: 45, maxLevel: 48, rate: 25 }, // Golbat
    { species: 87, method: "grass", minLevel: 49, maxLevel: 53, rate: 20 }, // Dewgong
    { species: 41, method: "grass", minLevel: 40, maxLevel: 40, rate: 10 }, // Zubat
    { species: 79, method: "grass", minLevel: 41, maxLevel: 41, rate: 5 }, // Slowpoke
    { species: 72, method: "water", minLevel: 5, maxLevel: 45, rate: 95 }, // Tentacool
    { species: 73, method: "water", minLevel: 35, maxLevel: 45, rate: 4 }, // Tentacruel
    { species: 131, method: "water", minLevel: 30, maxLevel: 45, rate: 1 }, // Lapras
    { species: 129, method: "fish-old", minLevel: 5, maxLevel: 5, rate: 100 }, // Magikarp
    { species: 98, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 80 }, // Krabby
    { species: 129, method: "fish-good", minLevel: 5, maxLevel: 15, rate: 20 }, // Magikarp
    { species: 98, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Krabby
    { species: 120, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 40 }, // Staryu
    { species: 130, method: "fish-super", minLevel: 15, maxLevel: 25, rate: 15 }, // Gyarados
    { species: 99, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 4 }, // Kingler
    { species: 79, method: "fish-super", minLevel: 25, maxLevel: 35, rate: 1 }, // Slowpoke
  ],

  // Pattern Bush
  "1:121": [
    { species: 165, method: "grass", minLevel: 9, maxLevel: 14, rate: 30 }, // Ledyba
    { species: 14, method: "grass", minLevel: 9, maxLevel: 9, rate: 20 }, // Kakuna
    { species: 214, method: "grass", minLevel: 15, maxLevel: 30, rate: 20 }, // Heracross
    { species: 10, method: "grass", minLevel: 6, maxLevel: 6, rate: 10 }, // Caterpie
    { species: 13, method: "grass", minLevel: 6, maxLevel: 6, rate: 10 }, // Weedle
    { species: 11, method: "grass", minLevel: 9, maxLevel: 9, rate: 5 }, // Metapod
    { species: 167, method: "grass", minLevel: 9, maxLevel: 14, rate: 5 }, // Spinarak
  ],

  // Altering Cave
  "1:122": [
    { species: 41, method: "grass", minLevel: 6, maxLevel: 16, rate: 100 }, // Zubat
  ],

  // ==================== SPECIAL AREAS (Group 2) ====================

  // Lost Cave Room 1
  "2:13": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 92, method: "grass", minLevel: 38, maxLevel: 40, rate: 25 }, // Gastly
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 42, method: "grass", minLevel: 41, maxLevel: 43, rate: 20 }, // Golbat
    { species: 200, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Misdreavus
  ],

  // Lost Cave Room 2
  "2:14": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 92, method: "grass", minLevel: 38, maxLevel: 40, rate: 25 }, // Gastly
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 42, method: "grass", minLevel: 41, maxLevel: 43, rate: 20 }, // Golbat
    { species: 200, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Misdreavus
  ],

  // Lost Cave Room 3
  "2:15": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 92, method: "grass", minLevel: 38, maxLevel: 40, rate: 25 }, // Gastly
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 42, method: "grass", minLevel: 41, maxLevel: 43, rate: 20 }, // Golbat
    { species: 200, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Misdreavus
  ],

  // Lost Cave Room 4
  "2:16": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 92, method: "grass", minLevel: 38, maxLevel: 40, rate: 25 }, // Gastly
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 42, method: "grass", minLevel: 41, maxLevel: 43, rate: 20 }, // Golbat
    { species: 200, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Misdreavus
  ],

  // Lost Cave Room 5
  "2:17": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 92, method: "grass", minLevel: 38, maxLevel: 40, rate: 25 }, // Gastly
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 42, method: "grass", minLevel: 41, maxLevel: 43, rate: 20 }, // Golbat
    { species: 200, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Misdreavus
  ],

  // Lost Cave Room 6
  "2:18": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 92, method: "grass", minLevel: 38, maxLevel: 40, rate: 25 }, // Gastly
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 42, method: "grass", minLevel: 41, maxLevel: 43, rate: 20 }, // Golbat
    { species: 200, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Misdreavus
  ],

  // Lost Cave Room 7
  "2:19": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 92, method: "grass", minLevel: 38, maxLevel: 40, rate: 25 }, // Gastly
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 42, method: "grass", minLevel: 41, maxLevel: 43, rate: 20 }, // Golbat
    { species: 200, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Misdreavus
  ],

  // Lost Cave Room 8
  "2:20": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 92, method: "grass", minLevel: 38, maxLevel: 40, rate: 25 }, // Gastly
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 42, method: "grass", minLevel: 41, maxLevel: 43, rate: 20 }, // Golbat
    { species: 200, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Misdreavus
  ],

  // Lost Cave Room 9
  "2:21": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 92, method: "grass", minLevel: 38, maxLevel: 40, rate: 25 }, // Gastly
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 42, method: "grass", minLevel: 41, maxLevel: 43, rate: 20 }, // Golbat
    { species: 200, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Misdreavus
  ],

  // Lost Cave Room 10
  "2:22": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 92, method: "grass", minLevel: 38, maxLevel: 40, rate: 25 }, // Gastly
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 42, method: "grass", minLevel: 41, maxLevel: 43, rate: 20 }, // Golbat
    { species: 200, method: "grass", minLevel: 22, maxLevel: 22, rate: 5 }, // Misdreavus
  ],

  // Lost Cave Room 11
  "2:23": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 92, method: "grass", minLevel: 40, maxLevel: 40, rate: 20 }, // Gastly
    { species: 200, method: "grass", minLevel: 15, maxLevel: 22, rate: 20 }, // Misdreavus
    { species: 42, method: "grass", minLevel: 41, maxLevel: 41, rate: 10 }, // Golbat
  ],

  // Lost Cave Room 12
  "2:24": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 92, method: "grass", minLevel: 40, maxLevel: 40, rate: 20 }, // Gastly
    { species: 200, method: "grass", minLevel: 15, maxLevel: 22, rate: 20 }, // Misdreavus
    { species: 42, method: "grass", minLevel: 41, maxLevel: 41, rate: 10 }, // Golbat
  ],

  // Lost Cave Room 13
  "2:25": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 92, method: "grass", minLevel: 40, maxLevel: 40, rate: 20 }, // Gastly
    { species: 200, method: "grass", minLevel: 15, maxLevel: 22, rate: 20 }, // Misdreavus
    { species: 42, method: "grass", minLevel: 41, maxLevel: 41, rate: 10 }, // Golbat
  ],

  // Lost Cave Room 14
  "2:26": [
    { species: 93, method: "grass", minLevel: 44, maxLevel: 52, rate: 30 }, // Haunter
    { species: 41, method: "grass", minLevel: 37, maxLevel: 37, rate: 20 }, // Zubat
    { species: 92, method: "grass", minLevel: 40, maxLevel: 40, rate: 20 }, // Gastly
    { species: 200, method: "grass", minLevel: 15, maxLevel: 22, rate: 20 }, // Misdreavus
    { species: 42, method: "grass", minLevel: 41, maxLevel: 41, rate: 10 }, // Golbat
  ],

  // Monean Chamber
  "2:27": [
    { species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }, // Unown
  ],

  // Liptoo Chamber
  "2:28": [
    { species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }, // Unown
  ],

  // Weepth Chamber
  "2:29": [
    { species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }, // Unown
  ],

  // Dilford Chamber
  "2:30": [
    { species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }, // Unown
  ],

  // Scufib Chamber
  "2:31": [
    { species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }, // Unown
  ],

  // Rixy Chamber
  "2:32": [
    { species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }, // Unown
  ],

  // Viapois Chamber
  "2:33": [
    { species: 201, method: "grass", minLevel: 25, maxLevel: 25, rate: 100 }, // Unown
  ],
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
