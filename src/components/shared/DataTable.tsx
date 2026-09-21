import { useMemo, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { cn } from '@/lib/utils';

export type DataTableColumn<T> = {
  id: string;
  header: string;
  accessor: (row: T) => string | number;
  sortable?: boolean;
  className?: string;
};

type SortState = {
  id: string;
  direction: 'asc' | 'desc';
} | null;

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  toolbar?: ReactNode;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  getRowId: (row: T) => string;
  searchInputClassName?: string;
};

function compareValues(a: string | number, b: string | number): number {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

export function DataTable<T>({
  columns,
  data,
  searchPlaceholder = 'Search',
  searchValue,
  onSearchChange,
  toolbar,
  isLoading = false,
  error = null,
  onRetry,
  emptyTitle = 'No results found.',
  emptyDescription = 'Try adjusting your search.',
  getRowId,
  searchInputClassName,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) {
      return data;
    }
    return data.filter((row) =>
      columns.some((column) => String(column.accessor(row)).toLowerCase().includes(query)),
    );
  }, [columns, data, searchValue]);

  const sorted = useMemo(() => {
    if (!sort) {
      return filtered;
    }
    const column = columns.find((item) => item.id === sort.id);
    if (!column) {
      return filtered;
    }
    const copy = [...filtered];
    copy.sort((left, right) => {
      const result = compareValues(column.accessor(left), column.accessor(right));
      return sort.direction === 'asc' ? result : -result;
    });
    return copy;
  }, [columns, filtered, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const pageRows = sorted.slice(start, start + pageSize);

  function cycleSort(columnId: string) {
    setSort((current) => {
      if (!current || current.id !== columnId) {
        return { id: columnId, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { id: columnId, direction: 'desc' };
      }
      return null;
    });
  }

  function ariaSort(columnId: string): 'none' | 'ascending' | 'descending' {
    if (!sort || sort.id !== columnId) {
      return 'none';
    }
    return sort.direction === 'asc' ? 'ascending' : 'descending';
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          value={searchValue}
          onChange={(event) => {
            onSearchChange(event.target.value);
            setPage(1);
          }}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className={cn('h-8 w-[284px] max-w-full', searchInputClassName)}
        />
        {toolbar}
      </div>

      <div className="w-full overflow-hidden rounded-[10px] border border-border/20">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className={column.className} aria-sort={ariaSort(column.id)}>
                  {column.sortable === false ? (
                    column.header
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground"
                      onClick={() => cycleSort(column.id)}
                    >
                      {column.header}
                      {ariaSort(column.id) === 'none' ? (
                        <ArrowUpDown className="h-3.5 w-3.5 opacity-70" />
                      ) : ariaSort(column.id) === 'ascending' ? (
                        <ArrowUp className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowDown className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${String(index)}`}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <ErrorMessage message={error} onRetry={onRetry} />
                </TableCell>
              </TableRow>
            ) : pageRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map((row) => (
                <TableRow key={getRowId(row)}>
                  {columns.map((column) => (
                    <TableCell key={column.id} className={column.className}>
                      {column.accessor(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {sorted.length === 0
            ? '0 results'
            : `${String(start + 1)}–${String(Math.min(start + pageSize, sorted.length))} of ${String(sorted.length)}`}
        </p>
        <div className="flex items-center gap-3">
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[92px]" aria-label="Rows per page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <Pagination>
            <PaginationContent>
              {Array.from({ length: pageCount }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <Button
                      type="button"
                      size="icon"
                      variant={pageNumber === currentPage ? 'default' : 'ghost'}
                      aria-label={`Page ${String(pageNumber)}`}
                      aria-current={pageNumber === currentPage ? 'page' : undefined}
                      className={cn(pageNumber === currentPage && 'rounded-[10px]')}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  </PaginationItem>
                );
              })}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
