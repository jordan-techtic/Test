import { api } from "@/lib/api/client";
import { getApiErrorMessage } from "@/lib/api/errors";
import { getAccessToken } from "@/lib/auth/storage";
import type {
  ActivityListData,
  ActivityOut,
  ApiSuccess,
  AuditLogListData,
  CalendarData,
  CampaignCodeData,
  HistoricalCalendarsData,
  NotificationListData,
  PerformanceData,
  PerformanceMetricsData,
} from "@/types/api";

const FALLBACK_ACTIVITY_ID = "00000000-0000-0000-0000-000000000000";

export interface MarketingWorkspaceSnapshot {
  activities: ActivityOut[];
  selectedActivity: ActivityOut | null;
  campaignCode: CampaignCodeData | null;
  errorMessage: string | null;
}

function requestConfig(): { headers?: { Authorization: string } } {
  const token = getAccessToken();
  if (!token) {
    return {};
  }
  return { headers: { Authorization: `Bearer ${token}` } };
}

async function getJson<T>(path: string): Promise<T> {
  const response = await api.get<T>(path, requestConfig());
  return response.data;
}

export async function getCalendar(): Promise<ApiSuccess<CalendarData>> {
  return getJson<ApiSuccess<CalendarData>>("/api/v1/marketing-team-member/calendar");
}

export async function getActivities(): Promise<ApiSuccess<ActivityListData>> {
  return getJson<ApiSuccess<ActivityListData>>("/api/v1/marketing-team-member/activities");
}

export async function getActivityById(id: string): Promise<ApiSuccess<ActivityOut>> {
  return getJson<ApiSuccess<ActivityOut>>(`/api/v1/marketing-team-member/activities/${id}`);
}

export async function getKlaviyoPerformance(): Promise<ApiSuccess<PerformanceData>> {
  return getJson<ApiSuccess<PerformanceData>>(
    "/api/v1/marketing-team-member/klaviyo/performance",
  );
}

export async function getKlaviyoPerformanceNotifications(): Promise<
  ApiSuccess<NotificationListData>
> {
  return getJson<ApiSuccess<NotificationListData>>(
    "/api/v1/marketing-team-member/klaviyo/performance/notifications",
  );
}

export async function getAuditLog(): Promise<ApiSuccess<AuditLogListData>> {
  return getJson<ApiSuccess<AuditLogListData>>("/api/v1/marketing-team-member/audit-log");
}

export async function getPerformanceMetrics(): Promise<ApiSuccess<PerformanceMetricsData>> {
  return getJson<ApiSuccess<PerformanceMetricsData>>(
    "/api/v1/marketing-team-member/performance-metrics",
  );
}

export async function getHistoricalManagement(): Promise<ApiSuccess<HistoricalCalendarsData>> {
  return getJson<ApiSuccess<HistoricalCalendarsData>>(
    "/api/v1/marketing-team-member/historical-management",
  );
}

export async function getPerformanceData(): Promise<ApiSuccess<PerformanceData>> {
  return getJson<ApiSuccess<PerformanceData>>(
    "/api/v1/marketing-content-calendar/performance-data",
  );
}

export async function getCampaignCode(
  activityId: string,
): Promise<ApiSuccess<CampaignCodeData>> {
  return getJson<ApiSuccess<CampaignCodeData>>(
    `/api/v1/marketing-team-member/campaign-code/${activityId}`,
  );
}

function firstActivityId(
  list: ActivityListData | undefined,
  calendar: CalendarData | undefined,
): string {
  return list?.items[0]?.id ?? calendar?.activities[0]?.id ?? FALLBACK_ACTIVITY_ID;
}

export async function loadActivityDetail(activityId: string): Promise<{
  activity: ActivityOut | null;
  campaignCode: CampaignCodeData | null;
}> {
  const [detailResult, campaignResult] = await Promise.allSettled([
    getActivityById(activityId),
    getCampaignCode(activityId),
  ]);

  return {
    activity: detailResult.status === "fulfilled" ? detailResult.value.data : null,
    campaignCode: campaignResult.status === "fulfilled" ? campaignResult.value.data : null,
  };
}

export async function loadMarketingWorkspace(): Promise<MarketingWorkspaceSnapshot> {
  const [calendarResult, activitiesResult] = await Promise.allSettled([
    getCalendar(),
    getActivities(),
  ]);

  await Promise.allSettled([
    getKlaviyoPerformance(),
    getKlaviyoPerformanceNotifications(),
    getAuditLog(),
    getPerformanceMetrics(),
    getHistoricalManagement(),
    getPerformanceData(),
  ]);

  const calendar =
    calendarResult.status === "fulfilled" ? calendarResult.value.data : undefined;
  const list =
    activitiesResult.status === "fulfilled" ? activitiesResult.value.data : undefined;
  const activities = list?.items ?? calendar?.activities ?? [];
  const activityId = firstActivityId(list, calendar);
  const detail = await loadActivityDetail(activityId);

  let errorMessage: string | null = null;
  if (getAccessToken()) {
    if (activities.length === 0 && calendarResult.status === "rejected") {
      errorMessage = getApiErrorMessage(
        calendarResult.reason,
        "Unable to load calendar activities.",
      );
    } else if (activities.length === 0 && activitiesResult.status === "rejected") {
      errorMessage = getApiErrorMessage(
        activitiesResult.reason,
        "Unable to load calendar activities.",
      );
    }
  }

  return {
    activities,
    selectedActivity: detail.activity,
    campaignCode: detail.campaignCode,
    errorMessage,
  };
}
