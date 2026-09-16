import { api } from "@/lib/api/client";
import type {
  ActivityCreateRequest,
  ActivityCreateResponse,
  ActivityDeleteResponse,
  ActivityGetResponse,
  ActivityUpdateRequest,
  ActivityUpdateResponse,
  CalendarQuery,
  CalendarResponse,
} from "@/types/api";

export async function getCalendar(query: CalendarQuery): Promise<CalendarResponse> {
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
    params,
  });
  return response.data;
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

export async function getActivity(id: string): Promise<ActivityGetResponse> {
  const response = await api.get<ActivityGetResponse>(
    `/api/v1/marketing-team-member/activities/${id}`,
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
