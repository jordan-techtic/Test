import axios, { type AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const data = axiosError.response?.data;

    if (data && !data.success && data.message) {
      return data.message;
    }

    if (axiosError.code === 'ERR_NETWORK') {
      return 'Unable to connect. Please check your connection.';
    }

    const status = axiosError.response?.status;
    if (status === 401) {
      return 'Your session may have expired. Please sign in again.';
    }
    if (status && status >= 500) {
      return 'Something went wrong. Please try again.';
    }
  }

  return 'Something went wrong. Please try again.';
}

export function parseApiFieldErrors(error: unknown): Record<string, string> {
  if (!axios.isAxiosError(error)) {
    return {};
  }

  const data = error.response?.data as ApiErrorResponse | undefined;
  if (!data || data.success || !data.error.details) {
    return {};
  }

  return data.error.details.reduce<Record<string, string>>((acc, detail) => {
    acc[detail.field] = detail.message;
    return acc;
  }, {});
}
