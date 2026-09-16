import { useAppContext } from "@/stores/AppContext";

export function useAuth() {
  return useAppContext();
}
