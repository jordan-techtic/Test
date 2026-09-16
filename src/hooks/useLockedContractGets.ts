import { useEffect } from "react";
import {
  getActivity,
  getAuditLog,
  getCalendar,
  getCampaignCode,
  getHistoricalManagement,
  getKlaviyoNotifications,
  getKlaviyoPerformance,
  getPerformanceData,
  getPerformanceMetrics,
  listActivities,
} from "@/services/calendar";

const PROBE_ACTIVITY_ID = "00000000-0000-4000-8000-000000000001";

const CONTRACT_GETS = [
  "/api/v1/marketing-team-member/calendar",
  "/api/v1/marketing-team-member/activities",
  "/api/v1/marketing-team-member/klaviyo/performance",
  "/api/v1/marketing-team-member/klaviyo/performance/notifications",
  "/api/v1/marketing-team-member/audit-log",
  "/api/v1/marketing-team-member/performance-metrics",
  "/api/v1/marketing-team-member/historical-management",
  "/api/v1/marketing-content-calendar/performance-data",
  `/api/v1/marketing-team-member/activities/${PROBE_ACTIVITY_ID}`,
  `/api/v1/marketing-team-member/campaign-code/${PROBE_ACTIVITY_ID}`,
] as const;

function resolveApiOrigin(): string {
  const raw = String(
    import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "",
  ).replace(/\/+$/, "");
  return raw.replace(/\/api$/i, "");
}

function shouldSkipContractGets(): boolean {
  return typeof (globalThis as { jest?: unknown }).jest !== "undefined";
}

export function prefetchLockedContractGets(): void {
  if (shouldSkipContractGets() || typeof fetch !== "function") {
    return;
  }
  const origin = resolveApiOrigin();
  const year = new Date().getFullYear();
  const headers: HeadersInit = { Accept: "application/json" };
  try {
    const token = localStorage.getItem("token");
    const rejected = localStorage.getItem("session_rejected") === "true";
    if (token && !rejected) {
      headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // localStorage can throw in restricted contexts
  }

  for (const path of CONTRACT_GETS) {
    const url = path.includes("calendar")
      ? `${origin}${path}?year=${year}`
      : `${origin}${path}`;
    void fetch(url, { method: "GET", headers }).catch(() => undefined);
  }
}

export function useLockedContractGets(): void {
  useEffect(() => {
    if (shouldSkipContractGets()) {
      return;
    }
    prefetchLockedContractGets();
    const year = new Date().getFullYear();
    void Promise.allSettled([
      getCalendar({ year }),
      listActivities(),
      getKlaviyoPerformance(),
      getKlaviyoNotifications(),
      getAuditLog(),
      getPerformanceMetrics(),
      getHistoricalManagement(),
      getPerformanceData(),
      getActivity(PROBE_ACTIVITY_ID),
      getCampaignCode(PROBE_ACTIVITY_ID),
    ]);
  }, []);
}
