import { glob } from "glob";
import path from "path";
import fs from "fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const INDEX_PATH = path.join(ROOT, "index.json");
const CHECK = process.argv.includes("--check");
const PREVIEW_EXTS = ["png", "webp", "svg"];
const GITHUB_RAW = "https://raw.githubusercontent.com/EmuLnk/emulnk-repo/main";

// Gather all theme.json files (exclude mock.json, generated, starters)
const themeFiles = (
  await glob("themes/**/theme.json", { cwd: ROOT })
).sort();

// Map: profileId → { console, themes[] }
const gameMap = new Map<string, { console: string; themes: Record<string, unknown>[] }>();

for (const tf of themeFiles) {
  const themeJson = JSON.parse(fs.readFileSync(path.join(ROOT, tf), "utf8"));
  const { id, type, targetConsole, targetProfileId, meta, tags } = themeJson;

  if (!targetProfileId || !targetConsole) continue;

  if (!gameMap.has(targetProfileId)) {
    gameMap.set(targetProfileId, { console: targetConsole, themes: [] });
  }

  // Preview: check for preview.{png,webp,svg} in theme folder
  const themeDir = path.join(ROOT, path.dirname(tf));
  const previewExt = PREVIEW_EXTS.find((ext) =>
    fs.existsSync(path.join(themeDir, `preview.${ext}`))
  );
  const previewUrl = previewExt
    ? `${GITHUB_RAW}/themes/${targetConsole}/${targetProfileId}/${id}/preview.${previewExt}`
    : undefined;

  const entry: Record<string, unknown> = {
    id,
    name: meta.name,
    author: meta.author,
    version: meta.version,
    type,
  };
  if (tags && tags.length > 0) entry.tags = tags;
  entry.description = meta.description;
  entry.minAppVersion = meta.minAppVersion;
  if (previewUrl) entry.previewUrl = previewUrl;

  gameMap.get(targetProfileId)!.themes.push(entry);
}

// Build games array
const games: Record<string, unknown>[] = [];

for (const [profileId, { console: consoleCode, themes }] of gameMap) {
  // Game name from profile
  const profilePath = path.join(ROOT, "profiles", `${profileId}.json`);
  let gameName: string = profileId;
  try {
    const profile = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    if (profile.name) gameName = profile.name;
  } catch {
    // Profile missing, use profileId as fallback
  }

  // hasWidgets: presence of widgets/ directory under the profile
  const widgetsDir = path.join(ROOT, "themes", consoleCode, profileId, "widgets");
  const hasWidgets = fs.existsSync(widgetsDir);

  const entry: Record<string, unknown> = {
    profileId,
    name: gameName,
    console: consoleCode,
  };
  if (hasWidgets) entry.hasWidgets = true;
  entry.themes = themes.sort((a, b) =>
    String(a.id).localeCompare(String(b.id))
  );

  games.push(entry);
}

// Sort games by console then profileId for deterministic output
games.sort((a, b) => {
  const ca = String(a.console);
  const cb = String(b.console);
  if (ca !== cb) return ca.localeCompare(cb);
  return String(a.profileId).localeCompare(String(b.profileId));
});

const output = JSON.stringify({ version: "2.0", games }, null, 2) + "\n";

if (CHECK) {
  let existing = "";
  try {
    existing = fs.readFileSync(INDEX_PATH, "utf8");
  } catch {
    console.error("ERROR: index.json not found. Run `pnpm index:gen` to create it.");
    process.exit(1);
  }
  // Normalize line endings for comparison
  const normalize = (s: string) => s.replace(/\r\n/g, "\n").trimEnd();
  if (normalize(existing) !== normalize(output)) {
    console.error(
      "ERROR: index.json is out of date. Run `pnpm index:gen` to regenerate."
    );
    process.exit(1);
  }
  console.log("index.json is up to date.");
} else {
  fs.writeFileSync(INDEX_PATH, output);
  console.log(`Generated index.json: ${games.length} game(s), ${themeFiles.length} theme(s).`);
}
