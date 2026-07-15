declare module '*.json' {
  const value: Record<string, unknown>
  export default value
}

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
