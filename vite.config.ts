import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.LUNA_VALIDATION_API_PROXY_TARGET || 'http://174.138.72.184:8989',
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5173,
    host: true,
  },
});
