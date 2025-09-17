// 핀 만들기 1단계 (장소 검색) -------------------------------
import React from "react";

import styles from "../../../Components/components.module.css";
import "../../Records.css";

import { ReactComponent as IcnSearch } from "../../../Assets/search.svg";
import SearchLocaItem from "../../../Components/SearchLocaItem";

const PinStep1 = ({ nextStep }) => {
  return (
    <div>
      <div className={styles.borderBox}>
        <div className="row-direction">
          <IcnSearch />
          <input
            type="text"
            placeholder=" 기억하고싶은 장소를 검색하세요."
            className="inputbox"
          />
        </div>
      </div>

      <div className="content-gap" />
      <SearchLocaItem onClick={nextStep} />
    </div>
  );
};

export default PinStep1;
