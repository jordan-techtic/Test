import {
  addDays,
  eachDayOfInterval,
  endOfYear,
  format,
  getISOWeek,
  startOfWeek,
  startOfYear,
} from 'date-fns'

import type { ActivityOut } from '@/types/api'

export interface CalendarDay {
  date: string
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  activities: ActivityOut[]
}

export interface CalendarWeekRow {
  weekNumber: number
  days: CalendarDay[]
}

function toDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function buildYearGrid(
  year: number,
  focusMonth: number | null,
  today: string,
  activities: ActivityOut[],
): CalendarWeekRow[] {
  const yearStart = startOfYear(new Date(year, 0, 1))
  const yearEnd = endOfYear(yearStart)
  const gridStart = startOfWeek(yearStart, { weekStartsOn: 1 })
  const gridEnd = startOfWeek(addDays(yearEnd, 6), { weekStartsOn: 1 })

  const allDays = eachDayOfInterval({ start: gridStart, end: gridEnd })
  const activitiesByDate = activities.reduce<Record<string, ActivityOut[]>>(
    (acc, activity) => {
      const key = activity.date
      acc[key] = acc[key] ? [...acc[key], activity] : [activity]
      return acc
    },
    {},
  )

  const weeks: CalendarWeekRow[] = []
  for (let index = 0; index < allDays.length; index += 7) {
    const weekDays = allDays.slice(index, index + 7)
    const days: CalendarDay[] = weekDays.map((day) => {
      const dateKey = toDateKey(day)
      return {
        date: dateKey,
        dayNumber: day.getDate(),
        isCurrentMonth:
          focusMonth === null
            ? day.getFullYear() === year
            : day.getFullYear() === year && day.getMonth() + 1 === focusMonth,
        isToday: dateKey === today,
        activities: activitiesByDate[dateKey] ?? [],
      }
    })

    weeks.push({
      weekNumber: getISOWeek(weekDays[0]),
      days,
    })
  }

  return weeks
}
