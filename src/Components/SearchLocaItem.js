import React from "react";
import { ReactComponent as IcnLoca } from "../Assets/pin.svg";
import styles from "../Components/components.module.css";

const SearchLocaItem = ({ onClick }) => {
  return (
    <div className={styles.s_listContainer} onClick={onClick}>
      <IcnLoca className={styles.grayIcon} />
      <div className={styles.textWrapper}>
        <div className="text-subtitle" style={{ margin: 0 }}>
          야옹 가챠
        </div>
        <div className="text-plain">주소주소주소 주소구 주소주로 232</div>
      </div>
    </div>
  );
};

export default SearchLocaItem;
