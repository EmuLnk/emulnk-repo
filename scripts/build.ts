import { build, type InlineConfig, type PluginOption } from "vite";
import { glob } from "glob";
import path from "path";
import fs from "fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const CACHE_PATH = path.join(ROOT, ".build-cache.json");

// Parse --theme and --force flags
const themeFilter = (() => {
  const idx = process.argv.indexOf("--theme");
  return idx !== -1 ? process.argv[idx + 1] : null;
})();

const forceRebuild = process.argv.includes("--force");

// Discover all themes with vite.theme.json
const markers = await glob("{themes,starters}/**/vite.theme.json", { cwd: ROOT });

if (markers.length === 0) {
  console.log("No TS themes found (no vite.theme.json files).");
  process.exit(0);
}

// Mtime-based incremental cache helpers
function maxMtimeMs(dir: string): number {
  let max = 0;
  if (!fs.existsSync(dir)) return 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === "dist") continue;
    const full = path.join(dir, e.name);
    max = Math.max(max, e.isDirectory() ? maxMtimeMs(full) : fs.statSync(full).mtimeMs);
  }
  return max;
}

const sdkMtime = maxMtimeMs(path.join(ROOT, "sdk"));

let cache: Record<string, string> = {};
try {
  cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
} catch {
  // No cache yet, build everything.
}

// Pre-load framework plugins once
const frameworkPlugins = new Map<string, () => PluginOption[]>();

const { svelte } = await import("@sveltejs/vite-plugin-svelte");
frameworkPlugins.set("svelte", () => [svelte()]);

const solidPlugin = await import("vite-plugin-solid");
frameworkPlugins.set("solid", () => [solidPlugin.default()]);

let built = 0;
let skipped = 0;
let failed = 0;

for (const marker of markers) {
  const themeDir = path.join(ROOT, path.dirname(marker));
  const themeName = path.basename(themeDir);

  if (themeFilter && themeName !== themeFilter) continue;

  // Incremental skip check
  const cacheKey = `${maxMtimeMs(themeDir)}-${sdkMtime}`;
  if (!forceRebuild && cache[themeName] === cacheKey) {
    console.log(`\n  ↷ ${themeName} (up-to-date)`);
    skipped++;
    continue;
  }

  const config = JSON.parse(fs.readFileSync(path.join(ROOT, marker), "utf8"));
  const entry = config.entry || "src/index.html";

  console.log(`\nBuilding ${themeName}...`);

  const pluginFactory = frameworkPlugins.get(config.framework);
  const plugins: PluginOption[] = pluginFactory ? pluginFactory() : [];

  const viteConfig: InlineConfig = {
    root: themeDir,
    base: "./",
    plugins,
    build: {
      sourcemap: "hidden",
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        input: path.join(themeDir, entry),
        output: {
          entryFileNames: "assets/app.js",
          chunkFileNames: "assets/[name].js",
          assetFileNames: "assets/[name][extname]",
          sourcemapPathTransform: (relPath: string) => {
            // Flatten deep ../../ paths so Chrome DevTools shows clean names.
            // "../../src/App.svelte" → "src/App.svelte"
            // "../../../../../../sdk/bridge.ts" → "sdk/bridge.ts"
            const cleaned = relPath.replace(/^(\.\.\/)+/, "");
            // Strip node_modules internals to just package + file
            const nm = cleaned.indexOf("node_modules/");
            if (nm !== -1) return cleaned.slice(nm);
            return cleaned;
          },
        },
      },
    },
    resolve: {
      alias: {
        "@emulink/sdk": path.join(ROOT, "sdk"),
      },
    },
    logLevel: "warn",
  };

  try {
    await build(viteConfig);
    cache[themeName] = cacheKey;
    built++;
    console.log(`  ✓ ${themeName}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${themeName}: ${err}`);
  }
}

// Persist cache
try {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n");
} catch {
  // Non-fatal: cache write failure doesn't break the build.
}

if (themeFilter && built === 0 && skipped === 0 && failed === 0) {
  console.error(`Theme "${themeFilter}" not found.`);
  process.exit(1);
}

const parts = [`${built} succeeded`, `${skipped} skipped`, `${failed} failed`];
console.log(`\nBuild complete: ${parts.join(", ")}.`);
if (failed > 0) process.exit(1);
