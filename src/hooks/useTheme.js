import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectCurrentTheme } from '../store/themeSlice.js';

export const useTheme = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectCurrentTheme);

  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  return {
    theme: currentTheme,
    toggleTheme: handleToggleTheme,
    isDarkMode: currentTheme === 'dark',
  };
};
