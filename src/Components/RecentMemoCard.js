import React from "react";
import styles from "./components.module.css";
import ImageFrame from "./ImageFrame";

const dummyData = {
  date: "YYYY.MM.DD",
  shop: "별별 캡슐샵",
  memo: "기다리던 가챠 시리즈 발견... 5개 다 갖고싶어서 동전 장전함.. 다행히도 8번만에 다 나와줌. 이거 말고도 볼 게 많았어서 지갑이 위험했다",
};

// 메인화면에 사용되는, 최근 메모 컴포넌트 (이미지 + 날짜 + 장소명 + 메모)
const RecentMemoCard = () => {
  return (
    <div className={styles.listItem}>
      <ImageFrame />
      <div className={styles.textArea}>
        <h3 className={styles.dataTxt}>{dummyData.date}</h3>
        <h4 className={styles.shopTxt}>{dummyData.shop}</h4>
        <p className={styles.memoTxt}>{dummyData.memo}</p>
      </div>
    </div>
  );
};

export default RecentMemoCard;
