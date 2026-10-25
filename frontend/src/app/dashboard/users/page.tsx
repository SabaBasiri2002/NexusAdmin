import Link from "next/link";

import {
  Activity,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import UserTable from "@/components/UserTable";
import UserToolbar from "@/components/UserToolbar";

import {
  getUsers,
} from "@/lib/data";

import type {
  User,
} from "@/types/user";

import {
  userSortFields,
  type SortOrder,
  type UserQuery,
  type UserSortKey,
} from "@/types/user-query";

type RawSearchParams =
  Record<
    string,
    | string
    | string[]
    | undefined
  >;

type UsersPageProps = {
  searchParams: Promise<RawSearchParams>;
};

const PAGE_SIZE = 10;

export default async function UsersPage({
  searchParams,
}: UsersPageProps) {
  const rawParams =
    await searchParams;

  const users =
    await getUsers();

  const query =
    normalizeQuery(
      rawParams,
    );

  const filteredUsers =
    filterUsers(
      users,
      query,
    );

  const sortedUsers =
    sortUsers(
      filteredUsers,
      query,
    );

  const totalFilteredUsers =
    sortedUsers.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalFilteredUsers / PAGE_SIZE,
    ),
  );

  const currentPage = Math.min(
    query.page,
    totalPages,
  );

  const visibleUsers =
    sortedUsers.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    );

  const totalUsers =
    users.length;

  const activeUsers =
    users.filter(
      (user) =>
        user.status.toLowerCase() ===
        "active",
    ).length;

  const admins =
    users.filter(
      (user) =>
        user.role.toLowerCase() ===
        "admin",
    ).length;

  const activePercentage =
    totalUsers > 0
      ? Math.round(
          (activeUsers /
            totalUsers) *
            100,
        )
      : 0;

  const stats = [
    {
      title:
        "Total Users",
      value:
        totalUsers,
      description:
        "All registered users",
      icon: Users,
    },

    {
      title:
        "Active Users",
      value:
        activeUsers,
      description:
        `${activePercentage}% of total users`,
      icon: UserCheck,
    },

    {
      title:
        "Administrators",
      value:
        admins,
      description:
        "Users with admin access",
      icon: ShieldCheck,
    },

    {
      title:
        "Activity Rate",
      value:
        `${activePercentage}%`,
      description:
        "Current active users",
      icon: Activity,
    },
  ];

  return (
    <main className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-card">
        <div data-scroll-parallax="18" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div data-scroll-parallax="-12" className="pointer-events-none absolute -bottom-32 left-1/3 size-64 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative px-7 py-8 lg:px-9 lg:py-9">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl border bg-background/70 shadow-sm backdrop-blur">
                  <Users className="size-4 text-primary" />
                </div>

                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  User Management
                </span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight">
                Users
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Search, filter,
                sort and manage
                users across your
                workspace.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3 rounded-2xl border bg-background/60 px-4 py-3 shadow-sm backdrop-blur">
                <div className="relative">
                  <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />

                  <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                    <Users className="size-4" />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Workspace users
                  </p>

                  <p className="text-sm font-semibold">
                    {totalUsers}{" "}
                    {totalUsers ===
                    1
                      ? "member"
                      : "members"}
                  </p>
                </div>
              </div>

              <Button
                nativeButton={
                  false
                }
                render={
                  <Link href="/dashboard/users/create" />
                }
                className="h-11"
              >
                <UserPlus className="size-4" />

                Create user
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(
          (stat) => {
            const Icon =
              stat.icon;

            return (
              <div
                key={
                  stat.title
                }
                data-scroll-reveal="card"
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-card
                  p-5
                  transition-all
                  duration-300
                  hover:border-foreground/15
                  hover:shadow-lg
                "
              >
                <div data-scroll-parallax="14" className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/10" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {
                        stat.title
                      }
                    </p>

                    <p className="mt-3 text-3xl font-semibold tracking-tight">
                      {
                        stat.value
                      }
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                      {
                        stat.description
                      }
                    </p>
                  </div>

                  <div className="flex size-10 items-center justify-center rounded-xl border bg-background shadow-sm">
                    <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </div>
                </div>
              </div>
            );
          },
        )}
      </section>

      {/* Users */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              All Users
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Search, filter
              and sort users
              using URL-based
              controls.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-lg border bg-card px-3 py-2 text-xs text-muted-foreground sm:flex">
            <span className="size-1.5 rounded-full bg-emerald-500" />

            {activeUsers} active
          </div>
        </div>

        <UserToolbar
          resultCount={
            totalFilteredUsers
          }
          totalCount={
            totalUsers
          }
        />

        <UserTable
          users={
            visibleUsers
          }
          query={query}
          pagination={{
            currentPage,
            totalPages,
            totalItems: totalFilteredUsers,
            pageSize: PAGE_SIZE,
          }}
        />
      </section>
    </main>
  );
}

function normalizeQuery(
  raw: RawSearchParams,
): UserQuery {
  const search =
    getParam(
      raw.search,
    )
      ?.trim()
      .toLowerCase() ||
    undefined;

  const rawRole =
    getParam(
      raw.role,
    )
      ?.trim()
      .toLowerCase();

  const role =
    rawRole ===
      "admin" ||
    rawRole ===
      "manager" ||
    rawRole ===
      "user"
      ? rawRole
      : undefined;

  const rawStatus =
    getParam(
      raw.status,
    )
      ?.trim()
      .toLowerCase();

  const status =
    rawStatus ===
      "active" ||
    rawStatus ===
      "inactive"
      ? rawStatus
      : undefined;

  const rawSort =
    getParam(
      raw.sort,
    );

  const sort =
    rawSort &&
    userSortFields.includes(
      rawSort as UserSortKey,
    )
      ? (rawSort as UserSortKey)
      : undefined;

  const rawOrder =
    getParam(
      raw.order,
    );

  const order: SortOrder =
    rawOrder === "desc"
      ? "desc"
      : "asc";

  const rawPage = Number.parseInt(
    getParam(raw.page) ?? "1",
    10,
  );

  const page =
    Number.isInteger(rawPage) && rawPage > 0
      ? rawPage
      : 1;

  return {
    search,
    role,
    status,
    sort,
    order,
    page,
  };
}

function filterUsers(
  users: User[],
  query: UserQuery,
) {
  return users.filter(
    (user) => {
      const search =
        query.search;

      const matchesSearch =
        !search ||
        user.name
          .toLowerCase()
          .includes(
            search,
          ) ||
        user.email
          .toLowerCase()
          .includes(
            search,
          );

      const matchesRole =
        !query.role ||
        user.role
          .toLowerCase() ===
          query.role;

      const matchesStatus =
        !query.status ||
        user.status
          .toLowerCase() ===
          query.status;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    },
  );
}

function sortUsers(
  users: User[],
  query: UserQuery,
) {
  if (!query.sort) {
    return users;
  }

  const direction =
    query.order === "desc"
      ? -1
      : 1;

  return [...users].sort(
    (a, b) => {
      if (
        query.sort ===
        "createdAt"
      ) {
        const left =
          a.createdAt
            ? Date.parse(
                a.createdAt,
              )
            : 0;

        const right =
          b.createdAt
            ? Date.parse(
                b.createdAt,
              )
            : 0;

        return (
          (left -
            right) *
          direction
        );
      }

      const field =
        query.sort;

      if (!field) {
        return 0;
      }

      const left =
        a[field] ?? "";

      const right =
        b[field] ?? "";

      return (
        String(left).localeCompare(
          String(right),
          undefined,
          {
            sensitivity:
              "base",
            numeric: true,
          },
        ) * direction
      );
    },
  );
}

function getParam(
  value:
    | string
    | string[]
    | undefined,
) {
  if (
    Array.isArray(
      value,
    )
  ) {
    return value[0];
  }

  return value;
}
