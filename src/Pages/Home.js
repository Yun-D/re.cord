import React, { useState, useEffect } from "react";

import Button from "../Components/Button";
import RecentMemoCard from "../Components/RecentMemoCard";
import FloatingButton from "../Components/FloatingButton";
import { ReactComponent as IcnEdit } from "../Assets/edit.svg";

import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth"; // 로그인상태 변경 감지 기능

const Home = () => {
  const [user, setUser] = useState(null);
  const nickname = localStorage.getItem("nickname");

  const homeBoxStyle = {
    width: "448px",
    height: "246px",
    backgroundColor: "aliceblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const ratingSpreadStyle = {
    width: "448px",
    height: "240px",
    backgroundColor: "aliceblue",
  };

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

    return () => unsubscribe(); //클린업. onAuthStateChanged 리스너 제거
  }, []);

  if (!user) return <div>로딩중...</div>;
  return (
    <div>
      <h2 className="no-margin">{nickname}님, 오늘은 어디로 가볼까요?</h2>

      <div className="content-gap" />
      <div>
        <p className="text-title">최근 추가된 기록</p>

        <div style={homeBoxStyle}>
          <RecentMemoCard />
          <Button>더보기</Button>
        </div>
      </div>
      <div className="content-gap" />
      <div>
        <p className="text-title">평점 분포</p>

        <div style={ratingSpreadStyle} />
      </div>

      <FloatingButton>
        <IcnEdit />
      </FloatingButton>
    </div>
  );
};

export default Home;
