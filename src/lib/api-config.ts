/** Backend base includes /api per ticket (http://127.0.0.1:3000/api). Paths remain /api/dashboard etc. */
export function getApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  if (typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
    return fromEnv.replace(/\/$/, '');
  }
  return 'http://127.0.0.1:3000/api';
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
