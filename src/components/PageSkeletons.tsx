import { Skeleton } from "@/components/ui/skeleton";

const statSkeletons = ["one", "two", "three", "four"];
const tableRows = ["one", "two", "three", "four", "five"];

export function DashboardSkeleton() {
  return (
    <SkeletonFrame label="Loading dashboard">
      <div className="flex flex-col gap-6">
        <PageHeadingSkeleton />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statSkeletons.map((item) => (
            <StatCardSkeleton key={item} />
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex items-center justify-between gap-4 px-6 py-5">
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-3.5 w-56 max-w-[65vw]" />
            </div>

            <Skeleton className="hidden h-8 w-20 rounded-lg sm:block" />
          </div>

          <div className="border-t">
            <TableHeaderSkeleton />
            {tableRows.map((item) => (
              <UserRowSkeleton key={item} />
            ))}
          </div>

          <div className="flex items-center justify-between border-t px-6 py-4 sm:hidden">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </SkeletonFrame>
  );
}

export function UsersSkeleton() {
  return (
    <SkeletonFrame label="Loading users">
      <div className="space-y-8">
        <div className="rounded-3xl border bg-card px-7 py-8 lg:px-9 lg:py-9">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-4">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-4 w-80 max-w-[70vw]" />
              <Skeleton className="h-4 w-64 max-w-[60vw]" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-16 w-44 rounded-2xl" />
              <Skeleton className="h-11 w-32 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statSkeletons.map((item) => (
            <StatCardSkeleton key={item} />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-3.5 w-72 max-w-[70vw]" />
            </div>
            <Skeleton className="hidden h-8 w-20 rounded-lg sm:block" />
          </div>

          <UserDirectorySkeleton />
        </div>
      </div>
    </SkeletonFrame>
  );
}

export function CreateUserSkeleton() {
  return (
    <SkeletonFrame label="Loading user form">
      <div className="space-y-8">
        <div className="rounded-3xl border bg-card px-7 py-8 lg:px-9 lg:py-9">
          <Skeleton className="mb-5 h-7 w-28 rounded-lg" />

          <div className="flex items-start gap-4">
            <Skeleton className="size-12 shrink-0 rounded-2xl" />

            <div className="space-y-3">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-9 w-56 max-w-[70vw]" />
              <Skeleton className="h-4 w-96 max-w-[75vw]" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            <FormSectionSkeleton />
            <FormSectionSkeleton />

            <div className="flex justify-end gap-3">
              <Skeleton className="h-11 w-24 rounded-lg" />
              <Skeleton className="h-11 w-32 rounded-lg" />
            </div>
          </div>

          <div className="space-y-4">
            <InfoCardSkeleton lines={3} />
            <InfoCardSkeleton lines={3} />
          </div>
        </div>
      </div>
    </SkeletonFrame>
  );
}

export function UserDetailsSkeleton() {
  return (
    <SkeletonFrame label="Loading user profile">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-28 rounded-lg" />
          <Skeleton className="hidden h-4 w-44 sm:block" />
        </div>

        <section className="rounded-3xl border bg-card p-6 md:p-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Skeleton className="size-20 rounded-full" />

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-56" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>

            <Skeleton className="h-20 w-full rounded-2xl lg:w-60" />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <InfoPanelSkeleton />
            <InfoPanelSkeleton compact />
          </div>

          <div className="space-y-6">
            <InfoCardSkeleton lines={4} />
            <InfoCardSkeleton lines={3} />
          </div>
        </section>
      </div>
    </SkeletonFrame>
  );
}

export function ProductsSkeleton() {
  return (
    <SkeletonFrame label="Loading products">
      <div className="space-y-6">
        <PageHeadingSkeleton />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statSkeletons.map((item) => (
            <StatCardSkeleton key={item} />
          ))}
        </div>
        <UserDirectorySkeleton />
      </div>
    </SkeletonFrame>
  );
}

export function LoginSkeleton() {
  return (
    <SkeletonFrame label="Loading sign in">
      <div className="flex min-h-[calc(90dvh-4rem)] items-center justify-center">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border bg-card/75 shadow-2xl lg:grid-cols-[1.08fr_0.92fr]">
          <div className="hidden min-h-[520px] flex-col justify-between border-r p-10 lg:flex xl:px-12 xl:py-11">
            <div className="flex items-center gap-3">
              <Skeleton className="size-11 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>

            <div className="space-y-5">
              <Skeleton className="h-6 w-48 rounded-full" />
              <Skeleton className="h-28 w-full max-w-lg" />
              <Skeleton className="h-4 w-72" />
              <div className="space-y-4">
                <Skeleton className="h-9 w-48" />
                <Skeleton className="h-9 w-56" />
                <Skeleton className="h-9 w-52" />
              </div>
            </div>

            <Skeleton className="h-3 w-28" />
          </div>

          <div className="flex min-h-[520px] items-center p-7 sm:p-10 lg:px-12">
            <div className="w-full space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-64 max-w-full" />
                <Skeleton className="h-4 w-full max-w-sm" />
              </div>
              <Skeleton className="h-14 w-full rounded-xl" />
              <Skeleton className="h-14 w-full rounded-xl" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonFrame>
  );
}

function SkeletonFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div aria-busy="true" aria-label={label} className="relative">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

function PageHeadingSkeleton() {
  return (
    <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-44" />
        <Skeleton className="h-4 w-96 max-w-[75vw]" />
      </div>

      <Skeleton className="hidden h-4 w-40 sm:block" />
    </section>
  );
}

function StatCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="size-10 rounded-xl" />
      </div>
      <Skeleton className="mt-5 h-8 w-24" />
      <div className="mt-3 flex gap-2">
        <Skeleton className="h-3.5 w-12" />
        <Skeleton className="h-3.5 w-24" />
      </div>
    </div>
  );
}

function TableHeaderSkeleton() {
  return (
    <div className="hidden h-12 items-center gap-6 border-b px-6 md:grid md:grid-cols-[1.5fr_1.5fr_1fr_1fr_48px]">
      <Skeleton className="h-3.5 w-16" />
      <Skeleton className="h-3.5 w-16" />
      <Skeleton className="h-3.5 w-12" />
      <Skeleton className="h-3.5 w-14" />
      <Skeleton className="ml-auto size-7 rounded-lg" />
    </div>
  );
}

function UserRowSkeleton() {
  return (
    <div className="flex min-h-[72px] items-center gap-4 border-b px-6 last:border-b-0">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-32 max-w-full" />
        <Skeleton className="h-3 w-44 max-w-full" />
      </div>
      <Skeleton className="hidden h-4 w-36 lg:block" />
      <Skeleton className="hidden h-6 w-20 rounded-full sm:block" />
      <Skeleton className="size-8 shrink-0 rounded-lg" />
    </div>
  );
}

function UserDirectorySkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-6 py-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3.5 w-52" />
        </div>
        <Skeleton className="h-7 w-16 rounded-lg" />
      </div>
      <TableHeaderSkeleton />
      {tableRows.map((item) => (
        <UserRowSkeleton key={item} />
      ))}
      <div className="flex items-center justify-between border-t px-6 py-4">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3.5 w-28" />
      </div>
    </div>
  );
}

function FormSectionSkeleton() {
  return (
    <div className="rounded-2xl border bg-card">
      <div className="flex items-center gap-3 border-b px-6 py-5">
        <Skeleton className="size-10 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3.5 w-64 max-w-[60vw]" />
        </div>
      </div>
      <div className="grid gap-6 p-6 md:grid-cols-2">
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
    </div>
  );
}

function InfoCardSkeleton({ lines }: { lines: number }) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <Skeleton className="h-4 w-32" />
      <div className="mt-6 space-y-4">
        {Array.from({ length: lines }, (_, index) => (
          <div className="flex items-center justify-between gap-4" key={index}>
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-3.5 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoPanelSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center gap-3 border-b px-6 py-5">
        <Skeleton className="size-10 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3.5 w-64 max-w-[60vw]" />
        </div>
      </div>
      <div className="grid gap-px bg-border md:grid-cols-2">
        {Array.from({ length: compact ? 1 : 4 }, (_, index) => (
          <div className="bg-card p-6" key={index}>
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="mt-3 h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
