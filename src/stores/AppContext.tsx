import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "@/types/api";
import {
  UNAUTHORIZED_EVENT,
  clearSession,
  getStoredUser,
  hasEstablishedSession,
  persistSession as persistAuthSession,
  rejectSession,
} from "@/lib/auth/storage";

interface AppState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

interface AppContextValue {
  state: AppState;
  setSession: (input: { accessToken: string; refreshToken: string; user: AuthUser }) => void;
  signOut: () => void;
  calendarRevision: number;
  auditRevision: number;
  invalidateCalendar: () => void;
  invalidateAudit: () => void;
  invalidateWorkspace: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function readInitialState(): AppState {
  if (typeof window === "undefined") {
    return { user: null, isAuthenticated: false };
  }
  const user = getStoredUser();
  return {
    user,
    isAuthenticated: hasEstablishedSession(),
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(readInitialState);
  const [calendarRevision, setCalendarRevision] = useState(0);
  const [auditRevision, setAuditRevision] = useState(0);

  const setSession = useCallback(
    (input: { accessToken: string; refreshToken: string; user: AuthUser }) => {
      persistAuthSession(input);
      setState({ user: input.user, isAuthenticated: true });
    },
    [],
  );

  const signOut = useCallback(() => {
    clearSession();
    setState({ user: null, isAuthenticated: false });
  }, []);

  const invalidateCalendar = useCallback(() => {
    setCalendarRevision((value) => value + 1);
  }, []);

  const invalidateAudit = useCallback(() => {
    setAuditRevision((value) => value + 1);
  }, []);

  const invalidateWorkspace = useCallback(() => {
    setCalendarRevision((value) => value + 1);
    setAuditRevision((value) => value + 1);
  }, []);

  useEffect(() => {
    const onUnauthorized = () => {
      rejectSession();
      setState({ user: null, isAuthenticated: false });
    };
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      setSession,
      signOut,
      calendarRevision,
      auditRevision,
      invalidateCalendar,
      invalidateAudit,
      invalidateWorkspace,
    }),
    [
      state,
      setSession,
      signOut,
      calendarRevision,
      auditRevision,
      invalidateCalendar,
      invalidateAudit,
      invalidateWorkspace,
    ],
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
