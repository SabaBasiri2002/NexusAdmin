import Link from "next/link";

import {
  ArrowLeft,
  BadgeCheck,
  Boxes,
  PackagePlus,
  ShieldCheck,
} from "lucide-react";

import ProductForm from "../../../../components/ProductForm";

import {
  Button,
} from "@/components/ui/button";

export default function CreateProductPage() {
  return (
    <main className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-card">
        <div data-scroll-parallax="18" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative px-7 py-8 lg:px-9 lg:py-9">
          <Button
            variant="ghost"
            nativeButton={false}
            render={
              <Link href="/dashboard/products" />
            }
            className="-ml-3 mb-5 text-muted-foreground"
          >
            <ArrowLeft className="size-4" />

            Back
          </Button>

          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border bg-background/70 shadow-sm backdrop-blur">
              <PackagePlus className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Product Management
              </p>

              <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                Create Product
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Add a new product to your catalog and configure its pricing,
                category, inventory and availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <ProductForm mode="create" />

        <aside className="space-y-4 xl:sticky xl:top-6">
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex size-10 items-center justify-center rounded-xl border bg-muted/40">
              <Boxes className="size-4 text-muted-foreground" />
            </div>

            <h3 className="mt-4 text-sm font-semibold">
              Inventory setup
            </h3>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Stock represents the number of units currently available in
              inventory.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-emerald-500" />

              <h3 className="text-sm font-semibold">
                Before creating
              </h3>
            </div>

            <div className="mt-4 space-y-3">
              <CheckItem text="Enter a clear product name" />

              <CheckItem text="Confirm pricing information" />

              <CheckItem text="Set the correct inventory amount" />

              <CheckItem text="Choose category and availability" />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/20 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

              <p className="text-xs leading-5 text-muted-foreground">
                All fields are validated on the server before the product is
                added.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function CheckItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />

      <p className="text-xs leading-5 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}
