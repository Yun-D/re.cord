import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";

function App() {
  let username = "username"; //TODO: 추후 백엔드 작업 시 변경요

  return (
    <div className="app-container">
      <div className="box-wrapper">
        <Header />
        <div className="content">
          <h2>{username}님, 오늘은 어디로 가볼까요?</h2>

          <div className="content-gap" />
          <div>
            <p className="text-title">최근 추가된 기록</p>

            <div className="recentRecords" />
          </div>
          <div className="content-gap" />
          <div>
            <p className="text-title">평점 분포</p>

            <div className="ratingSpread" />
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
}

export default App;
