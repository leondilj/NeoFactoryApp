/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  // adicione outras variáveis VITE_ se necessário
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}