import { Suspense } from "react";
import { LayoutDashboard, Sparkles } from "lucide-react";

import DashboardStats from "@/components/DashboardStats";
import DashboardStatsSkeleton from "@/components/DashboardStatsSkeleton";

import RecentProducts from "@/components/RecentProducts";
import RecentProductsSkeleton from "@/components/RecentProductsSkeleton";

import RecentUsers from "@/components/RecentUsers";
import RecentUsersSkeleton from "@/components/RecentUsersSkeleton";

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-6">
      {/* Page Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <LayoutDashboard className="size-4" />
            <span>Workspace overview</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            A clear view of your people, products, and inventory in one place.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <Sparkles className="size-4 text-emerald-500" />
          Made for the details
        </div>
      </section>

      {/* Stats */}
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      {/* Recent Activity */}
      <section className="grid items-start gap-6 xl:grid-cols-2">
        {/* Recent Products */}
        <Suspense fallback={<RecentProductsSkeleton />}>
          <RecentProducts />
        </Suspense>

        {/* Recent Users */}
        <Suspense fallback={<RecentUsersSkeleton />}>
          <RecentUsers />
        </Suspense>
      </section>
    </main>
  );
}
