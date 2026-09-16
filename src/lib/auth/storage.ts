const ACCESS_TOKEN_KEY = 'access_token'
const SESSION_REJECTED_KEY = 'session_rejected'
const SESSION_VALIDATED_KEY = 'session_validated'

export const AUTH_UNAUTHORIZED_EVENT = 'auth:unauthorized'

export function getAccessToken(): string | null {
  if (sessionStorage.getItem(SESSION_REJECTED_KEY) === 'true') {
    return null
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setAccessToken(token: string): void {
  sessionStorage.removeItem(SESSION_REJECTED_KEY)
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function setSessionValidated(): void {
  sessionStorage.setItem(SESSION_VALIDATED_KEY, 'true')
}

export function isSessionValidated(): boolean {
  return sessionStorage.getItem(SESSION_VALIDATED_KEY) === 'true'
}

export function clearAuth(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.setItem(SESSION_REJECTED_KEY, 'true')
  sessionStorage.removeItem(SESSION_VALIDATED_KEY)
}

export function dispatchUnauthorizedEvent(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT))
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken())
}
