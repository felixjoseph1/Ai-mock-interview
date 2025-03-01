"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { ArrowRight, Lightbulb, WebcamIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = () => {
  const params = useParams();
  const [interviewDetails, setInterviewDetails] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log(result[0]);
    if (result) {
      setInterviewDetails(result[0]);
      console.log(interviewDetails);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 mt-[-24px]">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 self-start mx-16 ">
        Let's Get Started
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 w-full max-w-4xl">
        {/* Job Details Section */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <div className="bg-white shadow-lg rounded-xl p-6 border">
            <h2 className="text-lg font-semibold text-gray-700">
              Job Position:{" "}
              <span className="text-gray-900">
                {interviewDetails?.jobPosition}
              </span>
            </h2>
            <h2 className="text-lg font-semibold text-gray-700">
              Tech Stack:{" "}
              <span className="text-gray-900">{interviewDetails?.jobDesc}</span>
            </h2>
            <h2 className="text-lg font-semibold text-gray-700">
              Experience:{" "}
              <span className="text-gray-900">
                {interviewDetails?.jobExperience} years
              </span>
            </h2>
          </div>

          <div className=" shadow-lg rounded-xl p-6 border bg-yellow-200">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-950 pb-2">
              <Lightbulb className="text-yellow-500" /> Instructions
            </h2>
            <p className="text-gray-950 text-justify">
              {process.env.NEXT_PUBLIC_INSTRUCTIONS}
            </p>
          </div>
        </div>

        {/* Webcam & Button Section */}
        <div className="flex flex-col items-center w-full max-w-xl">
          <div className="flex items-center justify-center border h-80 w-[427px] bg-white shadow-lg rounded-xl">
            {webCamEnabled ? (
              <Webcam mirrored={true} className="h-80 w-full rounded-xl" />
            ) : (
              <WebcamIcon className="h-20 w-20 text-gray-400" />
            )}
          </div>
          {webCamEnabled ? (
            <Button className="mt-16 px-12 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all flex items-center gap-2">
              Start Interview <ArrowRight className="mt-0.5" />
            </Button>
          ) : (
            <Button
              className="mt-16 px-12 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
              onClick={() => setWebCamEnabled(true)}
            >
              Enable WebCam and Microphoneee
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;
