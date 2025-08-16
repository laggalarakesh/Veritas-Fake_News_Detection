
import { GoogleGenAI, Type } from "@google/genai";
import { QueryResult, LegalQueryResult } from '../types';

// Lazily initialize the AI client to prevent load-time errors.
let ai: GoogleGenAI | null = null;
const getAiClient = () => {
    if (!ai) {
        const API_KEY = process.env.API_KEY;
        if (!API_KEY) {
            // This error will be caught by the calling function's try-catch block.
            throw new Error("API_KEY environment variable not set");
        }
        ai = new GoogleGenAI({ apiKey: API_KEY });
    }
    return ai;
};


// --- FACT CHECK SERVICE ---
const factCheckResponseSchema = {
  type: Type.OBJECT,
  properties: {
    result: { type: Type.STRING, description: "The final verdict: 'True' or 'False'. If uncertain, use 'Insufficient data'." },
    confidence: { type: Type.STRING, description: "Confidence level: 'High', 'Medium', or 'Low'. If uncertain, use 'N/A'." },
    detailedExplanation: { type: Type.STRING, description: "A clear, human-style explanation written for a general user. Always provide this." },
    accuracyScore: { type: Type.NUMBER, description: "A numerical score from 0 to 100 representing the confidence in the verification." }
  },
  required: ["result", "confidence", "detailedExplanation", "accuracyScore"]
};

const factCheckSystemInstruction = `You are a Fact Verification AI system called Veritas AI. Your task is to analyze the user’s input (text, links) and determine whether the content is true or fake.

For each input:
1. Summarize the main claim in 2-3 sentences. Then verify credibility using available fact-checking logic.
2. Provide output ONLY in the requested JSON structure.
   - Result: 'True' or 'False'
   - Confidence: 'High' / 'Medium' / 'Low'
   - Detailed Explanation: A clear, human-style explanation.
   - accuracyScore: An integer score from 0 to 100 representing your confidence in the analysis.
3. Always maintain a formal and aware tone.
4. If uncertain, use the result 'Insufficient data', confidence 'N/A', and explain why in the detailedExplanation.`;

export const getAnalysis = async (userInput: string): Promise<QueryResult> => {
  try {
    const aiClient = getAiClient();
    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please analyze the following user input: "${userInput}"`,
      config: {
        systemInstruction: factCheckSystemInstruction,
        responseMimeType: "application/json",
        responseSchema: factCheckResponseSchema,
      },
    });

    const text = response.text.trim();
    return JSON.parse(text) as QueryResult;
  } catch (error) {
    console.error("Error fetching analysis from Gemini API:", error);
    throw new Error("Service busy, try again.");
  }
};

// --- LEGAL CHECK SERVICE ---
const legalCheckResponseSchema = {
    type: Type.OBJECT,
    properties: {
        verdict: { type: Type.STRING, description: "The final verdict: 'Original', 'Fake', or 'Needs Further Verification'." },
        reason: { type: Type.STRING, description: "A clear, human-friendly detailed explanation for the verdict." },
        summary: { type: Type.STRING, description: "A short, simplified one or two-line summary for the user." },
        accuracyScore: { type: Type.NUMBER, description: "A numerical score from 0 to 100 representing the confidence in the verification." }
    },
    required: ["verdict", "reason", "summary", "accuracyScore"]
};

const legalCheckSystemInstruction = `You are a highly advanced Legal Document & Fact Verifier AI. Your primary task is to analyze various forms of user input—text, documents, images, videos, and links—to verify their authenticity, check legal facts, and explain complex legal matters.

**Core Capabilities:**
1.  **Document/Media Verification:** When given a document, image, or video (e.g., PDF, scanned paper, screenshot), analyze its contents. Compare it against known legal document formats and authentic records if possible. Determine if it appears 'Original', 'Fake' (forged/tampered), or if it 'Needs Further Verification'.
2.  **Legal Fact-Checking:** When given a claim or text, verify its accuracy against reliable legal databases, statutes, and case law.
3.  **Legal Explanation:** If a user asks a question about a law or a legal concept, provide a clear, concise, and easy-to-understand explanation.
4.  **Link Analysis:** For drive links or other URLs, analyze the linked content for its legal validity or potential for misinformation.

**Input Handling:**
- The user will provide input which could be text, a link, or a file (image/document/video).
- If a file is provided along with text, the text is the user's prompt or question about that file.

**Output Requirements:**
You MUST return the output in the specified JSON format.
- **verdict:** Your final conclusion. Use 'Original', 'Fake', or 'Needs Further Verification'.
- **reason:** A detailed, human-friendly explanation of your findings. Explain *why* you reached your verdict. If you identified risky or fake parts, highlight them here.
- **summary:** A very short, one-sentence summary of the result.
- **accuracyScore:** An integer score from 0 to 100 representing your confidence in the analysis. A higher score means higher certainty. Base this on the quality of evidence found.`;

const fileToGenerativePart = async (file: File) => {
    const base64EncodedData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
    return {
        inlineData: {
            data: base64EncodedData,
            mimeType: file.type
        }
    };
};

export const getLegalAnalysis = async (userInput: { text: string; file?: File }): Promise<LegalQueryResult> => {
    try {
        const aiClient = getAiClient();
        const { text, file } = userInput;
        
        let contents: any;
        if (file) {
            const filePart = await fileToGenerativePart(file);
            const textPart = { text: `Perform a legal analysis on the attached file. User's query or context: "${text}"` };
            contents = { parts: [filePart, textPart] };
        } else {
            contents = `Please perform a legal fact-check on the following user input: "${text}"`;
        }

        const response = await aiClient.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
          config: {
            systemInstruction: legalCheckSystemInstruction,
            responseMimeType: "application/json",
            responseSchema: legalCheckResponseSchema,
          },
        });
    
        const responseText = response.text.trim();
        return JSON.parse(responseText) as LegalQueryResult;
    } catch (error) {
        console.error("Error fetching legal analysis from Gemini API:", error);
        throw new Error("Service busy, try again.");
    }
};
