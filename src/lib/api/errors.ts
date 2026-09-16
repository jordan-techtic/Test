import { isAxiosError } from "axios";
import type { ErrorDetail, ErrorEnvelope } from "@/types/api";

export class ApiError extends Error {
  readonly status: number | null;
  readonly code: string | null;
  readonly details: ErrorDetail[];

  constructor(message: string, status: number | null, code: string | null, details: ErrorDetail[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function isErrorEnvelope(value: unknown): value is ErrorEnvelope {
  if (!value || typeof value !== "object") {
    return false;
  }
  const record = value as Record<string, unknown>;
  return record.success === false && typeof record.message === "string";
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.code === "INVALID_CREDENTIALS") {
      return error.message || "Invalid email or username or password.";
    }
    if (error.code === "UNAUTHORIZED" || error.status === 401) {
      return "Your session may have expired. Please sign in again.";
    }
    return error.message;
  }
  if (isAxiosError(error)) {
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      return "Something went wrong. Please try again.";
    }
    if (!error.response) {
      return "Unable to connect. Please check your connection.";
    }
    const status = error.response.status;
    if (status === 401) {
      return "Your session may have expired. Please sign in again.";
    }
    if (status >= 500) {
      return "Something went wrong. Please try again.";
    }
    const data: unknown = error.response.data;
    if (isErrorEnvelope(data)) {
      return data.message;
    }
  }
  if (error instanceof Error && error.message) {
    if (error.message.startsWith("AxiosError") || error.message.includes("status code")) {
      return "Something went wrong. Please try again.";
    }
    return error.message;
  }
  return "Something went wrong. Please try again.";
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }
  if (isAxiosError(error)) {
    const status = error.response?.status ?? null;
    const data: unknown = error.response?.data;
    if (isErrorEnvelope(data)) {
      const details = Array.isArray(data.error.details)
        ? data.error.details.filter(
            (item): item is ErrorDetail =>
              Boolean(item) && typeof item === "object" && ("field" in item || "message" in item),
          )
        : [];
      return new ApiError(data.message, status, data.error.code, details);
    }
    if (!error.response) {
      return new ApiError("Unable to connect. Please check your connection.", null, "NETWORK", []);
    }
    if (status === 401) {
      return new ApiError(
        "Your session may have expired. Please sign in again.",
        401,
        "UNAUTHORIZED",
        [],
      );
    }
    if (status !== null && status >= 500) {
      return new ApiError("Something went wrong. Please try again.", status, "INTERNAL_ERROR", []);
    }
  }
  return new ApiError("Something went wrong. Please try again.", null, "UNKNOWN", []);
}
