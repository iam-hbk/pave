import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/utils/redux/features/user/userSlice";
import questionReducer from "@/utils/redux/features/questions/questionSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    questions: questionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
