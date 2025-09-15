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

const MainLayout = () => {
  const thisLocation = useLocation(); //현재 위치
  const titleHeaderPages = {
    "/addRecord": "레코드 생성",
    "/recordDetail": " ",
    "/addPin": "장소 추가",
  }; //타이틀 헤더를 사용하는 페이지 & 제목
  const title = titleHeaderPages[thisLocation.pathname] || "";
  const isTitleHeader = !!title; //title이 존재하지 않으면 false
  const hideNav = thisLocation.pathname === "/greeting"; //네비게이션 바 숨김 설정

  return (
    <div className="app-container">
      <div className="box-wrapper">
        {isTitleHeader ? <TitleHeader title={title} /> : <Header />}
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
            <Route path="/wish" element={<Wish />} />
          </Routes>
        </div>
        {hideNav ? <div className="no-nav-background" /> : <Navbar />}
      </div>
    </div>
  );
};

export default MainLayout;
