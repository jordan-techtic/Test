import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({ className, label = "Loading" }: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)} role="status">
      <span
        className="inline-block size-5 animate-spin rounded-full border-2 border-primary border-t-transparent"
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
