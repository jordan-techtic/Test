import { validateForgotPasswordEmail } from './validateForgotPasswordEmail';

export type SignInFieldErrors = {
  email?: string;
  password?: string;
  _form?: string;
};

export function validateSignInFields(email: string, password: string): SignInFieldErrors {
  const errors: SignInFieldErrors = {};
  const emailError = validateForgotPasswordEmail(email);
  if (emailError) {
    errors.email = emailError;
  }
  if (password.length === 0) {
    errors.password = 'Password is required.';
  }
  return errors;
}
