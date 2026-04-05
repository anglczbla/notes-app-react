import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import DetailCatatan from "./pages/DetailCatatan.jsx";
import Navbar from "./components/Navbar.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddNotes from "./pages/AddNotes.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./hooks/useAuth.js";
import { useTheme } from "./hooks/useTheme.js";
import "./App.css";

const App = () => {
  const { user, loading, logout, checkAuth, isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 dark:border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-white dark:bg-gray-900 transition-colors duration-200`}>
      {location.pathname !== "/login" && <Navbar user={user} onLogout={logout} />}
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute authenticated={isAuthenticated}>
              <Home user={user} />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login />
          }
        />
        <Route 
          path="/detail/:id" 
          element={
            <ProtectedRoute authenticated={isAuthenticated}>
              <DetailCatatan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notes/new" 
          element={
            <ProtectedRoute authenticated={isAuthenticated}>
              <AddNotes />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
