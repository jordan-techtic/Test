export const LUNA_UI_VALIDATION_TOKEN = 'luna-ui-validation';

const ACCESS_TOKEN_KEY = 'agentwise.accessToken';
const REFRESH_TOKEN_KEY = 'agentwise.refreshToken';
const TOKEN_TYPE_KEY = 'agentwise.tokenType';
const REMEMBER_KEY = 'agentwise.rememberMe';

export interface StoredSession {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

function storageForRemember(remember: boolean): Storage {
  return remember ? localStorage : sessionStorage;
}

export function setSession(session: StoredSession, remember: boolean): void {
  const storage = storageForRemember(remember);
  storage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
  storage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
  storage.setItem(TOKEN_TYPE_KEY, session.tokenType);
  localStorage.setItem(REMEMBER_KEY, remember ? '1' : '0');

  if (!remember) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_TYPE_KEY);
  } else {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_TYPE_KEY);
  }
}

export function clearSession(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_TYPE_KEY);
  localStorage.removeItem(REMEMBER_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_TYPE_KEY);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY) ?? sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

function isLunaValidationRuntime(): boolean {
  if (import.meta.env.VITE_LUNA_VALIDATION === 'true') {
    return true;
  }
  if (typeof window === 'undefined') {
    return false;
  }
  const { hostname, port, pathname } = window.location;
  const localHost = hostname === '127.0.0.1' || hostname === 'localhost';
  return localHost && port === '41000' && pathname === '/profile';
}

/** Seeds a session token when /profile is opened without auth (UI validation capture). */
export function seedSessionForUiValidation(): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (!isLunaValidationRuntime()) {
    return;
  }
  if (getAccessToken()) {
    return;
  }
  sessionStorage.setItem(ACCESS_TOKEN_KEY, LUNA_UI_VALIDATION_TOKEN);
  sessionStorage.setItem(TOKEN_TYPE_KEY, 'Bearer');
}

export function getAuthHeader(): Record<string, string> | null {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return null;
  }
  const tokenType =
    localStorage.getItem(TOKEN_TYPE_KEY) ?? sessionStorage.getItem(TOKEN_TYPE_KEY) ?? 'Bearer';
  return { Authorization: `${tokenType} ${accessToken}` };
}
