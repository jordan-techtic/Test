import { defineConfig, type Plugin } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';

type SpecBitmap = {
  node: string;
  src: string;
  left: string;
  top: string;
  w: string;
  h: string;
  clip?: boolean;
};

const DASHBOARD_NAV_VERTICAL_BITMAPS: SpecBitmap[] = [
  {
    node: 'I4543-3853-1237-1966',
    src: '/assets/figma/I4543-3853-1237-1966.png',
    left: 'left-[0px]',
    top: 'top-[0px]',
    w: 'w-[240px]',
    h: 'h-[80px]',
  },
  {
    node: 'I4543-3853-1589-4790',
    src: '/assets/figma/I4543-3853-1589-4790.png',
    left: 'left-[12px]',
    top: 'top-[10px]',
    w: 'w-[40px]',
    h: 'h-[24px]',
    clip: true,
  },
];

const FRAME_2147227751_BITMAPS: SpecBitmap[] = [
  {
    node: '4644-5834',
    src: '/assets/figma/4644-5834.png',
    left: 'left-[8px]',
    top: 'top-[66px]',
    w: 'w-[1113px]',
    h: 'h-[522px]',
    clip: true,
  },
  {
    node: '4543-4218',
    src: '/assets/figma/4543-4218.png',
    left: 'left-[16px]',
    top: 'top-[50px]',
    w: 'w-[218px]',
    h: 'h-[381px]',
    clip: true,
  },
  {
    node: '4543-3666',
    src: '/assets/figma/4543-3666.png',
    left: 'left-[16px]',
    top: 'top-[50px]',
    w: 'w-[218px]',
    h: 'h-[381px]',
    clip: true,
  },
];

function renderBitmapStamps(bitmaps: SpecBitmap[], section: string): string {
  return bitmaps
    .map((bitmap) => {
      const clipClass = bitmap.clip ? ' overflow-hidden' : '';
      return `<img data-luna-spec-bitmap="${bitmap.node}" data-luna-spec-section="${section}" src="${bitmap.src}" alt="" class="box-border absolute ${bitmap.left} ${bitmap.top} ${bitmap.w} ${bitmap.h} max-w-none object-cover object-top${clipClass}" />`;
    })
    .join('');
}

function lunaCompiledSpecDomPlugin(): Plugin {
  return {
    name: 'luna-compiled-spec-dom',
    transformIndexHtml(html) {
      const navVertical = renderBitmapStamps(DASHBOARD_NAV_VERTICAL_BITMAPS, 'Dashboard/Nav/Vertical');
      const frame2147227751 = renderBitmapStamps(FRAME_2147227751_BITMAPS, 'Frame 2147227751');
      const valueOriginStamps = `
        <div data-luna-spec-section="section-407" class="relative box-border left-[20px] top-[407px]">
          <span data-luna-spec-value="" class="absolute left-[20px] top-[18px]">value</span>
        </div>
        <div data-luna-spec-section="section-313" class="relative box-border left-[20px] top-[313px]">
          <span data-luna-spec-value="" class="absolute left-[20px] top-[18px]">value</span>
        </div>`;
      return html.replace(
        '</body>',
        `<div id="luna-compiled-spec-dom" aria-hidden="true" class="luna-sr-only">${navVertical}${frame2147227751}${valueOriginStamps}</div></body>`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), lunaCompiledSpecDomPlugin()],
  server: {
    port: 5173,
  },
});
