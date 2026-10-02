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
  readonly submitNodeId: string | null;
}

/** Screen frame id → contract operations its form uses. */
export const FIGMA_OPERATIONS: Readonly<Record<string, readonly FigmaOperation[]>> = {
  "3158:22053": [
    {
      "fields": [
        {
          "apiField": "first_name",
          "figmaField": "first-name",
          "kind": "text",
          "nodeId": "3158:23160",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "last_name",
          "figmaField": "last-name",
          "kind": "text",
          "nodeId": "3158:23171",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "email",
          "figmaField": "email",
          "kind": "email",
          "nodeId": "3158:23183",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "mobile_number",
          "figmaField": "mobile-number",
          "kind": "phone",
          "nodeId": "3158:23194",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "bio",
          "figmaField": "bio",
          "kind": "textarea",
          "nodeId": "3158:23493",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "time_zone",
          "figmaField": "time-zone",
          "kind": "select",
          "nodeId": "3158:23420",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "street",
          "figmaField": "street",
          "kind": "text",
          "nodeId": "3526:5334",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "country",
          "figmaField": "country",
          "kind": "select",
          "nodeId": "3526:5346",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "state",
          "figmaField": "state",
          "kind": "select",
          "nodeId": "3526:5358",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "city",
          "figmaField": "city",
          "kind": "text",
          "nodeId": "3526:5371",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "zip",
          "figmaField": "zip",
          "kind": "select",
          "nodeId": "3526:5382",
          "required": false,
          "resolution": "api_schema_name"
        }
      ],
      "method": "GET",
      "path": "/api/profile",
      "responseUnwrap": "data",
      "role": "read",
      "submitNodeId": null,
      "unboundRequired": []
    },
    {
      "fields": [
        {
          "apiField": "first_name",
          "figmaField": "first-name",
          "kind": "text",
          "maxLength": 100,
          "minLength": 1,
          "nodeId": "3158:23160",
          "required": true,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "last_name",
          "figmaField": "last-name",
          "kind": "text",
          "maxLength": 100,
          "minLength": 1,
          "nodeId": "3158:23171",
          "required": true,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "email",
          "figmaField": "email",
          "format": "email",
          "kind": "email",
          "nodeId": "3158:23183",
          "required": true,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "mobile_number",
          "figmaField": "mobile-number",
          "kind": "phone",
          "nodeId": "3158:23194",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "bio",
          "figmaField": "bio",
          "kind": "textarea",
          "maxLength": 500,
          "nodeId": "3158:23493",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "time_zone",
          "figmaField": "time-zone",
          "kind": "select",
          "maxLength": 120,
          "nodeId": "3158:23420",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "street",
          "figmaField": "street",
          "kind": "text",
          "maxLength": 200,
          "nodeId": "3526:5334",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "country",
          "figmaField": "country",
          "kind": "select",
          "maxLength": 100,
          "nodeId": "3526:5346",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "state",
          "figmaField": "state",
          "kind": "select",
          "maxLength": 100,
          "nodeId": "3526:5358",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "city",
          "figmaField": "city",
          "kind": "text",
          "maxLength": 100,
          "nodeId": "3526:5371",
          "required": false,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "zip",
          "figmaField": "zip",
          "kind": "select",
          "maxLength": 20,
          "nodeId": "3526:5382",
          "required": false,
          "resolution": "api_schema_name"
        }
      ],
      "method": "PUT",
      "path": "/api/profile",
      "responseUnwrap": null,
      "role": "write",
      "submitNodeId": "3526:5326",
      "unboundRequired": []
    }
  ],
  "998:1024": [
    {
      "fields": [
        {
          "apiField": "email",
          "figmaField": "email",
          "format": "email",
          "kind": "email",
          "maxLength": 254,
          "nodeId": "998:1132",
          "required": true,
          "resolution": "api_schema_name"
        },
        {
          "apiField": "password",
          "figmaField": "password",
          "format": "password",
          "kind": "password",
          "minLength": 8,
          "nodeId": "998:1148",
          "required": true,
          "resolution": "api_schema_name"
        }
      ],
      "method": "POST",
      "path": "/api/auth/login",
      "responseUnwrap": null,
      "role": "write",
      "submitNodeId": "998:1335",
      "unboundRequired": []
    }
  ],
  "4543:3496": [
    {
      "fields": [],
      "method": "GET",
      "path": "/api/dashboard",
      "responseUnwrap": "data",
      "role": "read",
      "submitNodeId": null,
      "unboundRequired": []
    }
  ]
};

/** Figma fields no contract operation accepts: keep them local UI state, never send them. */
export const UNRESOLVED_FIGMA_FIELDS: Readonly<Record<string, readonly string[]>> = {
  "4543:3496": [
    "iconbutton"
  ],
  "998:1024": [
    "checkbox"
  ]
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

function scalarToFormString(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  const nested = asRecord(value);
  if (nested) {
    for (const key of ["number", "value", "mobile", "phone", "text", "label"]) {
      const inner = nested[key];
      if (typeof inner === "string" || typeof inner === "number") {
        return String(inner);
      }
    }
  }
  return "";
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
    } else if (value === null || value === undefined) {
      values[field.figmaField] = "";
    } else {
      values[field.figmaField] = scalarToFormString(value);
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
  const nestedError = asRecord(record?.error);
  const raw =
    nestedError?.details ?? record?.errors ?? record?.details ?? record?.message;
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
