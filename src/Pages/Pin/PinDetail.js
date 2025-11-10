import React, { useEffect, useState } from "react";

import { ReactComponent as IcnFolder } from "../../Assets/folder_open.svg";
import { ReactComponent as IcnEdit } from "../../Assets/edit.svg";
import { Link, useParams } from "react-router-dom";
import { fetchRecords } from "../../firebase/firestore/recordsCRUD";
import "../RecordDetail/RecordDetail.css";
import FloatingButton from "../../Components/FloatingButton";
import { fetchMemos, fetchPins } from "../../firebase/firestore/pinsCRUD";
import ReviewMemoCard from "../../Components/ReviewMemoCard";

const PinDetail = () => {
  const params = useParams();

  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(false);

  const [currRecordName, setCurrRecordName] = useState(""); // 현재 레코드 이름
  const [pinData, setPinData] = useState("");
  const [pinMemos, setPinMemos] = useState(null);

  useEffect(() => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    const user = localStorage.getItem("anonUserid");

    const loadUserMemos = async () => {
      try {
        setLoading(true);

        // 레코드 데이터 페칭 FIXME: 나중에 이부분은 리팩토링 필요(중복제거)
        const rData = await fetchRecords(user); // 모든 레코드 불러오기
        const recordId = params.recordId;
        const currRecord = rData.find((item) => item.recordId === recordId);
        setCurrRecordName(currRecord.name);

        // 핀 데이터 페칭
        const pData = await fetchPins(user, recordId); // 현재 레코드의 핀 불러오기
        const currPin = pData.find((item) => item.pinId === params.pinId);
        setPinData(currPin);

        // 메모 데이터 페칭
        const memoData = await fetchMemos(user, recordId, currPin.pinId);
        setPinMemos(memoData);
        console.log("memos", pinMemos, memoData);

        if (memoData.length > 0) {
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
  }, []);

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
        <div style={{ marginTop: "48px" }}>
          {pinMemos.map((item) => (
            <ReviewMemoCard
              key={item.memoId}
              date={item.date}
              title={item.title}
              review={item.review}
              rating={item.rating}
            />
          ))}
        </div>
      )}

      <Link
        to="/addMemo"
        state={{
          place_name: pinData.place_name,
          address: pinData.address,
          recordId: pinData.recordId,
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
