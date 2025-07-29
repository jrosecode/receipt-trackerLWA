'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Trash2, Calendar, MapPin, Phone, DollarSign, Building2, Receipt, Sparkles, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { deleteReceipt } from "@/actions/deleteReceipt";
import { Id } from "@/convex/_generated/dataModel";

export default function ReceiptDetail() {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const receiptId = params.id as string;

  // Fetch the specific receipt
  const receipt = useQuery(api.receipts.getReceiptById, {
    receiptId: receiptId as Id<"receipts">,
  });

  // Fetch download URL
  const downloadUrl = useQuery(
    api.receipts.getReceiptDownloadUrl,
    receipt?.fileId ? { fileId: receipt.fileId } : "skip"
  );

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this receipt? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteReceipt(receiptId);
      if (result.success) {
        router.push("/receipts");
      } else {
        alert(`Failed to delete receipt: ${result.error}`);
      }
    } catch (error) {
      console.error("Failed to delete receipt:", error);
      alert("Failed to delete receipt. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = receipt?.fileName || 'receipt.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Show loading state
  if (receipt === undefined) {
    return (
      <div className="container xl:max-w-4xl mx-auto p-4 md:p-0">
        <div className="mb-6">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state
  if (receipt === null) {
    return (
      <div className="container xl:max-w-4xl mx-auto p-4 md:p-0">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
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
              <h3 className="text-lg font-semibold mb-2">Receipt not found</h3>
              <p className="text-muted-foreground mb-4">
                The receipt you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.
              </p>
              <Button onClick={() => router.push("/receipts")}>
                Back to Receipts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge variant="default" className="bg-success text-success-foreground">Processed</Badge>;
      case "pending":
        return (
          <Badge variant="secondary" className="bg-warning text-warning-foreground border-border">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Processing
          </Badge>
        );
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="container xl:max-w-4xl mx-auto p-4 md:p-0">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {receipt.fileDisplayName || receipt.fileName}
            </h1>
            <p className="text-muted-foreground">
              Uploaded on {format(new Date(receipt.uploadedAt), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
          {getStatusBadge(receipt.status)}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {receipt.status === "processed" && receipt.merchantName && (
            <>
              {/* Merchant Information */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle>Merchant Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-info/10 rounded-lg">
                        <Building2 className="h-4 w-4 text-info" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Merchant Name</p>
                        <p className="text-sm text-muted-foreground">{receipt.merchantName}</p>
                      </div>
                    </div>

                    {receipt.merchantAddress && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-info/10 rounded-lg">
                          <MapPin className="h-4 w-4 text-info" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">{receipt.merchantAddress}</p>
                        </div>
                      </div>
                    )}

                    {receipt.merchantContact && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-info/10 rounded-lg">
                          <Phone className="h-4 w-4 text-info" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Contact</p>
                          <p className="text-sm text-muted-foreground">{receipt.merchantContact}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Details */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Receipt className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle>Transaction Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {receipt.transactionAmount && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-info/10 rounded-lg">
                          <DollarSign className="h-4 w-4 text-info" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Amount</p>
                          <p className="text-sm text-muted-foreground">
                            {receipt.transactionAmount.toFixed(2)} {receipt.currency || "USD"}
                          </p>
                        </div>
                      </div>
                    )}

                    {receipt.transactionDate && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-info/10 rounded-lg">
                          <Calendar className="h-4 w-4 text-info" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Transaction Date</p>
                          <p className="text-sm text-muted-foreground">{receipt.transactionDate}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* AI Summary */}
              {receipt.receiptSummary && (
                <Card className="border-border bg-gradient-to-br from-link/5 via-info/5 to-link/10">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-gradient-to-br from-link to-info rounded-lg">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <CardTitle className="text-foreground">AI Summary</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-link/20">
                      <p className="text-sm text-foreground leading-relaxed">{receipt.receiptSummary}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Items Table */}
              {receipt.items && receipt.items.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Unit Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {receipt.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">
                              {item.unitPrice.toFixed(2)} {receipt.currency || "USD"}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {item.totalPrice.toFixed(2)} {receipt.currency || "USD"}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-bold">
                            Total
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {receipt.items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)} {receipt.currency || "USD"}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {receipt.status !== "processed" && (
            <Card>
              <CardHeader>
                <CardTitle>Receipt Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  {receipt.status === "pending" ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-warning/10 rounded-full">
                        <Loader2 className="h-8 w-8 text-warning animate-spin" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">Processing Receipt</h3>
                        <p className="text-muted-foreground">
                          We&apos;re analyzing your receipt. This usually takes a few moments.
                          Extracted data will appear here once complete.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-destructive/10 rounded-full">
                        <svg className="h-8 w-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-destructive">Processing Failed</h3>
                        <p className="text-muted-foreground">
                          Receipt processing failed. Please try uploading again.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* File Information */}
          <Card>
            <CardHeader>
              <CardTitle>File Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">File Name</span>
                <span className="text-sm font-medium truncate ml-2">{receipt.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">File Size</span>
                <span className="text-sm font-medium">{formatFileSize(receipt.size)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">File Type</span>
                <span className="text-sm font-medium">{receipt.mimeType}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleDownload}
                disabled={!downloadUrl}
                className="w-full"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full"
                variant="destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete Receipt"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}