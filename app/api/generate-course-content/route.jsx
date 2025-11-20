import { NextResponse } from "next/server";
import axios from "axios";
import { GoogleGenAI } from "@google/genai"; // ✅ Import here
import { coursesTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { db } from "@/utils/db";

const PROMPT = `Depends on Chapter name and Topic Generate Content and give response in JSON format.
Schema:{
  "chapterName": "<>",
  "topics": [
    {
      "topic": "<>",
      "content": "<>"
    }
  ]
}
:User Input:
`;

export async function POST(req) {
  try {
    const { courseJson, courseTitle, courseId } = await req.json();

    if (!courseJson?.chapters || !Array.isArray(courseJson.chapters)) {
      throw new Error("Invalid or missing chapters in courseJson");
    }

    // ✅ Define ai instance here instead of importing it
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const promises = courseJson.chapters.map(async (chapter) => {
      try {
        const config = { responseMimeType: 'text/plain' };
        const model = 'gemini-2.5-flash'; // or 'gemini-2.0' if needed

        const contents = [
          {
            role: 'user',
            parts: [{ text: PROMPT + JSON.stringify(chapter) }],
          },
        ];

        const response = await ai.models.generateContent({
          model,
          config,
          contents,
        });

        const RawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text || '';

        if (!RawResp) {
          console.error("Gemini returned empty response for:", chapter);
          return null;
        }

        const RawJson = RawResp.replace(/```json|```/g, '').trim();

        let JSONResp;
        try {
          JSONResp = JSON.parse(RawJson);
        } catch (e) {
          console.error("Failed to parse JSON from Gemini response:", RawJson);
          return null;
        }

        const youtubeData = await GetYoutubeVedio(chapter?.chapterName);

        return {
          youtubeVedio: youtubeData,
          courseData: JSONResp,
        };

      } catch (innerError) {
        console.error("Error generating content for chapter:", chapter, innerError);
        return null;
      }
    });

    const CourseContent = (await Promise.all(promises)).filter(item => item !== null);

    console.log("Final CourseContent:", JSON.stringify(CourseContent, null, 2));

    const dbResp = await db.update(coursesTable).set({
      courseContent: CourseContent,
    }).where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
      courseName: courseTitle,
      CourseContent,
    });

  } catch (e) {
    console.error('Error in generate-course-content:', e);
    return NextResponse.json(
      { error: 'Internal Server Error', details: e.message },
      { status: 500 }
    );
  }
}

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const GetYoutubeVedio = async (topic) => {
  try {
    const params = {
      part: 'snippet',
      q: topic,
      maxResults: 5,
      type: 'video',
      key: process.env.YOUTUBE_API_KEY,
    };

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVedioListResp = resp.data.items;

    const youtubeVedioList = youtubeVedioListResp.map(item => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
    }));

    console.log("youtubeVedioList:", youtubeVedioList);
    return youtubeVedioList;

  } catch (e) {
    console.error("YouTube API failed for topic:", topic, e);
    return [];
  }
};
