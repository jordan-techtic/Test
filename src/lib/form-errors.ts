import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import { ApiError } from "@/lib/api/errors";

export function applyApiFieldErrors<TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
): void {
  if (!(error instanceof ApiError)) {
    return;
  }
  for (const detail of error.details) {
    if (detail.field && detail.message) {
      setError(detail.field as FieldPath<TFieldValues>, {
        type: "server",
        message: detail.message,
      });
    }
  }
}
