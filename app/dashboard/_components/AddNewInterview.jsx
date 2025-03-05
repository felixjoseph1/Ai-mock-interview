"use client";
import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/geminiModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, Setloading] = useState(false);
  const router = useRouter();

  const { user } = useUser();

  const onSubmit = async (e) => {
    Setloading(true);
    e.preventDefault();
    console.log(jobDescription, jobPosition, jobExperience);
    //const InputPrompt = `job position: ${jobPosition}, job description: ${jobDescription}, years of experience: ${jobExperience}. based on the above details. generate 5 interview questions with answers in json format`;
    //const InputPrompt = `job position: ${jobPosition}, job description: ${jobDescription}, years of experience: ${jobExperience}.based on the above details, generate 5 interview questions with answers in json format. the answers should be easily parsable through JSON.parse()`;
    const InputPrompt = `Generate exactly 5 interview questions based on the given details:
- Job Position: ${jobPosition}
- Job Description: ${jobDescription}
- Years of Experience: ${jobExperience}

Return the output in **valid JSON format** as an **array of objects**. Each object should contain exactly two fields:
1. **"question"** - A well-structured interview question.
2. **"answer"** - A detailed answer with at least 3 lines and at most 4 lines.

Ensure that:
- No additional fields are included.
- The output is a **valid JSON array** that can be parsed using \`JSON.parse()\`.

**Example Output Format:**
\`\`\`json
[
  {
    "question": "What is your approach to debugging complex software issues?",
    "answer": "I first reproduce the issue and analyze logs to identify patterns. Next, I isolate the faulty module using debugging tools. Finally, I implement and test a fix, ensuring it doesn't introduce regressions."
  },
    for all questions
]
\`\`\`

Strictly adhere to this format. Do not add explanations or extra fields.`;

    const result = await chatSession.sendMessage(InputPrompt);
    const JsonResponse = result.response
      .text()
      .replace(/\*\s/g, "")
      .replace(/```json/g, "")
      .replace(/```/g, "");
    console.log(JsonResponse);
    console.log(JSON.parse(JsonResponse));

    if (JsonResponse) {
      const db_response = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JsonResponse,
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });
      console.log(db_response);

      if (db_response) {
        await setOpenDialog(false);
        router.push("/dashboard/interview/" + db_response[0]?.mockId);
      }
    } else {
      alert("Something went wrong!!.Try again.");
    }

    Setloading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-gray-100 hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <h2 className="text-lg  text-center"> + Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className={`!max-w-2xl`}>
          <DialogHeader>
            <DialogTitle className={`text-2xl`}>
              Tell us more about the job you are Interviewing
            </DialogTitle>
            <DialogDescription>
              Add details about your job position/role , Job description and
              years of experience
            </DialogDescription>
            <form onSubmit={onSubmit}>
              <div className="mt-5 my-5">
                <label>Job role/Job Position</label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  required
                  onChange={(event) => {
                    setJobPosition(event.target.value);
                  }}
                />
              </div>
              <div className=" my-5">
                <label>Job Description/Tech Stack (In Short)</label>
                <Textarea
                  placeholder="Ex. React, NodeJs, MongoDB, MySQL"
                  required
                  onChange={(event) => {
                    setJobDescription(event.target.value);
                  }}
                />
              </div>
              <div className="my-5">
                <label>Years of Experience</label>
                <Input
                  type="number"
                  placeholder="Ex. 2"
                  max="40"
                  required
                  onChange={(event) => {
                    setJobExperience(event.target.value);
                  }}
                />
              </div>
              <div className="flex gap-5 justify-end">
                <Button
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                  variant="ghost"
                  className="focus-visible:ring-0 focus-visible:ring-offset-0  hover:text-red-700"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                      Generating from AI
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
