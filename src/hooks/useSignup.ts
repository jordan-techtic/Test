import { useCallback, useState } from 'react';

import { apiRequest, ApiClientError } from '../lib/api-client';
import type {
  ApiValidationErrorResponse,
  SignupRequest,
  SignupSuccessResponse,
} from '../types/auth';

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
      await apiRequest<SignupSuccessResponse>('/api/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof ApiClientError) {
        const body = err.body as ApiValidationErrorResponse | null;

        if (err.status === 409) {
          setFieldErrors({ email: ['This email is already registered.'] });
        } else if (body?.errors) {
          setFieldErrors(body.errors);
        } else {
          setError(body?.message ?? 'Something went wrong.');
        }
      } else {
        setError('Unable to connect. Please try again.');
      }

      throw err;
    } finally {
      setIsPending(false);
    }
  }, []);

  return { mutate, isPending, error, fieldErrors, isSuccess };
}
