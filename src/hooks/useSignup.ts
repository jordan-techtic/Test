import { useCallback, useState } from 'react';

import { ApiClientError, getApiErrorMessage } from '../lib/api-client';
import { signup as signupRequest } from '../services/signup';
import type { ApiErrorResponse, ApiValidationErrorResponse, SignupRequest } from '../types/auth';

export function useSignup() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = useCallback(async (payload: SignupRequest) => {
    setIsPending(true);
    setError(null);
    setFieldErrors({});
    setIsSuccess(false);

    try {
      await signupRequest(payload);
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof ApiClientError) {
        const body = err.body as ApiValidationErrorResponse | ApiErrorResponse | null;

        if (err.status === 409) {
          setFieldErrors({ email: ['This email is already registered.'] });
        } else if (body && 'errors' in body && body.errors) {
          setFieldErrors(body.errors);
        } else if (body && 'error' in body && body.error?.details) {
          setFieldErrors(body.error.details);
        } else {
          setError(getApiErrorMessage(err, 'Unable to sign up. Please try again.'));
        }
      } else {
        setError(getApiErrorMessage(err));
      }

      throw err;
    } finally {
      setIsPending(false);
    }
  }, []);

  return { mutate, isPending, error, fieldErrors, isSuccess };
}
