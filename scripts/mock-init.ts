import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROFILES_DIR = path.join(ROOT, "profiles");

const profileArg = process.argv.includes("--profile")
  ? process.argv[process.argv.indexOf("--profile") + 1]
  : null;

if (!profileArg) {
  console.error("Usage: pnpm mock:init --profile <id>");
  process.exit(1);
}

const profilePath = path.join(PROFILES_DIR, `${profileArg}.json`);
if (!fs.existsSync(profilePath)) {
  console.error(`Profile '${profileArg}' not found.`);
  process.exit(1);
}

const outPath = path.join(PROFILES_DIR, `${profileArg}.mock.json`);
if (fs.existsSync(outPath)) {
  console.log(`Already exists: profiles/${profileArg}.mock.json, skipping.`);
  process.exit(0);
}

const profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));
const values: Record<string, unknown> = {};
for (const dp of profile.dataPoints ?? []) {
  values[dp.id] = dp.type === "bytes" ? "" : 0;
}

const mock = [
  { label: "Connected", isConnected: true, values, settings: {} },
  { label: "Disconnected", isConnected: false, values: {}, settings: {} },
];

fs.writeFileSync(outPath, JSON.stringify(mock, null, 2));
console.log(`Created profiles/${profileArg}.mock.json (${profile.dataPoints?.length ?? 0} fields)`);
