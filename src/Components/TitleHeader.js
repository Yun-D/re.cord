import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../Assets/arrow_back.svg";
import { ReactComponent as MoreHorizontal } from "../Assets/more_vert.svg";
import "./Header.css";

const TitleHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="header-bar">
      <button onClick={() => navigate(-1)} className="button">
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
