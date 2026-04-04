import { glob } from "glob";
import path from "path";
import fs from "fs";
import { execFileSync } from "child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const RELEASE_DIR = path.join(ROOT, "release");
const TEMP_DIR = path.join(ROOT, "release", "_staging");
const OUTPUT_ZIP = path.join(RELEASE_DIR, "emulnk-repo.zip");

// Clean up previous build
if (fs.existsSync(RELEASE_DIR)) {
  fs.rmSync(RELEASE_DIR, { recursive: true });
}
fs.mkdirSync(TEMP_DIR, { recursive: true });

// --- Copy root files ---

const rootFiles = ["consoles.json", "hashes.json", "index.json"];
for (const file of rootFiles) {
  const src = path.join(ROOT, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(TEMP_DIR, file));
  }
}

const rootDirs = ["profiles", "covers", "icons"];
for (const dir of rootDirs) {
  const src = path.join(ROOT, dir);
  if (fs.existsSync(src)) {
    cpDir(src, path.join(TEMP_DIR, dir));
  }
}

// --- Copy themes ---

// Find TS themes (have vite.theme.json)
const tsMarkers = await glob("themes/**/vite.theme.json", { cwd: ROOT });
const tsThemeDirs = new Set(tsMarkers.map((m) => path.dirname(m)));

// Find all theme dirs (have theme.json)
const allThemes = await glob("themes/**/theme.json", { cwd: ROOT });

for (const themeJsonRel of allThemes) {
  const themeRelDir = path.dirname(themeJsonRel);
  const themeSrc = path.join(ROOT, themeRelDir);
  const themeDest = path.join(TEMP_DIR, themeRelDir);

  if (tsThemeDirs.has(themeRelDir)) {
    // TS theme: copy theme.json + dist/* (promoted to theme root)
    const distDir = path.join(themeSrc, "dist");
    if (!fs.existsSync(distDir)) {
      console.warn(`WARN: TS theme ${themeRelDir} has no dist/ - run pnpm build first`);
      continue;
    }

    fs.mkdirSync(themeDest, { recursive: true });
    fs.copyFileSync(path.join(themeSrc, "theme.json"), path.join(themeDest, "theme.json"));
    const previewFile = path.join(themeSrc, "preview.png");
    if (fs.existsSync(previewFile)) {
      fs.copyFileSync(previewFile, path.join(themeDest, "preview.png"));
    }
    cpDir(distDir, themeDest);
  } else {
    // Vanilla theme: copy everything as-is
    cpDir(themeSrc, themeDest);
  }
}

// --- Also copy shared widget directories (not themes themselves) ---

const widgetDirs = await glob("themes/**/widgets/widgets.json", { cwd: ROOT });
for (const wdRel of widgetDirs) {
  const wdDir = path.dirname(wdRel);
  const src = path.join(ROOT, wdDir);
  const dest = path.join(TEMP_DIR, wdDir);
  if (!fs.existsSync(dest)) {
    cpDir(src, dest);
  }
}

// --- Create zip ---

console.log("Creating release zip...");

function hasCommand(cmd: string): boolean {
  try {
    execFileSync("which", [cmd], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

if (hasCommand("zip")) {
  execFileSync("zip", ["-r", OUTPUT_ZIP, "."], { cwd: TEMP_DIR, stdio: "inherit" });
} else {
  // Fallback: tar.gz (local dev without zip installed)
  const tarOutput = OUTPUT_ZIP.replace(".zip", ".tar.gz");
  execFileSync("tar", ["-czf", tarOutput, "-C", TEMP_DIR, "."], { stdio: "inherit" });
  console.warn(`WARN: zip not found, created ${path.basename(tarOutput)} instead`);
  console.warn("      CI (ubuntu-latest) has zip - this is fine for local testing.");
}

// Clean up staging
fs.rmSync(TEMP_DIR, { recursive: true });

const outputFile = fs.existsSync(OUTPUT_ZIP)
  ? OUTPUT_ZIP
  : OUTPUT_ZIP.replace(".zip", ".tar.gz");
const size = (fs.statSync(outputFile).size / 1024 / 1024).toFixed(2);
console.log(`\nRelease: ${outputFile} (${size} MB)`);

// --- Helpers ---

function cpDir(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      cpDir(s, d);
    } else if (!entry.name.endsWith(".map")) {
      fs.copyFileSync(s, d);
    }
  }
}
