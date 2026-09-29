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

export function getAuthHeader(): Record<string, string> | null {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return null;
  }
  const tokenType =
    localStorage.getItem(TOKEN_TYPE_KEY) ?? sessionStorage.getItem(TOKEN_TYPE_KEY) ?? 'Bearer';
  return { Authorization: `${tokenType} ${accessToken}` };
}
