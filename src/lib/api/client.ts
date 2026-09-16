import axios from "axios";
import { setupInterceptors } from "@/lib/api/interceptors";
import { activityPath, apiPaths } from "@/types/api";

function resolveApiBaseURL(raw: string | undefined): string {
  const fallback = "http://174.138.72.184:8989/api";
  const trimmed = (raw || fallback).replace(/\/$/, "");
  if (trimmed.endsWith("/api")) {
    return trimmed.slice(0, -"/api".length);
  }
  return trimmed;
}

export const api = axios.create({
  baseURL: resolveApiBaseURL(import.meta.env.VITE_API_BASE_URL),
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(api);

export { apiPaths, activityPath };
