import { useCallback, useState } from 'react';

import { ApiClientError, getApiErrorMessage } from '../lib/api-client';
import { persistToken, setRememberMe } from '../lib/auth/session';
import { login as loginRequest } from '../services/auth';
import type {
  ApiErrorResponse,
  LoginRequest,
  LoginResponse,
  ValidationErrorResponse,
} from '../types/auth';

export function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const mutate = useCallback(async (payload: LoginRequest, rememberMe: boolean) => {
    setIsPending(true);
    setError(null);
    setFieldErrors({});

    try {
      const response: LoginResponse = await loginRequest(payload);

      setRememberMe(rememberMe);
      persistToken(response.data.accessToken ?? response.data.token, rememberMe);
      return response;
    } catch (err) {
      if (err instanceof ApiClientError) {
        const body = err.body as ApiErrorResponse | ValidationErrorResponse | null;

        if (err.status === 401 || err.status === 404) {
          setError('Invalid email or password.');
        } else if (err.status === 403) {
          setError('Your account is inactive. Please contact support.');
        } else if (body && 'errors' in body && body.errors) {
          setFieldErrors(body.errors);
        } else if (body && 'error' in body && body.error?.details) {
          setFieldErrors(body.error.details);
        } else {
          setError(getApiErrorMessage(err, 'Unable to sign in. Please try again.'));
        }
      } else {
        setError(getApiErrorMessage(err));
      }

      throw err;
    } finally {
      setIsPending(false);
    }
  }, []);

  return { mutate, isPending, error, fieldErrors };
}
