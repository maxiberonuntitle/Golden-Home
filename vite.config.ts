import { execSync } from 'node:child_process'
import path from 'node:path'
import { defineConfig, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const propertiesDir = path.resolve('public', 'properties')

function syncPropertyImages() {
  execSync('node scripts/generatePropertyImageManifest.mjs', { stdio: 'inherit' })
}

function propertyImagesVitePlugin() {
  return {
    name: 'property-images-manifest',
    buildStart() {
      syncPropertyImages()
    },
    configureServer(server: ViteDevServer) {
      syncPropertyImages()

      server.watcher.add(propertiesDir)
      const refresh = (file: string) => {
        if (!file.includes(`${path.sep}properties${path.sep}`)) return
        syncPropertyImages()
        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
      server.watcher.on('change', refresh)
    },
  }
}

export default defineConfig({
  plugins: [propertyImagesVitePlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
