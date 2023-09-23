import { QuestionType } from "@/types/question";

export async function getQuestions(): Promise<QuestionType> {
  return {
    id: "2",
    question: "Where are the computer labs?",
    options: ["Concowan", "Study Center", "Library", "B Red 21"],
    rightAnswer: "A",
  };
}
