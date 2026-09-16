import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api/auth';
import type { LoginRequest } from '@/types/api';

export function useLoginMutation() {
  return useMutation({
    mutationFn: (body: LoginRequest) => login(body),
  });
}
