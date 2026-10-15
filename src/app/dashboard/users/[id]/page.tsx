import Link from "next/link";
import { notFound } from "next/navigation";

import type { LucideIcon } from "lucide-react";

import {
  Activity,
  ArrowLeft,
  AtSign,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  Mail,
  Pencil,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getUserById } from "@/lib/users";

type UserDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  const isActive =
    user.status.toLowerCase() === "active";

  return (
    <main className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          nativeButton={false}
          render={
            <Link href="/dashboard/users" />
          }
          className="-ml-3 text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to users
        </Button>

        <Button
          nativeButton={false}
          render={
            <Link
              href={`/dashboard/users/${user.id}/edit`}
            />
          }
        >
          <Pencil className="size-4" />
          Edit User
        </Button>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-card">
        <div data-scroll-parallax="18" className="pointer-events-none absolute -right-24 -top-32 size-80 rounded-full bg-primary/10 blur-3xl" />

        <div data-scroll-parallax="-12" className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative px-6 py-7 md:px-8 md:py-9">
          {/* Breadcrumb */}
          <div className="mb-7 flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="size-3.5" />

            <span>
              Users
            </span>

            <span>/</span>

            <span className="font-medium text-foreground">
              {user.name}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            {/* Profile */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative w-fit">
                <Avatar className="size-20 border-4 border-background shadow-xl">
                  <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <span
                  className={`
                    absolute bottom-1 right-1 size-4 rounded-full
                    border-4 border-card
                    ${
                      isActive
                        ? "bg-emerald-500"
                        : "bg-muted-foreground"
                    }
                  `}
                />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {user.name}
                  </h1>

                  <RoleBadge role={user.role} />
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="size-4 shrink-0" />

                  <span className="truncate">
                    {user.email}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <StatusBadge
                    status={user.status}
                  />

                  <Badge
                    variant="outline"
                    className="gap-1.5 bg-background/50"
                  >
                    <Fingerprint className="size-3" />

                    ID #{String(user.id).padStart(4, "0")}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="min-w-64 rounded-2xl border bg-background/60 p-4 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex size-11 items-center justify-center rounded-xl
                    ${
                      isActive
                        ? "bg-emerald-500/10"
                        : "bg-muted"
                    }
                  `}
                >
                  {isActive ? (
                    <CheckCircle2 className="size-5 text-emerald-500" />
                  ) : (
                    <Activity className="size-5 text-muted-foreground" />
                  )}
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Account status
                  </p>

                  <p className="mt-0.5 text-sm font-semibold">
                    {capitalize(user.status)}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-px bg-border" />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Workspace access
                </span>

                <span className="text-xs font-medium">
                  {capitalize(user.role)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="grid gap-4 md:grid-cols-3">
        <OverviewCard
          icon={Fingerprint}
          label="User ID"
          value={`#${String(user.id).padStart(4, "0")}`}
          description="Unique account identifier"
        />

        <OverviewCard
          icon={ShieldCheck}
          label="Access Role"
          value={capitalize(user.role)}
          description={getShortRoleDescription(
            user.role,
          )}
        />

        <OverviewCard
          icon={Activity}
          label="Account Status"
          value={capitalize(user.status)}
          description={
            isActive
              ? "Account currently has access"
              : "Account access is currently disabled"
          }
        />
      </section>

      {/* Main Content */}
      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Left */}
        <div className="space-y-6">
          {/* Account Information */}
          <div className="overflow-hidden rounded-2xl border bg-card">
            <SectionHeader
              icon={UserRound}
              title="Account Information"
              description="Personal and account information associated with this user."
            />

            <div className="grid gap-px bg-border md:grid-cols-2">
              <InfoItem
                icon={UserRound}
                label="Full Name"
                value={user.name}
              />

              <InfoItem
                icon={Mail}
                label="Email Address"
                value={user.email}
              />

              <InfoItem
                icon={Fingerprint}
                label="User ID"
                value={`#${String(user.id).padStart(4, "0")}`}
              />

              <InfoItem
                icon={Activity}
                label="Account Status"
                value={capitalize(user.status)}
              />
            </div>
          </div>

          {/* Access */}
          <div className="overflow-hidden rounded-2xl border bg-card">
            <SectionHeader
              icon={ShieldCheck}
              title="Access & Permissions"
              description="Role and workspace access assigned to this account."
            />

            <div className="p-6">
              <div className="flex flex-col justify-between gap-5 rounded-2xl border bg-muted/20 p-5 sm:flex-row sm:items-center">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm">
                    <KeyRound className="size-5 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Assigned Role
                    </p>

                    <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
                      {getRoleDescription(
                        user.role,
                      )}
                    </p>
                  </div>
                </div>

                <RoleBadge
                  role={user.role}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <aside className="space-y-6 xl:sticky xl:top-6">
          {/* Profile */}
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-2">
              <AtSign className="size-4 text-muted-foreground" />

              <h2 className="text-sm font-semibold">
                Profile Summary
              </h2>
            </div>

            <div className="mt-6 flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="size-20 border shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <span
                  className={`
                    absolute bottom-0 right-0 size-4 rounded-full
                    border-4 border-card
                    ${
                      isActive
                        ? "bg-emerald-500"
                        : "bg-muted-foreground"
                    }
                  `}
                />
              </div>

              <h3 className="mt-4 font-semibold">
                {user.name}
              </h3>

              <p className="mt-1 max-w-full truncate text-sm text-muted-foreground">
                {user.email}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <RoleBadge
                  role={user.role}
                />

                <StatusBadge
                  status={user.status}
                />
              </div>
            </div>
          </div>

          {/* Access Overview */}
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                <ShieldCheck className="size-4 text-primary" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Access Overview
                </h2>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Current workspace access
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <SummaryRow
                label="Role"
                value={capitalize(user.role)}
              />

              <SummaryRow
                label="Status"
                value={capitalize(user.status)}
              />

              <SummaryRow
                label="User ID"
                value={`#${String(user.id).padStart(4, "0")}`}
              />
            </div>

            <Button
              variant="outline"
              nativeButton={false}
              render={
                <Link
                  href={`/dashboard/users/${user.id}/edit`}
                />
              }
              className="mt-6 w-full"
            >
              <Pencil className="size-4" />
              Edit Account
            </Button>
          </div>
        </aside>
      </section>
    </main>
  );
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            {label}
          </p>

          <p className="mt-2 text-lg font-semibold tracking-tight">
            {value}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm">
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl border bg-muted/40">
          <Icon className="size-4 text-muted-foreground" />
        </div>

        <div>
          <h2 className="text-sm font-semibold">
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-card p-6 transition-colors hover:bg-muted/10">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/30">
          <Icon className="size-4 text-muted-foreground" />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-medium">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0">
      <span className="text-xs text-muted-foreground">
        {label}
      </span>

      <span className="text-xs font-medium">
        {value}
      </span>
    </div>
  );
}

function RoleBadge({
  role,
}: {
  role: string;
}) {
  const normalizedRole =
    role.toLowerCase();

  if (normalizedRole === "admin") {
    return (
      <Badge
        variant="outline"
        className="gap-1.5 border-violet-500/20 bg-violet-500/10 text-violet-500"
      >
        <ShieldCheck className="size-3" />
        Admin
      </Badge>
    );
  }

  if (
    normalizedRole === "manager"
  ) {
    return (
      <Badge
        variant="outline"
        className="gap-1.5 border-blue-500/20 bg-blue-500/10 text-blue-500"
      >
        <ShieldCheck className="size-3" />
        Manager
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="gap-1.5 bg-muted/40 text-muted-foreground"
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
          ? "gap-1.5 border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
          : "gap-1.5 border-border bg-muted text-muted-foreground"
      }
    >
      <span
        className={
          active
            ? "size-1.5 rounded-full bg-emerald-500"
            : "size-1.5 rounded-full bg-muted-foreground"
        }
      />

      {capitalize(status)}
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

function capitalize(
  value: string,
) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

function getRoleDescription(
  role: string,
) {
  switch (role.toLowerCase()) {
    case "admin":
      return "Full administrative access across the workspace, including user and resource management.";

    case "manager":
      return "Can manage workspace resources and users with limited administrative privileges.";

    default:
      return "Standard access to the workspace and available user-level features.";
  }
}

function getShortRoleDescription(
  role: string,
) {
  switch (role.toLowerCase()) {
    case "admin":
      return "Full workspace access";

    case "manager":
      return "Management access";

    default:
      return "Standard workspace access";
  }
}
