import axios, { type AxiosError } from "axios";
import type { ErrorEnvelope } from "@/types/api";

export function isErrorEnvelope(value: unknown): value is ErrorEnvelope {
  if (!value || typeof value !== "object") {
    return false;
  }
  const record = value as Record<string, unknown>;
  return record.success === false && typeof record.message === "string";
}

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<unknown>;
    if (!axiosError.response) {
      if (axiosError.code === "ECONNABORTED") {
        return "The request is taking longer than expected. Please check the current status before trying again.";
      }
      return "Unable to connect. Please check your connection.";
    }
    const status = axiosError.response.status;
    const data = axiosError.response.data;
    if (isErrorEnvelope(data)) {
      if (data.error.code === "RATE_LIMIT_EXCEEDED") {
        return data.message || "Too many attempts. Please try again later.";
      }
      return data.message;
    }
    if (status === 401) {
      return "Your session may have expired. Please sign in again.";
    }
    if (status === 429) {
      return "Too many attempts. Please try again later.";
    }
    if (status >= 500) {
      return "Something went wrong. Please try again.";
    }
  }
  if (err instanceof Error && err.message) {
    if (/axios|status code|request failed/i.test(err.message)) {
      return "Something went wrong. Please try again.";
    }
    return err.message;
  }
  return "Something went wrong. Please try again.";
}

export function getFieldErrors(err: unknown): Record<string, string> {
  if (!axios.isAxiosError(err)) {
    return {};
  }
  const data = err.response?.data;
  if (!isErrorEnvelope(data) || !Array.isArray(data.error.details)) {
    return {};
  }
  const mapped: Record<string, string> = {};
  for (const item of data.error.details) {
    if (
      item &&
      typeof item === "object" &&
      "field" in item &&
      "message" in item &&
      typeof item.field === "string" &&
      typeof item.message === "string"
    ) {
      mapped[item.field] = item.message;
    }
  }
  return mapped;
}

export function getErrorCode(err: unknown): string | undefined {
  if (!axios.isAxiosError(err)) {
    return undefined;
  }
  const data = err.response?.data;
  if (isErrorEnvelope(data)) {
    return data.error.code;
  }
  return undefined;
}
