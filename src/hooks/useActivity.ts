import { useQuery } from '@tanstack/react-query'

import { getActivity } from '@/lib/api/calendar'
import { getApiErrorMessage } from '@/lib/api/errors'

export function useActivity(activityId: string | null, enabled = true) {
  return useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => getActivity(activityId!),
    select: (response) => response.data,
    enabled: enabled && Boolean(activityId),
  })
}

export function getActivityErrorMessage(error: unknown): string {
  return getApiErrorMessage(error)
}
