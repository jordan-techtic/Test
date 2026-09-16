import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/lib/api/auth';
import type { ForgotPasswordRequest } from '@/types/api';

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (body: ForgotPasswordRequest) => forgotPassword(body),
  });
}
