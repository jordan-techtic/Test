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
import { ActivityForm } from "@/components/features/calendar/ActivityForm";
import {
  activityFormSchema,
  type ActivityFormValues,
} from "@/components/features/calendar/activityFormSchema";
import { useActivityMutations } from "@/hooks/useActivityMutations";
import type { ActivityTypeOption } from "@/types/api";

interface CreateActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activityTypes: ActivityTypeOption[];
}

export function CreateActivityDialog({ open, onOpenChange, activityTypes }: CreateActivityDialogProps) {
  const { create, isCreating } = useActivityMutations();
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

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) {
          form.reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Activity</DialogTitle>
          <DialogDescription>Add a marketing activity to the calendar.</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(async (values) => {
              const result = await create({
                title: values.title,
                activity_date: values.activity_date,
                activity_type: values.activity_type,
                details: values.details || null,
                additional_info: values.additional_info || null,
              });
              if (result.ok) {
                form.reset();
                onOpenChange(false);
                return;
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
            <ActivityForm activityTypes={activityTypes} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating} aria-busy={isCreating}>
                {isCreating ? "Saving…" : "Create activity"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
