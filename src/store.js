import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/User/userSlice";
import categoriesReducer from "./features/Categories/categoriesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
  },
});

export default store;
