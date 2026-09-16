import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/Spinner";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { ActivityForm } from "@/components/features/calendar/ActivityForm";
import {
  activityFormSchema,
  type ActivityFormValues,
} from "@/components/features/calendar/activityFormSchema";
import { useActivityMutations } from "@/hooks/useActivityMutations";
import type { ActivityOut, ActivityTypeOption } from "@/types/api";

interface ActivityDetailDialogProps {
  activityId: string | null;
  activityTypes: ActivityTypeOption[];
  onOpenChange: (open: boolean) => void;
}

export function ActivityDetailDialog({
  activityId,
  activityTypes,
  onOpenChange,
}: ActivityDetailDialogProps) {
  const { load, update, remove, isLoadingDetail, isUpdating, isDeleting } = useActivityMutations();
  const [activity, setActivity] = useState<ActivityOut | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: "",
      activity_date: "",
      activity_type: "",
      details: "",
      additional_info: "",
    },
  });

  useEffect(() => {
    if (!activityId) {
      setActivity(null);
      return;
    }
    let cancelled = false;
    load(activityId).then((item) => {
      if (!cancelled && item) {
        setActivity(item);
        form.reset({
          title: item.title,
          activity_date: item.date,
          activity_type: item.activity_type || item.type,
          details: item.details ?? item.notes ?? item.description ?? "",
          additional_info: item.additional_info ?? "",
        });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [activityId, load, form]);

  const open = Boolean(activityId);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activity details</DialogTitle>
            <DialogDescription>View or update this marketing activity.</DialogDescription>
          </DialogHeader>
          {isLoadingDetail && !activity ? (
            <Spinner />
          ) : activity ? (
            <FormProvider {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(async (values) => {
                  const result = await update(activity.id, {
                    title: values.title,
                    activity_date: values.activity_date,
                    activity_type: values.activity_type,
                    details: values.details || null,
                    additional_info: values.additional_info || null,
                    updated_at: activity.updated_at,
                  });
                  if (result.ok && result.data) {
                    setActivity(result.data);
                    onOpenChange(false);
                    return;
                  }
                  if (result.code === "STALE_UPDATE") {
                    const fresh = await load(activity.id);
                    if (fresh) {
                      setActivity(fresh);
                      form.reset({
                        title: fresh.title,
                        activity_date: fresh.date,
                        activity_type: fresh.activity_type || fresh.type,
                        details: fresh.details ?? fresh.notes ?? fresh.description ?? "",
                        additional_info: fresh.additional_info ?? "",
                      });
                    }
                  }
                  Object.entries(result.fieldErrors).forEach(([field, message]) => {
                    if (
                      field === "title" ||
                      field === "activity_date" ||
                      field === "activity_type" ||
                      field === "details" ||
                      field === "additional_info"
                    ) {
                      form.setError(field, { message });
                    }
                  });
                })}
              >
                <ActivityForm activityTypes={activityTypes} campaignCode={activity.campaign_code} />
                <DialogFooter className="sm:justify-between">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setConfirmOpen(true)}
                    disabled={isDeleting}
                  >
                    Delete
                  </Button>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isUpdating} aria-busy={isUpdating}>
                      {isUpdating ? "Saving…" : "Save changes"}
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </FormProvider>
          ) : (
            <p className="text-sm text-muted-foreground">Unable to load this activity.</p>
          )}
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete activity?"
        description="This will permanently delete the activity. This action cannot be undone."
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={async () => {
          if (!activity) return;
          const result = await remove(activity.id);
          if (result.ok) {
            setConfirmOpen(false);
            onOpenChange(false);
          } else if (result.code === "ACTIVITY_PUBLISHED") {
            setConfirmOpen(false);
          }
        }}
      />
    </>
  );
}
