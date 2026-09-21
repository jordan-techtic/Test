import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { FaBeer } from 'react-icons/fa';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/ui/Spinner';
import { useExampleQuery } from '@/hooks/useExampleQuery';
import { getApiErrorMessage } from '@/lib/api/errors';

type WiredEndpoint = {
  id: string;
  method: string;
  path: string;
  purpose: string;
};

const WIRED_ENDPOINTS: WiredEndpoint[] = [
  {
    id: 'example',
    method: 'GET',
    path: '/example',
    purpose: 'Example client probe (live API currently returns not found)',
  },
  {
    id: 'login',
    method: 'POST',
    path: '/auth/login',
    purpose: 'Authenticate a user and issue a bearer token',
  },
];

const columns: DataTableColumn<WiredEndpoint>[] = [
  { id: 'method', header: 'Method', accessor: (row) => row.method },
  { id: 'path', header: 'Path', accessor: (row) => row.path },
  { id: 'purpose', header: 'Purpose', accessor: (row) => row.purpose },
];

const homeCtaClassName =
  'bg-[#c8a47e] text-[#0b0b0b] hover:opacity-90 font-almarai font-semibold rounded-[10px]';
const homeOutlineClassName =
  'border-[#e0e0e0] bg-transparent text-[#e0e0e0] hover:bg-[#ffffff19] font-almarai rounded-[10px]';
const homeInputClassName =
  'bg-[#14100d] text-[#e0e0e0] border-[#e0e0e0] placeholder:text-[#959595] font-almarai';

export default function Home() {
  const [search, setSearch] = useState('');
  const [resetOpen, setResetOpen] = useState(false);
  const exampleQuery = useExampleQuery();

  const rows = useMemo(() => WIRED_ENDPOINTS, []);

  async function handleProbe() {
    try {
      await exampleQuery.run();
      toast.success('Example request completed.');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return (
    <div
      className="relative isolate flex w-full flex-col gap-[24px] overflow-hidden rounded-[16px] bg-[#000000] px-[24px] py-[24px] font-almarai text-[#e0e0e0]"
      style={{
        fontFamily: "'Almarai', sans-serif",
        backgroundImage:
          'radial-gradient(ellipse 70% 42% at 18% 0%, #c8a47e33 0%, #0b0b0b00 62%), linear-gradient(180deg, #c8a47e33 0%, #62503d00 100%)',
      }}
    >
      <header className="flex max-w-[1180px] flex-col gap-[12px]">
        <p
          className="font-fellix text-[15px] font-semibold leading-[20px] tracking-[0.225px] text-[#c8a47e]"
          style={{ fontFamily: "'Fellix', 'Almarai', sans-serif" }}
        >
          Agentwise
        </p>
        <h1
          className="font-eb-garamond text-[30px] font-medium leading-[39.14999771118164px] text-[#e0e0e0]"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          Home
        </h1>
        <p
          className="max-w-[465px] font-almarai text-[16px] font-normal leading-[17.856000900268555px] text-[#959595]"
          style={{ fontFamily: "'Almarai', sans-serif" }}
        >
          Workspace shell, theme tokens, and API client are ready for product screens.
        </p>
        <p
          className="font-public-sans text-[12px] font-normal leading-[18px] text-[#919eab]"
          style={{ fontFamily: "'Public Sans', sans-serif" }}
        >
          GET /example · POST /auth/login
        </p>
      </header>

      <Card className="max-w-[1180px] border-[#e0e0e0]/20 bg-[#14100d] shadow-[0_4px_34px_#c8a47e33]">
        <CardHeader className="flex flex-row items-center justify-between gap-[12px] p-[24px]">
          <div className="flex items-center gap-[12px]">
            <FaBeer className="h-5 w-5 text-[#c8a47e]" aria-hidden="true" />
            <CardTitle
              className="font-eb-garamond text-[24px] font-semibold leading-[31.32px] text-[#e0e0e0]"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Example API probe
            </CardTitle>
          </div>
          <Badge className="border-[#1877f2]/40 bg-[#1877f2]/15 font-public-sans text-[#1877f2]">
            GET /example
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-[16px] p-[24px] pt-0">
          <p
            className="font-almarai text-[14px] font-normal leading-[22px] text-[#959595]"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            Runs the axios client against GET /example. A live not-found response is expected until that route exists.
          </p>
          <div className="flex max-w-[465px] flex-wrap items-center gap-[10px]">
            <Button
              type="button"
              className={homeCtaClassName}
              onClick={() => void handleProbe()}
              disabled={exampleQuery.status === 'loading'}
            >
              {exampleQuery.status === 'loading' ? 'Probing…' : 'Probe example endpoint'}
            </Button>
            <Button type="button" variant="outline" className={homeOutlineClassName} onClick={() => setResetOpen(true)}>
              Reset
            </Button>
            {exampleQuery.status === 'loading' ? <Spinner /> : null}
          </div>
          {exampleQuery.status === 'error' && exampleQuery.error ? (
            <ErrorMessage message={exampleQuery.error} onRetry={() => void handleProbe()} />
          ) : null}
          {exampleQuery.status === 'success' ? (
            <p className="font-almarai text-[16px] leading-[22px] text-[#e0e0e0]">
              Request finished without a thrown error.
            </p>
          ) : null}
        </CardContent>
      </Card>

      <div className="w-full max-w-[1180px]">
        <DataTable
          columns={columns}
          data={rows}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search endpoints"
          searchInputClassName={homeInputClassName}
          getRowId={(row) => row.id}
          emptyTitle="No endpoints match your search."
          emptyDescription="Clear the search to see wired API paths."
        />
      </div>

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
