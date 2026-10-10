import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Loading dashboard stats">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="rounded-xl border bg-card/70 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="size-10 rounded-xl" />
          </div>
          <Skeleton className="mt-4 h-8 w-24" />
          <Skeleton className="mt-3 h-3 w-36 max-w-full" />
        </div>
      ))}
    </div>
  );
}
