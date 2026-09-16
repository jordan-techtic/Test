import { addMonths, format, startOfMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ActivityTypeOption } from "@/types/api";

const ALL = "all";
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface CalendarToolbarProps {
  year: number;
  visibleMonth: Date;
  onYearChange: (year: number) => void;
  onVisibleMonthChange: (date: Date) => void;
  onToday: () => void;
  category: string;
  activityType: string;
  onCategoryChange: (value: string) => void;
  onActivityTypeChange: (value: string) => void;
  activityTypes: ActivityTypeOption[];
  onCreate: () => void;
}

export function CalendarToolbar({
  year,
  visibleMonth,
  onYearChange,
  onVisibleMonthChange,
  onToday,
  category,
  activityType,
  onCategoryChange,
  onActivityTypeChange,
  activityTypes,
  onCreate,
}: CalendarToolbarProps) {
  const years = Array.from({ length: 7 }, (_, index) => year - 3 + index);
  const categories = Array.from(new Set(activityTypes.map((item) => item.category))).filter(Boolean);

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous month"
              onClick={() => onVisibleMonthChange(addMonths(startOfMonth(visibleMonth), -1))}
            >
              <ChevronLeft />
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
              onClick={() => onVisibleMonthChange(addMonths(startOfMonth(visibleMonth), 1))}
            >
              <ChevronRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next month</TooltipContent>
        </Tooltip>
        <Button type="button" variant="outline" size="sm" aria-label="Today" onClick={onToday}>
          Today
        </Button>
        <Select value={String(visibleMonth.getMonth())} onValueChange={(value) => {
          const next = new Date(year, Number(value), 1);
          onVisibleMonthChange(next);
        }}>
          <SelectTrigger className="h-8 w-[140px]" aria-label="Month">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((label, index) => (
              <SelectItem key={label} value={String(index)}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={String(year)} onValueChange={(value) => onYearChange(Number(value))}>
          <SelectTrigger className="h-8 w-[100px]" aria-label="Year">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((item) => (
              <SelectItem key={item} value={String(item)}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{format(visibleMonth, "MMMM yyyy")}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={category || ALL} onValueChange={(value) => onCategoryChange(value === ALL ? "" : value)}>
          <SelectTrigger className="h-8 w-[160px]" aria-label="Category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All categories</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={activityType || ALL}
          onValueChange={(value) => onActivityTypeChange(value === ALL ? "" : value)}
        >
          <SelectTrigger className="h-8 w-[180px]" aria-label="Activity type">
            <SelectValue placeholder="Activity type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All types</SelectItem>
            {activityTypes.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="button" onClick={onCreate}>
          Add Activity
        </Button>
      </div>
    </div>
  );
}
