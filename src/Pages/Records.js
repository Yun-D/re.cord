import React, { useState } from "react";
import FloatingButton from "../Components/FloatingButton";
import { Link } from "react-router-dom";
import RecordItem from "../Components/RecordItem";
import Button from "../Components/Button";

import "./Records.css";
import { ReactComponent as IcnPlus } from "../Assets/add.svg";

const Record = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  //TODO: 데이터 요청 후 바로 setIsEmpty 설정하는 코드 추가

  return (
    <div>
      <h2 className="no-margin">기록</h2>

      {isEmpty ? (
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
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default Record;
