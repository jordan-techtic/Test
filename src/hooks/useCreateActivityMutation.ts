import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createActivity } from '@/lib/api/activities';
import type { ActivityCreateRequest } from '@/types/api';

export function useCreateActivityMutation(year: number, month: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ActivityCreateRequest) => createActivity(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['calendar', year, month] });
    },
  });
}
