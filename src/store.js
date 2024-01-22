import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/User/userSlice";
import toDoReducer from "./toDoSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    toDo: toDoReducer,
  },
});

export default store;
