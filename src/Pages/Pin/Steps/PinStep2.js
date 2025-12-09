// 핀 만들기 2단계 (장소 확인) -------------------------------
import React from "react";
import styles from "../../../Components/components.module.css";
import "../AddPin.css";

import PlaceSearchCard from "../../../Components/PlaceSearchCard";
import { Link } from "react-router-dom";
import KakaoMap from "../../../Components/KakaoMap";

const PinStep2 = ({ pinData, nextStep, isWishPage }) => {
  return (
    <div className="contentAlign">
      <div id="map" className="mapContainer">
        <KakaoMap pins={pinData} isMultiple={false} />
      </div>

      <PlaceSearchCard place={pinData.place_name} address={pinData.address} />
      <div className="content-gap" />

      <div className="underButtonArea">
        {isWishPage ? null : (
          <Link to="/wish">
            <p style={{ color: "#727272" }}>위시로 등록하기</p>
          </Link>
        )}
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
