import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiClientError } from '../../lib/apiClient';
import { postLogin } from './loginApi';
import { mapApiValidationErrors } from './mapApiValidationErrors';
import { setSession } from './sessionStorage';
import type { SignInFieldErrors } from './validateSignIn';
import { validateSignInFields } from './validateSignIn';

export type SignInStatus = 'idle' | 'submitting' | 'success' | 'error';

export function useSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<SignInFieldErrors>({});
  const [status, setStatus] = useState<SignInStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const submit = useCallback(async () => {
    const errors = validateSignInFields(email, password);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('error');
      setStatusMessage(Object.values(errors)[0] ?? 'Fix the highlighted fields.');
      return;
    }

    setFieldErrors({});
    setStatus('submitting');
    setStatusMessage('Signing in…');

    try {
      const response = await postLogin({ email: email.trim(), password });
      setSession(
        {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          tokenType: response.data.tokenType,
        },
        rememberMe,
      );
      setStatus('success');
      setStatusMessage('Signed in successfully.');
      navigate('/content-library', { replace: true });
    } catch (error) {
      const mapped = mapApiValidationErrors(error);
      if (error instanceof ApiClientError && (error.status === 401 || error.status === 403)) {
        mapped._form = mapped._form ?? 'Invalid email or password.';
      }
      setFieldErrors(mapped);
      setStatus('error');
      setStatusMessage(mapped._form ?? 'Sign in failed. Try again.');
    }
  }, [email, navigate, password, rememberMe]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    showPassword,
    setShowPassword,
    fieldErrors,
    status,
    statusMessage,
    submit,
  };
}
