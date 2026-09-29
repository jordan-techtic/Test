import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiClientError } from '../../lib/apiClient';
import { mapApiValidationErrors } from './mapApiValidationErrors';
import { postSignUp } from './signUpApi';
import type { SignUpFieldErrors } from './signUpTypes';
import { validateSignUpFields } from './validateSignUp';

export type SignUpStatus = 'idle' | 'submitting' | 'success' | 'error';

export function useSignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<SignUpFieldErrors>({});
  const [status, setStatus] = useState<SignUpStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const submit = useCallback(async () => {
    const errors = validateSignUpFields({
      firstName,
      lastName,
      email,
      password,
      termsAccepted,
    });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('error');
      setStatusMessage(Object.values(errors)[0] ?? 'Fix the highlighted fields.');
      return;
    }

    setFieldErrors({});
    setStatus('submitting');
    setStatusMessage('Creating your account…');

    try {
      await postSignUp({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password,
        terms_accepted: true,
      });
      setStatus('success');
      setStatusMessage('Account created. Redirecting to sign in.');
      navigate('/sign-in', { replace: true });
    } catch (error) {
      const mapped = mapApiValidationErrors(error);
      if (error instanceof ApiClientError && error.status === 409) {
        mapped.email = mapped.email ?? 'This email is already in use.';
      }
      setFieldErrors(mapped);
      setStatus('error');
      setStatusMessage(mapped._form ?? mapped.email ?? 'Sign up failed. Try again.');
    }
  }, [email, firstName, lastName, navigate, password, termsAccepted]);

  const canSubmit = termsAccepted && status !== 'submitting';

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    termsAccepted,
    setTermsAccepted,
    showPassword,
    setShowPassword,
    fieldErrors,
    status,
    statusMessage,
    submit,
    canSubmit,
  };
}
