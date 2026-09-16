import type { ActivityTypeField } from '@/types/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface DynamicActivityTypeFieldsProps {
  fields: ActivityTypeField[];
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export function DynamicActivityTypeFields({
  fields,
  values,
  errors,
  onChange,
}: DynamicActivityTypeFieldsProps) {
  if (fields.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const value = values[field.name] ?? '';
        const error = errors[field.name];
        const isLongText = field.max_length > 100;

        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={`field-${field.name}`}>
              {field.label}
              {field.required && <span className="text-destructive"> *</span>}
            </Label>
            {isLongText ? (
              <Textarea
                id={`field-${field.name}`}
                value={value}
                maxLength={field.max_length}
                onChange={(e) => onChange(field.name, e.target.value)}
                aria-invalid={Boolean(error)}
              />
            ) : (
              <Input
                id={`field-${field.name}`}
                value={value}
                maxLength={field.max_length}
                onChange={(e) => onChange(field.name, e.target.value)}
                aria-invalid={Boolean(error)}
              />
            )}
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
