import { Button } from '@/components/ui/button';

interface CalendarErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function CalendarErrorState({ message, onRetry }: CalendarErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <p className="text-destructive" role="alert">
        {message}
      </p>
      <Button type="button" variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
