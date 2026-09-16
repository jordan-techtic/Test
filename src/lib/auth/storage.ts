import type { AuthUser } from "@/types/api";

const ACCESS_TOKEN_KEY = "access_token";
const LEGACY_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "auth_user";
export const SESSION_REJECTED_KEY = "auth_session_rejected";
export const AUTH_UNAUTHORIZED_EVENT = "auth:unauthorized";

function readCookie(name: string): string | null {
  if (typeof document === "undefined" || !document.cookie) {
    return null;
  }
  const prefix = `${name}=`;
  const found = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  if (!found) {
    return null;
  }
  const value = decodeURIComponent(found.slice(prefix.length));
  return value || null;
}

export function getAccessToken(): string | null {
  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) ??
    localStorage.getItem(LEGACY_TOKEN_KEY) ??
    readCookie(ACCESS_TOKEN_KEY) ??
    readCookie(LEGACY_TOKEN_KEY)
  );
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function persistSession(params: {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, params.accessToken);
  localStorage.setItem(LEGACY_TOKEN_KEY, params.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, params.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(params.user));
  sessionStorage.removeItem(SESSION_REJECTED_KEY);
}

export function clearSession(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isSessionRejected(): boolean {
  return sessionStorage.getItem(SESSION_REJECTED_KEY) === "1";
}

export function markSessionRejected(): void {
  sessionStorage.setItem(SESSION_REJECTED_KEY, "1");
  clearSession();
}

export function emitUnauthorized(): void {
  markSessionRejected();
  window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
}

export function hasUsableSession(): boolean {
  return Boolean(getAccessToken()) && !isSessionRejected();
}
