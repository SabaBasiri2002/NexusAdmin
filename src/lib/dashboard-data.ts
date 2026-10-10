import {
  unstable_cache,
} from "next/cache";

import {
  getUsers,
} from "@/lib/data";

import {
  getProducts,
} from "@/lib/products";

async function loadDashboardStats() {
  console.log(
    "[DASHBOARD CACHE MISS]",
    new Date().toISOString(),
  );

  const [
    users,
    products,
  ] = await Promise.all([
    getUsers(),
    getProducts(),
  ]);

  const totalUsers =
    users.length;

  const totalProducts =
    products.length;

  const totalStock =
    products.reduce(
      (
        total,
        product,
      ) =>
        total +
        product.stock,
      0,
    );

  const inventoryValue =
    products.reduce(
      (
        total,
        product,
      ) =>
        total +
        product.price *
          product.stock,
      0,
    );

  return {
    totalUsers,
    totalProducts,
    totalStock,
    inventoryValue,
  };
}

export const getDashboardStats =
  unstable_cache(
    loadDashboardStats,

    [
      "dashboard-stats",
    ],

    {
      /*
       * Dashboard can tolerate
       * short-lived stale data.
       */
      revalidate: 30,

      tags: [
        "dashboard-stats",
      ],
    },
  );