import type { LoginRequestBody } from '../types/api';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginFields(fields: LoginRequestBody): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!fields.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!fields.password) {
    errors.password = 'Password is required';
  }

  return errors;
}
