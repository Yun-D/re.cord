// 핀 만들기 3단계 (메모 or 위시 추가, 최종 등록) -------------------------------
import React, { useState } from "react";
import ImageFrame from "../../../Components/ImageFrame";
import styles from "../../../Components/components.module.css";
import "../AddPin.css";
import { useNavigate } from "react-router-dom";

import { addPin } from "../../../firebase/firestore/pinsCRUD";
import { addWish } from "../../../firebase/firestore/wishesCRUD";
import { getCurrentUserId } from "../../../firebase/auth";

const PinStepFinal = ({ pinData, isWishPage }) => {
  const navigate = useNavigate();
  const userId = getCurrentUserId();
  const [description, setDescription] = useState("");

  const handleAddPlace = async (e) => {
    e.preventDefault();
    const baseData = { ...pinData, pinDesc: description };

    if (!userId) return;

    try {
      if (!isWishPage) {
        // 핀 추가 (recordId 필요)
        const finalData = baseData;
        await addPin(userId, finalData, finalData.recordId);
        navigate(`/recordDetail/` + finalData.recordId);
      } else {
        // 위시 추가(recordId 제거)
        const { recordId, ...wishData } = baseData;
        await addWish(userId, wishData);
        navigate(`/wish`);
      }
    } catch (error) {
      console.error("Error adding final pin: ", error);
    }
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
        className="textareaBox_sm"
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
