import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/index.js';
import Home from "./pages/Home.jsx";
import DetailCatatan from "./pages/DetailCatatan.jsx";
import Navbar from "./components/Navbar.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddNotes from "./pages/AddNotes.jsx";
import Login from "./pages/Login.jsx";
import { isAuthenticated, getLoggedUser } from "./utils/index.js";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          const userResponse = await getLoggedUser();
          setUser(userResponse.data);
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        localStorage.removeItem('accessToken');
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    setAuthenticated(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Login onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <Provider store={store}>
      <div>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/detail/:id" element={<DetailCatatan />} />
          <Route path="/notes/new" element={<AddNotes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;