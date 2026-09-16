import { useEffect, useState, type ReactNode } from "react";
import { DatePicker } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useUpdateActivity } from "@/hooks/useUpdateActivity";
import { ApiError, getApiErrorMessage, isCanceledError } from "@/lib/api/errors";
import type { ActivityOut } from "@/types/api";

interface ActivityInPlaceEditorProps {
  activity: ActivityOut;
  today: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenFull: (id: string) => void;
  children: ReactNode;
}

export function ActivityInPlaceEditor({
  activity,
  today,
  open,
  onOpenChange,
  onOpenFull,
  children,
}: ActivityInPlaceEditorProps) {
  const { submit, isLoading } = useUpdateActivity();
  const [title, setTitle] = useState(activity.title);
  const [date, setDate] = useState(activity.date);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTitle(activity.title);
      setDate(activity.date);
      setError(null);
    }
  }, [open, activity.title, activity.date]);

  async function handleSave() {
    const nextTitle = title.trim();
    if (!nextTitle) {
      setError("Title is required.");
      return;
    }
    if (nextTitle.length > 100) {
      setError("Title must be 100 characters or fewer.");
      return;
    }
    if (!date) {
      setError("Date is required.");
      return;
    }
    if (date < today) {
      setError("Date must be today or in the future.");
      return;
    }
    setError(null);
    try {
      await submit(activity.id, {
        title: nextTitle,
        activity_date: date,
        updated_at: activity.updated_at,
      });
      onOpenChange(false);
    } catch (err) {
      if (isCanceledError(err)) {
        return;
      }
      if (err instanceof ApiError) {
        const fieldMessage = err.details.find((detail) => detail.message)?.message;
        setError(fieldMessage || getApiErrorMessage(err));
        return;
      }
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange} modal={false}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[260px] space-y-3 p-3" align="start" sideOffset={6}>
        <p className="text-sm font-semibold">Edit activity</p>
        <div className="space-y-1.5">
          <Label htmlFor={`inplace-title-${activity.id}`}>Title</Label>
          <Input
            id={`inplace-title-${activity.id}`}
            value={title}
            maxLength={100}
            onChange={(event) => setTitle(event.target.value)}
            aria-invalid={Boolean(error)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`inplace-date-${activity.id}`}>Date</Label>
          <DatePicker
            id={`inplace-date-${activity.id}`}
            value={date}
            onChange={setDate}
            minDate={today}
          />
        </div>
        {error ? (
          <p role="alert" className="text-xs text-destructive">
            {error}
          </p>
        ) : null}
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              onOpenChange(false);
              onOpenFull(activity.id);
            }}
          >
            More details
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={isLoading}
            aria-busy={isLoading}
            onClick={() => {
              void handleSave();
            }}
          >
            {isLoading ? "Saving…" : "Save"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
