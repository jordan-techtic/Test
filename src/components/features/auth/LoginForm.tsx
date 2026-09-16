import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/Spinner";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { useLogin } from "@/hooks/useLogin";

const schema = z.object({
  email_or_username: z.string().trim().min(1, "Email or username is required."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof schema>;

interface LoginFormProps {
  onForgotPassword: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const { submit, isSubmitting, fieldErrors, formError } = useLogin();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email_or_username: "", password: "" },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => submit(values))}
        noValidate
      >
        {formError ? <ErrorMessage message={formError} /> : null}
        <FormField
          control={form.control}
          name="email_or_username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or username</FormLabel>
              <FormControl>
                <Input
                  autoComplete="username"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(fieldErrors.email_or_username)}
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldErrors.email_or_username}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="login-password">Password</Label>
              <PasswordInput
                id="login-password"
                autoComplete="current-password"
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.password)}
                {...field}
              />
              <FormMessage>{fieldErrors.password}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? <Spinner /> : null}
          {isSubmitting ? "Signing in…" : "Log in"}
        </Button>
        <div className="text-center">
          <button
            type="button"
            className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
        </div>
      </form>
    </Form>
  );
}
