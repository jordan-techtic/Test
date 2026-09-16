import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CalendarToolbarProps {
  year: number;
  month: number;
  years: number[];
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onToday: () => void;
  onCreate: () => void;
}

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

export function CalendarToolbar({
  year,
  month,
  years,
  onYearChange,
  onMonthChange,
  onToday,
  onCreate,
}: CalendarToolbarProps) {
  function goPrevious() {
    if (month === 1) {
      onMonthChange(12);
      onYearChange(year - 1);
      return;
    }
    onMonthChange(month - 1);
  }

  function goNext() {
    if (month === 12) {
      onMonthChange(1);
      onYearChange(year + 1);
      return;
    }
    onMonthChange(month + 1);
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-11 md:size-8"
              aria-label="Previous month"
              onClick={goPrevious}
            >
              <ChevronLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Previous month</TooltipContent>
        </Tooltip>
        <Select value={String(month)} onValueChange={(value) => onMonthChange(Number(value))}>
          <SelectTrigger className="h-11 w-[140px] md:h-8" aria-label="Month">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((label, index) => (
              <SelectItem key={label} value={String(index + 1)}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={String(year)} onValueChange={(value) => onYearChange(Number(value))}>
          <SelectTrigger className="h-11 w-[100px] md:h-8" aria-label="Year">
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-11 md:size-8"
              aria-label="Next month"
              onClick={goNext}
            >
              <ChevronRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next month</TooltipContent>
        </Tooltip>
        <Button type="button" variant="outline" size="sm" className="h-11 md:h-8" onClick={onToday}>
          Today
        </Button>
      </div>
      <Button type="button" className="h-11 self-start md:h-8 lg:self-auto" onClick={onCreate}>
        Create Activity
      </Button>
    </div>
  );
}
