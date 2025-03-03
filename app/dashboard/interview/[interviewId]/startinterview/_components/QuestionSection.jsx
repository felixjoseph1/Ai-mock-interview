import { Lightbulb, Volume2, VolumeX } from "lucide-react";
import React, { useState } from "react";

const QuestionSection = ({ InterviewQuestion, activeQuestionNumber }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  let speechInstance = null;

  const TextToSpeech = (text) => {
    if (isSpeaking) {
      // Stop speech if already playing
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // Start speech
      speechInstance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speechInstance);
      setIsSpeaking(true);

      // Detect when speech finishes
      speechInstance.onend = () => {
        setIsSpeaking(false);
      };
    }
  };
  return (
    <div className="p-6 border rounded-xl shadow-lg bg-white">
      {/* Question Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
        {InterviewQuestion &&
          InterviewQuestion.map((item, index) => (
            <h2
              key={index}
              className={`cursor-pointer rounded-lg p-3 text-sm md:text-base font-semibold transition-all duration-300 
        
              ${
                activeQuestionNumber === index
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Question {index + 1}
            </h2>
          ))}
      </div>

      {/* Active Question Display */}
      <div className="mt-6">
        <h2 className="text-md md:text-lg font-semibold text-gray-900 leading-relaxed">
          {InterviewQuestion?.[activeQuestionNumber]?.question || "Loading..."}
        </h2>
        <h2 className="pt-2">
          {isSpeaking ? (
            <VolumeX
              onClick={() =>
                TextToSpeech(
                  InterviewQuestion?.[activeQuestionNumber]?.question
                )
              }
              className="cursor-pointer "
            />
          ) : (
            <Volume2
              onClick={() =>
                TextToSpeech(
                  InterviewQuestion?.[activeQuestionNumber]?.question
                )
              }
              className="cursor-pointer "
            />
          )}
        </h2>
      </div>

      {/* Note Section */}
      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg mt-20 shadow-sm">
        <h2 className="flex items-center text-blue-700 font-semibold">
          <Lightbulb className="mr-2" /> Note:
        </h2>
        <p className="text-gray-700 mt-2">
          Click on <strong>"Record Answer"</strong> to record your response.
        </p>
      </div>
    </div>
  );
};

export default QuestionSection;
