import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/index.js';
import Home from "./pages/Home.jsx";
import DetailCatatan from "./pages/DetailCatatan.jsx";
import Navbar from "./components/Navbar.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddNotes from "./pages/AddNotes.jsx";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<DetailCatatan />} />
          <Route path="/notes/new" element={<AddNotes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;