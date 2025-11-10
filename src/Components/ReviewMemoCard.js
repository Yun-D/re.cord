import React from "react";
import styles from "./components.module.css";

const ReviewMemoCard = ({ date, title, review, rating }) => {
  return (
    <div className={styles.r_listContainer}>
      <div
        style={{
          width: "72px",
          height: "72px",
          flexShrink: 0,
          border: `var(--border-size) solid var(--color-line-black)`,
        }}
        //사진 영역
      />

      <div
        style={{ flexDirection: "column", marginLeft: "15px", width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h4 className={styles.dataTxt}>{date}</h4>
            <h4 className={styles.dataTxt}>{title}</h4>
          </div>

          <div
            className={styles.borderBoxTag}
            style={{ width: "70px", height: "33px" }}
          >
            ⭐ {rating}
          </div>
        </div>

        <p className={styles.r_memoTxt}>{review}</p>
      </div>
    </div>
  );
};

export default ReviewMemoCard;
