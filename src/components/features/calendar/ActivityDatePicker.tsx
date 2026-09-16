import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getTodayLocalDate, parseLocalDateString } from '@/lib/calendar/dates'
import { cn } from '@/lib/utils'

interface ActivityDatePickerProps {
  id: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  'aria-invalid'?: boolean
  allowPastDates?: boolean
}

export function ActivityDatePicker({
  id,
  value,
  onChange,
  disabled = false,
  'aria-invalid': ariaInvalid,
  allowPastDates = false,
}: ActivityDatePickerProps) {
  const [open, setOpen] = useState(false)

  const selectedDate = useMemo(() => {
    if (!value) return undefined
    return parseLocalDateString(value)
  }, [value])

  const minDate = allowPastDates ? undefined : getTodayLocalDate()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-invalid={ariaInvalid}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) {
              onChange(format(date, 'yyyy-MM-dd'))
              setOpen(false)
            }
          }}
          disabled={minDate ? { before: minDate } : undefined}
          defaultMonth={selectedDate ?? minDate ?? new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}
