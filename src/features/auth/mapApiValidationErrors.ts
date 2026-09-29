import type { ApiErrorResponse } from '../../types/api';
import { ApiClientError } from '../../lib/apiClient';

export function mapApiValidationErrors(error: unknown): Record<string, string> {
  if (!(error instanceof ApiClientError)) {
    return {};
  }

  const details = error.body?.error.details;
  if (details) {
    return Object.fromEntries(
      Object.entries(details).map(([key, messages]) => [key, messages[0] ?? 'Invalid value.']),
    );
  }

  const raw = error.body as ApiErrorResponse | null;
  if (raw && typeof raw === 'object' && 'message' in raw && typeof raw.message === 'string') {
    return { _form: raw.message };
  }

  const parsed = error.body as { errors?: Record<string, string[]> } | null;
  if (parsed?.errors) {
    return Object.fromEntries(
      Object.entries(parsed.errors).map(([key, messages]) => [key, messages[0] ?? 'Invalid value.']),
    );
  }

  if (error.message.length > 0) {
    return { _form: error.message };
  }

  return {};
}
