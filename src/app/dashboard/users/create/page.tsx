import { ArrowLeft, BadgeCheck, ShieldCheck, UserPlus } from "lucide-react";
import Link from "next/link";

import UserForm from "@/components/UserForm";
import { Button } from "@/components/ui/button";

export default function CreateUserPage() {
  return (
    <main className="space-y-8">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border bg-card">
        <div data-scroll-parallax="18" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative px-7 py-8 lg:px-9 lg:py-9">
          <div className="flex flex-col gap-6">
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 mb-5 text-muted-foreground border border-black hover:border-amber-500 hover:text-amber-500 rounded-xl"
                nativeButton={false}
                render={<Link href="/dashboard/users" />}
              > 
                <ArrowLeft className="size-4" />
                Back
              </Button>

              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border bg-background/70 shadow-sm backdrop-blur">
                  <UserPlus className="size-5 text-primary" />
                </div>

                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      User Management
                    </span>
                  </div>

                  <h1 className="text-3xl font-semibold tracking-tight">
                    Create New User
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        {/* Form */}
        <UserForm />

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex size-10 items-center justify-center rounded-xl border bg-muted/40">
              <ShieldCheck className="size-4 text-muted-foreground" />
            </div>

            <h3 className="mt-4 text-sm font-semibold">Account permissions</h3>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Roles determine what users can access and manage throughout the
              dashboard.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-emerald-500" />

              <h3 className="text-sm font-semibold">Before creating</h3>
            </div>

            <div className="mt-4 space-y-3">
              <CheckItem text="Use a valid email address" />
              <CheckItem text="Choose the correct access role" />
              <CheckItem text="Confirm the account status" />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />

      <p className="text-xs leading-5 text-muted-foreground">{text}</p>
    </div>
  );
}
