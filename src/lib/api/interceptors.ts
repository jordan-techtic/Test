import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { AUTH_EVENT, clearSession, getToken } from "@/lib/auth/token";
import { isErrorEnvelope } from "@/lib/api/errors";

export function attachInterceptors(instance: AxiosInstance): void {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<unknown>) => {
      const status = error.response?.status;
      const url = error.config?.url ?? "";
      const isAuthCall = url.includes("/login") || url.includes("/forgot-password");
      const code = isErrorEnvelope(error.response?.data)
        ? error.response.data.error.code
        : undefined;
      if (
        status === 401 &&
        !isAuthCall &&
        !error.config?.skipAuthRedirect &&
        code !== "INVALID_CREDENTIALS"
      ) {
        clearSession({ rejected: true });
        window.dispatchEvent(new Event(AUTH_EVENT));
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
      }
      return Promise.reject(error);
    },
  );
}
