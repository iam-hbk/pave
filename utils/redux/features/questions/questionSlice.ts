import { DailyQuestion } from "@/types/question";
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type of the userSlice State
type QuestionTypeSliceState = {
  question: DailyQuestion | null;
};

const initialState: QuestionTypeSliceState = {
  //initial state is null, this is just for testing
  question: null,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setDailyQuestion: (state, action: PayloadAction<DailyQuestion>) => {
      state.question = action.payload;
      console.log("Daily Question set !");
    },
  },
});

// Update the actions created i.e setUser, unSetUser, and updateUser
// Action creators are generated for each case reducer function
export const { setDailyQuestion } = questionSlice.actions;

//Selectors
export const selectQuestion = (state: {
  question: QuestionTypeSliceState;
}): DailyQuestion | null => state.question?.question;

export default questionSlice.reducer;
