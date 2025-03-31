"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordingSection from "./_components/RecordingSection";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { color } from "framer-motion";

const StartInterview = () => {
  const params = useParams();
  const [interviewDetails, setInterviewDetails] = useState();
  const [InterviewQuestion, setInterviewQuestion] = useState();
  const [activeQuestionNumber, setActiveQuestionNumber] = useState(0);

  const router = useRouter();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  // Get interview details through interview ID
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    if (result.length > 0) {
      setInterviewDetails(result[0]);
      const jsonMockResp = JSON.parse(result[0]?.jsonMockResp);
      setInterviewQuestion(jsonMockResp);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-15 gap-20">
        {/* Questions */}
        <QuestionSection
          InterviewQuestion={InterviewQuestion}
          activeQuestionNumber={activeQuestionNumber}
          setActiveQuestionNumber={setActiveQuestionNumber}
        />
        <RecordingSection
          InterviewQuestion={InterviewQuestion}
          activeQuestionNumber={activeQuestionNumber}
          interviewDetails={interviewDetails}
        />
      </div>

      {/* Button Section - Properly Aligned */}
      <div className="flex justify-between items-center mt-12 px-6 w-full h-12">
        {/* Previous Button (Always on Left) */}
        <Button
          className={`${
            activeQuestionNumber === 0 ? "invisible" : ""
          } cursor-pointer`}
          onClick={() => setActiveQuestionNumber((prev) => prev - 1)}
        >
          Previous Question
        </Button>

        {/* Next or End Interview Button (Always on Right) */}
        {activeQuestionNumber === InterviewQuestion?.length - 1 ? (
          <Link
            href={`/dashboard/interview/${interviewDetails?.mockId}/feedback`}
          >
            <Button className={"bg-red-700 hover:bg-red-700 cursor-pointer"}>
              End Interview
            </Button>
          </Link>
        ) : (
          <Button
            className={"cursor-pointer"}
            onClick={() => setActiveQuestionNumber((prev) => prev + 1)}
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
