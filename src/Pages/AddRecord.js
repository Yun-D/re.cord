import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button.js";
import styles from "../Components/components.module.css";

import record from "../Assets/recordpan.svg";
import { ReactComponent as IcnHeart } from "../Assets/heart.svg";

import { addRecord } from "../firebase/firestore/recordsCRUD"; // API 함수 임포트

import "./Records.css";

const AddRecord = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("anonUserid");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    e.preventDefault();
    const newRecord = {
      recordId: Date.now().toString(),
      name: name,
      description: description,
    };
    try {
      await addRecord(user, newRecord);
      navigate("/record");
    } catch (error) {
      console.error("Error adding record: ", error);
    }
  };

  // const colors = ["green", "pink", "yellow", "purple"];

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
      <form onSubmit={handleSubmit}>
        <p className="text-subtitle">레코드 이름</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=" 장소를 모을 테마 이름을 정해주세요."
          maxLength={12} //FIXME: 적당한 값으로 변경해야함!
          className="inputbox"
        />

        <div style={{ marginBottom: "20px" }} />
        {/* <p className="text-subtitle">색상</p>
        <div className="row-direction">
          {colors.map((color, idx) => (
            <button className={`colorchip ${color}`}>
              <div key={idx} />
            </button>
          ))}
        </div> */}

        <p className="text-subtitle">설명</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder=" 레코드에 대한 간단한 설명을 적어주세요."
          className="textareaBox_sm"
        />

        <div className="content-align">
          <div style={{ marginBottom: "40px" }} />
          <Button type="submit">기록 시작하기</Button>
        </div>
      </form>
    </div>
  );
};

export default AddRecord;
