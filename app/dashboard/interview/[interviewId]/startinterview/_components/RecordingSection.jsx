import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/geminiModal";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { CircleStop, LoaderCircle, Mic, WebcamIcon } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

const RecordingSection = (props) => {
  const { InterviewQuestion, activeQuestionNumber, interviewDetails } = props;
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const ConvertSpeechToText = async () => {
    if (isRecording) {
      stopSpeechToText();
      setLoading(true); // Ensure loading is set to true before API calls

      if (userAnswer.length < 10) {
        toast.error("Sorry, your response was not recorded. Please try again.");
        setLoading(false); // Reset loading if validation fails
        return;
      }

      try {
        const FeedbackPrompt = `Evaluate my interview response and provide feedback in JSON format.

Question: "${InterviewQuestion?.[activeQuestionNumber]?.question}"  
My Answer: "${userAnswer}"  

Assess my response based on **relevance, clarity, technical accuracy, and completeness**. Provide **specific suggestions** on how to improve my answer for this question in a **maximum of 6 lines**. Additionally, provide an example of a well-structured and correct answer.  

The response must be **valid JSON** with three fields:  
- **rating** (integer, scale of 1 to 10)  
- **feedback** (string, containing evaluation and how to improve my response)  
- **example_answer** (string, a well-structured and technically accurate answer for the question)  

Example response:  
{  
  "rating": 7,  
  "feedback": "Your answer is partially correct but lacks depth. Start by defining the concept clearly, then explain step by step. Include technical details or examples for better clarity.",  
  "example_answer": "A binary search tree (BST) is a data structure where each node has at most two children: a left child with smaller values and a right child with larger values. To insert an element, compare it with the root, then traverse left or right recursively until an empty spot is found."  
}  

Ensure the output is **only valid JSON** without extra text.`;

        // Send prompt to Gemini
        const GeminiResponse = await chatSession.sendMessage(FeedbackPrompt);
        const rawTextResponse = await GeminiResponse.response.text();

        // Clean and parse response
        const CleanedResponse = rawTextResponse
          .replace(/\*\s/g, "")
          .replace(/```json/g, "")
          .replace(/```/g, "");

        const ParsedResponse = JSON.parse(CleanedResponse);
        console.log("Parsed Response:", ParsedResponse);

        if (
          !ParsedResponse.rating ||
          !ParsedResponse.feedback ||
          !ParsedResponse.example_answer
        ) {
          throw new Error("Invalid response format from Gemini API");
        }

        // Insert into DB
        const db_response = await db.insert(UserAnswer).values({
          mockIdRef: interviewDetails?.mockId || "unknown_mock_id",
          question:
            InterviewQuestion?.[activeQuestionNumber]?.question ||
            "Unknown Question",
          correctAns:
            InterviewQuestion?.[activeQuestionNumber]?.answer ||
            "No correct answer",
          userAns: userAnswer,
          feedback: ParsedResponse.feedback,
          rating: ParsedResponse.rating,
          example_answer: ParsedResponse.example_answer,
          userEmail: user?.primaryEmailAddress?.emailAddress || "unknown_email",
          createdAt: moment().format("DD-MM-YYYY"),
        });

        console.log("Data inserted successfully!");

        if (db_response) {
          toast.success("Your answer was recorded successfully");
          setUserAnswer("");
          setResults([]);
        } else {
          toast.error(
            "Sorry, your response was not recorded. Please try again."
          );
          setResults([]);
        }
      } catch (error) {
        console.error("Error processing Gemini response:", error);
        toast.error("Failed to process feedback. Please try again.");
      } finally {
        setLoading(false); // Always reset loading state after processing
      }
    } else {
      startSpeechToText();
    }
  };
  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result.transcript)
    );
  }, [results]);

  const [webCamEnabled, setWebCamEnabled] = useState(true);
  return (
    <div className="flex flex-col items-center w-full max-w-xl">
      <div className="flex items-center justify-center border h-80 w-[427px] bg-white shadow-lg rounded-xl">
        {webCamEnabled ? (
          <Webcam mirrored={true} className="h-80 w-full rounded-xl" />
        ) : (
          <WebcamIcon className="h-20 w-20 text-gray-400" />
        )}
      </div>
      {webCamEnabled ? (
        <Button
          className="mt-16  rounded-lg shadow-md  transition-all "
          variant="outline"
          onClick={() => {
            ConvertSpeechToText();
          }}
        >
          {isRecording ? (
            <>
              {loading ? (
                <h2 className="flex gap-2 items-center ">
                  <LoaderCircle className="animate-spin" />
                  Saving
                </h2>
              ) : (
                <h2 className="text-red-600 flex gap-2 items-center">
                  <CircleStop className="text-xl" /> Stop Recording
                </h2>
              )}
            </>
          ) : (
            <h2 className="flex gap-2 items-center text-primary">
              {" "}
              <Mic className="text-xl" />
              Start Recording
            </h2>
          )}
        </Button>
      ) : (
        <Button
          className="mt-16 px-12 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          onClick={() => setWebCamEnabled(true)}
        >
          Enable WebCam and Microphone
        </Button>
      )}
      {/* <Button onClick={() => console.log(userAnswer)}>Show Answer</Button> */}
    </div>
  );
};

export default RecordingSection;
