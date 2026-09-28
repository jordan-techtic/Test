import type { ApiValidationErrorBody } from '../types/api';

export class ApiError extends Error {
  readonly status: number;
  readonly body: ApiValidationErrorBody | null;

  constructor(status: number, message: string, body: ApiValidationErrorBody | null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

const DEFAULT_API_BASE_URL = 'http://174.138.72.184:4040/api';

export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (typeof raw === 'string' && raw.trim().length > 0) {
    return raw.replace(/\/$/, '');
  }
  return DEFAULT_API_BASE_URL;
}

/** Join contract path (e.g. `/api/auth/login`) to baseURL without duplicating `/api`. */
export function buildApiUrl(contractPath: string): string {
  const base = getApiBaseUrl();
  let path = contractPath;
  if (base.endsWith('/api') && contractPath.startsWith('/api/')) {
    path = contractPath.slice(4);
  } else if (base.endsWith('/api') && contractPath === '/api') {
    path = '';
  }
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export type ApiRequestOptions = {
  accessToken?: string | null;
};

export async function apiRequest<T>(
  method: string,
  contractPath: string,
  body?: unknown,
  options: ApiRequestOptions = {},
): Promise<T> {
  const url = buildApiUrl(contractPath);

  const headers: HeadersInit = {
    Accept: 'application/json',
  };
  if (options.accessToken) {
    headers.Authorization = `Bearer ${options.accessToken}`;
  }

  let payload: string | undefined;
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  const response = await fetch(url, {
    method,
    headers,
    body: payload,
  });

  const text = await response.text();
  let parsed: unknown = null;
  if (text.length > 0) {
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      parsed = null;
    }
  }

  if (!response.ok) {
    const errorBody =
      parsed !== null && typeof parsed === 'object'
        ? (parsed as ApiValidationErrorBody)
        : null;
    const message =
      errorBody?.message ??
      (typeof parsed === 'object' && parsed !== null && 'error' in parsed
        ? String((parsed as { error: unknown }).error)
        : `Request failed (${response.status})`);
    throw new ApiError(response.status, message, errorBody);
  }

  return parsed as T;
}
