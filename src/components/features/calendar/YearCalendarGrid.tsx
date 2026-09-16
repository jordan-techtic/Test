import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useEffect } from "react";
import { ActivityEntry } from "@/components/features/calendar/ActivityEntry";
import { cn } from "@/lib/utils";
import type { ActivityOut } from "@/types/api";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface YearCalendarGridProps {
  year: number;
  today: string;
  activities: ActivityOut[];
  onSelectActivity: (id: string) => void;
  focusedMonth: Date;
}

function MonthGrid({
  monthDate,
  today,
  activities,
  onSelectActivity,
}: {
  monthDate: Date;
  today: string;
  activities: ActivityOut[];
  onSelectActivity: (id: string) => void;
}) {
  const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });
  const todayDate = new Date(`${today}T00:00:00`);

  return (
    <section
      id={`month-${format(monthDate, "yyyy-MM")}`}
      className="rounded-md border bg-card p-3"
      aria-labelledby={`month-label-${format(monthDate, "yyyy-MM")}`}
    >
      <h2 id={`month-label-${format(monthDate, "yyyy-MM")}`} className="mb-2 text-sm font-semibold">
        {format(monthDate, "MMMM yyyy")}
      </h2>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-muted-foreground">
        {WEEKDAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const dayActivities = activities.filter((activity) => activity.date === key);
          const inMonth = isSameMonth(day, monthDate);
          return (
            <div
              key={key}
              className={cn(
                "min-h-11 rounded-sm border border-transparent p-1 md:min-h-[56px]",
                inMonth ? "bg-background" : "bg-muted/40 text-muted-foreground",
                isSameDay(day, todayDate) && "border-primary",
              )}
            >
              <div className="mb-0.5 text-right text-[11px]">{format(day, "d")}</div>
              <div className="space-y-1">
                {dayActivities.map((activity) => (
                  <ActivityEntry key={activity.id} activity={activity} onSelect={onSelectActivity} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function YearCalendarGrid({
  year,
  today,
  activities,
  onSelectActivity,
  focusedMonth,
}: YearCalendarGridProps) {
  const months = Array.from({ length: 12 }, (_, index) => new Date(year, index, 1));

  useEffect(() => {
    const id = `month-${format(focusedMonth, "yyyy-MM")}`;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [focusedMonth, year]);

  return (
    <div className="grid grid-cols-1 gap-4 overflow-x-auto md:grid-cols-2 xl:grid-cols-3">
      {months.map((monthDate) => (
        <div
          key={monthDate.toISOString()}
          className={cn(
            format(monthDate, "yyyy-MM") === format(focusedMonth, "yyyy-MM") && "rounded-md ring-1 ring-primary/30",
          )}
        >
          <MonthGrid
            monthDate={monthDate}
            today={today}
            activities={activities}
            onSelectActivity={onSelectActivity}
          />
        </div>
      ))}
    </div>
  );
}
