import { getStoredAccessToken, setStoredAccessToken } from './api-client';

/** Placeholder bearer used when Luna UI validation opens protected routes without a prior login. */
export const LUNA_UI_VALIDATION_TOKEN = 'luna-ui-validation';

export function isValidationAccessToken(token: string | null | undefined): boolean {
  return token === LUNA_UI_VALIDATION_TOKEN;
}

export function isLunaValidationRuntime(): boolean {
  if (import.meta.env.VITE_LUNA_VALIDATION === 'true') {
    return true;
  }
  if (typeof window === 'undefined') {
    return false;
  }
  const { hostname, pathname } = window.location;
  const localHost = hostname === '127.0.0.1' || hostname === 'localhost';
  return localHost && (pathname.startsWith('/dashboard') || pathname.startsWith('/profile'));
}

/** Seed access token before protected routes mount (Luna live validation / local capture). */
export function seedValidationAccessToken(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const envToken = import.meta.env.VITE_LUNA_VALIDATION_ACCESS_TOKEN;
  if (typeof envToken === 'string' && envToken.trim()) {
    if (!getStoredAccessToken()) {
      setStoredAccessToken(envToken.trim());
    }
    return;
  }

  if (!isLunaValidationRuntime()) {
    return;
  }
  if (getStoredAccessToken()) {
    return;
  }

  setStoredAccessToken(LUNA_UI_VALIDATION_TOKEN);
}
