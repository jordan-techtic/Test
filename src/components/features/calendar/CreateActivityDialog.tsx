import { useEffect, useMemo, useState } from 'react';
import { toast } from '@/components/ui/sonner';
import type { UseMutationResult } from '@tanstack/react-query';
import type { ActivityCreateData, ActivityCreateRequest, ActivityTypeOption, ApiSuccessResponse } from '@/types/api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DynamicActivityTypeFields } from '@/components/features/calendar/DynamicActivityTypeFields';
import { getApiErrorMessage, parseApiFieldErrors } from '@/lib/api/errors';

interface CreateActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activityTypes: ActivityTypeOption[];
  createMutation: UseMutationResult<
    ApiSuccessResponse<ActivityCreateData>,
    Error,
    ActivityCreateRequest
  >;
}

const defaultForm = {
  title: '',
  activity_date: '',
  activity_type: '',
  details: '',
  additional_info: '',
};

export function CreateActivityDialog({
  open,
  onOpenChange,
  activityTypes,
  createMutation,
}: CreateActivityDialogProps) {
  const [form, setForm] = useState(defaultForm);
  const [dynamicValues, setDynamicValues] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const selectedType = useMemo(
    () => activityTypes.find((type) => type.value === form.activity_type),
    [activityTypes, form.activity_type],
  );

  useEffect(() => {
    if (!open) {
      setForm(defaultForm);
      setDynamicValues({});
      setFieldErrors({});
    }
  }, [open]);

  useEffect(() => {
    if (selectedType) {
      const initial: Record<string, string> = {};
      for (const field of selectedType.fields) {
        initial[field.name] = '';
      }
      setDynamicValues(initial);
    } else {
      setDynamicValues({});
    }
  }, [selectedType]);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!form.title.trim()) {
      errors.title = 'Title is required.';
    }
    if (!form.activity_date) {
      errors.activity_date = 'Activity date is required.';
    }
    if (!form.activity_type) {
      errors.activity_type = 'Activity type is required.';
    }

    if (selectedType) {
      for (const field of selectedType.fields) {
        if (field.required && !dynamicValues[field.name]?.trim()) {
          errors[field.name] = `${field.label} is required.`;
        }
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const additionalInfo = (() => {
      if (!selectedType || selectedType.fields.length === 0) {
        return form.additional_info.trim() || null;
      }
      if (selectedType.fields.length === 1) {
        const field = selectedType.fields[0];
        return dynamicValues[field.name]?.trim() || null;
      }
      const parts = selectedType.fields
        .map((field) => {
          const value = dynamicValues[field.name]?.trim();
          return value ? `${field.label}: ${value}` : null;
        })
        .filter(Boolean);
      return parts.length > 0 ? parts.join('\n') : null;
    })();

    try {
      const response = await createMutation.mutateAsync({
        title: form.title.trim(),
        activity_date: form.activity_date,
        activity_type: form.activity_type,
        details: form.details.trim() || null,
        additional_info: additionalInfo,
        category: selectedType?.category ?? null,
      });

      toast.success(response.message || 'Activity created successfully.');
      onOpenChange(false);
    } catch (error) {
      const apiErrors = parseApiFieldErrors(error);
      setFieldErrors((prev) => ({ ...prev, ...apiErrors }));
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Activity</DialogTitle>
          <DialogDescription>
            Schedule a new marketing activity on the calendar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activity-title">Title</Label>
            <Input
              id="activity-title"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              aria-invalid={Boolean(fieldErrors.title)}
            />
            {fieldErrors.title && (
              <p className="text-sm text-destructive" role="alert">
                {fieldErrors.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-date">Activity date</Label>
            <DatePicker
              id="activity-date"
              value={form.activity_date}
              onChange={(value) => setForm((prev) => ({ ...prev, activity_date: value }))}
              aria-invalid={Boolean(fieldErrors.activity_date)}
              aria-label="Activity date"
            />
            {fieldErrors.activity_date && (
              <p className="text-sm text-destructive" role="alert">
                {fieldErrors.activity_date}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-type">Activity type</Label>
            <Select
              value={form.activity_type}
              onValueChange={(value) => setForm((prev) => ({ ...prev, activity_type: value }))}
            >
              <SelectTrigger id="activity-type" aria-label="Activity type">
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.activity_type && (
              <p className="text-sm text-destructive" role="alert">
                {fieldErrors.activity_type}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-details">Details</Label>
            <Textarea
              id="activity-details"
              value={form.details}
              onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
            />
          </div>

          {selectedType && selectedType.fields.length > 0 ? (
            <DynamicActivityTypeFields
              fields={selectedType.fields}
              values={dynamicValues}
              errors={fieldErrors}
              onChange={(name, value) =>
                setDynamicValues((prev) => ({ ...prev, [name]: value }))
              }
            />
          ) : (
            <div className="space-y-2">
              <Label htmlFor="activity-additional-info">Additional info</Label>
              <Textarea
                id="activity-additional-info"
                value={form.additional_info}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, additional_info: e.target.value }))
                }
              />
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending} aria-busy={createMutation.isPending}>
              {createMutation.isPending ? 'Creating…' : 'Create Activity'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
