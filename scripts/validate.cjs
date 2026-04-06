#!/usr/bin/env node

/**
 * CI validation script for emulnk-repo.
 * Checks consistency between folder structure, theme.json files, and index.json.
 * Also runs security scan, framework scan, and bundle size checks.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const THEMES_DIR = path.join(ROOT, "themes");
const INDEX_PATH = path.join(ROOT, "index.json");
const CONSOLES_PATH = path.join(ROOT, "consoles.json");
const PROFILES_DIR = path.join(ROOT, "profiles");

// Allowed theme tags. Each tag enables specific app-side UI treatment:
//   stats      : numeric stat values (HP, levels, resources)
//   battle     : active during combat / battle screens
//   minimap    : spatial map or position indicator
//   navigation : directional overlays, compass, heading
//   radar      : entity radar / proximity detection
//   tracker    : item/objective/room tracker
//   party      : party/team member display
//   types      : type matchup or type badge display
//   combat     : generic combat overlay (damage, aggro, status)
//   moves      : move list or move effectiveness
const ALLOWED_TAGS = new Set([
  "stats",
  "battle",
  "minimap",
  "navigation",
  "radar",
  "tracker",
  "party",
  "types",
  "combat",
  "moves",
]);

module.exports = { ALLOWED_TAGS };

// Templates/starters are excluded from index.json orphan checks
const EXCLUDED_THEME_IDS = new Set(["_starter"]);
const STARTERS_DIR = path.join(ROOT, "starters");

// Bundle size limits
const BUNDLE_SIZE_LIMIT = 500 * 1024;
const BUNDLE_SIZE_WARN = 400 * 1024;

// --- Security: banned patterns ---
const BANNED_NETWORK = [
  /\bfetch\s*\(/,
  /\bXMLHttpRequest\b/,
  /\bnew\s+WebSocket\b/,
  /\bnew\s+EventSource\b/,
  /\bnavigator\.sendBeacon\b/,
];
const BANNED_EVAL = [
  /\beval\s*\(/,
  /\bdocument\.write\s*\(/,
  /\bsetTimeout\s*\(\s*["'`]/,
  /\bsetInterval\s*\(\s*["'`]/,
];
const BANNED_STORAGE = [
  /\blocalStorage\b/,
  /\bsessionStorage\b/,
  /\bIndexedDB\b/,
  /\bindexedDB\b/,
  /\bdocument\.cookie\b/,
];
const BANNED_EXTERNAL = [
  /src\s*=\s*["']https?:\/\//i,
  /href\s*=\s*["']https?:\/\//i,
];

// --- Framework: banned VDOM imports ---
const BANNED_FRAMEWORKS = [
  /\bfrom\s+["']react["']/,
  /\bfrom\s+["']react-dom["']/,
  /\brequire\s*\(\s*["']react["']\s*\)/,
  /\bfrom\s+["']vue["']/,
  /\bfrom\s+["']@angular\//,
  /\bfrom\s+["']preact["']/,
  /\bfrom\s+["']preact\/["']/,
];
// Exception: @preact/signals is allowed (no VDOM)
const FRAMEWORK_EXCEPTIONS = [
  /\bfrom\s+["']@preact\/signals["']/,
  /\bfrom\s+["']@preact\/signals-core["']/,
];

const ESCAPE_HATCH = /\/\/\s*emulnk-allow:/;

function collectFiles(dir, extensions) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      results.push(...collectFiles(full, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

function scanFile(filePath, patterns, category, errors, exceptions = []) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const relFile = path.relative(ROOT, filePath);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (ESCAPE_HATCH.test(line)) continue;

    for (const pattern of patterns) {
      if (exceptions.some((exc) => exc.test(line))) continue;
      if (pattern.test(line)) {
        console.error(`ERROR: [${category}] ${relFile}:${i + 1}: matches ${pattern}`);
        errors.count++;
      }
    }
  }
}

function runValidation() {
  let errors = 0;

  function error(msg) {
    console.error(`ERROR: ${msg}`);
    errors++;
  }

  function warn(msg) {
    console.warn(`WARN:  ${msg}`);
  }

  let consoles;
  try {
    consoles = JSON.parse(fs.readFileSync(CONSOLES_PATH, "utf8"));
  } catch (e) {
    console.error(`FATAL: Failed to parse consoles.json: ${e.message}`);
    process.exit(1);
  }
  const validConsoleCodes = new Set(consoles.map((c) => c.console));

  const profileFiles = fs
    .readdirSync(PROFILES_DIR)
    .filter((f) => f.endsWith(".json") && !f.endsWith(".mock.json"));
  const validProfileIds = new Set(profileFiles.map((f) => f.replace(".json", "")));

  let index;
  try {
    index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
  } catch (e) {
    console.error(`FATAL: Failed to parse index.json: ${e.message}`);
    process.exit(1);
  }

  const indexThemeIds = new Set();
  const indexThemeMap = new Map(); // id -> { console, profileId }

  for (const game of index.games) {
    for (const theme of game.themes) {
      indexThemeIds.add(theme.id);
      indexThemeMap.set(theme.id, {
        console: game.console,
        profileId: game.profileId,
      });
    }
  }

  const folderThemeIds = new Set();
  const themePaths = [];

  const consoleDirs = fs
    .readdirSync(THEMES_DIR)
    .filter((d) => {
      const full = path.join(THEMES_DIR, d);
      return fs.statSync(full).isDirectory() && !EXCLUDED_THEME_IDS.has(d);
    });

  for (const consoleDir of consoleDirs) {
    if (!validConsoleCodes.has(consoleDir)) {
      error(`Invalid console directory: themes/${consoleDir} (not in consoles.json)`);
    }

    const consolePath = path.join(THEMES_DIR, consoleDir);
    const profileDirs = fs
      .readdirSync(consolePath)
      .filter((d) => fs.statSync(path.join(consolePath, d)).isDirectory());

    for (const profileDir of profileDirs) {
      if (!validProfileIds.has(profileDir)) {
        error(
          `Invalid profile directory: themes/${consoleDir}/${profileDir} (no matching profiles/${profileDir}.json)`
        );
      }

      const profilePath = path.join(consolePath, profileDir);
      const themeDirs = fs
        .readdirSync(profilePath)
        .filter(
          (d) =>
            d !== "widgets" &&
            fs.statSync(path.join(profilePath, d)).isDirectory()
        );

      for (const themeDir of themeDirs) {
        const themePath = path.join(profilePath, themeDir);
        const themeJsonPath = path.join(themePath, "theme.json");
        const relPath = `themes/${consoleDir}/${profileDir}/${themeDir}`;

        folderThemeIds.add(themeDir);
        themePaths.push({ id: themeDir, absPath: themePath, relPath });

        if (!fs.existsSync(themeJsonPath)) {
          error(`Missing theme.json: ${relPath}/theme.json`);
          continue;
        }

        let themeJson;
        try {
          themeJson = JSON.parse(fs.readFileSync(themeJsonPath, "utf8"));
        } catch (e) {
          error(`Invalid JSON in ${relPath}/theme.json: ${e.message}`);
          continue;
        }

        if (themeJson.id !== themeDir) {
          error(
            `ID mismatch: ${relPath}/theme.json has id "${themeJson.id}", expected "${themeDir}"`
          );
        }

        if (themeJson.targetConsole && themeJson.targetConsole !== consoleDir) {
          error(
            `Console mismatch: ${relPath}/theme.json has targetConsole "${themeJson.targetConsole}", expected "${consoleDir}"`
          );
        }

        if (themeJson.targetProfileId && themeJson.targetProfileId !== profileDir) {
          error(
            `Profile mismatch: ${relPath}/theme.json has targetProfileId "${themeJson.targetProfileId}", expected "${profileDir}"`
          );
        }

        if (!themeJson.meta) {
          error(`Missing meta object: ${relPath}/theme.json`);
        } else {
          if (!themeJson.meta.name) error(`Missing meta.name: ${relPath}/theme.json`);
          if (!themeJson.meta.author) error(`Missing meta.author: ${relPath}/theme.json`);
          if (!themeJson.meta.version) error(`Missing meta.version: ${relPath}/theme.json`);
        }

        if (themeJson.uses) {
          if (!Array.isArray(themeJson.uses)) {
            error(`"uses" must be an array: ${relPath}/theme.json`);
          } else {
            const profilePath = path.join(PROFILES_DIR, `${profileDir}.json`);
            if (fs.existsSync(profilePath)) {
              const profileData = JSON.parse(fs.readFileSync(profilePath, "utf8"));
              const validIds = new Set();
              for (const dp of profileData.dataPoints || []) {
                validIds.add(dp.id);
                if (dp.bundle) validIds.add(dp.bundle);
              }
              if (profileData.bundles) {
                for (const name of Object.keys(profileData.bundles)) {
                  validIds.add(name);
                }
              }
              for (const entry of themeJson.uses) {
                if (!validIds.has(entry)) {
                  error(
                    `Invalid "uses" entry "${entry}": not a data point ID or bundle name in profile "${profileDir}" (${relPath}/theme.json)`
                  );
                }
              }
            }
          }
        }
      }
    }
  }

  // Validate starters (structural checks + security scan, but no orphan/index checks)
  const starterPaths = [];
  if (fs.existsSync(STARTERS_DIR)) {
    const starterDirs = fs
      .readdirSync(STARTERS_DIR)
      .filter((d) => fs.statSync(path.join(STARTERS_DIR, d)).isDirectory());

    for (const starterDir of starterDirs) {
      const starterPath = path.join(STARTERS_DIR, starterDir);
      const themeJsonPath = path.join(starterPath, "theme.json");
      const relPath = `starters/${starterDir}`;

      if (!fs.existsSync(themeJsonPath)) {
        error(`Missing theme.json: ${relPath}/theme.json`);
        continue;
      }

      let themeJson;
      try {
        themeJson = JSON.parse(fs.readFileSync(themeJsonPath, "utf8"));
      } catch (e) {
        error(`Invalid JSON in ${relPath}/theme.json: ${e.message}`);
        continue;
      }

      if (!themeJson.meta) {
        error(`Missing meta object: ${relPath}/theme.json`);
      } else {
        if (!themeJson.meta.name) error(`Missing meta.name: ${relPath}/theme.json`);
        if (!themeJson.meta.author) error(`Missing meta.author: ${relPath}/theme.json`);
        if (!themeJson.meta.version) error(`Missing meta.version: ${relPath}/theme.json`);
      }

      starterPaths.push({ id: starterDir, absPath: starterPath, relPath });
    }
  }

  // Check for themes in index.json missing from folder structure
  for (const id of indexThemeIds) {
    if (!folderThemeIds.has(id)) {
      const info = indexThemeMap.get(id);
      error(
        `Theme "${id}" in index.json has no matching folder at themes/${info.console}/${info.profileId}/${id}/`
      );
    }
  }

  // Check for orphaned themes (folder exists but missing from index.json)
  for (const id of folderThemeIds) {
    if (!indexThemeIds.has(id)) {
      error(`Orphaned theme folder: "${id}" exists on disk but is missing from index.json`);
    }
  }

  // Validate index.json tags
  for (const game of index.games) {
    for (const theme of game.themes) {
      if (theme.tags) {
        for (const tag of theme.tags) {
          if (!ALLOWED_TAGS.has(tag)) {
            error(
              `Invalid tag "${tag}" on theme "${theme.id}", allowed: ${[...ALLOWED_TAGS].join(", ")}`
            );
          }
        }
      }
    }
  }

  // --- Security scan ---
  console.log("\nRunning security scan...");

  const errRef = { count: 0 };
  const allScanPaths = [...themePaths, ...starterPaths];

  for (const { absPath } of allScanPaths) {
    const isTS = fs.existsSync(path.join(absPath, "vite.theme.json"));
    const scanDir = isTS ? path.join(absPath, "src") : absPath;
    const files = collectFiles(scanDir, [".js", ".ts", ".html", ".htm", ".tsx", ".jsx", ".svelte"]);

    for (const file of files) {
      scanFile(file, BANNED_NETWORK, "network", errRef);
      scanFile(file, BANNED_EVAL, "eval", errRef);
      scanFile(file, BANNED_STORAGE, "storage", errRef);
      if (file.endsWith(".html") || file.endsWith(".htm")) {
        scanFile(file, BANNED_EXTERNAL, "external-resource", errRef);
      }
      scanFile(file, BANNED_FRAMEWORKS, "framework", errRef, FRAMEWORK_EXCEPTIONS);
    }
  }
  errors += errRef.count;

  // --- Bundle size check ---
  console.log("Running bundle size check...");

  const CODE_EXTENSIONS = [".js", ".css", ".html", ".htm"];

  for (const { absPath, relPath, id } of themePaths) {
    const isTS = fs.existsSync(path.join(absPath, "vite.theme.json"));
    const measureDir = isTS ? path.join(absPath, "dist") : absPath;

    if (isTS && !fs.existsSync(measureDir)) continue;

    const codeFiles = collectFiles(measureDir, CODE_EXTENSIONS);
    let totalSize = 0;
    for (const f of codeFiles) {
      totalSize += fs.statSync(f).size;
    }

    if (totalSize > BUNDLE_SIZE_LIMIT) {
      const sizeKB = (totalSize / 1024).toFixed(1);
      error(
        `Bundle too large: ${id} is ${sizeKB} KB (limit: ${BUNDLE_SIZE_LIMIT / 1024} KB)`
      );
    } else if (totalSize > BUNDLE_SIZE_WARN) {
      const sizeKB = (totalSize / 1024).toFixed(1);
      warn(
        `Bundle approaching limit: ${id} is ${sizeKB} KB (warn: ${BUNDLE_SIZE_WARN / 1024} KB, limit: ${BUNDLE_SIZE_LIMIT / 1024} KB)`
      );
    }
  }

  // Summary
  console.log("");
  if (errors === 0) {
    console.log("All checks passed.");
  } else {
    console.log(`${errors} error(s) found.`);
  }

  return errors;
}

if (require.main === module) {
  if (process.argv.includes("--watch")) {
    runValidation();
    let t = null;
    const onChange = () => {
      clearTimeout(t);
      t = setTimeout(runValidation, 300);
    };
    fs.watch(THEMES_DIR, { recursive: true }, onChange);
    fs.watch(PROFILES_DIR, { recursive: true }, onChange);
    if (fs.existsSync(INDEX_PATH)) fs.watch(INDEX_PATH, onChange);
    console.log("\nWatching for changes (Ctrl+C to stop)...");
  } else {
    process.exit(runValidation() > 0 ? 1 : 0);
  }
}
