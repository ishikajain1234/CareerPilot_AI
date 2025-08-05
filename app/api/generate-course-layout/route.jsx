import { db } from '@/utils/db';
import { coursesTable } from '@/utils/schema';
import { currentUser } from '@clerk/nextjs/server';
import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Gemini prompt
const prompt = `Generate a learning course based on the following details.
Make sure to include:
- Course Name
- Description
- Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing the topic. Use vibrant colors, 3D format, symbolic elements, etc.)
- Chapters with chapter name, duration, and topics inside each chapter.

Output format:

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
  try {
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
  } catch (error) {
    console.error('Image generation failed:', error);
    return null; // fallback or handle gracefully
  }
};

export async function POST(req) {
  try {
    const user = await currentUser();
    const { courseId = uuidv4(), ...formData } = await req.json();

    // Validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.level ||
      !formData.category ||
      typeof formData.noofChapters !== 'number'
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields.' },
        { status: 400 }
      );
    }

    // Gemini AI call
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

    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return NextResponse.json(
        { error: 'No response from Gemini AI.' },
        { status: 500 }
      );
    }

    const cleanText = rawText.replace(/```json|```/g, '');
    let jsonResp;
    try {
      jsonResp = JSON.parse(cleanText);
    } catch (err) {
      console.error('Invalid JSON from Gemini:', cleanText);
      return NextResponse.json(
        { error: 'Gemini returned malformed JSON.' },
        { status: 500 }
      );
    }

    const courseData = jsonResp.course;
    if (!courseData) {
      return NextResponse.json(
        { error: 'Gemini response missing course data.' },
        { status: 500 }
      );
    }

    // Image generation
    const bannerImageUrl = await generateImage(courseData.bannerImagePrompt);

    // Insert into DB
    await db.insert(coursesTable).values({
      cid: courseId,
      name: courseData.name,
      description: courseData.description,
      category: courseData.category,
      level: courseData.level,
      includeVideo: courseData.includeVideo,
      noofChapters: courseData.noofChapters,
      bannerImagePrompt: courseData.bannerImagePrompt,
      bannerImageUrl: bannerImageUrl,
      courseJson: jsonResp,
      userEmail: user?.primaryEmailAddress?.emailAddress || 'unknown',
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
