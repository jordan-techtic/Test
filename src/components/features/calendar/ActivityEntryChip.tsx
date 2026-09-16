import type { Activity } from '@/types/api';
import { cn } from '@/lib/utils';

interface ActivityEntryChipProps {
  activity: Activity;
  onClick?: () => void;
}

export function ActivityEntryChip({ activity, onClick }: ActivityEntryChipProps) {
  const formattedDate = activity.date;

  return (
    <button
      type="button"
      data-activity-chip={activity.id}
      className={cn(
        'w-full truncate rounded-md px-2 py-1 text-left text-xs text-white transition-[filter] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      )}
      style={{ backgroundColor: activity.color }}
      aria-label={`${activity.title} on ${formattedDate}`}
      onClick={onClick}
    >
      {activity.title}
    </button>
  );
}
