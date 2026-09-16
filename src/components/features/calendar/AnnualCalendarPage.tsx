import { useEffect, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { ActivityDetailDialog } from "@/components/features/calendar/ActivityDetailDialog";
import { CalendarToolbar } from "@/components/features/calendar/CalendarToolbar";
import { CreateActivityDialog } from "@/components/features/calendar/CreateActivityDialog";
import { YearCalendarGrid } from "@/components/features/calendar/YearCalendarGrid";
import { useCalendar } from "@/hooks/useCalendar";

export function AnnualCalendarPage() {
  const now = useMemo(() => new Date(), []);
  const [year, setYear] = useState(now.getFullYear());
  const [visibleMonth, setVisibleMonth] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [category, setCategory] = useState("");
  const [activityType, setActivityType] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const query = useMemo(
    () => ({
      year,
      category: category || undefined,
      activity_type: activityType || undefined,
    }),
    [year, category, activityType],
  );
  const { data, isLoading, error, refetch } = useCalendar(query);

  useEffect(() => {
    setVisibleMonth((current) => new Date(year, current.getMonth(), 1));
  }, [year]);

  const today = data?.today ?? formatToday();
  const activities = data?.activities ?? [];
  const activityTypes = data?.activity_types ?? [];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Annual marketing calendar"
        description="Plan and review marketing activities across the year."
      />
      <CalendarToolbar
        year={year}
        visibleMonth={visibleMonth}
        onYearChange={(nextYear) => {
          setYear(nextYear);
          setVisibleMonth(new Date(nextYear, visibleMonth.getMonth(), 1));
        }}
        onVisibleMonthChange={(date) => {
          setVisibleMonth(date);
          if (date.getFullYear() !== year) {
            setYear(date.getFullYear());
          }
        }}
        onToday={() => {
          const current = new Date();
          setYear(current.getFullYear());
          setVisibleMonth(new Date(current.getFullYear(), current.getMonth(), 1));
        }}
        category={category}
        activityType={activityType}
        onCategoryChange={setCategory}
        onActivityTypeChange={setActivityType}
        activityTypes={activityTypes}
        onCreate={() => setCreateOpen(true)}
      />
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Unable to load calendar.</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-3">
            <span>{error}</span>
            <Button type="button" variant="outline" size="sm" onClick={refetch}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}
      {isLoading ? (
        <Spinner />
      ) : !error ? (
        <>
          {activities.length === 0 ? (
            <div className="rounded-md border bg-card">
              <EmptyState
                icon={<CalendarDays className="size-8 text-muted-foreground" aria-hidden />}
                title="No marketing activities scheduled for this year."
                description="Use Add Activity in the toolbar to schedule the first one."
              />
            </div>
          ) : null}
          <YearCalendarGrid
            year={year}
            today={today}
            activities={activities}
            focusedMonth={visibleMonth}
            onSelectActivity={setSelectedId}
          />
        </>
      ) : null}
      <CreateActivityDialog open={createOpen} onOpenChange={setCreateOpen} activityTypes={activityTypes} />
      <ActivityDetailDialog
        activityId={selectedId}
        activityTypes={activityTypes}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      />
    </div>
  );
}

function formatToday(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}
