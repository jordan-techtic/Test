/** luna-spec-codegen: data-hook — wire API data here; do not restyle.
 * Consumed reads (role read, non-empty fields) use resolveBoundRead from
 * figmaMockReads.ts inside loadReads.
 */
import {
  createContext,
  createElement,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  apiRequest,
  ApiRequestError,
  dashboardOverviewRequest,
  deleteDashboardNotificationRequest,
  loginRequest,
  postDashboardNotificationRequest,
  profileRequest,
  putDashboardSubscriptionRequest,
  signupRequest,
  ultimateMindSuggestionsRequest,
  updateProfileRequest,
} from "../../lib/api/client";
import type { LoginRequest, SignupRequest, UpdateProfileRequest } from "../../types/api";
import {
  clearStoredAccessToken,
  getStoredAccessToken,
  setStoredAccessToken,
} from "../../lib/api/token";
import { clearReadPayloads, publishReadPayload } from "./figmaDisplay";
import {
  fieldErrorsFromResponse,
  figmaReadOperations,
  figmaWriteOperation,
  requestBodyFor,
  validateValues,
  valuesFromResponse,
  type FigmaFieldValues,
  type FigmaOperation,
} from "./figmaFieldContract";
import { resolveBoundRead } from "./figmaMockReads";

export type FigmaFieldBinding = {
  value?: string;
  checked?: boolean;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  title?: string;
  style?: CSSProperties;
};

export type FigmaActionBinding = {
  onClick?: (event: { preventDefault: () => void }) => void;
  disabled?: boolean;
};

type ScreenDataContextValue = {
  frameId: string;
  bound: string;
  values: FigmaFieldValues;
  fieldErrors: Record<string, string>;
  loading: boolean;
  submitting: boolean;
  submit: () => Promise<void>;
  runAction: (action: string) => Promise<void>;
  setFieldValue: (field: string, value: string | boolean) => void;
};

const ROUTE_TO_FRAME: Readonly<Record<string, string>> = {
  "": "4543:3496",
  dashboard: "4543:3496",
  "updated-dashboard": "4543:3496",
  login: "998:1024",
  "sign-in": "998:1024",
  profile: "3158:22053",
};

/** Submit actions bound in the generated contract (empty until operations are wired). */
const SUBMIT_ACTION_IDS = new Set(["act_90fcde8a6c8d", "act_e036a19a67f8"]);

/** Dashboard controls bound to ticket-scoped write/read actions. */
const DASHBOARD_ACTION_IDS = new Set([
  "post-notification",
  "put-subscription",
  "delete-notification",
  "ultimate-mind-session",
]);

const ScreenDataContext = createContext<ScreenDataContextValue | null>(null);

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

async function fetchReadPayload(op: FigmaOperation): Promise<unknown> {
  const token = getStoredAccessToken();
  if (op.method === "GET" && op.path === "/api/dashboard") {
    return dashboardOverviewRequest(token ?? "");
  }
  if (op.method === "GET" && op.path === "/api/ultimate-mind/suggestions") {
    return ultimateMindSuggestionsRequest(token ?? "");
  }
  if (op.method === "GET" && op.path === "/api/profile") {
    return profileRequest(token ?? "");
  }
  return apiRequest(op.method, op.path, { token });
}

function isAuthFailure(error: unknown): boolean {
  if (!(error instanceof ApiRequestError)) {
    return false;
  }
  if (error.status === 401) {
    return true;
  }
  const record = asRecord(error.body);
  const err = record ? asRecord(record.error) : null;
  return err?.code === "INVALID_TOKEN";
}

function validateCheckboxRequired(
  op: FigmaOperation,
  values: FigmaFieldValues,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of op.fields) {
    if (
      field.required &&
      (field.kind === "checkbox" || field.kind === "switch") &&
      values[field.figmaField] !== true
    ) {
      errors[field.figmaField] = "This field is required.";
    }
  }
  return errors;
}

function useScreenDataContext(): ScreenDataContextValue {
  const ctx = useContext(ScreenDataContext);
  if (!ctx) {
    const noop = async () => {};
    return {
      frameId: "",
      bound: "",
      values: {},
      fieldErrors: {},
      loading: false,
      submitting: false,
      submit: noop,
      runAction: noop,
      setFieldValue: () => {},
    };
  }
  return ctx;
}

/**
 * Mounted around every screen by FigmaScreenPage. Put screen state,
 * API loading, and submit handlers here so the owned layout files never
 * need behavior edits.
 */
export function FigmaScreenDataProvider({
  routePath = "",
  children,
}: {
  routePath?: string;
  children?: ReactNode;
}) {
  const frameId = ROUTE_TO_FRAME[routePath] ?? "";
  const writeOp = frameId ? figmaWriteOperation(frameId) : undefined;
  const readOps = frameId ? figmaReadOperations(frameId) : [];

  const [values, setValues] = useState<FigmaFieldValues>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const loadReadsGenerationRef = useRef(0);
  const firstAnnouncementIdRef = useRef<string | null>(null);

  const bound = writeOp
    ? `${writeOp.method} ${writeOp.path}`
    : readOps[0]
      ? `${readOps[0].method} ${readOps[0].path}`
      : "";

  const setFieldValue = useCallback((figmaField: string, next: string | boolean) => {
    setValues((prev) => ({ ...prev, [figmaField]: next }));
    setFieldErrors((prev) => {
      if (!prev[figmaField]) {
        return prev;
      }
      const copy = { ...prev };
      delete copy[figmaField];
      return copy;
    });
  }, []);

  const handleAuthFailure = useCallback(() => {
    loadReadsGenerationRef.current += 1;
    clearReadPayloads();
    clearStoredAccessToken();
    setStatusMessage("Session expired.");
    if (typeof window !== "undefined") {
      const path = routePath || window.location.pathname.replace(/^\/+|\/+$/g, "");
      if (path !== "login" && path !== "sign-in") {
        window.location.assign("/sign-in");
      }
    }
  }, [routePath]);

  const loadReads = useCallback(async () => {
    if (!frameId || readOps.length === 0) {
      return;
    }
    const generation = loadReadsGenerationRef.current;
    setLoading(true);
    setStatusMessage("Loading.");

    let mergedValues: FigmaFieldValues = {};

    try {
      for (const op of readOps) {
        if (generation !== loadReadsGenerationRef.current) {
          return;
        }

        let rawBody: unknown;

        if (op.fields.length > 0) {
          const resolution = resolveBoundRead(op);
          if (resolution.mode === "missing") {
            setStatusMessage(resolution.diagnostic);
            continue;
          }
          if (resolution.mode === "mock") {
            rawBody = resolution.body;
          } else {
            try {
              rawBody = await fetchReadPayload(op);
            } catch (error) {
              if (isAuthFailure(error)) {
                handleAuthFailure();
                return;
              }
              const message =
                error instanceof ApiRequestError ? error.message : "Could not load data.";
              setStatusMessage(message);
              continue;
            }
          }
        } else {
          try {
            rawBody = await fetchReadPayload(op);
          } catch (error) {
            if (isAuthFailure(error)) {
              handleAuthFailure();
              return;
            }
            const message =
              error instanceof ApiRequestError ? error.message : "Could not load data.";
            setStatusMessage(message);
            continue;
          }
        }

        if (generation !== loadReadsGenerationRef.current) {
          return;
        }

        publishReadPayload(op.method, op.path, rawBody);

        if (op.method === "GET" && op.path === "/api/dashboard") {
          const outer = asRecord(rawBody);
          const data = outer ? asRecord(outer.data) : null;
          const announcements = data?.announcements;
          if (Array.isArray(announcements) && announcements.length > 0) {
            const first = asRecord(announcements[0]);
            firstAnnouncementIdRef.current =
              typeof first?.id === "string" ? first.id : null;
          } else {
            firstAnnouncementIdRef.current = null;
          }
        }

        if (op.fields.length > 0) {
          mergedValues = {
            ...mergedValues,
            ...valuesFromResponse(op, rawBody),
          };
        }
      }

      if (Object.keys(mergedValues).length > 0) {
        setValues((prev) => ({ ...prev, ...mergedValues }));
      }
      setStatusMessage("");
    } finally {
      setLoading(false);
    }
  }, [frameId, readOps, handleAuthFailure]);

  useEffect(() => {
    void loadReads();
  }, [loadReads]);

  const submit = useCallback(async () => {
    const writeOperation = figmaWriteOperation(frameId);
    if (!writeOperation) {
      return;
    }

    const clientErrors = {
      ...validateValues(writeOperation, values),
      ...validateCheckboxRequired(writeOperation, values),
    };
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatusMessage("Fix the highlighted fields.");
      return;
    }

    setFieldErrors({});
    setSubmitting(true);
    setStatusMessage(`Submitting ${writeOperation.method} ${writeOperation.path}.`);

    const isLogin = writeOperation.path === "/auth/login";
    const isSignup = writeOperation.path === "/api/auth/signup";
    const isPublicAuth = isLogin || isSignup;

    try {
      const body = requestBodyFor(writeOperation, values);

      if (isLogin) {
        const loginBody: LoginRequest = {
          email: String(body.email ?? ""),
          password: String(body.password ?? ""),
        };
        const response = await loginRequest(loginBody);
        const data = response.data;
        const accessToken = data.accessToken || data.token;
        if (!accessToken) {
          setStatusMessage("Sign-in response did not include an access token.");
          return;
        }
        setStoredAccessToken(accessToken, values.checkbox === true);
        if (typeof window !== "undefined") {
          window.location.assign("/dashboard");
        }
        return;
      }

      if (isSignup) {
        const signupBody: SignupRequest = {
          first_name: String(body.first_name ?? ""),
          last_name: String(body.last_name ?? ""),
          email: String(body.email ?? ""),
          password: String(body.password ?? ""),
          terms_accepted: body.terms_accepted === true,
          ...(typeof body.phone === "string" && body.phone.trim() !== ""
            ? { phone: body.phone }
            : {}),
        };
        const response = await signupRequest(signupBody);
        setStatusMessage(response.message);
        if (typeof window !== "undefined") {
          window.location.assign("/sign-in");
        }
        return;
      }

      if (writeOperation.method === "PUT" && writeOperation.path === "/api/profile") {
        const profileBody: UpdateProfileRequest = {
          first_name: String(body.first_name ?? ""),
          last_name: String(body.last_name ?? ""),
          email: String(body.email ?? ""),
          mobile_number:
            typeof body.mobile_number === "string" ? body.mobile_number : undefined,
          bio: typeof body.bio === "string" ? body.bio : undefined,
          time_zone: typeof body.time_zone === "string" ? body.time_zone : undefined,
          street: typeof body.street === "string" ? body.street : undefined,
          country: typeof body.country === "string" ? body.country : undefined,
          state: typeof body.state === "string" ? body.state : undefined,
          city: typeof body.city === "string" ? body.city : undefined,
          zip: typeof body.zip === "string" ? body.zip : undefined,
        };
        const response = await updateProfileRequest(
          getStoredAccessToken() ?? "",
          profileBody,
        );
        const profileRead = figmaReadOperations(frameId).find(
          (op) => op.method === "GET" && op.path === "/api/profile",
        );
        if (profileRead) {
          publishReadPayload(profileRead.method, profileRead.path, response);
          setValues((prev) => ({
            ...prev,
            ...valuesFromResponse(profileRead, response),
          }));
        }
        setStatusMessage(response.message || "");
        return;
      }

      await apiRequest(writeOperation.method, writeOperation.path, {
        body,
        token: getStoredAccessToken(),
      });

      setStatusMessage("");
    } catch (error) {
      if (!isPublicAuth && isAuthFailure(error)) {
        handleAuthFailure();
        return;
      }
      if (error instanceof ApiRequestError) {
        setFieldErrors(fieldErrorsFromResponse(writeOperation, error.body));
        setStatusMessage(error.message);
      } else {
        setStatusMessage("Request failed.");
      }
    } finally {
      setSubmitting(false);
    }
  }, [frameId, values, handleAuthFailure]);

  const runAction = useCallback(
    async (action: string) => {
      if (frameId !== "4543:3496" || !DASHBOARD_ACTION_IDS.has(action)) {
        return;
      }

      const token = getStoredAccessToken() ?? "";
      setSubmitting(true);

      try {
        if (action === "post-notification") {
          const response = await postDashboardNotificationRequest(token, {});
          setStatusMessage(
            typeof response.message === "string" ? response.message : "Notification sent.",
          );
        } else if (action === "put-subscription") {
          const response = await putDashboardSubscriptionRequest(token, {});
          setStatusMessage(
            typeof response.message === "string"
              ? response.message
              : "Subscription updated.",
          );
        } else if (action === "delete-notification") {
          const id = firstAnnouncementIdRef.current;
          if (!id) {
            setStatusMessage("No notification to delete.");
            return;
          }
          await deleteDashboardNotificationRequest(token, id);
          setStatusMessage("Notification removed.");
        } else if (action === "ultimate-mind-session") {
          const body = await ultimateMindSuggestionsRequest(token);
          publishReadPayload("GET", "/api/ultimate-mind/suggestions", body);
          const envelope = asRecord(body);
          setStatusMessage(
            typeof envelope?.message === "string" ? envelope.message : "",
          );
          return;
        }

        await loadReads();
      } catch (error) {
        if (isAuthFailure(error)) {
          handleAuthFailure();
          return;
        }
        if (error instanceof ApiRequestError) {
          setStatusMessage(error.message);
        } else {
          setStatusMessage("Request failed.");
        }
      } finally {
        setSubmitting(false);
      }
    },
    [frameId, loadReads, handleAuthFailure],
  );

  const contextValue = useMemo<ScreenDataContextValue>(
    () => ({
      frameId,
      bound,
      values,
      fieldErrors,
      loading,
      submitting,
      submit,
      runAction,
      setFieldValue,
    }),
    [
      frameId,
      bound,
      values,
      fieldErrors,
      loading,
      submitting,
      submit,
      runAction,
      setFieldValue,
    ],
  );

  const errorDescriptions = Object.entries(fieldErrors).map(([field, message]) =>
    createElement(
      "span",
      {
        key: field,
        id: `figma-err-${field}`,
        className: "sr-only",
        role: "alert",
      },
      message,
    ),
  );

  return createElement(
    ScreenDataContext.Provider,
    { value: contextValue },
    createElement(
      Fragment,
      null,
      createElement(
        "div",
        {
          className: "sr-only",
          role: "status",
          "aria-live": "polite",
        },
        loading ? "Loading." : submitting ? "Submitting." : statusMessage,
      ),
      errorDescriptions,
      children,
    ),
  );
}

function isCheckboxField(frameId: string, field: string): boolean {
  if (field === "checkbox" || field === "remember-me") {
    return true;
  }
  const writeOp = figmaWriteOperation(frameId);
  const bound = writeOp?.fields.find((entry) => entry.figmaField === field);
  return bound?.kind === "checkbox" || bound?.kind === "switch";
}

/** Default bindings add no DOM props, so the compiled frame stays unchanged. */
export function figmaFieldProps(field: string): FigmaFieldBinding {
  const { frameId, values, fieldErrors, loading, submitting, setFieldValue } =
    useScreenDataContext();
  const error = fieldErrors[field];
  const describedBy = error ? `figma-err-${field}` : undefined;
  const common: FigmaFieldBinding = {
    disabled: loading || submitting,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    title: error,
    style: error
      ? { outline: "1px solid #c8a47e", outlineOffset: "1px" }
      : undefined,
  };

  if (isCheckboxField(frameId, field)) {
    return {
      ...common,
      checked: values[field] === true,
      onChange: (event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.type === "checkbox") {
          setFieldValue(field, target.checked);
        }
      },
    };
  }

  const raw = values[field];
  return {
    ...common,
    value:
      typeof raw === "string" ? raw : raw === undefined || raw === null ? "" : String(raw),
    onChange: (event) => {
      setFieldValue(field, event.target.value);
    },
  };
}

/**
 * Semantic actions from Figma prototype reactions and field-contract
 * submits. Submit action ids call submit() from the provider.
 */
export function figmaActionProps(action: string): FigmaActionBinding {
  const { frameId, submit, runAction, loading, submitting } = useScreenDataContext();
  const busy = loading || submitting;

  if (SUBMIT_ACTION_IDS.has(action)) {
    return {
      disabled: busy,
      onClick: (event) => {
        event.preventDefault();
        void submit();
      },
    };
  }

  if (frameId === "4543:3496" && DASHBOARD_ACTION_IDS.has(action)) {
    return {
      disabled: busy,
      onClick: (event) => {
        event.preventDefault();
        void runAction(action);
      },
    };
  }

  return {};
}

export function useFigmaScreenData() {
  const { bound, values, fieldErrors, loading, submitting, submit } =
    useScreenDataContext();
  return { bound, values, fieldErrors, loading, submitting, submit };
}
