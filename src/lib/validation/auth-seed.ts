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

function readUrlCredentials(): LoginRequest | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const email =
    params.get('luna_email') ??
    params.get('email_or_username') ??
    params.get('VITE_LUNA_VALIDATION_EMAIL');
  const password =
    params.get('luna_password') ??
    params.get('password') ??
    params.get('VITE_LUNA_VALIDATION_PASSWORD');

  if (email && password) {
    return {
      email_or_username: email,
      password,
    };
  }

  return null;
}

function readEnvCredentials(): LoginRequest | null {
  const email =
    import.meta.env.VITE_LUNA_VALIDATION_EMAIL ?? import.meta.env.LUNA_VALIDATION_EMAIL;
  const password =
    import.meta.env.VITE_LUNA_VALIDATION_PASSWORD ?? import.meta.env.LUNA_VALIDATION_PASSWORD;

  if (email && password) {
    return {
      email_or_username: email,
      password,
    };
  }

  return null;
}

export function getValidationLoginCredentials(): LoginRequest | null {
  return readUrlCredentials() ?? readEnvCredentials() ?? readStoredCredentials();
}

export function storeValidationLoginCredentials(credentials: LoginRequest): void {
  sessionStorage.setItem(SESSION_CREDENTIALS_KEY, JSON.stringify(credentials));
}
