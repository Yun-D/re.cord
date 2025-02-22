import React from "react";
import record from "../Assets/recordpan.svg";
import "./Record.css";

const AddRecord = () => {
  return (
    <div>
      <div className="content-align">
        <div>
          <img src={record} alt="레코드판" />
        </div>
        <p className="text-title">레코드 이름</p>
        <input
          type="text"
          placeholder="장소를 모을 테마 이름을 정해주세요."
        ></input>
        <p className="text-title">색상</p>
      </div>
    </div>
  );
};

export default AddRecord;
