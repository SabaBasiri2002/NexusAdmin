import { Suspense } from "react";
import { LayoutDashboard, Sparkles } from "lucide-react";

// import DashboardStats from "@/components/DashboardStats";
// import DashboardStatsSkeleton from "@/components/DashboardStatsSkeleton";

// import RecentProducts from "@/components/RecentProducts";
// import RecentProductsSkeleton from "@/components/RecentProductsSkeleton";

// import RecentUsers from "@/components/RecentUsers";
// import RecentUsersSkeleton from "@/components/RecentUsersSkeleton";

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-6">
      {/* Page Header */}
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
        <div data-scroll-parallax="18" className="pointer-events-none absolute -right-20 -top-32 size-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div data-scroll-parallax="-12" className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 p-7 sm:flex-row sm:items-end sm:p-9">
          <div>
            <div className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex size-9 items-center justify-center rounded-xl border bg-background/80 shadow-sm">
                <LayoutDashboard className="size-4 text-foreground" />
              </span>
              Workspace overview
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              A clear view of your people, products, and inventory in one place.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/75 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
            <Sparkles className="size-3.5 text-emerald-500" />
            Made for the details
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* <Suspense
        fallback={
          <DashboardStatsSkeleton />
        }
      >
        <DashboardStats />
      </Suspense> */}

      {/* Recent Activity */}
      <section className="grid items-start gap-6 xl:grid-cols-2">
        {/* Recent Products */}
        {/* <Suspense
          fallback={
            <RecentProductsSkeleton />
          }
        >
          <RecentProducts />
        </Suspense> */}

        {/* Recent Users */}
        {/* <Suspense
          fallback={
            <RecentUsersSkeleton />
          }
        >
          <RecentUsers />
        </Suspense> */}
      </section>
    </main>
  );
}
