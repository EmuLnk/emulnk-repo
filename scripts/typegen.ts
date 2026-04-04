import { glob } from "glob";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROFILES_DIR = path.join(ROOT, "profiles");
const OUT_DIR = path.join(ROOT, "sdk", "generated");

function toInterfaceName(id: string): string {
  return id.split(/[_-]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("") + "Values";
}

function tsType(type: string): string {
  return type === "bytes" ? "string" : "number";
}

function buildInterface(profile: any): string {
  const ifName = toInterfaceName(profile.id);
  const lines: string[] = [
    `// Auto-generated from profiles/${profile.id}.json. Do not edit.`,
    `export interface ${ifName} {`,
  ];
  for (const dp of profile.dataPoints) {
    const t = tsType(dp.type);
    const detail = dp.type === "bytes"
      ? `bytes (${dp.size}B), bundle:${dp.bundle}+${dp.offset}`
      : `${dp.type}, bundle:${dp.bundle}+${dp.offset}`;
    if (dp.description) {
      lines.push(`  /** ${dp.description} (${detail}) */`);
    }
    lines.push(`  ${dp.id}: ${t};`);
  }
  lines.push(`}`);
  return lines.join("\n") + "\n";
}

function buildAugmentedInterface(profile: any): string | null {
  if (!Array.isArray(profile.transforms) || profile.transforms.length === 0) return null;
  const baseName = toInterfaceName(profile.id);
  const augName = baseName.replace(/Values$/, "AugmentedValues");
  const lines: string[] = [
    ``,
    `export interface ${augName} extends ${baseName} {`,
  ];
  for (const tr of profile.transforms) {
    lines.push(`  ${tr.id}?: unknown;`);
  }
  lines.push(`}`);
  return lines.join("\n") + "\n";
}

const filterArg = process.argv.includes("--profile")
  ? process.argv[process.argv.indexOf("--profile") + 1]
  : null;

const allFiles = (await glob("*.json", { cwd: PROFILES_DIR })).filter(f => !f.endsWith(".mock.json")).sort();
const files = filterArg ? allFiles.filter(f => f === `${filterArg}.json`) : allFiles;

if (filterArg && files.length === 0) {
  console.error(`Profile '${filterArg}' not found.`);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const generated: { id: string; ifName: string }[] = [];

for (const file of files) {
  const profile = JSON.parse(fs.readFileSync(path.join(PROFILES_DIR, file), "utf-8"));
  const ifName = toInterfaceName(profile.id);
  let content = buildInterface(profile);
  const augmented = buildAugmentedInterface(profile);
  if (augmented) content += augmented;
  fs.writeFileSync(path.join(OUT_DIR, `${profile.id}.ts`), content);
  generated.push({ id: profile.id, ifName });
  console.log(`  generated ${profile.id}.ts (${profile.dataPoints.length} fields)`);
}

if (!filterArg) {
  const allGenerated = allFiles.map(f => {
    const profile = JSON.parse(fs.readFileSync(path.join(PROFILES_DIR, f), "utf-8"));
    const ifName = toInterfaceName(profile.id);
    const hasTransforms = Array.isArray(profile.transforms) && profile.transforms.length > 0;
    return { id: profile.id, ifName, hasTransforms };
  });
  const barrel = allGenerated
    .map(({ id, ifName, hasTransforms }) => {
      const augName = ifName.replace(/Values$/, "AugmentedValues");
      return hasTransforms
        ? `export type { ${ifName}, ${augName} } from "./${id}.js";`
        : `export type { ${ifName} } from "./${id}.js";`;
    })
    .join("\n") + "\n";
  fs.writeFileSync(path.join(OUT_DIR, "index.ts"), barrel);
  console.log(`  generated index.ts`);
}

console.log(`\nDone.`);
