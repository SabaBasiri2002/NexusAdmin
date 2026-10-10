import { Skeleton } from "@/components/ui/skeleton";

export default function RecentUsersSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-3 w-52" />
        </div>

        <Skeleton className="h-8 w-18 rounded-md" />
      </div>

      {/* Rows */}
      <div className="divide-y">
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <div
            key={index}
            className="flex h-16 items-center justify-between px-6"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="size-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
