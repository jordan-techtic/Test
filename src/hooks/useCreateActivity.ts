import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/components/ui/sonner'

import { createActivity } from '@/lib/api/calendar'
import { getApiErrorMessage } from '@/lib/api/errors'
import type { ActivityCreateRequest } from '@/types/api'

interface UseCreateActivityOptions {
  year: number
  month: number | null
}

export function useCreateActivity({ year, month }: UseCreateActivityOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ActivityCreateRequest) => createActivity(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['calendar', year, month] })
      toast.success(response.message || 'Activity created successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    },
  })
}
