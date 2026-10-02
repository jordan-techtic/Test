import type { ReactElement } from "react";

export function ScreenStatusAnnouncer({
  statusMessage,
  loading,
}: {
  statusMessage: string;
  loading: boolean;
}): ReactElement {
  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {loading ? "Loading" : statusMessage}
    </div>
  );
}

export function FieldErrorAnnouncer({
  fieldErrors,
}: {
  fieldErrors: Record<string, string>;
}): ReactElement {
  const entries = Object.entries(fieldErrors).filter(([, message]) => message.length > 0);
  if (entries.length === 0) {
    return <div className="sr-only" aria-live="polite" />;
  }
  return (
    <div aria-live="polite" className="sr-only">
      {entries.map(([field, message]) => (
        <p key={field} id={`figma-error-${field}`}>
          {message}
        </p>
      ))}
    </div>
  );
}
