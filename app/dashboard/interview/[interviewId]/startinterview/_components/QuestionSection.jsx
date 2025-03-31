import { Lightbulb, Volume2, VolumeX } from "lucide-react";
import React, { useState } from "react";

const QuestionSection = ({
  InterviewQuestion,
  activeQuestionNumber,
  setActiveQuestionNumber,
}) => {
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
    <div className="p-6 border rounded-xl shadow-lg bg-white flex flex-col h-full">
      {/* Question Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
        {InterviewQuestion &&
          InterviewQuestion.map((item, index) => (
            <h2
              key={index}
              className={`cursor-pointer rounded-lg p-3 text-sm md:text-base font-semibold transition-all duration-300 text-center 
              ${
                activeQuestionNumber === index
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => setActiveQuestionNumber(index)}
            >
              Question {index + 1}
            </h2>
          ))}
      </div>

      {/* Fixed Height Wrapper for Question & Note Section */}
      <div className="flex flex-col flex-grow justify-between mt-6 h-[200px]">
        {/* Active Question Display (Fixed Height to Avoid Shifting) */}
        <div className="flex items-center justify-between min-h-[100px]">
          <h2 className="text-md md:text-lg font-semibold text-gray-900 leading-relaxed flex-1">
            {InterviewQuestion?.[activeQuestionNumber]?.question ||
              "Loading..."}
          </h2>
          <div className="ml-4">
            {isSpeaking ? (
              <VolumeX
                onClick={() =>
                  TextToSpeech(
                    InterviewQuestion?.[activeQuestionNumber]?.question
                  )
                }
                className="cursor-pointer text-gray-700 hover:text-blue-600 transition duration-200"
              />
            ) : (
              <Volume2
                onClick={() =>
                  TextToSpeech(
                    InterviewQuestion?.[activeQuestionNumber]?.question
                  )
                }
                className="cursor-pointer text-gray-700 hover:text-blue-600 transition duration-200"
              />
            )}
          </div>
        </div>

        {/* Note Section (Always Stays at Bottom) */}
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm flex items-center">
          <Lightbulb className="mr-2 text-blue-600" />
          <div>
            <h2 className="text-blue-700 font-semibold">Note:</h2>
            <p className="text-gray-700 mt-1">
              Click on <strong>"Start Recording"</strong> to record your
              response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;
