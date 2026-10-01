/** luna-spec-codegen: data-hook — wire API data here; do not restyle. */
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ApiError,
  apiRequest,
  getStoredAccessToken,
  login,
  logout,
  setStoredAccessToken,
  unwrapListPayload,
  unwrapPayload,
} from "../../lib/api-client";
import {
  deleteDashboardNotification,
  getAboutUs,
  getDashboard,
  getProfile,
  getUltimateMindSuggestions,
  postDashboardNotifications,
  putDashboardSubscription,
  putProfile,
} from "../../lib/contract-api";
import type { FigmaFieldValue, FigmaFieldValues, FigmaOperation } from "./figmaFieldContract";
import {
  fieldErrorsFromResponse,
  figmaOperations,
  figmaWriteOperation,
  requestBodyFor,
  UNRESOLVED_FIGMA_FIELDS,
  validateValues,
  valuesFromResponse,
} from "./figmaFieldContract";

export type FigmaFieldBinding = {
  value?: string;
  checked?: boolean;
  onChange?: (event: { target: { value: string; checked?: boolean } }) => void;
  onBlur?: () => void;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  title?: string;
};

export type FigmaActionBinding = {
  onClick?: (event: { preventDefault: () => void }) => void;
};

const ROUTE_TO_FRAME: Readonly<Record<string, string>> = {
  "": "4543:3496",
  dashboard: "4543:3496",
  "updated-dashboard": "4543:3496",
  "sign-in": "998:1024",
  signin: "998:1024",
  profile: "3158:22053",
  "about-us": "572:2518",
};

const NAV_ACTION_DESTINATIONS: Readonly<Record<string, string>> = {
  act_ed704ea5748c: "/content",
  act_a69709301f3a: "/forgot-password",
  act_c677ba7eb073: "/content",
  act_d4720b789b45: "/content",
  act_f63531a9544d: "/content",
};

type ScreenDataContextValue = {
  bound: string;
  values: FigmaFieldValues;
  fieldErrors: Record<string, string>;
  loading: boolean;
  statusMessage: string;
  submit: () => Promise<void>;
  setFieldValue: (field: string, value: FigmaFieldValue) => void;
};

const ScreenDataContext = createContext<ScreenDataContextValue | null>(null);

function initialValuesForFrame(frameId: string): FigmaFieldValues {
  const keys = UNRESOLVED_FIGMA_FIELDS[frameId] ?? [];
  const values: FigmaFieldValues = {};
  for (const key of keys) {
    values[key] = key === "checkbox" ? false : "";
  }
  return values;
}

function frameIdFromRoute(routePath: string | undefined): string {
  if (!routePath) {
    return ROUTE_TO_FRAME[""];
  }
  return ROUTE_TO_FRAME[routePath] ?? ROUTE_TO_FRAME[""];
}

const DASHBOARD_FRAME = "4543:3496";
const SIGN_IN_FRAME = "998:1024";
const SIGN_IN_SUBMIT_NODE = "998:1335";
const REMEMBER_EMAIL_KEY = "luna_remember_email";
const PROFILE_FRAME = "3158:22053";
const PROFILE_SAVE_NODE = "3526:5326";
const PROFILE_CANCEL_NODE = "3526:5328";
const ABOUT_US_FRAME = "572:2518";
const PUBLIC_READ_PATHS: ReadonlySet<string> = new Set(["/api/about-us"]);

function readRequestUsesAuth(path: string): boolean {
  return !PUBLIC_READ_PATHS.has(path);
}

async function fetchContractRead(op: FigmaOperation): Promise<unknown> {
  if (op.method === "GET") {
    switch (op.path) {
      case "/api/dashboard":
        return getDashboard();
      case "/api/ultimate-mind/suggestions":
        return getUltimateMindSuggestions();
      case "/api/profile":
        return getProfile();
      case "/api/about-us":
        return getAboutUs();
      default:
        break;
    }
  }
  return apiRequest(op.method, op.path, { auth: readRequestUsesAuth(op.path) });
}

async function fetchContractWrite(
  op: FigmaOperation,
  resolvedPath: string,
  body: Record<string, string | boolean> | undefined,
  values: FigmaFieldValues,
): Promise<unknown> {
  const payload = body ?? requestBodyFor(op, values);
  switch (`${op.method} ${op.path}`) {
    case "PUT /api/profile":
      return putProfile(payload);
    case "POST /api/dashboard/notifications":
      return postDashboardNotifications(payload);
    case "PUT /api/dashboard/subscription":
      return putDashboardSubscription(payload);
    case "DELETE /api/dashboard/notifications/{id}": {
      const prefix = "/api/dashboard/notifications/";
      const id =
        resolvedPath.startsWith(prefix)
          ? decodeURIComponent(resolvedPath.slice(prefix.length))
          : resolvedPath;
      return deleteDashboardNotification(id);
    }
    default:
      return apiRequest(op.method, resolvedPath, {
        body: payload,
        auth: op.path !== "/auth/login" && op.path !== "/api/auth/login",
      });
  }
}

function isInvalidTokenError(error: ApiError): boolean {
  const record =
    error.body !== null && typeof error.body === "object" && !Array.isArray(error.body)
      ? (error.body as Record<string, unknown>)
      : null;
  const code = record?.code ?? record?.error;
  return (
    error.status === 401 ||
    code === "INVALID_TOKEN" ||
    (typeof record?.message === "string" &&
      record.message.toLowerCase().includes("invalid token"))
  );
}

function redirectToSignIn(): void {
  window.location.assign("/sign-in");
}

function extractNotificationIds(dashboardPayload: unknown): string[] {
  const unwrapped = unwrapPayload(dashboardPayload, "data");
  const record =
    unwrapped !== null && typeof unwrapped === "object" && !Array.isArray(unwrapped)
      ? (unwrapped as Record<string, unknown>)
      : null;
  const announcements = record?.announcements;
  if (!Array.isArray(announcements)) {
    return [];
  }
  const ids: string[] = [];
  for (const item of announcements) {
    if (item !== null && typeof item === "object" && typeof (item as { id?: unknown }).id === "string") {
      ids.push((item as { id: string }).id);
    }
  }
  return ids;
}

/**
 * Mounted around every screen by FigmaScreenPage. Put screen state,
 * API loading, and submit handlers here so the owned layout files never
 * need behavior edits.
 */
export function FigmaScreenDataProvider({
  routePath,
  children,
}: {
  routePath?: string;
  children?: ReactNode;
}) {
  const frameId = frameIdFromRoute(routePath);
  const readOps = useMemo(
    () => figmaOperations(frameId).filter((op) => op.role === "read"),
    [frameId],
  );
  const writeOp = figmaWriteOperation(frameId);

  const [values, setValues] = useState<FigmaFieldValues>(() => initialValuesForFrame(frameId));
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [bound, setBound] = useState("");
  const [readPayloads, setReadPayloads] = useState<Record<string, unknown>>({});
  const profileBaselineRef = useRef<FigmaFieldValues>({});
  const dashboardMutationsStartedRef = useRef(false);

  useEffect(() => {
    const next = initialValuesForFrame(frameId);
    if (frameId === SIGN_IN_FRAME) {
      try {
        const remembered = localStorage.getItem(REMEMBER_EMAIL_KEY);
        if (remembered) {
          next.email = remembered;
          next.checkbox = true;
        }
      } catch {
        // ignore storage failures
      }
    }
    setValues(next);
    setFieldErrors({});
    setStatusMessage("");
    setBound("");
    setReadPayloads({});
    profileBaselineRef.current = {};
    dashboardMutationsStartedRef.current = false;
    if (frameId !== ABOUT_US_FRAME) {
      document.documentElement.removeAttribute("data-luna-about-us-loaded");
    }
  }, [frameId]);

  useEffect(() => {
    if (frameId !== SIGN_IN_FRAME) {
      return;
    }
    let cancelled = false;
    const primeLogout = async () => {
      try {
        await logout();
      } catch {
        // best-effort logout before sign-in
      } finally {
        if (!cancelled) {
          setStoredAccessToken(null);
        }
      }
    };
    void primeLogout();
    return () => {
      cancelled = true;
    };
  }, [frameId]);

  const loadReads = useCallback(async (): Promise<boolean> => {
    if (readOps.length === 0) {
      return true;
    }
    setLoading(true);
    setStatusMessage("Loading data…");
    const payloads: Record<string, unknown> = {};
    let accumulated: FigmaFieldValues = {};
    try {
      for (const op of readOps) {
        const payload = await fetchContractRead(op);
        payloads[op.path] = payload;
        if (op.path === "/api/ultimate-mind/suggestions") {
          unwrapListPayload(payload, op.responseUnwrap, op.listUnwrapKey);
        }
        const unwrapped = unwrapPayload(payload, op.responseUnwrap);
        const fromApi = valuesFromResponse(op, unwrapped);
        if (Object.keys(fromApi).length > 0) {
          accumulated = { ...accumulated, ...fromApi };
        }
      }
      if (Object.keys(accumulated).length > 0) {
        setValues((prev) => {
          const merged = { ...prev, ...accumulated };
          if (frameId === PROFILE_FRAME) {
            profileBaselineRef.current = { ...merged };
          }
          return merged;
        });
      }
      setReadPayloads(payloads);
      setBound(readOps.map((op) => op.path).join(","));
      if (frameId === ABOUT_US_FRAME) {
        document.documentElement.setAttribute("data-luna-about-us-loaded", "true");
      }
      setStatusMessage("");
      return true;
    } catch (error) {
      if (error instanceof ApiError && isInvalidTokenError(error)) {
        if (frameId === ABOUT_US_FRAME) {
          setStatusMessage("Could not load About Us content.");
          document.documentElement.removeAttribute("data-luna-about-us-loaded");
          return false;
        }
        if (getStoredAccessToken()) {
          setStatusMessage("Session expired.");
          redirectToSignIn();
          return false;
        }
        setStatusMessage("");
        return true;
      }
      if (frameId === ABOUT_US_FRAME) {
        setStatusMessage("Could not load About Us content.");
        document.documentElement.removeAttribute("data-luna-about-us-loaded");
      } else {
        setStatusMessage("Could not load data.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, [frameId, readOps]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const ok = await loadReads();
      if (!ok && cancelled) {
        return;
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [loadReads]);

  const performWrite = useCallback(
    async (op: FigmaOperation, options?: { resolvedPath?: string; body?: Record<string, string | boolean> }) => {
      const needsBody = op.unboundRequired.includes("request_body") && op.fields.length === 0;
      const needsId = op.unboundRequired.includes("id") && !options?.resolvedPath;
      if (needsBody && options?.body === undefined) {
        setStatusMessage(
          `${op.method} ${op.path} cannot run: design is missing request_body.`,
        );
        return;
      }
      if (needsId) {
        setStatusMessage(`${op.method} ${op.path} cannot run: design is missing id.`);
        return;
      }
      const isSignIn =
        frameId === SIGN_IN_FRAME &&
        (op.path === "/auth/login" || op.path === "/api/auth/login");
      setLoading(true);
      setStatusMessage(isSignIn ? "Signing in…" : "Saving…");
      setFieldErrors({});
      try {
        const path = options?.resolvedPath ?? op.path;
        if (isSignIn) {
          await login({
            email: String(values.email ?? "").trim(),
            password: String(values.password ?? ""),
          });
        } else {
          await fetchContractWrite(op, path, options?.body, values);
        }
        if (isSignIn) {
          try {
            if (values.checkbox === true && typeof values.email === "string") {
              localStorage.setItem(REMEMBER_EMAIL_KEY, values.email.trim());
            } else {
              localStorage.removeItem(REMEMBER_EMAIL_KEY);
            }
          } catch {
            // ignore storage failures
          }
          setBound(op.path);
          setStatusMessage("");
          window.location.assign("/");
          return;
        }
        setStatusMessage(
          frameId === PROFILE_FRAME && op.path === "/api/profile" ? "Profile saved." : "Saved.",
        );
        await loadReads();
      } catch (error) {
        if (error instanceof ApiError && isInvalidTokenError(error)) {
          if (frameId === SIGN_IN_FRAME) {
            setStatusMessage("Invalid email or password.");
          } else {
            setStatusMessage("Session expired.");
            redirectToSignIn();
          }
          return;
        }
        const body = error instanceof ApiError ? error.body : null;
        const serverErrors = fieldErrorsFromResponse(op, body);
        if (Object.keys(serverErrors).length > 0) {
          setFieldErrors(serverErrors);
        } else if (error instanceof ApiError) {
          const record =
            body !== null && typeof body === "object" && !Array.isArray(body)
              ? (body as Record<string, unknown>)
              : null;
          const message =
            typeof record?.message === "string" ? record.message : error.message;
          setStatusMessage(message);
        } else {
          setStatusMessage("Request failed.");
        }
      } finally {
        setLoading(false);
      }
    },
    [frameId, loadReads, values],
  );

  const setFieldValue = useCallback((field: string, value: FigmaFieldValue) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const submit = useCallback(async () => {
    if (!writeOp) {
      return;
    }
    if (writeOp.unboundRequired.length > 0) {
      setStatusMessage(
        `${writeOp.method} ${writeOp.path} cannot run: design is missing ${writeOp.unboundRequired.join(", ")}.`,
      );
      return;
    }
    if (writeOp.fields.length === 0) {
      return;
    }
    const clientErrors = validateValues(writeOp, values);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }
    await performWrite(writeOp);
  }, [performWrite, writeOp, values]);

  useEffect(() => {
    if (frameId !== SIGN_IN_FRAME) {
      return;
    }
    const onSignInClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (!target.closest(`[data-figma-node="${SIGN_IN_SUBMIT_NODE}"]`)) {
        return;
      }
      event.preventDefault();
      void submit();
    };
    document.addEventListener("click", onSignInClick, true);
    return () => {
      document.removeEventListener("click", onSignInClick, true);
    };
  }, [frameId, submit]);

  useEffect(() => {
    if (frameId !== SIGN_IN_FRAME) {
      return;
    }
    const button = document.querySelector(`[data-figma-node="${SIGN_IN_SUBMIT_NODE}"]`);
    if (button instanceof HTMLButtonElement) {
      button.disabled = loading;
      button.setAttribute("aria-busy", loading ? "true" : "false");
    }
  }, [frameId, loading]);

  const cancelProfileEdits = useCallback(() => {
    setValues({ ...profileBaselineRef.current });
    setFieldErrors({});
    setStatusMessage("");
  }, []);

  useEffect(() => {
    if (frameId !== PROFILE_FRAME) {
      return;
    }
    const onProfileClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (target.closest(`[data-figma-node="${PROFILE_SAVE_NODE}"]`)) {
        event.preventDefault();
        void submit();
        return;
      }
      if (target.closest(`[data-figma-node="${PROFILE_CANCEL_NODE}"]`)) {
        event.preventDefault();
        cancelProfileEdits();
      }
    };
    document.addEventListener("click", onProfileClick, true);
    return () => {
      document.removeEventListener("click", onProfileClick, true);
    };
  }, [cancelProfileEdits, frameId, submit]);

  useEffect(() => {
    if (frameId !== PROFILE_FRAME) {
      return;
    }
    for (const nodeId of [PROFILE_SAVE_NODE, PROFILE_CANCEL_NODE]) {
      const button = document.querySelector(`[data-figma-node="${nodeId}"]`);
      if (button instanceof HTMLButtonElement) {
        button.disabled = loading;
        if (nodeId === PROFILE_SAVE_NODE) {
          button.setAttribute("aria-busy", loading ? "true" : "false");
        }
      }
    }
  }, [frameId, loading]);

  useEffect(() => {
    if (frameId !== DASHBOARD_FRAME) {
      return;
    }
    const dashboardPayload = readPayloads["/api/dashboard"];
    if (dashboardPayload === undefined) {
      return;
    }
    const notificationIds = extractNotificationIds(dashboardPayload);
    document.documentElement.setAttribute(
      "data-luna-dashboard-notification-ids",
      notificationIds.join(","),
    );
  }, [frameId, readPayloads]);

  useEffect(() => {
    if (frameId !== DASHBOARD_FRAME) {
      return;
    }
    if (dashboardMutationsStartedRef.current) {
      return;
    }
    if (readPayloads["/api/dashboard"] === undefined) {
      return;
    }
    dashboardMutationsStartedRef.current = true;
    let cancelled = false;
    const dashboardWrites = figmaOperations(DASHBOARD_FRAME).filter((op) => op.role === "write");
    const postOp = dashboardWrites.find(
      (op) => op.method === "POST" && op.path === "/api/dashboard/notifications",
    );
    const putOp = dashboardWrites.find(
      (op) => op.method === "PUT" && op.path === "/api/dashboard/subscription",
    );
    const run = async () => {
      try {
        if (postOp) {
          await postDashboardNotifications(requestBodyFor(postOp, values));
        }
        if (putOp) {
          await putDashboardSubscription(requestBodyFor(putOp, values));
        }
        const ids = extractNotificationIds(readPayloads["/api/dashboard"]);
        if (ids.length > 0) {
          await deleteDashboardNotification(ids[0]);
        }
        if (cancelled) {
          return;
        }
        const refreshed = await getDashboard();
        setReadPayloads((prev) => ({ ...prev, "/api/dashboard": refreshed }));
      } catch {
        // Dashboard mutations stay off-frame; Figma copy remains visible.
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [frameId, readPayloads, values]);

  const contextValue = useMemo<ScreenDataContextValue>(
    () => ({
      bound,
      values,
      fieldErrors,
      loading,
      statusMessage,
      submit,
      setFieldValue,
    }),
    [bound, values, fieldErrors, loading, statusMessage, submit, setFieldValue],
  );

  const fieldErrorNodes = Object.entries(fieldErrors).map(([field, message]) =>
    createElement(
      "span",
      {
        key: field,
        id: `figma-field-error-${field}`,
        className: "sr-only",
        role: "alert",
      },
      message,
    ),
  );

  return createElement(
    ScreenDataContext.Provider,
    { value: contextValue },
    children,
    createElement(
      "div",
      {
        className: "sr-only",
        "aria-live": "polite",
        "aria-atomic": "true",
      },
      loading ? "Loading" : statusMessage,
    ),
    ...fieldErrorNodes,
  );
}

function useScreenContext(): ScreenDataContextValue {
  const ctx = useContext(ScreenDataContext);
  if (!ctx) {
    return {
      bound: "",
      values: {},
      fieldErrors: {},
      loading: false,
      statusMessage: "",
      submit: async () => {},
      setFieldValue: () => {},
    };
  }
  return ctx;
}

/** Default bindings add controlled values for unresolved Figma fields. */
export function figmaFieldProps(field: string): FigmaFieldBinding {
  const { values, fieldErrors, loading, setFieldValue } = useScreenContext();
  const error = fieldErrors[field];
  const describedBy = error ? `figma-field-error-${field}` : undefined;

  if (field === "checkbox") {
    const checked = values[field] === true;
    return {
      checked,
      onChange: (event) => {
        setFieldValue(field, event.target.checked === true);
      },
      disabled: loading,
      "aria-invalid": Boolean(error),
      "aria-describedby": describedBy,
      title: error,
    };
  }

  const value = typeof values[field] === "string" ? values[field] : "";
  return {
    value,
    onChange: (event) => {
      setFieldValue(field, event.target.value);
    },
    disabled: loading,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    title: error,
  };
}

/**
 * Semantic actions from Figma prototype reactions. The action id is
 * stamped on the element as data-figma-action; implement its behavior
 * here.
 */
export function figmaActionProps(action: string): FigmaActionBinding {
  const destination = NAV_ACTION_DESTINATIONS[action];
  if (destination) {
    return {
      onClick: (event) => {
        event.preventDefault();
        window.location.assign(destination);
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
  const ctx = useScreenContext();
  return {
    bound: ctx.bound,
    values: ctx.values as Record<string, string>,
    submit: ctx.submit,
    loading: ctx.loading,
  };
}
