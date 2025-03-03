import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onhandleFeedback = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  const onhandleStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/startinterview`);
  };

  return (
    <div className="flex flex-col border rounded-lg p-5 bg-white shadow-md hover:shadow-lg transition-all">
      <h2 className="text-lg font-semibold text-gray-900">
        {interview?.jobPosition}
      </h2>
      <p className="text-sm text-gray-600">
        Experience: {interview?.jobExperience} years
      </p>
      <p className="text-xs text-gray-500">
        Created on: {interview?.createdAt}
      </p>
      <div className="flex gap-4 mt-4 ">
        <Button
          onClick={() => {
            onhandleFeedback();
          }}
          size={"sm"}
          className={"w-full"}
        >
          Feedback
        </Button>
        <Button
          onClick={() => {
            onhandleStart();
          }}
          size={"sm"}
          className={"w-full"}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
