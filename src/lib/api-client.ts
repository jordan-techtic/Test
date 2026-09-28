import { getApiBaseUrl, resolveApiPath } from './env';
import { getToken } from './auth/session';
import type { ApiErrorResponse, ValidationErrorResponse } from '../types/auth';

export interface ApiRequestOptions extends RequestInit {
  auth?: boolean;
}

export class ApiClientError extends Error {
  status: number;
  body: ApiErrorResponse | ValidationErrorResponse | unknown;

  constructor(status: number, body: ApiErrorResponse | ValidationErrorResponse | unknown) {
    super(`API error ${status}`);
    this.name = 'ApiClientError';
    this.status = status;
    this.body = body;
  }
}

export function getApiErrorMessage(err: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (err instanceof ApiClientError) {
    const body = err.body;

    if (body && typeof body === 'object') {
      if ('message' in body && typeof (body as { message: unknown }).message === 'string') {
        return (body as { message: string }).message;
      }

      if ('error' in body) {
        const errorBody = (body as ApiErrorResponse).error;
        if (errorBody?.details) {
          const first = Object.values(errorBody.details)[0]?.[0];
          if (first) {
            return first;
          }
        }
      }

      if ('errors' in body) {
        const errors = (body as ValidationErrorResponse).errors;
        if (errors) {
          const first = Object.values(errors)[0]?.[0];
          if (first) {
            return first;
          }
        }
      }
    }

    if (err.status === 401) {
      return 'Your session may have expired. Please sign in again.';
    }

    if (err.status >= 500) {
      return 'Something went wrong. Please try again.';
    }
  }

  if (err instanceof TypeError) {
    return 'Unable to connect. Please check your connection.';
  }

  return fallback;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { auth, headers, ...rest } = options;
  const authHeaders: Record<string, string> = {};

  if (auth) {
    const token = getToken();
    if (token) {
      authHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const url = `${getApiBaseUrl()}${resolveApiPath(path)}`;
  const response = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
  });

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiClientError(response.status, body);
  }

  return body as T;
}
