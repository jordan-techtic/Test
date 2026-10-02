import type { ApiErrorEnvelope } from "../types/api";

export class ApiClientError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `Request failed with status ${status}`);
    this.status = status;
    this.body = body;
  }
}

const DEFAULT_API_BASE_URL = "http://127.0.0.1:3000";

export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL ?? "";
  const trimmed = String(raw).trim();
  const base = trimmed || DEFAULT_API_BASE_URL;
  return base.replace(/\/$/, "");
}

export function buildApiUrl(path: string): string {
  const base = getApiBaseUrl();
  if (!base) {
    return path;
  }
  return `${base}${path}`;
}

export function getStoredAccessToken(): string | null {
  try {
    return localStorage.getItem("agentwise_access_token");
  } catch {
    return null;
  }
}

export function setStoredAccessToken(token: string): void {
  localStorage.setItem("agentwise_access_token", token);
}

export function clearStoredAccessToken(): void {
  localStorage.removeItem("agentwise_access_token");
}

export async function apiRequest<T>(
  method: string,
  path: string,
  options?: { body?: unknown; token?: string | null },
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (options?.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  const token = options?.token ?? getStoredAccessToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildApiUrl(path), {
    method,
    headers,
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  let parsed: unknown = null;
  if (text) {
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      parsed = text;
    }
  }

  if (!response.ok) {
    const envelope = parsed as ApiErrorEnvelope | null;
    const message =
      envelope && typeof envelope === "object" && "message" in envelope && typeof envelope.message === "string"
        ? envelope.message
        : undefined;
    throw new ApiClientError(response.status, parsed, message);
  }

  return parsed as T;
}
