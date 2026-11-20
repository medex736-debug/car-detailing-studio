import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

import { seoPlugin } from './seo-plugin.ts'

// Fallback only. Set VITE_SITE_URL in .env / CI to the real production domain.
const FALLBACK_SITE_URL = 'https://medex736-debug.github.io/car-detailing-studio'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, '')
  const buildDate = new Date().toISOString().slice(0, 10)

  if (!env.VITE_SITE_URL) {
    console.warn(
      `[seo] VITE_SITE_URL is not set — using fallback ${siteUrl}. Set it to the real domain before deploying.`,
    )
  }

  return {
    base: '/',
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
      __BUILD_DATE__: JSON.stringify(buildDate),
    },
    plugins: [react(), tailwindcss(), seoPlugin({ siteUrl, buildDate })],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  }
})
