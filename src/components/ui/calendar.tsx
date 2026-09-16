import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

import 'react-day-picker/style.css'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function CalendarNavButton({
  'aria-label': ariaLabel,
  children,
  className,
  ...props
}: React.ComponentProps<'button'>) {
  const label = ariaLabel ?? 'Navigate month'

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          className={className}
          {...props}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: CalendarProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn('p-3', className)}
        classNames={{
          months: 'flex flex-col gap-4 sm:flex-row',
          month: 'flex flex-col gap-4',
          month_caption: 'relative flex items-center justify-center pt-1',
          caption_label: 'text-sm font-medium',
          nav: 'flex items-center gap-1',
          button_previous: cn(
            buttonVariants({ variant: 'outline' }),
            'absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          ),
          button_next: cn(
            buttonVariants({ variant: 'outline' }),
            'absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          ),
          month_grid: 'mt-4 w-full border-collapse',
          weekdays: 'flex',
          weekday:
            'w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground',
          week: 'mt-2 flex w-full',
          day: 'relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20',
          day_button: cn(
            buttonVariants({ variant: 'ghost' }),
            'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
          ),
          selected:
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          today: 'bg-accent text-accent-foreground',
          outside:
            'text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
          disabled: 'text-muted-foreground opacity-50',
          hidden: 'invisible',
          ...classNames,
        }}
        components={{
          Chevron: ({ orientation }) => {
            const Icon = orientation === 'left' ? ChevronLeft : ChevronRight
            return <Icon className="h-4 w-4" aria-hidden="true" />
          },
          PreviousMonthButton: (buttonProps) => (
            <CalendarNavButton {...buttonProps} />
          ),
          NextMonthButton: (buttonProps) => (
            <CalendarNavButton {...buttonProps} />
          ),
          ...components,
        }}
        {...props}
      />
    </TooltipProvider>
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
