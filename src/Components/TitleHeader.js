import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../Assets/arrow_back.svg";
import { ReactComponent as MoreHorizontal } from "../Assets/more_vert.svg";
import "./Header.css";

const TitleHeader = ({ title, prevStep, step }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (step > 0 && typeof prevStep === "function") {
      // 멀티스텝폼 UI일 경우
      prevStep();
    } else {
      // 기본 뒤로가기
      navigate(-1);
    }
  };

  return (
    <div className="header-bar">
      <button onClick={handleBack} className="button">
        <ArrowLeft className="icon" />
      </button>

      <h1 className="title">{title}</h1>

      <button className="button">
        <MoreHorizontal className="icon" />
      </button>
    </div>
  );
};

export default TitleHeader;
