/** luna-spec-codegen: owned-layout */
// Figma action → verified API operation (Luna API interaction contract).
// GET loads on screen entry; POST/PUT/PATCH/DELETE run only from these actions.
import { publishReadPayload, publishedValue } from "./figmaDisplay";
import {
  figmaOperations,
  requestBodyFor,
  validateValues,
  type FigmaFieldValues,
} from "./figmaFieldContract";

export interface FigmaApiParameter {
  readonly name: string;
  readonly location: "path" | "query";
  readonly source: string | null;
  readonly operation: string;
  readonly responseUnwrap: string | null;
  readonly path: readonly (string | number)[];
}

export interface FigmaApiAction {
  readonly actionId: string;
  readonly nodeId: string;
  readonly frameId: string;
  readonly operation: string;
  readonly method: string;
  readonly path: string;
  readonly role: "create" | "update" | "delete";
  readonly itemIndex: number | null;
  readonly parameters: readonly FigmaApiParameter[];
  readonly unresolvedParameters: readonly string[];
  readonly refreshReads: readonly string[];
}

/** data-figma-action id → the write it performs. */
export const FIGMA_API_ACTIONS: Readonly<Record<string, FigmaApiAction>> = {
  "act_90fcde8a6c8d": {
    "actionId": "act_90fcde8a6c8d",
    "frameId": "998:1024",
    "itemIndex": null,
    "method": "POST",
    "nodeId": "998:1335",
    "operation": "POST /api/auth/login",
    "parameters": [],
    "path": "/api/auth/login",
    "refreshReads": [],
    "role": "create",
    "unresolvedParameters": []
  },
  "act_e036a19a67f8": {
    "actionId": "act_e036a19a67f8",
    "frameId": "3158:22053",
    "itemIndex": null,
    "method": "PUT",
    "nodeId": "3526:5326",
    "operation": "PUT /api/profile",
    "parameters": [],
    "path": "/api/profile",
    "refreshReads": [
      "GET /api/profile"
    ],
    "role": "update",
    "unresolvedParameters": []
  }
};

/** Screen frame id → GET operations bound to its Figma display or inputs. */
export const FIGMA_LOAD_OPERATIONS: Readonly<Record<string, readonly string[]>> = {
  "3158:22053": [
    "GET /api/profile"
  ],
  "4543:3496": [
    "GET /api/dashboard"
  ]
};

/** GET operations ("METHOD /path") a screen loads on entry. Writes are never listed here. */
export function figmaLoadOperations(frameId: string): readonly string[] {
  return FIGMA_LOAD_OPERATIONS[frameId] ?? [];
}

export function figmaApiAction(actionId: string): FigmaApiAction | undefined {
  return FIGMA_API_ACTIONS[actionId];
}

export type FigmaApiFailure = {
  ok: false;
  reason: "unknown_action" | "unresolved_parameter" | "missing_resource" | "invalid";
  detail: string;
  errors?: Record<string, string>;
};

export type FigmaApiRequest =
  | {
      ok: true;
      action: FigmaApiAction;
      method: string;
      path: string;
      body?: Record<string, unknown>;
    }
  | FigmaApiFailure;

function resolvePath(action: FigmaApiAction): { path: string } | FigmaApiFailure {
  if (action.unresolvedParameters.length > 0) {
    return {
      ok: false,
      reason: "unresolved_parameter",
      detail: `No verified source for ${action.unresolvedParameters.join(", ")}`,
    };
  }
  let path = action.path;
  for (const param of action.parameters) {
    const { loaded, value } = publishedValue(param.operation, param.responseUnwrap, param.path);
    if (!loaded || (typeof value !== "string" && typeof value !== "number") || value === "") {
      return {
        ok: false,
        reason: "missing_resource",
        detail: `${param.operation} has no value for ${param.name}`,
      };
    }
    const encoded = encodeURIComponent(String(value));
    path = path.replace(`{${param.name}}`, encoded).replace(`:${param.name}`, encoded);
  }
  return { path };
}

/** True once every path parameter of the action can be read from published API data. */
export function figmaActionReady(actionId: string): boolean {
  const action = FIGMA_API_ACTIONS[actionId];
  return action !== undefined && "path" in resolvePath(action);
}

/**
 * Method, resolved path and body for one Figma action. Path ids come only from
 * published read responses; bodies only from the field contract. PATCH with
 * `initial` sends changed fields only.
 */
export function buildFigmaRequest(
  actionId: string,
  options: { values?: FigmaFieldValues; initial?: FigmaFieldValues } = {},
): FigmaApiRequest {
  const action = FIGMA_API_ACTIONS[actionId];
  if (!action) {
    return { ok: false, reason: "unknown_action", detail: `No API action ${actionId}` };
  }
  const resolved = resolvePath(action);
  if (!("path" in resolved)) {
    return resolved;
  }
  if (action.method === "DELETE") {
    return { ok: true, action, method: action.method, path: resolved.path };
  }
  const op = figmaOperations(action.frameId).find(
    (candidate) =>
      candidate.role === "write" && candidate.method === action.method && candidate.path === action.path,
  );
  if (!op) {
    return { ok: true, action, method: action.method, path: resolved.path };
  }
  const values = options.values ?? {};
  const errors = validateValues(op, values);
  if (Object.keys(errors).length > 0) {
    return { ok: false, reason: "invalid", detail: "Form values fail the request schema", errors };
  }
  return {
    ok: true,
    action,
    method: action.method,
    path: resolved.path,
    body: requestBodyFor(op, values, options.initial),
  };
}

/** The app's API client: method, contract path (ids substituted), JSON body. Throws on HTTP errors. */
export type FigmaApiSend = (method: string, path: string, body?: unknown) => Promise<unknown>;

/**
 * Run one Figma action through `send`, then reload and republish the reads it
 * changes so bound copy and cards refresh. Call this ONLY from a user action
 * (click / submit), never from an effect or on mount.
 */
export async function runFigmaAction(
  actionId: string,
  send: FigmaApiSend,
  options: { values?: FigmaFieldValues; initial?: FigmaFieldValues } = {},
): Promise<{ ok: true; response: unknown } | FigmaApiFailure> {
  const request = buildFigmaRequest(actionId, options);
  if (!request.ok) {
    return request;
  }
  const response = await send(request.method, request.path, request.body);
  for (const operation of request.action.refreshReads) {
    const space = operation.indexOf(" ");
    const method = operation.slice(0, space);
    const path = operation.slice(space + 1);
    publishReadPayload(method, path, await send(method, path));
  }
  return { ok: true, response };
}
