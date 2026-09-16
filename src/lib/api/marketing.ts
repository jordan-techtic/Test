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

export interface MarketingWorkspaceSnapshot {
  activities: ActivityOut[];
  selectedActivity: ActivityOut | null;
  campaignCode: CampaignCodeData | null;
  errorMessage: string | null;
}

function bearerConfig(): { headers: { Authorization: string } } | null {
  const token = getAccessToken();
  if (!token) {
    return null;
  }
  return { headers: { Authorization: `Bearer ${token}` } };
}

async function authedGet<T>(path: string): Promise<T> {
  const auth = bearerConfig();
  if (!auth) {
    throw new Error("Authentication required.");
  }
  const response = await api.get<T>(path, auth);
  return response.data;
}

export async function getCalendar(): Promise<ApiSuccess<CalendarData>> {
  return authedGet<ApiSuccess<CalendarData>>("/api/v1/marketing-team-member/calendar");
}

export async function getActivities(): Promise<ApiSuccess<ActivityListData>> {
  return authedGet<ApiSuccess<ActivityListData>>("/api/v1/marketing-team-member/activities");
}

export async function getActivityById(id: string): Promise<ApiSuccess<ActivityOut>> {
  return authedGet<ApiSuccess<ActivityOut>>(`/api/v1/marketing-team-member/activities/${id}`);
}

export async function getKlaviyoPerformance(): Promise<ApiSuccess<PerformanceData>> {
  return authedGet<ApiSuccess<PerformanceData>>(
    "/api/v1/marketing-team-member/klaviyo/performance",
  );
}

export async function getKlaviyoPerformanceNotifications(): Promise<
  ApiSuccess<NotificationListData>
> {
  return authedGet<ApiSuccess<NotificationListData>>(
    "/api/v1/marketing-team-member/klaviyo/performance/notifications",
  );
}

export async function getAuditLog(): Promise<ApiSuccess<AuditLogListData>> {
  return authedGet<ApiSuccess<AuditLogListData>>("/api/v1/marketing-team-member/audit-log");
}

export async function getPerformanceMetrics(): Promise<ApiSuccess<PerformanceMetricsData>> {
  return authedGet<ApiSuccess<PerformanceMetricsData>>(
    "/api/v1/marketing-team-member/performance-metrics",
  );
}

export async function getHistoricalManagement(): Promise<ApiSuccess<HistoricalCalendarsData>> {
  return authedGet<ApiSuccess<HistoricalCalendarsData>>(
    "/api/v1/marketing-team-member/historical-management",
  );
}

export async function getPerformanceData(): Promise<ApiSuccess<PerformanceData>> {
  return authedGet<ApiSuccess<PerformanceData>>(
    "/api/v1/marketing-content-calendar/performance-data",
  );
}

export async function getCampaignCode(
  activityId: string,
): Promise<ApiSuccess<CampaignCodeData>> {
  return authedGet<ApiSuccess<CampaignCodeData>>(
    `/api/v1/marketing-team-member/campaign-code/${activityId}`,
  );
}

function firstActivityId(
  list: ActivityListData | undefined,
  calendar: CalendarData | undefined,
): string | undefined {
  return list?.items[0]?.id ?? calendar?.activities[0]?.id;
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
  if (!getAccessToken()) {
    return {
      activities: [],
      selectedActivity: null,
      campaignCode: null,
      errorMessage: null,
    };
  }

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
  const detail = activityId
    ? await loadActivityDetail(activityId)
    : { activity: null, campaignCode: null };

  let errorMessage: string | null = null;
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

  return {
    activities,
    selectedActivity: detail.activity,
    campaignCode: detail.campaignCode,
    errorMessage,
  };
}
