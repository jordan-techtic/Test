import { useQuery } from '@tanstack/react-query'

import { getCalendar, type CalendarQueryParams } from '@/lib/api/calendar'
import { getApiErrorMessage } from '@/lib/api/errors'

export function useCalendar(params: CalendarQueryParams) {
  return useQuery({
    queryKey: ['calendar', params.year, params.month ?? null],
    queryFn: () => getCalendar(params),
    select: (response) => response.data,
    meta: {
      errorMessage: 'Unable to load calendar.',
    },
  })
}

export function getCalendarErrorMessage(error: unknown): string {
  return getApiErrorMessage(error)
}
