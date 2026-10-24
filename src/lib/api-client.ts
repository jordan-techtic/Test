import { getApiBaseUrl, resolveApiPath } from './env';
import type { ApiValidationErrorResponse } from '../types/auth';

export class ApiClientError extends Error {
  status: number;
  body: ApiValidationErrorResponse | unknown;

  constructor(status: number, body: ApiValidationErrorResponse | unknown) {
    super(`API error ${status}`);
    this.name = 'ApiClientError';
    this.status = status;
    this.body = body;
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${getApiBaseUrl()}${resolveApiPath(path)}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiClientError(response.status, body);
  }

  return body as T;
}
