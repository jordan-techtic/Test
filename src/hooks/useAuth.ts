import { useCallback } from 'react';
import { login, logout } from '../api/auth';
import { ApiError } from '../lib/api-client';
import { clearSessionTokens, getAccessToken, setSessionTokens } from '../lib/auth-session';
import { invalidateVisitorHome } from '../lib/query-invalidation';
import type { LoginRequestBody } from '../types/api';

export function useAuth() {
  const signIn = useCallback(async (body: LoginRequestBody, rememberMe: boolean) => {
    const response = await login(body);
    const accessToken = response.data.accessToken || response.data.token;
    setSessionTokens(accessToken, response.data.refreshToken, rememberMe);
    invalidateVisitorHome();
    return response;
  }, []);

  const signOut = useCallback(async () => {
    const token = getAccessToken();
    try {
      if (token) {
        await logout(token);
      }
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 401) {
        throw error;
      }
    } finally {
      clearSessionTokens();
      invalidateVisitorHome();
    }
  }, []);

  return { signIn, signOut };
}
