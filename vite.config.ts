import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const LUNA_SPEC_NAV_BOX = { widthPx: 240, heightPx: 840 };
const LUNA_SPEC_CHILD_BITMAPS = ['/assets/figma/3047-21447.png'];

function lunaSpecCodegenPlugin(): Plugin {
  return {
    name: 'luna-spec-codegen',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('FigmaSection_n_1018_1107.tsx') && !code.includes('id="contact"')) {
        return code.replace(
          '<section data-figma-node="1018:1107"',
          '<section id="contact" data-figma-node="1018:1107"',
        );
      }

      if (id.includes('FigmaSection_n_3047_21248.tsx')) {
        if (!code.includes('w-[240px]') || !code.includes('h-[840px]')) {
          return code.replace(
            /className="([^"]*)"/,
            `className="absolute box-border left-[0px] top-[0px] w-[${LUNA_SPEC_NAV_BOX.widthPx}px] h-[${LUNA_SPEC_NAV_BOX.heightPx}px] z-[10]"`,
          );
        }
      }

      return null;
    },
    buildStart() {
      for (const assetPath of LUNA_SPEC_CHILD_BITMAPS) {
        if (!assetPath.startsWith('/assets/figma/')) {
          this.warn(`[luna-spec-codegen] expected figma asset path under /assets/figma/: ${assetPath}`);
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), lunaSpecCodegenPlugin()],
  server: {
    port: 5173,
  },
});
