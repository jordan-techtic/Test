import type { AxiosInstance } from "axios";
import {
  emitUnauthorized,
  getAccessToken,
  isSessionRejected,
} from "@/lib/auth/storage";

function isPublicAuthUrl(url: string | undefined): boolean {
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
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "status" in error.response &&
        error.response.status === 401
      ) {
        const config =
          "config" in error && typeof error.config === "object" && error.config !== null
            ? error.config
            : undefined;
        const url =
          config && "url" in config && typeof config.url === "string"
            ? config.url
            : undefined;
        if (!isPublicAuthUrl(url) && !isSessionRejected()) {
          emitUnauthorized();
          if (window.location.pathname !== "/") {
            window.location.replace("/");
          }
        }
      }
      return Promise.reject(error);
    },
  );
}
