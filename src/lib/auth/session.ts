export const TOKEN_STORAGE_KEY = 'token';
export const SESSION_REJECTED_KEY = 'session_rejected';

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  if (window.sessionStorage.getItem(SESSION_REJECTED_KEY) === '1') {
    return null;
  }
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function persistToken(token: string): void {
  window.sessionStorage.removeItem(SESSION_REJECTED_KEY);
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearSession(): void {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function markSessionRejected(): void {
  clearSession();
  window.sessionStorage.setItem(SESSION_REJECTED_KEY, '1');
}

export const UNAUTHORIZED_EVENT = 'agentwise:unauthorized';

export function emitUnauthorized(): void {
  markSessionRejected();
  window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
}
