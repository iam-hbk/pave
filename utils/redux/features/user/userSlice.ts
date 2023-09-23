import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type of the userSlice State
type UserSliceState = {
  user: User | null;
};

const initialState: UserSliceState = {
  //initial state is null, this is just for testing
  user: {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: {
        lat: "-68.6102",
        lng: "-47.0653",
      },
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
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
export const selectUser = (state: { user: UserSliceState }) => state.user.user;

export default userSlice.reducer;
