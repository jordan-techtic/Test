import { useCallback, useState } from 'react';
import { ApiClientError } from '../../lib/apiClient';
import { postForgotPassword } from './forgotPasswordApi';
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

    try {
      await postForgotPassword({ email: email.trim() });
      setStatus('success');
      setStatusMessage('If an account exists for this email, a reset link has been sent.');
    } catch (error) {
      setStatus('error');
      if (error instanceof ApiClientError) {
        const details = error.body?.error.details;
        const emailDetail = details?.email?.[0];
        if (emailDetail) {
          setFieldErrors({ email: emailDetail });
          setStatusMessage(emailDetail);
          return;
        }
        setStatusMessage(error.message);
        return;
      }
      setStatusMessage('Unable to send reset link. Please try again.');
    }
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
