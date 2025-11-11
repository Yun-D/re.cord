import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import "./App.css";

import Header from "./Components/Header";
import TitleHeader from "./Components/TitleHeader";
import Navbar from "./Components/Navbar";

import ProtectedRoute from "./Components/ProtectedRoute";
import Greeting from "./Pages/Greeting";
import Home from "./Pages/Home";
import Records from "./Pages/Records";
import AddRecord from "./Pages/AddRecord";
import RecordDetail from "./Pages/RecordDetail/RecordDetail";
import AddPin from "./Pages/Pin/AddPin";
import Wish from "./Pages/Wish";
import PinDetail from "./Pages/Pin/PinDetail";
import AddMemo from "./Pages/Pin/AddMemo";

const MainLayout = () => {
  const thisLocation = useLocation(); //현재 위치
  const titleHeaderPages = {
    "/addRecord": "레코드 생성",
    "/recordDetail": " ",
    "/addPin": "장소 추가",
    "/addMemo": "메모 추가",
  }; //타이틀 헤더를 사용하는 페이지 & 제목

  // 해당 경로가 titleHeaderPages의 키 중 하나로 시작하는지 확인
  const matchedKey = Object.keys(titleHeaderPages).find((key) =>
    thisLocation.pathname.startsWith(key)
  );
  const title = titleHeaderPages[matchedKey] || "";
  const isTitleHeader = !!title; //title이 존재하지 않으면 false

  // 특정 페이지에서 UI 숨기기
  const hideNav = thisLocation.pathname === "/greeting"; //네비게이션 바
  const hideAddPin = thisLocation.pathname === "/addPin"; //장소추가 멀티스텝폼

  return (
    <div className="app-container">
      <div className="box-wrapper">
        {!hideAddPin ? (
          isTitleHeader ? (
            <TitleHeader title={title} />
          ) : (
            <Header />
          )
        ) : null}
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/greeting" />} />
            <Route
              path="/greeting"
              element={
                <ProtectedRoute>
                  <Greeting />
                </ProtectedRoute>
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/record" element={<Records />} />
            <Route path="/addRecord" element={<AddRecord />} />
            <Route path="/recordDetail/:recordId" element={<RecordDetail />} />
            <Route path="/addPin" element={<AddPin />} />
            <Route
              path="/recordDetail/:recordId/pinDetail/:pinId"
              element={<PinDetail />}
            />
            <Route path="/addMemo" element={<AddMemo />} />
            <Route path="/wish" element={<Wish />} />
          </Routes>
        </div>
        {hideNav ? <div className="no-nav-background" /> : <Navbar />}
      </div>
    </div>
  );
};

export default MainLayout;
