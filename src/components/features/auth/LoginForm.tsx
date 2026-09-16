import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { useLogin } from "@/hooks/useLogin";

const schema = z.object({
  email_or_username: z.string().min(1, "Email or username is required."),
  password: z.string().min(1, "Password is required."),
});

type LoginValues = z.infer<typeof schema>;

interface LoginFormProps {
  onForgotPassword: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const { submit, isPending, error } = useLogin();
  const form = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email_or_username: "", password: "" },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(async (values) => {
          const result = await submit(values);
          if (result && !result.ok) {
            for (const [field, message] of Object.entries(result.fieldErrors)) {
              if (field === "email_or_username" || field === "password") {
                form.setError(field, { message });
              }
            }
          }
        })}
        noValidate
      >
        {error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}
        <FormField
          control={form.control}
          name="email_or_username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or username</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending} aria-busy={isPending}>
          {isPending ? "Signing in…" : "Log in"}
        </Button>
        <Button type="button" variant="link" className="h-auto px-0" onClick={onForgotPassword}>
          Forgot password?
        </Button>
      </form>
    </Form>
  );
}
