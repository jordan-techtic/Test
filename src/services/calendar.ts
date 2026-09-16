import type { AxiosRequestConfig } from "axios";
import { api } from "@/lib/api/client";
import type {
  ActivityCreateRequest,
  ActivityCreateResponse,
  ActivityDeleteResponse,
  ActivityGetResponse,
  ActivityOut,
  ActivityUpdateRequest,
  ActivityUpdateResponse,
  CalendarQuery,
  CalendarResponse,
} from "@/types/api";

function unwrapActivityRows(payload: unknown): ActivityOut[] {
  if (Array.isArray(payload)) {
    return payload as ActivityOut[];
  }
  if (!payload || typeof payload !== "object") {
    return [];
  }
  const record = payload as Record<string, unknown>;
  for (const key of ["data", "activities", "items", "results"] as const) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value as ActivityOut[];
    }
    if (value && typeof value === "object") {
      const nested = unwrapActivityRows(value);
      if (nested.length > 0) {
        return nested;
      }
    }
  }
  return [];
}

export async function getCalendar(
  query: CalendarQuery,
  config?: AxiosRequestConfig,
): Promise<CalendarResponse> {
  const params: CalendarQuery = {};
  if (typeof query.year === "number") {
    params.year = query.year;
  }
  if (typeof query.month === "number") {
    params.month = query.month;
  }
  if (query.category) {
    params.category = query.category;
  }
  if (query.activity_type) {
    params.activity_type = query.activity_type;
  }
  const response = await api.get<CalendarResponse>("/api/v1/marketing-team-member/calendar", {
    ...config,
    params,
  });
  return response.data;
}

export async function listActivities(config?: AxiosRequestConfig): Promise<ActivityOut[]> {
  const response = await api.get<unknown>("/api/v1/marketing-team-member/activities", config);
  return unwrapActivityRows(response.data);
}

export async function createActivity(
  body: ActivityCreateRequest,
): Promise<ActivityCreateResponse> {
  const response = await api.post<ActivityCreateResponse>(
    "/api/v1/marketing-team-member/activities",
    body,
  );
  return response.data;
}

export async function getActivity(
  id: string,
  config?: AxiosRequestConfig,
): Promise<ActivityGetResponse> {
  const response = await api.get<ActivityGetResponse>(
    `/api/v1/marketing-team-member/activities/${id}`,
    config,
  );
  return response.data;
}

export async function getCampaignCode(
  activityId: string,
  config?: AxiosRequestConfig,
): Promise<unknown> {
  const response = await api.get<unknown>(
    `/api/v1/marketing-team-member/campaign-code/${activityId}`,
    config,
  );
  return response.data;
}

export async function getKlaviyoPerformance(config?: AxiosRequestConfig): Promise<unknown> {
  const response = await api.get<unknown>(
    "/api/v1/marketing-team-member/klaviyo/performance",
    config,
  );
  return response.data;
}

export async function getKlaviyoNotifications(config?: AxiosRequestConfig): Promise<unknown> {
  const response = await api.get<unknown>(
    "/api/v1/marketing-team-member/klaviyo/performance/notifications",
    config,
  );
  return response.data;
}

export async function getAuditLog(config?: AxiosRequestConfig): Promise<unknown> {
  const response = await api.get<unknown>("/api/v1/marketing-team-member/audit-log", config);
  return response.data;
}

export async function getPerformanceMetrics(config?: AxiosRequestConfig): Promise<unknown> {
  const response = await api.get<unknown>(
    "/api/v1/marketing-team-member/performance-metrics",
    config,
  );
  return response.data;
}

export async function getHistoricalManagement(config?: AxiosRequestConfig): Promise<unknown> {
  const response = await api.get<unknown>(
    "/api/v1/marketing-team-member/historical-management",
    config,
  );
  return response.data;
}

export async function getPerformanceData(config?: AxiosRequestConfig): Promise<unknown> {
  const response = await api.get<unknown>(
    "/api/v1/marketing-content-calendar/performance-data",
    config,
  );
  return response.data;
}

export async function updateActivity(
  id: string,
  body: ActivityUpdateRequest,
): Promise<ActivityUpdateResponse> {
  const response = await api.put<ActivityUpdateResponse>(
    `/api/v1/marketing-team-member/activities/${id}`,
    body,
  );
  return response.data;
}

export async function deleteActivity(id: string): Promise<ActivityDeleteResponse> {
  const response = await api.delete<ActivityDeleteResponse>(
    `/api/v1/marketing-team-member/activities/${id}`,
  );
  return response.data;
}
