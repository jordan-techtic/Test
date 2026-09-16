import fs from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { rootCss } from "./src/theme/tokens";

function writeThemeTokensCss(): void {
  const outFile = path.resolve(__dirname, "src/theme/tokens.css");
  const contents = `/* Generated from src/theme/tokens.ts — edit tokens.ts only. */\n${rootCss()}`;
  fs.writeFileSync(outFile, contents);
}

function themeTokensCssPlugin(): Plugin {
  return {
    name: "theme-tokens-css",
    buildStart() {
      writeThemeTokensCss();
    },
    configureServer() {
      writeThemeTokensCss();
    },
    transformIndexHtml(html) {
      const style = `<style id="theme-tokens">${rootCss()}</style>`;
      return html.replace("<head>", `<head>\n    ${style}`);
    },
  };
}

writeThemeTokensCss();

export default defineConfig({
  plugins: [themeTokensCssPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3033,
    host: true,
  },
});
