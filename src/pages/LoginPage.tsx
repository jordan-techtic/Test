import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { ForgotPasswordPanel } from '@/components/features/auth/ForgotPasswordPanel'
import { LoginForm } from '@/components/features/auth/LoginForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/stores/AuthContext'

export function LoginPage() {
  const { isAuthenticated } = useAuth()
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/calendar" replace />
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img
            src="/brand-logo.png"
            alt="Marketing Content Calendar"
            className="mx-auto mb-4 h-10 w-auto"
          />
          <CardTitle>Sign In</CardTitle>
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
    </div>
  )
}
