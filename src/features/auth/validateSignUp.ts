import { validateForgotPasswordEmail } from './validateForgotPasswordEmail';
import type { SignUpFieldErrors } from './signUpTypes';

export function validateSignUpFields(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}): SignUpFieldErrors {
  const errors: SignUpFieldErrors = {};

  if (input.firstName.trim().length === 0) {
    errors.first_name = 'First name is required.';
  }
  if (input.lastName.trim().length === 0) {
    errors.last_name = 'Last name is required.';
  }

  const emailError = validateForgotPasswordEmail(input.email);
  if (emailError) {
    errors.email = emailError;
  }

  if (input.password.length === 0) {
    errors.password = 'Password is required.';
  }

  if (!input.termsAccepted) {
    errors.terms_accepted = 'You must accept the terms to sign up.';
  }

  return errors;
}
