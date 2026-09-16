import { useAppContext } from "@/stores/AppContext";

export function useAuth() {
  const { state, logout } = useAppContext();
  return {
    user: state.user,
    accessToken: state.accessToken,
    isAuthenticated: state.isAuthenticated,
    logout,
  };
}
