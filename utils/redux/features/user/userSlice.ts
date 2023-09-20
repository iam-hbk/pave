import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  //will change this to the user object
  value: number;
}

const initialState: UserState = {
  //initialize with an empty object of type UserState
  value: 0,
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //will implement features such as login,signup and logout
    setUser: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    unSetUser: (state) => {
      state.value -= 1;
    },
    updateUser: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

//will update the actions created i.e login,signup and logout
// Action creators are generated for each case reducer function
export const { setUser, unSetUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
