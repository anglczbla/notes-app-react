import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    currentTheme: localStorage.getItem('theme') || 'light',
  },
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.currentTheme);
    },
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
      localStorage.setItem('theme', state.currentTheme);
    }
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectCurrentTheme = (state) => state.theme.currentTheme;
export const selectIsDarkMode = (state) => state.theme.currentTheme === 'dark';

export default themeSlice.reducer;
