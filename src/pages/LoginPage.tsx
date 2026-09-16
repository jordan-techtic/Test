import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { ForgotPasswordPanel } from '@/components/features/auth/ForgotPasswordPanel'
import { LoginForm } from '@/components/features/auth/LoginForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { useAuth } from '@/stores/AuthContext'

export function LoginPage() {
  const { isAuthenticated } = useAuth()
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img
            src="/brand-logo.svg"
            alt="Marketing Content Calendar"
            className="mx-auto mb-4 h-10 w-auto"
          />
          <h1 className="text-lg font-semibold leading-none tracking-tight">
            Sign In
          </h1>
          <CardDescription>
            {showForgotPassword
              ? 'Recover access to your marketing calendar account.'
              : 'Sign in to manage the marketing content calendar.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showForgotPassword ? (
            <ForgotPasswordPanel onBack={() => setShowForgotPassword(false)} />
          ) : (
            <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />
          )}
        </CardContent>
      </Card>
    </main>
  )
}
