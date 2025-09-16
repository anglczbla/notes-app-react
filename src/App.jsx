import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DetailCatatan from "./pages/DetailCatatan";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path ="/" element ={<Home/>}/>
        <Route path ="/detail/:id" element ={<DetailCatatan/>}/>
        <Route path ="*" element ={<NotFound/>}/>

      </Routes>
    </div>
  );
};

export default App;