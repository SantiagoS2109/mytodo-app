import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser(state, action) {
      state.username = action.payload;
    },
  },
});

export const { registerUser } = userSlice.actions;

export default userSlice.reducer;
