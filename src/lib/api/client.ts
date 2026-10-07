import type {
  ApiSuccessEnvelope,
  DashboardOverviewResponse,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  SignupRequest,
  SignupResponse,
  UpdateProfileRequest,
} from "../../types/api";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:3000";

export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (typeof raw === "string" && raw.trim() !== "") {
    return raw.trim().replace(/\/+$/, "");
  }
  return DEFAULT_API_BASE_URL;
}

export function joinApiUrl(path: string): string {
  return `${getApiBaseUrl()}${path}`;
}

export class ApiRequestError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `Request failed with status ${status}`);
    this.status = status;
    this.body = body;
  }
}

export async function apiRequest<T = unknown, B = undefined>(
  method: string,
  path: string,
  options?: { body?: B; token?: string | null },
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (options?.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }
  let body: string | undefined;
  if (options?.body !== undefined && method !== "GET" && method !== "HEAD") {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.body);
  }
  const response = await fetch(joinApiUrl(path), {
    method,
    headers,
    body,
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
    const record =
      parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : null;
    const message =
      typeof record?.message === "string" ? record.message : undefined;
    throw new ApiRequestError(response.status, parsed, message);
  }
  return parsed as T;
}

export function loginRequest(body: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse, LoginRequest>("POST", "/auth/login", { body });
}

export function logoutRequest(token: string): Promise<unknown> {
  return apiRequest("GET", "/api/auth/logout", { token });
}

export function signupRequest(body: SignupRequest): Promise<SignupResponse> {
  return apiRequest<SignupResponse, SignupRequest>("POST", "/api/auth/signup", { body });
}

export function dashboardOverviewRequest(
  token: string,
): Promise<DashboardOverviewResponse> {
  return apiRequest<DashboardOverviewResponse>("GET", "/api/dashboard", { token });
}

export function postDashboardNotificationRequest(
  token: string,
  body: Record<string, unknown> = {},
): Promise<ApiSuccessEnvelope<unknown>> {
  return apiRequest<ApiSuccessEnvelope<unknown>, Record<string, unknown>>(
    "POST",
    "/api/dashboard/notifications",
    { body, token },
  );
}

export function putDashboardSubscriptionRequest(
  token: string,
  body: Record<string, unknown> = {},
): Promise<ApiSuccessEnvelope<unknown>> {
  return apiRequest<ApiSuccessEnvelope<unknown>, Record<string, unknown>>(
    "PUT",
    "/api/dashboard/subscription",
    { body, token },
  );
}

export function deleteDashboardNotificationRequest(
  token: string,
  id: string,
): Promise<unknown> {
  return apiRequest(
    "DELETE",
    `/api/dashboard/notifications/${encodeURIComponent(id)}`,
    { token },
  );
}

export function ultimateMindSuggestionsRequest(token: string): Promise<unknown> {
  return apiRequest("GET", "/api/ultimate-mind/suggestions", { token });
}

export function profileRequest(token: string): Promise<ProfileResponse> {
  return apiRequest<ProfileResponse>("GET", "/api/profile", { token });
}

export function updateProfileRequest(
  token: string,
  body: UpdateProfileRequest,
): Promise<ProfileResponse> {
  return apiRequest<ProfileResponse, UpdateProfileRequest>("PUT", "/api/profile", {
    body,
    token,
  });
}
