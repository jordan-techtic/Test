import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

/** Compiled frame shell opacity + child nav bitmaps (not parent-section crops). */
function lunaFigmaCompileFixesPlugin(): Plugin {
  return {
    name: 'luna-figma-compile-fixes',
    transform(code, id) {
      if (id.includes('FigmaFrameShell.tsx')) {
        return code.replace(
          'className={`relative box-border overflow-hidden ${className}`}',
          'className={`relative box-border overflow-hidden opacity-[0.98] ${className}`}',
        );
      }
      if (id.includes('FigmaScreenPage.tsx')) {
        return code
          .replace(
            'data-figma-node="3158:22263" src="/assets/figma/3158-22263.png"',
            'data-figma-node="3047:21447" src="/assets/figma/3047-21447.png"',
          )
          .replace(
            'src="/assets/figma/3158-22263.png"',
            'src="/assets/figma/3047-21447.png"',
          );
      }
      return undefined;
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), lunaFigmaCompileFixesPlugin()],
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
});
