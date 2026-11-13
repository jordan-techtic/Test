#!/usr/bin/env node
// validator-version: 8
// Validates every workflows/**/*.json (n8n export format). Node stdlib only.
//   node scripts/validate-workflows.mjs          -> structural + secret checks
//   node scripts/validate-workflows.mjs --lint   -> also canonical format + active=false
import { execFileSync } from "node:child_process";
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

const NODE_TYPE_RE = /^(n8n-nodes-base|@n8n\/n8n-nodes-langchain|n8n-nodes-[a-z0-9-]+|@[\w-]+\/n8n-nodes-[\w-]+)\.[A-Za-z][\w]*$/;
// Nodes that cannot fail on their own; a workflow made only of these needs no error handling.
const SAFE_TYPES = /\.(set|noOp|if|switch|merge|filter|stickyNote|respondToWebhook)$/i;
const NODE_REF_RE = /\$\(\s*(["'])(.+?)\1\s*\)|\$node\[\s*(["'])(.+?)\3\s*\]/g;
const ENV_REF_RE = /\$env(?:\.([A-Za-z_][A-Za-z0-9_]*)|\[\s*["']([A-Za-z_][A-Za-z0-9_]*)["']\s*\])/g;

// A placeholder host or address in a workflow is never right: it must come from $env.
const PLACEHOLDER_RE = /(?:[\w-]+\.)?example\.(?:com|org|net)\b|\.example(?=[\/:\s"']|$)|\blocalhost\b|\b127\.0\.0\.1\b|\b0\.0\.0\.0\b/i;
const ID_RE = /^[A-Za-z0-9_-]{1,36}$/;

// Resolve a reference to another workflow. n8n links workflows by ID, never by name.
function checkWorkflowRef(ref, label, ctx, errors) {
  if (ctx.workflowIds.has(ref)) return;
  const named = ctx.idByName.get(ref);
  if (ctx.workflowNames.has(ref)) {
    errors.push(
      `${label}: refers to workflow "${ref}" by name; n8n resolves workflows by id. ` +
        (named ? `Use its id "${named}".` : 'Give that workflow a top-level "id" and use it.'),
    );
  } else if (!ID_RE.test(ref)) {
    errors.push(`${label}: "${ref}" is not a workflow id from this repository`);
  }
  // An id-shaped value that matches no file may point at a workflow outside this repo: allowed.
}

// A recipient (chat, address, user, channel) that falls back to ONE fixed value from $env sends other
// people's messages to the wrong place whenever the real value is missing.
const RECIPIENT_KEY_RE = /^(chat[-_]?id|recipient\w*|to|toemail|to[-_]?address|email|user[-_]?id|phone\w*|channel\w*)$/i;
const FIXED_FALLBACK_RE = /(\?\?|\|\|)\s*\$env[.\[]/;

function checkRecipientFallbacks(params, label, errors) {
  const visit = (value, key) => {
    if (typeof value === "string") {
      if (RECIPIENT_KEY_RE.test(key || "") && FIXED_FALLBACK_RE.test(value)) {
        errors.push(
          `${label}: "${key}" falls back to a fixed value from $env when the real one is missing; ` +
            "stop or route to an error handler instead of sending to a fixed recipient",
        );
      }
    } else if (Array.isArray(value)) value.forEach((v) => visit(v, key));
    else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) visit(v, k);
  };
  visit(params, "");
}

// A caller that maps inputs into a sub-workflow must match what the sub-workflow's trigger declares;
// otherwise n8n drops the values and the sub-workflow runs on empty data.
function checkCallContract(node, label, ctx, errors) {
  const id = node.parameters && node.parameters.workflowId;
  const value = id && typeof id === "object" ? String(id.value ?? "") : String(id ?? "");
  const callee = ctx.byId.get(value);
  const mapped = node.parameters && node.parameters.workflowInputs && node.parameters.workflowInputs.value;
  if (!callee || !mapped || typeof mapped !== "object") return;
  const trigger = (callee.nodes || []).find((n) => n && /executeWorkflowTrigger$/i.test(String(n.type)));
  if (!trigger) return;
  const tp = trigger.parameters || {};
  if (tp.inputSource === "passthrough") return;
  const where = ctx.pathById.get(value) || callee.name;
  const passed = Object.keys(mapped);
  const declared = ((tp.workflowInputs && tp.workflowInputs.values) || []).map((v) => v && v.name).filter(Boolean);
  if (passed.length && declared.length === 0) {
    errors.push(
      `${label}: passes inputs [${passed.join(", ")}] but the called workflow "${callee.name}" (${where}) declares no ` +
        'inputs on its Execute Workflow Trigger, so the values are dropped; declare them in "workflowInputs.values"',
    );
    return;
  }
  const extra = passed.filter((k) => !declared.includes(k));
  const missing = declared.filter((k) => !passed.includes(k));
  if (extra.length) errors.push(`${label}: passes [${extra.join(", ")}] which "${callee.name}" (${where}) does not declare`);
  if (missing.length) errors.push(`${label}: "${callee.name}" (${where}) expects [${missing.join(", ")}] which this call does not pass`);
}

function readOptional(path) {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
}

function strings(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => strings(v, out));
  return out;
}

// Name a workflow call points at: a plain string, or a resource locator's cachedResultName / value.
function executeTarget(node) {
  const id = node.parameters && node.parameters.workflowId;
  if (typeof id === "string") return { value: id.trim(), name: "" };
  if (id && typeof id === "object") {
    return { value: String(id.value ?? "").trim(), name: String(id.cachedResultName ?? "").trim() };
  }
  return { value: "", name: "" };
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

function validate(data, errors, warnings, ctx, policy = errors) {
  const credTypesByName = new Map();
  if (typeof data.name !== "string" || !data.name.trim()) errors.push("missing name");
  if (data.id !== undefined) {
    if (typeof data.id !== "string" || !ID_RE.test(data.id)) {
      errors.push('workflow "id" must be a string of letters, digits, "-" or "_" (max 36 characters)');
    } else if (ctx.duplicateIds.has(data.id)) {
      errors.push(`workflow id "${data.id}" is used by more than one file`);
    }
  }
  if (typeof data.name === "string" && data.name.trim() && ctx.duplicateNames.has(data.name)) {
    errors.push(`workflow name "${data.name}" is used by more than one file; names must be unique (edit the existing workflow instead of copying it)`);
  }
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
    } else if (!NODE_TYPE_RE.test(node.type)) {
      errors.push(`${label}: unrecognised node type "${node.type}" (expected e.g. n8n-nodes-base.webhook)`);
    }
    if (typeof node.typeVersion !== "number") errors.push(`${label}: typeVersion must be a number`);
    else if (!(node.typeVersion > 0)) errors.push(`${label}: typeVersion must be greater than 0`);
    if (
      !Array.isArray(node.position) ||
      node.position.length !== 2 ||
      !node.position.every((n) => typeof n === "number")
    ) {
      errors.push(`${label}: position must be [x, y]`);
    }
    if (node.credentials && typeof node.credentials === "object") {
      for (const [credType, cred] of Object.entries(node.credentials)) {
        const used = cred && typeof cred.name === "string" ? cred.name.trim().toLowerCase() : "";
        if (used) {
          if (!credTypesByName.has(used)) credTypesByName.set(used, new Set());
          credTypesByName.get(used).add(credType);
        }
        const extra = Object.keys(cred || {}).filter((k) => k !== "id" && k !== "name");
        if (extra.length) errors.push(`${label}: credentials.${credType} may only contain id and name (found ${extra.join(", ")})`);
        const credName = cred && typeof cred.name === "string" ? cred.name.trim() : "";
        if (!credName) errors.push(`${label}: credentials.${credType} needs a name`);
        else if (ctx.credentialsDoc === null) errors.push(`${label}: uses credential "${credName}" but credentials.md is missing`);
        else if (!ctx.credentialsDoc.includes(credName.toLowerCase())) {
          errors.push(`${label}: credential "${credName}" is not documented in credentials.md`);
        }
      }
    }
    if (typeof node.type === "string" && /\.webhook$/i.test(node.type)) {
      const auth = node.parameters && node.parameters.authentication;
      if (!auth || auth === "none") errors.push(`${label}: inbound webhook must set an authentication method`);
    }
    if (typeof node.type === "string" && /\.executeWorkflow$/i.test(node.type)) {
      const target = executeTarget(node);
      const id = (node.parameters && node.parameters.workflowId) || {};
      if (!target.value) errors.push(`${label}: Execute Workflow must name the workflow it calls (by id)`);
      else if (id && typeof id === "object" && id.mode === "name") {
        errors.push(`${label}: workflowId mode "name" is not supported; use mode "id" with the workflow's id`);
      } else {
        checkWorkflowRef(target.value, label, ctx, errors);
        checkCallContract(node, label, ctx, errors);
      }
    }
    if (typeof node.parameters === "object" && node.parameters && !/stickyNote$/i.test(String(node.type))) {
      checkRecipientFallbacks(node.parameters, label, errors);
      const hit = strings(node.parameters).map((t) => t.match(PLACEHOLDER_RE)).find(Boolean);
      if (hit) {
        errors.push(
          `${label}: placeholder host/address "${hit[0]}"; read environment-specific values ` +
            "(base URLs, recipients) from $env.NAME and list NAME in .env.example",
        );
      }
    }
    checkSecrets(node, label, errors);
  });

  const triggers = data.nodes.filter((n) => n && isTrigger(n.type));
  if (triggers.length === 0) errors.push("no trigger node (webhook, schedule, cron or *Trigger)");
  else if (triggers.length > 1) errors.push(`${triggers.length} trigger nodes; a workflow must have exactly one`);

  const edges = new Map();
  const errorOutputTargets = new Set();
  const errorStarts = new Set();
  if (data.connections && typeof data.connections === "object") {
    for (const [source, outputs] of Object.entries(data.connections)) {
      if (!names.has(source)) errors.push(`connection source "${source}" is not a node`);
      for (const [outputType, branches] of Object.entries(outputs || {})) {
        if (outputType !== "main" && !/^ai_/.test(outputType)) {
          errors.push(
            `connection output "${outputType}" on "${source}" is not valid in n8n; ` +
              'use "main" (a node\'s error output is main output index 1)',
          );
        }
        (Array.isArray(branches) ? branches : []).forEach((branch, outputIndex) => {
          for (const edge of Array.isArray(branch) ? branch : []) {
            if (!edge || !names.has(edge.node)) {
              errors.push(`connection target "${edge && edge.node}" (from "${source}") is not a node`);
              continue;
            }
            if (!edges.has(source)) edges.set(source, new Set());
            edges.get(source).add(edge.node);
            const src = data.nodes.find((n) => n && n.name === source);
            if (src && src.onError === "continueErrorOutput" && outputIndex === 1) {
              errorOutputTargets.add(source);
              errorStarts.add(edge.node);
            }
          }
        });
      }
    }
  }

  // Every node must be reachable from the trigger; an unconnected node is dead code.
  const reachable = new Set(triggers.map((n) => n.name));
  const queue = [...reachable];
  while (queue.length) {
    for (const next of edges.get(queue.shift()) || []) {
      if (!reachable.has(next)) {
        reachable.add(next);
        queue.push(next);
      }
    }
  }
  for (const node of data.nodes) {
    if (!node || !node.name || node.disabled === true || /stickyNote$/i.test(String(node.type))) continue;
    if (!reachable.has(node.name)) errors.push(`node "${node.name}" is not connected to the trigger (dead node)`);
  }

  // Expression references must point at real nodes, and $env names must be documented.
  const text = strings(data.nodes.map((n) => n && n.parameters)).join("\n");
  for (const m of text.matchAll(NODE_REF_RE)) {
    const ref = m[2] ?? m[4];
    if (!names.has(ref)) errors.push(`expression refers to node "${ref}" which does not exist`);
  }
  const envNames = new Set([...text.matchAll(ENV_REF_RE)].map((m) => m[1] || m[2]));
  for (const name of envNames) {
    if (ctx.envExample === null) errors.push(`uses $env.${name} but .env.example is missing`);
    else if (!ctx.envExample.includes(name)) errors.push(`$env.${name} is not listed in .env.example`);
  }

  // Error handling: needed as soon as any node can fail. It must be real, not just a Set node.
  const risky = data.nodes.some(
    (n) => n && typeof n.type === "string" && !isTrigger(n.type) && !SAFE_TYPES.test(n.type),
  );
  // Errors are handled INSIDE the workflow that can fail. A separate error workflow (an Error Trigger
  // workflow, settings.errorWorkflow, or an error output that calls another workflow) doubles the number
  // of workflows to build and keep in sync, and its inputs silently drift out of step.
  if (data.nodes.some((n) => n && /errorTrigger$/i.test(String(n.type)))) {
    errors.push(
      "Error Trigger workflows are not used here; handle errors inside each workflow " +
        'with "onError": "continueErrorOutput" and a handler node in the same workflow',
    );
  }
  const errorRef = typeof (data.settings || {}).errorWorkflow === "string" ? data.settings.errorWorkflow.trim() : "";
  if (errorRef) {
    errors.push(
      `settings.errorWorkflow ("${errorRef}") points at a separate error workflow; ` +
        "remove it and handle errors inside this workflow with an error output and a handler node",
    );
  }
  const visited = new Set();
  const pending = [...errorStarts];
  while (pending.length) {
    const name = pending.shift();
    if (visited.has(name)) continue;
    visited.add(name);
    const node = data.nodes.find((n) => n && n.name === name);
    if (node && /executeWorkflow$/i.test(String(node.type))) {
      errors.push(
        `error output leads to Execute Workflow "${name}", i.e. a separate error workflow; ` +
          "replace it with a handler node inside this workflow (for example a Set node that records the stage " +
          "and message, then a notification node)",
      );
    }
    for (const next of edges.get(name) || []) pending.push(next);
  }
  for (const [credName, types] of credTypesByName) {
    if (types.size > 1) {
      errors.push(
        `credential name "${credName}" is used for different credential types (${[...types].join(", ")}); ` +
          "give each credential type its own name (for example 'Telegram Webhook Secret' and 'Telegram Bot') " +
          "and list each one separately in credentials.md",
      );
    }
  }
  // A node that fails on purpose (error output) is an outbound call, so it retries before it gives up.
  for (const node of data.nodes) {
    if (!node || node.onError !== "continueErrorOutput" || isTrigger(String(node.type)) || SAFE_TYPES.test(String(node.type))) continue;
    if (/executeWorkflow$/i.test(String(node.type))) continue; // the sub-workflow retries its own calls
    if (node.retryOnFail !== true) {
      policy.push(
        `node "${node.name}" has an error output but no retry; set "retryOnFail": true, "maxTries": 3 and ` +
          '"waitBetweenTries": 5000 so one transient failure does not reach the error path',
      );
    }
  }
  // The end of an error path must not swallow the failure: a No-Op there makes it vanish without a trace.
  for (const name of visited) {
    const node = data.nodes.find((n) => n && n.name === name);
    if (node && /\.noOp$/i.test(String(node.type)) && !(edges.get(name) || new Set()).size) {
      policy.push(
        `error path ends in the No-Op "${name}", so a failure of the error handler is silently lost; ` +
          'end it with a "Stop and Error" node (n8n-nodes-base.stopAndError) so the execution is marked failed',
      );
    }
  }
  // On an error output, `error` is only the message TEXT: the failing node, name, HTTP code, description and
  // stack are not on the item, so reading them always gives an empty value (and a stack or vendor body would leak).
  for (const node of data.nodes) {
    if (!node || /stickyNote$/i.test(String(node.type))) continue;
    for (const value of strings(node.parameters)) {
      const bad = value.match(/\$json\.error\??\.(node|httpCode|statusCode|name|stack|description|cause|code)\b/);
      if (bad) {
        errors.push(
          `node "${node.name}" reads $json.error.${bad[1]}, which does not exist: on an error output "error" is only the ` +
            "message text, so this is always empty. Use String($json.error ?? 'unknown error').slice(0, 200) and write the " +
            "failing node's name into the handler itself (one handler per failing node, or a fixed 'stage' value)",
        );
        break;
      }
    }
  }
  // "Log ..." nodes that only write fields into the run record nothing: n8n does not keep successful runs by default.
  for (const node of data.nodes) {
    if (!node || !/\.(set|noOp)$/i.test(String(node.type)) || visited.has(node.name)) continue;
    if (!/\b(log|audit|analytics|track)/i.test(String(node.name))) continue;
    const next = [...(edges.get(node.name) || [])].map((n) => data.nodes.find((x) => x && x.name === n));
    if (!next.some((n) => n && !SAFE_TYPES.test(String(n.type)))) {
      warnings.push(
        `node "${node.name}" is named as a log but only sets fields in the run; nothing is stored. ` +
          "Send it to a real destination (HTTP Request, database, Google Sheets) or rename it and say so in the PR",
      );
    }
  }

  // ── Production rules ────────────────────────────────────────────────────────────────────────
  const settings = data.settings && typeof data.settings === "object" ? data.settings : {};
  for (const node of data.nodes) {
    if (!node || !node.name) continue;
    // n8n silently clamps built-in retries to 5 tries and 5 s; anything longer needs a Wait loop.
    if (node.retryOnFail === true) {
      const tries = node.maxTries ?? 3;
      const wait = node.waitBetweenTries ?? 1000;
      if (typeof tries !== "number" || tries < 2 || tries > 5) {
        errors.push(`node "${node.name}": maxTries must be 2-5 (n8n caps it at 5); for longer back-off use a Wait node in a bounded retry loop`);
      }
      if (typeof wait !== "number" || wait < 0 || wait > 5000) {
        errors.push(`node "${node.name}": waitBetweenTries must be 0-5000 ms (n8n caps it at 5000); for longer back-off use a Wait node in a bounded retry loop`);
      }
    }
    // An HTTP call without a timeout can hang the execution (and a webhook caller) indefinitely.
    if (/\.httpRequest$/i.test(String(node.type))) {
      const timeout = node.parameters && node.parameters.options && node.parameters.options.timeout;
      if (!(typeof timeout === "number" && timeout > 0) && !(typeof timeout === "string" && timeout.startsWith("="))) {
        policy.push(`HTTP Request "${node.name}" has no timeout; set parameters.options.timeout (ms, for example 10000)`);
      }
    }
  }
  if (!(typeof settings.executionTimeout === "number" && settings.executionTimeout > 0)) {
    policy.push("settings.executionTimeout is not set; give the workflow a run time limit in seconds (for example 300) so a stuck run is stopped");
  }
  if (triggers.some((n) => /(scheduleTrigger|\.cron)$/i.test(String(n.type))) && !String(settings.timezone || "").trim()) {
    policy.push('scheduled workflow has no settings.timezone; set it (for example "Europe/London") so the schedule does not follow the server clock');
  }
  if (triggers.some((n) => /executeWorkflowTrigger$/i.test(String(n.type))) && settings.callerPolicy === "any") {
    policy.push('sub-workflow allows any caller (settings.callerPolicy "any"); use "workflowsFromSameOwner" or "workflowsFromAList" with callerIds');
  }
  // A webhook that answers from a Respond to Webhook node must answer on the error path too,
  // or the caller waits until its own timeout.
  const responds = triggers.some(
    (n) => /\.webhook$/i.test(String(n.type)) && n.parameters && n.parameters.responseMode === "responseNode",
  );
  if (responds && errorStarts.size) {
    const answered = [...visited].some((name) => {
      const node = data.nodes.find((n) => n && n.name === name);
      return node && /respondToWebhook$/i.test(String(node.type));
    });
    if (!answered) {
      errors.push(
        'the webhook replies through a "Respond to Webhook" node, but no error path reaches one; ' +
          "add a Respond to Webhook node (for example status 500 or 503) to the error path so the caller is not left waiting",
      );
    }
  }
  // Loops: every cycle needs a node that decides to leave it, and a retry loop (one with a Wait)
  // needs an attempt limit, otherwise a permanent failure loops forever.
  const color = new Map();
  const stack = [];
  const cycles = [];
  const dfs = (name) => {
    color.set(name, 1);
    stack.push(name);
    for (const next of edges.get(name) || []) {
      if (color.get(next) === 1) cycles.push(stack.slice(stack.indexOf(next)));
      else if (!color.get(next)) dfs(next);
    }
    stack.pop();
    color.set(name, 2);
  };
  for (const name of names) if (!color.get(name)) dfs(name);
  for (const cycle of cycles) {
    const nodes = cycle.map((name) => data.nodes.find((n) => n && n.name === name)).filter(Boolean);
    const deciders = nodes.filter((n) => /\.(if|switch|filter|splitInBatches)$/i.test(String(n.type)));
    const label = cycle.join(" -> ");
    if (!deciders.length) {
      errors.push(`loop ${label} has no IF, Switch or Loop Over Items node to leave it, so it never ends`);
      continue;
    }
    if (nodes.some((n) => /\.wait$/i.test(String(n.type)))) {
      const bounded = deciders.some((n) => /\$runIndex|attempt|retr|tries|count/i.test(strings(n.parameters).join(" ")));
      if (!bounded) {
        errors.push(
          `retry loop ${label} has no attempt limit; make its IF check an attempt counter (for example {{ $runIndex }} < 5) ` +
            "and send the last failure to the error handler",
        );
      }
    }
  }
  if (risky && errorOutputTargets.size === 0) {
    errors.push(
      'no working error handling: give a node that can fail "onError": "continueErrorOutput" and connect its ' +
        "error output (output 2) to a handler node in this workflow",
    );
  }
}

const files = findWorkflowFiles(WORKFLOWS_DIR);
if (files.length === 0) {
  console.error("FAIL: no workflow files found under workflows/**/*.json");
  process.exit(1);
}

const parsed = new Map();
for (const file of files) {
  try {
    parsed.set(file, JSON.parse(readFileSync(file, "utf8")));
  } catch {
    /* reported per file below */
  }
}
const credentialsRaw = readOptional(join(ROOT, "credentials.md"));
const nameCounts = new Map();
for (const d of parsed.values()) {
  if (d && typeof d.name === "string" && d.name.trim()) {
    nameCounts.set(d.name, (nameCounts.get(d.name) || 0) + 1);
  }
}
const idCounts = new Map();
const idByName = new Map();
for (const d of parsed.values()) {
  if (d && typeof d.id === "string") idCounts.set(d.id, (idCounts.get(d.id) || 0) + 1);
  if (d && typeof d.id === "string" && typeof d.name === "string") idByName.set(d.name, d.id);
}
const byId = new Map();
const pathById = new Map();
for (const [file, d] of parsed.entries()) {
  if (d && typeof d.id === "string") {
    byId.set(d.id, d);
    pathById.set(d.id, relative(ROOT, file));
  }
}
const ctx = {
  byId,
  pathById,
  duplicateIds: new Set([...idCounts].filter(([, n]) => n > 1).map(([id]) => id)),
  workflowIds: new Set(idCounts.keys()),
  idByName,
  duplicateNames: new Set([...nameCounts].filter(([, n]) => n > 1).map(([name]) => name)),
  workflowNames: new Set([...parsed.values()].map((d) => d && d.name).filter(Boolean)),
  credentialsDoc: credentialsRaw === null ? null : credentialsRaw.toLowerCase(),
  envExample: readOptional(join(ROOT, ".env.example")),
};

// Production rules are enforced on the workflows this branch adds or changes; untouched workflows
// only get warnings, so one ticket is not forced to rewrite every older workflow in the repository.
function changedWorkflowFiles() {
  const git = (...args) => execFileSync("git", ["-C", ROOT, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  try {
    git("rev-parse", "--git-dir");
  } catch {
    return null; // not a git checkout: enforce everything
  }
  const refs = [process.env.N8N_BASE_REF, "refs/n8n-index/base", "origin/HEAD", "origin/main", "origin/master", "main", "master"];
  let base = null;
  for (const ref of refs.filter(Boolean)) {
    try {
      base = git("merge-base", "HEAD", ref);
      break;
    } catch {
      /* try the next one */
    }
  }
  if (!base) return null;
  const out = new Set();
  const add = (text) => text.split("\n").map((l) => l.trim()).filter(Boolean).forEach((l) => out.add(l));
  try {
    add(git("diff", "--name-only", base, "--", "workflows"));
    add(git("ls-files", "--others", "--exclude-standard", "--", "workflows"));
  } catch {
    return null;
  }
  return out;
}
const changed = process.env.N8N_STRICT_ALL === "1" ? null : changedWorkflowFiles();

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
    const policy = [];
    validate(data, errors, warnings, ctx, policy);
    if (changed === null || changed.has(rel.split("\\").join("/"))) errors.push(...policy);
    else warnings.push(...policy.map((m) => `${m} (production rule; enforced once this workflow is edited)`));
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
