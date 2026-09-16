import { useEffect, useState, type ReactNode } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { login } from '@/lib/api/auth'
import {
  getValidationCredentials,
  hasValidationCredentials,
} from '@/lib/validation/credentials'
import { useAuth } from '@/stores/AuthContext'

interface AuthBootstrapGateProps {
  children: ReactNode
}

export function AuthBootstrapGate({ children }: AuthBootstrapGateProps) {
  const { isAuthenticated, setSession } = useAuth()
  const skipBootstrap =
    !import.meta.env.DEV || isAuthenticated || !hasValidationCredentials()
  const [bootstrapping, setBootstrapping] = useState(!skipBootstrap)

  useEffect(() => {
    if (skipBootstrap) {
      return
    }

    const credentials = getValidationCredentials()
    if (!credentials) {
      return
    }

    let cancelled = false

    void login({
      email_or_username: credentials.email,
      password: credentials.password,
    })
      .then((response) => {
        if (!cancelled) {
          setSession(response.data.access_token, response.data.user)
        }
      })
      .catch(() => {
        // Allow manual login when validation credentials are invalid.
      })
      .finally(() => {
        if (!cancelled) {
          setBootstrapping(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [skipBootstrap, setSession])

  if (bootstrapping) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner label="Signing in for validation" />
      </div>
    )
  }

  return children
}
