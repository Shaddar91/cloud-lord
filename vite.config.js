import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const STATIC_ROUTES = ['/', '/privacy', '/blog']

const POSTS_DIR = join(__dirname, 'src/content/posts')
const blogRoutes = (() => {
  try {
    return readdirSync(POSTS_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => `/blog/${f.replace(/\.md$/, '')}`)
  } catch {
    return []
  }
})()

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [...STATIC_ROUTES, ...blogRoutes],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: { renderAfterDocumentEvent: 'render-event' },
    }),
  ],
  build: {
    sourcemap: true,
  },
})
