/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'virtual:luna-screen-spec-emit' {
  export function FigmaSpecMaskGroupSection(): import('react').JSX.Element;
  export function FigmaSpecFrame1618873475Section(): import('react').JSX.Element;
  export function FigmaSpecThreeStepsHeadline(): import('react').JSX.Element;
  export function FigmaSpecGroup33654419Section(): import('react').JSX.Element;
}
