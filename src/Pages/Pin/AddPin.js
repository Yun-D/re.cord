import React from "react";
import styles from "../../Components/components.module.css";
import "../Record.css";

import { ReactComponent as IcnSearch } from "../../Assets/search.svg";
import SearchLocaItem from "../../Components/SearchLocaItem";

const AddPin = () => {
  return (
    <>
      <div className={styles.borderBox}>
        <div className="row-direction">
          <IcnSearch />
          <input
            type="text"
            placeholder=" 기억하고싶은 장소를 검색하세요."
            className="textinput"
          />
        </div>
      </div>

      <div className="content-gap" />
      <SearchLocaItem />
      <SearchLocaItem />
    </>
  );
};

export default AddPin;
