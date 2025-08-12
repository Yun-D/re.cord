import React, { useState } from "react";
import FloatingButton from "../../Components/FloatingButton";

import { ReactComponent as IcnFolder } from "../../Assets/folder.svg";
import { ReactComponent as IcnEdit } from "../../Assets/edit.svg";
import "./RecordDetail.css";
import { Link } from "react-router-dom";

const RecordDetail = ({ title }) => {
  const dummy = {
    //FIXME: 실제 데이터로 변경해야함
    pinCount: 2,
    memoCount: 3,
  };

  const [isEmpty, setIsEmpty] = useState(true);
  //TODO: 데이터 요청 후 바로 setIsEmpty 설정하는 코드 추가

  return (
    <div>
      {/* 상단, 레코드 정보 부분 영역 */}
      <div className="row-direction">
        <div className="title-container">
          <IcnFolder className="d-icon" />
          <p className="title">홍대 가차샵</p>
        </div>

        <div className="dataSummary">
          <p className="d-icon-sm">📍</p>
          <p className="no-margin">{dummy.pinCount}</p>
          <p className="d-icon-sm">✏️</p>
          <p className="no-margin">{dummy.memoCount}</p>
        </div>
      </div>
      {/* -------------------- */}

      {isEmpty ? (
        <div className="container">
          <div className="content-align">
            <p>
              저장된 장소가 없어요.
              <br />
              버튼을 눌러 핀을 추가해볼까요?
            </p>
          </div>
        </div>
      ) : (
        <div> </div>
      )}

      <Link to="/addPin">
        <FloatingButton>
          <IcnEdit />
        </FloatingButton>
      </Link>
    </div>
  );
};

export default RecordDetail;
