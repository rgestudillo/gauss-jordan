import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-between">
      <div className="max-w-7xl">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/how-to-use" element={<GetStarted />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
