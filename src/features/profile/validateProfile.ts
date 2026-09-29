import { validateForgotPasswordEmail } from '../auth/validateForgotPasswordEmail';
import type { ProfileFieldErrors, ProfileUpdateRequest } from './profileTypes';

export function validateProfileFields(input: ProfileUpdateRequest): ProfileFieldErrors {
  const errors: ProfileFieldErrors = {};
  if (input.first_name.trim().length === 0) {
    errors.first_name = 'First name is required.';
  }
  if (input.last_name.trim().length === 0) {
    errors.last_name = 'Last name is required.';
  }
  const emailError = validateForgotPasswordEmail(input.email);
  if (emailError) {
    errors.email = emailError;
  }
  return errors;
}
