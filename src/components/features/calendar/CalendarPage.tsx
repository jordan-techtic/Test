import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ActivityEditDialog } from "@/components/features/calendar/ActivityEditDialog";
import { ActivityFilters } from "@/components/features/calendar/ActivityFilters";
import { AuditLogPanel } from "@/components/features/calendar/AuditLogPanel";
import { CalendarToolbar } from "@/components/features/calendar/CalendarToolbar";
import { CreateActivityDialog } from "@/components/features/calendar/CreateActivityDialog";
import { DragDropCalendar } from "@/components/features/calendar/DragDropCalendar";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/Spinner";
import { useActivities } from "@/hooks/useActivities";
import { useCalendar } from "@/hooks/useCalendar";
import { useRescheduleActivity } from "@/hooks/useRescheduleActivity";
import { parseDateKey, utcToday } from "@/lib/dates";
import type { ActivityOut } from "@/types/api";

function uniqueYears(todayYear: number, selectedYear: number): number[] {
  const years = new Set<number>();
  for (let year = todayYear - 2; year <= todayYear + 2; year += 1) {
    years.add(year);
  }
  years.add(selectedYear);
  return Array.from(years).sort((a, b) => a - b);
}

function parseYear(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 2000 && parsed <= 2100 ? parsed : fallback;
}

function parseMonth(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 12 ? parsed : fallback;
}

export function CalendarPage() {
  const fallbackToday = utcToday();
  const fallbackDate = parseDateKey(fallbackToday);
  const [searchParams, setSearchParams] = useSearchParams();
  const year = parseYear(searchParams.get("year"), fallbackDate.getFullYear());
  const month = parseMonth(searchParams.get("month"), fallbackDate.getMonth() + 1);
  const categories = searchParams.getAll("category");
  const activityTypes = searchParams.getAll("activity_type");
  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dateOverrides, setDateOverrides] = useState<Record<string, string>>({});

  const { data, isLoading, error, refetch } = useCalendar({
    year,
    category: categories.length ? categories : undefined,
    activity_type: activityTypes.length ? activityTypes : undefined,
  });
  const { data: activityList } = useActivities({
    year,
    category: categories.length ? categories : undefined,
    activity_type: activityTypes.length ? activityTypes : undefined,
  });
  const { submit: reschedule } = useRescheduleActivity();
  const today = data?.today ?? fallbackToday;
  const types = data?.activity_types ?? [];
  const todayDate = parseDateKey(today);
  const years = uniqueYears(todayDate.getFullYear(), year);

  const activities = useMemo(() => {
    return (data?.activities ?? []).map((activity: ActivityOut) => ({
      ...activity,
      date: dateOverrides[activity.id] ?? activity.date,
    }));
  }, [data?.activities, dateOverrides]);

  const hasFilters = categories.length > 0 || activityTypes.length > 0;
  const emptyMessage =
    hasFilters && activities.length === 0
      ? "No activities match filters"
      : "No activities scheduled";
  const showFilteredEmpty =
    hasFilters && activities.length === 0 && (activityList?.total ?? 0) === 0;

  function updateQuery(patch: {
    year?: number;
    month?: number;
    categories?: string[];
    activityTypes?: string[];
  }) {
    const next = new URLSearchParams();
    const nextYear = patch.year ?? year;
    const nextMonth = patch.month ?? month;
    const nextCategories = patch.categories ?? categories;
    const nextTypes = patch.activityTypes ?? activityTypes;
    next.set("year", String(nextYear));
    next.set("month", String(nextMonth));
    for (const value of nextCategories) {
      next.append("category", value);
    }
    for (const value of nextTypes) {
      next.append("activity_type", value);
    }
    setSearchParams(next, { replace: true });
  }

  async function handleReschedule(id: string, date: string, updatedAt?: string) {
    const previous = activities.find((item) => item.id === id);
    if (!previous || previous.date === date) {
      return;
    }
    setDateOverrides((current) => ({ ...current, [id]: date }));
    try {
      await reschedule({ id, date, updated_at: updatedAt });
      setDateOverrides((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
    } catch {
      setDateOverrides((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
    }
  }

  function goToday() {
    const next = parseDateKey(today);
    updateQuery({ year: next.getFullYear(), month: next.getMonth() + 1 });
    requestAnimationFrame(() => {
      document.getElementById(`month-${next.getMonth() + 1}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function handleMonthChange(nextMonth: number) {
    updateQuery({ month: nextMonth });
    requestAnimationFrame(() => {
      document.getElementById(`month-${nextMonth}`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Annual Marketing Calendar"
        description="View and schedule marketing activities across the year."
      />
      <div className="sticky top-0 z-20 -mx-4 space-y-3 border-b bg-background px-4 py-3 md:-mx-6 md:px-6">
        <CalendarToolbar
          year={year}
          month={month}
          years={years}
          onYearChange={(nextYear) => updateQuery({ year: nextYear })}
          onMonthChange={handleMonthChange}
          onToday={goToday}
          onCreate={() => setCreateOpen(true)}
        />
        <ActivityFilters
          types={types}
          categories={categories}
          activityTypes={activityTypes}
          onCategoriesChange={(values) => updateQuery({ categories: values })}
          onTypesChange={(values) => updateQuery({ activityTypes: values })}
          onClear={() => updateQuery({ categories: [], activityTypes: [] })}
          isLoading={isLoading && !data}
        />
      </div>
      {isLoading && !data ? (
        <div className="flex min-h-[320px] items-center justify-center">
          <Spinner label="Loading calendar" />
        </div>
      ) : null}
      {error ? <ErrorMessage message={error} onRetry={() => void refetch()} /> : null}
      {!error && data ? (
        <DragDropCalendar
          year={year}
          focusedMonth={month}
          today={today}
          activities={activities}
          onOpenActivity={setEditingId}
          onReschedule={(id, date, updatedAt) => {
            void handleReschedule(id, date, updatedAt);
          }}
          emptyMessage={emptyMessage}
        />
      ) : null}
      {showFilteredEmpty ? (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => updateQuery({ categories: [], activityTypes: [] })}
          >
            Clear filters
          </Button>
        </div>
      ) : null}
      <AuditLogPanel />
      <CreateActivityDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        types={types}
        today={today}
      />
      <ActivityEditDialog
        activityId={editingId}
        open={Boolean(editingId)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingId(null);
          }
        }}
        types={types}
        today={today}
      />
    </div>
  );
}
