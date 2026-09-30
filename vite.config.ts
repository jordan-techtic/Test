import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

/** Luna compiled spec text emit (Dashboard/Nav/Vertical): Studio Content Library Tools New Features AI Credit Usage Current */

function resolveViteApiBaseUrl(mode: string): string {
  const env = loadEnv(mode, process.cwd(), '');
  let base = (env.VITE_API_BASE_URL || 'http://127.0.0.1:3000/api').trim().replace(/\/$/, '');
  if (!/^https?:\/\//i.test(base)) {
    base = 'http://127.0.0.1:3000/api';
  } else if (/:(41000|5173)(\/|$)/.test(base)) {
    base = 'http://127.0.0.1:3000';
  }
  if (!base.endsWith('/api')) {
    base = `${base}/api`;
  }
  return base;
}

export default defineConfig(({ mode }) => {
  const apiBaseUrl = resolveViteApiBaseUrl(mode);
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(apiBaseUrl),
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.LUNA_VALIDATION_API_PROXY_TARGET || 'http://127.0.0.1:3000',
          changeOrigin: true,
          secure: false,
        },
      },
      port: 5173,
    },
  };
});
