/**
 * Canonical production URL for the client bundle — the ONLY place the domain
 * is exposed to app code.
 *
 * Set the real domain in `.env` / CI as:
 *   VITE_SITE_URL=https://example.com
 *
 * `vite.config.ts` reads that variable once and injects it as `__SITE_URL__`,
 * so canonical, Open Graph, JSON-LD, sitemap.xml, robots.txt and llms.txt all
 * stay in sync. The fallback is derived from the repository's GitHub Pages
 * remote (medex736-debug/car-detailing-studio); override it with VITE_SITE_URL.
 */
export const SITE_URL: string = __SITE_URL__;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
