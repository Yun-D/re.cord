import React, { useEffect, useState } from "react";
import FloatingButton from "../../Components/FloatingButton";

import { ReactComponent as IcnFolder } from "../../Assets/folder.svg";
import { ReactComponent as IcnEdit } from "../../Assets/edit.svg";
import "./RecordDetail.css";
import { Link, useParams } from "react-router-dom";
import { fetchRecords } from "../../firebase/firestore/recordsCRUD";

const RecordDetail = () => {
  const dummy = {
    //FIXME: 실제 데이터로 변경해야함
    pinCount: 2,
    memoCount: 3,
  };

  const [isEmpty, setIsEmpty] = useState(true);
  const [currRecord, setCurrRecords] = useState([]); // 현재 레코드 정보
  const [pins, setPins] = useState([]);

  const { recordId } = useParams();
  useEffect(() => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    const user = localStorage.getItem("anonUserid");

    const loadUserRecords = async () => {
      try {
        const data = await fetchRecords(user);
        const record = data.find((item) => item.recordId === recordId);
        setCurrRecords(record);
        console.log(record);
        if (record && record.pins.length > 0) {
          setIsEmpty(false);
          setPins(record.pins);
          console.log("핀 목록 : ", pins);
        } else {
          setPins([]);
        }
      } catch (error) {
        console.error("Error fetching records: ", error);
        setIsEmpty(true);
        setPins([]); // 에러 시 핀 배열 초기화
      }
    };

    loadUserRecords();
  }, [recordId]);

  return (
    <div>
      {/* 상단, 레코드 정보 부분 영역 */}
      <div className="row-direction">
        <div className="title-container">
          <IcnFolder className="d-icon" />
          <p className="title">{currRecord.name}</p>
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
