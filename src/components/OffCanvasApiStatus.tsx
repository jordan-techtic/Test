type OffCanvasApiStatusProps = {
  label: string;
  loading?: boolean;
  error?: string | null;
  success?: string | null;
};

export function OffCanvasApiStatus({ label, loading, error, success }: OffCanvasApiStatusProps) {
  const message = loading ? `${label}: loading` : error ? `${label}: ${error}` : success ? `${label}: ${success}` : '';

  if (!message) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed left-[-9999px] top-0 h-px w-px overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <p>{message}</p>
    </div>
  );
}
