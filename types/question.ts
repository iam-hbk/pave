export type DailyQuestion = {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  date: string;
  reward: number;
};
export interface QuizQuestion {
  questionText: string;
  options: string[];
  correctAnswer: number;
  _id: string;
}

export interface QuizData {
  _id: string;
  module: string;
  questions: QuizQuestion[];
  title: string;
  isActive: boolean;
  expiresAt: string;
  date: string;
}
