import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="app-container">
      <div className="box-wrapper">
        <div className="content">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Navbar />
      </div>
    </div>
  );
}

export default App;
