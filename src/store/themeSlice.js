import { createSlice } from "@reduxjs/toolkit";

const loadThemeFromStorage = () => {
  try {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  } catch (error) {
    return 'light';
  }
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    currentTheme: loadThemeFromStorage(),
  },
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      state.currentTheme = newTheme;
      
      // Apply theme immediately
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Save to localStorage
      try {
        localStorage.setItem('theme', newTheme);
      } catch (error) {
        console.error('Failed to save theme to localStorage:', error);
      }
    },
    setTheme: (state, action) => {
      const newTheme = action.payload;
      state.currentTheme = newTheme;
      
      // Apply theme immediately
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Save to localStorage
      try {
        localStorage.setItem('theme', newTheme);
      } catch (error) {
        console.error('Failed to save theme to localStorage:', error);
      }
    }
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// Selectors
export const selectCurrentTheme = (state) => state.theme.currentTheme;
export const selectIsDarkMode = (state) => state.theme.currentTheme === 'dark';

export default themeSlice.reducer;