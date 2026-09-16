import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActivityTypeFields } from "@/components/features/calendar/ActivityTypeFields";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { DatePicker } from "@/components/shared/DatePicker";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteActivity } from "@/hooks/useDeleteActivity";
import { useUpdateActivity } from "@/hooks/useUpdateActivity";
import { getActivity } from "@/lib/api/marketing";
import { getApiErrorMessage } from "@/lib/api/errors";
import { applyApiFieldErrors } from "@/lib/form-errors";
import { activityFormSchema, refineActivityForm, type ActivityFormValues } from "@/lib/validation";
import type { ActivityOut, ActivityTypeOption } from "@/types/api";

interface ActivityEditDialogProps {
  activityId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  types: ActivityTypeOption[];
  today: string;
}

export function ActivityEditDialog({
  activityId,
  open,
  onOpenChange,
  types,
  today,
}: ActivityEditDialogProps) {
  const { submit: update, isLoading: isSaving } = useUpdateActivity();
  const { submit: remove, isLoading: isDeleting } = useDeleteActivity();
  const [record, setRecord] = useState<ActivityOut | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
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
    if (!open || !activityId) {
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    setLoadError(null);
    void getActivity(activityId)
      .then((result) => {
        if (cancelled) {
          return;
        }
        setRecord(result.data);
        form.reset({
          title: result.data.title,
          activity_date: result.data.date,
          activity_type: result.data.activity_type || result.data.type,
          details: result.data.details || result.data.notes || "",
          additional_info: result.data.additional_info || "",
        });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setLoadError(getApiErrorMessage(error));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [open, activityId, form]);

  async function onSubmit(values: ActivityFormValues) {
    if (!activityId || !record) {
      return;
    }
    const extra = refineActivityForm(values, { types, today });
    if (Object.keys(extra).length > 0) {
      for (const [name, message] of Object.entries(extra)) {
        form.setError(name as keyof ActivityFormValues, { type: "manual", message });
      }
      return;
    }
    const selected = types.find((type) => type.value === values.activity_type);
    try {
      await update(activityId, {
        title: values.title,
        activity_date: values.activity_date,
        activity_type: values.activity_type,
        details: values.details?.trim() ? values.details : undefined,
        additional_info: values.additional_info?.trim() ? values.additional_info : undefined,
        category: selected?.category,
        updated_at: record.updated_at,
      });
      onOpenChange(false);
    } catch (error) {
      applyApiFieldErrors(error, form.setError);
    }
  }

  async function onConfirmDelete() {
    if (!activityId) {
      return;
    }
    try {
      await remove(activityId);
      setConfirmOpen(false);
      onOpenChange(false);
    } catch {
      setConfirmOpen(false);
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!isSaving && !isDeleting) {
            onOpenChange(next);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Activity</DialogTitle>
            <DialogDescription>
              Update the activity or change its date. Deleting cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : null}
          {loadError ? <ErrorMessage message={loadError} /> : null}
          {!isLoading && !loadError ? (
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
                {record?.campaign_code ? (
                  <p className="text-sm text-muted-foreground">
                    Campaign code: {record.campaign_code}
                  </p>
                ) : null}
                <DialogFooter className="gap-2 sm:justify-between">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setConfirmOpen(true)}
                    disabled={isSaving || isDeleting}
                  >
                    Delete
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSaving} aria-busy={isSaving}>
                      {isSaving ? "Saving…" : "Save changes"}
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          ) : null}
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete activity?"
        description="This will permanently delete the activity from the calendar. This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={() => {
          void onConfirmDelete();
        }}
      />
    </>
  );
}
