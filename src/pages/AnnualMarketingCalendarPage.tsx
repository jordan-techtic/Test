import { CalendarEmptyState } from '@/components/features/calendar/CalendarEmptyState';
import { CalendarErrorState } from '@/components/features/calendar/CalendarErrorState';
import { CalendarLoadingState } from '@/components/features/calendar/CalendarLoadingState';
import { CalendarToolbar } from '@/components/features/calendar/CalendarToolbar';
import { CreateActivityDialog } from '@/components/features/calendar/CreateActivityDialog';
import { YearCalendarGrid } from '@/components/features/calendar/YearCalendarGrid';
import { useMarketingCalendar } from '@/hooks/useMarketingCalendar';
import { getApiErrorMessage } from '@/lib/api/errors';

export function AnnualMarketingCalendarPage() {
  const {
    year,
    setYear,
    month,
    setMonth,
    createDialogOpen,
    setCreateDialogOpen,
    calendarQuery,
    createMutation,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
    activitiesByDate,
    activityTypes,
    today,
  } = useMarketingCalendar();

  const hasActivities = (calendarQuery.data?.activities.length ?? 0) > 0;

  return (
    <div>
      <CalendarToolbar
        year={year}
        month={month}
        onYearChange={setYear}
        onMonthChange={setMonth}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
        onCreateActivity={() => setCreateDialogOpen(true)}
      />

      {calendarQuery.isLoading ? (
        <CalendarLoadingState />
      ) : calendarQuery.isError ? (
        <CalendarErrorState
          message={getApiErrorMessage(calendarQuery.error)}
          onRetry={() => void calendarQuery.refetch()}
        />
      ) : (
        <>
          <YearCalendarGrid year={year} todayKey={today} activitiesByDate={activitiesByDate} />
          {!hasActivities && <CalendarEmptyState />}
        </>
      )}

      <CreateActivityDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        activityTypes={activityTypes}
        createMutation={createMutation}
      />
    </div>
  );
}
