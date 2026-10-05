const DEV_DEFAULT_API_BASE = "http://127.0.0.1:3000";

/** Resolve API origin; empty means same-origin requests (production must set VITE_API_BASE_URL). */
export function getApiBase(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (typeof raw !== "string" || raw.trim() === "") {
    if (import.meta.env.DEV) {
      return DEV_DEFAULT_API_BASE.replace(/\/+$/, "");
    }
    return "";
  }
  return raw.replace(/\/+$/, "");
}

/** Fail before a contract write when production has no API origin configured. */
export function assertApiBaseForContractWrite(): void {
  if (import.meta.env.DEV) {
    return;
  }
  if (!getApiBase()) {
    throw new Error(
      "VITE_API_BASE_URL must be set to the backend origin (e.g. http://127.0.0.1:3000). Copy .env.example to .env.",
    );
  }
}

/** Join base origin with contract path (path must include its /api prefix). */
export function apiUrl(path: string): string {
  const base = getApiBase();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!base) {
    return normalizedPath;
  }
  return `${base}${normalizedPath}`;
}
