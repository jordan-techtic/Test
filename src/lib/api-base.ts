const DEFAULT_ORIGIN = 'http://127.0.0.1:3000/api';

export function apiUrl(path: string): string {
  const base = (import.meta.env.VITE_API_BASE_URL || DEFAULT_ORIGIN).replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (base.endsWith('/api') && normalizedPath.startsWith('/api/')) {
    return `${base.slice(0, -4)}${normalizedPath}`;
  }
  return `${base}${normalizedPath}`;
}

export const TOKEN_STORAGE_KEY = 'agentwise_access_token';

export function getStoredAccessToken(): string | null {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredAccessToken(token: string): void {
  sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearStoredAccessToken(): void {
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
}
