import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityTypeFields } from "@/components/features/calendar/ActivityTypeFields";
import { DatePicker } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateActivity } from "@/hooks/useCreateActivity";
import { applyApiFieldErrors } from "@/lib/form-errors";
import { activityFormSchema, refineActivityForm, type ActivityFormValues } from "@/lib/validation";
import type { ActivityTypeOption } from "@/types/api";

interface CreateActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  types: ActivityTypeOption[];
  today: string;
}

export function CreateActivityDialog({
  open,
  onOpenChange,
  types,
  today,
}: CreateActivityDialogProps) {
  const { submit, isLoading } = useCreateActivity();
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: "",
      activity_date: today,
      activity_type: "",
      details: "",
      additional_info: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: "",
        activity_date: today,
        activity_type: "",
        details: "",
        additional_info: "",
      });
    }
  }, [open, today, form]);

  async function onSubmit(values: ActivityFormValues) {
    const extra = refineActivityForm(values, { types, today });
    if (Object.keys(extra).length > 0) {
      for (const [name, message] of Object.entries(extra)) {
        form.setError(name as keyof ActivityFormValues, { type: "manual", message });
      }
      return;
    }
    const selected = types.find((type) => type.value === values.activity_type);
    try {
      await submit({
        title: values.title,
        activity_date: values.activity_date,
        activity_type: values.activity_type,
        details: values.details?.trim() ? values.details : undefined,
        additional_info: values.additional_info?.trim() ? values.additional_info : undefined,
        category: selected?.category,
      });
      form.reset({
        title: "",
        activity_date: today,
        activity_type: "",
        details: "",
        additional_info: "",
      });
      onOpenChange(false);
    } catch (error) {
      applyApiFieldErrors(error, form.setError);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!isLoading) {
          onOpenChange(next);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Activity</DialogTitle>
          <DialogDescription>Add a marketing activity to the annual calendar.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} minDate={today} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activity_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details (optional)</FormLabel>
                  <FormControl>
                    <Textarea maxLength={500} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ActivityTypeFields form={form} types={types} />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
                {isLoading ? "Creating…" : "Create Activity"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
