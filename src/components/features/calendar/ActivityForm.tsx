import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useId } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ActivityFormValues } from "@/components/features/calendar/activityFormSchema";
import type { ActivityTypeOption } from "@/types/api";

interface ActivityFormProps {
  activityTypes: ActivityTypeOption[];
  campaignCode?: string;
}

export function ActivityForm({ activityTypes, campaignCode }: ActivityFormProps) {
  const form = useFormContext<ActivityFormValues>();
  const campaignCodeId = useId();
  const selectedType = form.watch("activity_type");
  const typeOption = activityTypes.find((item) => item.value === selectedType);
  const extraFields = typeOption?.fields ?? [];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input maxLength={100} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="activity_date"
        render={({ field }) => {
          const selected = field.value ? parseISO(field.value) : undefined;
          return (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 w-full justify-start font-normal"
                    >
                      <CalendarIcon className="size-4" aria-hidden />
                      {field.value ? format(parseISO(field.value), "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(format(date, "yyyy-MM-dd"));
                      }
                    }}
                    disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="activity_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Activity type</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {activityTypes.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {extraFields.length > 0 ? (
        <FormField
          control={form.control}
          name="additional_info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{extraFields[0]?.label ?? "Additional info"}</FormLabel>
              <FormControl>
                <Textarea maxLength={extraFields[0]?.max_length ?? 500} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : null}
      <FormField
        control={form.control}
        name="details"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Details</FormLabel>
            <FormControl>
              <Textarea maxLength={500} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {campaignCode ? (
        <div className="space-y-2">
          <Label htmlFor={campaignCodeId}>Campaign code</Label>
          <Input id={campaignCodeId} value={campaignCode} readOnly aria-readonly />
        </div>
      ) : null}
    </div>
  );
}
