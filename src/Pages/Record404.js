import React from "react";
import Button from "../Components/Button";
import "./Record.css";

const Record404 = () => {
  return (
    <div>
      <h2 className="no-margin">기록</h2>

      <div className="container">
        <div className="content-align">
          <p>
            저장된 레코드가 없어요.
            <br />
            만들어볼까요?
          </p>
          <Button>기록 시작하기</Button>
        </div>
      </div>
    </div>
  );
};

export default Record404;
