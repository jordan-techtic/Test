const TOKEN_KEY = 'agentwise_token';
const REMEMBER_KEY = 'agentwise_remember_me';

function storage(persistent: boolean): Storage {
  return persistent ? localStorage : sessionStorage;
}

export function getRememberMe(): boolean {
  return localStorage.getItem(REMEMBER_KEY) === 'true';
}

export function setRememberMe(value: boolean): void {
  localStorage.setItem(REMEMBER_KEY, value ? 'true' : 'false');
}

export function persistToken(token: string, rememberMe = getRememberMe()): void {
  storage(rememberMe).setItem(TOKEN_KEY, token);
  if (!rememberMe) {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}
