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
import { PasswordInput } from "@/components/shared/PasswordInput";
import { useLogin } from "@/hooks/useLogin";
import { applyApiFieldErrors } from "@/lib/form-errors";
import { loginSchema, type LoginFormValues } from "@/lib/validation";

interface LoginFormProps {
  onForgotPassword: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const { submit, isLoading } = useLogin();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email_or_username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      await submit(values);
    } catch (error) {
      applyApiFieldErrors(error, form.setError);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email_or_username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or username</FormLabel>
              <FormControl>
                <Input autoComplete="username" placeholder="you@example.com" {...field} />
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
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-11 md:h-8"
            onClick={onForgotPassword}
          >
            Forgot password
          </Button>
        </div>
        <Button type="submit" className="h-11 w-full" disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? "Signing in" : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
