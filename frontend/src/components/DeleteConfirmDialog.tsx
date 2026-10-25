"use client";

import type {
  ReactNode,
} from "react";

import {
  AlertTriangle,
  Trash2,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Spinner,
} from "@/components/ui/spinner";

type DeleteConfirmDialogProps = {
  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;

  title: string;

  description: ReactNode;

  preview?: ReactNode;

  error?: string | null;

  isPending: boolean;

  onConfirm: () => void;

  confirmLabel?: string;

  pendingLabel?: string;
};

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  preview,
  error,
  isPending,
  onConfirm,
  confirmLabel = "Delete",
  pendingLabel = "Deleting...",
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(
        nextOpen,
      ) => {
        if (
          isPending
        ) {
          return;
        }

        onOpenChange(
          nextOpen,
        );
      }}
    >
      <AlertDialogContent
        size="sm"
        className="overflow-hidden"
      >
        <AlertDialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10">
            <AlertTriangle className="size-5 text-destructive" />
          </div>

          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="leading-6">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {preview}

        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2">
            <p className="text-xs text-destructive">
              {error}
            </p>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={
              isPending
            }
          >
            Cancel
          </AlertDialogCancel>

          <Button
            type="button"
            variant="destructive"
            disabled={
              isPending
            }
            onClick={
              onConfirm
            }
          >
            {isPending ? (
              <>
                <Spinner data-icon="inline-start" />

                {
                  pendingLabel
                }
              </>
            ) : (
              <>
                <Trash2 className="size-4" />

                {
                  confirmLabel
                }
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}