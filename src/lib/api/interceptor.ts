import type { InternalAxiosRequestConfig } from 'axios';
import apiClient from './client';
import { emitUnauthorized, getStoredToken } from '@/lib/auth/session';

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      (error as { response?: { status?: number } }).response?.status === 401
    ) {
      emitUnauthorized();
    }
    return Promise.reject(error);
  },
);
