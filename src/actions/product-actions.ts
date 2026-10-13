"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import { z } from "zod";

import {
  addProduct,
  deleteProductById,
  getProductById,
  updateProductById,
} from "@/lib/products";

import {
  productSchema,
} from "@/lib/validation";

export type ProductFormState = {
  success: boolean;

  errors?: {
    name?: string[];
    price?: string[];
    stock?: string[];
    status?: string[];
    category?: string[];
  };

  message?: string;

  values?: {
    name: string;
    price: string;
    stock: string;
    status: string;
    category: string;
  };
};

export async function createProduct(
  _previousState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const values =
    getProductFormValues(
      formData,
    );

  const result =
    productSchema.safeParse(
      values,
    );

  if (!result.success) {
    const {
      fieldErrors,
    } = result.error.flatten();

    return {
      success: false,
      errors:
        fieldErrors,
      message:
        "Please fix the errors before continuing.",
      values,
    };
  }

  await addProduct(
    result.data,
  );

  revalidatePath(
    "/dashboard/products",
  );

  revalidatePath(
    "/dashboard",
  );

  redirect(
    "/dashboard/products",
  );
}

export async function updateProduct(
  productId: number,
  _previousState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const values =
    getProductFormValues(
      formData,
    );

  const result =
    productSchema.safeParse(
      values,
    );

  if (!result.success) {
    const {
      fieldErrors,
    } = result.error.flatten();

    return {
      success: false,
      errors:
        fieldErrors,
      message:
        "Please fix the errors before continuing.",
      values,
    };
  }

  const existingProduct =
    await getProductById(
      productId,
    );

  if (!existingProduct) {
    return {
      success: false,
      message:
        "Product could not be found.",
      values,
    };
  }

  await updateProductById(
    productId,
    result.data,
  );

  revalidatePath(
    "/dashboard/products",
  );

  revalidatePath(
    `/dashboard/products/${productId}`,
  );

  revalidatePath(
    "/dashboard",
  );

  redirect(
    "/dashboard/products",
  );
}

export async function deleteProduct(
  productId: number,
) {
  if (
    !Number.isInteger(
      productId,
    ) ||
    productId <= 0
  ) {
    return {
      success: false,
      message:
        "Invalid product ID.",
    };
  }

  const deleted =
    await deleteProductById(
      productId,
    );

  if (!deleted) {
    return {
      success: false,
      message:
        "Product could not be found.",
    };
  }

  revalidatePath(
    "/dashboard/products",
  );

  revalidatePath(
    "/dashboard",
  );

  return {
    success: true,
  };
}

function getProductFormValues(
  formData: FormData,
) {
  return {
    name: String(
      formData.get(
        "name",
      ) ?? "",
    ),

    price: String(
      formData.get(
        "price",
      ) ?? "",
    ),

    stock: String(
      formData.get(
        "stock",
      ) ?? "",
    ),

    status: String(
      formData.get(
        "status",
      ) ?? "",
    ),

    category: String(
      formData.get(
        "category",
      ) ?? "",
    ),
  };
}
