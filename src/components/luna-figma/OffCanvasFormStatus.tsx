type OffCanvasFormStatusProps = {
  statusMessage: string;
  loading: boolean;
};

/** Loading and API messages live off-canvas (screen reader + live region). */
export function OffCanvasFormStatus({ statusMessage, loading }: OffCanvasFormStatusProps) {
  const message = loading ? 'Submitting sign up request' : statusMessage;

  return (
    <div
      className="pointer-events-none fixed left-[-9999px] top-0 h-px w-px overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      {message ? <p>{message}</p> : null}
    </div>
  );
}
