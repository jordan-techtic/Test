import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const VIRTUAL_SPEC_MODULE_ID = 'virtual:luna-screen-spec-emit';
const RESOLVED_SPEC_MODULE_ID = '\0virtual:luna-screen-spec-emit';

/** Re-emits ScreenSpec fragments missing from owned-layout codegen (Mask group + headline + sign-up photo group). */
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
    'data-figma-node': '2264:10398',
    id: 'content',
    className: 'absolute box-border left-[0px] top-[1929px] w-[1920px] h-[2875px] block overflow-hidden z-[4]',
    children: _jsxs('div', {
      'data-figma-node': '2264:10404',
      className: 'box-border w-[1920px] h-[2875px] absolute left-[0px] top-[0px] overflow-hidden',
      children: [
        _jsx('img', {
          'data-figma-node': '2264:10404',
          src: '/assets/figma/2264-10404.png',
          alt: 'Mask group',
          className:
            'box-border w-[1920px] h-[2875px] absolute left-[0px] top-[0px] max-w-none object-cover object-top',
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

export function FigmaSpecGroup33654419Section() {
  return _jsx('section', {
    'data-figma-node': '2779:25547',
    className: 'absolute box-border left-[781px] top-[-616px] w-[649px] h-[2215px] block overflow-hidden z-[0]',
    children: _jsxs('div', {
      'data-figma-node': '2779:25526',
      className: 'box-border w-[649px] h-[2215px] absolute left-[0px] top-[0px] overflow-hidden',
      children: [
        _jsxs('div', {
          'data-figma-node': '1001:1181',
          className: 'box-border w-[320px] h-[2035px] absolute left-[329px] top-[179px] gap-[8.15px]',
          children: [
            _jsx('img', {
              'data-figma-node': '1001:1182',
              src: '/assets/figma/1001-1182.png',
              alt: 'VERSION 1 (2) 2',
              className:
                'box-border w-[320px] h-[401px] absolute left-[0px] top-[0px] max-w-none object-cover object-top',
            }),
            _jsx('img', {
              'data-figma-node': '1001:1183',
              src: '/assets/figma/1001-1183.png',
              alt: 'VERSION 1 (6) 1',
              className:
                'box-border w-[320px] h-[401px] absolute left-[0px] top-[409px] max-w-none object-cover object-top',
            }),
            _jsx('img', {
              'data-figma-node': '1001:1184',
              src: '/assets/figma/1001-1184.png',
              alt: 'VERSION 1 (6) 2',
              className:
                'box-border w-[320px] h-[401px] absolute left-[0px] top-[817px] max-w-none object-cover object-top',
            }),
            _jsx('img', {
              'data-figma-node': '1001:1185',
              src: '/assets/figma/1001-1185.png',
              alt: 'VERSION 1 (6) 3',
              className:
                'box-border w-[320px] h-[401px] absolute left-[0px] top-[1226px] max-w-none object-cover object-top',
            }),
            _jsx('img', {
              'data-figma-node': '1001:1186',
              src: '/assets/figma/1001-1186.png',
              alt: 'VERSION 1 (6) 4',
              className:
                'box-border w-[320px] h-[401px] absolute left-[0px] top-[1635px] max-w-none object-cover object-top',
            }),
          ],
        }),
        _jsxs('div', {
          'data-figma-node': '1001:1187',
          className: 'box-border w-[320px] h-[2035px] absolute left-[0px] top-[0px] gap-[8.15px]',
          children: [
            _jsx('img', {
              'data-figma-node': '1001:1188',
              src: '/assets/figma/1001-1188.png',
              alt: 'VERSION 1 (2) 3',
              className:
                'box-border w-[320px] h-[401px] absolute left-[0px] top-[0px] max-w-none object-cover object-top',
            }),
            _jsx('img', {
              'data-figma-node': '1001:1189',
              src: '/assets/figma/1001-1189.png',
              alt: 'VERSION 1 (6) 5',
              className:
                'box-border w-[320px] h-[401px] absolute left-[0px] top-[409px] max-w-none object-cover object-top',
            }),
            _jsx('img', {
              'data-figma-node': '1001:1190',
              src: '/assets/figma/1001-1190.png',
              alt: 'VERSION 1 (6) 6',
              className:
                'box-border w-[320px] h-[401px] absolute left-[0px] top-[817px] max-w-none object-cover object-top',
            }),
            _jsx('img', {
              'data-figma-node': '1001:1191',
              src: '/assets/figma/1001-1191.png',
              alt: 'VERSION 1 (6) 7',
              className:
                'box-border w-[320px] h-[401px] absolute left-[0px] top-[1226px] max-w-none object-cover object-top',
            }),
            _jsx('img', {
              'data-figma-node': '1001:1192',
              src: '/assets/figma/1001-1192.png',
              alt: 'VERSION 1 (6) 8',
              className:
                'box-border w-[320px] h-[401px] absolute left-[0px] top-[1635px] max-w-none object-cover object-top',
            }),
          ],
        }),
      ],
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
