"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import convex from "@/lib/convexClient";
import { currentUser } from "@clerk/nextjs/server";

/**
 * Server action to delete a receipt
 */

export async function deleteReceipt(receiptId: Id<"receipts"> | string) {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await convex.mutation(api.receipts.deleteReceipt, {
      id: receiptId as Id<"receipts">,
      userId: user.id,
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting receipt", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}