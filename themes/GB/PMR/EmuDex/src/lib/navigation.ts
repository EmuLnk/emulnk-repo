export type ViewMode = "party" | "battle" | "catching" | "safari" | "dex" | "nuz";
export type NavSound = "battleIn" | "battleOut" | null;
export type WipeState = "idle" | "closing" | "opening";
export type ScreenWipeDirection = "left" | "right";

export interface VisibleTabState {
  battleActive: boolean;
  isSafariBattle?: boolean;
  catchable?: boolean;
  safariActive: boolean;
  nuzlockeEnabled: boolean;
}

export interface BattleTransitionState {
  activeTab: ViewMode;
  previousStableTab: ViewMode;
  wasBattleActive: boolean;
  battleActive: boolean;
  isSafariBattle: boolean;
  visibleTabs?: readonly ViewMode[];
  defaultTab?: ViewMode;
}

export interface BattleTransitionResult {
  activeTab: ViewMode;
  previousStableTab: ViewMode;
  sound: NavSound;
}

export interface NavigationFrameState {
  activeTab: ViewMode;
  previousStableTab: ViewMode;
  lastBattleActive: boolean;
  initialized: boolean;
}

export interface NavigationFrameInput {
  isConnected: boolean;
  defaultTab: ViewMode;
  visibleTabs: readonly ViewMode[];
  battleActive: boolean;
  isSafariBattle: boolean;
}

export interface NavigationFrameResult extends NavigationFrameState {
  sound: NavSound;
}

export interface BattleWipeTransitionState {
  activeTab: ViewMode;
  preBattleTab: ViewMode;
  battleWipeShown: boolean;
  battleActive: boolean;
  isSafariBattle: boolean;
  catchable?: boolean;
  wipeIdle?: boolean;
  defaultTab: ViewMode;
}

export interface BattleWipeTransitionResult {
  battleWipeShown: boolean;
  preBattleTab: ViewMode;
  wipeTarget: ViewMode | null;
  wipeState: WipeState | null;
  sound: NavSound;
}

const STABLE_TABS = new Set<ViewMode>(["party", "dex", "safari", "nuz"]);
const BATTLE_TABS = new Set<ViewMode>(["battle", "catching"]);
const SWIPE_THRESHOLD_PX = 55;
const SWIPE_AXIS_RATIO = 1.25;

export function getVisibleTabs(state: VisibleTabState): ViewMode[] {
  const tabs: ViewMode[] = ["party"];

  if (state.battleActive && !state.isSafariBattle) tabs.push("battle");
  if (state.battleActive && state.isSafariBattle && state.catchable) tabs.push("catching");
  if (state.safariActive || (state.battleActive && state.isSafariBattle)) tabs.push("safari");

  tabs.push("dex");

  if (state.nuzlockeEnabled) tabs.push("nuz");

  return tabs;
}

export function resolveInvalidTab(activeTab: ViewMode, visibleTabs: readonly ViewMode[], preferredFallback: ViewMode): ViewMode {
  if (visibleTabs.includes(activeTab)) return activeTab;
  if (visibleTabs.includes(preferredFallback)) return preferredFallback;
  return visibleTabs[0] ?? "party";
}

export function resolveTabWipeDirection(
  fromTab: ViewMode,
  toTab: ViewMode,
  visibleTabs: readonly ViewMode[],
): ScreenWipeDirection {
  const fromIndex = visibleTabs.indexOf(fromTab);
  const toIndex = visibleTabs.indexOf(toTab);
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return "right";
  return toIndex > fromIndex ? "left" : "right";
}

export function resolveSwipeTab(
  activeTab: ViewMode,
  visibleTabs: readonly ViewMode[],
  deltaX: number,
  deltaY: number,
): ViewMode | null {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);
  if (absX < SWIPE_THRESHOLD_PX || absX < absY * SWIPE_AXIS_RATIO) return null;

  const index = visibleTabs.indexOf(activeTab);
  if (index < 0) return null;

  const nextIndex = deltaX < 0 ? index + 1 : index - 1;
  return visibleTabs[nextIndex] ?? null;
}

export function resolveBattleTransition(state: BattleTransitionState): BattleTransitionResult {
  const preferredBattleTab: ViewMode = state.isSafariBattle ? "catching" : "battle";
  if (!state.wasBattleActive && state.battleActive) {
    return {
      activeTab: preferredBattleTab,
      previousStableTab: STABLE_TABS.has(state.activeTab) ? state.activeTab : state.previousStableTab,
      sound: "battleIn",
    };
  }

  if (state.wasBattleActive && !state.battleActive) {
    const visibleTabs = state.visibleTabs ?? ["party", "dex"];
    const fallback = BATTLE_TABS.has(state.activeTab)
      ? resolveInvalidTab(state.defaultTab ?? "party", visibleTabs, "party")
      : resolveInvalidTab(state.activeTab, visibleTabs, state.defaultTab ?? "party");
    return {
      activeTab: fallback,
      previousStableTab: fallback,
      sound: "battleOut",
    };
  }

  return {
    activeTab: state.activeTab,
    previousStableTab: STABLE_TABS.has(state.activeTab) ? state.activeTab : state.previousStableTab,
    sound: null,
  };
}

export function resolveBattleWipeTransition(state: BattleWipeTransitionState): BattleWipeTransitionResult {
  if (state.battleActive && !state.battleWipeShown) {
    const wipeTarget: ViewMode = !state.isSafariBattle
      ? "battle"
      : state.catchable ? "catching" : "safari";

    return {
      battleWipeShown: true,
      preBattleTab: state.activeTab,
      wipeTarget,
      wipeState: "closing",
      sound: "battleIn",
    };
  }

  if (
    state.battleActive
    && state.battleWipeShown
    && state.isSafariBattle
    && state.catchable
    && state.activeTab === "safari"
    && (state.wipeIdle ?? true)
  ) {
    return {
      battleWipeShown: state.battleWipeShown,
      preBattleTab: state.preBattleTab,
      wipeTarget: "catching",
      wipeState: "closing",
      sound: null,
    };
  }

  if (!state.battleActive && state.battleWipeShown) {
    if (state.activeTab === "battle") {
      return {
        battleWipeShown: false,
        preBattleTab: state.preBattleTab,
        wipeTarget: state.defaultTab,
        wipeState: "closing",
        sound: "battleOut",
      };
    }

    if (state.activeTab === "catching") {
      return {
        battleWipeShown: false,
        preBattleTab: state.preBattleTab,
        wipeTarget: state.preBattleTab === "catching" ? "safari" : state.preBattleTab,
        wipeState: "closing",
        sound: "battleOut",
      };
    }

    return {
      battleWipeShown: false,
      preBattleTab: state.preBattleTab,
      wipeTarget: null,
      wipeState: null,
      sound: "battleOut",
    };
  }

  return {
    battleWipeShown: state.battleWipeShown,
    preBattleTab: state.preBattleTab,
    wipeTarget: null,
    wipeState: null,
    sound: null,
  };
}

export function resolveNavigationFrame(state: NavigationFrameState, input: NavigationFrameInput): NavigationFrameResult {
  if (!input.isConnected) {
    return {
      activeTab: "party",
      previousStableTab: "party",
      lastBattleActive: false,
      initialized: false,
      sound: null,
    };
  }

  let activeTab = state.activeTab;
  let previousStableTab = state.previousStableTab;
  let lastBattleActive = state.lastBattleActive;

  if (!state.initialized) {
    activeTab = resolveInvalidTab(input.defaultTab, input.visibleTabs, "party");
    previousStableTab = activeTab;
    lastBattleActive = false;
  }

  const transition = resolveBattleTransition({
    activeTab,
    previousStableTab,
    wasBattleActive: lastBattleActive,
    battleActive: input.battleActive,
    isSafariBattle: input.isSafariBattle,
    visibleTabs: input.visibleTabs,
    defaultTab: input.defaultTab,
  });

  activeTab = transition.activeTab;
  previousStableTab = transition.previousStableTab;

  const corrected = resolveInvalidTab(activeTab, input.visibleTabs, input.defaultTab);
  activeTab = corrected;
  if (STABLE_TABS.has(activeTab)) previousStableTab = activeTab;

  return {
    activeTab,
    previousStableTab,
    lastBattleActive: input.battleActive,
    initialized: true,
    sound: transition.sound,
  };
}
