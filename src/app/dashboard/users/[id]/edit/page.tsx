import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  BadgeCheck,
  Fingerprint,
  Mail,
  Pencil,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import UserForm from "@/components/UserForm";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getUserById } from "@/lib/users";

type EditUserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUserPage({
  params,
}: EditUserPageProps) {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  const isActive =
    user.status.toLowerCase() === "active";

  return (
    <main className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          nativeButton={false}
          render={
            <Link
              href={`/dashboard/users/${user.id}`}
            />
          }
          className="-ml-3 text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to user
        </Button>

        <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
          <span>Users</span>
          <span>/</span>
          <span>{user.name}</span>
          <span>/</span>

          <span className="font-medium text-foreground">
            Edit
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-card">
        <div data-scroll-parallax="18" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary/10 blur-3xl" />

        <div data-scroll-parallax="-12" className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative px-6 py-7 md:px-8 md:py-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            {/* Left */}
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border bg-background/70 shadow-sm backdrop-blur">
                <Pencil className="size-5 text-primary" />
              </div>

              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    User Management
                  </span>

                  <span className="size-1 rounded-full bg-muted-foreground/50" />

                  <span className="text-xs text-muted-foreground">
                    ID #{String(user.id).padStart(4, "0")}
                  </span>
                </div>

                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Edit User
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  Update {user.name}&apos;s profile,
                  access role and account status.
                </p>
              </div>
            </div>

            {/* Current status */}
            <div className="flex items-center gap-3 rounded-2xl border bg-background/60 px-4 py-3 shadow-sm backdrop-blur">
              <div
                className={`
                  flex size-10 items-center justify-center rounded-xl
                  ${
                    isActive
                      ? "bg-emerald-500/10"
                      : "bg-muted"
                  }
                `}
              >
                <span
                  className={`
                    size-2.5 rounded-full
                    ${
                      isActive
                        ? "bg-emerald-500"
                        : "bg-muted-foreground"
                    }
                  `}
                />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Current status
                </p>

                <p className="mt-0.5 text-sm font-semibold capitalize">
                  {user.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Form */}
        <UserForm
          mode="edit"
          user={user}
        />

        {/* Sidebar */}
        <aside className="space-y-4 xl:sticky xl:top-6">
          {/* User Preview */}
          <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="border-b px-5 py-4">
              <div className="flex items-center gap-2">
                <UserRound className="size-4 text-muted-foreground" />

                <h2 className="text-sm font-semibold">
                  Current Profile
                </h2>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="size-12 border shadow-sm">
                    <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <span
                    className={`
                      absolute bottom-0 right-0 size-3.5 rounded-full
                      border-2 border-card
                      ${
                        isActive
                          ? "bg-emerald-500"
                          : "bg-muted-foreground"
                      }
                    `}
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {user.name}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <RoleBadge role={user.role} />

                <StatusBadge status={user.status} />
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2">
              <Fingerprint className="size-4 text-muted-foreground" />

              <h2 className="text-sm font-semibold">
                Account Overview
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <InfoRow
                icon={Fingerprint}
                label="User ID"
                value={`#${String(user.id).padStart(4, "0")}`}
              />

              <InfoRow
                icon={Mail}
                label="Email"
                value={user.email}
              />

              <InfoRow
                icon={ShieldCheck}
                label="Role"
                value={user.role}
              />
            </div>
          </div>

          {/* Notice */}
          <div className="rounded-2xl border bg-muted/20 p-5">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <BadgeCheck className="size-4 text-emerald-500" />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Editing existing user
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                  Saved changes will replace the
                  user&apos;s current account
                  information.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Fingerprint;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted/30">
        <Icon className="size-3.5 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

function RoleBadge({
  role,
}: {
  role: string;
}) {
  const normalized =
    role.toLowerCase();

  if (normalized === "admin") {
    return (
      <Badge
        variant="outline"
        className="border-violet-500/20 bg-violet-500/10 text-violet-500"
      >
        <ShieldCheck className="size-3" />
        Admin
      </Badge>
    );
  }

  if (normalized === "manager") {
    return (
      <Badge
        variant="outline"
        className="border-blue-500/20 bg-blue-500/10 text-blue-500"
      >
        <ShieldCheck className="size-3" />
        Manager
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="bg-muted/40 text-muted-foreground"
    >
      <UserRound className="size-3" />
      User
    </Badge>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const active =
    status.toLowerCase() === "active";

  return (
    <Badge
      variant="outline"
      className={
        active
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
          : "border-border bg-muted text-muted-foreground"
      }
    >
      <span
        className={
          active
            ? "size-1.5 rounded-full bg-emerald-500"
            : "size-1.5 rounded-full bg-muted-foreground"
        }
      />

      {status}
    </Badge>
  );
}

function getInitials(
  name: string,
) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
