"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function ReceiptsList() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Fetch receipts for the current user
  const receipts = useQuery(
    api.receipts.getReceipts,
    isLoaded && user?.id ? { userId: user.id } : "skip"
  );

  const handleViewReceipt = (receiptId: string) => {
    router.push(`/receipts/${receiptId}`);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge variant="default" className="bg-success text-success-foreground">Processed</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Processing</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Show loading state while user is loading
  if (!isLoaded || receipts === undefined) {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-16" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  // Show empty state
  if (receipts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No receipts yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload your first receipt to get started with tracking your expenses.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Receipt</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receipts.map((receipt) => (
              <TableRow key={receipt._id}>
                <TableCell>
                  <div className="font-medium text-sm">
                    {receipt.fileDisplayName || receipt.fileName}
                  </div>
                </TableCell>
                <TableCell>
                  {receipt.status === "processed" && receipt.transactionAmount ? (
                    <span className="font-semibold text-highlight">
                      {receipt.currency || "$"}{receipt.transactionAmount.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {format(new Date(receipt.uploadedAt), "MMM d, yyyy")}
                  </span>
                </TableCell>
                <TableCell>
                  {getStatusBadge(receipt.status)}
                </TableCell>
                <TableCell>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(receipt.size)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewReceipt(receipt._id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}