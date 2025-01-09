import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ReactComponent as IcnHome } from "./Assets/home.svg";
import { ReactComponent as IcnRecord } from "./Assets/record.svg";
import { ReactComponent as IcnWish } from "./Assets/wish.svg";

function App() {
  return (
    <div className="app-container">
      <div className="box-wrapper">
        <div className="content">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="nav-bar">
          <a href="#home" className="nav-item">
            <IcnHome className="nav-icon" />홈
          </a>
          <a href="#record" className="nav-item">
            <IcnRecord className="nav-icon" />
            기록
          </a>
          <a href="#wish" className="nav-item">
            <IcnWish className="nav-icon" />
            위시
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
