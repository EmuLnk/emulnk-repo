interface GameData {
  party_count: number;
  [key: string]: unknown;
}

export const appState = $state({
  isConnected: false,
  values: {} as GameData,
  settings: {} as Record<string, string>,
  batteryLevel: 0,
  confidence: null as string | null,
});
