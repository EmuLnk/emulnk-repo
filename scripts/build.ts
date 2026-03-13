import { build, type InlineConfig, type PluginOption } from "vite";
import { glob } from "glob";
import path from "path";
import fs from "fs";

const ROOT = path.resolve(import.meta.dirname, "..");

// Parse --theme flag
const themeFilter = (() => {
  const idx = process.argv.indexOf("--theme");
  return idx !== -1 ? process.argv[idx + 1] : null;
})();

// Discover all themes with vite.theme.json
const markers = await glob("{themes,starters}/**/vite.theme.json", { cwd: ROOT });

if (markers.length === 0) {
  console.log("No TS themes found (no vite.theme.json files).");
  process.exit(0);
}

// Pre-load framework plugins once
const frameworkPlugins = new Map<string, () => PluginOption[]>();

const { svelte } = await import("@sveltejs/vite-plugin-svelte");
frameworkPlugins.set("svelte", () => [svelte()]);

const solidPlugin = await import("vite-plugin-solid");
frameworkPlugins.set("solid", () => [solidPlugin.default()]);

let built = 0;
let failed = 0;

for (const marker of markers) {
  const themeDir = path.join(ROOT, path.dirname(marker));
  const themeName = path.basename(themeDir);

  if (themeFilter && themeName !== themeFilter) continue;

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
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        input: path.join(themeDir, entry),
        output: {
          entryFileNames: "assets/app.js",
          chunkFileNames: "assets/[name].js",
          assetFileNames: "assets/[name][extname]",
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
    built++;
    console.log(`  ✓ ${themeName}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${themeName}: ${err}`);
  }
}

if (themeFilter && built === 0 && failed === 0) {
  console.error(`Theme "${themeFilter}" not found.`);
  process.exit(1);
}

console.log(`\nBuild complete: ${built} succeeded, ${failed} failed.`);
if (failed > 0) process.exit(1);
