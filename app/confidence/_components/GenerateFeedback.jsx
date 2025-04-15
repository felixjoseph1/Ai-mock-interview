import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY); 

export async function generateSuggestions(result) {
  const prompt = `
  
    
You're an expert public speaking and communication coach.

You're given a confidence analysis report of a user who recorded a short video resume or speech. Based on the metrics and the transcribed speech, give 5–6 personalized, specific, and actionable suggestions that help the user improve both:

1. **Delivery** – speech clarity, confidence, vocal tone, pace, facial expressions 
2. **Content** – storytelling, structure, clarity, specificity, and emotional engagement

Each suggestion must:
- Start with a **bolded short title**, like **Slow Down Your Speech** or **Improve Your Storytelling**
- Be followed by a short explanation in natural, friendly language (1–2 sentences max)
- Be based directly on the data provided
- Avoid JSON, bullet points, or numbers — just plain text
- Be clean, concise, and helpful — no fluff
- Focus equally on **speaking style** and **what they’re saying**

Here is the user's data:
- Face Confidence: ${result.face_confidence}
- Voice Confidence: ${result.voice_confidence}
- Overall Confidence: ${result.confidence}
- Words Per Minute (WPM): ${result.wpm}
- Filler Words: ${result.filler_count}
- Average Pitch: ${result.avg_pitch}
- Sentiment Score (0 to 1): ${result.sentiment_score}
- Transcribed Text: "${result.transcribed_text}"

Your output should ONLY include the suggestions as described. No introduction or closing.
dont include the sepecial symbol * in the heading. heading and content should sperated with ":"

`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const chat = model.startChat();
  const resultResp = await chat.sendMessage(prompt);
  const text = await resultResp.response.text();

  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((s) => s.replace(/^\d+[\).\s-]*|^[-•]\s*/, "").trim()) // Remove numbering and bullet points
    .map((s) => s.replace(/\*\*/g, "").trim()); // Remove the ** from the response
}
