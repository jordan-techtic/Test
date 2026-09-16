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
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(api);

export const apiPaths = {
  login: "/api/v1/marketing-team-member/login",
  forgotPassword: "/api/v1/marketing-team-member/forgot-password",
  calendar: "/api/v1/marketing-team-member/calendar",
  activities: "/api/v1/marketing-team-member/activities",
  klaviyoPerformance: "/api/v1/marketing-team-member/klaviyo/performance",
  klaviyoPerformanceNotifications:
    "/api/v1/marketing-team-member/klaviyo/performance/notifications",
  auditLog: "/api/v1/marketing-team-member/audit-log",
  performanceMetrics: "/api/v1/marketing-team-member/performance-metrics",
  historicalManagement: "/api/v1/marketing-team-member/historical-management",
  performanceData: "/api/v1/marketing-content-calendar/performance-data",
} as const;
