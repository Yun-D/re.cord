// 핀 만들기 3단계 (메모 추가, 최종 등록) -------------------------------
import React, { useState } from "react";
import ImageFrame from "../../../Components/ImageFrame";
import styles from "../../../Components/components.module.css";
import "../AddPin.css";
import { useNavigate } from "react-router-dom";

const PinStepFinal = ({ pinData }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("anonUserid");
  const [description, setDescription] = useState("");

  const handleAddPlace = async (e) => {
    const finalData = { ...pinData, pinDesc: description };

    e.preventDefault();

    // try {
    //   await addPin(user, finalData);
    //   //navigate("/recordDetail/");
    // } catch (error) {
    //   console.error("Error adding record: ", error);
    // }
  };

  return (
    <div className="contentAlign" style={{ alignItems: "flex-start" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ImageFrame />

        <div className={styles.textWrapper} style={{ marginLeft: 20 }}>
          <div className="text-subtitle" style={{ margin: 0 }}>
            {pinData.place_name}
          </div>
          <div className="text-plain">{pinData.address}</div>
        </div>
      </div>

      <div className="content-gap" />
      <p className="text-subtitle">메모</p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder=" 장소에 대해 기록하고 싶은 내용을 적어주세요."
        className="textareaBox"
      />

      <div className="underButtonArea">
        <button
          className={`${styles.button} ${styles.longButton}`}
          onClick={handleAddPlace}
        >
          장소 등록
        </button>
      </div>
    </div>
  );
};

export default PinStepFinal;
