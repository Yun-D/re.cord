import React from "react";
import FloatingButton from "../Components/FloatingButton";
import { Link } from "react-router-dom";
import RecordItem from "../Components/RecordItem";

import "./Record.css";
import { ReactComponent as IcnPlus } from "../Assets/add.svg";

const Record = () => {
  return (
    <div>
      <h2 className="no-margin">기록</h2>

      <div className="contentArea">
        <Link to="/recordDetail">
          <RecordItem>홍대 가차샵</RecordItem>
        </Link>
      </div>

      <Link to="/addRecord">
        <FloatingButton>
          <IcnPlus />
        </FloatingButton>
      </Link>
    </div>
  );
};

export default Record;
