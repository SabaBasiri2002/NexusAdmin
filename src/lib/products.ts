import {
  readFile,
  writeFile,
} from "node:fs/promises";

import { join } from "node:path";

import type { Product } from "@/types/product";

type NewProduct = Omit<Product, "id">;

type UpdateProduct = Omit<Product, "id">;

const productsFilePath = join(
  process.cwd(),
  "data",
  "products.json",
);

export async function getProducts(): Promise<Product[]> {
  console.log(
    "[PRODUCTS] Reading fresh products:",
    new Date().toISOString(),
  );

  try {
    const contents =
      await readFile(
        productsFilePath,
        "utf8",
      );

    return JSON.parse(
      contents,
    ) as Product[];
  } catch (error) {
    console.error(
      "Failed to load products:",
      error,
    );

    throw new Error(
      "Failed to load products.",
    );
  }
}

export async function getProductById(
  id: string | number,
): Promise<Product | undefined> {
  const products =
    await getProducts();

  const productId =
    Number(id);

  if (
    !Number.isInteger(productId)
  ) {
    return undefined;
  }

  return products.find(
    (product) =>
      product.id === productId,
  );
}

export async function addProduct(
  product: NewProduct,
): Promise<Product> {
  const products =
    await getProducts();

  const nextId =
    Math.max(
      0,
      ...products.map(
        (product) =>
          product.id,
      ),
    ) + 1;

  const createdProduct: Product = {
    id: nextId,

    name:
      product.name.trim(),

    price:
      product.price,

    stock:
      product.stock,

    status:
      toDisplayLabel(
        product.status,
      ),

    category:
      toDisplayLabel(
        product.category,
      ),
  };

  await writeProducts([
    createdProduct,
    ...products,
  ]);

  return createdProduct;
}

export async function updateProductById(
  id: number,
  data: UpdateProduct,
): Promise<Product | undefined> {
  const products =
    await getProducts();

  const productIndex =
    products.findIndex(
      (product) =>
        product.id === id,
    );

  if (
    productIndex === -1
  ) {
    return undefined;
  }

  const updatedProduct: Product = {
    id,

    name:
      data.name.trim(),

    price:
      data.price,

    stock:
      data.stock,

    status:
      toDisplayLabel(
        data.status,
      ),

    category:
      toDisplayLabel(
        data.category,
      ),
  };

  products[productIndex] =
    updatedProduct;

  await writeProducts(
    products,
  );

  return updatedProduct;
}

export async function deleteProductById(
  id: number,
): Promise<boolean> {
  const products =
    await getProducts();

  const updatedProducts =
    products.filter(
      (product) =>
        product.id !== id,
    );

  if (
    updatedProducts.length ===
    products.length
  ) {
    return false;
  }

  await writeProducts(
    updatedProducts,
  );

  return true;
}

async function writeProducts(
  products: Product[],
) {
  await writeFile(
    productsFilePath,
    `${JSON.stringify(
      products,
      null,
      2,
    )}\n`,
    "utf8",
  );
}

function toDisplayLabel(
  value: string,
) {
  const normalized =
    value
      .trim()
      .toLowerCase();

  if (!normalized) {
    return "";
  }

  return (
    normalized
      .charAt(0)
      .toUpperCase() +
    normalized.slice(1)
  );
}