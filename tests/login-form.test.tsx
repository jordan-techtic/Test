import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { LoginForm } from '@/components/features/auth/LoginForm'
import { AuthProvider } from '@/stores/AuthContext'

vi.mock('@/hooks/useLogin', () => ({
  useLogin: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}))

function renderLoginForm() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <LoginForm onForgotPassword={vi.fn()} />
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('LoginForm', () => {
  it('renders email, password, and login controls', () => {
    renderLoginForm()

    expect(screen.getByLabelText('Email or Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Show password' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Forgot Password?' })).toBeInTheDocument()
  })

  it('toggles password visibility independently', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toHaveAttribute('type', 'password')

    await user.click(screen.getByRole('button', { name: 'Show password' }))
    expect(passwordInput).toHaveAttribute('type', 'text')

    await user.click(screen.getByRole('button', { name: 'Hide password' }))
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})
