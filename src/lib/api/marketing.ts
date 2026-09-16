import { api } from "@/lib/api/client";
import { isCanceledError, toApiError } from "@/lib/api/errors";
import type {
  ActivityCreateData,
  ActivityCreateRequest,
  ActivityListData,
  ActivityListQuery,
  ActivityOut,
  ActivityRescheduleRequest,
  ActivityUpdateRequest,
  AuditLogListData,
  AuditLogQuery,
  CalendarData,
  CalendarQuery,
  SuccessEnvelope,
} from "@/types/api";

function appendListParam(params: URLSearchParams, key: string, values: string[] | undefined): void {
  if (!values) {
    return;
  }
  for (const value of values) {
    params.append(key, value);
  }
}

export async function getCalendar(
  query: CalendarQuery = {},
): Promise<SuccessEnvelope<CalendarData>> {
  const params = new URLSearchParams();
  if (query.year) {
    params.set("year", String(query.year));
  }
  if (query.month) {
    params.set("month", String(query.month));
  }
  appendListParam(params, "category", query.category);
  appendListParam(params, "activity_type", query.activity_type);
  try {
    const response = await api.get<SuccessEnvelope<CalendarData>>(
      "/api/v1/marketing-team-member/calendar",
      { params },
    );
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function listActivities(
  query: ActivityListQuery = {},
): Promise<SuccessEnvelope<ActivityListData>> {
  const params = new URLSearchParams();
  if (query.search) {
    params.set("search", query.search);
  }
  appendListParam(params, "category", query.category);
  appendListParam(params, "activity_type", query.activity_type);
  if (query.status) {
    params.set("status", query.status);
  }
  if (query.year) {
    params.set("year", String(query.year));
  }
  if (query.month) {
    params.set("month", String(query.month));
  }
  if (query.date_from) {
    params.set("date_from", query.date_from);
  }
  if (query.date_to) {
    params.set("date_to", query.date_to);
  }
  if (query.sort) {
    params.set("sort", query.sort);
  }
  if (query.page) {
    params.set("page", String(query.page));
  }
  if (query.limit) {
    params.set("limit", String(query.limit));
  }
  if (query.format) {
    params.set("format", query.format);
  }
  try {
    const response = await api.get<SuccessEnvelope<ActivityListData>>(
      "/api/v1/marketing-team-member/activities",
      { params },
    );
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function createActivity(
  payload: ActivityCreateRequest,
): Promise<SuccessEnvelope<ActivityCreateData>> {
  try {
    const response = await api.post<SuccessEnvelope<ActivityCreateData>>(
      "/api/v1/marketing-team-member/activities",
      payload,
    );
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getActivity(
  id: string,
  signal?: AbortSignal,
): Promise<SuccessEnvelope<ActivityOut>> {
  try {
    const response = await api.get<SuccessEnvelope<ActivityOut>>(
      `/api/v1/marketing-team-member/activities/${id}`,
      { signal },
    );
    return response.data;
  } catch (error) {
    if (isCanceledError(error)) {
      throw error;
    }
    throw toApiError(error);
  }
}

export async function updateActivity(
  id: string,
  payload: ActivityUpdateRequest,
): Promise<SuccessEnvelope<ActivityOut>> {
  try {
    const response = await api.put<SuccessEnvelope<ActivityOut>>(
      `/api/v1/marketing-team-member/activities/${id}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function deleteActivity(id: string): Promise<SuccessEnvelope<Record<string, never>>> {
  try {
    const response = await api.delete<SuccessEnvelope<Record<string, never>>>(
      `/api/v1/marketing-team-member/activities/${id}`,
    );
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function rescheduleActivity(
  payload: ActivityRescheduleRequest,
): Promise<SuccessEnvelope<ActivityOut>> {
  try {
    const response = await api.post<SuccessEnvelope<ActivityOut>>(
      "/api/v1/marketing-team-member/activities/reschedule",
      payload,
    );
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getAuditLog(
  query: AuditLogQuery = {},
): Promise<SuccessEnvelope<AuditLogListData>> {
  const params = new URLSearchParams();
  if (query.activity_id) {
    params.set("activity_id", query.activity_id);
  }
  if (query.action) {
    params.set("action", query.action);
  }
  if (query.page) {
    params.set("page", String(query.page));
  }
  if (query.limit) {
    params.set("limit", String(query.limit));
  }
  try {
    const response = await api.get<SuccessEnvelope<AuditLogListData>>(
      "/api/v1/marketing-team-member/audit-log",
      { params },
    );
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}
