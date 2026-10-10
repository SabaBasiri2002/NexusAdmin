import Link from "next/link";

import {
  Boxes,
  Package,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  getProducts,
} from "@/lib/products";

export default async function RecentProducts() {
  const products =
    await getProducts();

  const recentProducts =
    products.slice(0, 5);

  return (
    <Card data-scroll-reveal="card" className="overflow-hidden border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
        <div>
          <CardTitle className="text-base font-semibold">
            Recent Products
          </CardTitle>

          <CardDescription className="mt-1">
            Latest products in
            your catalog.
          </CardDescription>
        </div>

        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={
            <Link href="/dashboard/products" />
          }
        >
          View all
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y">
          {recentProducts.map(
            (product) => {
              const active =
                product.status.toLowerCase() ===
                "active";

              return (
                <div
                  key={
                    product.id
                  }
                  className="group flex h-16 items-center justify-between gap-4 px-6 transition-colors hover:bg-muted/25"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border bg-muted/30">
                      <Package className="size-4 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/dashboard/products/${product.id}`}
                        className="block truncate text-sm font-medium transition-colors hover:text-primary"
                      >
                        {
                          product.name
                        }
                      </Link>

                      <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <Boxes className="size-3" />

                        {
                          product.stock
                        }{" "}
                        in stock
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden text-sm font-medium tabular-nums sm:block">
                      {formatPrice(
                        product.price,
                      )}
                    </span>

                    <Badge
                      variant="outline"
                      className={
                        active
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {
                        product.status
                      }
                    </Badge>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </CardContent>
    </Card>
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
