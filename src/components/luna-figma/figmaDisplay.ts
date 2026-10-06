/** luna-spec-codegen: owned-layout */
// Figma display nodes bound to GET response fields (Luna display contract).
// The data hook calls publishReadPayload(method, path, body) after every read;
// bound copy then renders the response value and cards past the response
// array length are hidden. Before a response arrives the Figma copy shows.
import { useSyncExternalStore } from "react";

export type FigmaDisplayPathPart = string | number;

export interface FigmaDisplayBinding {
  readonly nodeId: string;
  readonly frameId: string;
  readonly operation: string;
  readonly responseUnwrap: string | null;
  readonly path: readonly FigmaDisplayPathPart[];
  readonly kind: "text" | "item";
  readonly valueType: "string" | "number" | "date" | null;
  readonly format: string | null;
  readonly evidence: string;
}

/** data-figma-node → the response field it renders. */
export const FIGMA_DISPLAY_BINDINGS: Readonly<Record<string, FigmaDisplayBinding>> = {
  "4543:3593": {
    "evidence": "label_pair",
    "format": "number",
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3593",
    "operation": "GET /api/dashboard",
    "path": [
      "analytics",
      "analytics_data",
      "downloads"
    ],
    "responseUnwrap": "data",
    "valueType": "number"
  },
  "4543:3603": {
    "evidence": "label_pair",
    "format": "number",
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3603",
    "operation": "GET /api/dashboard",
    "path": [
      "analytics",
      "analytics_data",
      "content_generated"
    ],
    "responseUnwrap": "data",
    "valueType": "number"
  },
  "4543:3662": {
    "evidence": "repeated_cards",
    "format": null,
    "frameId": "4543:3496",
    "kind": "item",
    "nodeId": "4543:3662",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      0
    ],
    "responseUnwrap": "data",
    "valueType": null
  },
  "4543:3664": {
    "evidence": "role:date",
    "format": "weekday_short",
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3664",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      0,
      "date"
    ],
    "responseUnwrap": "data",
    "valueType": "date"
  },
  "4543:3665": {
    "evidence": "role:title",
    "format": null,
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3665",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      0,
      "title"
    ],
    "responseUnwrap": "data",
    "valueType": "string"
  },
  "4543:3668": {
    "evidence": "repeated_cards",
    "format": null,
    "frameId": "4543:3496",
    "kind": "item",
    "nodeId": "4543:3668",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      1
    ],
    "responseUnwrap": "data",
    "valueType": null
  },
  "4543:3670": {
    "evidence": "role:date",
    "format": "weekday_short",
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3670",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      1,
      "date"
    ],
    "responseUnwrap": "data",
    "valueType": "date"
  },
  "4543:3671": {
    "evidence": "role:title",
    "format": null,
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3671",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      1,
      "title"
    ],
    "responseUnwrap": "data",
    "valueType": "string"
  },
  "4543:3675": {
    "evidence": "repeated_cards",
    "format": null,
    "frameId": "4543:3496",
    "kind": "item",
    "nodeId": "4543:3675",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      2
    ],
    "responseUnwrap": "data",
    "valueType": null
  },
  "4543:3677": {
    "evidence": "role:date",
    "format": "weekday_short",
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3677",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      2,
      "date"
    ],
    "responseUnwrap": "data",
    "valueType": "date"
  },
  "4543:3678": {
    "evidence": "role:title",
    "format": null,
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3678",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      2,
      "title"
    ],
    "responseUnwrap": "data",
    "valueType": "string"
  },
  "4543:3682": {
    "evidence": "repeated_cards",
    "format": null,
    "frameId": "4543:3496",
    "kind": "item",
    "nodeId": "4543:3682",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      3
    ],
    "responseUnwrap": "data",
    "valueType": null
  },
  "4543:3684": {
    "evidence": "role:date",
    "format": "weekday_short",
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3684",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      3,
      "date"
    ],
    "responseUnwrap": "data",
    "valueType": "date"
  },
  "4543:3685": {
    "evidence": "role:title",
    "format": null,
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3685",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      3,
      "title"
    ],
    "responseUnwrap": "data",
    "valueType": "string"
  },
  "4543:3689": {
    "evidence": "repeated_cards",
    "format": null,
    "frameId": "4543:3496",
    "kind": "item",
    "nodeId": "4543:3689",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      4
    ],
    "responseUnwrap": "data",
    "valueType": null
  },
  "4543:3691": {
    "evidence": "role:date",
    "format": "weekday_short",
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3691",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      4,
      "date"
    ],
    "responseUnwrap": "data",
    "valueType": "date"
  },
  "4543:3692": {
    "evidence": "role:title",
    "format": null,
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3692",
    "operation": "GET /api/dashboard",
    "path": [
      "content_calendar",
      4,
      "title"
    ],
    "responseUnwrap": "data",
    "valueType": "string"
  },
  "4543:3711": {
    "evidence": "repeated_cards",
    "format": null,
    "frameId": "4543:3496",
    "kind": "item",
    "nodeId": "4543:3711",
    "operation": "GET /api/dashboard",
    "path": [
      "announcements",
      0
    ],
    "responseUnwrap": "data",
    "valueType": null
  },
  "4543:3712": {
    "evidence": "layer_name",
    "format": null,
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3712",
    "operation": "GET /api/dashboard",
    "path": [
      "announcements",
      0,
      "title"
    ],
    "responseUnwrap": "data",
    "valueType": "string"
  },
  "4543:3728": {
    "evidence": "repeated_cards",
    "format": null,
    "frameId": "4543:3496",
    "kind": "item",
    "nodeId": "4543:3728",
    "operation": "GET /api/dashboard",
    "path": [
      "announcements",
      1
    ],
    "responseUnwrap": "data",
    "valueType": null
  },
  "4543:3729": {
    "evidence": "layer_name",
    "format": null,
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3729",
    "operation": "GET /api/dashboard",
    "path": [
      "announcements",
      1,
      "title"
    ],
    "responseUnwrap": "data",
    "valueType": "string"
  },
  "4543:3745": {
    "evidence": "repeated_cards",
    "format": null,
    "frameId": "4543:3496",
    "kind": "item",
    "nodeId": "4543:3745",
    "operation": "GET /api/dashboard",
    "path": [
      "announcements",
      2
    ],
    "responseUnwrap": "data",
    "valueType": null
  },
  "4543:3746": {
    "evidence": "layer_name",
    "format": null,
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3746",
    "operation": "GET /api/dashboard",
    "path": [
      "announcements",
      2,
      "title"
    ],
    "responseUnwrap": "data",
    "valueType": "string"
  },
  "4543:3762": {
    "evidence": "repeated_cards",
    "format": null,
    "frameId": "4543:3496",
    "kind": "item",
    "nodeId": "4543:3762",
    "operation": "GET /api/dashboard",
    "path": [
      "announcements",
      3
    ],
    "responseUnwrap": "data",
    "valueType": null
  },
  "4543:3763": {
    "evidence": "layer_name",
    "format": null,
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3763",
    "operation": "GET /api/dashboard",
    "path": [
      "announcements",
      3,
      "title"
    ],
    "responseUnwrap": "data",
    "valueType": "string"
  },
  "4543:3779": {
    "evidence": "repeated_cards",
    "format": null,
    "frameId": "4543:3496",
    "kind": "item",
    "nodeId": "4543:3779",
    "operation": "GET /api/dashboard",
    "path": [
      "announcements",
      4
    ],
    "responseUnwrap": "data",
    "valueType": null
  },
  "4543:3780": {
    "evidence": "layer_name",
    "format": null,
    "frameId": "4543:3496",
    "kind": "text",
    "nodeId": "4543:3780",
    "operation": "GET /api/dashboard",
    "path": [
      "announcements",
      4,
      "title"
    ],
    "responseUnwrap": "data",
    "valueType": "string"
  }
};

/** Screen frame id → read operations its display bindings consume. */
export const FIGMA_DISPLAY_OPERATIONS: Readonly<Record<string, readonly string[]>> = {
  "4543:3496": [
    "GET /api/dashboard"
  ]
};

const payloads = new Map<string, unknown>();
const listeners = new Set<() => void>();
let version = 0;

/** Store one read response (raw body, envelope included) for the bindings that consume it. */
export function publishReadPayload(method: string, path: string, payload: unknown): void {
  payloads.set(`${method.toUpperCase()} ${path}`, payload);
  version += 1;
  listeners.forEach((listener) => listener());
}

/** Forget every stored response (sign-out); bound nodes show their Figma copy again. */
export function clearReadPayloads(): void {
  payloads.clear();
  version += 1;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function snapshot(): number {
  return version;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** A value inside a published read response; action resource ids are read the same way. */
export function publishedValue(
  operation: string,
  responseUnwrap: string | null,
  path: readonly FigmaDisplayPathPart[],
): { loaded: boolean; value: unknown } {
  if (!payloads.has(operation)) {
    return { loaded: false, value: undefined };
  }
  let current: unknown = payloads.get(operation);
  if (responseUnwrap) {
    current = asRecord(current)?.[responseUnwrap];
  }
  for (const part of path) {
    if (current === undefined || current === null) {
      break;
    }
    current = typeof part === "number"
      ? (Array.isArray(current) ? current[part] : undefined)
      : asRecord(current)?.[part];
  }
  return { loaded: true, value: current };
}

/** Re-render when any read is published (for components that call publishedValue). */
export function usePublishedReads(): number {
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

function lookup(binding: FigmaDisplayBinding): { loaded: boolean; value: unknown } {
  return publishedValue(binding.operation, binding.responseUnwrap, binding.path);
}

const DAY_MS = 24 * 60 * 60 * 1000;

function relativeTime(date: Date): string {
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) {
    return "just now";
  }
  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m ago`;
  }
  if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h ago`;
  }
  const days = Math.floor((Date.now() - date.getTime()) / DAY_MS);
  if (days === 1) {
    return "Yesterday";
  }
  if (days < 7) {
    return `${days}d ago`;
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDate(value: unknown, format: string | null): string {
  const date = typeof value === "string" || typeof value === "number" ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value : "";
  }
  switch (format) {
    case "weekday_short":
      return date.toLocaleDateString("en-US", { weekday: "short" });
    case "weekday_long":
      return date.toLocaleDateString("en-US", { weekday: "long" });
    case "month_day":
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    case "day_month":
      return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    case "date_numeric":
      return date.toLocaleDateString("en-US");
    case "relative":
      return relativeTime(date);
    default:
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
}

/** A response value as display copy, in the format the Figma sample copy used. */
export function formatDisplayValue(value: unknown, binding: FigmaDisplayBinding): string {
  if (value === undefined || value === null) {
    return "";
  }
  if (binding.valueType === "date") {
    return formatDate(value, binding.format);
  }
  if (typeof value === "number") {
    return binding.format === "number_grouped" ? value.toLocaleString("en-US") : String(value);
  }
  if (typeof value === "string" || typeof value === "boolean") {
    return String(value);
  }
  return "";
}

/** Bound copy: the response value once its read is published, the Figma copy before. */
export function figmaTextContent(nodeId: string, fallback: string): string {
  useSyncExternalStore(subscribe, snapshot, snapshot);
  const binding = FIGMA_DISPLAY_BINDINGS[nodeId];
  if (!binding || binding.kind !== "text") {
    return fallback;
  }
  const { loaded, value } = lookup(binding);
  return loaded ? formatDisplayValue(value, binding) : fallback;
}

export type FigmaItemBinding = {
  hidden?: boolean;
  "aria-hidden"?: boolean;
  "data-figma-item-missing"?: "true";
};

/** A repeated card hides once its read is published without an item at its index. */
export function figmaItemProps(nodeId: string): FigmaItemBinding {
  useSyncExternalStore(subscribe, snapshot, snapshot);
  const binding = FIGMA_DISPLAY_BINDINGS[nodeId];
  if (!binding || binding.kind !== "item") {
    return {};
  }
  const { loaded, value } = lookup(binding);
  if (!loaded || (value !== undefined && value !== null)) {
    return {};
  }
  return { hidden: true, "aria-hidden": true, "data-figma-item-missing": "true" };
}

/** Read operations ("METHOD /path") whose responses feed this frame's display bindings. */
export function figmaDisplayOperations(frameId: string): readonly string[] {
  return FIGMA_DISPLAY_OPERATIONS[frameId] ?? [];
}
