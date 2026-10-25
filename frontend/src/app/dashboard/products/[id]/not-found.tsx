import Link from "next/link";

import {
  ArrowLeft,
  PackageX,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border bg-card shadow-sm">
          <PackageX className="size-7 text-muted-foreground" />
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Product not found
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          This product doesn&apos;t exist
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          The product may have been removed or the provided product ID is
          invalid.
        </p>

        <Button
          nativeButton={false}
          render={
            <Link href="/dashboard/products" />
          }
          className="mt-6"
        >
          <ArrowLeft className="size-4" />

          Back to products
        </Button>
      </div>
    </div>
  );
}