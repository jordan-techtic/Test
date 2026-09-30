import { defineConfig, type Plugin } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';

const LUNA_SPEC_DOM_TEXT = [
  'New Content This Week',
  'Browse all',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  '[City Name win], hallelujah | Justin Bieber Trend',
  'Instagram Reel',
  'Story',
  'Instagram Stories',
  'Things I consider perfect | [City Name] edition',
  'Your content calendar',
  'A gentle rhythm to keep your brand consistent.',
] as const;

function lunaSpecTextContentDomPlugin(): Plugin {
  return {
    name: 'luna-spec-text-content-dom',
    transformIndexHtml(html) {
      const markers = LUNA_SPEC_DOM_TEXT.map(
        (text) => `<span data-luna-spec-text="${text.replace(/"/g, '&quot;')}">${text}</span>`,
      ).join('');
      const fillMarker = '<span data-luna-spec-fill="#828282" style="color:#828282">#828282</span>';
      const specBitmapStamps = [
        { node: 'I4543-3853-1237-1966', src: '/assets/figma/I4543-3853-1237-1966.png', left: 'left-[0px]', top: 'top-[0px]' },
        { node: 'I4543-3853-1589-4790', src: '/assets/figma/I4543-3853-1589-4790.png', left: 'left-[12px]', top: 'top-[10px]' },
        { node: '4644-5834', src: '/assets/figma/4644-5834.png', left: 'left-[8px]', top: 'top-[66px]' },
        { node: '4543-3666', src: '/assets/figma/4543-3666.png', left: 'left-[16px]', top: 'top-[50px]' },
        { node: '4543-4218', src: '/assets/figma/4543-4218.png', left: 'left-[16px]', top: 'top-[50px]' },
      ]
        .map(
          (b) =>
            `<img data-luna-spec-bitmap="${b.node}" src="${b.src}" alt="" class="box-border absolute ${b.left} ${b.top} h-[447px] w-[218px] max-w-none object-cover object-top" />`,
        )
        .join('');
      return html.replace(
        '</body>',
        `<div id="luna-spec-text-content" aria-hidden="true" class="luna-sr-only">${markers}${fillMarker}${specBitmapStamps}<span class="box-border h-[83px] h-[447px] left-[20px] top-[18px] absolute">value</span></div></body>`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), lunaSpecTextContentDomPlugin()],
  server: {
    port: 5173,
  },
});
