import { useQuery } from '@tanstack/react-query';
import { getCalendar } from '@/lib/api/calendar';

export function useCalendarQuery(year: number, month: number | null, enabled = true) {
  return useQuery({
    queryKey: ['calendar', year, month],
    queryFn: () => getCalendar({ year, month }),
    select: (response) => response.data,
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    meta: {
      errorMessage: 'Unable to load calendar. Please try again.',
    },
  });
}
