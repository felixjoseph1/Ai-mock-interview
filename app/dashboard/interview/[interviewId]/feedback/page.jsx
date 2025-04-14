"use client";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { ChevronsUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Added error state
  const [avgRating,setAvgRating]=useState(0);

  useEffect(() => {
    GetFeedback();
  }, [params?.interviewId]);  // Depend on interviewId to refetch data when needed

  const GetFeedback = async () => {
    try {
      const Feedback = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer?.mockIdRef, params?.interviewId))
        .orderBy(UserAnswer?.id);
      console.log(Feedback);
      setFeedbackData(Feedback);
    } catch (err) {
      setError("Failed to fetch feedback data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feedbackData.length > 0) {
      const total = feedbackData.reduce((acc, item) => acc + Number(item.rating), 0);
      const average = Math.round(total / feedbackData.length);
      setAvgRating(average);
    }
  }, [feedbackData]);
  

  const handleNavigation = () => {
    router.replace("/dashboard/");
  };

  return (
    <div className="max-w-6xl mx-auto">
      {loading ? (
        <Skeleton className="h-40 w-full rounded-lg" />
      ) : error ? (  // Handle error state
        <div className="text-red-600">{error}</div>
      ) : feedbackData.length === 0 ? (
        <div className="flex flex-col items-left">
          <h2 className="text-xl font-bold">
            No Feedback data found!! Go back to take the interview.
          </h2>
          <Button
            onClick={handleNavigation}
            className="bg-blue-700 w-1/8 mt-8 ml-96"
          >
            Go Back
          </Button>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="text-left">
            <div className="flex justify-between">
              <h2 className="text-3xl text-green-600 font-bold">
                🎉 Congratulations!
              </h2>
              <Button onClick={handleNavigation} className="bg-blue-700">
                Go Home
              </Button>
            </div>
            <h2 className="text-xl font-semibold mt-2">
              Here is your interview feedback.
            </h2>
            <h2 className="text-lg font-medium text-gray-700 mt-1">
              Overall Rating: <span className="font-bold">{avgRating}/10</span>
            </h2>
            <p className="text-gray-600 mt-2">
              Below are the interview questions along with correct answers, your
              answers, and feedback for improvement.
            </p>
          </div>

          {/* Feedback Section */}
          <div className="mt-6 space-y-4">
            {feedbackData.map((item, index) => (
              <Collapsible
                key={index}
                className="border border-gray-300 rounded-lg shadow-sm p-4"
              >
                <CollapsibleTrigger className="w-full flex justify-between text-left font-medium text-lg text-gray-800 cursor-pointer">
                  <span>
                    {index + 1}. {item.question}
                  </span>
                  <ChevronsUpDown className="transition-transform duration-300 group-hover:rotate-180" />
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-3 rounded-lg">
                  <h3 className="text-blue-900 bg-blue-50 border rounded-lg p-2">
                    <strong>📊 Rating:</strong>{" "}
                    <span className="font-bold">{item.rating}/10</span>
                  </h3>
                  <h3 className="text-red-900 mt-2 border bg-red-50 rounded-lg p-2">
                    <strong>🗣️ Your Answer:</strong> <span>{item.userAns}</span>
                  </h3>
                  <h3 className="text-green-900 bg-green-50 mt-2 border rounded-lg p-2">
                    <strong>✅ Correct Answer:</strong>{" "}
                    <span>{item.correctAns}</span>
                  </h3>
                  <h3 className="text-blue-900 bg-blue-50 mt-2 border rounded-lg p-2">
                    <strong>📢 Feedback:</strong> <span>{item.feedback}</span>
                  </h3>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
