import {
  Boxes,
  CircleDollarSign,
  Package,
  Users,
} from "lucide-react";

import StatCard from "@/components/statCard";

import {
  getDashboardStats,
} from "@/lib/dashboard-data";

export default async function DashboardStats() {
  const {
    totalUsers,
    totalProducts,
    totalStock,
    inventoryValue,
  } =
    await getDashboardStats();

  const stats = [
    {
      title:
        "Total Users",

      value:
        totalUsers.toLocaleString(
          "en-US",
        ),

      description:
        "registered users",

      icon: Users,

      trend:
        "up" as const,

      change:
        "Live",
    },

    {
      title:
        "Products",

      value:
        totalProducts.toLocaleString(
          "en-US",
        ),

      description:
        "catalog products",

      icon:
        Package,

      trend:
        "up" as const,

      change:
        "Live",
    },

    {
      title:
        "Inventory",

      value:
        totalStock.toLocaleString(
          "en-US",
        ),

      description:
        "units in stock",

      icon:
        Boxes,

      trend:
        "up" as const,

      change:
        "Live",
    },

    {
      title:
        "Inventory Value",

      value:
        formatPrice(
          inventoryValue,
        ),

      description:
        "current stock value",

      icon:
        CircleDollarSign,

      trend:
        "up" as const,

      change:
        "Live",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(
        (stat) => (
          <StatCard
            key={
              stat.title
            }
            {...stat}
          />
        ),
      )}
    </section>
  );
}

function formatPrice(
  price: number,
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style:
        "currency",

      currency:
        "USD",

      maximumFractionDigits:
        0,
    },
  ).format(price);
}