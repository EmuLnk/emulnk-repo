import { glob } from "glob";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROFILES_DIR = path.join(ROOT, "profiles");

const HEX_RE = /^0x[0-9A-Fa-f]+$/;
const VALID_TYPES = new Set([
  "u8", "u16_le", "u16_be", "u32_le", "u32_be", "float_le", "float_be", "bytes",
]);
const TYPE_SIZES: Record<string, number> = {
  u8: 1, u16_le: 2, u16_be: 2, u32_le: 4, u32_be: 4, float_le: 4, float_be: 4,
};

const files = (await glob("*.json", { cwd: PROFILES_DIR })).filter(f => !f.endsWith(".mock.json")).sort();
let failed = 0;

for (const file of files) {
  const errors: string[] = [];
  const profile = JSON.parse(fs.readFileSync(path.join(PROFILES_DIR, file), "utf-8"));

  if (!profile.id || typeof profile.id !== "string") errors.push("missing id");
  if (!profile.name || typeof profile.name !== "string") errors.push("missing name");
  if (!profile.platform || typeof profile.platform !== "string") errors.push("missing platform");
  const isExtension = typeof profile.extends === "string";
  if (!isExtension && (!Array.isArray(profile.gameIds) || profile.gameIds.length === 0)) {
    errors.push("gameIds must be a non-empty array");
  }

  const bundles: Record<string, any> = profile.bundles ?? {};
  for (const [key, bundle] of Object.entries(bundles) as [string, any][]) {
    if (!bundle.base && !bundle.pointer) errors.push(`bundles.${key}: must have 'base' or 'pointer'`);
    if (bundle.base) {
      if (typeof bundle.base === "string") {
        if (!HEX_RE.test(bundle.base)) errors.push(`bundles.${key}.base is not a valid hex address`);
      } else if (typeof bundle.base === "object") {
        for (const [gameId, addr] of Object.entries(bundle.base) as [string, any][]) {
          if (typeof addr !== "string" || !HEX_RE.test(addr)) {
            errors.push(`bundles.${key}.base['${gameId}'] is not a valid hex address`);
          }
        }
      }
    }
    if (bundle.pointer && !HEX_RE.test(bundle.pointer)) errors.push(`bundles.${key}.pointer is not a valid hex address`);
    if (bundle.pollRate !== undefined) {
      const validRates = ["high", "medium", "low"];
      if (!validRates.includes(bundle.pollRate)) {
        errors.push(`bundles.${key}.pollRate must be "high", "medium", or "low"`);
      }
    }
  }

  const seenIds = new Set<string>();
  for (let i = 0; i < (profile.dataPoints ?? []).length; i++) {
    const dp = profile.dataPoints[i];
    const label = `dataPoints[${i}]`;
    if (!dp.id || typeof dp.id !== "string") { errors.push(`${label}: missing id`); continue; }
    const p = `${label} '${dp.id}'`;
    if (seenIds.has(dp.id)) errors.push(`${p}: duplicate id`);
    seenIds.add(dp.id);
    if (!VALID_TYPES.has(dp.type)) errors.push(`${p}: unknown type '${dp.type}'`);
    if (typeof dp.size !== "number" || dp.size <= 0) errors.push(`${p}: invalid size`);
    if (dp.type in TYPE_SIZES && dp.size !== TYPE_SIZES[dp.type]) {
      errors.push(`${p}: type '${dp.type}' expects size ${TYPE_SIZES[dp.type]}, got ${dp.size}`);
    }
    if (!(dp.bundle in bundles)) errors.push(`${p}: bundle '${dp.bundle}' not in bundles`);
    if (!HEX_RE.test(dp.offset)) errors.push(`${p}: offset '${dp.offset}' is not a valid hex address`);
  }

  // Validate transforms (optional)
  if (profile.transforms !== undefined) {
    if (!Array.isArray(profile.transforms)) {
      errors.push("transforms must be an array");
    } else {
      const transformIds = new Set<string>();
      for (let t = 0; t < profile.transforms.length; t++) {
        const tr = profile.transforms[t];
        const tLabel = `transforms[${t}]`;
        if (!tr.id || typeof tr.id !== "string") { errors.push(`${tLabel}: missing id`); continue; }
        if (transformIds.has(tr.id)) errors.push(`${tLabel} '${tr.id}': duplicate id`);
        transformIds.add(tr.id);
        if (!Array.isArray(tr.inputs)) {
          errors.push(`${tLabel} '${tr.id}': inputs must be an array`);
        } else {
          for (const inp of tr.inputs) {
            if (!seenIds.has(inp)) errors.push(`${tLabel} '${tr.id}': input '${inp}' not found in dataPoints`);
          }
        }
        if (tr.after !== undefined) {
          if (!Array.isArray(tr.after)) {
            errors.push(`${tLabel} '${tr.id}': after must be an array`);
          } else {
            for (const dep of tr.after) {
              if (!transformIds.has(dep) && !profile.transforms.some((x: any) => x.id === dep)) {
                errors.push(`${tLabel} '${tr.id}': after '${dep}' not found in transforms`);
              }
            }
          }
        }
      }

      // Cycle detection via DFS
      const adj = new Map<string, string[]>();
      for (const tr of profile.transforms) {
        adj.set(tr.id, tr.after ?? []);
      }
      const visited = new Set<string>();
      const stack = new Set<string>();
      function hasCycle(id: string): boolean {
        if (stack.has(id)) return true;
        if (visited.has(id)) return false;
        visited.add(id);
        stack.add(id);
        for (const dep of adj.get(id) ?? []) {
          if (hasCycle(dep)) return true;
        }
        stack.delete(id);
        return false;
      }
      for (const tr of profile.transforms) {
        if (hasCycle(tr.id)) {
          errors.push(`transforms: cycle detected involving '${tr.id}'`);
          break;
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(`[FAIL] ${file}`);
    for (const e of errors) console.error(`  ${e}`);
    failed++;
  } else {
    console.log(`[PASS] ${file}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} profile(s) failed validation.`);
  process.exit(1);
}

console.log(`\nAll ${files.length} profiles passed.`);
