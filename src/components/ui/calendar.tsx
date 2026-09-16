import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { cn } from "@/lib/utils";
import "react-day-picker/style.css";

export type CalendarProps = DayPickerProps;

function Calendar(props: CalendarProps) {
  return (
    <DayPicker
      {...props}
      weekStartsOn={1}
      className={cn("p-3")}
      labels={{
        labelPrevious: () => "Previous month",
        labelNext: () => "Next month",
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" aria-hidden />
          ) : (
            <ChevronRight className="size-4" aria-hidden />
          ),
      }}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
