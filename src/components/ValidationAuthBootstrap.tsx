import { useEffect, useRef } from 'react';
import { login } from '@/lib/api/auth';
import { getValidationLoginCredentials, storeValidationLoginCredentials } from '@/lib/validation/auth-seed';
import type { LoginRequest } from '@/types/api';
import { useAuth } from '@/stores/AuthProvider';

declare global {
  interface Window {
    __lunaSeedAuth?: (credentials: LoginRequest) => Promise<boolean>;
  }
}

export function ValidationAuthBootstrap() {
  const { isAuthenticated, isBootstrapping, setSession } = useAuth();
  const seedAttemptedRef = useRef(false);

  useEffect(() => {
    window.__lunaSeedAuth = async (credentials: LoginRequest) => {
      storeValidationLoginCredentials(credentials);
      try {
        const response = await login(credentials);
        if (response.success) {
          setSession(response.data.access_token, response.data.user);
          return true;
        }
      } catch {
        return false;
      }
      return false;
    };

    return () => {
      delete window.__lunaSeedAuth;
    };
  }, [setSession]);

  useEffect(() => {
    if (isBootstrapping || isAuthenticated || seedAttemptedRef.current) {
      return;
    }

    const credentials = getValidationLoginCredentials();
    if (!credentials) {
      return;
    }

    seedAttemptedRef.current = true;

    void login(credentials)
      .then((response) => {
        if (response.success) {
          setSession(response.data.access_token, response.data.user);
        }
      })
      .catch(() => {
        seedAttemptedRef.current = false;
      });
  }, [isAuthenticated, isBootstrapping, setSession]);

  return null;
}
