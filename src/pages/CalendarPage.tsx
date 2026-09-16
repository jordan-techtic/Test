import { useState } from 'react'

import { AnnualCalendarGrid } from '@/components/features/calendar/AnnualCalendarGrid'
import { CalendarEmptyState } from '@/components/features/calendar/CalendarEmptyState'
import { CalendarErrorState } from '@/components/features/calendar/CalendarErrorState'
import { CalendarNavigation } from '@/components/features/calendar/CalendarNavigation'
import { ActivityDetailDialog } from '@/components/features/calendar/ActivityDetailDialog'
import { CreateActivityDialog } from '@/components/features/calendar/CreateActivityDialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { getCalendarErrorMessage } from '@/hooks/useCalendar'
import { useMarketingData } from '@/hooks/useMarketingData'

function parseTodayParts(today: string | undefined) {
  if (!today) {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() + 1 }
  }
  const [yearPart, monthPart] = today.split('-')
  return {
    year: Number(yearPart),
    month: Number(monthPart),
  }
}

export function CalendarPage() {
  const [year, setYear] = useState(() => new Date().getFullYear())
  const [month, setMonth] = useState<number | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const { calendarQuery } = useMarketingData({
    year,
    month,
    activityId: selectedActivityId,
  })
  const calendarData = calendarQuery.data

  const handleToday = () => {
    const todayParts = parseTodayParts(calendarData?.today)
    setYear(todayParts.year)
    setMonth(todayParts.month)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-[28px] font-semibold leading-9 text-foreground">
          Annual Marketing Calendar
        </h1>
        <p className="text-sm text-muted-foreground">
          Plan and review marketing activities across the year.
        </p>
      </div>

      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
        <CalendarNavigation
          year={year}
          month={month}
          onYearChange={setYear}
          onMonthChange={setMonth}
          onToday={handleToday}
        />
        <Button type="button" onClick={() => setCreateOpen(true)}>
          Create Activity
        </Button>
      </div>

      {calendarQuery.isLoading ? (
        <div className="space-y-4">
          <div className="flex min-h-[320px] items-center justify-center">
            <Spinner label="Loading calendar" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ) : null}

      {calendarQuery.isError ? (
        <CalendarErrorState
          message={getCalendarErrorMessage(calendarQuery.error)}
          onRetry={() => calendarQuery.refetch()}
          isRetrying={calendarQuery.isFetching}
        />
      ) : null}

      {calendarQuery.isSuccess && calendarData ? (
        <>
          {calendarData.activities.length === 0 ? (
            <CalendarEmptyState description={null} />
          ) : null}
          <AnnualCalendarGrid
            year={year}
            month={month}
            today={calendarData.today}
            activities={calendarData.activities}
            onActivitySelect={(activityId) => {
              setSelectedActivityId(activityId)
              setDetailOpen(true)
            }}
          />
        </>
      ) : null}

      <CreateActivityDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        year={year}
        month={month}
        activityTypes={calendarData?.activity_types ?? []}
      />

      <ActivityDetailDialog
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open)
          if (!open) {
            setSelectedActivityId(null)
          }
        }}
        activityId={selectedActivityId}
        year={year}
        month={month}
        activityTypes={calendarData?.activity_types ?? []}
      />
    </div>
  )
}
