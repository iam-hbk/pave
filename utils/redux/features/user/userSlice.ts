import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type of the userSlice State
type UserSliceState = {
  user: User | null;
};

const initialState: UserSliceState = {
  //initial state is null, this is just for testing
  user: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE0M2ZlMjNkMDY0OTJlYWQ5ZGRlODUiLCJpYXQiOjE2OTU4Mjc5MDAsImV4cCI6MTY5NjQzMjcwMH0.mEJ0H5A4FBo5xkwbjajKRs7ftk2BtgFY2ZyXaDcnZw0",
    user: {
      _id: "65143fe23d06492ead9dde85",
      email: "heritier",
      password: "$2b$10$Ehq0I4aZpBelfeR3CLTnHuhx/OgkmFkgx51im5v0Nifm0Y9LE/l5q",
      role: "Student",
      name: "Heritier Kaumbu",
      wallet: 0,
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    unSetUser: (state) => {
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

// Update the actions created i.e setUser, unSetUser, and updateUser
// Action creators are generated for each case reducer function
export const { setUser, unSetUser, updateUser } = userSlice.actions;

//Selectors
export const selectUser = (state: { user: UserSliceState }) =>
  state.user.user?.user;

export default userSlice.reducer;
