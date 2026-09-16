import { isAxiosError } from "axios";
import type { AxiosInstance } from "axios";
import { emitUnauthorized, getAccessToken, isSessionRejected } from "@/lib/auth/storage";

export function isPublicAuthUrl(url: string | undefined): boolean {
  if (!url) {
    return false;
  }
  return (
    url.includes("/marketing-team-member/login") ||
    url.includes("/marketing-team-member/forgot-password")
  );
}

export function setupInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use((config) => {
    if (isPublicAuthUrl(config.url)) {
      return config;
    }
    if (isSessionRejected()) {
      return config;
    }
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const url = error.config?.url ?? error.response?.config?.url;
        if ((status === 401 && !isPublicAuthUrl(url)) || status === 403) {
          emitUnauthorized();
        }
      }
      return Promise.reject(error);
    },
  );
}
