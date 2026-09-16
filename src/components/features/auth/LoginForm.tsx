import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { useLogin } from '@/hooks/useLogin'
import { getApiErrorMessage } from '@/lib/api/errors'

interface LoginFormProps {
  onForgotPassword: () => void
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const loginMutation = useLogin()
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)

    if (!emailOrUsername.trim()) {
      setErrorMessage('Email or username is required.')
      return
    }
    if (!password) {
      setErrorMessage('Password is required.')
      return
    }

    try {
      await loginMutation.mutateAsync({
        email_or_username: emailOrUsername.trim(),
        password,
      })
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {errorMessage ? (
        <div
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email_or_username">Email or Username</Label>
        <Input
          id="email_or_username"
          name="email_or_username"
          autoComplete="username"
          value={emailOrUsername}
          onChange={(event) => setEmailOrUsername(event.target.value)}
          disabled={loginMutation.isPending}
          aria-invalid={Boolean(errorMessage)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loginMutation.isPending}
          aria-invalid={Boolean(errorMessage)}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          onClick={onForgotPassword}
        >
          Forgot Password?
        </button>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loginMutation.isPending}
        aria-busy={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          'Login'
        )}
      </Button>
    </form>
  )
}
