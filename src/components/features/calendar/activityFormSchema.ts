import { z } from "zod";

function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export const activityFormSchema = z.object({
  title: z.string().min(1, "Title is required.").max(100, "Title must be 100 characters or fewer."),
  activity_date: z
    .string()
    .min(1, "Date is required.")
    .refine((value) => value >= todayIso(), "Date must be today or in the future."),
  activity_type: z.string().min(1, "Activity type is required."),
  details: z.string().max(500, "Details must be 500 characters or fewer.").optional().or(z.literal("")),
  additional_info: z
    .string()
    .max(500, "Additional info must be 500 characters or fewer.")
    .optional()
    .or(z.literal("")),
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;
