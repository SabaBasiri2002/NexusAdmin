"use client";

import Link from "next/link";

import {
  useActionState,
  useState,
} from "react";

import {
  AlertCircle,
  Boxes,
  CheckCircle2,
  CircleDollarSign,
  Package,
  Tag,
} from "lucide-react";

import {
  createProduct,
  updateProduct,
  type ProductFormState,
} from "@/actions/product-actions";

import type {
  Product,
} from "@/types/product";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Spinner,
} from "@/components/ui/spinner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductFormProps =
  | {
      mode: "create";
      product?: never;
    }
  | {
      mode: "edit";
      product: Product;
    };

type ProductFormValues = {
  name: string;
  price: string;
  stock: string;
  status: string;
  category: string;
};

export default function ProductForm({
  mode,
  product,
}: ProductFormProps) {
  const isEdit =
    mode === "edit";

  const initialValues: ProductFormValues = {
    name:
      product?.name ?? "",

    price:
      product
        ? String(
            product.price,
          )
        : "",

    stock:
      product
        ? String(
            product.stock,
          )
        : "",

    status:
      product?.status.toLowerCase() ??
      "",

    category:
      product?.category.toLowerCase() ??
      "",
  };

  const initialState: ProductFormState = {
    success: false,
    errors: {},
    message: "",
    values:
      initialValues,
  };

  const action =
    mode === "edit"
      ? updateProduct.bind(
          null,
          product.id,
        )
      : createProduct;

  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    action,
    initialState,
  );

  const [
    values,
    setValues,
  ] =
    useState<ProductFormValues>(
      initialValues,
    );

  const updateValue = <
    Key extends keyof ProductFormValues,
  >(
    key: Key,
    value: ProductFormValues[Key],
  ) => {
    setValues(
      (
        currentValues,
      ) => ({
        ...currentValues,
        [key]: value,
      }),
    );
  };

  return (
    <form
      action={formAction}
      noValidate
      className="relative space-y-6"
    >
      {/* Pending */}
      {isPending && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-[2px]">
          <div className="flex items-center gap-3 rounded-xl border bg-card px-5 py-4 shadow-lg">
            <Spinner className="size-5 text-primary" />

            <div>
              <p className="text-sm font-medium">
                {isEdit
                  ? "Updating product..."
                  : "Creating product..."}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {isEdit
                  ? "Saving the latest product information."
                  : "Adding the product to your catalog."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Message */}
      {state.message && (
        <div
          className={`
            flex items-start gap-3
            rounded-xl border
            px-4 py-3
            ${
              state.success
                ? "border-emerald-500/20 bg-emerald-500/10"
                : "border-destructive/20 bg-destructive/10"
            }
          `}
        >
          {state.success ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
          )}

          <div>
            <p
              className={
                state.success
                  ? "text-sm font-medium text-emerald-500"
                  : "text-sm font-medium text-destructive"
              }
            >
              {state.success
                ? "Success"
                : "Something needs attention"}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {
                state.message
              }
            </p>
          </div>
        </div>
      )}

      {/* Basic Information */}
      <div data-scroll-reveal="card" className="rounded-2xl border bg-card">
        <FormSectionHeader
          icon={Package}
          title="Product Information"
          description={
            isEdit
              ? "Update the product's core information."
              : "Enter the basic information for your new product."
          }
        />

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Name */}
          <div className="space-y-2 md:col-span-2">
            <RequiredLabel
              htmlFor="name"
              label="Product Name"
            />

            <div className="relative">
              <Package className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="name"
                name="name"
                value={
                  values.name
                }
                disabled={
                  isPending
                }
                onChange={(
                  event,
                ) =>
                  updateValue(
                    "name",
                    event
                      .target
                      .value,
                  )
                }
                placeholder="e.g. MacBook Pro 14"
                className="h-11 pl-10"
                aria-invalid={Boolean(
                  state.errors
                    ?.name,
                )}
              />
            </div>

            <FieldError
              errors={
                state.errors
                  ?.name
              }
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <RequiredLabel
              htmlFor="price"
              label="Price"
            />

            <div className="relative">
              <CircleDollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={
                  values.price
                }
                disabled={
                  isPending
                }
                onChange={(
                  event,
                ) =>
                  updateValue(
                    "price",
                    event
                      .target
                      .value,
                  )
                }
                placeholder="0.00"
                className="h-11 pl-10"
                aria-invalid={Boolean(
                  state.errors
                    ?.price,
                )}
              />
            </div>

            <FieldError
              errors={
                state.errors
                  ?.price
              }
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <RequiredLabel
              label="Category"
            />

            <Select
              name="category"
              value={
                values.category ||
                null
              }
              disabled={
                isPending
              }
              onValueChange={(
                value,
              ) =>
                updateValue(
                  "category",
                  value ??
                    "",
                )
              }
            >
              <SelectTrigger
                className="h-11 w-full"
                aria-invalid={Boolean(
                  state.errors
                    ?.category,
                )}
              >
                <div className="flex items-center gap-2">
                  <Tag className="size-4 text-muted-foreground" />

                  <SelectValue placeholder="Select category" />
                </div>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="computers">
                  Computers
                </SelectItem>

                <SelectItem value="phones">
                  Phones
                </SelectItem>

                <SelectItem value="tablets">
                  Tablets
                </SelectItem>

                <SelectItem value="audio">
                  Audio
                </SelectItem>

                <SelectItem value="wearables">
                  Wearables
                </SelectItem>

                <SelectItem value="accessories">
                  Accessories
                </SelectItem>

                <SelectItem value="displays">
                  Displays
                </SelectItem>
              </SelectContent>
            </Select>

            <FieldError
              errors={
                state.errors
                  ?.category
              }
            />
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div data-scroll-reveal="card" className="rounded-2xl border bg-card">
        <FormSectionHeader
          icon={Boxes}
          title="Inventory & Availability"
          description="Configure stock levels and product availability."
        />

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Stock */}
          <div className="space-y-2">
            <RequiredLabel
              htmlFor="stock"
              label="Stock"
            />

            <div className="relative">
              <Boxes className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                value={
                  values.stock
                }
                disabled={
                  isPending
                }
                onChange={(
                  event,
                ) =>
                  updateValue(
                    "stock",
                    event
                      .target
                      .value,
                  )
                }
                placeholder="0"
                className="h-11 pl-10"
                aria-invalid={Boolean(
                  state.errors
                    ?.stock,
                )}
              />
            </div>

            <FieldError
              errors={
                state.errors
                  ?.stock
              }
            />

            {!state.errors
              ?.stock && (
              <p className="text-xs text-muted-foreground">
                Number of units
                currently available.
              </p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <RequiredLabel
              label="Status"
            />

            <Select
              name="status"
              value={
                values.status ||
                null
              }
              disabled={
                isPending
              }
              onValueChange={(
                value,
              ) =>
                updateValue(
                  "status",
                  value ??
                    "",
                )
              }
            >
              <SelectTrigger
                className="h-11 w-full"
                aria-invalid={Boolean(
                  state.errors
                    ?.status,
                )}
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="active">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />

                    Active
                  </div>
                </SelectItem>

                <SelectItem value="inactive">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-muted-foreground" />

                    Inactive
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <FieldError
              errors={
                state.errors
                  ?.status
              }
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <Button
          variant="outline"
          nativeButton={false}
          render={
            <Link
              href={
                isEdit
                  ? `/dashboard/products/${product.id}`
                  : "/dashboard/products"
              }
            />
          }
          disabled={
            isPending
          }
          className="h-11 px-5"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={
            isPending
          }
          className="h-11 min-w-40 px-5"
        >
          {isPending ? (
            <>
              <Spinner data-icon="inline-start" />

              {isEdit
                ? "Saving..."
                : "Creating..."}
            </>
          ) : (
            <>
              <Package className="size-4" />

              {isEdit
                ? "Save Changes"
                : "Create Product"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

type IconType =
  typeof Package;

function FormSectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: IconType;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl border bg-muted/40">
          <Icon className="size-4 text-muted-foreground" />
        </div>

        <div>
          <h2 className="text-sm font-semibold">
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-muted-foreground">
            {
              description
            }
          </p>
        </div>
      </div>
    </div>
  );
}

function RequiredLabel({
  htmlFor,
  label,
}: {
  htmlFor?: string;
  label: string;
}) {
  return (
    <Label
      htmlFor={htmlFor}
    >
      {label}

      <span className="ml-1 text-destructive">
        *
      </span>
    </Label>
  );
}

function FieldError({
  errors,
}: {
  errors?: string[];
}) {
  if (
    !errors?.length
  ) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-destructive">
      <AlertCircle className="size-3.5 shrink-0" />

      <span>
        {errors[0]}
      </span>
    </div>
  );
}
