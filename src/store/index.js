import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice.js";
import themeReducer from "./themeSlice.js";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    theme: themeReducer,
  },
});

export default store;
