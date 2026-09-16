import { useMutation } from '@tanstack/react-query'
import { toast } from '@/components/ui/sonner'

import { forgotPassword } from '@/lib/api/auth'
import { getApiErrorMessage } from '@/lib/api/errors'
import type { ForgotPasswordRequest } from '@/types/api'

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordRequest) => forgotPassword(payload),
    onSuccess: (response) => {
      toast.success(
        response.message ||
          'If an account exists for that email, recovery instructions were sent.',
      )
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    },
  })
}
