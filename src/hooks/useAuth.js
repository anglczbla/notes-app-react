import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  loginAsync, 
  logout as logoutAction, 
  checkAuthAsync, 
  selectAuth 
} from '../store/authSlice.js';
import { register as registerAPI } from '../utils/index.js';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useSelector(selectAuth);

  const login = useCallback(async (email, password) => {
    return dispatch(loginAsync({ email, password })).unwrap();
  }, [dispatch]);

  const register = useCallback(async (name, email, password) => {
    try {
      return await registerAPI(name, email, password);
    } catch (err) {
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const checkAuth = useCallback(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated
  };
};
