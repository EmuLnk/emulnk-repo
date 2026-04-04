import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROFILES_DIR = path.join(ROOT, "profiles");

const profileArg = process.argv.includes("--profile")
  ? process.argv[process.argv.indexOf("--profile") + 1]
  : null;

if (!profileArg) {
  console.error("Usage: pnpm profile:info --profile <id>");
  process.exit(1);
}

const profilePath = path.join(PROFILES_DIR, `${profileArg}.json`);
if (!fs.existsSync(profilePath)) {
  console.error(`Profile '${profileArg}' not found.`);
  process.exit(1);
}

const profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));
const bundles = profile.bundles as Record<string, any>;
const dataPoints = profile.dataPoints as any[];
const bundleKeys = Object.keys(bundles);

console.log(`Profile: ${profile.id} [${profile.name}] (${profile.platform})`);
console.log(`Game IDs: ${profile.gameIds.join(", ")}`);
console.log(`Bundles (${bundleKeys.length}):`);
for (const key of bundleKeys) {
  const b = bundles[key];
  const addr = b.base ? `base: ${b.base}` : `pointer: ${b.pointer}`;
  console.log(`  ${key.padEnd(20)} ${addr}`);
}

console.log(`Data Points (${dataPoints.length}):`);
for (const dp of dataPoints) {
  const loc = `bundle:${dp.bundle}+${dp.offset}`;
  const desc = dp.description ? `"${dp.description}"` : dp.type === "bytes" ? `size:${dp.size}` : "";
  console.log(`  ${dp.id.padEnd(24)} ${dp.type.padEnd(8)} ${loc.padEnd(30)} ${desc}`);
}

const totalBytes = dataPoints.reduce((acc, dp) => acc + dp.size, 0);
console.log(`Total read size: ~${(totalBytes / 1024).toFixed(1)} KB`);
