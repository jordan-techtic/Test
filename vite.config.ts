import { defineConfig, type Plugin } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';
import path from 'node:path';

/** Re-emit compiled ScreenSpec fill tokens (node fill_color). */
const SCREEN_SPEC_FILLS = {
  accent10: 'rgba(200, 164, 126, 0.1)',
} as const;

function screenSpecFillPlugin(): Plugin {
  return {
    name: 'luna-screen-spec-fill',
    transform(code, id) {
      if (id.endsWith('tokens.css')) {
        return code.replace(
          ':root {',
          `:root {\n  --color-accent-10: ${SCREEN_SPEC_FILLS.accent10};`,
        );
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), screenSpecFillPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://174.138.72.184:4040',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
