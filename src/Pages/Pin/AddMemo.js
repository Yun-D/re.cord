import React, { useState } from "react";
import styles from "../../Components/components.module.css";
import ImageFrame from "../../Components/ImageFrame";
import { useLocation, useNavigate } from "react-router-dom";
import StarRating from "../../Components/StarRating";
import { addMemo } from "../../firebase/firestore/pinsCRUD";
import { getCurrentUserId } from "../../firebase/auth";

const AddMemo = () => {
  // 오늘 날짜 구하기
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${yyyy}-${mm}-${dd}`;

  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(3); //기본값은 3점
  const [date, setDate] = useState(formattedToday);

  const navigate = useNavigate();
  const currPinData = useLocation().state;
  const userId = getCurrentUserId();

  const handleAddMemo = async (e) => {
    if (!date.trim() || !title.trim() || !review.trim()) {
      alert("항목을 채워주세요.");
      return;
    }

    const finalData = {
      date: date,
      title: title,
      rating: rating,
      review: review,
    };
    e.preventDefault();

    try {
      await addMemo(userId, currPinData.recordId, currPinData.pinId, finalData);
      navigate(
        `/recordDetail/${currPinData.recordId}/pinDetail/${currPinData.pinId}`,
      );
    } catch (error) {
      console.error("Error adding pin: ", error);
    }
  };

  return (
    <>
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
              {currPinData.place_name}
            </div>
            <div className="text-plain">{currPinData.address}</div>
            <div
              className={styles.borderBoxTag}
              style={{ width: "70px", marginTop: "10px" }}
            >
              ⭐ {rating}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "25px 25px 25px 0",
          }}
        >
          <StarRating value={rating} onChange={setRating} />
        </div>

        <p className="text-subtitle">방문일</p>
        <input
          type="date"
          className="inputbox"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        <p className="text-subtitle">제목</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=" 메모의 제목을 적어주세요."
          className="inputbox"
          style={{ marginBottom: "20px" }}
        />

        <p className="text-subtitle">리뷰 작성</p>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder=" 오늘의 방문에 대해 기록하고 싶은 내용을 적어주세요."
          className="textareaBox_sm"
        />

        <div style={{ marginBottom: "60px" }}></div>

        <div className="underButtonArea">
          <button
            className={`${styles.button} ${styles.longButton}`}
            onClick={handleAddMemo}
          >
            리뷰 등록
          </button>
        </div>
      </div>
    </>
  );
};

export default AddMemo;
