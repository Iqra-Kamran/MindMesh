// components/modals/UploadModal.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState,Dispatch, SetStateAction, useRef } from "react";
import { useUploadModalStore } from "@/lib/store/uploadModalStore";
import { FileUp } from "lucide-react";

interface UploadModalProps {
  onUpload: (file: File) => void;
}

export const UploadModal = ({ onUpload }: UploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { isOpen, close } = useUploadModalStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      close(); // Close modal from store
      setFile(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-[400px] flex flex-col justify-center bg-gradient-to-r from-black to-purple-900 items-center gap-4">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold mb-4">
            Upload a File 
            </DialogTitle>
        </DialogHeader>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />

         <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer border border-dashed border-gray-200 p-8 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 transition"
        >
          <FileUp className="w-10 h-10 text-gray-300 mb-2" />
          <p className="text-sm text-gray-300">{file ? file.name : "Click to choose a file"}</p>
        </div>

        <Button className="mt-4 text-black bg-gray-100 font-bold" onClick={handleUpload} disabled={!file}>
          Upload File
        </Button>
      </DialogContent>
    </Dialog>
  );
};
