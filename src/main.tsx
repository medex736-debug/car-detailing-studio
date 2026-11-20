import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/el-messiri/index.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-500.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css'
import '@fontsource/ibm-plex-sans-arabic/latin-400.css'
import '@fontsource/ibm-plex-sans-arabic/latin-500.css'
import '@fontsource/ibm-plex-sans-arabic/latin-600.css'
import elMessiriArabic from '@fontsource-variable/el-messiri/files/el-messiri-arabic-wght-normal.woff2?url'
import cormorantLatin from '@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2?url'
import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
import plexArabic from '@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2?url'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n'

function preloadFont(href: string) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'font'
  link.type = 'font/woff2'
  link.crossOrigin = 'anonymous'
  link.href = href
  document.head.appendChild(link)
}

preloadFont(elMessiriArabic)
preloadFont(plexArabic)
if (document.documentElement.lang === 'en') {
  preloadFont(cormorantLatin)
  preloadFont(interLatin)
}

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
)

// Production builds are pre-rendered (Arabic) into #root at build time, so
// hydrate that markup instead of throwing it away. If the visitor's saved
// language is English, React recovers by rendering the English tree.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
