import { useWatch, type UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { ActivityFormValues } from "@/lib/validation";
import type { ActivityTypeOption } from "@/types/api";

interface ActivityTypeFieldsProps {
  form: UseFormReturn<ActivityFormValues>;
  types: ActivityTypeOption[];
}

export function ActivityTypeFields({ form, types }: ActivityTypeFieldsProps) {
  const activityType = useWatch({ control: form.control, name: "activity_type" });
  const selected = types.find((type) => type.value === activityType);
  if (!selected || selected.fields.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {selected.fields
        .filter((field) => field.name !== "details" && field.name !== "title")
        .map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name === "details" ? "details" : "additional_info"}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required ? "" : " (optional)"}
                </FormLabel>
                <FormControl>
                  <Textarea maxLength={field.max_length || 500} {...formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
    </div>
  );
}
