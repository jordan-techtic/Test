import { Spinner } from '@/components/ui/Spinner';

export function CalendarLoadingState() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner label="Loading calendar" />
    </div>
  );
}
