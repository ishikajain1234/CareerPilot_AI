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
export const ai =new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const user = await currentUser();
     const {has}=await auth();
     const hasPreniumAccess=has({plan:'starter'})
    const {courseId,...formData} = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });
   

    const model = 'gemini-1.5-flash'; // more reliable than "2.0-flash"
    const config = {
      responseMimeType: 'text/plain',
    };

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt + JSON.stringify(formData),
          },
        ],
      },
    ];
      if(!hasPreniumAccess){
       const result=await db.select().from (coursesTable).where(eq(coursesTable.userEmail,user?.primaryEmailAddress.emailAddress)); 
        if(result.length>=1){
          return NextResponse.json({'resp':'limit reached'});
        }
      }
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
     
    console.log(response.candidates[0].content.parts[0].text);
    if(result.data.resp=='limit reached'){
      toast.warning('please subsribe');
      Router.push('/workspace/billing');
    }
     const  RawResp=response?.candidates[0]?.content?.parts[0]?.text;
     const RawJson=RawResp.replace('```json','').replace('```',''); // Remove newlines
    const JSONResp=JSON.parse(RawJson);

    const ImagePrompt=JSONResp.course?.bannerImagePrompt;
    const bannerImageUrl= await GenerateImage(ImagePrompt);

    // Optional: save to DB
    
    
    const result = await db.insert(coursesTable).values({
  cid: courseId,
  name: formData.name,
  description: formData.description,
  category: formData.category,
  level: formData.level,
  includeVedio: formData.includeVideo, // Make sure schema uses the same key
  noofChapters: JSONResp.course.noofChapters, // ✅ Ensure this is a number and present
  bannerImagePrompt: JSONResp.course.bannerImagePrompt,
  courseJson: JSONResp,
  userEmail: user?.primaryEmailAddress?.emailAddress,
  bannerImageUrl: bannerImageUrl, // Save the generated image URL
});

    

    return NextResponse.json({courseId:courseId});
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate course layout. Try again later.' },
      { status: 500 }
    );
  }
}

const  GenerateImage=async(imagePrompt)=>{
  const BASE_URL='https://aigurulab.tech';
const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input:imagePrompt,
            model: 'flux',//'flux'
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process?.env?.AI_GURU_LAB_API, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
console.log(result.data.image) //Output Result: Base 64 Image
  return result.data.image;
}
