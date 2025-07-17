import {NextResponse} from "next/server";
import {GoogleGenerativeAI} from "@google/generative-ai";

/**
 * A helper function to introduce a delay.
 * @param {number} ms - The number of milliseconds to wait.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * API route handler for analyzing resume text.
 * This version includes a retry mechanism that cycles through multiple API keys
 * to handle overload issues or rate limits.
 * @param {Request} req - The incoming request object.
 */
export async function POST(req) {
  try {
    const {resumeText} = await req.json();

    if (!resumeText) {
      return NextResponse.json(
        {message: "Resume text is required."},
        {status: 400}
      );
    }

    // Create an array of your API keys from environment variables.
    // It filters out any keys that are not set.
    const apiKeys = [
      process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      process.env.NEXT_PUBLIC_GEMINI_API_KEY_2,
    ].filter(Boolean);

    if (apiKeys.length === 0) {
      throw new Error("No Gemini API keys found in environment variables.");
    }

    // NEW: A much more detailed and structured prompt for the AI.
    const prompt = `
      You are an expert ATS (Applicant Tracking System) resume analyzer. Your task is to analyze the following resume text based on a specific rubric and provide a score and detailed, actionable feedback.

      **Resume Text to Analyze:**
      "${resumeText}"

      **Analysis Rubric:**

      1.  **Keyword Relevance & Usage (40% of score):**
          * Analyze the text for common, high-impact keywords for roles like Software Engineer, Data Analyst, or Product Manager.
          * Assess if keywords are used naturally and in context, not just listed.
          * Check for a good balance of technical skills (e.g., Python, React, SQL) and soft skills (e.g., Leadership, Communication).

      2.  **Action Verbs & Quantifiable Results (30% of score):**
          * Check if bullet points begin with strong, varied action verbs (e.g., "Developed," "Engineered," "Managed," "Quantified," "Achieved").
          * Assess if achievements are quantified with specific numbers or metrics (e.g., "Increased user engagement by 15%" is better than "Improved user engagement").

      3.  **Formatting & Readability (20% of score):**
          * Check for clear, standard section headings (e.g., "Professional Experience," "Education," "Technical Skills").
          * Ensure the resume avoids ATS-unfriendly elements like tables, columns, or excessive symbols.

      4.  **Contact Information (10% of score):**
          * Verify the presence of a professional email address and a phone number.

      **Required Output Format:**

      Provide your response ONLY as a valid JSON object in the following format. Do not include any other text or markdown formatting.

      {
        "atsScore": <An integer score from 0 to 100 based on the rubric above>,
        "tips": [
          "Keyword Tip: <Suggest specific keywords to add based on the resume's content, or suggest varying the language used.>",
          "Action Verb Tip: <Suggest replacing a weaker phrase with a stronger, more impactful action verb. Give a specific example from the resume.>",
          "Quantification Tip: <Find a bullet point that could be improved with numbers and suggest how to rephrase it. e.g., 'Instead of 'Managed projects', try 'Managed 3 projects with a budget of $5k'.'>",
          "Recommendation: <Provide one extra helpful recommendation, such as tailoring the resume for a specific job, improving the summary, or a formatting suggestion.>"
        ]
      }
    `;

    let analysisResult;
    const maxRetries = 3;
    let attempt = 0;

    // Retry loop that also cycles through the available API keys
    while (attempt < maxRetries) {
      try {
        // Select the current API key using the modulo operator to cycle through the array
        const currentApiKey = apiKeys[attempt % apiKeys.length];
        console.log(
          `Attempt ${
            attempt + 1
          } using API key ending in ...${currentApiKey.slice(-4)}`
        );

        const genAI = new GoogleGenerativeAI(currentApiKey);
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        const jsonString = rawText
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        try {
          analysisResult = JSON.parse(jsonString);
        } catch (jsonError) {
          console.error(
            "Failed to parse JSON from Gemini response:",
            jsonString
          );
          throw new Error("Received a malformed response from the API.");
        }

        break;
      } catch (error) {
        attempt++;
        console.error(`Attempt ${attempt} failed:`, error.message);

        if (attempt >= maxRetries) {
          throw new Error(
            "The API is currently overloaded or all keys are invalid. Please try again later."
          );
        }

        const delayTime = Math.pow(2, attempt) * 500;
        console.log(`Waiting ${delayTime}ms before retrying with next key...`);
        await delay(delayTime);
      }
    }

    if (!analysisResult) {
      throw new Error(
        "Failed to get a valid response from the API after multiple retries."
      );
    }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Final error in ATS analysis:", error.message);
    return NextResponse.json(
      {message: error.message || "An unexpected error occurred."},
      {status: 500}
    );
  }
}
