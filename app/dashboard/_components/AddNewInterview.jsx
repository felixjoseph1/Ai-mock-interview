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
import { json } from "drizzle-orm/gel-core";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, Setloading] = useState(false);

  const onSubmit = async (e) => {
    Setloading(true);
    e.preventDefault();
    console.log(jobDescription, jobPosition, jobExperience);
    //const InputPrompt = `job position: ${jobPosition}, job description: ${jobDescription}, years of experience: ${jobExperience}. based on the above details. generate 5 interview questions with answers in json format`;
    const InputPrompt = `job position: ${jobPosition}, job description: ${jobDescription}, years of experience: ${jobExperience}.based on the above details, generate 5 interview questions with answers in json format. the answers should be easily parsable through JSON.parse()`;
    const result = await chatSession.sendMessage(InputPrompt);
    const JsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JsonResponse);
    console.log(JSON.parse(JsonResponse));
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
