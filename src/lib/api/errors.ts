import { isAxiosError } from "axios";
import type { ApiError } from "@/types/api";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiError(value: unknown): value is ApiError {
  if (!isRecord(value)) {
    return false;
  }
  if (value.success !== false || typeof value.message !== "string") {
    return false;
  }
  if (!isRecord(value.error) || typeof value.error.code !== "string") {
    return false;
  }
  return true;
}

export function getApiErrorMessage(err: unknown, fallback?: string): string {
  if (isAxiosError(err)) {
    if (!err.response) {
      return "Unable to connect. Please check your connection.";
    }
    const status = err.response.status;
    const data = err.response.data;
    if (isApiError(data) && data.message) {
      if (status === 401 && data.error.code === "UNAUTHORIZED") {
        return "Your session may have expired. Please sign in again.";
      }
      return data.message;
    }
    if (status === 401) {
      return "Your session may have expired. Please sign in again.";
    }
    if (status === 429) {
      return "Too many requests. Please try again shortly.";
    }
    if (status >= 500) {
      return fallback ?? "Something went wrong. Please try again.";
    }
  }
  if (err instanceof Error && err.message && !err.message.startsWith("AxiosError")) {
    return fallback ?? "Something went wrong. Please try again.";
  }
  return fallback ?? "Something went wrong. Please try again.";
}

export function getFieldErrors(err: unknown): Record<string, string> {
  if (!isAxiosError(err) || !isApiError(err.response?.data)) {
    return {};
  }
  const details = err.response.data.error.details ?? [];
  return details.reduce<Record<string, string>>((acc, item) => {
    acc[item.field] = item.message;
    return acc;
  }, {});
}
