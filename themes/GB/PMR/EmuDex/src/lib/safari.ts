import type { Gen1BattleState, Gen1ProgressState, Gen1SafariState } from "@emulnk/sdk/transforms/gen1";
import {
  getAreaEncounters,
  listSafariEncounterAreas,
  mapNameForId,
  type AreaDexStatus,
  type EncounterAreaSummary,
} from "./dex.js";
import type { Gen1AreaEncounter, Gen1EncounterMethod, Gen1GameVersion } from "./encounter-data.generated.js";
import type { CatchOption } from "./catch.js";

export type SafariMood = "neutral" | "baited" | "angry";
export type SafariDecisionAction = "ball" | "bait" | "rock" | "exit" | "wait" | "none";
export type SafariDecisionTone = "good" | "warn" | "bad" | "neutral";

export interface SafariAreaSpot {
  dexId: number;
  speciesName: string;
  status: AreaDexStatus;
  methods: Gen1EncounterMethod[];
  minLevel: number;
  maxLevel: number;
  bestRate: number;
  rare: boolean;
}

export interface SafariOverviewModel {
  active: boolean;
  inSafariArea: boolean;
  inSafariBattle: boolean;
  mapId: number;
  mapName: string;
  areas: EncounterAreaSummary[];
  spots: SafariAreaSpot[];
  rareTargets: SafariAreaSpot[];
  caughtCount: number;
  seenCount: number;
  totalCount: number;
  balls: number;
  steps: number;
  lowBalls: boolean;
  lowSteps: boolean;
  mood: SafariMood;
  targetName: string | null;
}

export interface SafariDecisionCard {
  action: Exclude<SafariDecisionAction, "exit" | "wait" | "none">;
  label: string;
  tone: SafariDecisionTone;
  disabled: boolean;
  value: string;
  note: string;
}

export interface SafariDecision {
  action: SafariDecisionAction;
  label: string;
  tone: SafariDecisionTone;
  reason: string;
  cards: SafariDecisionCard[];
}

interface BuildSafariOverviewInput {
  progress: Gen1ProgressState;
  safari: Pick<Gen1SafariState, "active" | "balls" | "steps" | "baitFactor" | "escapeFactor">;
  battle: Pick<Gen1BattleState, "active" | "isSafari" | "enemy">;
  version: Gen1GameVersion;
  selectedMap?: number;
}

interface BuildSafariDecisionInput {
  safari: Pick<Gen1SafariState, "active" | "balls" | "steps" | "baitFactor" | "escapeFactor">;
  battle: Pick<Gen1BattleState, "active" | "isSafari" | "enemy" | "catch">;
  catchOptions: CatchOption[];
}

const RARE_RATE = 10;
const LOW_BALLS = 5;
const LOW_STEPS = 50;
const METHOD_ORDER: Gen1EncounterMethod[] = ["walk", "surf", "old-rod", "good-rod", "super-rod"];

function safariMood(safari: Pick<Gen1SafariState, "baitFactor" | "escapeFactor">): SafariMood {
  if (safari.baitFactor > 0) return "baited";
  if (safari.escapeFactor > 0) return "angry";
  return "neutral";
}

function statusForDexId(dexId: number, owned: Set<number>, seen: Set<number>): AreaDexStatus {
  if (owned.has(dexId)) return "caught";
  if (seen.has(dexId)) return "seen";
  return "unseen";
}

function pickSafariMap(
  progress: Gen1ProgressState,
  areas: EncounterAreaSummary[],
  selectedMap?: number,
): EncounterAreaSummary | null {
  if (selectedMap != null) {
    const selected = areas.find((area) => area.mapId === selectedMap);
    if (selected) return selected;
  }

  return areas.find((area) => area.mapId === progress.currentMap) ?? areas[0] ?? null;
}

function buildSpots(
  encounters: Gen1AreaEncounter[],
  owned: Set<number>,
  seen: Set<number>,
): SafariAreaSpot[] {
  const grouped = new Map<number, {
    dexId: number;
    speciesName: string;
    methods: Set<Gen1EncounterMethod>;
    minLevel: number;
    maxLevel: number;
    bestRate: number;
  }>();

  for (const encounter of encounters) {
    const current = grouped.get(encounter.dexId);
    if (current) {
      current.methods.add(encounter.method);
      current.minLevel = Math.min(current.minLevel, encounter.minLevel);
      current.maxLevel = Math.max(current.maxLevel, encounter.maxLevel);
      current.bestRate = Math.max(current.bestRate, encounter.rate);
    } else {
      grouped.set(encounter.dexId, {
        dexId: encounter.dexId,
        speciesName: encounter.speciesName,
        methods: new Set([encounter.method]),
        minLevel: encounter.minLevel,
        maxLevel: encounter.maxLevel,
        bestRate: encounter.rate,
      });
    }
  }

  return [...grouped.values()]
    .map((spot): SafariAreaSpot => ({
      dexId: spot.dexId,
      speciesName: spot.speciesName,
      status: statusForDexId(spot.dexId, owned, seen),
      methods: METHOD_ORDER.filter((method) => spot.methods.has(method)),
      minLevel: spot.minLevel,
      maxLevel: spot.maxLevel,
      bestRate: spot.bestRate,
      rare: spot.bestRate <= RARE_RATE,
    }))
    .sort((a, b) => b.bestRate - a.bestRate || a.dexId - b.dexId);
}

function decisionCards(catchOptions: CatchOption[], safari: Pick<Gen1SafariState, "balls" | "baitFactor" | "escapeFactor">): SafariDecisionCard[] {
  const ball = catchOptions.find((option) => option.key === "safari");
  return [
    {
      action: "ball",
      label: "BALL",
      tone: ball ? "good" : "bad",
      disabled: !ball,
      value: ball ? `${ball.odds.percent}%` : "0",
      note: ball ? `${ball.quantity} LEFT` : "NO BALLS",
    },
    {
      action: "bait",
      label: "BAIT",
      tone: safari.baitFactor > 0 ? "good" : "neutral",
      disabled: false,
      value: safari.baitFactor > 0 ? `${safari.baitFactor}` : "--",
      note: "RUN DOWN / CATCH DOWN",
    },
    {
      action: "rock",
      label: "ROCK",
      tone: safari.escapeFactor > 0 ? "warn" : "neutral",
      disabled: false,
      value: safari.escapeFactor > 0 ? `${safari.escapeFactor}` : "--",
      note: "CATCH UP / RUN UP",
    },
  ];
}

export function buildSafariOverview({
  progress,
  safari,
  battle,
  version,
  selectedMap,
}: BuildSafariOverviewInput): SafariOverviewModel {
  const areas = listSafariEncounterAreas(version, progress);
  const area = pickSafariMap(progress, areas, selectedMap);
  const mapId = area?.mapId ?? progress.currentMap;
  const owned = new Set(progress.owned);
  const seen = new Set(progress.seen);
  const spots = area ? buildSpots(getAreaEncounters(mapId, version), owned, seen) : [];
  const rareTargets = spots
    .filter((spot) => spot.rare)
    .sort((a, b) => a.bestRate - b.bestRate || a.dexId - b.dexId);

  return {
    active: safari.active || (battle.active && battle.isSafari),
    inSafariArea: !!area && area.mapId === progress.currentMap,
    inSafariBattle: battle.active && battle.isSafari,
    mapId,
    mapName: area?.mapName ?? mapNameForId(mapId),
    areas,
    spots,
    rareTargets,
    caughtCount: area?.caughtCount ?? 0,
    seenCount: area?.seenCount ?? 0,
    totalCount: area?.totalCount ?? 0,
    balls: safari.balls,
    steps: safari.steps,
    lowBalls: safari.balls > 0 && safari.balls <= LOW_BALLS,
    lowSteps: safari.steps > 0 && safari.steps <= LOW_STEPS,
    mood: safariMood(safari),
    targetName: battle.active && battle.isSafari ? battle.enemy?.speciesName ?? null : null,
  };
}

export function buildSafariDecision({ safari, battle, catchOptions }: BuildSafariDecisionInput): SafariDecision {
  const cards = decisionCards(catchOptions, safari);

  if (safari.steps > 0 && safari.steps <= LOW_STEPS && !battle.active) {
    return {
      action: "exit",
      label: "EXIT SOON",
      tone: "warn",
      reason: "LOW STEPS",
      cards,
    };
  }

  if (!battle.active || !battle.isSafari || !battle.enemy) {
    return {
      action: "wait",
      label: "WATCH",
      tone: "neutral",
      reason: "NO SAFARI TARGET",
      cards,
    };
  }

  if (safari.balls <= 0 || catchOptions.length === 0) {
    return {
      action: "none",
      label: "NO BALLS",
      tone: "bad",
      reason: "SAFARI BALLS EMPTY",
      cards,
    };
  }

  if (safari.steps > 0 && safari.steps <= LOW_STEPS) {
    return {
      action: "ball",
      label: "BALL",
      tone: "warn",
      reason: "LOW STEPS",
      cards,
    };
  }

  if (safari.escapeFactor > 0) {
    return {
      action: "ball",
      label: "BALL",
      tone: "warn",
      reason: "ANGRY TARGET",
      cards,
    };
  }

  return {
    action: "ball",
    label: "BALL",
    tone: "good",
    reason: safari.baitFactor > 0 ? "BAIT ACTIVE" : "BEST SAFE ACTION",
    cards,
  };
}
