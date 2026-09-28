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
    'data-figma-node': '2264:10397',
    id: 'content',
    className: 'absolute box-border left-[0px] top-[1929px] w-[1920px] h-[2875px] block overflow-hidden z-[4]',
    children: _jsxs('div', {
      'data-figma-node': '2264:10398',
      className: 'box-border w-[1920px] h-[2875px] absolute left-[0px] top-[0px] overflow-hidden',
      children: _jsxs('div', {
        'data-figma-node': '2264:10404',
        className: 'box-border w-[1964px] h-[2875px] absolute left-[-22px] top-[0px] overflow-hidden',
        children: [
          _jsx('img', {
            'data-figma-node': '2264:10405',
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
    }),
  });
}

export function FigmaSpecFrame1618873475Section() {
  return _jsx('section', {
    'data-figma-node': '3361:6461',
    id: 'pricing',
    className:
      'absolute box-border left-[-17px] top-[0px] w-[1955px] h-[1094px] overflow-hidden opacity-[0.4] pointer-events-none block z-[0]',
    children: [
      _jsx('img', {
        'data-figma-node': '3361:6462',
        src: '/assets/figma/3361-6462.png',
        alt: 'Vector',
        className:
          'box-border w-[403px] h-[403px] absolute left-[275px] top-[26px] max-w-none object-cover object-top pointer-events-none',
      }),
      _jsx('img', {
        'data-figma-node': '3361:6463',
        src: '/assets/figma/3361-6463.png',
        alt: 'Vector',
        className:
          'box-border w-[445px] h-[445px] absolute left-[0px] top-[0px] max-w-none object-cover object-top pointer-events-none',
      }),
      _jsx('img', {
        'data-figma-node': '3361:6464',
        src: '/assets/figma/3361-6464.png',
        alt: 'Vector',
        className:
          'box-border w-[287px] h-[287px] absolute left-[1408px] top-[807px] max-w-none object-cover object-top pointer-events-none',
      }),
      _jsx('img', {
        'data-figma-node': '3361:6465',
        src: '/assets/figma/3361-6465.png',
        alt: 'Vector',
        className:
          'box-border w-[393px] h-[393px] absolute left-[1545px] top-[594px] max-w-none object-cover object-top pointer-events-none',
      }),
      _jsx('img', {
        'data-figma-node': '3361:6466',
        src: '/assets/figma/3361-6466.png',
        alt: 'Vector',
        className:
          'box-border w-[387px] h-[387px] absolute left-[1314px] top-[594px] max-w-none object-cover object-top pointer-events-none',
      }),
    ],
  });
}

export function FigmaSpecThreeStepsHeadline() {
  return _jsx('div', {
    'data-figma-node': '2264:10402',
    className: 'box-border w-[1394px] h-[110px] absolute left-[263px] top-[2009px] z-[5]',
    children: _jsx('p', {
      'data-figma-node': '2264:10403',
      className:
        'box-border w-[1394px] h-[110px] absolute left-[0px] top-[0px] font-eb-garamond text-[84px] font-[400] leading-[110px] text-center capitalize whitespace-nowrap text-[#ffffff]',
      children: 'Stunning marketing, in three simple steps',
    }),
  });
}

export function FigmaSpecGroup33654419Section() {
  return _jsx('section', {
    'data-figma-node': '2779:25547',
    className: 'absolute box-border left-[781px] top-[-616px] w-[649px] h-[2215px] block overflow-hidden z-[0]',
    children: _jsx('img', {
      'data-figma-node': '2779:25525',
      src: '/assets/figma/2779-25525.png',
      alt: 'Group 33654417',
      className:
        'box-border w-[649px] h-[2215px] absolute left-[0px] top-[0px] max-w-none object-cover object-top',
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
    proxy: {
      '/api': {
        target: 'http://174.138.72.184:4040',
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5173,
  },
});
