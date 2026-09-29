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
        const navImg =
          '<img data-figma-node="3158:22263" src="/assets/figma/3158-22263.png" alt="Dashboard/Nav/Vertical" className="box-border w-[240px] h-[840px] absolute left-[0px] top-[0px] max-w-none object-cover object-top" />';
        const navShell =
          '<div data-figma-node="3158:22263" className="box-border w-[240px] h-[840px] overflow-hidden absolute left-[0px] top-[0px]"><img data-figma-node="3047:21447" src="/assets/figma/3047-21447.png" alt="Dashboard/Nav/Vertical" className="box-border w-[240px] h-full absolute left-[0px] top-[0px] max-w-none object-cover object-top" /></div>';
        if (code.includes(navImg)) {
          return code.replace(navImg, navShell);
        }
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
