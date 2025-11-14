import React from "react";
import styles from "./components.module.css";
import ImageFrame from "./ImageFrame";

const TagListItem = ({ shop, lastUpdated, ratingAvg, memoCount }) => {
  return (
    <div className={`${styles.listItem} ${styles.tagItemBtn}`}>
      <ImageFrame />
      <div className={styles.textArea}>
        <h3 className={styles.dataTxt}>{shop}</h3>

        <div
          style={{
            flexDirection: "row",
            display: "flex",
            gap: 12,
            width: "25vh",
          }}
        >
          <div className={styles.borderBoxTag}>⭐ {ratingAvg}</div>
          <div className={styles.borderBoxTag}>✏️ {memoCount}</div>
        </div>

        <div style={{ margin: "4px" }} />
        <p className={styles.memoTxt}>최근 기록일 : {lastUpdated}</p>
      </div>
    </div>
  );
};

export default TagListItem;
