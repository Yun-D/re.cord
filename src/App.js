import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="app-container">
      <div className="box-wrapper">
        <Header />
        <div className="content">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Navbar />
      </div>
    </div>
  );
}

export default App;
