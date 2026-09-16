import { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForgotPasswordMutation } from '@/hooks/useForgotPasswordMutation';
import { getApiErrorMessage, parseApiFieldErrors } from '@/lib/api/errors';

interface ForgotPasswordPanelProps {
  onCancel: () => void;
}

export function ForgotPasswordPanel({ onCancel }: ForgotPasswordPanelProps) {
  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const forgotMutation = useForgotPasswordMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});

    if (!email.trim()) {
      setFieldErrors({ email: 'Email is required.' });
      return;
    }

    try {
      const response = await forgotMutation.mutateAsync({ email: email.trim() });
      toast.info(response.message || 'If an account exists, a recovery email has been sent.');
      onCancel();
    } catch (error) {
      setFieldErrors(parseApiFieldErrors(error));
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border-t border-border pt-4">
      <div className="space-y-2">
        <Label htmlFor="forgot-email">Email</Label>
        <Input
          id="forgot-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
        />
        {fieldErrors.email && (
          <p className="text-sm text-destructive" role="alert">
            {fieldErrors.email}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={forgotMutation.isPending} aria-busy={forgotMutation.isPending}>
          {forgotMutation.isPending ? 'Sending…' : 'Send recovery email'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
