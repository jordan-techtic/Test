import { useState } from "react";
import { ActivityEntry } from "@/components/features/calendar/ActivityEntry";
import { EmptyState } from "@/components/shared/EmptyState";
import { buildMonthGrid, monthLabel, toDateKey, WEEKDAY_LABELS } from "@/lib/dates";
import { cn } from "@/lib/utils";
import type { ActivityOut } from "@/types/api";

interface AnnualCalendarProps {
  year: number;
  focusedMonth: number;
  today: string;
  activities: ActivityOut[];
  onOpenActivity: (id: string) => void;
  onReschedule: (id: string, date: string, updatedAt?: string) => void;
  emptyMessage: string;
}

export function AnnualCalendar({
  year,
  focusedMonth,
  today,
  activities,
  onOpenActivity,
  onReschedule,
  emptyMessage,
}: AnnualCalendarProps) {
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const byDate = new Map<string, ActivityOut[]>();
  for (const activity of activities) {
    const list = byDate.get(activity.date) ?? [];
    list.push(activity);
    byDate.set(activity.date, list);
  }

  return (
    <div className="space-y-6">
      {activities.length === 0 ? <EmptyState title={emptyMessage} /> : null}
      <div className="overflow-x-auto">
        <div className="grid min-w-[960px] gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => {
            const weeks = buildMonthGrid(year, month);
            return (
              <section
                key={month}
                id={`month-${month}`}
                aria-labelledby={`month-heading-${month}`}
                className={cn(
                  "rounded-md border bg-card p-3",
                  focusedMonth === month && "ring-2 ring-ring",
                )}
              >
                <h2 id={`month-heading-${month}`} className="mb-2 text-sm font-semibold">
                  {monthLabel(year, month)}
                </h2>
                <div role="grid" aria-label={monthLabel(year, month)} className="space-y-1">
                  <div role="row" className="grid grid-cols-7 gap-1">
                    {WEEKDAY_LABELS.map((label) => (
                      <div
                        key={label}
                        role="columnheader"
                        className="text-center text-[11px] font-medium text-muted-foreground"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} role="row" className="grid grid-cols-7 gap-1">
                      {week.map((day) => {
                        const key = toDateKey(day);
                        const inMonth = day.getMonth() === month - 1;
                        const isToday = key === today;
                        const isPast = key < today;
                        const canDrop = !isPast && inMonth;
                        const dayActivities = inMonth ? (byDate.get(key) ?? []) : [];
                        return (
                          <div
                            key={key}
                            role="gridcell"
                            aria-label={key}
                            onDragOver={(event) => {
                              if (canDrop) {
                                event.preventDefault();
                                setDropTarget(key);
                              }
                            }}
                            onDragLeave={() => {
                              setDropTarget((current) => (current === key ? null : current));
                            }}
                            onDrop={(event) => {
                              event.preventDefault();
                              setDropTarget(null);
                              if (!canDrop) {
                                return;
                              }
                              const id = event.dataTransfer.getData("text/activity-id");
                              const updatedAt = event.dataTransfer.getData("text/updated-at");
                              if (id) {
                                onReschedule(id, key, updatedAt || undefined);
                              }
                            }}
                            className={cn(
                              "min-h-[72px] rounded-sm border border-transparent p-1 transition-colors",
                              inMonth
                                ? "bg-background hover:bg-accent/40"
                                : "bg-muted/40 text-muted-foreground",
                              isToday && "border-primary",
                              dropTarget === key && canDrop && "bg-accent ring-2 ring-ring",
                            )}
                          >
                            <div className="mb-1 text-[11px] text-muted-foreground">
                              {day.getDate()}
                            </div>
                            <div className="space-y-1">
                              {dayActivities.map((activity) => (
                                <ActivityEntry
                                  key={activity.id}
                                  activity={activity}
                                  today={today}
                                  onOpenFull={onOpenActivity}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function DragDropCalendar(props: AnnualCalendarProps) {
  return <AnnualCalendar {...props} />;
}
