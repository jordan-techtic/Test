import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  AUTH_UNAUTHORIZED_EVENT,
  clearAuth,
  getAccessToken,
  isSessionValidated,
  setAccessToken,
  setSessionValidated,
} from '@/lib/auth/storage'
import type { AuthUser } from '@/types/api'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  setSession: (accessToken: string, user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const USER_STORAGE_KEY = 'auth_user'

function readStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (!isSessionValidated()) {
      return null
    }
    const token = getAccessToken()
    return token ? readStoredUser() : null
  })

  const setSession = useCallback((accessToken: string, nextUser: AuthUser) => {
    setAccessToken(accessToken)
    setSessionValidated()
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }, [])

  const logout = useCallback(() => {
    clearAuth()
    localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
  }, [])

  useEffect(() => {
    const handleUnauthorized = () => logout()
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized)
    return () =>
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized)
  }, [logout])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(
        user && getAccessToken() && isSessionValidated(),
      ),
      setSession,
      logout,
    }),
    [user, setSession, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
