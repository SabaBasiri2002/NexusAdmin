import { Skeleton } from "@/components/ui/skeleton";

export default function RecentProductsSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm" aria-label="Loading recent products">
      <div className="flex items-center justify-between border-b p-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-44" />
        </div>
        <Skeleton className="h-8 w-18 rounded-md" />
      </div>

      <div className="divide-y">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
