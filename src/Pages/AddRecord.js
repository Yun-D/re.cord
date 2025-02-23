import React from "react";
import Button from "../Components/Button.js";
import styles from "../Components/components.module.css";

import record from "../Assets/recordpan.svg";
import { ReactComponent as IcnHeart } from "../Assets/heart.svg";

import "./Record.css";

const AddRecord = () => {
  const colors = ["green", "pink", "yellow", "purple"];

  return (
    <div>
      <div className="button-wrapper">
        <img src={record} alt="레코드판" />
        <div className="popup-button">
          <button className={`${styles.button} ${styles.round}`}>
            <IcnHeart className="pinIcon" />
          </button>
        </div>
      </div>

      <div className="content-gap" />
      <div>
        <p className="text-subtitle">레코드 이름</p>
        <input
          type="text"
          placeholder=" 장소를 모을 테마 이름을 정해주세요."
          maxLength={12} //FIXME: 적당한 값으로 변경해야함!
          className="textinput"
        />

        <div className="content-gap" />
        <p className="text-subtitle">색상</p>
        <div className="row-direction">
          {colors.map((color, idx) => (
            <button className={`colorchip ${color}`}>
              <div key={idx} />
            </button>
          ))}
        </div>
      </div>

      <div className="content-align">
        <div className="content-gap" />
        <Button>기록 시작하기</Button>
      </div>
    </div>
  );
};

export default AddRecord;
