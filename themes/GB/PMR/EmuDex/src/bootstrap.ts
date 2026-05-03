import { registerTheme } from "@emulnk/sdk";
import { bagTransform, battleTransform, partyTransform, progressTransform, safariTransform } from "@emulnk/sdk/transforms/gen1";
import type { Gen1BagState, Gen1BattleState, Gen1Pokemon, Gen1ProgressState, Gen1SafariState } from "@emulnk/sdk/transforms/gen1";
import { mount } from "svelte";
import App from "./App.svelte";
import type { Gen1GameVersion } from "./lib/encounter-data.generated.js";
import { appState, emptyBag, emptyBattle, emptyProgress, emptySafari } from "./lib/state.svelte.js";
import "./style.scss";

interface PMRValues {
  [key: string]: unknown;
  party_count?: number;
  party?: Array<Gen1Pokemon | null>;
  bag?: Gen1BagState;
  battle?: Gen1BattleState;
  progress?: Gen1ProgressState;
  safari?: Gen1SafariState;
}

function emptyPartySlots(): Array<Gen1Pokemon | null> {
  return [null, null, null, null, null, null];
}

export function startGen1EmuDex(gameVersion: Gen1GameVersion = "red"): void {
  appState.gameVersion = gameVersion;
  document.documentElement.classList.toggle("theme-pokemon-blue", gameVersion === "blue");

  mount(App, { target: document.getElementById("app")! });

  registerTheme<PMRValues>({
    transforms: [partyTransform, battleTransform, bagTransform, progressTransform, safariTransform],
    onUpdate({ isConnected, values, settings }) {
      appState.isConnected = isConnected;
      appState.settings = settings;
      appState.gameVersion = gameVersion;

      if (!isConnected) {
        appState.party = emptyPartySlots();
        appState.battle = emptyBattle;
        appState.bag = emptyBag;
        appState.progress = emptyProgress;
        appState.safari = emptySafari;
        return;
      }

      appState.party = values.party ? [...values.party] : emptyPartySlots();
      appState.battle = values.battle ?? emptyBattle;
      appState.bag = values.bag ?? emptyBag;
      appState.progress = values.progress ?? emptyProgress;
      appState.safari = values.safari ?? emptySafari;
    },
  });
}
