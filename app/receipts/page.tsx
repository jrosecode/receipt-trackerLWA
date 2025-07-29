'use client';

import PDFDropzone from "@/components/PDFDropzone";
import ReceiptsList from "@/components/ReceiptsList";
import React from "react";

function Receipts() {
  return (
    <div className="container xl:max-w-5xl mx-auto p-4 md:p-0">
      <h1 className="text-2xl font-bold mb-4 my-8">My Receipts</h1>
      <p className="text-gray-600 mb-8">
        View and manage your receipts here.
      </p>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Upload New Receipt</h2>
        <PDFDropzone />
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Your Receipts</h2>
        <ReceiptsList />
      </div>
    </div>
  );
}

export default Receipts;
