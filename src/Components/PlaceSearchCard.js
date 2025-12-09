import React from "react";
import { ReactComponent as IcnLoca } from "../Assets/pin.svg";
import styles from "../Components/components.module.css";

// 장소검색창 아이템 컴포넌트 (아이콘 + 장소명 + 주소)
const PlaceSearchCard = ({ onClick, place, address }) => {
  return (
    <div className={styles.s_listContainer} onClick={onClick}>
      <IcnLoca className={styles.grayIcon} />
      <div className={styles.textWrapper}>
        <div className="text-subtitle" style={{ margin: 0 }}>
          {place}
        </div>
        <div className="text-plain">{address}</div>
      </div>
    </div>
  );
};

export default PlaceSearchCard;
