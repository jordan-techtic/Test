import { getTodayLocalDateString } from '@/lib/calendar/dates'
import type { ActivityTypeField, ActivityTypeOption } from '@/types/api'

export interface CreateActivityFormValues {
  title: string
  activity_date: string
  activity_type: string
  details?: string
  additional_info?: string
}

export type FieldErrors = Partial<
  Record<keyof CreateActivityFormValues | 'form', string>
>

interface ValidateActivityOptions {
  allowPastDates?: boolean
}

function validateActivityFields(
  values: CreateActivityFormValues,
  activityTypes: ActivityTypeOption[],
  options: ValidateActivityOptions = {},
): FieldErrors {
  const errors: FieldErrors = {}

  if (!values.title.trim()) {
    errors.title = 'Title is required.'
  } else if (values.title.trim().length > 100) {
    errors.title = 'Title must be 100 characters or fewer.'
  }

  if (!values.activity_date) {
    errors.activity_date = 'Date is required.'
  } else if (
    !options.allowPastDates &&
    values.activity_date < getTodayLocalDateString()
  ) {
    errors.activity_date = 'Date must be today or in the future.'
  }

  if (!values.activity_type) {
    errors.activity_type = 'Activity type is required.'
  }

  if (values.details && values.details.length > 500) {
    errors.details = 'Details must be 500 characters or fewer.'
  }

  const selectedType = activityTypes.find(
    (type) => type.value === values.activity_type,
  )

  selectedType?.fields.forEach((field: ActivityTypeField) => {
    const value = values.additional_info ?? ''
    if (field.required && !value.trim()) {
      errors.additional_info = `${field.label} is required.`
    } else if (value.length > field.max_length) {
      errors.additional_info = `${field.label} must be ${field.max_length} characters or fewer.`
    }
  })

  return errors
}

export function validateCreateActivity(
  values: CreateActivityFormValues,
  activityTypes: ActivityTypeOption[],
): FieldErrors {
  return validateActivityFields(values, activityTypes)
}

export function validateUpdateActivity(
  values: CreateActivityFormValues,
  activityTypes: ActivityTypeOption[],
): FieldErrors {
  return validateActivityFields(values, activityTypes, { allowPastDates: true })
}
