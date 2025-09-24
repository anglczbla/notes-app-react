import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { selectCurrentTheme, setTheme } from "./store/themeSlice.js";
import store from "./store/index.js";
import Home from "./pages/Home.jsx";
import DetailCatatan from "./pages/DetailCatatan.jsx";
import Navbar from "./components/Navbar.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddNotes from "./pages/AddNotes.jsx";
import Login from "./pages/Login.jsx";
import { isAuthenticated, getLoggedUser } from "./utils/index.js";
import "./App.css";

const ProtectedRoute = ({ element, authenticated }) => {
  return authenticated ? element : <Navigate to="/login" />;
};

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectCurrentTheme);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    dispatch(setTheme(savedTheme));
  }, [dispatch]);

  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [currentTheme]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          const userResponse = await getLoggedUser();
          setUser(userResponse.data);
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("accessToken");
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
    localStorage.removeItem("accessToken");
    setUser(null);
    setAuthenticated(false);
  };

  if (authLoading) {
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {location.pathname !== "/login" && <Navbar user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<ProtectedRoute authenticated={authenticated} element={<Home user={user} />} />} />
        <Route
          path="/login"
          element={
            authenticated ? <Navigate to="/" /> : <Login onAuthSuccess={handleAuthSuccess} />
          }
        />
        <Route path="/detail/:id" element={<ProtectedRoute authenticated={authenticated} element={<DetailCatatan />} />} />
        <Route path="/notes/new" element={<ProtectedRoute authenticated={authenticated} element={<AddNotes />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;