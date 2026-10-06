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
import { apiRequest, ApiRequestError } from "../../lib/api/client";
import {
  clearStoredAccessToken,
  getStoredAccessToken,
  setStoredAccessToken,
} from "../../lib/api/token";
import {
  buildFigmaRequest,
  figmaActionReady,
  figmaApiAction,
  figmaLoadOperations,
  type FigmaApiSend,
} from "./figmaApiInteractions";
import { clearReadPayloads, publishReadPayload } from "./figmaDisplay";
import {
  fieldErrorsFromResponse,
  figmaReadOperations,
  figmaWriteOperation,
  requestBodyFor,
  validateValues,
  valuesFromResponse,
  type FigmaFieldValues,
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
  bound: string;
  values: FigmaFieldValues;
  fieldErrors: Record<string, string>;
  loading: boolean;
  submitting: boolean;
  submit: () => Promise<void>;
  runAction: (actionId: string) => Promise<void>;
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

const SUBMIT_ACTION_IDS = new Set(["act_90fcde8a6c8d", "act_e036a19a67f8"]);

const ScreenDataContext = createContext<ScreenDataContextValue | null>(null);

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
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

function scheduleSignInRedirect(): void {
  if (typeof window === "undefined") {
    return;
  }
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (path === "login" || path === "sign-in") {
    return;
  }
  window.setTimeout(() => {
    const current = window.location.pathname.replace(/^\/+|\/+$/g, "");
    if (current !== "login" && current !== "sign-in") {
      window.location.assign("/login");
    }
  }, 0);
}

function useScreenDataContext(): ScreenDataContextValue {
  const ctx = useContext(ScreenDataContext);
  if (!ctx) {
    const noop = async () => {};
    return {
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

function makeSend(): FigmaApiSend {
  return async (method, path, body) => {
    const token = getStoredAccessToken();
    const isLogin = method === "POST" && path === "/api/auth/login";
    return apiRequest(method, path, {
      body: body as Record<string, string | boolean> | undefined,
      token: isLogin ? null : token,
    });
  };
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
  const readOps = frameId ? figmaReadOperations(frameId) : [];
  const loadOps = frameId ? figmaLoadOperations(frameId) : [];

  const [values, setValues] = useState<FigmaFieldValues>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const authFailureHandledRef = useRef(false);
  const loadReadsGenerationRef = useRef(0);
  const initialValuesRef = useRef<FigmaFieldValues>({});

  const handleAuthFailure = useCallback(() => {
    if (authFailureHandledRef.current) {
      return;
    }
    authFailureHandledRef.current = true;
    loadReadsGenerationRef.current += 1;
    clearReadPayloads();
    clearStoredAccessToken();
    scheduleSignInRedirect();
  }, []);

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

  const readsToLoad = useMemo(() => {
    const allowed = new Set(loadOps);
    return readOps.filter(
      (op) =>
        op.method.toUpperCase() === "GET" &&
        allowed.has(`${op.method.toUpperCase()} ${op.path}`),
    );
  }, [readOps, loadOps]);

  const loadReads = useCallback(async () => {
    if (!frameId || authFailureHandledRef.current || readsToLoad.length === 0) {
      return;
    }
    const generation = loadReadsGenerationRef.current;
    setLoading(true);
    setStatusMessage("Loading.");

    let mergedValues: FigmaFieldValues = {};

    try {
      for (const op of readsToLoad) {
        if (authFailureHandledRef.current || generation !== loadReadsGenerationRef.current) {
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
              rawBody = await apiRequest(op.method, op.path, {
                token: getStoredAccessToken(),
              });
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
            rawBody = await apiRequest(op.method, op.path, {
              token: getStoredAccessToken(),
            });
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

        if (authFailureHandledRef.current || generation !== loadReadsGenerationRef.current) {
          return;
        }

        publishReadPayload(op.method, op.path, rawBody);

        if (op.fields.length > 0) {
          mergedValues = {
            ...mergedValues,
            ...valuesFromResponse(op, rawBody),
          };
        }
      }

      if (Object.keys(mergedValues).length > 0) {
        setValues((prev) => {
          const next = { ...prev, ...mergedValues };
          initialValuesRef.current = next;
          return next;
        });
      }
      if (!authFailureHandledRef.current) {
        setStatusMessage("");
      }
    } finally {
      if (!authFailureHandledRef.current) {
        setLoading(false);
      }
    }
  }, [frameId, readsToLoad, handleAuthFailure]);

  useEffect(() => {
    void loadReads();
  }, [loadReads]);

  const runAction = useCallback(
    async (actionId: string) => {
      const apiAction = figmaApiAction(actionId);
      if (!apiAction) {
        return;
      }

      const writeOperation = figmaWriteOperation(frameId);
      const matchesWrite =
        writeOperation &&
        writeOperation.method === apiAction.method &&
        writeOperation.path === apiAction.path;

      setFieldErrors({});

      if (matchesWrite) {
        const clientErrors = validateValues(writeOperation, values);
        if (Object.keys(clientErrors).length > 0) {
          setFieldErrors(clientErrors);
          setStatusMessage("Fix the highlighted fields.");
          return;
        }
      }

      setSubmitting(true);
      setStatusMessage(`Submitting ${apiAction.operation}.`);

      try {
        const request = buildFigmaRequest(actionId, {
          values,
          initial: initialValuesRef.current,
        });

        if (!request.ok) {
          if (request.reason === "invalid" && request.errors) {
            setFieldErrors(request.errors);
          }
          setStatusMessage(request.detail);
          return;
        }

        const send = makeSend();
        const body =
          writeOperation && matchesWrite
            ? requestBodyFor(writeOperation, values, initialValuesRef.current)
            : request.body;
        const response = await send(request.method, request.path, body);

        let refreshedProfile: unknown;
        for (const operation of request.action.refreshReads) {
          const space = operation.indexOf(" ");
          const refreshMethod = operation.slice(0, space);
          const refreshPath = operation.slice(space + 1);
          const refreshed = await send(refreshMethod, refreshPath);
          publishReadPayload(refreshMethod, refreshPath, refreshed);
          if (refreshPath === "/api/profile") {
            refreshedProfile = refreshed;
          }
        }

        if (actionId === "act_90fcde8a6c8d") {
          const envelope = asRecord(response);
          const data = envelope ? asRecord(envelope.data) : null;
          const accessToken =
            (typeof data?.accessToken === "string" && data.accessToken) ||
            (typeof data?.token === "string" && data.token) ||
            null;
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

        if (actionId === "act_e036a19a67f8") {
          const envelope = asRecord(response);
          setStatusMessage(
            typeof envelope?.message === "string"
              ? envelope.message
              : "Profile saved.",
          );
          const profileRead = readsToLoad.find((op) => op.path === "/api/profile");
          if (profileRead && refreshedProfile !== undefined) {
            setValues((prev) => {
              const next = {
                ...prev,
                ...valuesFromResponse(profileRead, refreshedProfile),
              };
              initialValuesRef.current = next;
              return next;
            });
          }
        }
      } catch (error) {
        if (actionId !== "act_90fcde8a6c8d" && isAuthFailure(error)) {
          handleAuthFailure();
          return;
        }
        if (error instanceof ApiRequestError && matchesWrite && writeOperation) {
          setFieldErrors(fieldErrorsFromResponse(writeOperation, error.body));
          setStatusMessage(error.message);
        } else if (error instanceof ApiRequestError) {
          setStatusMessage(error.message);
        } else {
          setStatusMessage("Request failed.");
        }
      } finally {
        setSubmitting(false);
      }
    },
    [frameId, values, readsToLoad, handleAuthFailure],
  );

  const submit = useCallback(async () => {
    const writeOperation = figmaWriteOperation(frameId);
    if (!writeOperation?.submitNodeId) {
      return;
    }
    const actionEntry = [...SUBMIT_ACTION_IDS].find((actionId) => {
      const action = figmaApiAction(actionId);
      return (
        action &&
        action.frameId === frameId &&
        action.method === writeOperation.method &&
        action.path === writeOperation.path
      );
    });
    if (actionEntry) {
      await runAction(actionEntry);
    }
  }, [frameId, runAction]);

  const contextValue = useMemo<ScreenDataContextValue>(
    () => ({
      bound,
      values,
      fieldErrors,
      loading,
      submitting,
      submit,
      runAction,
      setFieldValue,
    }),
    [bound, values, fieldErrors, loading, submitting, submit, runAction, setFieldValue],
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

export function figmaFieldProps(field: string): FigmaFieldBinding {
  const { values, fieldErrors, loading, submitting, setFieldValue } =
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
  const { runAction, loading, submitting } = useScreenDataContext();
  if (!SUBMIT_ACTION_IDS.has(action)) {
    return {};
  }
  const ready = figmaActionReady(action);
  return {
    disabled: loading || submitting || !ready,
    onClick: (event) => {
      event.preventDefault();
      void runAction(action);
    },
  };
}

export function useFigmaScreenData(): Omit<
  ScreenDataContextValue,
  "setFieldValue" | "runAction"
> {
  const { bound, values, fieldErrors, loading, submitting, submit } =
    useScreenDataContext();
  return { bound, values, fieldErrors, loading, submitting, submit };
}
