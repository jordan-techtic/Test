import axios, { type AxiosInstance } from 'axios';

function resolveBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
  return fromEnv ?? '';
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: resolveBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
