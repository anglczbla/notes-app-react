import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice.js";
import themeReducer from "./themeSlice.js";
import authReducer from "./authSlice.js";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});

export default store;
