import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface CalendarNavigationProps {
  year: number
  month: number | null
  onYearChange: (year: number) => void
  onMonthChange: (month: number | null) => void
  onToday: () => void
}

const MONTHS = [
  { value: 'all', label: 'All months' },
  ...Array.from({ length: 12 }, (_, index) => ({
    value: String(index + 1),
    label: new Date(2024, index, 1).toLocaleString('en-US', { month: 'long' }),
  })),
]

const CURRENT_YEAR = new Date().getFullYear()
const YEAR_OPTIONS = Array.from(
  { length: 11 },
  (_, index) => CURRENT_YEAR - 5 + index,
)

export function CalendarNavigation({
  year,
  month,
  onYearChange,
  onMonthChange,
  onToday,
}: CalendarNavigationProps) {
  const handlePreviousMonth = () => {
    if (month === null) {
      onMonthChange(12)
      onYearChange(year - 1)
      return
    }
    if (month === 1) {
      onMonthChange(12)
      onYearChange(year - 1)
      return
    }
    onMonthChange(month - 1)
  }

  const handleNextMonth = () => {
    if (month === null) {
      onMonthChange(1)
      onYearChange(year + 1)
      return
    }
    if (month === 12) {
      onMonthChange(1)
      onYearChange(year + 1)
      return
    }
    onMonthChange(month + 1)
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-wrap items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous month"
              onClick={handlePreviousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Previous month</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next month"
              onClick={handleNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next month</TooltipContent>
        </Tooltip>

      <Select
        value={String(year)}
        onValueChange={(value) => onYearChange(Number(value))}
      >
        <SelectTrigger className="h-9 w-[110px]" aria-label="Year">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {YEAR_OPTIONS.map((optionYear) => (
            <SelectItem key={optionYear} value={String(optionYear)}>
              {optionYear}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={month === null ? 'all' : String(month)}
        onValueChange={(value) =>
          onMonthChange(value === 'all' ? null : Number(value))
        }
      >
        <SelectTrigger className="h-9 w-[160px]" aria-label="Month">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

        <Button type="button" variant="secondary" size="sm" onClick={onToday}>
          Today
        </Button>
      </div>
    </TooltipProvider>
  )
}
