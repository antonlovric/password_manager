/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATABASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
