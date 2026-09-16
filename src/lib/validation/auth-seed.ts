import type { LoginRequest } from '@/types/api';

const SESSION_CREDENTIALS_KEY = 'luna_validation_credentials';

function readStoredCredentials(): LoginRequest | null {
  const raw = sessionStorage.getItem(SESSION_CREDENTIALS_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<LoginRequest>;
    if (parsed.email_or_username && parsed.password) {
      return {
        email_or_username: parsed.email_or_username,
        password: parsed.password,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function getValidationLoginCredentials(): LoginRequest | null {
  const email = import.meta.env.VITE_LUNA_VALIDATION_EMAIL;
  const password = import.meta.env.VITE_LUNA_VALIDATION_PASSWORD;

  if (email && password) {
    return {
      email_or_username: email,
      password,
    };
  }

  return readStoredCredentials();
}

export function storeValidationLoginCredentials(credentials: LoginRequest): void {
  sessionStorage.setItem(SESSION_CREDENTIALS_KEY, JSON.stringify(credentials));
}
