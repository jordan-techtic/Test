import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AuthUser } from '@/types/api';
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
  setSession: (accessToken: string, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (!isSessionValidated()) return null;
    return getStoredUser();
  });

  const isAuthenticated = useMemo(() => {
    if (!isSessionValidated()) return false;
    return Boolean(user && getAccessToken());
  }, [user]);

  const setSession = useCallback((accessToken: string, authUser: AuthUser) => {
    persistSession(accessToken, authUser);
    setUser(authUser);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated, setSession, logout }),
    [user, isAuthenticated, setSession, logout],
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
