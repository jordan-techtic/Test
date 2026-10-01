/** luna-spec-codegen: owned-layout */
// Figma field → API field bindings resolved from the live API contract.
// Request bodies use apiField names only; figmaField is the form-state key.

export type FigmaFieldValue = string | boolean;
export type FigmaFieldValues = Record<string, FigmaFieldValue | undefined>;

export interface FigmaFieldBinding {
  readonly figmaField: string;
  readonly apiField: string;
  readonly nodeId: string;
  readonly kind: string;
  readonly required: boolean;
  readonly resolution: string;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: string;
  readonly format?: string;
}

export interface FigmaOperation {
  readonly method: string;
  readonly path: string;
  readonly role: "write" | "read";
  readonly fields: readonly FigmaFieldBinding[];
  readonly unboundRequired: readonly string[];
  readonly responseUnwrap: string | null;
  /** When set, list GET rows live under this key after responseUnwrap. */
  readonly listUnwrapKey: string | null;
  readonly submitNodeId: string | null;
}

/** Screen frame id → contract operations its form uses. */
export const FIGMA_OPERATIONS: Readonly<Record<string, readonly FigmaOperation[]>> = {
  "4543:3496": [
    {
      method: "GET",
      path: "/api/dashboard",
      role: "read",
      fields: [],
      unboundRequired: [],
      responseUnwrap: "data",
      listUnwrapKey: null,
      submitNodeId: null,
    },
    {
      method: "GET",
      path: "/api/ultimate-mind/suggestions",
      role: "read",
      fields: [],
      unboundRequired: [],
      responseUnwrap: "data",
      listUnwrapKey: null,
      submitNodeId: null,
    },
    {
      method: "POST",
      path: "/api/dashboard/notifications",
      role: "write",
      fields: [],
      unboundRequired: ["request_body"],
      responseUnwrap: "data",
      listUnwrapKey: null,
      submitNodeId: null,
    },
    {
      method: "PUT",
      path: "/api/dashboard/subscription",
      role: "write",
      fields: [],
      unboundRequired: ["request_body"],
      responseUnwrap: "data",
      listUnwrapKey: null,
      submitNodeId: null,
    },
    {
      method: "DELETE",
      path: "/api/dashboard/notifications/{id}",
      role: "write",
      fields: [],
      unboundRequired: ["id"],
      responseUnwrap: null,
      listUnwrapKey: null,
      submitNodeId: null,
    },
  ],
  "3158:22053": [
    {
      method: "GET",
      path: "/api/profile",
      role: "read",
      fields: [
        {
          figmaField: "first-name",
          apiField: "first_name",
          nodeId: "3158:23160",
          kind: "text",
          required: true,
          resolution: "api_contract",
        },
        {
          figmaField: "last-name",
          apiField: "last_name",
          nodeId: "3158:23171",
          kind: "text",
          required: true,
          resolution: "api_contract",
        },
        {
          figmaField: "email",
          apiField: "email",
          nodeId: "3158:23183",
          kind: "email",
          required: true,
          resolution: "api_contract",
          format: "email",
        },
        {
          figmaField: "mobile-number",
          apiField: "mobile_number",
          nodeId: "3158:23194",
          kind: "phone",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "bio",
          apiField: "bio",
          nodeId: "3158:23493",
          kind: "textarea",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "time-zone",
          apiField: "time_zone",
          nodeId: "3158:23420",
          kind: "select",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "street",
          apiField: "street",
          nodeId: "3526:5334",
          kind: "text",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "country",
          apiField: "country",
          nodeId: "3526:5346",
          kind: "select",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "state",
          apiField: "state",
          nodeId: "3526:5358",
          kind: "select",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "city",
          apiField: "city",
          nodeId: "3526:5371",
          kind: "text",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "zip",
          apiField: "zip",
          nodeId: "3526:5382",
          kind: "select",
          required: false,
          resolution: "api_contract",
        },
      ],
      unboundRequired: [],
      responseUnwrap: "data",
      listUnwrapKey: null,
      submitNodeId: null,
    },
    {
      method: "PUT",
      path: "/api/profile",
      role: "write",
      fields: [
        {
          figmaField: "first-name",
          apiField: "first_name",
          nodeId: "3158:23160",
          kind: "text",
          required: true,
          resolution: "api_contract",
        },
        {
          figmaField: "last-name",
          apiField: "last_name",
          nodeId: "3158:23171",
          kind: "text",
          required: true,
          resolution: "api_contract",
        },
        {
          figmaField: "email",
          apiField: "email",
          nodeId: "3158:23183",
          kind: "email",
          required: true,
          resolution: "api_contract",
          format: "email",
        },
        {
          figmaField: "mobile-number",
          apiField: "mobile_number",
          nodeId: "3158:23194",
          kind: "phone",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "bio",
          apiField: "bio",
          nodeId: "3158:23493",
          kind: "textarea",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "time-zone",
          apiField: "time_zone",
          nodeId: "3158:23420",
          kind: "select",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "street",
          apiField: "street",
          nodeId: "3526:5334",
          kind: "text",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "country",
          apiField: "country",
          nodeId: "3526:5346",
          kind: "select",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "state",
          apiField: "state",
          nodeId: "3526:5358",
          kind: "select",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "city",
          apiField: "city",
          nodeId: "3526:5371",
          kind: "text",
          required: false,
          resolution: "api_contract",
        },
        {
          figmaField: "zip",
          apiField: "zip",
          nodeId: "3526:5382",
          kind: "select",
          required: false,
          resolution: "api_contract",
        },
      ],
      unboundRequired: [],
      responseUnwrap: "data",
      listUnwrapKey: null,
      submitNodeId: "3526:5326",
    },
  ],
  "572:2518": [
    {
      method: "GET",
      path: "/api/about-us",
      role: "read",
      fields: [],
      unboundRequired: [],
      responseUnwrap: "data",
      listUnwrapKey: null,
      submitNodeId: null,
    },
  ],
  "998:1024": [
    {
      method: "POST",
      path: "/auth/login",
      role: "write",
      fields: [
        {
          figmaField: "email",
          apiField: "email",
          nodeId: "998:1132",
          kind: "email",
          required: true,
          resolution: "api_contract",
          format: "email",
        },
        {
          figmaField: "password",
          apiField: "password",
          nodeId: "998:1148",
          kind: "password",
          required: true,
          resolution: "api_contract",
        },
      ],
      unboundRequired: [],
      responseUnwrap: "data",
      listUnwrapKey: null,
      submitNodeId: "998:1335",
    },
  ],
};

/** Figma fields no contract operation accepts: keep them local UI state, never send them. */
export const UNRESOLVED_FIGMA_FIELDS: Readonly<Record<string, readonly string[]>> = {
  "4543:3496": [
    "iconbutton"
  ],
  "998:1024": ["checkbox"]
};

export function figmaOperations(frameId: string): readonly FigmaOperation[] {
  return FIGMA_OPERATIONS[frameId] ?? [];
}

/** The operation a screen's form submits (the one with a resolved submit control first). */
export function figmaWriteOperation(frameId: string): FigmaOperation | undefined {
  const writes = figmaOperations(frameId).filter((op) => op.role === "write");
  return writes.find((op) => op.submitNodeId !== null) ?? writes[0];
}

/** The operation whose response initialises a screen's form values. */
export function figmaReadOperation(frameId: string): FigmaOperation | undefined {
  return figmaOperations(frameId).find((op) => op.role === "read");
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** Request body keyed by API field names. Fields without a contract binding are never sent. */
export function requestBodyFor(
  op: FigmaOperation,
  values: FigmaFieldValues,
): Record<string, string | boolean> {
  const body: Record<string, string | boolean> = {};
  for (const field of op.fields) {
    const value = values[field.figmaField];
    if (typeof value === "boolean") {
      body[field.apiField] = value;
      continue;
    }
    if (value === undefined || (value.trim() === "" && !field.required)) {
      continue;
    }
    body[field.apiField] = value;
  }
  return body;
}

/** Form values keyed by Figma field, read from a response (envelope unwrapped). */
export function valuesFromResponse(op: FigmaOperation, payload: unknown): FigmaFieldValues {
  const outer = asRecord(payload);
  const record = (op.responseUnwrap && outer ? asRecord(outer[op.responseUnwrap]) : null) ?? outer;
  const values: FigmaFieldValues = {};
  if (!record) {
    return values;
  }
  for (const field of op.fields) {
    const value = record[field.apiField];
    if (typeof value === "boolean") {
      values[field.figmaField] = value;
    } else if (typeof value === "string" || typeof value === "number") {
      values[field.figmaField] = String(value);
    } else if (value === null) {
      values[field.figmaField] = "";
    }
  }
  return values;
}

/** Checks the request schema states (required, length, pattern, email format). */
export function validateValues(
  op: FigmaOperation,
  values: FigmaFieldValues,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of op.fields) {
    const value = values[field.figmaField];
    if (typeof value === "boolean" || field.kind === "checkbox" || field.kind === "switch") {
      continue;
    }
    const text = (value ?? "").trim();
    if (!text) {
      if (field.required) {
        errors[field.figmaField] = "This field is required.";
      }
      continue;
    }
    if (field.minLength !== undefined && text.length < field.minLength) {
      errors[field.figmaField] = `Use at least ${field.minLength} characters.`;
    } else if (field.maxLength !== undefined && text.length > field.maxLength) {
      errors[field.figmaField] = `Use at most ${field.maxLength} characters.`;
    } else if (field.format === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      errors[field.figmaField] = "Enter a valid email address.";
    } else if (field.pattern !== undefined) {
      try {
        if (!new RegExp(field.pattern).test(text)) {
          errors[field.figmaField] = "This value is not in the expected format.";
        }
      } catch {
        // A server-side pattern JavaScript cannot compile is left to the server.
      }
    }
  }
  return errors;
}

function messageText(value: unknown): string | null {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    const parts = value.filter((part): part is string => typeof part === "string");
    return parts.length > 0 ? parts.join(" ") : null;
  }
  const record = asRecord(value);
  if (record) {
    return messageText(record.message ?? Object.values(record));
  }
  return null;
}

/** Server validation errors mapped from API field names onto Figma fields. */
export function fieldErrorsFromResponse(
  op: FigmaOperation,
  body: unknown,
): Record<string, string> {
  const errors: Record<string, string> = {};
  const byApi = new Map(op.fields.map((field) => [field.apiField, field.figmaField]));
  const record = asRecord(body);
  const raw = record?.errors ?? record?.details ?? record?.message;
  const assign = (apiField: unknown, message: unknown): void => {
    const figmaField = typeof apiField === "string" ? byApi.get(apiField) : undefined;
    const text = messageText(message);
    if (figmaField && text && !errors[figmaField]) {
      errors[figmaField] = text;
    }
  };
  const entries = Array.isArray(raw) ? raw : raw !== undefined ? [raw] : [];
  for (const entry of entries) {
    const item = asRecord(entry);
    if (item && !("message" in item) && !("field" in item) && !("property" in item)) {
      for (const [key, value] of Object.entries(item)) {
        assign(key, value);
      }
      continue;
    }
    if (item) {
      assign(item.field ?? item.property ?? item.path, item.message ?? item.constraints);
      continue;
    }
    if (typeof entry === "string") {
      const apiField = op.fields
        .map((field) => field.apiField)
        .find((name) => entry === name || entry.startsWith(`${name} `));
      assign(apiField, entry);
    }
  }
  return errors;
}
