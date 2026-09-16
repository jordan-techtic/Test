import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { apiClient } from '@/lib/api/client';
import { clearSession, getAccessToken } from '@/lib/auth/storage';

let isRedirectingToLogin = false;
let interceptorsConfigured = false;
let onUnauthorizedCallback: (() => void) | null = null;

export function setupApiInterceptors(onUnauthorized: () => void): void {
  onUnauthorizedCallback = onUnauthorized;

  if (interceptorsConfigured) {
    return;
  }
  interceptorsConfigured = true;

  apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;
      const skipRedirect = (
        error.config as InternalAxiosRequestConfig & { skipAuthRedirect?: boolean }
      )?.skipAuthRedirect;

      if (status === 401 && !skipRedirect && !isRedirectingToLogin) {
        isRedirectingToLogin = true;
        clearSession();
        onUnauthorizedCallback?.();
        setTimeout(() => {
          isRedirectingToLogin = false;
        }, 1000);
      }

      return Promise.reject(error);
    },
  );
}
