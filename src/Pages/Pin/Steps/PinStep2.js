// 핀 만들기 2단계 (장소 확인) -------------------------------
import React from "react";
import styles from "../../../Components/components.module.css";
import "../AddPin.css";

import SearchLocaItem from "../../../Components/SearchLocaItem";
import { Link } from "react-router-dom";

const PinStep2 = ({ nextStep }) => {
  return (
    <div className="contentAlign">
      <div className="mapContainer" />

      <SearchLocaItem onClick={nextStep} />
      <div className="content-gap" />

      <div className="underButtonArea">
        <Link to="/wish">
          <p style={{ color: "#727272" }}>위시로 등록하기</p>
        </Link>

        <button
          className={`${styles.button} ${styles.longButton}`}
          onClick={nextStep}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default PinStep2;
