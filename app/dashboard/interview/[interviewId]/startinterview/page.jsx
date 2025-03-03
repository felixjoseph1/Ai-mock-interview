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

const startInterview = () => {
  const params = useParams();
  const [interviewDetails, setInterviewDetails] = useState();
  const [InterviewQuestion, setInterviewQuestion] = useState();
  const [activeQuestionNumber, setActiveQuestionNumber] = useState(0);

  const router = useRouter();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  //Get interview details through interview id
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log(result[0]);
    if (result) {
      setInterviewDetails(result[0]);
      const jsonMockResp = JSON.parse(result[0]?.jsonMockResp);
      console.log(jsonMockResp);
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
        />
        <RecordingSection
          InterviewQuestion={InterviewQuestion}
          activeQuestionNumber={activeQuestionNumber}
          interviewDetails={interviewDetails}
        />
        {/* webcam */}
      </div>
      <div className="flex mt-12 gap-5 justify-end mr-6">
        {activeQuestionNumber != 0 && (
          <Button
            onClick={() => {
              setActiveQuestionNumber(activeQuestionNumber - 1);
            }}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionNumber != InterviewQuestion?.length - 1 && (
          <Button
            onClick={() => {
              setActiveQuestionNumber(activeQuestionNumber + 1);
            }}
          >
            Next Question
          </Button>
        )}
        <Link
          href={`/dashboard/interview/${interviewDetails?.mockId}/feedback`}
        >
          {activeQuestionNumber == InterviewQuestion?.length - 1 && (
            <Button>End Interview</Button>
          )}
        </Link>
      </div>
    </div>
  );
};

export default startInterview;
