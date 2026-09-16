import axios from "axios";
import { setupInterceptors } from "@/lib/api/interceptors";

function resolveBackendOrigin(configured: string | undefined): string {
  const trimmed = (configured ?? "").replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed.slice(0, -"/api".length) : trimmed;
}

const baseURL = resolveBackendOrigin(import.meta.env.VITE_API_BASE_URL);

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(api);

export const apiPaths = {
  login: "/api/v1/marketing-team-member/login",
  forgotPassword: "/api/v1/marketing-team-member/forgot-password",
} as const;
