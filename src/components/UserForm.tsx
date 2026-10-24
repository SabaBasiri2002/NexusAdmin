"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  createUser,
  updateUser,
  type UserFormState,
} from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,  
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "@/types/user";

type UserFormProps = {
  mode?: "create" | "edit";
  user?: User;
};

type UserFormValues = NonNullable<UserFormState["values"]>;

const emptyValues: UserFormValues = {
  name: "",
  email: "",
  role: "",
  status: "",
};

export default function UserForm({
  mode = "create",
  user,
}: UserFormProps) {
  const initialValues = user
    ? {
        name: user.name,
        email: user.email,
        role: user.role.toLowerCase(),
        status: user.status.toLowerCase(),
      }
    : emptyValues;

  const initialState: UserFormState = {
    success: false,
    errors: {},
    message: "",
    values: initialValues,
  };

  const action =
    mode === "edit" && user
      ? updateUser.bind(null, user.id)
      : createUser;

  const [state, formAction, isPending] = useActionState(
    action,
    initialState,
  );
  const [values, setValues] = useState<UserFormValues>(initialValues);

  const updateValue = <Key extends keyof UserFormValues>(
    key: Key,
    value: UserFormValues[Key],
  ) => {
    setValues((currentValues: any) => ({
      ...currentValues,
      [key]: value,
    }));
  };

  const title = mode === "edit" ? "Update user" : "Create user";

  return (
    <form action={formAction} noValidate className="space-y-6">
      {state.message && (
        <div
          className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
            state.success
              ? "border-emerald-500/20 bg-emerald-500/10"
              : "border-destructive/20 bg-destructive/10"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
          )}
          <div>
            <p
              className={`text-sm font-medium ${
                state.success ? "text-emerald-500" : "text-destructive"
              }`}
            >
              {state.success ? "Saved successfully" : "Something needs attention"}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{state.message}</p>
          </div>
        </div>
      )}

      <FormSection
        icon={<UserRound className="size-4 text-muted-foreground" />}
        title="Account Information"
        description="Enter the basic information for this user."
      >
        <Field label="Full Name" htmlFor="name" error={state.errors?.name}>
          <Input
            id="name"
            name="name"
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            placeholder="e.g. Alex Morgan"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
          />
        </Field>

        <Field label="Email Address" htmlFor="email" error={state.errors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            placeholder="alex@example.com"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
          />
        </Field>
      </FormSection>

      <FormSection
        icon={<ShieldCheck className="size-4 text-muted-foreground" />}
        title="Access & Status"
        description="Configure the user&apos;s role and account status."
      >
        <div className="space-y-2">
          <Label>Role <Required /></Label>
          <Select
            name="role"
            value={values.role || null}
            onValueChange={(value) => updateValue("role", String(value ?? ""))}
          >
            <SelectTrigger
              className="h-11 w-full data-[placeholder]:text-muted-foreground"
              aria-invalid={Boolean(state.errors?.role)}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-muted-foreground" />
                <SelectValue placeholder="Select a role" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="user">Editor</SelectItem>
              <SelectItem value="user">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <FieldError errors={state.errors?.role} />
        </div>

        <div className="space-y-2">
          <Label>Status <Required /></Label>
          <Select
            name="status"
            value={values.status || null}
            onValueChange={(value) => updateValue("status", String(value ?? ""))}
          >
            <SelectTrigger
              className="h-11 w-full data-[placeholder]:text-muted-foreground"
              aria-invalid={Boolean(state.errors?.status)}
            >
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-muted-foreground" />
                <SelectValue placeholder="Select a status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Active
                </div>
              </SelectItem>
              <SelectItem value="inactive">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-muted-foreground" />
                  Inactive
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldError errors={state.errors?.status} />
        </div>
      </FormSection>

      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href={mode === "edit" && user ? `/dashboard/users/${user.id}` : "/dashboard/users"} />}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="min-w-32">
          {isPending ? (
            <>
              <Spinner data-icon="inline-start" />
              Saving...
            </>
          ) : (
            <>
              <Mail className="size-4" />
              {title}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section data-scroll-reveal="card" className="rounded-2xl border bg-card">
      <div className="border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border bg-muted/40">
            {icon}
          </div>
          <div>
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 p-6 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label} <Required /></Label>
      {children}
      <FieldError id={`${htmlFor}-error`} errors={error} />
    </div>
  );
}

function Required() {
  return <span className="ml-1 text-destructive">*</span>;
}

function FieldError({ id, errors }: { id?: string; errors?: string[] }) {
  if (!errors?.length) return null;

  return (
    <div id={id} className="flex items-center gap-1.5 text-xs text-destructive">
      <AlertCircle className="size-3.5 shrink-0" />
      <span>{errors[0]}</span>
    </div>
  );
}
