import { apiClient } from '@/lib/api/client';
import type { ApiSuccessResponse, CalendarData } from '@/types/api';

export interface GetCalendarParams {
  year: number;
  month?: number | null;
}

export async function getCalendar(params: GetCalendarParams) {
  const queryParams: { year: number; month?: number } = { year: params.year };
  if (params.month != null) {
    queryParams.month = params.month;
  }

  const response = await apiClient.get<ApiSuccessResponse<CalendarData>>(
    '/api/v1/marketing-team-member/calendar',
    { params: queryParams },
  );
  return response.data;
}
