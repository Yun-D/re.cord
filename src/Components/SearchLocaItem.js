import React from "react";
import { ReactComponent as IcnLoca } from "../Assets/pin.svg";
import styles from "../Components/components.module.css";

const SearchLocaItem = ({ onClick, place, address }) => {
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

export default SearchLocaItem;
