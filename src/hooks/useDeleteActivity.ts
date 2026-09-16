import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/components/ui/sonner'

import { deleteActivity } from '@/lib/api/calendar'
import { getApiErrorMessage } from '@/lib/api/errors'

interface UseDeleteActivityOptions {
  year: number
  month: number | null
}

export function useDeleteActivity({ year, month }: UseDeleteActivityOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteActivity(id),
    onSuccess: (response, id) => {
      queryClient.invalidateQueries({ queryKey: ['calendar', year, month] })
      queryClient.removeQueries({ queryKey: ['activity', id] })
      toast.success(response.message || 'Activity deleted successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    },
  })
}
