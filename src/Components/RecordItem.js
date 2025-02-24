import React from "react";
import styles from "../Components/components.module.css";

import { ReactComponent as IcnHeart } from "../Assets/heart.svg";

const RecordItem = ({ children, color }) => {
  //추가된 레코드 아이템 버튼 컴포넌트
  return (
    <div className={styles.vinylContainer}>
      <div className={styles.vinylCase}>
        {/* 레코드 바이닐판 */}
        <div className={styles.vinyl}>
          <div className={styles.vinylDeco1} />
          <div className={styles.vinylDeco2} />
        </div>

        {/* 버튼 영역 */}
        <div className={styles.buttonCover}>
          <button className={styles.albumButton}>
            <IcnHeart className={styles.icon} />
            <div className={styles.label}>{children}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordItem;
