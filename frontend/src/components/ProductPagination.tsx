import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

type ProductPaginationProps = {
  currentPage: number;
  totalPages: number;
};

function pageHref(page: number) {
  return page === 1 ? "/dashboard/products" : `/dashboard/products?page=${page}`;
}

export default function ProductPagination({
  currentPage,
  totalPages,
}: ProductPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((page) =>
      page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1,
    );

  return (
    <nav aria-label="Product pagination" className="flex flex-wrap items-center gap-1">
      {currentPage === 1 ? (
        <Button variant="outline" size="sm" disabled aria-label="Previous page">
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
      ) : (
        <Button variant="outline" size="sm" nativeButton={false} render={
          <Link href={pageHref(currentPage - 1)} scroll={false} aria-label="Previous page" />
        }>
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
      )}

      {pages.map((page, index) => (
        <div key={page} className="flex items-center gap-1">
          {index > 0 && page - pages[index - 1] > 1 && (
            <span aria-hidden="true" className="flex size-8 items-center justify-center text-muted-foreground">
              <MoreHorizontal className="size-4" />
            </span>
          )}
          {page === currentPage ? (
            <Button size="icon" disabled aria-current="page" aria-label={`Page ${page}`} className="size-8">
              {page}
            </Button>
          ) : (
            <Button size="icon" variant="ghost" nativeButton={false} render={
              <Link href={pageHref(page)} scroll={false} aria-label={`Page ${page}`} />
            } className="size-8">
              {page}
            </Button>
          )}
        </div>
      ))}

      {currentPage === totalPages ? (
        <Button variant="outline" size="sm" disabled aria-label="Next page">
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="size-4" />
        </Button>
      ) : (
        <Button variant="outline" size="sm" nativeButton={false} render={
          <Link href={pageHref(currentPage + 1)} scroll={false} aria-label="Next page" />
        }>
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="size-4" />
        </Button>
      )}
    </nav>
  );
}
