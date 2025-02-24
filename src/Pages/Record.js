import React from "react";
import FloatingButton from "../Components/FloatingButton";
import { Link } from "react-router-dom";
import RecordItem from "../Components/RecordItem";

import "./Record.css";

const Record = () => {
  return (
    <div>
      <h2 className="no-margin">기록</h2>

      <div className="contentArea">
        <RecordItem>홍대 가차샵</RecordItem>
      </div>

      <Link to="/addRecord">
        <FloatingButton />
      </Link>
    </div>
  );
};

export default Record;
