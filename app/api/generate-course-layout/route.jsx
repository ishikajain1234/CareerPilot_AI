import {db} from "@/utils/db";
import {coursesTable} from "@/utils/schema";
import {currentUser} from "@clerk/nextjs/server";
import {GoogleGenerativeAI} from "@google/generative-ai";
import axios from "axios";
import {NextResponse} from "next/server";

const prompt = `Generate Learning Course based on the following details. 
Make sure to add: 
- Course Name 
- Description 
- Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing the topic. Use vibrant colors, 3D format, symbolic elements, etc.) 
- Chapters with chapter name, duration, and topics inside each chapter.

Output should be in this JSON format:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": boolean,
    "noofChapters": number,
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": ["string"]
      }
    ]
  }
}

User Input:
`;

const generateImage = async (imagePrompt) => {
  const BASE_URL = "https://aigurulab.tech";
  const response = await axios.post(
    `${BASE_URL}/api/generate-image`,
    {
      width: 1024,
      height: 1024,
      input: imagePrompt,
      model: "flux",
      aspectRatio: "16:9",
    },
    {
      headers: {
        "x-api-key": process.env.AI_GURU_LAB_API,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.image;
};

export async function POST(req) {
  try {
    const user = await currentUser();
    const {courseId, ...formData} = await req.json();

    if (
      !formData.name ||
      !formData.level ||
      !formData.category ||
      !formData.noofchapters ||
      formData.noofchapters <= 0
    ) {
      return NextResponse.json(
        {error: "Missing or invalid required fields."},
        {status: 400}
      );
    }

    // --- START: FALLBACK LOGIC ---

    // 1. Securely load your API keys into an array.
    // The .filter(Boolean) removes any keys that are not set.
    const apiKeys = [
      process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      process.env.NEXT_PUBLIC_GEMINI_API_KEY_2,
    ].filter(Boolean);

    if (apiKeys.length === 0) {
      throw new Error("No Gemini API keys found in environment variables.");
    }

    let jsonResp = null;

    // 2. Loop through the keys until one succeeds.
    for (const key of apiKeys) {
      try {
        console.log("Attempting to use an API key...");
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          generationConfig: {
            responseMimeType: "application/json",
          },
        });

        const fullPrompt = prompt + JSON.stringify(formData);
        const result = await model.generateContent(fullPrompt);
        const response = result.response;

        // If the call is successful, parse the response and break the loop.
        jsonResp = JSON.parse(response.text());
        console.log("API key successful!");
        break;
      } catch (error) {
        console.warn(
          `API key ending in '...${key.slice(-4)}' failed. Trying next key...`
        );
      }
    }

    // 3. If all keys failed, jsonResp will still be null. Throw an error.
    if (!jsonResp || !jsonResp.course) {
      return NextResponse.json(
        {
          error:
            "Failed to get valid course data from AI after trying all keys.",
        },
        {status: 500}
      );
    }
    // --- END: FALLBACK LOGIC ---

    const courseData = jsonResp.course;
    const bannerImageUrl = await generateImage(courseData.bannerImagePrompt);

    await db.insert(coursesTable).values({
      cid: courseId,
      name: courseData.name,
      description: courseData.description,
      category: courseData.category,
      level: courseData.level,
      includeVideo: courseData.includeVideo,
      noofChapters: courseData.noofChapters,
      bannerImagePrompt: courseData.bannerImagePrompt,
      courseJson: jsonResp,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      bannerImageUrl,
    });

    return NextResponse.json({courseId});
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {error: "Failed to generate course layout. Please try again later."},
      {status: 500}
    );
  }
}
