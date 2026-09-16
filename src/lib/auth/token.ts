export const AUTH_EVENT = "auth:unauthorized";

const TOKEN_KEY = "token";
const REFRESH_KEY = "refresh_token";
const USER_KEY = "auth_user";
const SESSION_KEY = "session_established";
const REJECTED_KEY = "session_rejected";

export function getToken(): string | null {
  if (isSessionRejected()) {
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUserJson(): string | null {
  return localStorage.getItem(USER_KEY);
}

export function isSessionEstablished(): boolean {
  return localStorage.getItem(SESSION_KEY) === "true" && !isSessionRejected();
}

export function isSessionRejected(): boolean {
  return localStorage.getItem(REJECTED_KEY) === "true";
}

export function persistSession(params: {
  accessToken: string;
  refreshToken: string;
  userJson: string;
}): void {
  localStorage.setItem(TOKEN_KEY, params.accessToken);
  localStorage.setItem(REFRESH_KEY, params.refreshToken);
  localStorage.setItem(USER_KEY, params.userJson);
  localStorage.setItem(SESSION_KEY, "true");
  localStorage.removeItem(REJECTED_KEY);
}

export function clearSession(options?: { rejected?: boolean }): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(SESSION_KEY);
  if (options?.rejected) {
    localStorage.setItem(REJECTED_KEY, "true");
  } else {
    localStorage.removeItem(REJECTED_KEY);
  }
}

export function canUseProtectedApp(): boolean {
  return Boolean(getToken()) && isSessionEstablished();
}
