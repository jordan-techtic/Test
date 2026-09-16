import { activityFormSchema, refineActivityForm } from "@/lib/validation";
import type { ActivityTypeOption } from "@/types/api";

const types: ActivityTypeOption[] = [
  {
    value: "email_send",
    label: "Email Send",
    category: "promotions",
    color: "#E85D04",
    fields: [{ name: "additional_info", label: "Audience", required: true, max_length: 500 }],
  },
];

describe("create activity required fields", () => {
  it("requires title, date, and type", () => {
    const parsed = activityFormSchema.safeParse({
      title: "",
      activity_date: "",
      activity_type: "",
      details: "",
      additional_info: "",
    });
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const messages = parsed.error.issues.map((issue) => issue.message);
      expect(messages).toEqual(
        expect.arrayContaining([
          "Title is required.",
          "Date is required.",
          "Activity type is required.",
        ]),
      );
    }
  });

  it("requires type-driven additional info", () => {
    const extra = refineActivityForm(
      {
        title: "Summer send",
        activity_date: "2099-01-01",
        activity_type: "email_send",
        details: "",
        additional_info: "",
      },
      { types, today: "2026-01-01" },
    );
    expect(extra.additional_info).toBe("Audience is required.");
  });
});
