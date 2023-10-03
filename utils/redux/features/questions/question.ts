import { DailyQuestion } from "@/types/question";
import api from "../../api";

interface Error {
  message: string;
  status: number;
  data: any;
}

export async function getDailyQuestion(
  token: string
): Promise<DailyQuestion | null> {
  try {
    const data: any = await api
      .auth(`Bearer ${token}`)
      .get("/daily-question/daily/today");
    console.log("[DAILY QUESTIONS]", data);

    const dailyQuestion: DailyQuestion = {
      _id: data._id,
      questionText: data.questionText,
      options: data.options,
      correctAnswer: data.correctAnswer,
      date: data.date,
      reward: data.reward,
    };
    return dailyQuestion;
  } catch (error) {
    if ((error as Error).status === 401) {
      throw error;
    }
    console.log("[DAILY QUESTIONS ERROR]", JSON.stringify(error, null, 2));
    throw error;
  }
}
