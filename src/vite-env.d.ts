/// <reference types="vite/client" />

declare const __LUNA_VALIDATION_EMAIL__: string
declare const __LUNA_VALIDATION_PASSWORD__: string

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_API_URL?: string
  readonly VITE_LUNA_VALIDATION_EMAIL?: string
  readonly VITE_LUNA_VALIDATION_PASSWORD?: string
  readonly LUNA_VALIDATION_EMAIL?: string
  readonly LUNA_VALIDATION_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.css' {}
