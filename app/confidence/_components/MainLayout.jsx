"use client";
import React from "react";
import Header from "./Header";
import UploadForm from "./UploadForm";

const MainLayout = ({ onFileChange, onSubmit, loading, error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Header />
      <UploadForm
        onFileChange={onFileChange}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default MainLayout;
