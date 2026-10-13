import Link from "next/link";

import {
  Boxes,
  CircleDollarSign,
  Package,
  PackageCheck,
  PackagePlus,
  TriangleAlert,
} from "lucide-react";

import ProductTable from "@/components/ProductTable";

import { Button } from "@/components/ui/button";

import { getProducts } from "@/lib/products";

const PAGE_SIZE = 10;

type ProductsPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { page } = await searchParams;
  const products = await getProducts();

  const totalProducts = products.length;
  const requestedPage = Number(Array.isArray(page) ? page[0] : page);
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));
  const currentPage = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages)
    : 1;
  const visibleProducts = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const activeProducts = products.filter(
    (product) =>
      product.status.toLowerCase() === "active",
  ).length;

  const totalStock = products.reduce(
    (total, product) =>
      total + product.stock,
    0,
  );

  const lowStockProducts = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= 10,
  ).length;

  const inventoryValue = products.reduce(
    (total, product) =>
      total +
      product.price *
        product.stock,
    0,
  );

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      description:
        "Products in your catalog",
      icon: Package,
    },
    {
      title: "Active Products",
      value: activeProducts,
      description:
        "Currently available",
      icon: PackageCheck,
    },
    {
      title: "Inventory Units",
      value: totalStock.toLocaleString(
        "en-US",
      ),
      description:
        "Total units in stock",
      icon: Boxes,
    },
    {
      title: "Low Stock",
      value: lowStockProducts,
      description:
        "Products with 10 units or less",
      icon: TriangleAlert,
    },
  ];

  return (
    <main className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-card">
        {/* Background Effects */}
        <div data-scroll-parallax="18" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div data-scroll-parallax="-12" className="pointer-events-none absolute -bottom-32 left-1/3 size-64 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative px-7 py-8 lg:px-9 lg:py-9">
          <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
            {/* Heading */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl border bg-background/70 shadow-sm backdrop-blur">
                  <Package className="size-4 text-primary" />
                </div>

                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Product Management
                </span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight">
                Products
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Monitor your catalog, pricing,
                inventory levels and product
                availability from one place.
              </p>
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              {/* Inventory Value */}
              <div className="min-w-64 rounded-2xl border bg-background/60 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <CircleDollarSign className="size-5 text-emerald-500" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Inventory value
                    </p>

                    <p className="mt-0.5 text-lg font-semibold tracking-tight">
                      {formatPrice(
                        inventoryValue,
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-px bg-border" />

                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    Total inventory
                  </span>

                  <span className="text-xs font-medium">
                    {totalStock.toLocaleString(
                      "en-US",
                    )}{" "}
                    units
                  </span>
                </div>
              </div>

              {/* Create Product */}
              <Button
                nativeButton={false}
                render={
                  <Link href="/dashboard/products/create" />
                }
                className="h-auto min-h-11 gap-2 px-5 sm:self-stretch"
              >
                <PackagePlus className="size-4" />

                Create Product
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              data-scroll-reveal="card"
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                bg-card
                p-5
                transition-all
                duration-300
                hover:border-foreground/15
                hover:shadow-lg
              "
            >
              <div data-scroll-parallax="14" className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/10" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>

                  <p className="mt-3 text-3xl font-semibold tracking-tight">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>

                <div className="flex size-10 items-center justify-center rounded-xl border bg-background shadow-sm">
                  <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Products */}
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              All Products
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              A complete overview of products
              currently available in your catalog.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />

            <span>
              {activeProducts} active
            </span>
          </div>
        </div>

        <ProductTable
          products={visibleProducts}
          pagination={{ currentPage, totalPages, totalItems: totalProducts, pageSize: PAGE_SIZE }}
        />
      </section>
    </main>
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
      maximumFractionDigits: 0,
    },
  ).format(price);
}
