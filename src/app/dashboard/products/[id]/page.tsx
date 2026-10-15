import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  ArrowLeft,
  Boxes,
  CircleDollarSign,
  Package,
  Pencil,
  Tag,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  getProductById,
} from "@/lib/products";

type ProductDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } =
    await params;

  const product =
    await getProductById(
      id,
    );

  if (!product) {
    notFound();
  }

  const isActive =
    product.status.toLowerCase() ===
    "active";

  return (
    <main className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          nativeButton={false}
          render={
            <Link href="/dashboard/products" />
          }
          className="-ml-3 text-muted-foreground"
        >
          <ArrowLeft className="size-4" />

          Back to products
        </Button>

        <Button
          nativeButton={false}
          render={
            <Link
              href={`/dashboard/products/${product.id}/edit`}
            />
          }
        >
          <Pencil className="size-4" />

          Edit Product
        </Button>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-card">
        <div data-scroll-parallax="18" className="pointer-events-none absolute -right-24 -top-32 size-80 rounded-full bg-primary/10 blur-3xl" />

        <div data-scroll-parallax="-12" className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative p-7 md:p-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex items-center gap-5">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-3xl border bg-background/70 shadow-lg backdrop-blur">
                <Package className="size-8 text-primary" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Product #{String(
                    product.id,
                  ).padStart(
                    4,
                    "0",
                  )}
                </p>

                <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                  {
                    product.name
                  }
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <StatusBadge
                    status={
                      product.status
                    }
                  />

                  <Badge
                    variant="outline"
                    className="gap-1.5 bg-background/50"
                  >
                    <Tag className="size-3" />

                    {
                      product.category
                    }
                  </Badge>
                </div>
              </div>
            </div>

            <div className="min-w-64 rounded-2xl border bg-background/60 p-4 shadow-sm backdrop-blur">
              <p className="text-xs text-muted-foreground">
                Current price
              </p>

              <p className="mt-1 text-2xl font-semibold tracking-tight">
                {formatPrice(
                  product.price,
                )}
              </p>

              <div className="my-4 h-px bg-border" />

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Availability
                </span>

                <span
                  className={
                    isActive
                      ? "text-xs font-medium text-emerald-500"
                      : "text-xs font-medium text-muted-foreground"
                  }
                >
                  {
                    product.status
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          icon={
            CircleDollarSign
          }
          label="Price"
          value={formatPrice(
            product.price,
          )}
          description="Current unit price"
        />

        <InfoCard
          icon={Boxes}
          label="Stock"
          value={`${product.stock} units`}
          description={
            getStockDescription(
              product.stock,
            )
          }
        />

        <InfoCard
          icon={Tag}
          label="Category"
          value={
            product.category
          }
          description="Catalog classification"
        />

        <InfoCard
          icon={Package}
          label="Status"
          value={
            product.status
          }
          description="Current availability"
        />
      </section>

      {/* Details */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="border-b px-6 py-5">
            <h2 className="text-sm font-semibold">
              Product Information
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Core information associated with this product.
            </p>
          </div>

          <div className="divide-y">
            <DetailRow
              label="Product ID"
              value={`#${String(
                product.id,
              ).padStart(
                4,
                "0",
              )}`}
            />

            <DetailRow
              label="Product Name"
              value={
                product.name
              }
            />

            <DetailRow
              label="Category"
              value={
                product.category
              }
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="border-b px-6 py-5">
            <h2 className="text-sm font-semibold">
              Inventory & Pricing
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Current commercial and inventory information.
            </p>
          </div>

          <div className="divide-y">
            <DetailRow
              label="Price"
              value={formatPrice(
                product.price,
              )}
            />

            <DetailRow
              label="Stock"
              value={`${product.stock} units`}
            />

            <DetailRow
              label="Status"
              value={
                product.status
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
}

type IconType =
  typeof Package;

function InfoCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: IconType;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            {label}
          </p>

          <p className="mt-2 text-lg font-semibold tracking-tight">
            {value}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {
              description
            }
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-xl border bg-background shadow-sm">
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 px-6 py-4">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span className="text-right text-sm font-medium">
        {value}
      </span>
    </div>
  );
}

function StatusBadge({
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
          ? "gap-2 border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
          : "gap-2 bg-muted text-muted-foreground"
      }
    >
      <span
        className={
          active
            ? "size-1.5 rounded-full bg-emerald-500"
            : "size-1.5 rounded-full bg-muted-foreground"
        }
      />

      {status}
    </Badge>
  );
}

function getStockDescription(
  stock: number,
) {
  if (stock === 0) {
    return "Out of stock";
  }

  if (stock <= 10) {
    return "Low inventory";
  }

  return "Healthy inventory";
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
