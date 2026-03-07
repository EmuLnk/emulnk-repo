#!/usr/bin/env node

/**
 * CI validation script for emulnk-repo.
 * Checks consistency between folder structure, theme.json files, and index.json.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const THEMES_DIR = path.join(ROOT, "themes");
const INDEX_PATH = path.join(ROOT, "index.json");
const CONSOLES_PATH = path.join(ROOT, "consoles.json");
const PROFILES_DIR = path.join(ROOT, "profiles");

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

let errors = 0;

function error(msg) {
  console.error(`ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`WARN:  ${msg}`);
}

// Load reference data
const consoles = JSON.parse(fs.readFileSync(CONSOLES_PATH, "utf8"));
const validConsoleCodes = new Set(consoles.map((c) => c.console));

const profileFiles = fs
  .readdirSync(PROFILES_DIR)
  .filter((f) => f.endsWith(".json"));
const validProfileIds = new Set(profileFiles.map((f) => f.replace(".json", "")));

const index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));

// Track all theme IDs in index.json for orphan detection
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

// Track all theme folders
const folderThemeIds = new Set();

// Validate folder structure
const consoleDirs = fs
  .readdirSync(THEMES_DIR)
  .filter((d) => fs.statSync(path.join(THEMES_DIR, d)).isDirectory());

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

      // Check theme.json exists
      if (!fs.existsSync(themeJsonPath)) {
        error(`Missing theme.json: ${relPath}/theme.json`);
        continue;
      }

      const themeJson = JSON.parse(fs.readFileSync(themeJsonPath, "utf8"));

      // Check id matches folder name
      if (themeJson.id !== themeDir) {
        error(
          `ID mismatch: ${relPath}/theme.json has id "${themeJson.id}", expected "${themeDir}"`
        );
      }

      // Check targetConsole matches console directory
      if (themeJson.targetConsole && themeJson.targetConsole !== consoleDir) {
        error(
          `Console mismatch: ${relPath}/theme.json has targetConsole "${themeJson.targetConsole}", expected "${consoleDir}"`
        );
      }

      // Check targetProfileId matches profile directory
      if (themeJson.targetProfileId && themeJson.targetProfileId !== profileDir) {
        error(
          `Profile mismatch: ${relPath}/theme.json has targetProfileId "${themeJson.targetProfileId}", expected "${profileDir}"`
        );
      }
    }
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
            `Invalid tag "${tag}" on theme "${theme.id}" — allowed: ${[...ALLOWED_TAGS].join(", ")}`
          );
        }
      }
    }
  }
}

// Summary
console.log("");
if (errors === 0) {
  console.log("All checks passed.");
  process.exit(0);
} else {
  console.log(`${errors} error(s) found.`);
  process.exit(1);
}
