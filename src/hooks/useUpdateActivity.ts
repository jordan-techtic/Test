import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/components/ui/sonner'

import { updateActivity } from '@/lib/api/calendar'
import type { ActivityUpdateRequest } from '@/types/api'

interface UseUpdateActivityOptions {
  year: number
  month: number | null
}

interface UpdateActivityVariables {
  id: string
  payload: ActivityUpdateRequest
}

export function useUpdateActivity({ year, month }: UseUpdateActivityOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdateActivityVariables) =>
      updateActivity(id, payload),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['calendar', year, month] })
      queryClient.invalidateQueries({ queryKey: ['activity', variables.id] })
      toast.success(response.message || 'Activity updated successfully.')
    },
  })
}
