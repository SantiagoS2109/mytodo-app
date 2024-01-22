import { createSlice } from "@reduxjs/toolkit";

const storedValue = localStorage.getItem("toDoUser");

let initialState = {};

storedValue
  ? (initialState = JSON.parse(storedValue))
  : (initialState = {
      username: "",
    });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser(state, action) {
      state.username = action.payload;

      localStorage.setItem("toDoUser", JSON.stringify(state));
    },
  },
});

export const { registerUser } = userSlice.actions;

export default userSlice.reducer;
