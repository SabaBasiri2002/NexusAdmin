import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  ArrowLeft,
  BadgeCheck,
  Boxes,
  CircleDollarSign,
  Pencil,
  Tag,
} from "lucide-react";

import ProductForm from "@/components/ProductForm";

import {
  Button,
} from "@/components/ui/button";

import {
  getProductById,
} from "@/lib/products";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } =
    await params;

  const product =
    await getProductById(
      id,
    );

  if (!product) {
    notFound();
  }

  return (
    <main className="space-y-6">
      {/* Top */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          nativeButton={false}
          render={
            <Link
              href={`/dashboard/products/${product.id}`}
            />
          }
          className="-ml-3 text-muted-foreground"
        >
          <ArrowLeft className="size-4" />

          Back to product
        </Button>

        <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
          <span>
            Products
          </span>

          <span>/</span>

          <span>
            {product.name}
          </span>

          <span>/</span>

          <span className="font-medium text-foreground">
            Edit
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-card">
        <div data-scroll-parallax="18" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative px-7 py-8 lg:px-9 lg:py-9">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border bg-background/70 shadow-sm">
              <Pencil className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Product Management
              </p>

              <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                Edit Product
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Update {product.name}&apos;s pricing, inventory, category and
                availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <ProductForm
          mode="edit"
          product={
            product
          }
        />

        <aside className="space-y-4 xl:sticky xl:top-6">
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-emerald-500" />

              <h2 className="text-sm font-semibold">
                Current Product
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <InfoRow
                icon={Tag}
                label="Category"
                value={
                  product.category
                }
              />

              <InfoRow
                icon={
                  CircleDollarSign
                }
                label="Price"
                value={formatPrice(
                  product.price,
                )}
              />

              <InfoRow
                icon={Boxes}
                label="Stock"
                value={`${product.stock} units`}
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/20 p-5">
            <p className="text-xs leading-5 text-muted-foreground">
              Saving changes will replace the product&apos;s existing catalog
              information.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

type IconType =
  typeof Tag;

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 items-center justify-center rounded-lg border bg-muted/30">
        <Icon className="size-3.5 text-muted-foreground" />
      </div>

      <div>
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-0.5 text-xs font-medium">
          {value}
        </p>
      </div>
    </div>
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
