"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      {/* Navbar */}
      <div className="absolute top-5 right-5">
        <UserButton />
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Boost Your <span className="text-blue-600">Confidence</span> in
          Virtual Interviews!
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          A cutting-edge self-assessment tool that evaluates your confidence in
          mock interviews using AI-powered facial and voice analysis.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-6 space-x-4">
          <Button
            onClick={() => {
              router.push("/dashboard/");
            }}
            className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Take a Mock Interview
          </Button>
          <Button
            onClick={() => {
              router.push("/confidence/");
            }}
            className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700 transition"
          >
            Upload Video for Confidence Analysis
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
