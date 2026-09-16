import { AxiosError, isAxiosError } from "axios";
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

function requestSentAuthorization(error: AxiosError): boolean {
  const headers = error.config?.headers;
  if (!headers) {
    return false;
  }
  const value =
    typeof headers.get === "function"
      ? headers.get("Authorization") || headers.get("authorization")
      : (headers as { Authorization?: unknown; authorization?: unknown }).Authorization ||
        (headers as { authorization?: unknown }).authorization;
  return Boolean(value);
}

export function setupInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use((config) => {
    if (isPublicAuthUrl(config.url)) {
      return config;
    }
    if (isSessionRejected()) {
      return Promise.reject(
        new AxiosError("Session ended.", AxiosError.ERR_CANCELED, config),
      );
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
        const hadBearer = requestSentAuthorization(error);
        if (
          hadBearer &&
          !isPublicAuthUrl(url) &&
          (status === 401 || status === 403)
        ) {
          emitUnauthorized();
        }
      }
      return Promise.reject(error);
    },
  );
}
