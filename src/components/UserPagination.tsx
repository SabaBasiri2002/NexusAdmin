import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  UserQuery,
} from "@/types/user-query";

type UserPaginationProps = {
  currentPage: number;
  totalPages: number;
  query: UserQuery;
};

export default function UserPagination({
  currentPage,
  totalPages,
  query,
}: UserPaginationProps) {
  const pages =
    getVisiblePages(
      currentPage,
      totalPages,
    );

  return (
    <nav
      aria-label="User pagination"
      className="flex items-center gap-1"
    >
      {/* Previous */}
      {currentPage === 1 ? (
        <Button
          variant="outline"
          size="sm"
          disabled
          className="h-9"
        >
          <ChevronLeft className="size-4" />

          <span className="hidden sm:inline">
            Previous
          </span>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={
            <Link
              href={buildPageHref(
                query,
                currentPage - 1,
              )}
              scroll={false}
            />
          }
          className="h-9"
        >
          <ChevronLeft className="size-4" />

          <span className="hidden sm:inline">
            Previous
          </span>
        </Button>
      )}

      {/* Pages */}
      <div className="flex items-center gap-1">
        {pages.map(
          (item, index) => {
            if (
              typeof item !==
              "number"
            ) {
              return (
                <div
                  key={`${item}-${index}`}
                  className="flex size-9 items-center justify-center text-muted-foreground"
                >
                  <MoreHorizontal className="size-4" />
                </div>
              );
            }

            const isCurrent =
              item ===
              currentPage;

            return (
              <Button
                key={item}
                variant={
                  isCurrent
                    ? "default"
                    : "ghost"
                }
                size="icon"
                nativeButton={
                  isCurrent
                }
                disabled={
                  isCurrent
                }
                render={
                  isCurrent
                    ? undefined
                    : (
                        <Link
                          href={buildPageHref(
                            query,
                            item,
                          )}
                          scroll={
                            false
                          }
                        />
                      )
                }
                className={`
                  size-9
                  ${
                    isCurrent
                      ? "pointer-events-none"
                      : ""
                  }
                `}
              >
                {item}
              </Button>
            );
          },
        )}
      </div>

      {/* Next */}
      {currentPage ===
      totalPages ? (
        <Button
          variant="outline"
          size="sm"
          disabled
          className="h-9"
        >
          <span className="hidden sm:inline">
            Next
          </span>

          <ChevronRight className="size-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={
            <Link
              href={buildPageHref(
                query,
                currentPage + 1,
              )}
              scroll={false}
            />
          }
          className="h-9"
        >
          <span className="hidden sm:inline">
            Next
          </span>

          <ChevronRight className="size-4" />
        </Button>
      )}
    </nav>
  );
}

function buildPageHref(
  query: UserQuery,
  page: number,
) {
  const params =
    new URLSearchParams();

  /*
   * Preserve search
   */
  if (query.search) {
    params.set(
      "search",
      query.search,
    );
  }

  /*
   * Preserve role
   */
  if (query.role) {
    params.set(
      "role",
      query.role,
    );
  }

  /*
   * Preserve status
   */
  if (query.status) {
    params.set(
      "status",
      query.status,
    );
  }

  /*
   * Preserve sorting
   */
  if (query.sort) {
    params.set(
      "sort",
      query.sort,
    );

    params.set(
      "order",
      query.order,
    );
  }

  /*
   * Add page
   */
  params.set(
    "page",
    String(page),
  );

  return `/dashboard/users?${params.toString()}`;
}

type PageItem =
  | number
  | "left-ellipsis"
  | "right-ellipsis";

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): PageItem[] {
  /*
   * Example:
   *
   * 1 2 3 4 5
   */
  if (totalPages <= 7) {
    return Array.from(
      {
        length:
          totalPages,
      },
      (_, index) =>
        index + 1,
    );
  }

  /*
   * Start:
   *
   * 1 2 3 4 5 ... 10
   */
  if (currentPage <= 4) {
    return [
      1,
      2,
      3,
      4,
      5,
      "right-ellipsis",
      totalPages,
    ];
  }

  /*
   * End:
   *
   * 1 ... 6 7 8 9 10
   */
  if (
    currentPage >=
    totalPages - 3
  ) {
    return [
      1,
      "left-ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  /*
   * Middle:
   *
   * 1 ... 4 5 6 ... 10
   */
  return [
    1,
    "left-ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "right-ellipsis",
    totalPages,
  ];
}
