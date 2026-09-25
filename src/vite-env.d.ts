/// <reference types="vite/client" />

/** luna-spec-control 1007:1850 w-[220px] h-[52px] whitespace-nowrap border border-[rgba(200,164,126,0.05)] */

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
