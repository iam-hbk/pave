import { QuestionType } from "@/types/question";
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type of the userSlice State
type QuestionTypeSliceState = {
  questions: QuestionType[] | null;
};

const initialState: QuestionTypeSliceState = {
  //initial state is null, this is just for testing
  questions: [
    {
      id: "2",
      question: "Where are the computer labs?",
      options: ["Concowan", "Study Center", "Library", "B Red 21"],
      rightAnswer: "A",
    },
  ],
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuestionType[]>) => {
      state.questions = action.payload;
    },
  },
});

// Update the actions created i.e setUser, unSetUser, and updateUser
// Action creators are generated for each case reducer function
export const { setQuestions } = questionSlice.actions;

//Selectors
export const selectQuestions = (state: {
  questions: QuestionTypeSliceState;
}): QuestionType[] | null => state.questions.questions;

export const selectQuestionById =
  (id: string) =>
  (state: { questions: QuestionTypeSliceState }): QuestionType | undefined =>
    state.questions.questions?.find((question) => question.id == id);

export default questionSlice.reducer;
