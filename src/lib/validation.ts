import { z } from "zod";
import type { ActivityTypeOption } from "@/types/api";

export const loginSchema = z.object({
  email_or_username: z.string().trim().min(1, "Email or username is required."),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const activityFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(100, "Title must be 100 characters or fewer."),
  activity_date: z.string().min(1, "Date is required."),
  activity_type: z.string().min(1, "Activity type is required."),
  details: z
    .string()
    .max(500, "Details must be 500 characters or fewer.")
    .optional()
    .or(z.literal("")),
  additional_info: z
    .string()
    .max(500, "Additional info must be 500 characters or fewer.")
    .optional()
    .or(z.literal("")),
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;

export function refineActivityForm(
  values: ActivityFormValues,
  options: { types: ActivityTypeOption[]; today: string },
): Partial<Record<keyof ActivityFormValues, string>> {
  const errors: Partial<Record<keyof ActivityFormValues, string>> = {};
  if (values.activity_date && values.activity_date < options.today) {
    errors.activity_date = "Please choose today or a future date.";
  }
  const selected = options.types.find((type) => type.value === values.activity_type);
  if (selected) {
    for (const field of selected.fields) {
      if (field.name === "additional_info" && field.required) {
        if (!values.additional_info || values.additional_info.trim() === "") {
          errors.additional_info = `${field.label} is required.`;
        }
      }
      if (field.name === "details" && field.required) {
        if (!values.details || values.details.trim() === "") {
          errors.details = `${field.label} is required.`;
        }
      }
    }
  }
  return errors;
}
