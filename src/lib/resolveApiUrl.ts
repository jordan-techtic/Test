/**
 * Joins VITE_API_BASE_URL with contract paths without double `/api` prefix.
 * Default base: http://127.0.0.1:3000 (OpenAPI paths include `/api/...`).
 */
export function resolveApiUrl(path: string): string {
  const rawBase = import.meta.env.VITE_API_BASE_URL?.trim();
  const base = (rawBase && rawBase.length > 0 ? rawBase : 'http://127.0.0.1:3000').replace(/\/$/, '');

  if (path.startsWith('/api/') && base.endsWith('/api')) {
    return `${base}${path.slice(4)}`;
  }

  if (path.startsWith('/')) {
    return `${base}${path}`;
  }

  return `${base}/${path}`;
}
