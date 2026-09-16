import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner";
import { useForgotPassword } from "@/hooks/useForgotPassword";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});

type ForgotPasswordValues = z.infer<typeof schema>;

interface ForgotPasswordFormProps {
  onCancel: () => void;
}

export function ForgotPasswordForm({ onCancel }: ForgotPasswordFormProps) {
  const { submit, isSubmitting, fieldErrors } = useForgotPassword();
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(async (values) => {
          const ok = await submit(values);
          if (ok) {
            form.reset();
          }
        })}
        noValidate
      >
        <h2 className="text-lg font-semibold">Reset password</h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(fieldErrors.email)}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                If the email is registered, you will receive instructions.
              </FormDescription>
              <FormMessage>{fieldErrors.email}</FormMessage>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? <Spinner /> : null}
            {isSubmitting ? "Sending…" : "Send recovery email"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
