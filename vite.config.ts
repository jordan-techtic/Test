import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';

const validationApiProxyTarget =
  (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } })
    .process?.env?.LUNA_VALIDATION_API_PROXY_TARGET ?? 'http://127.0.0.1:3000';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: validationApiProxyTarget,
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5173,
  },
});
