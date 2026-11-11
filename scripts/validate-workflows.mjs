#!/usr/bin/env node
// Validates every workflows/**/*.json (n8n export format). Node stdlib only.
//   node scripts/validate-workflows.mjs          -> structural + secret checks
//   node scripts/validate-workflows.mjs --lint   -> also canonical format + active=false
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const WORKFLOWS_DIR = join(ROOT, "workflows");
const LINT = process.argv.includes("--lint");

const SECRET_PATTERNS = [
  /sk-[A-Za-z0-9_-]{16,}/,
  /sk_live_[A-Za-z0-9]+/,
  /xox[a-z]-[A-Za-z0-9-]{8,}/,
  /ghp_[A-Za-z0-9]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /PRIVATE KEY/,
];
const SECRET_KEY_RE = /(api[-_]?key|token|secret|password)/i;
// "Respond to Webhook" replies to a trigger; it is not one.
const NOT_A_TRIGGER = /respondtowebhook/i;

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

function isTrigger(type) {
  const t = String(type || "");
  return !NOT_A_TRIGGER.test(t) && /(trigger|webhook|cron|schedule)/i.test(t);
}

function walk(value, path, visit) {
  if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`, visit));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`, visit);
  }
  visit(value, path);
}

function checkSecrets(node, label, errors) {
  const params = node.parameters;
  if (!params || typeof params !== "object") return;
  const walkEntries = (value, path) => {
    if (Array.isArray(value)) return value.forEach((v, i) => walkEntries(v, `${path}[${i}]`));
    if (value && typeof value === "object") {
      for (const [k, v] of Object.entries(value)) {
        if (typeof v === "string" && v !== "" && SECRET_KEY_RE.test(k) && !v.startsWith("=")) {
          errors.push(`${label}: literal value under "${k}" (${path}.${k}); use an n8n credential or an expression`);
        }
        walkEntries(v, `${path}.${k}`);
      }
    }
  };
  walkEntries(params, "parameters");
  walk(params, "parameters", (v, path) => {
    if (typeof v !== "string") return;
    for (const re of SECRET_PATTERNS) {
      if (re.test(v)) errors.push(`${label}: value at ${path} looks like a secret (${re})`);
    }
  });
}

function validate(data, errors, warnings) {
  if (typeof data.name !== "string" || !data.name.trim()) errors.push("missing name");
  if (!Array.isArray(data.nodes) || data.nodes.length === 0) {
    errors.push("nodes must be a non-empty array");
    return;
  }
  if (!data.connections || typeof data.connections !== "object" || Array.isArray(data.connections)) {
    errors.push("connections must be an object");
  }

  const names = new Set();
  const ids = new Set();
  data.nodes.forEach((node, i) => {
    const label = `node[${i}]${node && node.name ? ` "${node.name}"` : ""}`;
    if (!node || typeof node !== "object") return errors.push(`${label}: not an object`);
    if (typeof node.name !== "string" || !node.name) errors.push(`${label}: missing name`);
    else if (names.has(node.name)) errors.push(`${label}: duplicate node name`);
    else names.add(node.name);
    if (node.id === undefined || node.id === null || node.id === "") errors.push(`${label}: missing id`);
    else if (ids.has(String(node.id))) errors.push(`${label}: duplicate node id ${node.id}`);
    else ids.add(String(node.id));
    if (typeof node.type !== "string" || !node.type.includes(".")) {
      errors.push(`${label}: type must contain a "." (e.g. n8n-nodes-base.webhook)`);
    }
    if (typeof node.typeVersion !== "number") errors.push(`${label}: typeVersion must be a number`);
    if (
      !Array.isArray(node.position) ||
      node.position.length !== 2 ||
      !node.position.every((n) => typeof n === "number")
    ) {
      errors.push(`${label}: position must be [x, y]`);
    }
    if (node.credentials && typeof node.credentials === "object") {
      for (const [credType, cred] of Object.entries(node.credentials)) {
        const extra = Object.keys(cred || {}).filter((k) => k !== "id" && k !== "name");
        if (extra.length) errors.push(`${label}: credentials.${credType} may only contain id and name (found ${extra.join(", ")})`);
      }
    }
    checkSecrets(node, label, errors);
  });

  const triggers = data.nodes.filter((n) => n && isTrigger(n.type));
  if (triggers.length === 0) errors.push("no trigger node (webhook, schedule, cron or *Trigger)");
  else if (triggers.length > 1) warnings.push(`${triggers.length} trigger nodes; workflows should have exactly one`);

  const incoming = new Set();
  if (data.connections && typeof data.connections === "object") {
    for (const [source, outputs] of Object.entries(data.connections)) {
      if (!names.has(source)) errors.push(`connection source "${source}" is not a node`);
      for (const branches of Object.values(outputs || {})) {
        for (const branch of Array.isArray(branches) ? branches : []) {
          for (const edge of Array.isArray(branch) ? branch : []) {
            if (!edge || !names.has(edge.node)) errors.push(`connection target "${edge && edge.node}" (from "${source}") is not a node`);
            else incoming.add(edge.node);
          }
        }
      }
    }
  }
  for (const node of data.nodes) {
    if (!node || !node.name || isTrigger(node.type) || /stickyNote$/i.test(String(node.type))) continue;
    if (!incoming.has(node.name)) warnings.push(`node "${node.name}" has no incoming connection`);
  }
}

const files = findWorkflowFiles(WORKFLOWS_DIR);
if (files.length === 0) {
  console.error("FAIL: no workflow files found under workflows/**/*.json");
  process.exit(1);
}

let failed = 0;
let warned = 0;
for (const file of files) {
  const rel = relative(ROOT, file);
  const errors = [];
  const warnings = [];
  const raw = readFileSync(file, "utf8");
  let data = null;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    errors.push(`invalid JSON: ${e.message}`);
  }
  if (data && typeof data === "object" && !Array.isArray(data)) {
    validate(data, errors, warnings);
    if (LINT) {
      if (raw !== JSON.stringify(data, null, 2) + "\n") errors.push("not formatted; run npm run format");
      if (data.active === true) errors.push('"active" must be false');
    }
  } else if (data !== null) {
    errors.push("workflow must be a JSON object");
  }
  console.log(`${errors.length ? "FAIL" : "PASS"} ${rel}`);
  errors.forEach((m) => console.log(`  error: ${m}`));
  warnings.forEach((m) => console.log(`  warn: ${m}`));
  if (errors.length) failed += 1;
  warned += warnings.length;
}

// Jest-style summary line: Alex's verification parses "Tests: N failed, N passed, N total".
const passedCount = files.length - failed;
console.log(
  `\nTests:       ${failed ? `${failed} failed, ` : ""}${passedCount} passed, ${files.length} total` +
    `${warned ? ` (${warned} warning(s))` : ""}${LINT ? " (lint)" : ""}`,
);
process.exit(failed ? 1 : 0);
