import { useQuery } from '@tanstack/react-query';
import { getActivity } from '@/lib/api/activities';

export function useActivityQuery(activityId: string | null, enabled = true) {
  return useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => getActivity(activityId!),
    select: (response) => response.data,
    enabled: enabled && Boolean(activityId),
    retry: false,
  });
}
