import { contrastText, cn } from "@/lib/utils";
import type { ActivityOut } from "@/types/api";

interface ActivityEntryProps {
  activity: ActivityOut;
  onSelect: (id: string) => void;
}

export function ActivityEntry({ activity, onSelect }: ActivityEntryProps) {
  const background = activity.color?.trim() ? activity.color : undefined;
  return (
    <button
      type="button"
      className={cn(
        "block w-full truncate rounded-[4px] px-1.5 py-0.5 text-left text-[11px] font-medium transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50",
        !background && "bg-primary text-primary-foreground",
      )}
      style={
        background
          ? { backgroundColor: background, color: contrastText(background) }
          : undefined
      }
      aria-label={activity.title}
      onClick={() => onSelect(activity.id)}
    >
      {activity.title}
    </button>
  );
}
