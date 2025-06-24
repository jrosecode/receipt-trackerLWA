import React, { useCallback, useRef, useState } from 'react';
import { useDroppable, DndContext } from '@dnd-kit/core';
import { Button } from './ui/button';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';
import { uploadPDF } from '@/actions/uploadPDF';

function PDFDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // dnd-kit droppable setup
  const { setNodeRef, isOver: dndIsOver } = useDroppable({ id: 'pdf-dropzone' });

  // Combine dnd-kit and local state for highlight
  const highlight = isOver || dndIsOver;

  const handleFileUpload = useCallback(async (selectedFile: File) => {
    if (!selectedFile || selectedFile.type !== 'application/pdf') {
      toast.error('Please select a valid PDF file.');
      return;
    }

    setIsUploading(true);
    setFile(selectedFile);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const result = await uploadPDF(formData);

      if (result.success) {
        toast.success(`PDF uploaded successfully! Receipt ID: ${result.data?.receiptId}`);
        // Reset file state after successful upload
        setFile(null);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      } else {
        toast.error(result.error || 'Failed to upload PDF');
        setFile(null);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred while uploading the PDF');
      setFile(null);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileUpload(droppedFile);
    }
  }, [handleFileUpload]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsOver(false);
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      handleFileUpload(selected);
    }
  }, [handleFileUpload]);

  return (
    <DndContext>
      <div className="flex flex-col items-center gap-4 w-full">
        <div
          ref={node => {
            setNodeRef(node);
          }}
          className={`w-full max-w-md border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer min-h-[200px] ${highlight ? 'border-primary bg-primary/10' : 'border-muted'} ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => !isUploading && inputRef.current?.click()}
          tabIndex={0}
          role="button"
          aria-label="Upload PDF"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-muted-foreground mb-2 text-center">
              {isUploading
                ? <div className="w-4 h-4 border-2 border-muted-foreground border-t-primary rounded-full animate-spin"></div>
                : file
                  ? `Selected: ${file.name}`
                  : 'Drag and drop a PDF here, or click to select'
              }
            </span>
            <Button
              type="button"
              variant="outline"
              className="mt-2 pointer-events-none"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Choose PDF'}
            </Button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={onFileChange}
            disabled={isUploading}
          />
        </div>
        <Toaster position="top-center" richColors closeButton />
      </div>
    </DndContext>
  );
}

export default PDFDropzone;