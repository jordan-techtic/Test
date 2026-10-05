export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (typeof raw === "string" && raw.trim() !== "") {
    return raw.trim().replace(/\/+$/, "");
  }
  return "http://127.0.0.1:3000";
}

export function joinApiUrl(path: string): string {
  const base = getApiBaseUrl();
  if (!base) {
    return path;
  }
  return `${base}${path}`;
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

export async function apiRequest(
  method: string,
  path: string,
  options?: { body?: Record<string, string | boolean>; token?: string | null },
): Promise<unknown> {
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
  return parsed;
}
