const { GoogleGenAI } = require("@google/genai");

const { z } = require("zod");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  jobDescription: z.string(),
  resume: z.string(),
  selfDescription: z.string(),
  matchScore: z.number().min(0).max(100),
  technicalQuestions: z.array(
    z
      .object({
        question: z
          .string()
          .describe("The technical question asked during the interview"),
        intention: z
          .string()
          .describe("The intention behind asking the technical question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, and what approach to take, etc",
          ),
      })
      .describe(
        "Technical questions that can be asked during the interview along with the intention behind asking them and how to answer them",
      ),
  ),
  behavioralQuestions: z.array(
    z
      .object({
        question: z
          .string()
          .describe("The technical question asked during the interview"),
        intention: z
          .string()
          .describe("The intention behind asking the technical question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, and what approach to take, etc",
          ),
      })
      .describe(
        "Behavioral questions that can be asked during the interview along with the intention behind asking them and how to answer them",
      ),
  ),
  skillGaps: z.array(
    z
      .object({
        skill: z
          .string()
          .describe(
            "The skill that the candidate is lacking based on the resume and job description",
          ),
        severity: z
          .enum(["Low", "Medium", "High"])
          .describe(
            'The severity of the skill gap, which can be "Low", "Medium", or "High"',
          ),
      })
      .describe(
        "Skills that the candidate is lacking based on the resume and job description along with the severity of the skill gap",
      ),
  ),
  preparationPlan: z.array(
    z
      .object({
        day: z
          .number()
          .int()
          .positive()
          .describe("The day number in the preparation plan, start"),
        focus: z
          .string()
          .describe("The main focus of the preparation for this day"),
        tasks: z
          .array(z.string())
          .min(1)
          .describe("List of tasks to be done on this day"),
      })
      .describe(
        "A preparation plan for the candidate to follow, which includes the day number, the main focus of the preparation for that day, and a list of tasks to be done on that day",
      ),
  ),
});

const interviewReportResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "jobDescription",
    "resume",
    "selfDescription",
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
  properties: {
    jobDescription: { type: "string" },
    resume: { type: "string" },
    selfDescription: { type: "string" },
    matchScore: { type: "number", minimum: 0, maximum: 100 },
    technicalQuestions: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question", "intention", "answer"],
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
      },
    },
    behavioralQuestions: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question", "intention", "answer"],
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
      },
    },
    skillGaps: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["skill", "severity"],
        properties: {
          skill: { type: "string" },
          severity: { type: "string", enum: ["Low", "Medium", "High"] },
        },
      },
    },
    preparationPlan: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["day", "focus", "tasks"],
        properties: {
          day: { type: "integer", minimum: 1 },
          focus: { type: "string" },
          tasks: {
            type: "array",
            minItems: 1,
            items: { type: "string" },
          },
        },
      },
    },
  },
};

function parseJsonResponse(text) {
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  return JSON.parse(cleaned);
}

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `Generate a comprehensive interview report for a candidate.

Return ONLY valid JSON. Do not add markdown, comments, prose, or extra keys.
Use exactly the requested schema and field names.

Candidate details:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: interviewReportResponseSchema,
        temperature: 0,
        topP: 0.1,
      },
    });

    const parsed = parseJsonResponse(response.text);
    return interviewReportSchema.parse(parsed);
  } catch (error) {
    throw error;
  }
}

module.exports = { generateInterviewReport };
