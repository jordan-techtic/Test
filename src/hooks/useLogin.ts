import { useCallback, useState } from 'react';

import { apiRequest, ApiClientError } from '../lib/api-client';
import { persistToken, setRememberMe } from '../lib/auth/session';
import type { ApiErrorResponse, LoginRequest, LoginResponse } from '../types/auth';

export function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const mutate = useCallback(async (payload: LoginRequest, rememberMe: boolean) => {
    setIsPending(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await apiRequest<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setRememberMe(rememberMe);
      persistToken(response.data.token, rememberMe);
      return response;
    } catch (err) {
      if (err instanceof ApiClientError) {
        const body = err.body as ApiErrorResponse | null;

        if (body?.error?.details) {
          setFieldErrors(body.error.details);
        } else {
          setError(body?.message ?? 'Unable to sign in. Please try again.');
        }
      } else {
        setError('Unable to connect. Please try again.');
      }

      throw err;
    } finally {
      setIsPending(false);
    }
  }, []);

  return { mutate, isPending, error, fieldErrors };
}
