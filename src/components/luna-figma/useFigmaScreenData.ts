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
  useState,
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import { apiRequest, ApiRequestError } from "../../lib/api/client";
import {
  clearStoredAccessToken,
  getStoredAccessToken,
  setStoredAccessToken,
} from "../../lib/api/token";
import {
  fieldErrorsFromResponse,
  figmaReadOperation,
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

type DashboardReadPayload = Record<string, unknown>;

type ScreenDataContextValue = {
  bound: string;
  values: FigmaFieldValues;
  fieldErrors: Record<string, string>;
  submitting: boolean;
  readPayload: DashboardReadPayload | null;
  submit: () => Promise<void>;
  setFieldValue: (field: string, value: string | boolean) => void;
};

const ROUTE_TO_FRAME: Readonly<Record<string, string>> = {
  "": "4543:3496",
  dashboard: "4543:3496",
  "updated-dashboard": "4543:3496",
  "sign-in": "998:1024",
  profile: "3158:22053",
};

const SUBMIT_ACTION_IDS = new Set(["act_90fcde8a6c8d", "act_e036a19a67f8"]);

const ScreenDataContext = createContext<ScreenDataContextValue | null>(null);

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function unwrapReadPayload(
  op: FigmaOperation,
  payload: unknown,
): DashboardReadPayload | null {
  const outer = asRecord(payload);
  if (!outer) {
    return null;
  }
  if (op.responseUnwrap) {
    return asRecord(outer[op.responseUnwrap]);
  }
  return outer;
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

function handleAuthFailure(): void {
  clearStoredAccessToken();
  if (typeof window !== "undefined" && window.location.pathname !== "/sign-in") {
    window.location.assign("/sign-in");
  }
}

function formatMetricNumber(value: number): string {
  return value.toLocaleString("en-US");
}

const FIGMA_TEXT_RESOLVERS: Readonly<
  Record<string, (data: DashboardReadPayload) => string | null>
> = {
  "3158:22834": (data) => {
    const name = data.full_name;
    return typeof name === "string" && name.trim() !== "" ? name : null;
  },
  "I3158:22263;1226:1920": (data) => {
    const name = data.full_name;
    return typeof name === "string" && name.trim() !== "" ? name : null;
  },
  "I4543:3853;1226:1920": (data) => {
    const profile = asRecord(data.profile);
    const name = profile?.full_name;
    return typeof name === "string" && name.trim() !== "" ? name : null;
  },
  "I4543:3853;1237:2195": (data) => {
    const analytics = asRecord(data.analytics);
    const metrics = analytics ? asRecord(analytics.analytics_data) : null;
    if (!metrics) {
      return null;
    }
    const current = metrics.current_ai_credits;
    const total = metrics.total_ai_credits;
    if (typeof current !== "number" || typeof total !== "number") {
      return null;
    }
    return `${formatMetricNumber(current)} / ${formatMetricNumber(total)}`;
  },
  "4543:3510": (data) => {
    const profile = asRecord(data.profile);
    const name = profile?.full_name;
    if (typeof name !== "string" || name.trim() === "") {
      return null;
    }
    const first = name.trim().split(/\s+/)[0];
    return `Good morning, ${first}.`;
  },
};

function useScreenDataContext(): ScreenDataContextValue {
  const ctx = useContext(ScreenDataContext);
  if (!ctx) {
    const noop = async () => {};
    return {
      bound: "",
      values: {},
      fieldErrors: {},
      submitting: false,
      readPayload: null,
      submit: noop,
      setFieldValue: () => {},
    };
  }
  return ctx;
}

export function FigmaScreenDataProvider({
  routePath = "",
  children,
}: {
  routePath?: string;
  children?: ReactNode;
}) {
  const frameId = ROUTE_TO_FRAME[routePath] ?? "";
  const writeOp = frameId ? figmaWriteOperation(frameId) : undefined;
  const readOp = frameId ? figmaReadOperation(frameId) : undefined;

  const [values, setValues] = useState<FigmaFieldValues>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [readPayload, setReadPayload] = useState<DashboardReadPayload | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const bound = writeOp
    ? `${writeOp.method} ${writeOp.path}`
    : readOp
      ? `${readOp.method} ${readOp.path}`
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

  const loadReads = useCallback(async () => {
    if (!readOp) {
      return;
    }
    if (readOp.role === "read" && readOp.fields.length > 0) {
      const resolution = resolveBoundRead(readOp);
      if (resolution.mode === "missing") {
        setStatusMessage(resolution.diagnostic);
        return;
      }
      if (resolution.mode === "mock") {
        setValues((prev) => ({
          ...prev,
          ...valuesFromResponse(readOp, resolution.body),
        }));
        setReadPayload(unwrapReadPayload(readOp, resolution.body));
        setStatusMessage("");
        return;
      }
    }
    setSubmitting(true);
    setStatusMessage(`Loading ${readOp.method} ${readOp.path}.`);
    try {
      const token = getStoredAccessToken();
      const payload = await apiRequest(readOp.method, readOp.path, { token });
      setValues((prev) => ({
        ...prev,
        ...valuesFromResponse(readOp, payload),
      }));
      setReadPayload(unwrapReadPayload(readOp, payload));
      setStatusMessage("");
    } catch (error) {
      if (isAuthFailure(error)) {
        handleAuthFailure();
        return;
      }
      const message =
        error instanceof ApiRequestError ? error.message : "Could not load data.";
      setStatusMessage(message);
    } finally {
      setSubmitting(false);
    }
  }, [readOp]);

  useEffect(() => {
    void loadReads();
  }, [loadReads]);

  const submit = useCallback(async () => {
    if (!writeOp) {
      return;
    }
    setFieldErrors({});
    const clientErrors = validateValues(writeOp, values);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatusMessage("Fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    setStatusMessage(`Submitting ${writeOp.method} ${writeOp.path}.`);
    const isLogin = writeOp.path === "/api/auth/login";
    try {
      const body = requestBodyFor(writeOp, values);
      const token = getStoredAccessToken();
      const payload = await apiRequest(writeOp.method, writeOp.path, {
        body,
        token: isLogin ? null : token,
      });
      if (isLogin) {
        const envelope = asRecord(payload);
        const data = envelope ? asRecord(envelope.data) : null;
        const accessToken =
          (typeof data?.accessToken === "string" && data.accessToken) ||
          (typeof data?.token === "string" && data.token) ||
          null;
        if (accessToken) {
          setStoredAccessToken(accessToken, values.checkbox === true);
          if (typeof window !== "undefined") {
            window.location.assign("/");
          }
        }
        setStatusMessage(
          typeof envelope?.message === "string"
            ? envelope.message
            : "Signed in successfully.",
        );
      } else if (writeOp.path === "/api/profile") {
        const envelope = asRecord(payload);
        setStatusMessage(
          typeof envelope?.message === "string"
            ? envelope.message
            : "Profile saved.",
        );
        if (readOp && readOp.path === "/api/profile") {
          const refreshed = await apiRequest(readOp.method, readOp.path, {
            token: getStoredAccessToken(),
          });
          setValues((prev) => ({
            ...prev,
            ...valuesFromResponse(readOp, refreshed),
          }));
          setReadPayload(unwrapReadPayload(readOp, refreshed));
        } else {
          setValues((prev) => ({
            ...prev,
            ...valuesFromResponse(
              { ...writeOp, responseUnwrap: "data" } as FigmaOperation,
              payload,
            ),
          }));
        }
      } else {
        setStatusMessage("Request completed.");
      }
    } catch (error) {
      if (!isLogin && isAuthFailure(error)) {
        handleAuthFailure();
        return;
      }
      if (error instanceof ApiRequestError) {
        setFieldErrors(fieldErrorsFromResponse(writeOp, error.body));
        setStatusMessage(error.message);
      } else {
        setStatusMessage("Request failed.");
      }
    } finally {
      setSubmitting(false);
    }
  }, [values, writeOp, readOp]);

  const contextValue = useMemo<ScreenDataContextValue>(
    () => ({
      bound,
      values,
      fieldErrors,
      submitting,
      readPayload,
      submit,
      setFieldValue,
    }),
    [bound, values, fieldErrors, submitting, readPayload, submit, setFieldValue],
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
        submitting ? "Loading." : statusMessage,
      ),
      errorDescriptions,
      children,
    ),
  );
}

export function figmaFieldProps(field: string): FigmaFieldBinding {
  const { values, fieldErrors, submitting, setFieldValue } = useScreenDataContext();
  const error = fieldErrors[field];
  const describedBy = error ? `figma-err-${field}` : undefined;
  const common: FigmaFieldBinding = {
    disabled: submitting,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    title: error,
    style: error
      ? { outline: "1px solid #c8a47e", outlineOffset: "1px" }
      : undefined,
  };

  if (field === "checkbox") {
    return {
      ...common,
      checked: values.checkbox === true,
      onChange: (event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.type === "checkbox") {
          setFieldValue("checkbox", target.checked);
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

export function figmaActionProps(action: string): FigmaActionBinding {
  const { submit, submitting } = useScreenDataContext();
  if (!SUBMIT_ACTION_IDS.has(action)) {
    return {};
  }
  return {
    disabled: submitting,
    onClick: (event) => {
      event.preventDefault();
      void submit();
    },
  };
}

export function figmaTextContent(nodeId: string, fallback: string): string {
  const { readPayload } = useScreenDataContext();
  if (!readPayload) {
    return fallback;
  }
  const resolve = FIGMA_TEXT_RESOLVERS[nodeId];
  if (!resolve) {
    return fallback;
  }
  const text = resolve(readPayload);
  return text ?? fallback;
}

export function useFigmaScreenData(): Omit<ScreenDataContextValue, "setFieldValue"> {
  const { bound, values, fieldErrors, submitting, readPayload, submit } =
    useScreenDataContext();
  return { bound, values, fieldErrors, submitting, readPayload, submit };
}
