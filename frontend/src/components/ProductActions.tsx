"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Eye,
  MoreHorizontal,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";

import type {
  Product,
} from "@/types/product";

import {
  deleteProduct,
} from "@/actions/product-actions";

import DeleteConfirmDialog from "./DeleteConfirmDialog";

import {
  Button,
} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProductActionsProps = {
  product: Product;
};

export default function ProductActions({
  product,
}: ProductActionsProps) {
  const router =
    useRouter();

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);

  const [
    deleteError,
    setDeleteError,
  ] = useState<
    string | null
  >(null);

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const handleDelete =
    () => {
      setDeleteError(
        null,
      );

      startTransition(
        async () => {
          const result =
            await deleteProduct(
              product.id,
            );

          if (
            !result.success
          ) {
            setDeleteError(
              result.message ??
                "Failed to delete product.",
            );

            return;
          }

          setDeleteOpen(
            false,
          );

          router.refresh();
        },
      );
    };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-lg text-muted-foreground opacity-60 transition-all hover:bg-muted hover:text-foreground hover:opacity-100 group-hover:opacity-100 data-[state=open]:bg-muted data-[state=open]:text-foreground data-[state=open]:opacity-100"
            />
          }
        >
          <MoreHorizontal className="size-4" />

          <span className="sr-only">
            Open actions for{" "}
            {product.name}
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="w-60"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-3 py-1">
                <div className="flex size-8 items-center justify-center rounded-lg border bg-muted">
                  <Package className="size-3.5 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-foreground">
                    {
                      product.name
                    }
                  </p>

                  <p className="mt-0.5 text-[11px] text-muted-foreground">
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
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/dashboard/products/${product.id}`,
                )
              }
              className="cursor-pointer gap-2.5 py-2"
            >
              <div className="flex size-7 items-center justify-center rounded-md bg-muted">
                <Eye className="size-3.5" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm">
                  View details
                </span>

                <span className="text-[11px] text-muted-foreground">
                  View product information
                </span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/dashboard/products/${product.id}/edit`,
                )
              }
              className="cursor-pointer gap-2.5 py-2"
            >
              <div className="flex size-7 items-center justify-center rounded-md bg-muted">
                <Pencil className="size-3.5" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm">
                  Edit product
                </span>

                <span className="text-[11px] text-muted-foreground">
                  Update product information
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setDeleteError(
                  null,
                );

                setDeleteOpen(
                  true,
                );
              }}
              className="cursor-pointer gap-2.5 py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <div className="flex size-7 items-center justify-center rounded-md bg-destructive/10">
                <Trash2 className="size-3.5" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm">
                  Delete product
                </span>

                <span className="text-[11px] text-destructive/70">
                  Permanently remove product
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={(
          open: boolean,
        ) => {
          setDeleteOpen(
            open,
          );

          if (!open) {
            setDeleteError(
              null,
            );
          }
        }}
        title="Delete Product?"
        description={
          <>
            Are you sure you
            want to delete{" "}
            <span className="font-medium text-foreground">
              {
                product.name
              }
            </span>
            ? This action
            cannot be undone.
          </>
        }
        preview={
          <div className="my-2 rounded-xl border bg-muted/20 p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border bg-muted">
                <Package className="size-4 text-muted-foreground" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  {
                    product.name
                  }
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {
                    product.category
                  }{" "}
                  •{" "}
                  {formatPrice(
                    product.price,
                  )}
                </p>
              </div>
            </div>
          </div>
        }
        error={
          deleteError
        }
        isPending={
          isPending
        }
        onConfirm={
          handleDelete
        }
      />
    </>
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