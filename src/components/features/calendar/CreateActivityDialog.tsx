import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ActivityTypeFields } from '@/components/features/calendar/ActivityTypeFields'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCreateActivity } from '@/hooks/useCreateActivity'
import { getApiErrorMessage } from '@/lib/api/errors'
import {
  validateCreateActivity,
  type CreateActivityFormValues,
  type FieldErrors,
} from '@/lib/calendar/validation'
import type { ActivityTypeOption, ApiErrorEnvelope } from '@/types/api'

interface CreateActivityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  year: number
  month: number | null
  activityTypes: ActivityTypeOption[]
}

const initialValues: CreateActivityFormValues = {
  title: '',
  activity_date: '',
  activity_type: '',
  details: '',
  additional_info: '',
}

export function CreateActivityDialog({
  open,
  onOpenChange,
  year,
  month,
  activityTypes,
}: CreateActivityDialogProps) {
  const createMutation = useCreateActivity({ year, month })
  const [values, setValues] = useState<CreateActivityFormValues>(initialValues)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const selectedType = useMemo(
    () => activityTypes.find((type) => type.value === values.activity_type),
    [activityTypes, values.activity_type],
  )

  const resetForm = () => {
    setValues(initialValues)
    setFieldErrors({})
  }

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm()
    }
    onOpenChange(nextOpen)
  }

  const applyServerFieldErrors = (error: unknown) => {
    if (!axios.isAxiosError(error)) return
    const data = error.response?.data as ApiErrorEnvelope | undefined
    if (!data?.error.details?.length) return

    const nextErrors: FieldErrors = {}
    data.error.details.forEach((detail) => {
      const key = detail.field as keyof CreateActivityFormValues
      nextErrors[key] = detail.message
    })
    setFieldErrors(nextErrors)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validateCreateActivity(values, activityTypes)
    setFieldErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    try {
      await createMutation.mutateAsync({
        title: values.title.trim(),
        activity_date: values.activity_date,
        activity_type: values.activity_type,
        details: values.details?.trim() || null,
        additional_info: values.additional_info?.trim() || null,
        category: selectedType?.category ?? null,
      })
      handleClose(false)
    } catch (error) {
      applyServerFieldErrors(error)
      if (!axios.isAxiosError(error) || !error.response?.data?.error?.details) {
        setFieldErrors({ form: getApiErrorMessage(error) })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Activity</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {fieldErrors.form ? (
            <p className="text-sm text-destructive" role="alert">
              {fieldErrors.form}
            </p>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={values.title}
              maxLength={100}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              disabled={createMutation.isPending}
              aria-invalid={Boolean(fieldErrors.title)}
            />
            {fieldErrors.title ? (
              <p className="text-sm text-destructive" role="alert">
                {fieldErrors.title}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity_date">Date *</Label>
            <Input
              id="activity_date"
              name="activity_date"
              type="date"
              value={values.activity_date}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  activity_date: event.target.value,
                }))
              }
              disabled={createMutation.isPending}
              aria-invalid={Boolean(fieldErrors.activity_date)}
            />
            {fieldErrors.activity_date ? (
              <p className="text-sm text-destructive" role="alert">
                {fieldErrors.activity_date}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity_type">Activity Type *</Label>
            <Select
              value={values.activity_type}
              onValueChange={(value) =>
                setValues((current) => ({
                  ...current,
                  activity_type: value,
                  additional_info: '',
                }))
              }
              disabled={createMutation.isPending}
            >
              <SelectTrigger id="activity_type" aria-label="Activity type">
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
            {fieldErrors.activity_type ? (
              <p className="text-sm text-destructive" role="alert">
                {fieldErrors.activity_type}
              </p>
            ) : null}
          </div>

          {selectedType ? (
            <ActivityTypeFields
              fields={selectedType.fields}
              value={values.additional_info ?? ''}
              onChange={(value) =>
                setValues((current) => ({ ...current, additional_info: value }))
              }
              error={fieldErrors.additional_info}
              disabled={createMutation.isPending}
            />
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="details">Notes</Label>
            <Textarea
              id="details"
              name="details"
              value={values.details}
              maxLength={500}
              rows={4}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  details: event.target.value,
                }))
              }
              disabled={createMutation.isPending}
              aria-invalid={Boolean(fieldErrors.details)}
            />
            {fieldErrors.details ? (
              <p className="text-sm text-destructive" role="alert">
                {fieldErrors.details}
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={createMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending} aria-busy={createMutation.isPending}>
              {createMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Creating…
                </>
              ) : (
                'Add Activity'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
