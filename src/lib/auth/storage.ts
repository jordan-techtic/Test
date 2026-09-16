import type { AuthUser } from '@/types/api';

export const STORAGE_KEYS = {
  accessToken: 'access_token',
  authUser: 'auth_user',
} as const;

export const SESSION_KEYS = {
  sessionValidated: 'session_validated',
  sessionRejected: 'session_rejected',
} as const;

export function getAccessToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.accessToken);
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(STORAGE_KEYS.authUser);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setSession(accessToken: string, user: AuthUser): void {
  localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
  localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
  sessionStorage.setItem(SESSION_KEYS.sessionValidated, 'true');
  sessionStorage.removeItem(SESSION_KEYS.sessionRejected);
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.authUser);
  sessionStorage.removeItem(SESSION_KEYS.sessionValidated);
  sessionStorage.setItem(SESSION_KEYS.sessionRejected, 'true');
}

export function isSessionValidated(): boolean {
  if (sessionStorage.getItem(SESSION_KEYS.sessionRejected) === 'true') {
    return false;
  }
  return sessionStorage.getItem(SESSION_KEYS.sessionValidated) === 'true';
}
