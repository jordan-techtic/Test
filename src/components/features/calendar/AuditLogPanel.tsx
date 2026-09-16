import { format } from "date-fns";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuditLog } from "@/hooks/useAuditLog";
import { parseDateKey } from "@/lib/dates";

function formatTimestamp(value: string | null): string {
  if (!value) {
    return "";
  }
  try {
    if (value.length <= 10) {
      return format(parseDateKey(value), "PP");
    }
    return format(new Date(value), "PPp");
  } catch {
    return value;
  }
}

function formatChangeValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "—";
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return "—";
  }
}

function pageNumbers(current: number, totalPages: number): number[] {
  const pages: number[] = [];
  const start = Math.max(1, current - 2);
  const end = Math.min(totalPages, start + 4);
  for (let page = Math.max(1, end - 4); page <= end; page += 1) {
    pages.push(page);
  }
  return pages;
}

export function AuditLogPanel() {
  const { items, page, limit, total, isLoading, error, setPage, refetch } = useAuditLog();
  const pageCount = Math.max(1, Math.ceil(total / limit));
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Audit log</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : null}
        {error ? <ErrorMessage message={error} onRetry={() => void refetch()} /> : null}
        {!isLoading && !error && items.length === 0 ? (
          <EmptyState title="No changes recorded" />
        ) : null}
        {!isLoading && !error && items.length > 0 ? (
          <>
            <ScrollArea className="h-[320px] pr-3">
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="rounded-md border p-3">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    {item.title ? (
                      <p className="text-xs text-muted-foreground">{item.title}</p>
                    ) : null}
                    {item.changes && Object.keys(item.changes).length > 0 ? (
                      <dl className="mt-2 space-y-1">
                        {Object.entries(item.changes).map(([field, value]) => (
                          <div key={field} className="flex gap-2 text-xs">
                            <dt className="font-medium text-foreground">{field}</dt>
                            <dd className="text-muted-foreground">{formatChangeValue(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                    {item.created_at ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatTimestamp(item.created_at)}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
              <p>
                {start}–{end} of {total}
              </p>
              <div className="flex flex-wrap items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                {pageNumbers(page, pageCount).map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    type="button"
                    variant={pageNumber === page ? "default" : "outline"}
                    size="sm"
                    aria-current={pageNumber === page ? "page" : undefined}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page >= pageCount}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
