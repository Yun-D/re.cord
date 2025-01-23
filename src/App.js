import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Record from "./Pages/Record";
import Wish from "./Pages/Wish";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="box-wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/record" element={<Record />} />
              <Route path="/wish" element={<Wish />} />
            </Routes>
          </div>
          <Navbar />
        </div>
      </div>
    </Router>
  );
}

export default App;
