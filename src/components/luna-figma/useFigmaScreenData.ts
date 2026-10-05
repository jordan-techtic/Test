/** luna-spec-codegen: data-hook — wire API data here; do not restyle. */
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ApiError,
  apiRequest,
  setStoredAccessToken,
  unwrapPayload,
} from "../../lib/api-client";
import type { LoginResponse } from "../../types/auth";
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
import { resolveBoundRead } from "./figmaMockReads";

export type FigmaFieldBinding = {
  value?: string;
  checked?: boolean;
  onChange?: (event: { target: { value: string; checked?: boolean } }) => void;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  title?: string;
};

export type FigmaActionBinding = {
  onClick?: (event: { preventDefault: () => void }) => void;
};

const ROUTE_TO_FRAME: Readonly<Record<string, string>> = {
  "": "998:1024",
  "sign-in": "998:1024",
};

const SIGN_IN_FRAME = "998:1024";
const SIGN_IN_SUBMIT_NODE = "998:1335";
const REMEMBER_EMAIL_KEY = "luna_remember_email";

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
  for (const op of figmaOperations(frameId)) {
    for (const field of op.fields) {
      if (values[field.figmaField] === undefined) {
        values[field.figmaField] =
          field.kind === "checkbox" || field.kind === "switch" ? false : "";
      }
    }
  }
  return values;
}

function frameIdFromRoute(routePath: string | undefined): string {
  if (!routePath) {
    return ROUTE_TO_FRAME[""];
  }
  return ROUTE_TO_FRAME[routePath] ?? ROUTE_TO_FRAME[""];
}

async function fetchContractRead(op: FigmaOperation): Promise<unknown> {
  return apiRequest(op.method, op.path, { auth: true });
}

async function fetchContractWrite(
  op: FigmaOperation,
  resolvedPath: string,
  body: Record<string, string | boolean> | undefined,
  values: FigmaFieldValues,
): Promise<unknown> {
  const payload = body ?? requestBodyFor(op, values);
  return apiRequest(op.method, resolvedPath, {
    body: payload,
    auth: op.path !== "/api/auth/login",
  });
}

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
  }, [frameId]);

  const loadReads = useCallback(async (): Promise<boolean> => {
    if (readOps.length === 0) {
      return true;
    }
    setLoading(true);
    setStatusMessage("Loading data…");
    let accumulated: FigmaFieldValues = {};
    try {
      for (const op of readOps) {
        const resolution = resolveBoundRead(op);
        let payload: unknown;
        if (resolution.mode === "missing") {
          setStatusMessage(resolution.diagnostic);
          return false;
        }
        if (resolution.mode === "mock") {
          payload = resolution.body;
        } else {
          payload = await fetchContractRead(op);
        }
        const unwrapped = unwrapPayload(payload, op.responseUnwrap);
        const fromApi = valuesFromResponse(op, unwrapped);
        if (Object.keys(fromApi).length > 0) {
          accumulated = { ...accumulated, ...fromApi };
        }
      }
      if (Object.keys(accumulated).length > 0) {
        setValues((prev) => ({ ...prev, ...accumulated }));
      }
      setBound(readOps.map((op) => op.path).join(","));
      setStatusMessage("");
      return true;
    } catch {
      setStatusMessage("Could not load data.");
      return false;
    } finally {
      setLoading(false);
    }
  }, [readOps]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await loadReads();
      if (cancelled) {
        return;
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [loadReads]);

  const performWrite = useCallback(
    async (op: FigmaOperation) => {
      const isSignIn = frameId === SIGN_IN_FRAME && op.path === "/api/auth/login";
      setLoading(true);
      setStatusMessage(isSignIn ? "Signing in…" : "Saving…");
      setFieldErrors({});
      try {
        const payload = requestBodyFor(op, values);
        const response = await fetchContractWrite(op, op.path, payload, values);
        if (isSignIn) {
          const parsed = response as LoginResponse;
          const token = parsed?.data?.accessToken ?? parsed?.data?.token;
          if (token) {
            setStoredAccessToken(token);
          }
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
        setStatusMessage("Saved.");
        await loadReads();
      } catch (error) {
        if (error instanceof ApiError && error.status === 401 && isSignIn) {
          setStoredAccessToken(null);
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
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      if (frameId === SIGN_IN_FRAME && field === "checkbox") {
        try {
          if (value === true && typeof next.email === "string" && next.email.trim()) {
            localStorage.setItem(REMEMBER_EMAIL_KEY, next.email.trim());
          }
          if (value === false) {
            localStorage.removeItem(REMEMBER_EMAIL_KEY);
          }
        } catch {
          // ignore storage failures
        }
      }
      if (frameId === SIGN_IN_FRAME && field === "email" && next.checkbox === true) {
        try {
          const email = typeof value === "string" ? value.trim() : "";
          if (email) {
            localStorage.setItem(REMEMBER_EMAIL_KEY, email);
          }
        } catch {
          // ignore storage failures
        }
      }
      return next;
    });
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, [frameId]);

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
    if (frameId !== SIGN_IN_FRAME || writeOp?.submitNodeId !== SIGN_IN_SUBMIT_NODE) {
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
  }, [frameId, submit, writeOp?.submitNodeId]);

  useEffect(() => {
    if (frameId !== SIGN_IN_FRAME || writeOp?.submitNodeId !== SIGN_IN_SUBMIT_NODE) {
      return;
    }
    const button = document.querySelector(`[data-figma-node="${SIGN_IN_SUBMIT_NODE}"]`);
    if (button instanceof HTMLButtonElement) {
      button.disabled = loading;
      button.setAttribute("aria-busy", loading ? "true" : "false");
    }
  }, [frameId, loading, writeOp?.submitNodeId]);

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

export function figmaActionProps(action: string): FigmaActionBinding {
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
