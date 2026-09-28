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
      'absolute box-border left-[-17px] top-[0px] w-[1955px] h-[1094px] opacity-[0.4] pointer-events-none block z-[0]',
    children: [
      _jsx('svg', {
        'data-figma-node': '3361:6462',
        viewBox: '0 0 403.04 403.04',
        preserveAspectRatio: 'none',
        'aria-hidden': 'true',
        className:
          'box-border w-[403px] h-[403px] absolute left-[292px] top-[26px] blur-[197px] pointer-events-none overflow-visible',
        children: _jsx('path', {
          d: 'M201.519 403.039C312.816 403.039 403.039 312.816 403.039 201.519C403.039 90.2233 312.816 0 201.519 0C90.2233 0 0 90.2233 0 201.519C0 312.816 90.2233 403.039 201.519 403.039Z',
          fill: '#c8a47e',
        }),
      }),
      _jsx('svg', {
        'data-figma-node': '3361:6463',
        viewBox: '0 0 445 445',
        preserveAspectRatio: 'none',
        'aria-hidden': 'true',
        className:
          'box-border w-[445px] h-[445px] absolute left-[0px] top-[0px] blur-[257px] pointer-events-none overflow-visible',
        children: _jsx('path', {
          d: 'M222.5 445C345.383 445 445 345.383 445 222.5C445 99.6167 345.383 0 222.5 0C99.6167 0 0 99.6167 0 222.5C0 345.383 99.6167 445 222.5 445Z',
          fill: 'rgba(243, 50, 246, 0.3)',
        }),
      }),
      _jsx('svg', {
        'data-figma-node': '3361:6464',
        viewBox: '0 0 287 287',
        preserveAspectRatio: 'none',
        'aria-hidden': 'true',
        className:
          'box-border w-[287px] h-[287px] absolute left-[1425px] top-[807px] blur-[197px] pointer-events-none overflow-visible',
        children: _jsx('path', {
          d: 'M143.5 287C222.753 287 287 222.753 287 143.5C287 64.2471 222.753 0 143.5 0C64.2471 0 0 64.2471 0 143.5C0 222.753 64.2471 287 143.5 287Z',
          fill: 'rgba(255, 86, 48, 0.9)',
        }),
      }),
      _jsx('svg', {
        'data-figma-node': '3361:6465',
        viewBox: '0 0 392.74 392.74',
        preserveAspectRatio: 'none',
        'aria-hidden': 'true',
        className:
          'box-border w-[393px] h-[393px] absolute left-[1562px] top-[594px] blur-[197px] pointer-events-none overflow-visible',
        children: _jsx('path', {
          d: 'M196.369 392.738C304.821 392.738 392.738 304.821 392.738 196.369C392.738 87.9174 304.821 0 196.369 0C87.9174 0 0 87.9174 0 196.369C0 304.821 87.9174 392.738 196.369 392.738Z',
          fill: 'rgba(24, 119, 242, 0.5)',
        }),
      }),
      _jsx('svg', {
        'data-figma-node': '3361:6466',
        viewBox: '0 0 386.66 386.66',
        preserveAspectRatio: 'none',
        'aria-hidden': 'true',
        className:
          'box-border w-[387px] h-[387px] absolute left-[1331px] top-[594px] blur-[257px] pointer-events-none overflow-visible',
        children: _jsx('path', {
          d: 'M193.328 386.656C300.1 386.656 386.656 300.1 386.656 193.328C386.656 86.5559 300.1 0 193.328 0C86.5559 0 0 86.5559 0 193.328C0 300.1 86.5559 386.656 193.328 386.656Z',
          fill: 'rgba(47, 0, 255, 0.3)',
        }),
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
