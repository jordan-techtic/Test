import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { parseDateKey } from "@/lib/dates";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function DatePicker({
  id,
  value,
  onChange,
  minDate,
  disabled,
  placeholder = "Select date",
}: DatePickerProps) {
  const selected = value ? parseDateKey(value) : undefined;
  const min = minDate ? parseDateKey(minDate) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn("h-10 w-full justify-start font-normal", !value && "text-muted-foreground")}
        >
          <CalendarIcon className="size-4" />
          {selected ? format(selected, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            if (date) {
              onChange(format(date, "yyyy-MM-dd"));
            }
          }}
          disabled={min ? { before: min } : undefined}
          weekStartsOn={1}
          labels={{
            labelPrevious: () => "Previous month",
            labelNext: () => "Next month",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
