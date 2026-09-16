import { api } from '@/lib/api/client'
import type {
  ActivityCreateRequest,
  ActivityCreateResponse,
  ActivityDeleteResponse,
  ActivityGetResponse,
  ActivityUpdateRequest,
  ActivityUpdateResponse,
  CalendarResponse,
} from '@/types/api'

export interface CalendarQueryParams {
  year: number
  month?: number | null
}

export async function getCalendar(
  params: CalendarQueryParams,
): Promise<CalendarResponse> {
  const queryParams: Record<string, number> = { year: params.year }
  if (params.month != null) {
    queryParams.month = params.month
  }

  const response = await api.get<CalendarResponse>(
    '/api/v1/marketing-team-member/calendar',
    { params: queryParams },
  )
  return response.data
}

export async function createActivity(
  payload: ActivityCreateRequest,
): Promise<ActivityCreateResponse> {
  const response = await api.post<ActivityCreateResponse>(
    '/api/v1/marketing-team-member/activities',
    payload,
  )
  return response.data
}

export async function getActivity(id: string): Promise<ActivityGetResponse> {
  const response = await api.get<ActivityGetResponse>(
    `/api/v1/marketing-team-member/activities/${id}`,
  )
  return response.data
}

export async function updateActivity(
  id: string,
  payload: ActivityUpdateRequest,
): Promise<ActivityUpdateResponse> {
  const response = await api.put<ActivityUpdateResponse>(
    `/api/v1/marketing-team-member/activities/${id}`,
    payload,
  )
  return response.data
}

export async function deleteActivity(
  id: string,
): Promise<ActivityDeleteResponse> {
  const response = await api.delete<ActivityDeleteResponse>(
    `/api/v1/marketing-team-member/activities/${id}`,
  )
  return response.data
}
