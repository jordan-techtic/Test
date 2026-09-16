import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AuthUser } from '@/types/api';
import { getCalendar } from '@/lib/api/calendar';
import {
  clearSession,
  getAccessToken,
  getStoredUser,
  isSessionValidated,
  setSession as persistSession,
} from '@/lib/auth/storage';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  setSession: (accessToken: string, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function hasPersistedSession(): boolean {
  return isSessionValidated() && Boolean(getAccessToken()) && Boolean(getStoredUser());
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (!hasPersistedSession()) return null;
    return getStoredUser();
  });
  const [isBootstrapping, setIsBootstrapping] = useState(hasPersistedSession);

  useEffect(() => {
    if (!hasPersistedSession()) {
      setIsBootstrapping(false);
      return;
    }

    let cancelled = false;

    getCalendar({ year: new Date().getFullYear() })
      .then(() => {
        if (!cancelled) {
          setIsBootstrapping(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          clearSession();
          setUser(null);
          setIsBootstrapping(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const isAuthenticated = useMemo(() => {
    if (isBootstrapping) return false;
    if (!isSessionValidated()) return false;
    return Boolean(user && getAccessToken());
  }, [user, isBootstrapping]);

  const setSession = useCallback((accessToken: string, authUser: AuthUser) => {
    persistSession(accessToken, authUser);
    setUser(authUser);
    setIsBootstrapping(false);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setIsBootstrapping(false);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated, isBootstrapping, setSession, logout }),
    [user, isAuthenticated, isBootstrapping, setSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
