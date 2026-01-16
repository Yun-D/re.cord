import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth"; // 로그인상태 변경 감지 기능
import { fetchRecords } from "../firebase/firestore/recordsCRUD";
import RecordCard from "../Components/RecordCard";

import "./Records.css";
import { ReactComponent as IcnPlus } from "../Assets/add.svg";
import Button from "../Components/Button";
import FloatingButton from "../Components/FloatingButton";

const Record = () => {
  const [user, setUser] = useState(null);
  // const nickname = localStorage.getItem("nickname");
  const [records, setRecords] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {}, []);

  useEffect(() => {
    // 로그인 상태 감지. 로그인,아웃 시 실행
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        localStorage.removeItem("anonUserid"); // 로그인 되지 않았다면 로컬스토리지에서 익명 사용자 ID 제거
        localStorage.removeItem("nickname"); // 로컬스토리지에서 닉네임 제거
      } else {
        localStorage.setItem("anonUserid", currentUser.uid); // user.uid 로컬스토리지에 저장
        setUser(currentUser); //로그인 되었다면 user상태 업데이트
      }
    });

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
    return () => unsubscribe(); //클린업. onAuthStateChanged 리스너 제거
  }, []);

  if (!records && !user) return <div>로딩중...</div>;
  return (
    <div>
      {/* <h3 className="no-margin">{nickname}님, 오늘은 어디로 가볼까요?</h3>
      <div className="content-gap" /> */}

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
