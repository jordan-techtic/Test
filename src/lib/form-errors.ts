import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import { ApiError } from "@/lib/api/errors";

export function applyApiFieldErrors<TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
  allowedFields: ReadonlyArray<FieldPath<TFieldValues>>,
): void {
  if (!(error instanceof ApiError)) {
    return;
  }
  for (const detail of error.details) {
    if (!detail.field || !detail.message) {
      continue;
    }
    const field = allowedFields.find((name) => name === detail.field);
    if (field) {
      setError(field, {
        type: "server",
        message: detail.message,
      });
    }
  }
}
