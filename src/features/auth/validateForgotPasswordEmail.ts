const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateForgotPasswordEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (trimmed.length === 0) {
    return 'Email is required.';
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return 'Enter a valid email address.';
  }
  return undefined;
}
