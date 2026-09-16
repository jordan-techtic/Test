import { useRef, useState } from "react";
import { ActivityInPlaceEditor } from "@/components/features/calendar/ActivityInPlaceEditor";
import type { ActivityOut } from "@/types/api";
import { cn } from "@/lib/utils";

interface ActivityEntryProps {
  activity: ActivityOut;
  today: string;
  onOpenFull: (id: string) => void;
}

export function ActivityEntry({ activity, today, onOpenFull }: ActivityEntryProps) {
  const [open, setOpen] = useState(false);
  const dragging = useRef(false);

  return (
    <ActivityInPlaceEditor
      activity={activity}
      today={today}
      open={open}
      onOpenChange={(next) => {
        if (!dragging.current) {
          setOpen(next);
        }
      }}
      onOpenFull={onOpenFull}
    >
      <button
        type="button"
        draggable
        onDragStart={(event) => {
          dragging.current = true;
          setOpen(false);
          event.dataTransfer.setData("text/activity-id", activity.id);
          event.dataTransfer.setData("text/updated-at", activity.updated_at);
          event.dataTransfer.effectAllowed = "move";
        }}
        onDragEnd={() => {
          window.setTimeout(() => {
            dragging.current = false;
          }, 0);
        }}
        onClick={(event) => {
          if (dragging.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`${activity.title}, ${activity.date}`}
        className={cn(
          "block min-h-11 w-full truncate rounded-sm px-1.5 py-1 text-left text-[11px] font-medium text-white shadow-sm transition-[filter,box-shadow,opacity] hover:brightness-110 hover:ring-2 hover:ring-white/80 active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:min-h-0 md:py-0.5",
        )}
        style={{ backgroundColor: activity.color || "var(--primary)" }}
      >
        {activity.title}
      </button>
    </ActivityInPlaceEditor>
  );
}
