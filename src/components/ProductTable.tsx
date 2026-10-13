import Link from "next/link";

import {
  Boxes,
  Package,
  PackageCheck,
  PackageX,
  Tag,
} from "lucide-react";

import type {
  Product,
} from "@/types/product";

import DataTable, {
  type DataTableColumn,
} from "@/components/DataTable";

import {
  Badge,
} from "@/components/ui/badge";

type ProductTableProps = {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  };
};

export default function ProductTable({
  products,
  pagination,
}: ProductTableProps) {
  const columns: DataTableColumn<Product>[] = [
    {
      id: "product",
      header: "Product",
      headerClassName:
        "min-w-72 pl-6",
      cellClassName:
        "pl-6",

      cell: (product) => (
        <ProductCell
          product={
            product
          }
        />
      ),
    },

    {
      id: "category",
      header: "Category",
      headerClassName:
        "min-w-36",

      cell: (product) => (
        <Badge
          variant="outline"
          className="gap-1.5 bg-muted/30"
        >
          <Tag className="size-3" />

          {
            product.category
          }
        </Badge>
      ),
    },

    {
      id: "price",
      header: "Price",
      headerClassName:
        "min-w-36",

      cell: (product) => (
        <div>
          <p className="text-sm font-semibold tabular-nums">
            {formatPrice(
              product.price,
            )}
          </p>

          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Unit price
          </p>
        </div>
      ),
    },

    {
      id: "stock",
      header: "Stock",
      headerClassName:
        "min-w-40",

      cell: (product) => (
        <StockIndicator
          stock={
            product.stock
          }
        />
      ),
    },

    {
      id: "status",
      header: "Status",
      headerClassName:
        "min-w-32",

      cell: (product) => (
        <ProductStatusBadge
          status={
            product.status
          }
        />
      ),
    },

    {
      id: "actions",
      header: "Actions",
      headerClassName:
        "w-20 pr-6 text-right",
      cellClassName:
        "pr-6 text-right",

      cell: (product) => (
        <Link
          href={`/dashboard/products/${product.id}`}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b px-6 py-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-sm font-semibold">
            Product Directory
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Manage products, pricing, inventory and availability.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5">
          <Package className="size-3.5 text-muted-foreground" />

          <span className="text-xs font-medium text-muted-foreground">
            {
              pagination.totalItems
            }{" "}
            products
          </span>
        </div>
      </div>

      <DataTable
        data={
          products
        }
        columns={
          columns
        }
        getRowKey={(
          product,
        ) =>
          product.id
        }
        rowClassName="group h-18 transition-colors duration-200 hover:bg-muted/25"
        emptyState={
          <EmptyProducts />
        }
        footer={
          <div className="flex flex-col gap-3 border-t bg-muted/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {pagination.totalItems === 0
                  ? "0"
                  : `${(pagination.currentPage - 1) * pagination.pageSize + 1}–${(pagination.currentPage - 1) * pagination.pageSize + products.length}`}
              </span>{" "}
              of {pagination.totalItems} products
            </p>

            <ProductPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          </div>
        }
      />
    </div>
  );
}

function ProductCell({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="flex items-center gap-3.5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-muted/30 shadow-sm">
        <Package className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>

      <div className="min-w-0">
        <Link
          href={`/dashboard/products/${product.id}`}
          className="truncate text-sm font-medium transition-colors hover:text-primary"
        >
          {
            product.name
          }
        </Link>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Product #
          {String(
            product.id,
          ).padStart(
            4,
            "0",
          )}
        </p>
      </div>
    </div>
  );
}

function StockIndicator({
  stock,
}: {
  stock: number;
}) {
  if (stock === 0) {
    return (
      <div className="flex items-center gap-2">
        <PackageX className="size-4 text-destructive" />

        <span className="text-sm font-medium text-destructive">
          Out of stock
        </span>
      </div>
    );
  }

  if (stock <= 10) {
    return (
      <div className="flex items-center gap-2">
        <Boxes className="size-4 text-amber-500" />

        <span className="text-sm font-medium text-amber-500">
          {stock} units
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <PackageCheck className="size-4 text-emerald-500" />

      <span className="text-sm">
        {stock} units
      </span>
    </div>
  );
}

function ProductStatusBadge({
  status,
}: {
  status: string;
}) {
  const active =
    status.toLowerCase() ===
    "active";

  return (
    <Badge
      variant="outline"
      className={
        active
          ? "gap-2 border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-500"
          : "gap-2 border-border bg-muted px-2.5 py-1 text-muted-foreground"
      }
    >
      <span
        className={
          active
            ? "size-1.5 rounded-full bg-emerald-500"
            : "size-1.5 rounded-full bg-muted-foreground"
        }
      />

      {
        status
      }
    </Badge>
  );
}

function EmptyProducts() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl border bg-muted/50">
        <Package className="size-5 text-muted-foreground" />
      </div>

      <p className="mt-4 text-sm font-medium">
        No products found
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        Products will appear here once they are added.
      </p>
    </div>
  );
}

function ProductPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Product pagination" className="flex items-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={`?page=${currentPage - 1}`}
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Previous
        </Link>
      ) : (
        <span className="text-xs text-muted-foreground/50">Previous</span>
      )}

      <span className="text-xs text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={`?page=${currentPage + 1}`}
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Next
        </Link>
      ) : (
        <span className="text-xs text-muted-foreground/50">Next</span>
      )}
    </nav>
  );
}

function formatPrice(
  price: number,
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    },
  ).format(price);
}
