import type { AuthUser } from "@/types/api";

const ACCESS_TOKEN_KEY = "mcc.access_token";
const REFRESH_TOKEN_KEY = "mcc.refresh_token";
const USER_KEY = "mcc.user";
const SESSION_REJECTED_KEY = "mcc.session_rejected";
export const UNAUTHORIZED_EVENT = "mcc:unauthorized";

export function getAccessToken(): string | null {
  if (isSessionRejected()) {
    return null;
  }
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (isSessionRejected()) {
    return null;
  }
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    return parseAuthUser(parsed);
  } catch {
    return null;
  }
}

function parseAuthUser(value: unknown): AuthUser | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  const record = value as Record<string, unknown>;
  if (
    typeof record.id !== "string" ||
    typeof record.email !== "string" ||
    typeof record.username !== "string" ||
    typeof record.role !== "string"
  ) {
    return null;
  }
  return {
    id: record.id,
    email: record.email,
    username: record.username,
    role: record.role,
  };
}

export function isSessionRejected(): boolean {
  return window.localStorage.getItem(SESSION_REJECTED_KEY) === "1";
}

export function persistSession(input: {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}): void {
  window.localStorage.removeItem(SESSION_REJECTED_KEY);
  window.localStorage.setItem(ACCESS_TOKEN_KEY, input.accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, input.refreshToken);
  window.localStorage.setItem(USER_KEY, JSON.stringify(input.user));
}

export function clearSession(): void {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

export function rejectSession(): void {
  clearSession();
  window.localStorage.setItem(SESSION_REJECTED_KEY, "1");
}

export function emitUnauthorized(): void {
  rejectSession();
  window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
}

export function hasEstablishedSession(): boolean {
  return Boolean(getAccessToken() && getStoredUser() && !isSessionRejected());
}
