/**
 * Resolve a public/ asset against the app's base path. Files in public/ are
 * served under `vite.config` base (e.g. /car-detailing-studio/), so a bare
 * "/assets/..." path 404s on deployment. BASE_URL carries that prefix at
 * build and runtime. A leading slash is tolerated either way.
 */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}