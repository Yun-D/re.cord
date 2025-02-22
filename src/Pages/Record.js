import React from "react";
import FloatingButton from "../Components/FloatingButton";
import { Link } from "react-router-dom";

const Record = () => {
  return (
    <div>
      <h2 className="no-margin">기록</h2>

      <Link to="/addRecord">
        <FloatingButton />
      </Link>
    </div>
  );
};

export default Record;
