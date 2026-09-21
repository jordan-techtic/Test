import { useState } from 'react';
import { toast } from 'sonner';
import { FaBeer } from 'react-icons/fa';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/ui/Spinner';
import { useExampleQuery } from '@/hooks/useExampleQuery';
import { getApiErrorMessage } from '@/lib/api/errors';

export default function Home() {
  const [resetOpen, setResetOpen] = useState(false);
  const exampleQuery = useExampleQuery();

  async function handleProbe() {
    try {
      await exampleQuery.run();
      toast.success('Example request completed.');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return (
    <div className="relative isolate flex w-full flex-col overflow-hidden gap-[var(--gap-24)] rounded-[var(--radius-16)] bg-background p-[var(--padding-24)] font-[family-name:var(--font-body)] text-[color:var(--color-text-primary)] bg-[image:radial-gradient(ellipse_70%_42%_at_18%_0%,var(--color-color-28)_0%,var(--color-background)_62%),linear-gradient(180deg,var(--color-color-28)_0%,var(--color-background)_100%)]">
      <header className="flex max-w-[1180px] flex-col gap-[var(--gap-12)]">
        <p className="font-[family-name:var(--font-body-sm-32),Almarai,sans-serif] text-[length:var(--fs-body-sm-32)] font-[number:var(--fw-body-sm-32)] leading-[var(--lh-body-sm-32)] tracking-[var(--ls-body-sm-32)] text-accent">
          Agentwise
        </p>
        <h1 className="m-0 font-[family-name:var(--font-heading-lg-19)] text-[length:var(--fs-heading-lg-19)] font-[number:var(--fw-heading-lg-19)] leading-[var(--lh-heading-lg-19)] text-[color:var(--color-text-primary)]">
          Home
        </h1>
        <p className="m-0 max-w-[465px] font-[family-name:var(--font-body)] text-[length:var(--fs-body)] font-[number:var(--fw-body)] leading-[var(--lh-body)] text-[color:var(--color-text-primary)]">
          Workspace shell, theme tokens, and API client are ready for product screens.
        </p>
        <p className="m-0 font-[family-name:var(--font-caption-4)] text-[length:var(--fs-caption-4)] font-[number:var(--fw-caption-4)] leading-[var(--lh-caption-4)] text-[color:var(--color-text-primary)]">
          GET /example · POST /auth/login
        </p>
      </header>

      <Card className="max-w-[1180px] border-border bg-card shadow-[var(--shadow-drop-shadow-37)]">
        <CardHeader className="flex flex-row items-center justify-between gap-[var(--gap-12)] p-[var(--padding-24)]">
          <div className="flex items-center gap-[var(--gap-12)]">
            <FaBeer className="h-5 w-5 text-accent" aria-hidden="true" />
            <CardTitle className="font-[family-name:var(--font-heading-lg-26)] text-[length:var(--fs-heading-lg-26)] font-[number:var(--fw-heading-lg-26)] leading-[var(--lh-heading-lg-26)] text-success">
              Example API probe
            </CardTitle>
          </div>
          <Badge className="border-[color:var(--color-color-13)] bg-[color:var(--color-info)] font-[family-name:var(--font-caption-4)] text-[color:var(--color-color-13)]">
            GET /example
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-[var(--gap-16)] px-[var(--padding-24)] pb-[var(--padding-24)] pt-0">
          <p className="m-0 font-[family-name:var(--font-body-sm-24)] text-[length:var(--fs-body-sm-24)] font-[number:var(--fw-body-sm-24)] leading-[var(--lh-body-sm-24)] text-[color:var(--color-color-15)]">
            Runs the axios client against GET /example. A live not-found response is expected until that route exists.
          </p>
          <div className="flex max-w-[465px] flex-wrap items-center gap-[var(--gap-10)]">
            <Button
              type="button"
              className="rounded-[var(--radius-10)] font-[family-name:var(--font-body)]"
              onClick={() => void handleProbe()}
              disabled={exampleQuery.status === 'loading'}
            >
              {exampleQuery.status === 'loading' ? 'Probing…' : 'Probe example endpoint'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-[var(--radius-10)] border-success font-[family-name:var(--font-body)] text-success"
              onClick={() => setResetOpen(true)}
            >
              Reset
            </Button>
            {exampleQuery.status === 'loading' ? <Spinner /> : null}
          </div>
          {exampleQuery.status === 'error' && exampleQuery.error ? (
            <ErrorMessage message={exampleQuery.error} onRetry={() => void handleProbe()} />
          ) : null}
          {exampleQuery.status === 'success' ? (
            <p className="m-0 font-[family-name:var(--font-body)] text-[length:var(--fs-body)] font-[number:var(--fw-body)] leading-[var(--lh-body-15)] text-success">
              Request finished without a thrown error.
            </p>
          ) : null}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={resetOpen}
        title="Reset probe?"
        description="This will clear the current example request result from the page. It does not change server data."
        confirmLabel="Reset"
        onOpenChange={setResetOpen}
        onConfirm={() => {
          exampleQuery.reset();
          setResetOpen(false);
          toast.success('Probe result cleared.');
        }}
      />
    </div>
  );
}
