import axios from "axios";
import { attachInterceptors } from "@/lib/api/interceptors";

function resolveApiBaseUrl(): string {
  const raw = String(
    import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "",
  ).replace(/\/+$/, "");
  // Contract paths are /api/v1/...; strip a trailing /api so they join to the origin.
  return raw.replace(/\/api$/i, "");
}

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 20000,
  headers: { Accept: "application/json" },
});

attachInterceptors(api);
