"use client";

import { useState } from "react";
import axios from "axios";
import MainLayout from "./_components/MainLayout";
import AnalysisResults from "./_components/AnalysisResults";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a video file.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(response.data);
    } catch (err) {
      setError("An error occurred while analyzing the video.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setResult(null);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {!result ? (
        <MainLayout
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      ) : (
        <AnalysisResults result={result} onGoBack={handleGoBack} />
      )}
    </div>
  );
}
