import React from "react";
import styles from "./components.module.css";
import ImageFrame from "./ImageFrame";

const dummyData = {
  date: "YYYY.MM.DD",
  shop: "별별 캡슐샵",
  ratingAvg: 2.5,
  count: 2,
  recentDate: "2024.12.17",
};

const TagListItem = ({ shop, recentDate }) => {
  return (
    <div className={`${styles.listItem} ${styles.tagItemBtn}`}>
      <ImageFrame />
      <div className={styles.textArea}>
        <h3 className={styles.dataTxt}>{dummyData.shop}</h3>

        <div
          style={{
            flexDirection: "row",
            display: "flex",
            gap: 12,
            width: "25vh",
          }}
        >
          <div className={styles.borderBoxTag}>⭐ {dummyData.ratingAvg}</div>
          <div className={styles.borderBoxTag}>✏️ {dummyData.count}</div>
        </div>

        <div style={{ margin: "4px" }} />
        <p className={styles.memoTxt}>최근 방문일 : {dummyData.recentDate}</p>
      </div>
    </div>
  );
};

export default TagListItem;
