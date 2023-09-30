import { User } from "@/types/user";
import { removeUserTokenFromLocalStorage } from "@/utils/helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type of the userSlice State
type UserSliceState = {
  user: User | null;
};

const initialState: UserSliceState = {
  //initial state is null, this is just for testing
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    unSetUser: (state) => {
      removeUserTokenFromLocalStorage();
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
export const selectUser = (state: { user: UserSliceState }) => state.user.user;

export default userSlice.reducer;
