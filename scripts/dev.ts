import { build, createServer, type InlineConfig, type PluginOption, type Plugin } from "vite";
import { glob } from "glob";
import path from "path";
import fs from "fs";
import os from "os";
import http from "http";
import { deflateRawSync } from "zlib";

const ROOT = path.resolve(import.meta.dirname, "..");
const STAGING_DIR = path.join(ROOT, "release", "_staging");
const DEFAULT_PORT = 5173;

// Parse CLI flags
const themeIdx = process.argv.indexOf("--theme");
const themeFilter = themeIdx !== -1 ? process.argv[themeIdx + 1] || null : null;
const portIdx = process.argv.indexOf("--port");
const PORT = portIdx !== -1 ? parseInt(process.argv[portIdx + 1], 10) || DEFAULT_PORT : DEFAULT_PORT;
const mockMode = process.argv.includes("--mock");
const debugMode = process.argv.includes("--debug");
const playgroundMode = process.argv.includes("--playground");

// ===== Theme discovery (themes/ only, matches package.ts) =====

interface ThemeInfo {
  name: string;
  relDir: string; // e.g. "themes/GBA/BPE/EmuDex"
  absDir: string;
  isTS: boolean;
  entry?: string;
  framework?: string;
}

async function discoverThemes(): Promise<ThemeInfo[]> {
  const result: ThemeInfo[] = [];
  const tsMarkers = await glob("themes/**/vite.theme.json", { cwd: ROOT });
  const tsSet = new Set(tsMarkers.map((m) => path.dirname(m)));
  const allThemeJsons = await glob("themes/**/theme.json", { cwd: ROOT });

  for (const tj of allThemeJsons) {
    const relDir = path.dirname(tj);
    const absDir = path.join(ROOT, relDir);
    const name = path.basename(relDir);
    const isTS = tsSet.has(relDir);

    let entry: string | undefined;
    let framework: string | undefined;
    if (isTS) {
      const config = JSON.parse(fs.readFileSync(path.join(absDir, "vite.theme.json"), "utf8"));
      entry = config.entry || "src/index.html";
      framework = config.framework;
    }

    result.push({ name, relDir, absDir, isTS, entry, framework });
  }
  return result;
}

const themes = await discoverThemes();

// ===== Framework plugins (pre-loaded once, factory creates fresh instances) =====

const { svelte } = await import("@sveltejs/vite-plugin-svelte");
const solidPlugin = await import("vite-plugin-solid");

function getPlugins(framework?: string): PluginOption[] {
  if (framework === "svelte") return [svelte()];
  if (framework === "solid") return [solidPlugin.default()];
  return [];
}

// ===== Logging =====

function log(msg: string) {
  const time = new Date().toLocaleTimeString("en-US", { hour12: false });
  console.log(`[${time}] ${msg}`);
}

// ===== Build (same config as build.ts) =====

async function buildTheme(theme: ThemeInfo): Promise<boolean> {
  if (!theme.isTS) return true;

  const viteConfig: InlineConfig = {
    root: theme.absDir,
    base: "./",
    plugins: getPlugins(theme.framework),
    build: {
      sourcemap: "inline",
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        input: path.join(theme.absDir, theme.entry!),
        output: {
          entryFileNames: "assets/app.js",
          chunkFileNames: "assets/[name].js",
          assetFileNames: "assets/[name][extname]",
          sourcemapPathTransform: (relPath: string) => {
            const cleaned = relPath.replace(/^(\.\.\/)+/, "");
            const nm = cleaned.indexOf("node_modules/");
            if (nm !== -1) return cleaned.slice(nm);
            return cleaned;
          },
        },
      },
    },
    resolve: {
      alias: { "@emulnk/sdk": path.join(ROOT, "sdk") },
    },
    logLevel: "warn",
  };

  try {
    await build(viteConfig);
    return true;
  } catch (err) {
    log(`Build FAILED: ${theme.name}: ${err}`);
    return false;
  }
}

// ===== Staging population (mirrors package.ts layout) =====

function cpDir(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, ent.name);
    const d = path.join(dest, ent.name);
    if (ent.isDirectory()) cpDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function copyConfigs(): void {
  for (const file of ["consoles.json", "hashes.json", "index.json"]) {
    const src = path.join(ROOT, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(STAGING_DIR, file));
  }
  for (const dir of ["profiles", "covers", "icons"]) {
    const src = path.join(ROOT, dir);
    if (!fs.existsSync(src)) continue;
    const dest = path.join(STAGING_DIR, dir);
    if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true });
    cpDir(src, dest);
  }
}

function copyThemeToStaging(theme: ThemeInfo): void {
  const dest = path.join(STAGING_DIR, theme.relDir);
  if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true });
  fs.mkdirSync(dest, { recursive: true });

  if (theme.isTS) {
    const distDir = path.join(theme.absDir, "dist");
    if (!fs.existsSync(distDir)) return;
    fs.copyFileSync(path.join(theme.absDir, "theme.json"), path.join(dest, "theme.json"));
    cpDir(distDir, dest);
  } else {
    cpDir(theme.absDir, dest);
  }
}

async function syncWidgetsToStaging(logChanges: boolean): Promise<boolean> {
  let changed = false;
  const widgetDirs = await glob("themes/**/widgets/widgets.json", { cwd: ROOT });
  for (const wdRel of widgetDirs) {
    const wdDir = path.dirname(wdRel);
    const src = path.join(ROOT, wdDir);
    const dest = path.join(STAGING_DIR, wdDir);
    const srcMt = sourceDirMtime(src);
    const destMt = fs.existsSync(dest) ? sourceDirMtime(dest) : 0;
    if (srcMt > destMt) {
      if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true });
      cpDir(src, dest);
      if (logChanges) log(`Widget changed: ${wdDir} → copied to staging`);
      changed = true;
    }
  }
  return changed;
}

async function populateStaging(filterName?: string | null): Promise<void> {
  if (fs.existsSync(STAGING_DIR)) fs.rmSync(STAGING_DIR, { recursive: true });
  fs.mkdirSync(STAGING_DIR, { recursive: true });

  copyConfigs();

  const themesToProcess = filterName
    ? themes.filter((t) => t.name === filterName)
    : themes;

  let built = 0;
  let failed = 0;
  for (const theme of themesToProcess) {
    if (theme.isTS) {
      const ok = await buildTheme(theme);
      if (ok) {
        built++;
        copyThemeToStaging(theme);
      } else {
        failed++;
      }
    } else {
      copyThemeToStaging(theme);
      built++;
    }
  }

  await syncWidgetsToStaging(false);

  rebuildZipCache();
  log(`Staging ready (${built} themes${failed > 0 ? `, ${failed} failed` : ""}${filterName ? ` [${filterName}]` : ""})`);
}

// ===== Zip cache (pre-built so __dev_sync responds instantly) =====

let cachedZip: Buffer | null = null;

function rebuildZipCache(): void {
  cachedZip = zipStaging();
}

function getZip(): Buffer {
  if (!cachedZip) rebuildZipCache();
  return cachedZip!;
}

// ===== Zip (flat, no root prefix, matches release zip format) =====

function zipStaging(): Buffer {
  const files: { arcname: string; fullPath: string }[] = [];

  function collect(dir: string, base: string) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.name.startsWith(".")) continue;
      const full = path.join(dir, ent.name);
      const rel = base ? base + "/" + ent.name : ent.name;
      if (ent.isDirectory()) collect(full, rel);
      else files.push({ arcname: rel, fullPath: full });
    }
  }
  collect(STAGING_DIR, "");

  const zipParts: Buffer[] = [];
  const centralDir: Buffer[] = [];
  let offset = 0;

  for (const file of files) {
    const data = fs.readFileSync(file.fullPath);
    const compressed = deflateRawSync(data);
    const nameBytes = Buffer.from(file.arcname, "utf8");

    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
      crc ^= data[i];
      for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
    crc ^= 0xffffffff;

    const local = Buffer.alloc(30 + nameBytes.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(crc >>> 0, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBytes.length, 26);
    local.writeUInt16LE(0, 28);
    nameBytes.copy(local, 30);
    zipParts.push(local, compressed);

    const central = Buffer.alloc(46 + nameBytes.length);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0, 14);
    central.writeUInt32LE(crc >>> 0, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBytes.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    nameBytes.copy(central, 46);
    centralDir.push(central);
    offset += local.length + compressed.length;
  }

  const centralDirBuf = Buffer.concat(centralDir);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(centralDirBuf.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);

  return Buffer.concat([...zipParts, centralDirBuf, eocd]);
}

// ===== Mtime helpers =====

function walkMaxMtime(dir: string): number {
  let max = 0;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      const sub = walkMaxMtime(full);
      if (sub > max) max = sub;
    } else {
      try {
        const mt = fs.statSync(full).mtimeMs;
        if (mt > max) max = mt;
      } catch {}
    }
  }
  return max;
}

/** Walk dir for max mtime, skipping node_modules/.git/dist */
function sourceDirMtime(dir: string): number {
  if (!fs.existsSync(dir)) return 0;
  let max = 0;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".git" || ent.name === "dist") continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      const sub = sourceDirMtime(full);
      if (sub > max) max = sub;
    } else {
      try {
        const mt = fs.statSync(full).mtimeMs;
        if (mt > max) max = mt;
      } catch {}
    }
  }
  return max;
}

// ===== Background watcher =====

const sourceMtimes = new Map<string, number>();
let sdkMtime = 0;
let watcherRunning = false;

function initWatcher(): void {
  const sdkDir = path.join(ROOT, "sdk");
  sdkMtime = fs.existsSync(sdkDir) ? sourceDirMtime(sdkDir) : 0;
  for (const theme of themes) {
    const dir = theme.isTS ? path.join(theme.absDir, "src") : theme.absDir;
    sourceMtimes.set(theme.relDir, sourceDirMtime(dir));
  }
}

async function watchCycle(): Promise<void> {
  if (watcherRunning) return;
  watcherRunning = true;
  let changed = false;
  try {
    // SDK changes → rebuild TS themes (filtered if --theme is set)
    const sdkDir = path.join(ROOT, "sdk");
    const newSdkMt = fs.existsSync(sdkDir) ? sourceDirMtime(sdkDir) : 0;
    if (newSdkMt > sdkMtime) {
      sdkMtime = newSdkMt;
      const sdkThemes = themeFilter
        ? themes.filter((t) => t.isTS && t.name === themeFilter)
        : themes.filter((t) => t.isTS);
      log(`SDK changed, rebuilding ${themeFilter || "all TS themes"}...`);
      for (const theme of sdkThemes) {
        const start = Date.now();
        const ok = await buildTheme(theme);
        if (ok) {
          copyThemeToStaging(theme);
          log(`  Rebuilt ${theme.name} (${((Date.now() - start) / 1000).toFixed(1)}s)`);
        }
        sourceMtimes.set(theme.relDir, sourceDirMtime(path.join(theme.absDir, "src")));
      }
      rebuildZipCache();
      return;
    }

    // Config files
    for (const file of ["consoles.json", "hashes.json", "index.json"]) {
      const src = path.join(ROOT, file);
      const dest = path.join(STAGING_DIR, file);
      if (fs.existsSync(src)) {
        if (!fs.existsSync(dest) || fs.statSync(src).mtimeMs > fs.statSync(dest).mtimeMs) {
          fs.copyFileSync(src, dest);
          log(`Config changed: ${file} → copied to staging`);
          changed = true;
        }
      }
    }

    // Profiles
    const profSrc = path.join(ROOT, "profiles");
    if (fs.existsSync(profSrc)) {
      const profDest = path.join(STAGING_DIR, "profiles");
      const srcMt = sourceDirMtime(profSrc);
      const destMt = fs.existsSync(profDest) ? sourceDirMtime(profDest) : 0;
      if (srcMt > destMt) {
        if (fs.existsSync(profDest)) fs.rmSync(profDest, { recursive: true });
        cpDir(profSrc, profDest);
        log("Profiles changed → copied to staging");
        changed = true;
      }
    }

    // Individual themes (filtered if --theme is set)
    const watchThemes = themeFilter
      ? themes.filter((t) => t.name === themeFilter)
      : themes;
    for (const theme of watchThemes) {
      const dir = theme.isTS ? path.join(theme.absDir, "src") : theme.absDir;
      const current = sourceDirMtime(dir);
      const prev = sourceMtimes.get(theme.relDir) || 0;

      if (current > prev) {
        sourceMtimes.set(theme.relDir, current);
        if (theme.isTS) {
          log(`Source changed: ${theme.name}`);
          const start = Date.now();
          const ok = await buildTheme(theme);
          if (ok) {
            copyThemeToStaging(theme);
            log(`Rebuilt ${theme.name} (${((Date.now() - start) / 1000).toFixed(1)}s)`);
          }
        } else {
          copyThemeToStaging(theme);
          log(`File changed: ${theme.relDir} → copied to staging`);
        }
        changed = true;
      }
    }

    // Widgets
    const widgetsChanged = await syncWidgetsToStaging(true);
    if (widgetsChanged) changed = true;

    if (changed) rebuildZipCache();
  } finally {
    watcherRunning = false;
  }
}

// ===== MIME types =====

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".wav": "audio/wav",
};

// ===== Request handler (shared by both modes) =====

/**
 * Strip composite theme prefix from a staging-relative path.
 * The app's WebView requests use composite names (e.g. themes/PS1/SOTN/SOTN_Grimoire/...)
 * but staging uses the original repo structure (themes/PS1/SOTN/Grimoire/...).
 * Pattern: themes/{console}/{profileId}/{profileId}_{themeId}/... → themes/{console}/{profileId}/{themeId}/...
 */
function loadPlaygroundProfile(themeDir: string): { profile: unknown; themeSettings: unknown[]; mockScenarios: unknown[] } {
  const result: { profile: unknown; themeSettings: unknown[]; mockScenarios: unknown[] } = {
    profile: { id: "unknown", dataPoints: [] },
    themeSettings: [],
    mockScenarios: [],
  };
  const themeJsonPath = path.join(themeDir, "theme.json");
  if (fs.existsSync(themeJsonPath)) {
    const themeJson = JSON.parse(fs.readFileSync(themeJsonPath, "utf8"));
    result.themeSettings = themeJson.settings || [];
    const profileId = themeJson.targetProfileId;
    if (profileId && profileId !== "CHANGEME") {
      const profilePath = path.join(ROOT, "profiles", `${profileId}.json`);
      if (fs.existsSync(profilePath)) {
        const profile = JSON.parse(fs.readFileSync(profilePath, "utf8"));
        result.profile = { id: profile.id, dataPoints: profile.dataPoints || [] };
      }
      const mockPath = path.join(ROOT, "profiles", `${profileId}.mock.json`);
      if (fs.existsSync(mockPath)) {
        result.mockScenarios = JSON.parse(fs.readFileSync(mockPath, "utf8"));
      }
    }
  }
  return result;
}

function buildMockScript(scenarios: unknown[]): string {
  const json = JSON.stringify(scenarios);
  return `(function() {
  const scenarios = ${json};
  let idx = 0;
  let live = true;
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:99999;background:#111;color:#eee;font:12px monospace;padding:4px 8px;display:flex;gap:8px;align-items:center;';
  const sel = document.createElement('select');
  sel.style.cssText = 'background:#222;color:#eee;border:1px solid #444;padding:2px 4px;';
  scenarios.forEach((s, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = s.label || 'Scenario ' + i;
    sel.appendChild(opt);
  });
  const liveLabel = document.createElement('label');
  liveLabel.style.cssText = 'display:flex;align-items:center;gap:4px;cursor:pointer;';
  const liveChk = document.createElement('input');
  liveChk.type = 'checkbox';
  liveChk.checked = true;
  liveLabel.appendChild(liveChk);
  liveLabel.appendChild(document.createTextNode('Live'));
  bar.appendChild(document.createTextNode('[mock] '));
  bar.appendChild(sel);
  bar.appendChild(liveLabel);
  document.body.appendChild(bar);
  function fire() {
    const s = scenarios[idx];
    if (typeof window.updateData === 'function') window.updateData(btoa(JSON.stringify(s)));
  }
  sel.addEventListener('change', () => { idx = parseInt(sel.value); fire(); });
  liveChk.addEventListener('change', () => { live = liveChk.checked; });
  setInterval(() => { if (live) fire(); }, 1000);
  setTimeout(fire, 200);
})();`;
}

function stripCompositePrefix(relPath: string): string | null {
  const parts = relPath.split("/");
  // Match: themes/{console}/{profileId}/{profileId_themeId}/...
  if (parts.length >= 4 && parts[0] === "themes") {
    const profileId = parts[2];
    const folder = parts[3];
    if (folder.startsWith(profileId + "_")) {
      parts[3] = folder.slice(profileId.length + 1);
      return parts.join("/");
    }
  }
  return null;
}

function handleRequest(req: http.IncomingMessage, res: http.ServerResponse): boolean {
  const url = new URL(req.url!, `http://${req.headers.host}`);

  // ── __dev_reload: return staging mtime for a given path ──
  if (url.pathname === "/__dev_reload") {
    const relPath = url.searchParams.get("path");
    if (!relPath) {
      res.writeHead(400, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
      res.end(JSON.stringify({ error: "missing 'path' param" }));
      log(`GET /__dev_reload → 400 (missing path)`);
      return true;
    }
    let target = path.resolve(STAGING_DIR, relPath);
    if (!target.startsWith(STAGING_DIR + path.sep) && target !== STAGING_DIR) {
      res.writeHead(403, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
      res.end(JSON.stringify({ error: "path outside staging" }));
      log(`GET /__dev_reload → 403`);
      return true;
    }
    // Fallback: try stripping composite prefix (SOTN_Grimoire → Grimoire)
    if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
      const alt = stripCompositePrefix(relPath);
      if (alt) {
        const altTarget = path.resolve(STAGING_DIR, alt);
        if (altTarget.startsWith(STAGING_DIR + path.sep) && fs.existsSync(altTarget) && fs.statSync(altTarget).isDirectory()) {
          target = altTarget;
        }
      }
    }
    if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
      res.writeHead(404, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
      res.end(JSON.stringify({ error: "directory not found" }));
      log(`GET /__dev_reload?path=${relPath} → 404`);
      return true;
    }
    const mtime = walkMaxMtime(target);
    res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
    res.end(JSON.stringify({ mtime: mtime / 1000 }));
    log(`GET /__dev_reload?path=${relPath} → 200`);
    return true;
  }

  // ── __dev_sync: serve pre-built zip instantly ──
  if (url.pathname === "/__dev_sync") {
    try {
      const zipBuffer = getZip();
      res.writeHead(200, {
        "Content-Type": "application/zip",
        "Content-Length": String(zipBuffer.length),
        "Content-Disposition": 'attachment; filename="emulnk-repo.zip"',
        "Access-Control-Allow-Origin": "*",
      });
      res.end(zipBuffer);
      log(`GET /__dev_sync → 200 (${(zipBuffer.length / 1024 / 1024).toFixed(1)} MB zip)`);
    } catch (err) {
      log(`GET /__dev_sync → 500 (${err})`);
      res.writeHead(500, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
      res.end(JSON.stringify({ error: "zip build failed" }));
    }
    return true;
  }

  // ── Static file serving from staging ──
  const urlPath = decodeURIComponent(url.pathname);
  let filePath = path.resolve(STAGING_DIR, urlPath.slice(1));
  if (!filePath.startsWith(STAGING_DIR + path.sep) && filePath !== STAGING_DIR) {
    return false; // path traversal, reject
  }
  // Fallback: try stripping composite prefix (SOTN_Grimoire → Grimoire)
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    const alt = stripCompositePrefix(urlPath.slice(1));
    if (alt) {
      const altPath = path.resolve(STAGING_DIR, alt);
      if (altPath.startsWith(STAGING_DIR + path.sep) && fs.existsSync(altPath) && fs.statSync(altPath).isFile()) {
        filePath = altPath;
      }
    }
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Content-Length": String(data.length),
      "Access-Control-Allow-Origin": "*",
    });
    res.end(data);
    log(`GET ${url.pathname} → 200`);
    return true;
  }

  return false; // not found in staging, let caller handle (Vite fallthrough or 404)
}

// ===== Main =====

console.log(themeFilter ? `Building theme: ${themeFilter}...` : "Building all themes...");
await populateStaging(themeFilter);

initWatcher();
let watcherStarted = false;
try {
  // @ts-ignore no type declarations for @parcel/watcher (native dep)
  const { subscribe } = await import("@parcel/watcher");
  let pending = false;
  await subscribe(ROOT, (err: Error | null) => {
    if (err) { log(`Watcher error: ${err}`); return; }
    if (pending) return;
    pending = true;
    setTimeout(() => {
      pending = false;
      watchCycle().catch((err) => log(`Watcher error: ${err}`));
    }, 100);
  }, { ignore: ["node_modules", ".git", "release", "dist", "_staging"] });
  log("File watcher: native events");
  watcherStarted = true;
} catch {
  // @parcel/watcher unavailable
}
if (!watcherStarted) {
  setInterval(() => watchCycle().catch((err) => log(`Watcher error: ${err}`)), 500);
  log("File watcher: polling (500ms)");
}

// Network detection
const isWSL =
  fs.existsSync("/proc/version") &&
  fs.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft");
const localIp = isWSL
  ? undefined
  : Object.values(os.networkInterfaces())
      .flat()
      .find((i) => i && i.family === "IPv4" && !i.internal)?.address;

function printStartup(port: number, hmrTheme?: string) {
  const netAddr = localIp || "<your-windows-ip>";
  const netUrl = `http://${netAddr}:${port}`;

  console.log(`\nDev server running at:`);
  console.log(`  Local:   http://localhost:${port}`);
  if (localIp || isWSL) {
    console.log(`  Network: ${netUrl}`);
  }
  if (hmrTheme) {
    console.log(`  HMR:     ${hmrTheme}`);
  }
  if (playgroundMode) {
    console.log(`  Playground: http://localhost:${port}/__playground`);
  }
}

if (themeFilter) {
  // ── Mode 1: Vite HMR for selected theme + staging middleware ──

  // Search both themes/ and starters/ for --theme target (matches old behavior)
  const allTsMarkers = await glob("{themes,starters}/**/vite.theme.json", { cwd: ROOT });
  const tsMatch = allTsMarkers.find((m) => {
    const dir = path.dirname(m).replace(/\\/g, "/");
    return path.basename(dir) === themeFilter || dir.endsWith("/" + themeFilter);
  });

  let viteThemeDir: string;
  let viteEntry: string;
  let vitePlugins: PluginOption[] = [];

  if (tsMatch) {
    viteThemeDir = path.join(ROOT, path.dirname(tsMatch));
    const config = JSON.parse(fs.readFileSync(path.join(ROOT, tsMatch), "utf8"));
    viteEntry = config.entry || "src/index.html";
    vitePlugins = getPlugins(config.framework);
  } else {
    const allThemeJsons = await glob("{themes,starters}/**/theme.json", { cwd: ROOT });
    const vanillaMatch = allThemeJsons.find((m) => {
      const dir = path.dirname(m).replace(/\\/g, "/");
      return path.basename(dir) === themeFilter || dir.endsWith("/" + themeFilter);
    });
    if (!vanillaMatch) {
      console.error(`Theme "${themeFilter}" not found in themes/ or starters/.`);
      process.exit(1);
    }
    viteThemeDir = path.join(ROOT, path.dirname(vanillaMatch));
    viteEntry = "index.html";
  }

  // Load mock scenarios if --mock
  let mockScenarios: unknown[] | null = null;
  if (mockMode) {
    const themeJsonPath = path.join(viteThemeDir, "theme.json");
    if (fs.existsSync(themeJsonPath)) {
      const targetProfileId = JSON.parse(fs.readFileSync(themeJsonPath, "utf8")).targetProfileId as string;
      const mockPath = path.join(ROOT, "profiles", `${targetProfileId}.mock.json`);
      if (fs.existsSync(mockPath)) {
        mockScenarios = JSON.parse(fs.readFileSync(mockPath, "utf8"));
      } else {
        log(`--mock: no mock file for '${targetProfileId}', run: pnpm mock:init --profile ${targetProfileId}`);
      }
    }
  }

  // Inject staging middleware + mock support as a Vite plugin
  vitePlugins.push({
    name: "emulink-dev",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === "POST" && req.url === "/__dev_inject") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              JSON.parse(body);
              const encoded = Buffer.from(body).toString("base64");
              server.ws.send({ type: "custom", event: "emulink:inject", data: encoded });
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end('{"ok":true}');
            } catch {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end('{"error":"invalid JSON"}');
            }
          });
          return;
        }
        if (playgroundMode && req.url === "/__playground") {
          const html = fs.readFileSync(path.join(ROOT, "scripts", "playground.html"), "utf8");
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(html);
          return;
        }
        if (playgroundMode && req.url === "/__playground_config") {
          const profileData = loadPlaygroundProfile(viteThemeDir);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(profileData));
          return;
        }
        if (handleRequest(req as http.IncomingMessage, res as http.ServerResponse)) return;
        next();
      });
    },
    transformIndexHtml() {
      const tags: { tag: string; attrs?: Record<string, string>; children: string; injectTo: "body" }[] = [];
      tags.push({
        tag: "script",
        attrs: { type: "module" },
        children: `if (import.meta.hot) {
  import.meta.hot.on('emulink:inject', (data) => {
    if (typeof window.updateData === 'function') window.updateData(data);
  });
}`,
        injectTo: "body",
      });
      if (mockScenarios && !playgroundMode) {
        tags.push({ tag: "script", children: buildMockScript(mockScenarios), injectTo: "body" });
      }
      if (playgroundMode) {
        tags.push({
          tag: "script",
          children: `window.addEventListener("message", function(e) {
  if (e.data && e.data.type === "emulink:playground" && typeof window.updateData === "function") {
    window.updateData(btoa(JSON.stringify(e.data.payload)));
  }
});`,
          injectTo: "body",
        });
      }
      if (debugMode) {
        tags.push({
          tag: "script",
          attrs: { type: "module" },
          children: `import { initDevtools } from '/@fs/${ROOT.replace(/\\/g, "/")}/sdk/devtools.ts'; initDevtools(${mockMode ? 32 : 0});`,
          injectTo: "body",
        });
      }
      return tags;
    },
  } as Plugin);

  const server = await createServer({
    root: viteThemeDir,
    base: "./",
    plugins: vitePlugins,
    resolve: {
      alias: { "@emulnk/sdk": path.join(ROOT, "sdk") },
    },
    server: {
      port: PORT,
      strictPort: false,
      host: true,
      open: false,
    },
  });

  await server.listen();
  printStartup(server.config.server.port!, themeFilter);
} else {
  // ── Mode 2: Plain HTTP server (device-only, no Vite HMR) ──

  const server = http.createServer((req, res) => {
    if (!handleRequest(req, res)) {
      res.writeHead(404, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
      res.end(JSON.stringify({ error: "not found" }));
      log(`GET ${req.url} → 404`);
    }
  });

  // Try PORT, then PORT+1, PORT+2, ... (same behavior as Vite's strictPort: false)
  let tryPort = PORT;
  const MAX_TRIES = 10;
  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE" && tryPort < PORT + MAX_TRIES) {
      tryPort++;
      server.listen(tryPort, "0.0.0.0");
    } else {
      throw err;
    }
  });
  server.on("listening", () => printStartup(tryPort));
  server.listen(tryPort, "0.0.0.0");
}
