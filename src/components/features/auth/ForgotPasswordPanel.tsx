import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForgotPassword } from '@/hooks/useForgotPassword'
import { getApiErrorMessage } from '@/lib/api/errors'

interface ForgotPasswordPanelProps {
  onBack: () => void
}

export function ForgotPasswordPanel({ onBack }: ForgotPasswordPanelProps) {
  const forgotMutation = useForgotPassword()
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)

    if (!email.trim()) {
      setErrorMessage('Email is required.')
      return
    }

    try {
      await forgotMutation.mutateAsync({ email: email.trim() })
      onBack()
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <p className="text-sm text-muted-foreground">
        Enter your email address and we will send recovery instructions if an
        account exists.
      </p>

      {errorMessage ? (
        <div
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="forgot_email">Email</Label>
        <Input
          id="forgot_email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={forgotMutation.isPending}
          aria-invalid={Boolean(errorMessage)}
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={forgotMutation.isPending}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={forgotMutation.isPending}
          aria-busy={forgotMutation.isPending}
        >
          {forgotMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Send Recovery Email'
          )}
        </Button>
      </div>
    </form>
  )
}
