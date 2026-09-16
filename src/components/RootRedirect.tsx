import { Navigate } from 'react-router-dom'

import { useAuth } from '@/stores/AuthContext'

export function RootRedirect() {
  const { isAuthenticated } = useAuth()

  return <Navigate to={isAuthenticated ? '/calendar' : '/login'} replace />
}
