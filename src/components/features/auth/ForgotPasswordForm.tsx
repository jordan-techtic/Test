import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { applyApiFieldErrors } from "@/lib/form-errors";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validation";

interface ForgotPasswordFormProps {
  onClose: () => void;
}

export function ForgotPasswordForm({ onClose }: ForgotPasswordFormProps) {
  const { submit, isLoading } = useForgotPassword();
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      await submit(values);
      form.reset();
      onClose();
    } catch (error) {
      applyApiFieldErrors(error, form.setError);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
            {isLoading ? "Sending…" : "Send reset link"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
