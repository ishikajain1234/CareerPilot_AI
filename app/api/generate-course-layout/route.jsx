import { db } from '@/utils/db';
import { coursesTable } from '@/utils/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { v4 as uuid4 } from 'uuid';

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
    "includeVideo": "boolean",
    "noofChapters": "number",
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
  const BASE_URL = 'https://aigurulab.tech';
  const response = await axios.post(
    `${BASE_URL}/api/generate-image`,
    {
      width: 1024,
      height: 1024,
      input: imagePrompt,
      model: 'flux',
      aspectRatio: '16:9',
    },
    {
      headers: {
        'x-api-key': process.env.AI_GURU_LAB_API,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.image;
};

export async function POST(req) {
  try {
    const user = await currentUser();
    const { courseId, ...formData } = await req.json();

    // Validate input
    if (
      !formData.name ||
      !formData.description ||
      !formData.level ||
      !formData.category ||
      !formData.noofchapters
    ) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Gemini AI request
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      config: { responseMimeType: 'text/plain' },
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt + JSON.stringify(formData) }],
        },
      ],
    });

    const rawText = response?.candidates[0]?.content?.parts[0]?.text;
    const cleanText = rawText?.replace('```json', '').replace('```', '');

    if (!cleanText) {
      return NextResponse.json(
        { error: 'Failed to get valid course data from AI' },
        { status: 500 }
      );
    }

    const jsonResp = JSON.parse(cleanText);
    const courseData = jsonResp.course;

    // Generate image
    const bannerImageUrl = await generateImage(courseData.bannerImagePrompt);

    // Save to DB
    await db.insert(coursesTable).values({
      cid: courseId,
      name: courseData.name,
      description: courseData.description,
      category: courseData.category,
      level: courseData.level,
      includeVedio: courseData.includeVideo,
      noofChapters: courseData.noofChapters,
      bannerImagePrompt: courseData.bannerImagePrompt,
      courseJson: jsonResp,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      bannerImageUrl,
    });

    return NextResponse.json({ courseId });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate course layout. Try again later.' },
      { status: 500 }
    );
  }
}
