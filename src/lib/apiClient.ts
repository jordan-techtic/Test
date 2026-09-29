import { isApiErrorResponse, type ApiErrorResponse } from '../types/api';
import { resolveApiUrl } from './resolveApiUrl';

export class ApiClientError extends Error {
  readonly status: number;
  readonly body: ApiErrorResponse | null;

  constructor(message: string, status: number, body: ApiErrorResponse | null) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.body = body;
  }
}

interface RequestJsonOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export async function requestJson<TResponse>(options: RequestJsonOptions): Promise<TResponse> {
  const url = resolveApiUrl(options.path);
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...options.headers,
  };

  let body: string | undefined;
  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(options.body);
  }

  const response = await fetch(url, {
    method: options.method,
    headers,
    body,
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
    const apiError = isApiErrorResponse(parsed) ? parsed : null;
    const message =
      apiError?.message ??
      (typeof parsed === 'object' && parsed !== null && 'message' in parsed
        ? String((parsed as { message: unknown }).message)
        : `Request failed with status ${response.status}`);
    throw new ApiClientError(message, response.status, apiError);
  }

  return parsed as TResponse;
}
