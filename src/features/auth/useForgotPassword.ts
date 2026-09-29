import { useCallback, useState } from 'react';
import type { ForgotPasswordFieldErrors } from './types';
import { validateForgotPasswordEmail } from './validateForgotPasswordEmail';

export type ForgotPasswordStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface UseForgotPasswordResult {
  email: string;
  setEmail: (value: string) => void;
  fieldErrors: ForgotPasswordFieldErrors;
  status: ForgotPasswordStatus;
  statusMessage: string;
  submit: () => Promise<void>;
}

export function useForgotPassword(): UseForgotPasswordResult {
  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<ForgotPasswordFieldErrors>({});
  const [status, setStatus] = useState<ForgotPasswordStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const submit = useCallback(async () => {
    const emailError = validateForgotPasswordEmail(email);
    if (emailError) {
      setFieldErrors({ email: emailError });
      setStatus('error');
      setStatusMessage(emailError);
      return;
    }

    setFieldErrors({});
    setStatus('submitting');
    setStatusMessage('Sending reset link…');

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 800);
    });

    setStatus('success');
    setStatusMessage('Reset link request received.');
  }, [email]);

  return {
    email,
    setEmail,
    fieldErrors,
    status,
    statusMessage,
    submit,
  };
}
