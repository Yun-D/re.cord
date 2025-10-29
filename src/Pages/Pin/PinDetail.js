import React, { useEffect, useState } from "react";

import { ReactComponent as IcnFolder } from "../../Assets/folder_open.svg";
import { ReactComponent as IcnEdit } from "../../Assets/edit.svg";
import { Link, useLocation } from "react-router-dom";
import { fetchRecords } from "../../firebase/firestore/recordsCRUD";
import "../RecordDetail/RecordDetail.css";
import FloatingButton from "../../Components/FloatingButton";

const PinDetail = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currRecordName, setCurrRecordName] = useState(""); // 현재 레코드 이름

  const location = useLocation();
  const pinData = location.state.currPin;

  useEffect(() => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    const user = localStorage.getItem("anonUserid");

    const loadUserMemos = async () => {
      try {
        setLoading(true);

        const data = await fetchRecords(user); // 모든 레코드 불러오기
        const recordId = pinData.recordId;
        const currRecord = data.find((item) => item.recordId === recordId);
        setCurrRecordName(currRecord.name);

        console.log("currRecord", pinData);

        if (location.length > 0) {
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }
      } catch (error) {
        console.error("Error fetching pins: ", error);
        setIsEmpty(true);
      } finally {
        setLoading(false);
      }
    };

    loadUserMemos();
  }, [location, pinData]);

  if (loading) return <div>로딩중...</div>;
  return (
    <div>
      <div className="row-direction">
        <div className="title-container">
          <IcnFolder className="d-icon" />
          <p className="title">
            {currRecordName} / {pinData.place_name}
          </p>
        </div>
      </div>
      <div
        style={{
          border: "1px solid black",
          width: "100%",
          height: "64px",
          marginTop: "8px",
          padding: "10px",
          overflow: "auto",
          wordWrap: "break-word",
        }}
      >
        {pinData.pinDesc}
      </div>

      {isEmpty ? (
        <div className="container">
          <div className="content-align">
            <p>
              저장된 메모가 없어요.
              <br />
              버튼을 눌러 나의 재방문 기록을 추가해보세요.
            </p>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <Link
        to="/addMemo"
        state={{
          place_name: pinData.place_name,
          address: pinData.address,
          pinId: pinData.pinId,
        }}
      >
        <FloatingButton>
          <IcnEdit />
        </FloatingButton>
      </Link>
    </div>
  );
};

export default PinDetail;
