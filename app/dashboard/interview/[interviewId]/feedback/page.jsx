import ClientFeedback from "./ClientFeedback";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";

const FeedbackPage = async ({ params }) => {
  const feedbackList = await db
    .select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef, params.interviewId))
    .orderBy(UserAnswer.id);

  return <ClientFeedback feedbackList={feedbackList} />;
};

export default FeedbackPage;
