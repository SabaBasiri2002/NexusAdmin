"use client";

import {
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserToolbarProps = {
  resultCount: number;
  totalCount: number;
};

export default function UserToolbar({
  resultCount,
  totalCount,
}: UserToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams =
    useSearchParams();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const currentSearch =
    searchParams.get("search") ?? "";

  const currentRole =
    searchParams.get("role") ?? "";

  const currentStatus =
    searchParams.get("status") ?? "";

  const queryString =
    searchParams.toString();

  const [search, setSearch] =
    useState(currentSearch);

  const hasFilters =
    Boolean(currentSearch) ||
    Boolean(currentRole) ||
    Boolean(currentStatus);

  const navigate = useCallback(
    (params: URLSearchParams) => {
      const query =
        params.toString();

      startTransition(() => {
        router.replace(
          query
            ? `${pathname}?${query}`
            : pathname,
          {
            scroll: false,
          },
        );
      });
    },
    [pathname, router, startTransition],
  );

  /*
   * Debounced Search
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      const normalized =
        search.trim();

      if (
        normalized === currentSearch
      ) {
        return;
      }

      const params =
        new URLSearchParams(
          queryString,
        );

      if (normalized) {
        params.set(
          "search",
          normalized,
        );
      } else {
        params.delete("search");
      }

      /*
       * Search changed.
       * Return to first page.
       */
      params.delete("page");

      navigate(params);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [
    search,
    currentSearch,
    queryString,
    navigate,
  ]);

  function updateFilter(
    key: "role" | "status",
    value: string,
  ) {
    const params =
      new URLSearchParams(
        queryString,
      );

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    /*
     * Filter changed.
     * Return to page 1.
     */
    params.delete("page");

    navigate(params);
  }

  function clearSearch() {
    setSearch("");

    const params =
      new URLSearchParams(
        queryString,
      );

    params.delete("search");
    params.delete("page");

    navigate(params);
  }

  function resetFilters() {
    setSearch("");

    const params =
      new URLSearchParams(
        queryString,
      );

    params.delete("search");
    params.delete("role");
    params.delete("status");
    params.delete("page");

    navigate(params);
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-col gap-4 p-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Search */}
        <div className="relative w-full xl:max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            placeholder="Search users..."
            className="h-10 pl-10 pr-10"
          />

          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
            {isPending ? (
              <Spinner className="size-4 text-muted-foreground" />
            ) : search ? (
              <button
                type="button"
                onClick={
                  clearSearch
                }
                aria-label="Clear search"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="hidden items-center gap-2 pr-1 text-xs text-muted-foreground lg:flex">
            <SlidersHorizontal className="size-3.5" />

            Filters
          </div>

          {/* Role */}
          <Select
            value={
              currentRole || "all"
            }
            onValueChange={(value) =>
              updateFilter(
                "role",
                value ?? "all",
              )
            }
          >
            <SelectTrigger className="h-10 w-full sm:w-40">
              <SelectValue placeholder="All roles" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All roles
              </SelectItem>

              <SelectItem value="admin">
                Admin
              </SelectItem>

              <SelectItem value="manager">
                Manager
              </SelectItem>

              <SelectItem value="user">
                User
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select
            value={
              currentStatus ||
              "all"
            }
            onValueChange={(value) =>
              updateFilter(
                "status",
                value ?? "all",
              )
            }
          >
            <SelectTrigger className="h-10 w-full sm:w-40">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All statuses
              </SelectItem>

              <SelectItem value="active">
                Active
              </SelectItem>

              <SelectItem value="inactive">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isPending}
              onClick={
                resetFilters
              }
              className="h-10 text-muted-foreground"
            >
              <RotateCcw className="size-3.5" />

              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 border-t bg-muted/10 px-4 py-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">
            {resultCount}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {totalCount}
          </span>{" "}
          users match
        </p>

        {hasFilters && (
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" />

            <span className="text-xs text-muted-foreground">
              Filters active
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
