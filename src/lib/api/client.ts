import axios from 'axios';

function resolveBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL ?? '';
  return envUrl.replace(/\/api\/?$/, '');
}

export const apiClient = axios.create({
  baseURL: resolveBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});
