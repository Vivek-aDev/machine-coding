import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function getAIResponse(message) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: message,
    });

    return (
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response from Gemini"
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "⚠️ Error: Could not reach Gemini";
  }
}
