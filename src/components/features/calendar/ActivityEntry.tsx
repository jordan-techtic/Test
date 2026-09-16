import type { ActivityOut } from '@/types/api'
import { getReadableTextColor } from '@/lib/calendar/contrast'
import { cn } from '@/lib/utils'

interface ActivityEntryProps {
  activity: ActivityOut
  onSelect?: (activity: ActivityOut) => void
}

export function ActivityEntry({ activity, onSelect }: ActivityEntryProps) {
  const textColor = getReadableTextColor(activity.color)

  return (
    <button
      type="button"
      onClick={() => onSelect?.(activity)}
      className={cn(
        'min-h-11 w-full truncate rounded px-2 py-2 text-left text-xs font-medium transition sm:min-h-0 sm:py-1',
        'hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      )}
      style={{
        backgroundColor: activity.color,
        color: textColor,
      }}
      title={activity.title}
    >
      {activity.title}
    </button>
  )
}
