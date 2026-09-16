import { format } from 'date-fns';
import type { Activity } from '@/types/api';
import { ActivityEntryChip } from '@/components/features/calendar/ActivityEntryChip';
import { cn } from '@/lib/utils';

interface CalendarDayCellProps {
  date: Date;
  dateKey: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  activities: Activity[];
}

export function CalendarDayCell({
  date,
  dateKey,
  isCurrentMonth,
  isToday,
  activities,
}: CalendarDayCellProps) {
  return (
    <div
      className={cn(
        'min-h-[88px] border border-border p-1 sm:min-h-[104px] sm:p-2',
        !isCurrentMonth && 'bg-muted/30 text-muted-foreground',
        isToday && 'ring-2 ring-inset ring-primary/40',
      )}
      data-date={dateKey}
    >
      <div className="mb-1 text-sm font-medium">{format(date, 'd')}</div>
      <div className="flex flex-col gap-1">
        {activities.map((activity) => (
          <ActivityEntryChip key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
