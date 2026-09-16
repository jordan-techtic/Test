import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ActivityDatePicker } from '@/components/features/calendar/ActivityDatePicker'
import { ActivityTypeFields } from '@/components/features/calendar/ActivityTypeFields'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
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
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { getActivityErrorMessage, useActivity } from '@/hooks/useActivity'
import { useCampaignCode } from '@/hooks/useMarketingData'
import { useDeleteActivity } from '@/hooks/useDeleteActivity'
import { useUpdateActivity } from '@/hooks/useUpdateActivity'
import { getApiErrorMessage } from '@/lib/api/errors'
import {
  validateUpdateActivity,
  type CreateActivityFormValues,
  type FieldErrors,
} from '@/lib/calendar/validation'
import type { ActivityTypeOption, ApiErrorEnvelope } from '@/types/api'

interface ActivityDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activityId: string | null
  year: number
  month: number | null
  activityTypes: ActivityTypeOption[]
}

export function ActivityDetailDialog({
  open,
  onOpenChange,
  activityId,
  year,
  month,
  activityTypes,
}: ActivityDetailDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [values, setValues] = useState<CreateActivityFormValues>({
    title: '',
    activity_date: '',
    activity_type: '',
    details: '',
    additional_info: '',
  })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const activityQuery = useActivity(activityId, open)
  const campaignCodeQuery = useCampaignCode(activityId, open)
  const updateMutation = useUpdateActivity({ year, month })
  const deleteMutation = useDeleteActivity({ year, month })

  const activity = activityQuery.data
  const campaignCode = campaignCodeQuery.data?.campaign_code ?? activity?.campaign_code

  const selectedType = useMemo(
    () => activityTypes.find((type) => type.value === values.activity_type),
    [activityTypes, values.activity_type],
  )

  const startEditing = () => {
    if (!activity) return
    setValues({
      title: activity.title,
      activity_date: activity.date,
      activity_type: activity.activity_type,
      details: activity.details ?? '',
      additional_info: activity.additional_info ?? '',
    })
    setFieldErrors({})
    setIsEditing(true)
  }

  const resetState = () => {
    setIsEditing(false)
    setDeleteOpen(false)
    setFieldErrors({})
  }

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetState()
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

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!activityId || !activity) return

    const validationErrors = validateUpdateActivity(values, activityTypes)
    setFieldErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    try {
      await updateMutation.mutateAsync({
        id: activityId,
        payload: {
          title: values.title.trim(),
          activity_date: values.activity_date,
          activity_type: values.activity_type,
          details: values.details?.trim() || null,
          additional_info: values.additional_info?.trim() || null,
          category: selectedType?.category ?? activity.category,
          status: activity.status,
          updated_at: activity.updated_at,
        },
      })
      setIsEditing(false)
      handleClose(false)
    } catch (error) {
      applyServerFieldErrors(error)
      if (!axios.isAxiosError(error) || !error.response?.data?.error?.details) {
        setFieldErrors({ form: getApiErrorMessage(error) })
      }
    }
  }

  const handleDelete = async () => {
    if (!activityId) return

    try {
      await deleteMutation.mutateAsync(activityId)
      setDeleteOpen(false)
      handleClose(false)
    } catch {
      // Toast handled in mutation hook.
    }
  }

  const isMutating = updateMutation.isPending || deleteMutation.isPending

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Activity' : 'Activity Details'}</DialogTitle>
          </DialogHeader>

          {activityQuery.isLoading ? (
            <div className="flex min-h-[160px] items-center justify-center">
              <Spinner label="Loading activity" />
            </div>
          ) : null}

          {activityQuery.isError ? (
            <div className="space-y-3">
              <p className="text-sm text-destructive" role="alert">
                {getActivityErrorMessage(activityQuery.error)}
              </p>
              <Button type="button" variant="outline" onClick={() => activityQuery.refetch()}>
                Try again
              </Button>
            </div>
          ) : null}

          {activity && !isEditing ? (
            <div className="space-y-4">
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-medium text-muted-foreground">Title</dt>
                  <dd>{activity.title}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Date</dt>
                  <dd>{activity.date}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Activity type</dt>
                  <dd>{activity.type}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Category</dt>
                  <dd>{activity.category}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Status</dt>
                  <dd className="capitalize">{activity.status}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Campaign code</dt>
                  <dd>{campaignCode ?? '—'}</dd>
                </div>
                {activity.details ? (
                  <div>
                    <dt className="font-medium text-muted-foreground">Notes</dt>
                    <dd className="whitespace-pre-wrap">{activity.details}</dd>
                  </div>
                ) : null}
                {activity.additional_info ? (
                  <div>
                    <dt className="font-medium text-muted-foreground">Additional info</dt>
                    <dd className="whitespace-pre-wrap">{activity.additional_info}</dd>
                  </div>
                ) : null}
              </dl>

              <DialogFooter className="gap-2 sm:justify-between">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setDeleteOpen(true)}
                  disabled={isMutating}
                >
                  Delete
                </Button>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                    Close
                  </Button>
                  <Button type="button" onClick={startEditing}>
                    Edit
                  </Button>
                </div>
              </DialogFooter>
            </div>
          ) : null}

          {activity && isEditing ? (
            <form className="space-y-4" onSubmit={handleUpdate} noValidate>
              {fieldErrors.form ? (
                <p className="text-sm text-destructive" role="alert">
                  {fieldErrors.form}
                </p>
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={values.title}
                  maxLength={100}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, title: event.target.value }))
                  }
                  disabled={isMutating}
                  aria-invalid={Boolean(fieldErrors.title)}
                />
                {fieldErrors.title ? (
                  <p className="text-sm text-destructive" role="alert">
                    {fieldErrors.title}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-activity_date">Date *</Label>
                <ActivityDatePicker
                  id="edit-activity_date"
                  value={values.activity_date}
                  onChange={(activity_date) =>
                    setValues((current) => ({ ...current, activity_date }))
                  }
                  disabled={isMutating}
                  allowPastDates
                  aria-invalid={Boolean(fieldErrors.activity_date)}
                />
                {fieldErrors.activity_date ? (
                  <p className="text-sm text-destructive" role="alert">
                    {fieldErrors.activity_date}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-activity_type">Activity Type *</Label>
                <Select
                  value={values.activity_type}
                  onValueChange={(value) =>
                    setValues((current) => ({
                      ...current,
                      activity_type: value,
                      additional_info: '',
                    }))
                  }
                  disabled={isMutating}
                >
                  <SelectTrigger id="edit-activity_type" aria-label="Activity type">
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
                  disabled={isMutating}
                />
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="edit-details">Notes</Label>
                <Textarea
                  id="edit-details"
                  value={values.details}
                  maxLength={500}
                  rows={4}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, details: event.target.value }))
                  }
                  disabled={isMutating}
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
                  onClick={() => setIsEditing(false)}
                  disabled={isMutating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isMutating} aria-busy={isMutating}>
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      Saving…
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </DialogFooter>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete activity?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The activity will be removed from the calendar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault()
                void handleDelete()
              }}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? 'Deleting…' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
