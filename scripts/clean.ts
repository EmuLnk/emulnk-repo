import { glob } from "glob";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");

const targets = [
  path.join(ROOT, "release"),
  ...(await glob("{themes,starters}/**/dist", { cwd: ROOT, absolute: true })),
];

let removed = 0;

for (const target of targets) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true });
    console.log(`  removed ${path.relative(ROOT, target)}/`);
    removed++;
  }
}

console.log(removed > 0 ? `\nCleaned ${removed} directories.` : "Nothing to clean.");
