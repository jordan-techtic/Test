import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc" | null;

export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessor: (row: T) => ReactNode;
  sortable?: boolean;
  hideable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  sortBy?: string | null;
  sortDirection?: SortDirection;
  onSortChange?: (columnId: string) => void;
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  hiddenColumns?: string[];
  onHiddenColumnsChange?: (hidden: string[]) => void;
  alwaysVisible?: string[];
  toolbar?: ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  getRowId,
  isLoading,
  error,
  onRetry,
  emptyTitle = "No results found.",
  emptyDescription,
  sortBy,
  sortDirection,
  onSortChange,
  page = 1,
  pageSize = 10,
  total,
  onPageChange,
  onPageSizeChange,
  hiddenColumns = [],
  onHiddenColumnsChange,
  alwaysVisible = ["actions"],
  toolbar,
}: DataTableProps<T>) {
  const visibleColumns = columns.filter((column) => !hiddenColumns.includes(column.id));
  const totalCount = total ?? data.length;
  const hideableColumns = columns.filter(
    (column) => column.hideable !== false && !alwaysVisible.includes(column.id) && column.id !== "actions",
  );

  const columnChooser = onHiddenColumnsChange ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        {hideableColumns.map((column) => {
          const checked = !hiddenColumns.includes(column.id);
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={checked}
              onCheckedChange={(next) => {
                if (next) {
                  onHiddenColumnsChange(hiddenColumns.filter((id) => id !== column.id));
                } else {
                  onHiddenColumnsChange([...hiddenColumns, column.id]);
                }
              }}
            >
              {column.header}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;

  return (
    <div className="rounded-md border bg-card">
      {toolbar || columnChooser ? (
        <div className="flex flex-wrap items-center gap-2 border-b p-3">
          {toolbar}
          {columnChooser ? <div className="ml-auto">{columnChooser}</div> : null}
        </div>
      ) : null}
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.map((column) => {
              const active = sortBy === column.id;
              const ariaSort = !column.sortable
                ? undefined
                : active && sortDirection === "asc"
                  ? "ascending"
                  : active && sortDirection === "desc"
                    ? "descending"
                    : "none";
              return (
                <TableHead key={column.id} className={column.className} aria-sort={ariaSort}>
                  {column.sortable && onSortChange ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={() => onSortChange(column.id)}
                    >
                      {column.header}
                      {!active || !sortDirection ? (
                        <ArrowUpDown className="size-3.5 text-muted-foreground" aria-hidden />
                      ) : sortDirection === "asc" ? (
                        <ArrowUp className="size-3.5" aria-hidden />
                      ) : (
                        <ArrowDown className="size-3.5" aria-hidden />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <TableRow key={`skeleton-${index}`}>
                {visibleColumns.map((column) => (
                  <TableCell key={column.id}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : error ? (
            <TableRow>
              <TableCell colSpan={visibleColumns.length}>
                <div className="flex flex-col items-center gap-2 py-8" role="alert">
                  <p className="text-sm text-destructive">{error}</p>
                  {onRetry ? (
                    <Button type="button" variant="outline" size="sm" onClick={onRetry}>
                      Retry
                    </Button>
                  ) : null}
                </div>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={visibleColumns.length}>
                <EmptyState title={emptyTitle} description={emptyDescription} />
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={getRowId(row)}>
                {visibleColumns.map((column) => (
                  <TableCell key={column.id} className={cn(column.className)}>
                    {column.accessor(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {onPageChange && onPageSizeChange ? (
        <Pagination
          page={page}
          pageSize={pageSize}
          total={totalCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      ) : null}
    </div>
  );
}
