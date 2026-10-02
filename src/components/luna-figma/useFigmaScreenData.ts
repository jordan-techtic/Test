/** luna-spec-codegen: data-hook — wire API data here; do not restyle. */
import {
  createContext,
  createElement,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import {
  ApiClientError,
  apiRequest,
  clearStoredAccessToken,
  getStoredAccessToken,
  setStoredAccessToken,
} from "../../lib/api-client";
import type {
  DashboardOverviewData,
  DashboardOverviewResponse,
  LoginResponse,
  ProfileData,
  ProfileResponse,
} from "../../types/api";
import {
  fieldErrorsFromResponse,
  figmaReadOperation,
  figmaWriteOperation,
  requestBodyFor,
  UNRESOLVED_FIGMA_FIELDS,
  validateValues,
  valuesFromResponse,
  type FigmaFieldValues,
  type FigmaOperation,
} from "./figmaFieldContract";
import { FieldErrorAnnouncer, ScreenStatusAnnouncer } from "./figmaScreenStatus";

export type FigmaFieldBinding = {
  value?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  title?: string;
};

export type FigmaActionBinding = {
  onClick?: (event: { preventDefault: () => void }) => void;
  disabled?: boolean;
  "aria-busy"?: boolean;
};

const REMEMBER_EMAIL_KEY = "agentwise_remember_email";

function frameIdFromRoute(routePath: string | undefined): string {
  const path = (routePath ?? "").replace(/^\/+|\/+$/g, "");
  if (path === "profile") {
    return "3158:22053";
  }
  if (path === "sign-in" || path === "signin" || path === "login" || path === "sign-up") {
    return "998:1024";
  }
  if (path === "about-us") {
    return "572:2518";
  }
  return "4543:3496";
}

function shouldRedirectToSignInOnAuthFailure(frameId: string): boolean {
  return frameId === "4543:3496" || frameId === "3158:22053";
}

type ScreenDataContextValue = {
  bound: string;
  values: FigmaFieldValues;
  fieldErrors: Record<string, string>;
  submitting: boolean;
  loading: boolean;
  dashboard: DashboardOverviewData | null;
  submit: () => Promise<void>;
  setFieldValue: (field: string, next: string | boolean) => void;
  refetchRead: () => Promise<void>;
};

const ScreenDataContext = createContext<ScreenDataContextValue | null>(null);

function initialLocalValues(frameId: string): FigmaFieldValues {
  const values: FigmaFieldValues = {};
  const unresolved = UNRESOLVED_FIGMA_FIELDS[frameId] ?? [];
  if (unresolved.includes("checkbox")) {
    values.checkbox = false;
  }
  if (unresolved.includes("iconbutton")) {
    values.iconbutton = "";
  }
  if (frameId === "998:1024") {
    try {
      const remembered = localStorage.getItem(REMEMBER_EMAIL_KEY);
      if (remembered) {
        values.email = remembered;
        values.checkbox = true;
      }
    } catch {
      // ignore storage failures
    }
  }
  return values;
}

function isAuthFailure(status: number, body: unknown): boolean {
  if (status === 401) {
    return true;
  }
  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const error = record?.error && typeof record.error === "object" ? (record.error as Record<string, unknown>) : null;
  return error?.code === "INVALID_TOKEN";
}

function redirectToSignIn(): void {
  clearStoredAccessToken();
  window.location.assign("/sign-in");
}

function formatCreditUsage(metrics: DashboardOverviewData["analytics"]["analytics_data"]): string {
  const current = metrics.current_ai_credits.toLocaleString();
  const total = metrics.total_ai_credits.toLocaleString();
  return `${current} / ${total}`;
}

const PROFILE_ADDRESS_KEYS = ["street", "city", "state", "zip", "country"] as const;

function profileRecordForForm(data: ProfileData): Record<string, unknown> {
  const record: Record<string, unknown> = { ...data };
  const details = data.address_details;
  if (details && typeof details === "object") {
    for (const key of PROFILE_ADDRESS_KEYS) {
      const top = record[key];
      const nested = details[key];
      if ((top === null || top === undefined || top === "") && nested !== null && nested !== undefined) {
        record[key] = nested;
      }
    }
  }
  return record;
}

function profileFormValuesFromPayload(
  readOp: FigmaOperation,
  payload: ProfileResponse,
): FigmaFieldValues {
  return valuesFromResponse(readOp, { data: profileRecordForForm(payload.data) });
}

function applyProfileHeaderBindings(data: ProfileData): void {
  const displayName = data.full_name?.trim() || data.name?.trim() || "";
  if (!displayName) {
    return;
  }
  for (const selector of ['[data-figma-node="3158:22834"]', '[data-figma-node="I3158:22263;1226:1920"]']) {
    const node = document.querySelector(selector);
    if (node) {
      node.textContent = displayName;
    }
  }
}

function applyDashboardTextBindings(data: DashboardOverviewData): void {
  const fullName =
    data.profile?.full_name?.trim() ||
    data.analytics?.full_name?.trim() ||
    "";
  if (fullName) {
    const nameNode = document.querySelector('[data-figma-node="I4543:3853;1226:1920"]');
    if (nameNode) {
      nameNode.textContent = fullName;
    }
  }
  const metrics = data.analytics?.analytics_data;
  if (metrics) {
    const usageNode = document.querySelector('[data-figma-node="I4543:3853;1237:2195"]');
    if (usageNode) {
      usageNode.textContent = formatCreditUsage(metrics);
    }
  }
}

async function runWriteOperation(
  op: FigmaOperation,
  values: FigmaFieldValues,
): Promise<{ ok: true; payload: unknown } | { ok: false; status: number; body: unknown }> {
  const body = requestBodyFor(op, values);
  try {
    const payload = await apiRequest<unknown>(op.method, op.path, { body });
    return { ok: true, payload };
  } catch (error) {
    if (error instanceof ApiClientError) {
      return { ok: false, status: error.status, body: error.body };
    }
    throw error;
  }
}

export function FigmaScreenDataProvider({
  routePath,
  children,
}: {
  routePath?: string;
  children?: ReactNode;
}) {
  const frameId = frameIdFromRoute(routePath);
  const readOp = figmaReadOperation(frameId);
  const writeOp = figmaWriteOperation(frameId);

  const [values, setValues] = useState<FigmaFieldValues>(() => initialLocalValues(frameId));
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [dashboard, setDashboard] = useState<DashboardOverviewData | null>(null);
  const [profileHeader, setProfileHeader] = useState<ProfileData | null>(null);

  useEffect(() => {
    setValues(initialLocalValues(frameId));
    setFieldErrors({});
    setStatusMessage("");
    setDashboard(null);
    setProfileHeader(null);
  }, [frameId]);

  const refetchRead = useCallback(async () => {
    if (!readOp) {
      return;
    }
    setLoading(true);
    const loadingLabel =
      readOp.path === "/api/dashboard" ? "Loading dashboard" : "Loading profile";
    setStatusMessage(loadingLabel);
    try {
      if (readOp.path === "/api/dashboard") {
        const payload = await apiRequest<DashboardOverviewResponse>(readOp.method, readOp.path);
        const unwrapped = valuesFromResponse(readOp, payload);
        const data =
          payload && typeof payload === "object" && "data" in payload
            ? (payload as DashboardOverviewResponse).data
            : (unwrapped as unknown as DashboardOverviewData);
        setDashboard(data);
        setStatusMessage("Dashboard loaded");
        applyDashboardTextBindings(data);
      } else if (readOp.path === "/api/profile") {
        const payload = await apiRequest<ProfileResponse>(readOp.method, readOp.path);
        setValues((prev) => ({ ...prev, ...profileFormValuesFromPayload(readOp, payload) }));
        setProfileHeader(payload.data);
        setStatusMessage("Profile loaded");
      }
    } catch (error) {
      if (error instanceof ApiClientError) {
        if (
          isAuthFailure(error.status, error.body) &&
          shouldRedirectToSignInOnAuthFailure(frameId) &&
          getStoredAccessToken()
        ) {
          redirectToSignIn();
          return;
        }
        setStatusMessage(error.message);
      } else {
        setStatusMessage(
          readOp.path === "/api/dashboard" ? "Unable to load dashboard" : "Unable to load profile",
        );
      }
    } finally {
      setLoading(false);
    }
  }, [frameId, readOp]);

  useEffect(() => {
    void refetchRead();
  }, [refetchRead]);

  useEffect(() => {
    if (frameId === "4543:3496" && dashboard) {
      applyDashboardTextBindings(dashboard);
    }
  }, [dashboard, frameId]);

  useEffect(() => {
    if (frameId === "3158:22053" && profileHeader) {
      applyProfileHeaderBindings(profileHeader);
    }
  }, [frameId, profileHeader]);

  const setFieldValue = useCallback((field: string, next: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: next }));
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }, []);

  const submit = useCallback(async () => {
    if (!writeOp) {
      return;
    }
    setSubmitting(true);
    setStatusMessage("Submitting");
    const clientErrors = validateValues(writeOp, values);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatusMessage("Fix the highlighted fields");
      setSubmitting(false);
      return;
    }
    const result = await runWriteOperation(writeOp, values);
    if (!result.ok) {
      if (isAuthFailure(result.status, result.body)) {
        clearStoredAccessToken();
        if (writeOp.path === "/api/auth/login" && writeOp.method === "POST") {
          const serverErrors = fieldErrorsFromResponse(writeOp, result.body);
          if (Object.keys(serverErrors).length > 0) {
            setFieldErrors(serverErrors);
            setStatusMessage("Fix the highlighted fields");
          } else if (result.body && typeof result.body === "object" && "message" in result.body) {
            const message = (result.body as { message?: string }).message;
            setStatusMessage(typeof message === "string" ? message : "Sign in failed");
          } else {
            setStatusMessage("Sign in failed");
          }
          setSubmitting(false);
          return;
        }
        redirectToSignIn();
        setSubmitting(false);
        return;
      }
      const serverErrors = fieldErrorsFromResponse(writeOp, result.body);
      if (Object.keys(serverErrors).length > 0) {
        setFieldErrors(serverErrors);
        setStatusMessage("Fix the highlighted fields");
      } else if (result.body && typeof result.body === "object" && "message" in result.body) {
        const message = (result.body as { message?: string }).message;
        setStatusMessage(typeof message === "string" ? message : "Request failed");
      } else {
        setStatusMessage("Request failed");
      }
      setSubmitting(false);
      return;
    }

    if (writeOp.path === "/api/auth/login" && writeOp.method === "POST") {
      const login = result.payload as LoginResponse;
      const token = login.data?.accessToken ?? login.data?.token;
      if (token) {
        setStoredAccessToken(token);
      }
      if (values.checkbox === true && typeof values.email === "string") {
        localStorage.setItem(REMEMBER_EMAIL_KEY, values.email);
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }
      setStatusMessage("Signed in successfully");
      setSubmitting(false);
      window.location.assign("/dashboard");
      return;
    }

    if (writeOp.path === "/api/profile" && writeOp.method === "PUT") {
      setFieldErrors({});
      setStatusMessage("Profile saved");
      if (readOp) {
        await refetchRead();
      }
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
  }, [readOp, refetchRead, values, writeOp]);

  const contextValue = useMemo<ScreenDataContextValue>(
    () => ({
      bound: frameId,
      values,
      fieldErrors,
      submitting,
      loading,
      dashboard,
      submit,
      setFieldValue,
      refetchRead,
    }),
    [dashboard, fieldErrors, frameId, loading, refetchRead, setFieldValue, submit, submitting, values],
  );

  return createElement(
    ScreenDataContext.Provider,
    { value: contextValue },
    createElement(
      Fragment,
      null,
      children,
      createElement(ScreenStatusAnnouncer, { statusMessage, loading }),
      createElement(FieldErrorAnnouncer, { fieldErrors }),
    ),
  );
}

function useScreenContext(): ScreenDataContextValue {
  const ctx = useContext(ScreenDataContext);
  if (!ctx) {
    return {
      bound: "",
      values: {},
      fieldErrors: {},
      submitting: false,
      loading: false,
      dashboard: null,
      submit: async () => {},
      setFieldValue: () => {},
      refetchRead: async () => {},
    };
  }
  return ctx;
}

export function figmaFieldProps(field: string): FigmaFieldBinding {
  const { values, fieldErrors, submitting, loading, setFieldValue } = useScreenContext();
  const error = fieldErrors[field];
  const raw = values[field];

  if (field === "checkbox") {
    return {
      checked: raw === true,
      disabled: submitting || loading,
      onChange: (event) => {
        const target = event.target as HTMLInputElement;
        setFieldValue(field, target.checked);
      },
    };
  }

  return {
    value: typeof raw === "string" ? raw : raw === undefined ? "" : String(raw),
    disabled: submitting || loading,
    onChange: (event) => {
      setFieldValue(field, event.target.value);
    },
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `figma-error-${field}` : undefined,
    title: error,
  };
}

const SUBMIT_ACTIONS = new Set(["act_90fcde8a6c8d", "act_e036a19a67f8"]);

export function figmaActionProps(action: string): FigmaActionBinding {
  const { submit, submitting, loading } = useScreenContext();

  if (SUBMIT_ACTIONS.has(action)) {
    return {
      disabled: submitting || loading,
      "aria-busy": submitting,
      onClick: (event) => {
        event.preventDefault();
        void submit();
      },
    };
  }

  return {
    onClick: () => {
      document.documentElement.setAttribute("data-figma-action-fired", action);
    },
  };
}

export function useFigmaScreenData() {
  const { bound, values, fieldErrors, submitting, loading, dashboard, submit, refetchRead } =
    useScreenContext();
  return {
    bound,
    values,
    fieldErrors,
    submitting,
    loading,
    dashboard,
    submit,
    refetchRead,
  };
}
