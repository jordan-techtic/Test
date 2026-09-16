import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ActivityTypeField } from '@/types/api'

interface ActivityTypeFieldsProps {
  fields: ActivityTypeField[]
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

export function ActivityTypeFields({
  fields,
  value,
  onChange,
  error,
  disabled = false,
}: ActivityTypeFieldsProps) {
  if (fields.length === 0) {
    return null
  }

  const primaryField = fields[0]

  return (
    <div className="space-y-2">
      <Label htmlFor="additional_info">
        {primaryField.label}
        {primaryField.required ? ' *' : ''}
      </Label>
      <Input
        id="additional_info"
        name="additional_info"
        value={value}
        maxLength={primaryField.max_length}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        aria-invalid={Boolean(error)}
      />
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
