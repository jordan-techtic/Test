import { buildApiUrl } from './api-config';
import { isValidationAccessToken } from './luna-validation-auth';
import type { ApiErrorEnvelope } from '../types/api';
import { AUTH_TOKEN_KEY } from '../types/api';

export class ApiClientError extends Error {
  readonly status: number;
  readonly envelope?: ApiErrorEnvelope;

  constructor(message: string, status: number, envelope?: ApiErrorEnvelope) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.envelope = envelope;
  }
}

export function getStoredAccessToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredAccessToken(token: string | null): void {
  try {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  } catch {
    /* ignore */
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { auth?: boolean } = {},
): Promise<T> {
  const { auth = false, headers, ...rest } = init;
  const url = buildApiUrl(path);
  const nextHeaders = new Headers(headers);
  if (!nextHeaders.has('Content-Type') && rest.body) {
    nextHeaders.set('Content-Type', 'application/json');
  }
  if (auth) {
    const token = getStoredAccessToken();
    if (token) {
      nextHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(url, { ...rest, headers: nextHeaders });
  const text = await response.text();
  let parsed: unknown = null;
  if (text) {
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      parsed = null;
    }
  }

  if (!response.ok) {
    const envelope =
      parsed && typeof parsed === 'object' && 'success' in parsed && (parsed as ApiErrorEnvelope).success === false
        ? (parsed as ApiErrorEnvelope)
        : undefined;
    const message =
      envelope?.message ??
      (typeof parsed === 'object' && parsed && 'message' in parsed && typeof (parsed as { message: unknown }).message === 'string'
        ? (parsed as { message: string }).message
        : response.statusText);
    if (response.status === 401 && !isValidationAccessToken(getStoredAccessToken())) {
      setStoredAccessToken(null);
    }
    throw new ApiClientError(message, response.status, envelope);
  }

  return parsed as T;
}
