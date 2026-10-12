import Link from "next/link";

import type {
  ReactNode,
} from "react";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type SortOrder =
  | "asc"
  | "desc";

export type DataTableColumn<
  TData,
  TSort extends string = string,
> = {
  id: string;

  header: string;

  cell: (
    item: TData,
  ) => ReactNode;

  sortKey?: TSort;

  headerClassName?: string;

  cellClassName?: string;
};

type DataTableProps<
  TData,
  TSort extends string = string,
> = {
  data: TData[];

  columns: DataTableColumn<
    TData,
    TSort
  >[];

  getRowKey: (
    item: TData,
  ) => string | number;

  currentSort?: TSort;

  currentOrder?: SortOrder;

  getSortHref?: (
    sortKey: TSort,
    order: SortOrder,
  ) => string;

  emptyState?: ReactNode;

  footer?: ReactNode;

  rowClassName?:
    | string
    | ((
        item: TData,
      ) => string);
};

export default function DataTable<
  TData,
  TSort extends string = string,
>({
  data,
  columns,
  getRowKey,
  currentSort,
  currentOrder = "asc",
  getSortHref,
  emptyState,
  footer,
  rowClassName,
}: DataTableProps<
  TData,
  TSort
>) {
  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-muted/30 hover:bg-muted/30">
              {columns.map(
                (column) => (
                  <DataTableHead
                    key={
                      column.id
                    }
                    column={
                      column
                    }
                    currentSort={
                      currentSort
                    }
                    currentOrder={
                      currentOrder
                    }
                    getSortHref={
                      getSortHref
                    }
                  />
                ),
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map(
                (item) => (
                  <TableRow
                    key={getRowKey(
                      item,
                    )}
                    className={
                      typeof rowClassName ===
                      "function"
                        ? rowClassName(
                            item,
                          )
                        : rowClassName
                    }
                  >
                    {columns.map(
                      (
                        column,
                      ) => (
                        <TableCell
                          key={
                            column.id
                          }
                          className={
                            column.cellClassName
                          }
                        >
                          {column.cell(
                            item,
                          )}
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                ),
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length
                  }
                  className="p-0"
                >
                  {emptyState ??
                    null}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {footer}
    </div>
  );
}

function DataTableHead<
  TData,
  TSort extends string,
>({
  column,
  currentSort,
  currentOrder,
  getSortHref,
}: {
  column: DataTableColumn<
    TData,
    TSort
  >;

  currentSort?: TSort;

  currentOrder: SortOrder;

  getSortHref?: (
    sortKey: TSort,
    order: SortOrder,
  ) => string;
}) {
  const sortable =
    Boolean(
      column.sortKey &&
        getSortHref,
    );

  const isActive =
    column.sortKey ===
    currentSort;

  const nextOrder: SortOrder =
    isActive &&
    currentOrder === "asc"
      ? "desc"
      : "asc";

  return (
    <TableHead
      className={`
        h-12
        text-xs
        font-medium
        uppercase
        tracking-wider
        text-muted-foreground
        ${column.headerClassName ?? ""}
      `}
    >
      {sortable &&
      column.sortKey ? (
        <Link
          href={getSortHref!(
            column.sortKey,
            nextOrder,
          )}
          scroll={false}
          className="
            inline-flex
            items-center
            gap-1.5
            transition-colors
            hover:text-foreground
          "
        >
          {column.header}

          {!isActive && (
            <ArrowUpDown className="size-3.5 opacity-40" />
          )}

          {isActive &&
            currentOrder ===
              "asc" && (
              <ArrowUp className="size-3.5 text-foreground" />
            )}

          {isActive &&
            currentOrder ===
              "desc" && (
              <ArrowDown className="size-3.5 text-foreground" />
            )}
        </Link>
      ) : (
        column.header
      )}
    </TableHead>
  );
}