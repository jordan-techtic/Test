import { useEffect, useRef } from 'react'

import { login } from '@/lib/api/auth'
import { useAuth } from '@/stores/AuthContext'

/**
 * Auto-login during Luna dev validation when credentials are injected via env.
 * Contract GETs then run authenticated on CalendarPage without console 401 noise.
 */
export function ValidationAuthBootstrap() {
  const { isAuthenticated, setSession } = useAuth()
  const attemptedRef = useRef(false)

  useEffect(() => {
    if (!import.meta.env.DEV || isAuthenticated || attemptedRef.current) {
      return
    }

    const email = import.meta.env.VITE_LUNA_VALIDATION_EMAIL
    const password = import.meta.env.VITE_LUNA_VALIDATION_PASSWORD
    if (!email || !password) {
      return
    }

    attemptedRef.current = true

    void login({ email_or_username: email, password })
      .then((response) => {
        setSession(response.data.access_token, response.data.user)
      })
      .catch(() => {
        attemptedRef.current = false
      })
  }, [isAuthenticated, setSession])

  return null
}
