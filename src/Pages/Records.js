import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchRecords } from "../firebase/firestore/recordsCRUD";
import RecordCard from "../Components/RecordCard";

import "./Records.css";
import { ReactComponent as IcnPlus } from "../Assets/add.svg";
import Button from "../Components/Button";
import FloatingButton from "../Components/FloatingButton";

const Record = () => {
  const [records, setRecords] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    const user = localStorage.getItem("anonUserid");

    const loadUserRecords = async () => {
      try {
        const data = await fetchRecords(user);
        setRecords(data);
        setIsEmpty(data.length === 0);
        console.log(data);
      } catch (error) {
        console.error("Error fetching records: ", error);
        setIsEmpty(true);
      }
    };

    loadUserRecords();
  }, []);

  if (!records) return <div>로딩중...</div>;
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
            <Link to="/addRecord">
              <Button>기록 시작하기</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="contentArea">
            {records.map((item) => (
              <Link to={`/recordDetail/${item.recordId}`} key={item.recordId}>
                <RecordCard>{item.name}</RecordCard>
              </Link>
            ))}
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
