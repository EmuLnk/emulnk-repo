interface GameData {
  gameTitle: string;
  [key: string]: unknown;
}

export const appState = $state({
  isConnected: false,
  values: {} as GameData,
  settings: {} as Record<string, string>,
});
