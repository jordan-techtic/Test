import { createContext, useContext, type ReactNode, useCallback, useMemo, useState, useEffect } from "react";
import {
  AUTH_UNAUTHORIZED_EVENT,
  clearSession,
  getAccessToken,
  getStoredUser,
  hasUsableSession,
  persistSession,
} from "@/lib/auth/storage";
import type { AuthUser, LoginData } from "@/types/api";

interface AppState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

interface AppContextValue {
  state: AppState;
  completeLogin: (data: LoginData) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function readState(): AppState {
  if (!hasUsableSession()) {
    return { user: null, accessToken: null, isAuthenticated: false };
  }
  return {
    user: getStoredUser(),
    accessToken: getAccessToken(),
    isAuthenticated: true,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(readState);

  const completeLogin = useCallback((data: LoginData) => {
    persistSession({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      user: data.user,
    });
    setState({
      user: data.user,
      accessToken: data.access_token,
      isAuthenticated: true,
    });
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setState({ user: null, accessToken: null, isAuthenticated: false });
  }, []);

  useEffect(() => {
    const onUnauthorized = () => {
      setState({ user: null, accessToken: null, isAuthenticated: false });
    };
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized);
  }, []);

  const value = useMemo(
    () => ({ state, completeLogin, logout }),
    [state, completeLogin, logout],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
