import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Record404 from "./Pages/Record404";
import Record from "./Pages/Record";
import Wish404 from "./Pages/Wish404";
import Wish from "./Pages/Wish";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="box-wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/record404" element={<Record404 />} />
              <Route path="/record" element={<Record />} />
              <Route path="/wish404" element={<Wish404 />} />
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
