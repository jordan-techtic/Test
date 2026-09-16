import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLockedContractGets } from "@/hooks/useLockedContractGets";
import {
  AUTH_EVENT,
  canUseProtectedApp,
  clearSession,
  getStoredUserJson,
  persistSession,
} from "@/lib/auth/token";
import type { AuthUser, LoginData } from "@/types/api";

interface AppContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (data: LoginData) => void;
  signOut: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function readStoredUser(): AuthUser | null {
  if (!canUseProtectedApp()) {
    return null;
  }
  const raw = getStoredUserJson();
  if (!raw) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    const record = parsed as Record<string, unknown>;
    if (
      typeof record.id === "string" &&
      typeof record.email === "string" &&
      typeof record.username === "string" &&
      typeof record.role === "string"
    ) {
      return {
        id: record.id,
        email: record.email,
        username: record.username,
        role: record.role,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => canUseProtectedApp());
  useLockedContractGets(isAuthenticated);

  useEffect(() => {
    const sync = () => {
      const allowed = canUseProtectedApp();
      setIsAuthenticated(allowed);
      setUser(allowed ? readStoredUser() : null);
    };
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setSession = useCallback((data: LoginData) => {
    persistSession({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      userJson: JSON.stringify(data.user),
    });
    setUser(data.user);
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated, setSession, signOut }),
    [user, isAuthenticated, setSession, signOut],
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
