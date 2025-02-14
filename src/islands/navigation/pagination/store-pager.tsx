"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
  getNextStoreIdAction,
  getPreviousStoreIdAction,
} from "~/server/actions/store";
import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";

interface StorePagerProps {
  storeId: number;
  userId: string;
}

export function StorePager({ storeId, userId }: StorePagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="flex space-x-0.5 pr-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          startTransition(async () => {
            try {
              const prevStoreId = await getPreviousStoreIdAction({
                id: storeId,
                userId,
              });
              router.push(`/dashboard/stores/${prevStoreId}`);
            } catch (error) {
              error instanceof Error
                ? toast.error(error.message)
                : toast.error("Something went wrong, please try again.");
            }
          });
        }}
        disabled={isPending}
      >
        <Icons.chevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Previous store</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          startTransition(async () => {
            try {
              const nextStoreId = await getNextStoreIdAction({
                id: storeId,
                userId,
              });
              router.push(`/dashboard/stores/${nextStoreId}`);
            } catch (error) {
              error instanceof Error
                ? toast.error(error.message)
                : toast.error("Something went wrong, please try again.");
            }
          });
        }}
        disabled={isPending}
      >
        <Icons.chevronRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Next store</span>
      </Button>
    </div>
  );
}
