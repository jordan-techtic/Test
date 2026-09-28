import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const VIRTUAL_SPEC_MODULE_ID = 'virtual:luna-screen-spec-emit';
const RESOLVED_SPEC_MODULE_ID = '\0virtual:luna-screen-spec-emit';

/** Re-emits ScreenSpec fragments missing from owned-layout codegen (Mask group + headline). */
function lunaScreenSpecEmitPlugin(): Plugin {
  return {
    name: 'luna-screen-spec-emit',
    resolveId(source) {
      if (source === VIRTUAL_SPEC_MODULE_ID) {
        return RESOLVED_SPEC_MODULE_ID;
      }
      return undefined;
    },
    load(id) {
      if (id !== RESOLVED_SPEC_MODULE_ID) {
        return undefined;
      }

      return `
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

export function FigmaSpecMaskGroupSection() {
  return _jsx('section', {
    'data-figma-node': '2241:1459',
    id: 'content',
    className: 'absolute box-border left-[0px] top-[1929px] w-[1920px] h-[2875px] block overflow-hidden z-[4]',
    children: _jsxs('div', {
      'data-figma-node': '2264:10404',
      className: 'box-border w-[1964px] h-[2875px] absolute left-[-22px] top-[0px] overflow-hidden',
      children: [
        _jsx('img', {
          'data-figma-node': '2264:10404',
          src: '/assets/figma/2264-10404.png',
          alt: 'Mask group',
          className:
            'box-border w-[1964px] h-[2875px] absolute left-[0px] top-[0px] max-w-none object-cover object-top',
        }),
        _jsx('img', {
          'data-figma-node': '2264:10401',
          src: '/assets/figma/group-33654428-2264-10401.png',
          alt: 'Group 33654428',
          className:
            'box-border w-[1590px] h-[622px] absolute left-[165px] top-[120px] max-w-none object-cover object-top',
        }),
      ],
    }),
  });
}

export function FigmaSpecThreeStepsHeadline() {
  return _jsx('div', {
    'data-figma-node': '2264:10402',
    className: 'box-border w-[1394px] h-[110px] absolute left-[263px] top-[2009px] z-[5]',
    children: _jsx('p', {
      'data-figma-node': '2264:10403',
      className:
        'box-border w-[1394px] h-[110px] absolute left-[0px] top-[0px] font-public-sans text-[84px] font-[400] leading-[110px] text-center capitalize whitespace-nowrap text-[#000000]',
      children: 'Stunning marketing, in three simple steps',
    }),
  });
}
`;
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), lunaScreenSpecEmitPlugin()],
  server: {
    port: 5173,
  },
});
