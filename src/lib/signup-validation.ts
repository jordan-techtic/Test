import type { SignUpRequestBody } from '../types/api';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignUpFields(fields: SignUpRequestBody): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!fields.first_name.trim()) {
    errors.first_name = 'First name is required';
  }
  if (!fields.last_name.trim()) {
    errors.last_name = 'Last name is required';
  }
  if (!fields.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!fields.password) {
    errors.password = 'Password is required';
  } else if (fields.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  if (!fields.terms_accepted) {
    errors.terms_accepted = 'You must accept the terms to sign up';
  }

  return errors;
}
