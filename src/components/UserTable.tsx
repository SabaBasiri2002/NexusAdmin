import Link from "next/link";

import {
  CalendarDays,
  Crown,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import type {
  User,
} from "@/types/user";

import type {
  UserQuery,
  UserSortKey,
} from "@/types/user-query";

import DataTable, {
  type DataTableColumn,
  type SortOrder,
} from "@/components/DataTable";

import UserActions from "@/components/UserActions";
import UserPagination from "@/components/UserPagination";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  Badge,
} from "@/components/ui/badge";

type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
};

type UserTableProps = {
  users: User[];
  query: UserQuery;
  pagination: PaginationInfo;
};

export default function UserTable({
  users,
  query,
  pagination,
}: UserTableProps) {
  const hasFilters =
    Boolean(query.search) ||
    Boolean(query.role) ||
    Boolean(query.status);

  const columns: DataTableColumn<
    User,
    UserSortKey
  >[] = [
    {
      id: "user",
      header: "User",
      sortKey: "name",
      headerClassName:
        "min-w-60 pl-6",
      cellClassName:
        "pl-6",

      cell: (user) => (
        <UserCell
          user={user}
        />
      ),
    },

    {
      id: "email",
      header: "Email",
      sortKey: "email",
      headerClassName:
        "min-w-60",

      cell: (user) => (
        <p className="max-w-60 truncate text-sm text-muted-foreground">
          {user.email}
        </p>
      ),
    },

    {
      id: "role",
      header: "Role",
      sortKey: "role",

      cell: (user) => (
        <RoleBadge
          role={user.role}
        />
      ),
    },

    {
      id: "status",
      header: "Status",
      sortKey: "status",

      cell: (user) => (
        <StatusBadge
          status={user.status}
        />
      ),
    },

    {
      id: "createdAt",
      header: "Created At",
      sortKey: "createdAt",
      headerClassName:
        "min-w-40",

      cell: (user) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-3.5 shrink-0" />

          <span>
            {formatDate(
              user.createdAt,
            )}
          </span>
        </div>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      headerClassName:
        "w-20 pr-6 text-right",
      cellClassName:
        "pr-6 text-right",

      cell: (user) => (
        <UserActions
          user={user}
        />
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b px-6 py-5 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-sm font-semibold">
            User Directory
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Manage users, roles
            and account access
            across your workspace.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500" />

          <span className="text-xs font-medium text-muted-foreground">
            {
              pagination.totalItems
            }{" "}
            {pagination.totalItems ===
            1
              ? "result"
              : "results"}
          </span>
        </div>
      </div>

      <DataTable
        data={users}
        columns={columns}
        getRowKey={(
          user,
        ) => user.id}
        currentSort={
          query.sort
        }
        currentOrder={
          query.order
        }
        getSortHref={(
          sort,
          order,
        ) =>
          buildSortHref(
            query,
            sort,
            order,
          )
        }
        rowClassName="
          group
          h-18
          transition-colors
          duration-200
          hover:bg-muted/25
        "
        emptyState={
          <EmptyUsers
            filtered={
              hasFilters
            }
          />
        }
        footer={
          <TableFooter
            query={query}
            pagination={
              pagination
            }
          />
        }
      />
    </div>
  );
}

function UserCell({
  user,
}: {
  user: User;
}) {
  const isAdmin =
    user.role.toLowerCase() ===
    "admin";

  const isActive =
    user.status.toLowerCase() ===
    "active";

  return (
    <div className="flex items-center gap-3.5">
      <div className="relative shrink-0">
        <Avatar className="size-10 border shadow-sm">
          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
            {getInitials(
              user.name,
            )}
          </AvatarFallback>
        </Avatar>

        <span
          className={`
            absolute
            bottom-0
            right-0
            size-3
            rounded-full
            border-2
            border-card
            ${
              isActive
                ? "bg-emerald-500"
                : "bg-muted-foreground"
            }
          `}
        />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <Link
            href={`/dashboard/users/${user.id}`}
            className="truncate text-sm font-medium transition-colors hover:text-primary"
          >
            {user.name}
          </Link>

          {isAdmin && (
            <ShieldCheck className="size-3.5 shrink-0 text-violet-500" />
          )}
        </div>

        <p className="mt-0.5 text-xs text-muted-foreground">
          ID #
          {String(
            user.id,
          ).padStart(
            4,
            "0",
          )}
        </p>
      </div>
    </div>
  );
}

function TableFooter({
  query,
  pagination,
}: {
  query: UserQuery;
  pagination: PaginationInfo;
}) {
  const {
    currentPage,
    totalPages,
    totalItems,
    pageSize,
  } = pagination;

  const start =
    totalItems === 0
      ? 0
      : (currentPage - 1) *
          pageSize +
        1;

  const end =
    totalItems === 0
      ? 0
      : Math.min(
          currentPage *
            pageSize,
          totalItems,
        );

  return (
    <div className="flex flex-col gap-4 border-t bg-muted/10 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {start}
          </span>
          {" – "}
          <span className="font-medium text-foreground">
            {end}
          </span>
          {" of "}
          <span className="font-medium text-foreground">
            {totalItems}
          </span>{" "}
          users
        </p>

        {totalPages > 1 && (
          <p className="mt-1 text-[11px] text-muted-foreground">
            Page{" "}
            {currentPage} of{" "}
            {totalPages}
          </p>
        )}
      </div>

      <UserPagination
        currentPage={
          currentPage
        }
        totalPages={
          totalPages
        }
        query={query}
      />
    </div>
  );
}

function buildSortHref(
  query: UserQuery,
  sort: UserSortKey,
  order: SortOrder,
) {
  const params =
    new URLSearchParams();

  if (query.search) {
    params.set(
      "search",
      query.search,
    );
  }

  if (query.role) {
    params.set(
      "role",
      query.role,
    );
  }

  if (query.status) {
    params.set(
      "status",
      query.status,
    );
  }

  params.set(
    "sort",
    sort,
  );

  params.set(
    "order",
    order,
  );

  /*
   * Sorting changes dataset order,
   * so pagination returns to page 1.
   */

  return `/dashboard/users?${params.toString()}`;
}

function RoleBadge({
  role,
}: {
  role: string;
}) {
  const normalized =
    role.toLowerCase();

  if (
    normalized === "admin"
  ) {
    return (
      <Badge
        variant="outline"
        className="gap-1.5 border-violet-500/20 bg-violet-500/10 px-2.5 py-1 font-medium text-violet-500"
      >
        <Crown className="size-3" />

        Admin
      </Badge>
    );
  }

  if (
    normalized ===
    "manager"
  ) {
    return (
      <Badge
        variant="outline"
        className="gap-1.5 border-blue-500/20 bg-blue-500/10 px-2.5 py-1 font-medium text-blue-500"
      >
        <ShieldCheck className="size-3" />

        Manager
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="gap-1.5 border-border bg-muted/50 px-2.5 py-1 font-medium text-muted-foreground"
    >
      <UserRound className="size-3" />

      {capitalize(role)}
    </Badge>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const isActive =
    status.toLowerCase() ===
    "active";

  return (
    <Badge
      variant="outline"
      className={
        isActive
          ? "gap-2 border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-500"
          : "gap-2 border-zinc-500/20 bg-zinc-500/10 px-2.5 py-1 font-medium text-muted-foreground"
      }
    >
      <span
        className={
          isActive
            ? "size-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"
            : "size-1.5 rounded-full bg-muted-foreground"
        }
      />

      {capitalize(status)}
    </Badge>
  );
}

function EmptyUsers({
  filtered,
}: {
  filtered: boolean;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl border bg-muted/50 shadow-sm">
        <UserRound className="size-5 text-muted-foreground" />
      </div>

      <p className="mt-4 text-sm font-medium">
        {filtered
          ? "No matching users"
          : "No users found"}
      </p>

      <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
        {filtered
          ? "Try changing your search term or clearing some filters."
          : "Users will appear here once they are added to your workspace."}
      </p>
    </div>
  );
}

function getInitials(
  name: string,
) {
  return name
    .trim()
    .split(/\s+/)
    .map(
      (part) =>
        part[0],
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function capitalize(
  value: string,
) {
  if (!value) {
    return "";
  }

  return (
    value
      .charAt(0)
      .toUpperCase() +
    value.slice(1)
  );
}

function formatDate(
  value?: string,
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}