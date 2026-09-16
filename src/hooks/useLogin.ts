import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/sonner'

import { login } from '@/lib/api/auth'
import { useAuth } from '@/stores/AuthContext'
import type { LoginRequest } from '@/types/api'

export function useLogin() {
  const navigate = useNavigate()
  const { setSession } = useAuth()

  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onSuccess: (response) => {
      setSession(response.data.access_token, response.data.user)
      toast.success(response.message || 'Signed in successfully.')
      navigate('/', { replace: true })
    },
  })
}
