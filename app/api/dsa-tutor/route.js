import {GoogleGenerativeAI} from "@google/generative-ai";
import {NextResponse} from "next/server";

/**
 * Helper function to make API calls to Gemini with a fallback mechanism.
 * It tries the primary API key first, and if it fails, retries with the secondary key.
 * * NOTE: Ensure your environment variables are set.
 * For example, in your .env.local file:
 * NEXT_PUBLIC_GEMINI_API_KEY="your_primary_api_key_here"
 * NEXT_PUBLIC_GEMINI_API_KEY_2="your_secondary_api_key_here"
 * * SECURITY WARNING: The `NEXT_PUBLIC_` prefix exposes environment variables to the browser.
 * For server-side code like this API route, it's more secure to use names
 * without this prefix (e.g., `GEMINI_API_KEY`) to prevent leaking your keys.
 */
async function generateContentWithFallback(prompt) {
  // An array of your Gemini API keys from environment variables.
  const apiKeys = [
    process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    process.env.NEXT_PUBLIC_GEMINI_API_KEY_2,
  ].filter(Boolean); // .filter(Boolean) removes any undefined or empty string keys

  if (apiKeys.length === 0) {
    console.error("No Gemini API keys found in environment variables.");
    // This error will be caught by the main try-catch block in POST.
    throw new Error("API key not configured.");
  }

  let lastError = null;

  // Loop through the keys and attempt the API call.
  for (let i = 0; i < apiKeys.length; i++) {
    const key = apiKeys[i];
    try {
      console.log(`Attempting API call with key #${i + 1}...`);
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
      const result = await model.generateContent(prompt);
      console.log(`API call with key #${i + 1} was successful.`);
      return result; // If successful, return the result immediately.
    } catch (error) {
      console.error(`API call with key #${i + 1} failed.`, error.message);
      lastError = error; // Save the error and try the next key.
    }
  }

  // If the loop finishes without returning, all keys have failed.
  console.error("All API keys failed.");
  throw lastError; // Throw the last error encountered.
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {action, topic, problem, userCode, language, difficulty} = body;

    switch (action) {
      case "validate_topic_and_get_problem":
        return await handleGetProblem(topic);

      case "get_random_problem":
        return await handleGetRandomProblem(difficulty);

      case "evaluate_code":
        return await handleEvaluateCode(problem, userCode, language);

      case "get_solution":
        return await handleGetSolution(problem, language);

      default:
        return NextResponse.json({error: "Invalid action"}, {status: 400});
    }
  } catch (error) {
    console.error("API Error:", error);
    // The error message from generateContentWithFallback will be logged here.
    return NextResponse.json(
      {error: "An internal server error occurred"},
      {status: 500}
    );
  }
}

async function handleGetProblem(topic) {
  if (!topic) {
    return NextResponse.json({error: "Topic is required"}, {status: 400});
  }

  const validationPrompt = `Is "${topic}" a recognized topic or concept within the field of Data Structures and Algorithms? Please respond with only "Yes" or "No".`;

  // Use the new fallback helper for the API call
  const validationResult = await generateContentWithFallback(validationPrompt);
  const validationResponse = await validationResult.response;
  const validationText = validationResponse.text().trim();

  if (!validationText.toLowerCase().includes("yes")) {
    return NextResponse.json({
      isValid: false,
      message: `"${topic}" doesn't seem to be a valid DSA topic.`,
    });
  }

  const problemPrompt = `
      You are a DSA problem creator. Generate a programming problem based on the topic: "${topic}".
      The problem should be suitable for an intermediate level developer.
      Provide your response as a JSON object with the keys: "title", "description", "examples", "constraints".
  `;

  // Use the new fallback helper for the API call
  const problemResult = await generateContentWithFallback(problemPrompt);
  const problemResponse = await problemResult.response;
  const problemText = problemResponse
    .text()
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const problemJson = JSON.parse(problemText);
    return NextResponse.json({isValid: true, problem: problemJson});
  } catch (e) {
    console.error("Error parsing problem JSON from Gemini:", e);
    return NextResponse.json(
      {
        error:
          "Failed to generate a valid problem. The AI returned an unexpected format.",
      },
      {status: 500}
    );
  }
}

async function handleGetRandomProblem(difficulty = "Intermediate") {
  const problemPrompt = `
        You are a DSA problem creator. Generate a new, random programming problem suitable for a developer with ${difficulty} level skills.
        The topic can be any common Data Structure or Algorithm.
        Provide your response as a JSON object with the following keys: "title", "description", "examples", "constraints".
    `;
  // Use the new fallback helper for the API call
  const problemResult = await generateContentWithFallback(problemPrompt);
  const problemResponse = await problemResult.response;
  const problemText = problemResponse
    .text()
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const problemJson = JSON.parse(problemText);
    return NextResponse.json({problem: problemJson});
  } catch (e) {
    console.error("Error parsing random problem JSON from Gemini:", e);
    return NextResponse.json(
      {
        error:
          "Failed to generate a valid random problem. The AI returned an unexpected format.",
      },
      {status: 500}
    );
  }
}

async function handleEvaluateCode(problem, userCode, language = "Python") {
  if (!problem || !userCode) {
    return NextResponse.json(
      {error: "Problem and user code are required"},
      {status: 400}
    );
  }

  const feedbackPrompt = `
      As an expert DSA tutor, analyze the following ${language} code submission. Provide a concise evaluation in Markdown.

      **Problem:**
      - **Title:** ${problem.title}

      **User's ${language} Code:**
      \`\`\`${language.toLowerCase()}
      ${userCode}
      \`\`\`

      **Your Analysis (in Markdown):**

      ### Correctness Verdict
      State one of the following: **Logically Correct**, **Potential Issues Detected**, or **Incorrect Logic**. Briefly explain your reasoning in 1-2 sentences.

      ### Path to Optimality
      Provide 2-3 bullet-point hints on how the user could improve the time or space complexity. **Do not write the full solution code.** Focus on suggesting alternative algorithms, data structures, or approaches.
      
      **IMPORTANT**: If the user's solution is already optimal (or very close to optimal), state that clearly and positively. For example: "This is an excellent and optimal solution! Great job." In this case, you can skip the improvement hints.
  `;

  // Use the new fallback helper for the API call
  const feedbackResult = await generateContentWithFallback(feedbackPrompt);
  const feedbackResponse = await feedbackResult.response;
  const feedbackText = feedbackResponse.text();

  return NextResponse.json({feedback: feedbackText});
}

async function handleGetSolution(problem, language = "Python") {
  if (!problem) {
    return NextResponse.json(
      {error: "Problem details are required"},
      {status: 400}
    );
  }

  const solutionPrompt = `
      As an expert programmer, provide an optimal and well-commented solution for the following programming problem in ${language}. The code should be clean, efficient, and easy to understand.

      **Problem Details:**
      - **Title:** ${problem.title}
      - **Description:** ${problem.description.replace(/`/g, "'")}

      **Your Task:**
      Return only the complete, runnable code block for the solution in ${language}. Do not add any extra explanations before or after the code block.
  `;

  // Use the new fallback helper for the API call
  const solutionResult = await generateContentWithFallback(solutionPrompt);
  const solutionResponse = await solutionResult.response;
  const solutionText = solutionResponse.text();

  return NextResponse.json({solution: solutionText});
}
