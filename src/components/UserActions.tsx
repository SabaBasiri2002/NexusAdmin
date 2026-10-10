"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

// import { deleteUser } from "@/action/user-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";

type UserActionsProps = {
  user: User;
};

export default function UserActions({ user }: UserActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (isPending || !window.confirm(`Delete ${user.name}?`)) {
      return;
    }

    // startTransition(async () => {
    //   const result = await deleteUser(user.id);

    //   if (result.success) {
    //     router.refresh();
    //   }
    // });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Actions for ${user.name}`}
            disabled={isPending}
          />
        }
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          render={
            <Link
              href={`/dashboard/users/${user.id}`}
              className="flex w-full items-center gap-2"
            />
          }
        >
          <Eye className="size-4" />
          View details
        </DropdownMenuItem>

        <DropdownMenuItem
          render={
            <Link
              href={`/dashboard/users/${user.id}/edit`}
              className="flex w-full items-center gap-2"
            />
          }
        >
          <Pencil className="size-4" />
          Edit user
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          disabled={isPending}
          onClick={handleDelete}
          className="gap-2"
        >
          <Trash2 className="size-4" />
          {isPending ? "Deleting..." : "Delete user"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
