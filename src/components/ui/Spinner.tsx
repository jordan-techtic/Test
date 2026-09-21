export default function Spinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="inline-flex h-8 w-8 items-center justify-center"
    >
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-border/30 border-t-primary" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
