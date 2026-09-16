import { useAppContext } from "@/stores/AppContext";

export function useAuth() {
  const { state, setSession, signOut } = useAppContext();
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    setSession,
    signOut,
  };
}
