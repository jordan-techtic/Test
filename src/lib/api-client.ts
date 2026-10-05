import { apiUrl } from "./api-base";
import type { LoginRequest, LoginResponse } from "../types/auth";

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `Request failed with status ${status}`);
    this.status = status;
    this.body = body;
  }
}

const ACCESS_TOKEN_KEY = "luna_access_token";

export function getStoredAccessToken(): string | null {
  try {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredAccessToken(token: string | null): void {
  try {
    if (token) {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  } catch {
    // ignore storage failures
  }
}

async function parseJsonBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function apiRequest(
  method: string,
  path: string,
  options?: { body?: unknown; auth?: boolean },
): Promise<unknown> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (options?.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (options?.auth !== false) {
    const token = getStoredAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(apiUrl(path), {
    method,
    headers,
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const body = await parseJsonBody(response);
  if (response.status === 401) {
    setStoredAccessToken(null);
    throw new ApiError(response.status, body, "Unauthorized");
  }
  if (!response.ok) {
    throw new ApiError(response.status, body);
  }
  return body;
}

export function unwrapPayload(payload: unknown, unwrapKey: string | null): unknown {
  if (!unwrapKey || payload === null || typeof payload !== "object") {
    return payload;
  }
  const record = payload as Record<string, unknown>;
  if (unwrapKey in record) {
    return record[unwrapKey];
  }
  return payload;
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const body = await apiRequest("POST", "/api/auth/login", {
    body: request,
    auth: false,
  });
  const parsed = body as LoginResponse;
  if (parsed?.data?.accessToken) {
    setStoredAccessToken(parsed.data.accessToken);
  }
  return parsed;
}

export async function logout(): Promise<void> {
  try {
    await apiRequest("GET", "/api/auth/logout", { auth: true });
  } catch {
    // best-effort server logout when explicitly invoked
  } finally {
    setStoredAccessToken(null);
  }
}
