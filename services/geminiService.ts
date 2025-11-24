import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, FileData, GeneratorType } from "../types";

// --- CONFIGURATION ---
// ROBUST ENV GETTER: Fixes "Black Screen" / ReferenceError on Vercel/Vite
const getEnv = (key: string) => {
  // 1. Try Vite / Modern Browser Environment (import.meta.env)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      const val = import.meta.env[`VITE_${key}`] || import.meta.env[key];
      if (val) return val;
    }
  } catch (e) {
    // Ignore
  }

  // 2. Try Standard Node/Process Environment (CRA/Next.js)
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      return process.env[key];
    }
  } catch (e) {
    // Ignore ReferenceError if process is not defined
  }

  return undefined;
};

const GOOGLE_API_KEY = getEnv('API_KEY') || getEnv('GEMINI_API_KEY');
const OPENAI_API_KEY = getEnv('OPENAI_API_KEY');

const GOOGLE_MODEL = "gemini-2.5-flash";
const OPENAI_MODEL = "gpt-4o";

// Initialize Google Client
// We handle the case where the key might be missing gracefully inside the functions
let ai: GoogleGenAI | null = null;
if (GOOGLE_API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });
    console.log("✅ Gemini AI initialized successfully");
  } catch (e) {
    console.warn("Failed to initialize Google AI client:", e);
  }
} else {
  console.error("❌ GEMINI API KEY NOT FOUND. Please set VITE_API_KEY or VITE_GEMINI_API_KEY in environment variables.");
}

// --- OPENAI FALLBACK HANDLER ---
async function callOpenAI(systemPrompt: string, userPrompt: string, jsonMode: boolean = false): Promise<string> {
  if (!OPENAI_API_KEY) throw new Error("AI Service Credentials missing.");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: jsonMode ? { type: "json_object" } : { type: "text" },
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(`Neural Engine Error: ${err.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Secondary AI Failed:", error);
    throw error;
  }
}

// --- MAIN ANALYSIS FUNCTION ---
export const analyzeResume = async (
  resumeFile: FileData,
  jobDescription: string
): Promise<AnalysisResult> => {
  const systemPrompt = `
    You are an expert ATS (Applicant Tracking System) Resume Analyzer.
    Analyze the provided Resume content against the Job Description.
    
    Return a structured JSON analysis containing:
    1. atsScore: A number between 0-100 indicating match quality.
    2. contactProfile: Extract the candidate's name, email, phone, linkedin, and location. If missing, return "N/A".
    3. missingKeywords: An array of important keywords found in the JD but missing in the resume.
    4. criticalIssues: An array of formatting or content issues that might hurt ATS parsing.
    5. keyStrengths: An array of things the candidate matched well.
    6. summary: A brief 2-sentence summary of the fit.
  `;
  
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      atsScore: { type: Type.INTEGER },
      contactProfile: {
        type: Type.OBJECT,
        properties: {
            name: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
            linkedin: { type: Type.STRING },
            location: { type: Type.STRING },
        }
      },
      missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
      criticalIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
      keyStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
      summary: { type: Type.STRING },
    },
    required: ["atsScore", "contactProfile", "missingKeywords", "criticalIssues", "keyStrengths", "summary"],
  };

  // 1. Try Primary AI (Google)
  try {
    if (!ai || !GOOGLE_API_KEY) {
      throw new Error("⚠️ API Configuration Missing: Please add VITE_API_KEY or VITE_GEMINI_API_KEY to your environment variables. Get your key at: https://aistudio.google.com/apikey");
    }

    const response = await ai.models.generateContent({
      model: GOOGLE_MODEL,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: resumeFile.type,
              data: resumeFile.base64,
            },
          },
          { text: systemPrompt + `\n\nJob Description:\n${jobDescription}` },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    throw new Error("No response text from Primary AI");
  } catch (primaryError: any) {
    console.error("Primary AI failed:", primaryError);
    
    // If it's a configuration error, throw it directly
    if (primaryError.message?.includes("API Configuration Missing")) {
      throw primaryError;
    }
    
    // 2. Fallback to Secondary AI (OpenAI)
    throw new Error("AI Service temporarily unavailable. Please check your API key configuration or try again in a moment.");
  }
};

// --- CONTENT GENERATION FUNCTION ---
export const generateContent = async (
  type: GeneratorType,
  resumeFile: FileData,
  jobDescription: string,
  analysis: AnalysisResult,
  options?: { emailRecipient?: string }
): Promise<string> => {
  
  const contactHeader = `
    Candidate Name: ${analysis.contactProfile.name}
    Email: ${analysis.contactProfile.email}
    Phone: ${analysis.contactProfile.phone}
    Location: ${analysis.contactProfile.location}
    LinkedIn: ${analysis.contactProfile.linkedin}
  `;

  let userPrompt = "";
  const systemPrompt = "You are a world-class AI Career Architect.";

  switch (type) {
    case GeneratorType.ATS_RESUME:
      userPrompt = `
        Act as a professional Executive Resume Writer. Rewrite the candidate's resume to be 100% ATS-Optimized for the provided Job Description.

        ### CRITICAL STRUCTURE REQUIREMENTS:
        1. **HEADER**: Place the following contact info at the very top, centered:
           ${contactHeader}
        
        2. **PROFESSIONAL SUMMARY**: Write a compelling, 3-sentence hook summarizing years of experience and key value proposition aligned with the JD. Use numbers if possible.
        
        3. **CORE SKILLS**: Create a distinct section with skills categorized (e.g., Languages, Tools, Frameworks). 
           **MANDATORY**: Include these missing keywords naturally: ${analysis.missingKeywords.join(", ")}.
        
        4. **EXPERIENCE**: Rewrite experience in reverse chronological order.
           - **QUANTIFY ACHIEVEMENTS**: You MUST add numbers, percentages, or dollar amounts to achievements to show impact (e.g., "Improved load time by 40%...", "Managed $50k budget...").
           - Start every bullet with a strong power verb.
        
        5. **EDUCATION & PROJECTS**: Keep brief and clear.
        
        Fix these specific issues: ${analysis.criticalIssues.join(", ")}.
        Output strictly in clean Markdown format.
      `;
      break;

    case GeneratorType.RESUME_SUGGESTIONS:
      userPrompt = `
        Based on the Missing Keywords: ${analysis.missingKeywords.join(", ")}, 
        rewrite just the "Experience" section of the resume to include these keywords naturally. 
        Focus on semantically rich sentences that ATS scanners prefer. Output in Markdown.
      `;
      break;

    case GeneratorType.COVER_LETTER:
      userPrompt = `
        Write a **High-Impact, Persuasive Cover Letter** for this Job Description.
        
        **Tone**: Enthusiastic, Confident, Modern, and Professional.
        **Audience**: Tailor this specifically for a hiring manager/recruiter.
        
        **Structure**:
        1. **Header**: Use ${contactHeader}
        2. **The Hook**: Open with a strong statement about passion for this specific company/role.
        3. **The Bridge**: Connect these key strengths (${analysis.keyStrengths.join(", ")}) directly to the company's pain points in the JD.
        4. **The Proof**: Reference specific achievements from the resume.
        5. **The Close**: A confident call to action requesting an interview.

        Output in Markdown.
      `;
      break;

    case GeneratorType.INTERVIEW_PREP:
      userPrompt = `
        Generate an **Advanced Interview Preparation Kit** for this role.

        **Part 1: The STAR Method Primer**
        Briefly explain the Situation, Task, Action, Result framework.

        **Part 2: Top 10 Strategic Questions**
        Predict the top 10 hardest questions based on the JD.
        
        For EACH question, provide:
        1. **The Question**
        2. **Why They Ask**: The hidden intent.
        3. **Ideal Answer (STAR)**: A scripted response.
        4. **Follow-Up Question**: A harder drill-down question they might ask next.
        5. **Common Pitfall**: What NOT to say (e.g., "Don't be vague about your specific contribution").

        Output in Markdown.
      `;
      break;

    case GeneratorType.EMAIL_TEMPLATE:
      const recipient = options?.emailRecipient || "Recruiter";
      const toneInstruction = recipient === "LinkedIn Connection" 
        ? "Casual, warm, and relationship-focused (soft intro)." 
        : recipient === "Hiring Manager" 
            ? "Value-driven, concise, and direct about solving their problems."
            : "Formal, respectful, and clear about application status.";

      userPrompt = `
        Draft 3 tailored cold outreach emails to a **${recipient}**.
        
        **Tone Requirement**: ${toneInstruction}
        
        **Variants**:
        1. **The "Soft Touch"**: Asking for a quick coffee chat or insight.
        2. **The "Value Add"**: Pitching a specific idea or solution relevant to the company.
        3. **The "Application Follow-up"**: Checking on a submitted application.

        Insert the user's name (${analysis.contactProfile.name}) in the signature.
        Output in Markdown.
      `;
      break;
  }

  const fullPrompt = `Job Description: ${jobDescription}\n\nTask: ${userPrompt}`;

  // 1. Try Primary AI (Google)
  try {
    if (!ai || !GOOGLE_API_KEY) {
      throw new Error("⚠️ API Configuration Missing: Please add VITE_API_KEY or VITE_GEMINI_API_KEY to your environment variables. Get your key at: https://aistudio.google.com/apikey");
    }

    const response = await ai.models.generateContent({
      model: GOOGLE_MODEL,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: resumeFile.type,
              data: resumeFile.base64,
            },
          },
          { text: fullPrompt },
        ],
      },
    });
    return response.text || "Failed to generate content.";
  } catch (primaryError: any) {
    console.error("Primary AI failed:", primaryError);
    
    // If it's a configuration error, throw it directly
    if (primaryError.message?.includes("API Configuration Missing")) {
      throw primaryError;
    }
    
    // 2. Fallback to Secondary AI (OpenAI)
    try {
        return await callOpenAI(systemPrompt, fullPrompt);
    } catch (openAiError) {
        throw new Error("All AI Services are currently at capacity. Please check your network connection or try again later.");
    }
  }
};