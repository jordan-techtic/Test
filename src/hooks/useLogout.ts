import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiClientError } from '../lib/api-client';
import { clearToken } from '../lib/auth/session';
import { logout as logoutRequest } from '../services/auth';

export function useLogout() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(async () => {
    setIsPending(true);
    setError(null);

    try {
      await logoutRequest();
    } catch (err) {
      if (err instanceof ApiClientError && err.status !== 401) {
        setError('Unable to sign out. Please try again.');
      }
    } finally {
      clearToken();
      setIsPending(false);
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return { logout, isPending, error };
}
