#!/usr/bin/env node
// Rewrites every workflows/**/*.json as JSON.stringify(data, null, 2) + "\n". Node stdlib only.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function findWorkflowFiles(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries.sort()) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...findWorkflowFiles(full));
    else if (entry.endsWith(".json")) files.push(full);
  }
  return files;
}

const files = findWorkflowFiles(join(ROOT, "workflows"));
let changed = 0;
let failed = 0;
for (const file of files) {
  const rel = relative(ROOT, file);
  const raw = readFileSync(file, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error(`SKIP ${rel}: invalid JSON (${e.message})`);
    failed += 1;
    continue;
  }
  const out = JSON.stringify(data, null, 2) + "\n";
  if (out !== raw) {
    writeFileSync(file, out);
    changed += 1;
    console.log(`formatted ${rel}`);
  }
}
console.log(`${files.length} file(s) checked, ${changed} formatted${failed ? `, ${failed} could not be parsed` : ""}`);
process.exit(failed ? 1 : 0);
