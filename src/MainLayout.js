import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import "./App.css";

import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Record404 from "./Pages/Record404";
import Record from "./Pages/Record";
import AddRecord from "./Pages/AddRecord";
import Wish404 from "./Pages/Wish404";
import Wish from "./Pages/Wish";
import TitleHeader from "./Components/TitleHeader";

const MainLayout = () => {
  const thisLocation = useLocation(); //현재 위치
  const titleHeaderPages = { "/addRecord": "레코드 생성" }; //타이틀 헤더를 사용하는 페이지 & 제목
  const title = titleHeaderPages[thisLocation.pathname] || "";
  const isTitleHeader = !!title; //title이 존재하지 않으면 false

  return (
    <div className="app-container">
      <div className="box-wrapper">
        {isTitleHeader ? <TitleHeader title={title} /> : <Header />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/record404" element={<Record404 />} />
            <Route path="/record" element={<Record />} />
            <Route path="/addRecord" element={<AddRecord />} />
            <Route path="/wish404" element={<Wish404 />} />
            <Route path="/wish" element={<Wish />} />
          </Routes>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default MainLayout;
