"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { Key } from "lucide-react";

const InterviewList = () => {
  const { user } = useUser();

  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const interviews = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview?.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));
    //console.log(interviews);
    setInterviewList(interviews);
  };
  return (
    <div className="pt-2">
      <h2 className="text-2xl font-bold text-gray-800 my-4">
        Previous Interviews
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {interviewList &&
          interviewList.map((item, index) => (
            <InterviewItemCard key={index} interview={item} />
          ))}
      </div>
    </div>
  );
};

export default InterviewList;
