import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const STARTERS_DIR = path.join(ROOT, "starters");
const THEMES_DIR = path.join(ROOT, "themes");
const INDEX_PATH = path.join(ROOT, "index.json");

const FRAMEWORKS = ["vanilla-js", "vanilla-ts", "svelte", "lit", "solid", "preact-signals"];

function arg(name: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : undefined;
}

const framework = arg("framework");
const name = arg("name");
const consoleName = arg("console");
const profile = arg("profile");

if (!framework || !name || !consoleName || !profile) {
  console.error("Usage: pnpm new --framework <framework> --name <ThemeName> --console <Console> --profile <ProfileId>");
  console.error(`\nFrameworks: ${FRAMEWORKS.join(", ")}`);
  process.exit(1);
}

if (!FRAMEWORKS.includes(framework)) {
  console.error(`Invalid framework "${framework}". Must be one of: ${FRAMEWORKS.join(", ")}`);
  process.exit(1);
}

if (!/^[A-Za-z0-9_-]+$/.test(name)) {
  console.error(`Invalid theme name "${name}". Must be alphanumeric (A-Z, 0-9, _, -).`);
  process.exit(1);
}

const consoleDir = path.join(THEMES_DIR, consoleName);
if (!fs.existsSync(consoleDir)) {
  console.warn(`WARN: Console directory themes/${consoleName}/ does not exist - it will be created.`);
}

const profilePath = path.join(ROOT, "profiles", `${profile}.json`);
if (!fs.existsSync(profilePath)) {
  console.warn(`WARN: Profile profiles/${profile}.json not found - theme may not be detected.`);
}

const starterDir = path.join(STARTERS_DIR, framework);
if (!fs.existsSync(starterDir)) {
  console.error(`Starter template not found: starters/${framework}/`);
  process.exit(1);
}

const targetDir = path.join(THEMES_DIR, consoleName, profile, name);
if (fs.existsSync(targetDir)) {
  console.error(`Theme already exists: themes/${consoleName}/${profile}/${name}/`);
  process.exit(1);
}

// Copy starter to target
function copyDir(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(starterDir, targetDir);

// Update theme.json
const themeJsonPath = path.join(targetDir, "theme.json");
let themeContent = fs.readFileSync(themeJsonPath, "utf8");
const themeJson = JSON.parse(themeContent);
themeJson.id = name;
themeJson.targetProfileId = profile;
themeJson.targetConsole = consoleName;
themeJson.meta.name = name;
fs.writeFileSync(themeJsonPath, JSON.stringify(themeJson, null, 2) + "\n");

// Try to add to index.json
let index: { games: { profileId: string; console: string; themes: unknown[] }[] };
try {
  index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
} catch {
  console.error(`ERROR: Failed to parse index.json - file may be corrupt.`);
  console.error(`  Theme folder was still created at themes/${consoleName}/${profile}/${name}/`);
  process.exit(1);
}
const game = index.games.find(
  (g: { profileId: string; console: string }) => g.profileId === profile && g.console === consoleName,
);

if (game) {
  game.themes.push({
    id: name,
    name,
    author: themeJson.meta.author,
    version: themeJson.meta.version,
    type: themeJson.type,
    tags: [],
    description: themeJson.meta.description,
    minAppVersion: themeJson.meta.minAppVersion,
  });
  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + "\n");
  console.log(`  Added "${name}" to index.json under ${consoleName}/${profile}`);
} else {
  console.log(`  Game ${consoleName}/${profile} not found in index.json - add the entry manually.`);
}

console.log(`\nCreated themes/${consoleName}/${profile}/${name}/ from ${framework} starter.`);
console.log(`\nNext steps:`);
console.log(`  1. Edit theme.json with your theme details`);
console.log(`  2. pnpm dev --theme ${name}`);
