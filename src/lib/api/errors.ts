import axios from 'axios';
import type { ApiErrorResponse } from '@/types/api';

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return typeof record.message === 'string';
}

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.code === 'ECONNABORTED' || err.message.toLowerCase().includes('timeout')) {
      return 'The request is taking longer than expected. Please check the current status before trying again.';
    }
    if (!err.response) {
      return 'Unable to connect. Please check your connection.';
    }
    const status = err.response.status;
    const data = err.response.data;
    if (isApiErrorResponse(data) && data.message.trim().length > 0) {
      return data.message;
    }
    if (status === 401) {
      return 'Your session may have expired. Please sign in again.';
    }
    if (status >= 500) {
      return 'Something went wrong. Please try again.';
    }
  }
  if (err instanceof Error && err.message.trim().length > 0) {
    if (err.message.startsWith('AxiosError') || err.message.includes('status code')) {
      return 'Something went wrong. Please try again.';
    }
    return err.message;
  }
  return 'Something went wrong. Please try again.';
}
