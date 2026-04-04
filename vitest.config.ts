import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["sdk/**/*.test.ts"],
  },
  resolve: {
    alias: { "@emulink/sdk": path.resolve(import.meta.dirname, "sdk") },
  },
});
