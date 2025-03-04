"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const UploadForm = ({ onFileChange, onSubmit, loading, error }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-lg bg-white w-full max-w-lg">
      <Input type="file" onChange={handleFileSelect} ref={fileInputRef} />
      <Button onClick={onSubmit} disabled={loading} className="w-full">
        {loading ? <Loader2 className="animate-spin" /> : "Upload & Analyze"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UploadForm;
