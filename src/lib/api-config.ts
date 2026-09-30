/** Backend base includes /api per ticket (http://127.0.0.1:3000/api). Paths remain /api/dashboard etc. */
const DEFAULT_API_BASE = 'http://127.0.0.1:3000/api';

function normalizeApiBase(raw: string): string {
  let base = raw.trim().replace(/\/$/, '');
  if (/:(41000|5173)(\/|$)/.test(base)) {
    base = 'http://127.0.0.1:3000';
  }
  if (!base.endsWith('/api')) {
    base = `${base}/api`;
  }
  return base;
}

export function getApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  if (typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
    return normalizeApiBase(fromEnv);
  }
  return DEFAULT_API_BASE;
}

export function buildApiUrl(path: string): string {
  const base = getApiBaseUrl();
  if (base.endsWith('/api') && path.startsWith('/api/')) {
    return `${base.slice(0, -4)}${path}`;
  }
  if (base.endsWith('/api') && path.startsWith('/api')) {
    return `${base.slice(0, -4)}${path}`;
  }
  return `${base}${path}`;
}
