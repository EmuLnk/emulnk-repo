// Generated from pret/pokered data/wild/*.asm for the PMR/PMB theme. Do not edit by hand.

export type Gen1GameVersion = "red" | "blue";
export type Gen1EncounterMethod = "walk" | "surf" | "old-rod" | "good-rod" | "super-rod";

export interface Gen1AreaEncounter {
  method: Gen1EncounterMethod;
  speciesId: number;
  dexId: number;
  speciesName: string;
  minLevel: number;
  maxLevel: number;
  rate: number;
}

export const GEN1_AREA_ENCOUNTERS_BY_VERSION: Record<Gen1GameVersion, Record<number, Gen1AreaEncounter[]>> = {
  "red": {
    "0": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "1": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "3": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      }
    ],
    "5": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "6": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 110,
        "dexId": 61,
        "speciesName": "POLIWHIRL",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "7": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 158,
        "dexId": 119,
        "speciesName": "SEAKING",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "8": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "12": [
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 2,
        "maxLevel": 5,
        "rate": 50
      },
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 2,
        "maxLevel": 4,
        "rate": 50
      }
    ],
    "13": [
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 2,
        "maxLevel": 5,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 3,
        "maxLevel": 5,
        "rate": 44.9
      },
      {
        "method": "walk",
        "speciesId": 112,
        "dexId": 13,
        "speciesName": "WEEDLE",
        "minLevel": 3,
        "maxLevel": 5,
        "rate": 15.2
      }
    ],
    "14": [
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 6,
        "maxLevel": 8,
        "rate": 44.9
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 5,
        "maxLevel": 8,
        "rate": 44.5
      },
      {
        "method": "walk",
        "speciesId": 100,
        "dexId": 39,
        "speciesName": "JIGGLYPUFF",
        "minLevel": 3,
        "maxLevel": 7,
        "rate": 10.5
      }
    ],
    "15": [
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 8,
        "maxLevel": 12,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 8,
        "maxLevel": 12,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 108,
        "dexId": 23,
        "speciesName": "EKANS",
        "minLevel": 6,
        "maxLevel": 12,
        "rate": 25
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      }
    ],
    "16": [
      {
        "method": "walk",
        "speciesId": 185,
        "dexId": 43,
        "speciesName": "ODDISH",
        "minLevel": 13,
        "maxLevel": 16,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 13,
        "maxLevel": 16,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 57,
        "dexId": 56,
        "speciesName": "MANKEY",
        "minLevel": 10,
        "maxLevel": 16,
        "rate": 25
      }
    ],
    "17": [
      {
        "method": "walk",
        "speciesId": 185,
        "dexId": 43,
        "speciesName": "ODDISH",
        "minLevel": 13,
        "maxLevel": 16,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 13,
        "maxLevel": 16,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 57,
        "dexId": 56,
        "speciesName": "MANKEY",
        "minLevel": 10,
        "maxLevel": 16,
        "rate": 25
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "18": [
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 19,
        "maxLevel": 22,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 185,
        "dexId": 43,
        "speciesName": "ODDISH",
        "minLevel": 19,
        "maxLevel": 22,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 57,
        "dexId": 56,
        "speciesName": "MANKEY",
        "minLevel": 17,
        "maxLevel": 20,
        "rate": 30.5
      },
      {
        "method": "walk",
        "speciesId": 33,
        "dexId": 58,
        "speciesName": "GROWLITHE",
        "minLevel": 18,
        "maxLevel": 20,
        "rate": 10.2
      }
    ],
    "19": [
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 18,
        "maxLevel": 20,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 57,
        "dexId": 56,
        "speciesName": "MANKEY",
        "minLevel": 18,
        "maxLevel": 20,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 108,
        "dexId": 23,
        "speciesName": "EKANS",
        "minLevel": 17,
        "maxLevel": 19,
        "rate": 20.3
      },
      {
        "method": "walk",
        "speciesId": 33,
        "dexId": 58,
        "speciesName": "GROWLITHE",
        "minLevel": 15,
        "maxLevel": 18,
        "rate": 20.3
      }
    ],
    "20": [
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 14,
        "maxLevel": 17,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 13,
        "maxLevel": 17,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 108,
        "dexId": 23,
        "speciesName": "EKANS",
        "minLevel": 11,
        "maxLevel": 17,
        "rate": 25
      }
    ],
    "21": [
      {
        "method": "walk",
        "speciesId": 6,
        "dexId": 100,
        "speciesName": "VOLTORB",
        "minLevel": 14,
        "maxLevel": 17,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 13,
        "maxLevel": 17,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 108,
        "dexId": 23,
        "speciesName": "EKANS",
        "minLevel": 11,
        "maxLevel": 17,
        "rate": 25
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 110,
        "dexId": 61,
        "speciesName": "POLIWHIRL",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "22": [
      {
        "method": "walk",
        "speciesId": 108,
        "dexId": 23,
        "speciesName": "EKANS",
        "minLevel": 12,
        "maxLevel": 15,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 13,
        "maxLevel": 17,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 48,
        "dexId": 96,
        "speciesName": "DROWZEE",
        "minLevel": 9,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "23": [
      {
        "method": "walk",
        "speciesId": 185,
        "dexId": 43,
        "speciesName": "ODDISH",
        "minLevel": 22,
        "maxLevel": 26,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 23,
        "maxLevel": 27,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 24,
        "maxLevel": 26,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 186,
        "dexId": 44,
        "speciesName": "GLOOM",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 5.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "24": [
      {
        "method": "walk",
        "speciesId": 185,
        "dexId": 43,
        "speciesName": "ODDISH",
        "minLevel": 22,
        "maxLevel": 26,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 25,
        "maxLevel": 27,
        "rate": 35.2
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 24,
        "maxLevel": 26,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 186,
        "dexId": 44,
        "speciesName": "GLOOM",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 5.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "25": [
      {
        "method": "walk",
        "speciesId": 185,
        "dexId": 43,
        "speciesName": "ODDISH",
        "minLevel": 22,
        "maxLevel": 26,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 24,
        "maxLevel": 26,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 186,
        "dexId": 44,
        "speciesName": "GLOOM",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 150,
        "dexId": 17,
        "speciesName": "PIDGEOTTO",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 5.5
      }
    ],
    "26": [
      {
        "method": "walk",
        "speciesId": 185,
        "dexId": 43,
        "speciesName": "ODDISH",
        "minLevel": 22,
        "maxLevel": 26,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 26,
        "maxLevel": 28,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 186,
        "dexId": 44,
        "speciesName": "GLOOM",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 150,
        "dexId": 17,
        "speciesName": "PIDGEOTTO",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 5.5
      }
    ],
    "27": [
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 18,
        "maxLevel": 22,
        "rate": 30.1
      },
      {
        "method": "walk",
        "speciesId": 70,
        "dexId": 84,
        "speciesName": "DODUO",
        "minLevel": 18,
        "maxLevel": 22,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 166,
        "dexId": 20,
        "speciesName": "RATICATE",
        "minLevel": 23,
        "maxLevel": 25,
        "rate": 5.5
      }
    ],
    "28": [
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 166,
        "dexId": 20,
        "speciesName": "RATICATE",
        "minLevel": 25,
        "maxLevel": 29,
        "rate": 30.1
      },
      {
        "method": "walk",
        "speciesId": 70,
        "dexId": 84,
        "speciesName": "DODUO",
        "minLevel": 24,
        "maxLevel": 28,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 35,
        "dexId": 22,
        "speciesName": "FEAROW",
        "minLevel": 25,
        "maxLevel": 27,
        "rate": 5.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "29": [
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 166,
        "dexId": 20,
        "speciesName": "RATICATE",
        "minLevel": 25,
        "maxLevel": 29,
        "rate": 20.3
      },
      {
        "method": "walk",
        "speciesId": 70,
        "dexId": 84,
        "speciesName": "DODUO",
        "minLevel": 24,
        "maxLevel": 28,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 35,
        "dexId": 22,
        "speciesName": "FEAROW",
        "minLevel": 25,
        "maxLevel": 29,
        "rate": 15.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "30": [
      {
        "method": "surf",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 40,
        "rate": 100
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "31": [
      {
        "method": "surf",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 40,
        "rate": 100
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "32": [
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 21,
        "maxLevel": 23,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 21,
        "maxLevel": 23,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 166,
        "dexId": 20,
        "speciesName": "RATICATE",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 150,
        "dexId": 17,
        "speciesName": "PIDGEOTTO",
        "minLevel": 30,
        "maxLevel": 32,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 30,
        "dexId": 114,
        "speciesName": "TANGELA",
        "minLevel": 28,
        "maxLevel": 32,
        "rate": 10.5
      },
      {
        "method": "surf",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 40,
        "rate": 100
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "33": [
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 2,
        "maxLevel": 4,
        "rate": 44.9
      },
      {
        "method": "walk",
        "speciesId": 3,
        "dexId": 32,
        "speciesName": "NIDORAN♂",
        "minLevel": 2,
        "maxLevel": 4,
        "rate": 39.5
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 3,
        "maxLevel": 5,
        "rate": 10.2
      },
      {
        "method": "walk",
        "speciesId": 15,
        "dexId": 29,
        "speciesName": "NIDORAN♀",
        "minLevel": 3,
        "maxLevel": 4,
        "rate": 5.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "34": [
      {
        "method": "walk",
        "speciesId": 108,
        "dexId": 23,
        "speciesName": "EKANS",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 33,
        "maxLevel": 43,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 35,
        "dexId": 22,
        "speciesName": "FEAROW",
        "minLevel": 38,
        "maxLevel": 43,
        "rate": 25
      },
      {
        "method": "walk",
        "speciesId": 45,
        "dexId": 24,
        "speciesName": "ARBOK",
        "minLevel": 41,
        "maxLevel": 41,
        "rate": 5.1
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 8,
        "dexId": 80,
        "speciesName": "SLOWBRO",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 158,
        "dexId": 119,
        "speciesName": "SEAKING",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 138,
        "dexId": 99,
        "speciesName": "KINGLER",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 93,
        "dexId": 117,
        "speciesName": "SEADRA",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      }
    ],
    "35": [
      {
        "method": "walk",
        "speciesId": 112,
        "dexId": 13,
        "speciesName": "WEEDLE",
        "minLevel": 7,
        "maxLevel": 7,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 113,
        "dexId": 14,
        "speciesName": "KAKUNA",
        "minLevel": 8,
        "maxLevel": 8,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 12,
        "maxLevel": 13,
        "rate": 20.3
      },
      {
        "method": "walk",
        "speciesId": 185,
        "dexId": 43,
        "speciesName": "ODDISH",
        "minLevel": 12,
        "maxLevel": 14,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 148,
        "dexId": 63,
        "speciesName": "ABRA",
        "minLevel": 8,
        "maxLevel": 12,
        "rate": 15.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      }
    ],
    "36": [
      {
        "method": "walk",
        "speciesId": 112,
        "dexId": 13,
        "speciesName": "WEEDLE",
        "minLevel": 8,
        "maxLevel": 8,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 113,
        "dexId": 14,
        "speciesName": "KAKUNA",
        "minLevel": 9,
        "maxLevel": 9,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 13,
        "maxLevel": 13,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 185,
        "dexId": 43,
        "speciesName": "ODDISH",
        "minLevel": 12,
        "maxLevel": 14,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 148,
        "dexId": 63,
        "speciesName": "ABRA",
        "minLevel": 10,
        "maxLevel": 12,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 124,
        "dexId": 11,
        "speciesName": "METAPOD",
        "minLevel": 7,
        "maxLevel": 7,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 123,
        "dexId": 10,
        "speciesName": "CATERPIE",
        "minLevel": 8,
        "maxLevel": 8,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      }
    ],
    "51": [
      {
        "method": "walk",
        "speciesId": 112,
        "dexId": 13,
        "speciesName": "WEEDLE",
        "minLevel": 3,
        "maxLevel": 5,
        "rate": 44.9
      },
      {
        "method": "walk",
        "speciesId": 113,
        "dexId": 14,
        "speciesName": "KAKUNA",
        "minLevel": 4,
        "maxLevel": 6,
        "rate": 39.5
      },
      {
        "method": "walk",
        "speciesId": 124,
        "dexId": 11,
        "speciesName": "METAPOD",
        "minLevel": 4,
        "maxLevel": 4,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 123,
        "dexId": 10,
        "speciesName": "CATERPIE",
        "minLevel": 3,
        "maxLevel": 3,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 84,
        "dexId": 25,
        "speciesName": "PIKACHU",
        "minLevel": 3,
        "maxLevel": 5,
        "rate": 5.5
      }
    ],
    "59": [
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 6,
        "maxLevel": 11,
        "rate": 78.9
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 8,
        "maxLevel": 10,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 109,
        "dexId": 46,
        "speciesName": "PARAS",
        "minLevel": 8,
        "maxLevel": 8,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 4,
        "dexId": 35,
        "speciesName": "CLEFAIRY",
        "minLevel": 8,
        "maxLevel": 8,
        "rate": 1.2
      }
    ],
    "60": [
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 7,
        "maxLevel": 11,
        "rate": 59.8
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 7,
        "maxLevel": 9,
        "rate": 26.2
      },
      {
        "method": "walk",
        "speciesId": 109,
        "dexId": 46,
        "speciesName": "PARAS",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 4,
        "dexId": 35,
        "speciesName": "CLEFAIRY",
        "minLevel": 9,
        "maxLevel": 9,
        "rate": 4.3
      }
    ],
    "61": [
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 9,
        "maxLevel": 12,
        "rate": 49.2
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 9,
        "maxLevel": 10,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 109,
        "dexId": 46,
        "speciesName": "PARAS",
        "minLevel": 10,
        "maxLevel": 12,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 4,
        "dexId": 35,
        "speciesName": "CLEFAIRY",
        "minLevel": 10,
        "maxLevel": 12,
        "rate": 6.3
      }
    ],
    "65": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      }
    ],
    "82": [
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 15,
        "maxLevel": 18,
        "rate": 54.7
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 16,
        "maxLevel": 17,
        "rate": 25
      },
      {
        "method": "walk",
        "speciesId": 106,
        "dexId": 66,
        "speciesName": "MACHOP",
        "minLevel": 15,
        "maxLevel": 17,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 34,
        "dexId": 95,
        "speciesName": "ONIX",
        "minLevel": 13,
        "maxLevel": 15,
        "rate": 5.5
      }
    ],
    "83": [
      {
        "method": "walk",
        "speciesId": 6,
        "dexId": 100,
        "speciesName": "VOLTORB",
        "minLevel": 21,
        "maxLevel": 23,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 173,
        "dexId": 81,
        "speciesName": "MAGNEMITE",
        "minLevel": 21,
        "maxLevel": 23,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 84,
        "dexId": 25,
        "speciesName": "PIKACHU",
        "minLevel": 20,
        "maxLevel": 24,
        "rate": 25
      },
      {
        "method": "walk",
        "speciesId": 54,
        "dexId": 82,
        "speciesName": "MAGNETON",
        "minLevel": 32,
        "maxLevel": 35,
        "rate": 10.2
      },
      {
        "method": "walk",
        "speciesId": 53,
        "dexId": 125,
        "speciesName": "ELECTABUZZ",
        "minLevel": 33,
        "maxLevel": 36,
        "rate": 5.5
      }
    ],
    "94": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "108": [
      {
        "method": "walk",
        "speciesId": 106,
        "dexId": 66,
        "speciesName": "MACHOP",
        "minLevel": 24,
        "maxLevel": 24,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 34,
        "dexId": 95,
        "speciesName": "ONIX",
        "minLevel": 36,
        "maxLevel": 42,
        "rate": 29.3
      },
      {
        "method": "walk",
        "speciesId": 39,
        "dexId": 75,
        "speciesName": "GRAVELER",
        "minLevel": 41,
        "maxLevel": 41,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 41,
        "maxLevel": 41,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 41,
        "dexId": 67,
        "speciesName": "MACHOKE",
        "minLevel": 42,
        "maxLevel": 42,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 145,
        "dexId": 105,
        "speciesName": "MAROWAK",
        "minLevel": 43,
        "maxLevel": 43,
        "rate": 1.2
      }
    ],
    "144": [
      {
        "method": "walk",
        "speciesId": 25,
        "dexId": 92,
        "speciesName": "GASTLY",
        "minLevel": 18,
        "maxLevel": 24,
        "rate": 89.5
      },
      {
        "method": "walk",
        "speciesId": 17,
        "dexId": 104,
        "speciesName": "CUBONE",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 9.4
      },
      {
        "method": "walk",
        "speciesId": 147,
        "dexId": 93,
        "speciesName": "HAUNTER",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 1.2
      }
    ],
    "145": [
      {
        "method": "walk",
        "speciesId": 25,
        "dexId": 92,
        "speciesName": "GASTLY",
        "minLevel": 18,
        "maxLevel": 24,
        "rate": 85.5
      },
      {
        "method": "walk",
        "speciesId": 147,
        "dexId": 93,
        "speciesName": "HAUNTER",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 17,
        "dexId": 104,
        "speciesName": "CUBONE",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 9.4
      }
    ],
    "146": [
      {
        "method": "walk",
        "speciesId": 25,
        "dexId": 92,
        "speciesName": "GASTLY",
        "minLevel": 18,
        "maxLevel": 24,
        "rate": 85.5
      },
      {
        "method": "walk",
        "speciesId": 147,
        "dexId": 93,
        "speciesName": "HAUNTER",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 17,
        "dexId": 104,
        "speciesName": "CUBONE",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 9.4
      }
    ],
    "147": [
      {
        "method": "walk",
        "speciesId": 25,
        "dexId": 92,
        "speciesName": "GASTLY",
        "minLevel": 19,
        "maxLevel": 24,
        "rate": 84.4
      },
      {
        "method": "walk",
        "speciesId": 147,
        "dexId": 93,
        "speciesName": "HAUNTER",
        "minLevel": 26,
        "maxLevel": 28,
        "rate": 6.3
      },
      {
        "method": "walk",
        "speciesId": 17,
        "dexId": 104,
        "speciesName": "CUBONE",
        "minLevel": 22,
        "maxLevel": 24,
        "rate": 9.4
      }
    ],
    "148": [
      {
        "method": "walk",
        "speciesId": 25,
        "dexId": 92,
        "speciesName": "GASTLY",
        "minLevel": 20,
        "maxLevel": 24,
        "rate": 74.6
      },
      {
        "method": "walk",
        "speciesId": 147,
        "dexId": 93,
        "speciesName": "HAUNTER",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 17,
        "dexId": 104,
        "speciesName": "CUBONE",
        "minLevel": 22,
        "maxLevel": 24,
        "rate": 10.2
      }
    ],
    "159": [
      {
        "method": "walk",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 30,
        "maxLevel": 32,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 32,
        "maxLevel": 32,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 58,
        "dexId": 86,
        "speciesName": "SEEL",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 120,
        "dexId": 87,
        "speciesName": "DEWGONG",
        "minLevel": 38,
        "maxLevel": 38,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 93,
        "dexId": 117,
        "speciesName": "SEADRA",
        "minLevel": 37,
        "maxLevel": 37,
        "rate": 1.2
      }
    ],
    "160": [
      {
        "method": "walk",
        "speciesId": 58,
        "dexId": 86,
        "speciesName": "SEEL",
        "minLevel": 30,
        "maxLevel": 32,
        "rate": 35.2
      },
      {
        "method": "walk",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 30,
        "maxLevel": 32,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 28,
        "maxLevel": 28,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 8,
        "dexId": 80,
        "speciesName": "SLOWBRO",
        "minLevel": 37,
        "maxLevel": 37,
        "rate": 1.2
      }
    ],
    "161": [
      {
        "method": "walk",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 31,
        "maxLevel": 33,
        "rate": 35.2
      },
      {
        "method": "walk",
        "speciesId": 58,
        "dexId": 86,
        "speciesName": "SEEL",
        "minLevel": 31,
        "maxLevel": 33,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 29,
        "maxLevel": 31,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 29,
        "maxLevel": 31,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 93,
        "dexId": 117,
        "speciesName": "SEADRA",
        "minLevel": 39,
        "maxLevel": 39,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 120,
        "dexId": 87,
        "speciesName": "DEWGONG",
        "minLevel": 37,
        "maxLevel": 37,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "162": [
      {
        "method": "walk",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 31,
        "maxLevel": 33,
        "rate": 35.2
      },
      {
        "method": "walk",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 31,
        "maxLevel": 33,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 29,
        "maxLevel": 31,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 58,
        "dexId": 86,
        "speciesName": "SEEL",
        "minLevel": 29,
        "maxLevel": 31,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 8,
        "dexId": 80,
        "speciesName": "SLOWBRO",
        "minLevel": 39,
        "maxLevel": 39,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 32,
        "maxLevel": 32,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "165": [
      {
        "method": "walk",
        "speciesId": 55,
        "dexId": 109,
        "speciesName": "KOFFING",
        "minLevel": 30,
        "maxLevel": 32,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 163,
        "dexId": 77,
        "speciesName": "PONYTA",
        "minLevel": 28,
        "maxLevel": 34,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 33,
        "dexId": 58,
        "speciesName": "GROWLITHE",
        "minLevel": 34,
        "maxLevel": 34,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 13,
        "dexId": 88,
        "speciesName": "GRIMER",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 143,
        "dexId": 110,
        "speciesName": "WEEZING",
        "minLevel": 37,
        "maxLevel": 37,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 136,
        "dexId": 89,
        "speciesName": "MUK",
        "minLevel": 39,
        "maxLevel": 39,
        "rate": 1.2
      }
    ],
    "192": [
      {
        "method": "walk",
        "speciesId": 58,
        "dexId": 86,
        "speciesName": "SEEL",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 21,
        "maxLevel": 21,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 29,
        "maxLevel": 29,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 28,
        "maxLevel": 28,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 128,
        "dexId": 55,
        "speciesName": "GOLDUCK",
        "minLevel": 38,
        "maxLevel": 38,
        "rate": 1.2
      }
    ],
    "194": [
      {
        "method": "walk",
        "speciesId": 106,
        "dexId": 66,
        "speciesName": "MACHOP",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 24,
        "maxLevel": 24,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 34,
        "dexId": 95,
        "speciesName": "ONIX",
        "minLevel": 36,
        "maxLevel": 42,
        "rate": 29.3
      },
      {
        "method": "walk",
        "speciesId": 41,
        "dexId": 67,
        "speciesName": "MACHOKE",
        "minLevel": 41,
        "maxLevel": 41,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 40,
        "maxLevel": 40,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 145,
        "dexId": 105,
        "speciesName": "MAROWAK",
        "minLevel": 40,
        "maxLevel": 40,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 39,
        "dexId": 75,
        "speciesName": "GRAVELER",
        "minLevel": 43,
        "maxLevel": 43,
        "rate": 1.2
      }
    ],
    "197": [
      {
        "method": "walk",
        "speciesId": 59,
        "dexId": 50,
        "speciesName": "DIGLETT",
        "minLevel": 15,
        "maxLevel": 22,
        "rate": 94.5
      },
      {
        "method": "walk",
        "speciesId": 118,
        "dexId": 51,
        "speciesName": "DUGTRIO",
        "minLevel": 29,
        "maxLevel": 31,
        "rate": 5.5
      }
    ],
    "198": [
      {
        "method": "walk",
        "speciesId": 106,
        "dexId": 66,
        "speciesName": "MACHOP",
        "minLevel": 24,
        "maxLevel": 24,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 34,
        "dexId": 95,
        "speciesName": "ONIX",
        "minLevel": 42,
        "maxLevel": 45,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 119,
        "dexId": 49,
        "speciesName": "VENOMOTH",
        "minLevel": 40,
        "maxLevel": 40,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 39,
        "dexId": 75,
        "speciesName": "GRAVELER",
        "minLevel": 43,
        "maxLevel": 43,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 41,
        "maxLevel": 41,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 41,
        "dexId": 67,
        "speciesName": "MACHOKE",
        "minLevel": 42,
        "maxLevel": 45,
        "rate": 5.5
      }
    ],
    "214": [
      {
        "method": "walk",
        "speciesId": 33,
        "dexId": 58,
        "speciesName": "GROWLITHE",
        "minLevel": 32,
        "maxLevel": 32,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 55,
        "dexId": 109,
        "speciesName": "KOFFING",
        "minLevel": 30,
        "maxLevel": 34,
        "rate": 44.9
      },
      {
        "method": "walk",
        "speciesId": 163,
        "dexId": 77,
        "speciesName": "PONYTA",
        "minLevel": 28,
        "maxLevel": 32,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 13,
        "dexId": 88,
        "speciesName": "GRIMER",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 143,
        "dexId": 110,
        "speciesName": "WEEZING",
        "minLevel": 39,
        "maxLevel": 39,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 136,
        "dexId": 89,
        "speciesName": "MUK",
        "minLevel": 37,
        "maxLevel": 37,
        "rate": 1.2
      }
    ],
    "215": [
      {
        "method": "walk",
        "speciesId": 55,
        "dexId": 109,
        "speciesName": "KOFFING",
        "minLevel": 31,
        "maxLevel": 35,
        "rate": 35.2
      },
      {
        "method": "walk",
        "speciesId": 33,
        "dexId": 58,
        "speciesName": "GROWLITHE",
        "minLevel": 33,
        "maxLevel": 33,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 163,
        "dexId": 77,
        "speciesName": "PONYTA",
        "minLevel": 32,
        "maxLevel": 36,
        "rate": 23.8
      },
      {
        "method": "walk",
        "speciesId": 143,
        "dexId": 110,
        "speciesName": "WEEZING",
        "minLevel": 38,
        "maxLevel": 40,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 13,
        "dexId": 88,
        "speciesName": "GRIMER",
        "minLevel": 34,
        "maxLevel": 34,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 136,
        "dexId": 89,
        "speciesName": "MUK",
        "minLevel": 42,
        "maxLevel": 42,
        "rate": 1.2
      }
    ],
    "216": [
      {
        "method": "walk",
        "speciesId": 55,
        "dexId": 109,
        "speciesName": "KOFFING",
        "minLevel": 31,
        "maxLevel": 33,
        "rate": 49.6
      },
      {
        "method": "walk",
        "speciesId": 33,
        "dexId": 58,
        "speciesName": "GROWLITHE",
        "minLevel": 35,
        "maxLevel": 35,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 163,
        "dexId": 77,
        "speciesName": "PONYTA",
        "minLevel": 32,
        "maxLevel": 34,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 143,
        "dexId": 110,
        "speciesName": "WEEZING",
        "minLevel": 40,
        "maxLevel": 42,
        "rate": 14.1
      },
      {
        "method": "walk",
        "speciesId": 13,
        "dexId": 88,
        "speciesName": "GRIMER",
        "minLevel": 35,
        "maxLevel": 35,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 136,
        "dexId": 89,
        "speciesName": "MUK",
        "minLevel": 42,
        "maxLevel": 42,
        "rate": 1.2
      }
    ],
    "217": [
      {
        "method": "walk",
        "speciesId": 3,
        "dexId": 32,
        "speciesName": "NIDORAN♂",
        "minLevel": 24,
        "maxLevel": 24,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 70,
        "dexId": 84,
        "speciesName": "DODUO",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 109,
        "dexId": 46,
        "speciesName": "PARAS",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 12,
        "dexId": 102,
        "speciesName": "EXEGGCUTE",
        "minLevel": 23,
        "maxLevel": 25,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 167,
        "dexId": 33,
        "speciesName": "NIDORINO",
        "minLevel": 33,
        "maxLevel": 33,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 15,
        "dexId": 29,
        "speciesName": "NIDORAN♀",
        "minLevel": 24,
        "maxLevel": 24,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 46,
        "dexId": 47,
        "speciesName": "PARASECT",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 2,
        "dexId": 115,
        "speciesName": "KANGASKHAN",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 26,
        "dexId": 123,
        "speciesName": "SCYTHER",
        "minLevel": 28,
        "maxLevel": 28,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 88,
        "dexId": 147,
        "speciesName": "DRATINI",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "218": [
      {
        "method": "walk",
        "speciesId": 3,
        "dexId": 32,
        "speciesName": "NIDORAN♂",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 18,
        "dexId": 111,
        "speciesName": "RHYHORN",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 109,
        "dexId": 46,
        "speciesName": "PARAS",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 12,
        "dexId": 102,
        "speciesName": "EXEGGCUTE",
        "minLevel": 25,
        "maxLevel": 27,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 167,
        "dexId": 33,
        "speciesName": "NIDORINO",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 168,
        "dexId": 30,
        "speciesName": "NIDORINA",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 119,
        "dexId": 49,
        "speciesName": "VENOMOTH",
        "minLevel": 32,
        "maxLevel": 32,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 40,
        "dexId": 113,
        "speciesName": "CHANSEY",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 60,
        "dexId": 128,
        "speciesName": "TAUROS",
        "minLevel": 28,
        "maxLevel": 28,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 88,
        "dexId": 147,
        "speciesName": "DRATINI",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "219": [
      {
        "method": "walk",
        "speciesId": 3,
        "dexId": 32,
        "speciesName": "NIDORAN♂",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 70,
        "dexId": 84,
        "speciesName": "DODUO",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 12,
        "dexId": 102,
        "speciesName": "EXEGGCUTE",
        "minLevel": 24,
        "maxLevel": 26,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 167,
        "dexId": 33,
        "speciesName": "NIDORINO",
        "minLevel": 33,
        "maxLevel": 33,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 15,
        "dexId": 29,
        "speciesName": "NIDORAN♀",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 119,
        "dexId": 49,
        "speciesName": "VENOMOTH",
        "minLevel": 31,
        "maxLevel": 31,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 60,
        "dexId": 128,
        "speciesName": "TAUROS",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 2,
        "dexId": 115,
        "speciesName": "KANGASKHAN",
        "minLevel": 28,
        "maxLevel": 28,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 88,
        "dexId": 147,
        "speciesName": "DRATINI",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "220": [
      {
        "method": "walk",
        "speciesId": 3,
        "dexId": 32,
        "speciesName": "NIDORAN♂",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 18,
        "dexId": 111,
        "speciesName": "RHYHORN",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 12,
        "dexId": 102,
        "speciesName": "EXEGGCUTE",
        "minLevel": 24,
        "maxLevel": 25,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 167,
        "dexId": 33,
        "speciesName": "NIDORINO",
        "minLevel": 31,
        "maxLevel": 31,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 168,
        "dexId": 30,
        "speciesName": "NIDORINA",
        "minLevel": 31,
        "maxLevel": 31,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 46,
        "dexId": 47,
        "speciesName": "PARASECT",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 26,
        "dexId": 123,
        "speciesName": "SCYTHER",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 40,
        "dexId": 113,
        "speciesName": "CHANSEY",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 88,
        "dexId": 147,
        "speciesName": "DRATINI",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "226": [
      {
        "method": "walk",
        "speciesId": 116,
        "dexId": 85,
        "speciesName": "DODRIO",
        "minLevel": 51,
        "maxLevel": 51,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 119,
        "dexId": 49,
        "speciesName": "VENOMOTH",
        "minLevel": 51,
        "maxLevel": 51,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 38,
        "dexId": 64,
        "speciesName": "KADABRA",
        "minLevel": 51,
        "maxLevel": 51,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 1,
        "dexId": 112,
        "speciesName": "RHYDON",
        "minLevel": 52,
        "maxLevel": 52,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 145,
        "dexId": 105,
        "speciesName": "MAROWAK",
        "minLevel": 52,
        "maxLevel": 52,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 141,
        "dexId": 101,
        "speciesName": "ELECTRODE",
        "minLevel": 52,
        "maxLevel": 52,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 40,
        "dexId": 113,
        "speciesName": "CHANSEY",
        "minLevel": 56,
        "maxLevel": 56,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 101,
        "dexId": 40,
        "speciesName": "WIGGLYTUFF",
        "minLevel": 54,
        "maxLevel": 54,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 55,
        "maxLevel": 60,
        "rate": 5.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 8,
        "dexId": 80,
        "speciesName": "SLOWBRO",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 158,
        "dexId": 119,
        "speciesName": "SEAKING",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 138,
        "dexId": 99,
        "speciesName": "KINGLER",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 93,
        "dexId": 117,
        "speciesName": "SEADRA",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      }
    ],
    "227": [
      {
        "method": "walk",
        "speciesId": 1,
        "dexId": 112,
        "speciesName": "RHYDON",
        "minLevel": 55,
        "maxLevel": 55,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 145,
        "dexId": 105,
        "speciesName": "MAROWAK",
        "minLevel": 55,
        "maxLevel": 55,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 141,
        "dexId": 101,
        "speciesName": "ELECTRODE",
        "minLevel": 55,
        "maxLevel": 55,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 40,
        "dexId": 113,
        "speciesName": "CHANSEY",
        "minLevel": 64,
        "maxLevel": 64,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 46,
        "dexId": 47,
        "speciesName": "PARASECT",
        "minLevel": 64,
        "maxLevel": 64,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 85,
        "dexId": 26,
        "speciesName": "RAICHU",
        "minLevel": 64,
        "maxLevel": 64,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 45,
        "dexId": 24,
        "speciesName": "ARBOK",
        "minLevel": 57,
        "maxLevel": 57,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 63,
        "maxLevel": 67,
        "rate": 10.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 8,
        "dexId": 80,
        "speciesName": "SLOWBRO",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 158,
        "dexId": 119,
        "speciesName": "SEAKING",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 138,
        "dexId": 99,
        "speciesName": "KINGLER",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 93,
        "dexId": 117,
        "speciesName": "SEADRA",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      }
    ],
    "228": [
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 46,
        "maxLevel": 46,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 129,
        "dexId": 97,
        "speciesName": "HYPNO",
        "minLevel": 46,
        "maxLevel": 46,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 54,
        "dexId": 82,
        "speciesName": "MAGNETON",
        "minLevel": 46,
        "maxLevel": 46,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 116,
        "dexId": 85,
        "speciesName": "DODRIO",
        "minLevel": 49,
        "maxLevel": 49,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 119,
        "dexId": 49,
        "speciesName": "VENOMOTH",
        "minLevel": 49,
        "maxLevel": 49,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 45,
        "dexId": 24,
        "speciesName": "ARBOK",
        "minLevel": 52,
        "maxLevel": 52,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 38,
        "dexId": 64,
        "speciesName": "KADABRA",
        "minLevel": 49,
        "maxLevel": 49,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 46,
        "dexId": 47,
        "speciesName": "PARASECT",
        "minLevel": 52,
        "maxLevel": 52,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 85,
        "dexId": 26,
        "speciesName": "RAICHU",
        "minLevel": 53,
        "maxLevel": 53,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 53,
        "maxLevel": 53,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 8,
        "dexId": 80,
        "speciesName": "SLOWBRO",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 158,
        "dexId": 119,
        "speciesName": "SEAKING",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 138,
        "dexId": 99,
        "speciesName": "KINGLER",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 93,
        "dexId": 117,
        "speciesName": "SEADRA",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      }
    ],
    "232": [
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 16,
        "maxLevel": 18,
        "rate": 49.6
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 16,
        "maxLevel": 18,
        "rate": 26.2
      },
      {
        "method": "walk",
        "speciesId": 106,
        "dexId": 66,
        "speciesName": "MACHOP",
        "minLevel": 15,
        "maxLevel": 17,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 34,
        "dexId": 95,
        "speciesName": "ONIX",
        "minLevel": 13,
        "maxLevel": 17,
        "rate": 9.4
      }
    ]
  },
  "blue": {
    "0": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "1": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "3": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      }
    ],
    "5": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "6": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 110,
        "dexId": 61,
        "speciesName": "POLIWHIRL",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "7": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 158,
        "dexId": 119,
        "speciesName": "SEAKING",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "8": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "12": [
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 2,
        "maxLevel": 5,
        "rate": 50
      },
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 2,
        "maxLevel": 4,
        "rate": 50
      }
    ],
    "13": [
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 2,
        "maxLevel": 5,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 3,
        "maxLevel": 5,
        "rate": 44.9
      },
      {
        "method": "walk",
        "speciesId": 123,
        "dexId": 10,
        "speciesName": "CATERPIE",
        "minLevel": 3,
        "maxLevel": 5,
        "rate": 15.2
      }
    ],
    "14": [
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 6,
        "maxLevel": 8,
        "rate": 44.9
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 5,
        "maxLevel": 8,
        "rate": 44.5
      },
      {
        "method": "walk",
        "speciesId": 100,
        "dexId": 39,
        "speciesName": "JIGGLYPUFF",
        "minLevel": 3,
        "maxLevel": 7,
        "rate": 10.5
      }
    ],
    "15": [
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 8,
        "maxLevel": 12,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 8,
        "maxLevel": 12,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 96,
        "dexId": 27,
        "speciesName": "SANDSHREW",
        "minLevel": 6,
        "maxLevel": 12,
        "rate": 25
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      }
    ],
    "16": [
      {
        "method": "walk",
        "speciesId": 188,
        "dexId": 69,
        "speciesName": "BELLSPROUT",
        "minLevel": 13,
        "maxLevel": 16,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 13,
        "maxLevel": 16,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 77,
        "dexId": 52,
        "speciesName": "MEOWTH",
        "minLevel": 10,
        "maxLevel": 16,
        "rate": 25
      }
    ],
    "17": [
      {
        "method": "walk",
        "speciesId": 188,
        "dexId": 69,
        "speciesName": "BELLSPROUT",
        "minLevel": 13,
        "maxLevel": 16,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 13,
        "maxLevel": 16,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 77,
        "dexId": 52,
        "speciesName": "MEOWTH",
        "minLevel": 10,
        "maxLevel": 16,
        "rate": 25
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "18": [
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 19,
        "maxLevel": 22,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 188,
        "dexId": 69,
        "speciesName": "BELLSPROUT",
        "minLevel": 19,
        "maxLevel": 22,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 77,
        "dexId": 52,
        "speciesName": "MEOWTH",
        "minLevel": 17,
        "maxLevel": 20,
        "rate": 30.5
      },
      {
        "method": "walk",
        "speciesId": 82,
        "dexId": 37,
        "speciesName": "VULPIX",
        "minLevel": 18,
        "maxLevel": 20,
        "rate": 10.2
      }
    ],
    "19": [
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 18,
        "maxLevel": 20,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 77,
        "dexId": 52,
        "speciesName": "MEOWTH",
        "minLevel": 18,
        "maxLevel": 20,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 96,
        "dexId": 27,
        "speciesName": "SANDSHREW",
        "minLevel": 17,
        "maxLevel": 19,
        "rate": 20.3
      },
      {
        "method": "walk",
        "speciesId": 82,
        "dexId": 37,
        "speciesName": "VULPIX",
        "minLevel": 15,
        "maxLevel": 18,
        "rate": 20.3
      }
    ],
    "20": [
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 14,
        "maxLevel": 17,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 13,
        "maxLevel": 17,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 96,
        "dexId": 27,
        "speciesName": "SANDSHREW",
        "minLevel": 11,
        "maxLevel": 17,
        "rate": 25
      }
    ],
    "21": [
      {
        "method": "walk",
        "speciesId": 6,
        "dexId": 100,
        "speciesName": "VOLTORB",
        "minLevel": 14,
        "maxLevel": 17,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 13,
        "maxLevel": 17,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 96,
        "dexId": 27,
        "speciesName": "SANDSHREW",
        "minLevel": 11,
        "maxLevel": 17,
        "rate": 25
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 110,
        "dexId": 61,
        "speciesName": "POLIWHIRL",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "22": [
      {
        "method": "walk",
        "speciesId": 96,
        "dexId": 27,
        "speciesName": "SANDSHREW",
        "minLevel": 12,
        "maxLevel": 15,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 13,
        "maxLevel": 17,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 48,
        "dexId": 96,
        "speciesName": "DROWZEE",
        "minLevel": 9,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "23": [
      {
        "method": "walk",
        "speciesId": 188,
        "dexId": 69,
        "speciesName": "BELLSPROUT",
        "minLevel": 22,
        "maxLevel": 26,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 23,
        "maxLevel": 27,
        "rate": 40.2
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 24,
        "maxLevel": 26,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 189,
        "dexId": 70,
        "speciesName": "WEEPINBELL",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 5.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "24": [
      {
        "method": "walk",
        "speciesId": 188,
        "dexId": 69,
        "speciesName": "BELLSPROUT",
        "minLevel": 22,
        "maxLevel": 26,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 25,
        "maxLevel": 27,
        "rate": 35.2
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 24,
        "maxLevel": 26,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 189,
        "dexId": 70,
        "speciesName": "WEEPINBELL",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 5.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "25": [
      {
        "method": "walk",
        "speciesId": 188,
        "dexId": 69,
        "speciesName": "BELLSPROUT",
        "minLevel": 22,
        "maxLevel": 26,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 24,
        "maxLevel": 26,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 189,
        "dexId": 70,
        "speciesName": "WEEPINBELL",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 150,
        "dexId": 17,
        "speciesName": "PIDGEOTTO",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 5.5
      }
    ],
    "26": [
      {
        "method": "walk",
        "speciesId": 188,
        "dexId": 69,
        "speciesName": "BELLSPROUT",
        "minLevel": 22,
        "maxLevel": 26,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 26,
        "maxLevel": 28,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 189,
        "dexId": 70,
        "speciesName": "WEEPINBELL",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 150,
        "dexId": 17,
        "speciesName": "PIDGEOTTO",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 5.5
      }
    ],
    "27": [
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 18,
        "maxLevel": 22,
        "rate": 30.1
      },
      {
        "method": "walk",
        "speciesId": 70,
        "dexId": 84,
        "speciesName": "DODUO",
        "minLevel": 18,
        "maxLevel": 22,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 166,
        "dexId": 20,
        "speciesName": "RATICATE",
        "minLevel": 23,
        "maxLevel": 25,
        "rate": 5.5
      }
    ],
    "28": [
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 166,
        "dexId": 20,
        "speciesName": "RATICATE",
        "minLevel": 25,
        "maxLevel": 29,
        "rate": 30.1
      },
      {
        "method": "walk",
        "speciesId": 70,
        "dexId": 84,
        "speciesName": "DODUO",
        "minLevel": 24,
        "maxLevel": 28,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 35,
        "dexId": 22,
        "speciesName": "FEAROW",
        "minLevel": 25,
        "maxLevel": 27,
        "rate": 5.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "29": [
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 166,
        "dexId": 20,
        "speciesName": "RATICATE",
        "minLevel": 25,
        "maxLevel": 29,
        "rate": 20.3
      },
      {
        "method": "walk",
        "speciesId": 70,
        "dexId": 84,
        "speciesName": "DODUO",
        "minLevel": 24,
        "maxLevel": 28,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 35,
        "dexId": 22,
        "speciesName": "FEAROW",
        "minLevel": 25,
        "maxLevel": 29,
        "rate": 15.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "30": [
      {
        "method": "surf",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 40,
        "rate": 100
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "31": [
      {
        "method": "surf",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 40,
        "rate": 100
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "32": [
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 21,
        "maxLevel": 23,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 21,
        "maxLevel": 23,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 166,
        "dexId": 20,
        "speciesName": "RATICATE",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 150,
        "dexId": 17,
        "speciesName": "PIDGEOTTO",
        "minLevel": 30,
        "maxLevel": 32,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 30,
        "dexId": 114,
        "speciesName": "TANGELA",
        "minLevel": 28,
        "maxLevel": 32,
        "rate": 10.5
      },
      {
        "method": "surf",
        "speciesId": 24,
        "dexId": 72,
        "speciesName": "TENTACOOL",
        "minLevel": 5,
        "maxLevel": 40,
        "rate": 100
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "33": [
      {
        "method": "walk",
        "speciesId": 165,
        "dexId": 19,
        "speciesName": "RATTATA",
        "minLevel": 2,
        "maxLevel": 4,
        "rate": 44.9
      },
      {
        "method": "walk",
        "speciesId": 15,
        "dexId": 29,
        "speciesName": "NIDORAN♀",
        "minLevel": 2,
        "maxLevel": 4,
        "rate": 39.5
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 3,
        "maxLevel": 5,
        "rate": 10.2
      },
      {
        "method": "walk",
        "speciesId": 3,
        "dexId": 32,
        "speciesName": "NIDORAN♂",
        "minLevel": 3,
        "maxLevel": 4,
        "rate": 5.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "34": [
      {
        "method": "walk",
        "speciesId": 96,
        "dexId": 27,
        "speciesName": "SANDSHREW",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 33,
        "maxLevel": 43,
        "rate": 34.8
      },
      {
        "method": "walk",
        "speciesId": 5,
        "dexId": 21,
        "speciesName": "SPEAROW",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 35,
        "dexId": 22,
        "speciesName": "FEAROW",
        "minLevel": 38,
        "maxLevel": 43,
        "rate": 25
      },
      {
        "method": "walk",
        "speciesId": 97,
        "dexId": 28,
        "speciesName": "SANDSLASH",
        "minLevel": 41,
        "maxLevel": 41,
        "rate": 5.1
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 8,
        "dexId": 80,
        "speciesName": "SLOWBRO",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 158,
        "dexId": 119,
        "speciesName": "SEAKING",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 138,
        "dexId": 99,
        "speciesName": "KINGLER",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 93,
        "dexId": 117,
        "speciesName": "SEADRA",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      }
    ],
    "35": [
      {
        "method": "walk",
        "speciesId": 123,
        "dexId": 10,
        "speciesName": "CATERPIE",
        "minLevel": 7,
        "maxLevel": 7,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 124,
        "dexId": 11,
        "speciesName": "METAPOD",
        "minLevel": 8,
        "maxLevel": 8,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 12,
        "maxLevel": 13,
        "rate": 20.3
      },
      {
        "method": "walk",
        "speciesId": 188,
        "dexId": 69,
        "speciesName": "BELLSPROUT",
        "minLevel": 12,
        "maxLevel": 14,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 148,
        "dexId": 63,
        "speciesName": "ABRA",
        "minLevel": 8,
        "maxLevel": 12,
        "rate": 15.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      }
    ],
    "36": [
      {
        "method": "walk",
        "speciesId": 123,
        "dexId": 10,
        "speciesName": "CATERPIE",
        "minLevel": 8,
        "maxLevel": 8,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 124,
        "dexId": 11,
        "speciesName": "METAPOD",
        "minLevel": 9,
        "maxLevel": 9,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 36,
        "dexId": 16,
        "speciesName": "PIDGEY",
        "minLevel": 13,
        "maxLevel": 13,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 188,
        "dexId": 69,
        "speciesName": "BELLSPROUT",
        "minLevel": 12,
        "maxLevel": 14,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 148,
        "dexId": 63,
        "speciesName": "ABRA",
        "minLevel": 10,
        "maxLevel": 12,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 113,
        "dexId": 14,
        "speciesName": "KAKUNA",
        "minLevel": 7,
        "maxLevel": 7,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 112,
        "dexId": 13,
        "speciesName": "WEEDLE",
        "minLevel": 8,
        "maxLevel": 8,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      }
    ],
    "51": [
      {
        "method": "walk",
        "speciesId": 123,
        "dexId": 10,
        "speciesName": "CATERPIE",
        "minLevel": 3,
        "maxLevel": 5,
        "rate": 44.9
      },
      {
        "method": "walk",
        "speciesId": 124,
        "dexId": 11,
        "speciesName": "METAPOD",
        "minLevel": 4,
        "maxLevel": 6,
        "rate": 39.5
      },
      {
        "method": "walk",
        "speciesId": 113,
        "dexId": 14,
        "speciesName": "KAKUNA",
        "minLevel": 4,
        "maxLevel": 4,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 112,
        "dexId": 13,
        "speciesName": "WEEDLE",
        "minLevel": 3,
        "maxLevel": 3,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 84,
        "dexId": 25,
        "speciesName": "PIKACHU",
        "minLevel": 3,
        "maxLevel": 5,
        "rate": 5.5
      }
    ],
    "59": [
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 6,
        "maxLevel": 11,
        "rate": 78.9
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 8,
        "maxLevel": 10,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 109,
        "dexId": 46,
        "speciesName": "PARAS",
        "minLevel": 8,
        "maxLevel": 8,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 4,
        "dexId": 35,
        "speciesName": "CLEFAIRY",
        "minLevel": 8,
        "maxLevel": 8,
        "rate": 1.2
      }
    ],
    "60": [
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 7,
        "maxLevel": 11,
        "rate": 59.8
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 7,
        "maxLevel": 9,
        "rate": 26.2
      },
      {
        "method": "walk",
        "speciesId": 109,
        "dexId": 46,
        "speciesName": "PARAS",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 4,
        "dexId": 35,
        "speciesName": "CLEFAIRY",
        "minLevel": 9,
        "maxLevel": 9,
        "rate": 4.3
      }
    ],
    "61": [
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 9,
        "maxLevel": 12,
        "rate": 49.2
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 9,
        "maxLevel": 10,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 109,
        "dexId": 46,
        "speciesName": "PARAS",
        "minLevel": 10,
        "maxLevel": 12,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 4,
        "dexId": 35,
        "speciesName": "CLEFAIRY",
        "minLevel": 10,
        "maxLevel": 12,
        "rate": 6.3
      }
    ],
    "65": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 33.3
      }
    ],
    "82": [
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 15,
        "maxLevel": 18,
        "rate": 54.7
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 16,
        "maxLevel": 17,
        "rate": 25
      },
      {
        "method": "walk",
        "speciesId": 106,
        "dexId": 66,
        "speciesName": "MACHOP",
        "minLevel": 15,
        "maxLevel": 17,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 34,
        "dexId": 95,
        "speciesName": "ONIX",
        "minLevel": 13,
        "maxLevel": 15,
        "rate": 5.5
      }
    ],
    "83": [
      {
        "method": "walk",
        "speciesId": 6,
        "dexId": 100,
        "speciesName": "VOLTORB",
        "minLevel": 21,
        "maxLevel": 23,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 173,
        "dexId": 81,
        "speciesName": "MAGNEMITE",
        "minLevel": 21,
        "maxLevel": 23,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 84,
        "dexId": 25,
        "speciesName": "PIKACHU",
        "minLevel": 20,
        "maxLevel": 24,
        "rate": 25
      },
      {
        "method": "walk",
        "speciesId": 54,
        "dexId": 82,
        "speciesName": "MAGNETON",
        "minLevel": 32,
        "maxLevel": 35,
        "rate": 10.2
      },
      {
        "method": "walk",
        "speciesId": 85,
        "dexId": 26,
        "speciesName": "RAICHU",
        "minLevel": 33,
        "maxLevel": 36,
        "rate": 5.5
      }
    ],
    "94": [
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 50
      }
    ],
    "108": [
      {
        "method": "walk",
        "speciesId": 106,
        "dexId": 66,
        "speciesName": "MACHOP",
        "minLevel": 24,
        "maxLevel": 24,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 34,
        "dexId": 95,
        "speciesName": "ONIX",
        "minLevel": 36,
        "maxLevel": 42,
        "rate": 29.3
      },
      {
        "method": "walk",
        "speciesId": 39,
        "dexId": 75,
        "speciesName": "GRAVELER",
        "minLevel": 41,
        "maxLevel": 41,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 41,
        "maxLevel": 41,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 41,
        "dexId": 67,
        "speciesName": "MACHOKE",
        "minLevel": 42,
        "maxLevel": 42,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 145,
        "dexId": 105,
        "speciesName": "MAROWAK",
        "minLevel": 43,
        "maxLevel": 43,
        "rate": 1.2
      }
    ],
    "144": [
      {
        "method": "walk",
        "speciesId": 25,
        "dexId": 92,
        "speciesName": "GASTLY",
        "minLevel": 18,
        "maxLevel": 24,
        "rate": 89.5
      },
      {
        "method": "walk",
        "speciesId": 17,
        "dexId": 104,
        "speciesName": "CUBONE",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 9.4
      },
      {
        "method": "walk",
        "speciesId": 147,
        "dexId": 93,
        "speciesName": "HAUNTER",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 1.2
      }
    ],
    "145": [
      {
        "method": "walk",
        "speciesId": 25,
        "dexId": 92,
        "speciesName": "GASTLY",
        "minLevel": 18,
        "maxLevel": 24,
        "rate": 85.5
      },
      {
        "method": "walk",
        "speciesId": 147,
        "dexId": 93,
        "speciesName": "HAUNTER",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 17,
        "dexId": 104,
        "speciesName": "CUBONE",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 9.4
      }
    ],
    "146": [
      {
        "method": "walk",
        "speciesId": 25,
        "dexId": 92,
        "speciesName": "GASTLY",
        "minLevel": 18,
        "maxLevel": 24,
        "rate": 85.5
      },
      {
        "method": "walk",
        "speciesId": 147,
        "dexId": 93,
        "speciesName": "HAUNTER",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 17,
        "dexId": 104,
        "speciesName": "CUBONE",
        "minLevel": 20,
        "maxLevel": 22,
        "rate": 9.4
      }
    ],
    "147": [
      {
        "method": "walk",
        "speciesId": 25,
        "dexId": 92,
        "speciesName": "GASTLY",
        "minLevel": 19,
        "maxLevel": 24,
        "rate": 84.4
      },
      {
        "method": "walk",
        "speciesId": 147,
        "dexId": 93,
        "speciesName": "HAUNTER",
        "minLevel": 26,
        "maxLevel": 28,
        "rate": 6.3
      },
      {
        "method": "walk",
        "speciesId": 17,
        "dexId": 104,
        "speciesName": "CUBONE",
        "minLevel": 22,
        "maxLevel": 24,
        "rate": 9.4
      }
    ],
    "148": [
      {
        "method": "walk",
        "speciesId": 25,
        "dexId": 92,
        "speciesName": "GASTLY",
        "minLevel": 20,
        "maxLevel": 24,
        "rate": 74.6
      },
      {
        "method": "walk",
        "speciesId": 147,
        "dexId": 93,
        "speciesName": "HAUNTER",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 17,
        "dexId": 104,
        "speciesName": "CUBONE",
        "minLevel": 22,
        "maxLevel": 24,
        "rate": 10.2
      }
    ],
    "159": [
      {
        "method": "walk",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 30,
        "maxLevel": 32,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 32,
        "maxLevel": 32,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 58,
        "dexId": 86,
        "speciesName": "SEEL",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 120,
        "dexId": 87,
        "speciesName": "DEWGONG",
        "minLevel": 38,
        "maxLevel": 38,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 138,
        "dexId": 99,
        "speciesName": "KINGLER",
        "minLevel": 37,
        "maxLevel": 37,
        "rate": 1.2
      }
    ],
    "160": [
      {
        "method": "walk",
        "speciesId": 58,
        "dexId": 86,
        "speciesName": "SEEL",
        "minLevel": 30,
        "maxLevel": 32,
        "rate": 35.2
      },
      {
        "method": "walk",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 30,
        "maxLevel": 32,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 28,
        "maxLevel": 28,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 128,
        "dexId": 55,
        "speciesName": "GOLDUCK",
        "minLevel": 37,
        "maxLevel": 37,
        "rate": 1.2
      }
    ],
    "161": [
      {
        "method": "walk",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 31,
        "maxLevel": 33,
        "rate": 35.2
      },
      {
        "method": "walk",
        "speciesId": 58,
        "dexId": 86,
        "speciesName": "SEEL",
        "minLevel": 31,
        "maxLevel": 33,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 29,
        "maxLevel": 31,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 29,
        "maxLevel": 31,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 138,
        "dexId": 99,
        "speciesName": "KINGLER",
        "minLevel": 39,
        "maxLevel": 39,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 120,
        "dexId": 87,
        "speciesName": "DEWGONG",
        "minLevel": 37,
        "maxLevel": 37,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "162": [
      {
        "method": "walk",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 31,
        "maxLevel": 33,
        "rate": 35.2
      },
      {
        "method": "walk",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 31,
        "maxLevel": 33,
        "rate": 29.7
      },
      {
        "method": "walk",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 29,
        "maxLevel": 31,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 58,
        "dexId": 86,
        "speciesName": "SEEL",
        "minLevel": 29,
        "maxLevel": 31,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 128,
        "dexId": 55,
        "speciesName": "GOLDUCK",
        "minLevel": 39,
        "maxLevel": 39,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 32,
        "maxLevel": 32,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 92,
        "dexId": 116,
        "speciesName": "HORSEA",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 23,
        "dexId": 90,
        "speciesName": "SHELLDER",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "165": [
      {
        "method": "walk",
        "speciesId": 13,
        "dexId": 88,
        "speciesName": "GRIMER",
        "minLevel": 30,
        "maxLevel": 32,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 163,
        "dexId": 77,
        "speciesName": "PONYTA",
        "minLevel": 28,
        "maxLevel": 34,
        "rate": 39.8
      },
      {
        "method": "walk",
        "speciesId": 82,
        "dexId": 37,
        "speciesName": "VULPIX",
        "minLevel": 34,
        "maxLevel": 34,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 55,
        "dexId": 109,
        "speciesName": "KOFFING",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 136,
        "dexId": 89,
        "speciesName": "MUK",
        "minLevel": 37,
        "maxLevel": 37,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 143,
        "dexId": 110,
        "speciesName": "WEEZING",
        "minLevel": 39,
        "maxLevel": 39,
        "rate": 1.2
      }
    ],
    "192": [
      {
        "method": "walk",
        "speciesId": 58,
        "dexId": 86,
        "speciesName": "SEEL",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 27,
        "dexId": 120,
        "speciesName": "STARYU",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 28,
        "maxLevel": 30,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 21,
        "maxLevel": 21,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 29,
        "maxLevel": 29,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 28,
        "maxLevel": 28,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 8,
        "dexId": 80,
        "speciesName": "SLOWBRO",
        "minLevel": 38,
        "maxLevel": 38,
        "rate": 1.2
      }
    ],
    "194": [
      {
        "method": "walk",
        "speciesId": 106,
        "dexId": 66,
        "speciesName": "MACHOP",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 24,
        "maxLevel": 24,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 34,
        "dexId": 95,
        "speciesName": "ONIX",
        "minLevel": 36,
        "maxLevel": 42,
        "rate": 29.3
      },
      {
        "method": "walk",
        "speciesId": 41,
        "dexId": 67,
        "speciesName": "MACHOKE",
        "minLevel": 41,
        "maxLevel": 41,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 40,
        "maxLevel": 40,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 145,
        "dexId": 105,
        "speciesName": "MAROWAK",
        "minLevel": 40,
        "maxLevel": 40,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 39,
        "dexId": 75,
        "speciesName": "GRAVELER",
        "minLevel": 43,
        "maxLevel": 43,
        "rate": 1.2
      }
    ],
    "197": [
      {
        "method": "walk",
        "speciesId": 59,
        "dexId": 50,
        "speciesName": "DIGLETT",
        "minLevel": 15,
        "maxLevel": 22,
        "rate": 94.5
      },
      {
        "method": "walk",
        "speciesId": 118,
        "dexId": 51,
        "speciesName": "DUGTRIO",
        "minLevel": 29,
        "maxLevel": 31,
        "rate": 5.5
      }
    ],
    "198": [
      {
        "method": "walk",
        "speciesId": 106,
        "dexId": 66,
        "speciesName": "MACHOP",
        "minLevel": 24,
        "maxLevel": 24,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 34,
        "dexId": 95,
        "speciesName": "ONIX",
        "minLevel": 42,
        "maxLevel": 45,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 119,
        "dexId": 49,
        "speciesName": "VENOMOTH",
        "minLevel": 40,
        "maxLevel": 40,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 39,
        "dexId": 75,
        "speciesName": "GRAVELER",
        "minLevel": 43,
        "maxLevel": 43,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 41,
        "maxLevel": 41,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 41,
        "dexId": 67,
        "speciesName": "MACHOKE",
        "minLevel": 42,
        "maxLevel": 45,
        "rate": 5.5
      }
    ],
    "214": [
      {
        "method": "walk",
        "speciesId": 82,
        "dexId": 37,
        "speciesName": "VULPIX",
        "minLevel": 32,
        "maxLevel": 32,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 13,
        "dexId": 88,
        "speciesName": "GRIMER",
        "minLevel": 30,
        "maxLevel": 34,
        "rate": 44.9
      },
      {
        "method": "walk",
        "speciesId": 163,
        "dexId": 77,
        "speciesName": "PONYTA",
        "minLevel": 28,
        "maxLevel": 32,
        "rate": 24.6
      },
      {
        "method": "walk",
        "speciesId": 55,
        "dexId": 109,
        "speciesName": "KOFFING",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 136,
        "dexId": 89,
        "speciesName": "MUK",
        "minLevel": 39,
        "maxLevel": 39,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 143,
        "dexId": 110,
        "speciesName": "WEEZING",
        "minLevel": 37,
        "maxLevel": 37,
        "rate": 1.2
      }
    ],
    "215": [
      {
        "method": "walk",
        "speciesId": 13,
        "dexId": 88,
        "speciesName": "GRIMER",
        "minLevel": 31,
        "maxLevel": 35,
        "rate": 35.2
      },
      {
        "method": "walk",
        "speciesId": 82,
        "dexId": 37,
        "speciesName": "VULPIX",
        "minLevel": 33,
        "maxLevel": 33,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 163,
        "dexId": 77,
        "speciesName": "PONYTA",
        "minLevel": 32,
        "maxLevel": 36,
        "rate": 14.1
      },
      {
        "method": "walk",
        "speciesId": 51,
        "dexId": 126,
        "speciesName": "MAGMAR",
        "minLevel": 34,
        "maxLevel": 34,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 136,
        "dexId": 89,
        "speciesName": "MUK",
        "minLevel": 38,
        "maxLevel": 40,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 55,
        "dexId": 109,
        "speciesName": "KOFFING",
        "minLevel": 34,
        "maxLevel": 34,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 143,
        "dexId": 110,
        "speciesName": "WEEZING",
        "minLevel": 42,
        "maxLevel": 42,
        "rate": 1.2
      }
    ],
    "216": [
      {
        "method": "walk",
        "speciesId": 13,
        "dexId": 88,
        "speciesName": "GRIMER",
        "minLevel": 31,
        "maxLevel": 33,
        "rate": 49.6
      },
      {
        "method": "walk",
        "speciesId": 82,
        "dexId": 37,
        "speciesName": "VULPIX",
        "minLevel": 35,
        "maxLevel": 35,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 163,
        "dexId": 77,
        "speciesName": "PONYTA",
        "minLevel": 32,
        "maxLevel": 34,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 136,
        "dexId": 89,
        "speciesName": "MUK",
        "minLevel": 40,
        "maxLevel": 40,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 55,
        "dexId": 109,
        "speciesName": "KOFFING",
        "minLevel": 35,
        "maxLevel": 35,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 51,
        "dexId": 126,
        "speciesName": "MAGMAR",
        "minLevel": 38,
        "maxLevel": 38,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 143,
        "dexId": 110,
        "speciesName": "WEEZING",
        "minLevel": 42,
        "maxLevel": 42,
        "rate": 1.2
      }
    ],
    "217": [
      {
        "method": "walk",
        "speciesId": 15,
        "dexId": 29,
        "speciesName": "NIDORAN♀",
        "minLevel": 24,
        "maxLevel": 24,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 70,
        "dexId": 84,
        "speciesName": "DODUO",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 109,
        "dexId": 46,
        "speciesName": "PARAS",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 12,
        "dexId": 102,
        "speciesName": "EXEGGCUTE",
        "minLevel": 23,
        "maxLevel": 25,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 168,
        "dexId": 30,
        "speciesName": "NIDORINA",
        "minLevel": 33,
        "maxLevel": 33,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 3,
        "dexId": 32,
        "speciesName": "NIDORAN♂",
        "minLevel": 24,
        "maxLevel": 24,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 46,
        "dexId": 47,
        "speciesName": "PARASECT",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 2,
        "dexId": 115,
        "speciesName": "KANGASKHAN",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 29,
        "dexId": 127,
        "speciesName": "PINSIR",
        "minLevel": 28,
        "maxLevel": 28,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 88,
        "dexId": 147,
        "speciesName": "DRATINI",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "218": [
      {
        "method": "walk",
        "speciesId": 15,
        "dexId": 29,
        "speciesName": "NIDORAN♀",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 18,
        "dexId": 111,
        "speciesName": "RHYHORN",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 109,
        "dexId": 46,
        "speciesName": "PARAS",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 12,
        "dexId": 102,
        "speciesName": "EXEGGCUTE",
        "minLevel": 25,
        "maxLevel": 27,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 168,
        "dexId": 30,
        "speciesName": "NIDORINA",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 167,
        "dexId": 33,
        "speciesName": "NIDORINO",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 119,
        "dexId": 49,
        "speciesName": "VENOMOTH",
        "minLevel": 32,
        "maxLevel": 32,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 40,
        "dexId": 113,
        "speciesName": "CHANSEY",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 60,
        "dexId": 128,
        "speciesName": "TAUROS",
        "minLevel": 28,
        "maxLevel": 28,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 88,
        "dexId": 147,
        "speciesName": "DRATINI",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "219": [
      {
        "method": "walk",
        "speciesId": 15,
        "dexId": 29,
        "speciesName": "NIDORAN♀",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 70,
        "dexId": 84,
        "speciesName": "DODUO",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 12,
        "dexId": 102,
        "speciesName": "EXEGGCUTE",
        "minLevel": 24,
        "maxLevel": 26,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 168,
        "dexId": 30,
        "speciesName": "NIDORINA",
        "minLevel": 33,
        "maxLevel": 33,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 3,
        "dexId": 32,
        "speciesName": "NIDORAN♂",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 119,
        "dexId": 49,
        "speciesName": "VENOMOTH",
        "minLevel": 31,
        "maxLevel": 31,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 60,
        "dexId": 128,
        "speciesName": "TAUROS",
        "minLevel": 26,
        "maxLevel": 26,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 2,
        "dexId": 115,
        "speciesName": "KANGASKHAN",
        "minLevel": 28,
        "maxLevel": 28,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 88,
        "dexId": 147,
        "speciesName": "DRATINI",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "220": [
      {
        "method": "walk",
        "speciesId": 15,
        "dexId": 29,
        "speciesName": "NIDORAN♀",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 18,
        "dexId": 111,
        "speciesName": "RHYHORN",
        "minLevel": 25,
        "maxLevel": 25,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 65,
        "dexId": 48,
        "speciesName": "VENONAT",
        "minLevel": 22,
        "maxLevel": 22,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 12,
        "dexId": 102,
        "speciesName": "EXEGGCUTE",
        "minLevel": 24,
        "maxLevel": 25,
        "rate": 19.5
      },
      {
        "method": "walk",
        "speciesId": 168,
        "dexId": 30,
        "speciesName": "NIDORINA",
        "minLevel": 31,
        "maxLevel": 31,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 167,
        "dexId": 33,
        "speciesName": "NIDORINO",
        "minLevel": 31,
        "maxLevel": 31,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 46,
        "dexId": 47,
        "speciesName": "PARASECT",
        "minLevel": 30,
        "maxLevel": 30,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 29,
        "dexId": 127,
        "speciesName": "PINSIR",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 40,
        "dexId": 113,
        "speciesName": "CHANSEY",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 88,
        "dexId": 147,
        "speciesName": "DRATINI",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 78,
        "dexId": 98,
        "speciesName": "KRABBY",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 47,
        "dexId": 54,
        "speciesName": "PSYDUCK",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 37,
        "dexId": 79,
        "speciesName": "SLOWPOKE",
        "minLevel": 15,
        "maxLevel": 15,
        "rate": 25
      }
    ],
    "226": [
      {
        "method": "walk",
        "speciesId": 116,
        "dexId": 85,
        "speciesName": "DODRIO",
        "minLevel": 51,
        "maxLevel": 51,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 119,
        "dexId": 49,
        "speciesName": "VENOMOTH",
        "minLevel": 51,
        "maxLevel": 51,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 38,
        "dexId": 64,
        "speciesName": "KADABRA",
        "minLevel": 51,
        "maxLevel": 51,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 1,
        "dexId": 112,
        "speciesName": "RHYDON",
        "minLevel": 52,
        "maxLevel": 52,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 145,
        "dexId": 105,
        "speciesName": "MAROWAK",
        "minLevel": 52,
        "maxLevel": 52,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 141,
        "dexId": 101,
        "speciesName": "ELECTRODE",
        "minLevel": 52,
        "maxLevel": 52,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 40,
        "dexId": 113,
        "speciesName": "CHANSEY",
        "minLevel": 56,
        "maxLevel": 56,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 101,
        "dexId": 40,
        "speciesName": "WIGGLYTUFF",
        "minLevel": 54,
        "maxLevel": 54,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 55,
        "maxLevel": 60,
        "rate": 5.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 8,
        "dexId": 80,
        "speciesName": "SLOWBRO",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 158,
        "dexId": 119,
        "speciesName": "SEAKING",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 138,
        "dexId": 99,
        "speciesName": "KINGLER",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 93,
        "dexId": 117,
        "speciesName": "SEADRA",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      }
    ],
    "227": [
      {
        "method": "walk",
        "speciesId": 1,
        "dexId": 112,
        "speciesName": "RHYDON",
        "minLevel": 55,
        "maxLevel": 55,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 145,
        "dexId": 105,
        "speciesName": "MAROWAK",
        "minLevel": 55,
        "maxLevel": 55,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 141,
        "dexId": 101,
        "speciesName": "ELECTRODE",
        "minLevel": 55,
        "maxLevel": 55,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 40,
        "dexId": 113,
        "speciesName": "CHANSEY",
        "minLevel": 64,
        "maxLevel": 64,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 46,
        "dexId": 47,
        "speciesName": "PARASECT",
        "minLevel": 64,
        "maxLevel": 64,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 85,
        "dexId": 26,
        "speciesName": "RAICHU",
        "minLevel": 64,
        "maxLevel": 64,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 97,
        "dexId": 28,
        "speciesName": "SANDSLASH",
        "minLevel": 57,
        "maxLevel": 57,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 63,
        "maxLevel": 67,
        "rate": 10.5
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 8,
        "dexId": 80,
        "speciesName": "SLOWBRO",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 158,
        "dexId": 119,
        "speciesName": "SEAKING",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 138,
        "dexId": 99,
        "speciesName": "KINGLER",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 93,
        "dexId": 117,
        "speciesName": "SEADRA",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      }
    ],
    "228": [
      {
        "method": "walk",
        "speciesId": 130,
        "dexId": 42,
        "speciesName": "GOLBAT",
        "minLevel": 46,
        "maxLevel": 46,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 129,
        "dexId": 97,
        "speciesName": "HYPNO",
        "minLevel": 46,
        "maxLevel": 46,
        "rate": 19.9
      },
      {
        "method": "walk",
        "speciesId": 54,
        "dexId": 82,
        "speciesName": "MAGNETON",
        "minLevel": 46,
        "maxLevel": 46,
        "rate": 15.2
      },
      {
        "method": "walk",
        "speciesId": 116,
        "dexId": 85,
        "speciesName": "DODRIO",
        "minLevel": 49,
        "maxLevel": 49,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 119,
        "dexId": 49,
        "speciesName": "VENOMOTH",
        "minLevel": 49,
        "maxLevel": 49,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 97,
        "dexId": 28,
        "speciesName": "SANDSLASH",
        "minLevel": 52,
        "maxLevel": 52,
        "rate": 9.8
      },
      {
        "method": "walk",
        "speciesId": 38,
        "dexId": 64,
        "speciesName": "KADABRA",
        "minLevel": 49,
        "maxLevel": 49,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 46,
        "dexId": 47,
        "speciesName": "PARASECT",
        "minLevel": 52,
        "maxLevel": 52,
        "rate": 5.1
      },
      {
        "method": "walk",
        "speciesId": 85,
        "dexId": 26,
        "speciesName": "RAICHU",
        "minLevel": 53,
        "maxLevel": 53,
        "rate": 4.3
      },
      {
        "method": "walk",
        "speciesId": 76,
        "dexId": 132,
        "speciesName": "DITTO",
        "minLevel": 53,
        "maxLevel": 53,
        "rate": 1.2
      },
      {
        "method": "old-rod",
        "speciesId": 133,
        "dexId": 129,
        "speciesName": "MAGIKARP",
        "minLevel": 5,
        "maxLevel": 5,
        "rate": 100
      },
      {
        "method": "good-rod",
        "speciesId": 157,
        "dexId": 118,
        "speciesName": "GOLDEEN",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "good-rod",
        "speciesId": 71,
        "dexId": 60,
        "speciesName": "POLIWAG",
        "minLevel": 10,
        "maxLevel": 10,
        "rate": 50
      },
      {
        "method": "super-rod",
        "speciesId": 8,
        "dexId": 80,
        "speciesName": "SLOWBRO",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 158,
        "dexId": 119,
        "speciesName": "SEAKING",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 138,
        "dexId": 99,
        "speciesName": "KINGLER",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      },
      {
        "method": "super-rod",
        "speciesId": 93,
        "dexId": 117,
        "speciesName": "SEADRA",
        "minLevel": 23,
        "maxLevel": 23,
        "rate": 25
      }
    ],
    "232": [
      {
        "method": "walk",
        "speciesId": 107,
        "dexId": 41,
        "speciesName": "ZUBAT",
        "minLevel": 16,
        "maxLevel": 18,
        "rate": 49.6
      },
      {
        "method": "walk",
        "speciesId": 169,
        "dexId": 74,
        "speciesName": "GEODUDE",
        "minLevel": 16,
        "maxLevel": 18,
        "rate": 26.2
      },
      {
        "method": "walk",
        "speciesId": 106,
        "dexId": 66,
        "speciesName": "MACHOP",
        "minLevel": 15,
        "maxLevel": 17,
        "rate": 14.8
      },
      {
        "method": "walk",
        "speciesId": 34,
        "dexId": 95,
        "speciesName": "ONIX",
        "minLevel": 13,
        "maxLevel": 17,
        "rate": 9.4
      }
    ]
  }
};

export const GEN1_AREA_ENCOUNTERS: Record<number, Gen1AreaEncounter[]> = GEN1_AREA_ENCOUNTERS_BY_VERSION.red;
