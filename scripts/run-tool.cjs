const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const tool = process.argv[2];
const args = process.argv.slice(3);
const root = path.resolve(__dirname, "..");

const bins = {
  tsc: path.join(root, "node_modules", "typescript", "bin", "tsc"),
  eslint: path.join(root, "node_modules", "eslint", "bin", "eslint.js"),
  vite: path.join(root, "node_modules", "vite", "bin", "vite.js"),
};

function ensureInstalled(binPath) {
  if (fs.existsSync(binPath)) {
    return;
  }
  const install = spawnSync("npm", ["install", "--include=dev", "--include=prod"], {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (install.status !== 0) {
    process.exit(install.status ?? 1);
  }
}

const binPath = bins[tool];
if (!binPath) {
  console.error(`Unknown tool: ${tool}`);
  process.exit(1);
}

ensureInstalled(binPath);

if (!fs.existsSync(binPath)) {
  console.error(`Missing ${tool} at ${binPath}. Run npm install.`);
  process.exit(1);
}

const result = spawnSync(process.execPath, [binPath, ...args], {
  cwd: root,
  stdio: "inherit",
});
process.exit(result.status ?? 1);
