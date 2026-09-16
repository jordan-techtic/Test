import { api } from "@/lib/api/client";
import { getApiErrorMessage } from "@/lib/api/errors";
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

export async function getCalendar(): Promise<ApiSuccess<CalendarData>> {
  const response = await api.get<ApiSuccess<CalendarData>>(
    "/api/v1/marketing-team-member/calendar",
  );
  return response.data;
}

export async function getActivities(): Promise<ApiSuccess<ActivityListData>> {
  const response = await api.get<ApiSuccess<ActivityListData>>(
    "/api/v1/marketing-team-member/activities",
  );
  return response.data;
}

export async function getActivityById(id: string): Promise<ApiSuccess<ActivityOut>> {
  const response = await api.get<ApiSuccess<ActivityOut>>(
    `/api/v1/marketing-team-member/activities/${id}`,
  );
  return response.data;
}

export async function getKlaviyoPerformance(): Promise<ApiSuccess<PerformanceData>> {
  const response = await api.get<ApiSuccess<PerformanceData>>(
    "/api/v1/marketing-team-member/klaviyo/performance",
  );
  return response.data;
}

export async function getKlaviyoPerformanceNotifications(): Promise<
  ApiSuccess<NotificationListData>
> {
  const response = await api.get<ApiSuccess<NotificationListData>>(
    "/api/v1/marketing-team-member/klaviyo/performance/notifications",
  );
  return response.data;
}

export async function getAuditLog(): Promise<ApiSuccess<AuditLogListData>> {
  const response = await api.get<ApiSuccess<AuditLogListData>>(
    "/api/v1/marketing-team-member/audit-log",
  );
  return response.data;
}

export async function getPerformanceMetrics(): Promise<ApiSuccess<PerformanceMetricsData>> {
  const response = await api.get<ApiSuccess<PerformanceMetricsData>>(
    "/api/v1/marketing-team-member/performance-metrics",
  );
  return response.data;
}

export async function getHistoricalManagement(): Promise<ApiSuccess<HistoricalCalendarsData>> {
  const response = await api.get<ApiSuccess<HistoricalCalendarsData>>(
    "/api/v1/marketing-team-member/historical-management",
  );
  return response.data;
}

export async function getPerformanceData(): Promise<ApiSuccess<PerformanceData>> {
  const response = await api.get<ApiSuccess<PerformanceData>>(
    "/api/v1/marketing-content-calendar/performance-data",
  );
  return response.data;
}

export async function getCampaignCode(
  activityId: string,
): Promise<ApiSuccess<CampaignCodeData>> {
  const response = await api.get<ApiSuccess<CampaignCodeData>>(
    `/api/v1/marketing-team-member/campaign-code/${activityId}`,
  );
  return response.data;
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
