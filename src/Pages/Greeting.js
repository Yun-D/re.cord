import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase/firebase";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; //문서 참조 생성, 데이터 저장기능

import "./Greeting.css";
import Button from "../Components/Button";

const Greeting = () => {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 최초 방문자 로그인 함수
  const handleLogin = async () => {
    if (!nickname.trim()) {
      // 닉네임이 비어있거나 공백만 있는 경우
      alert("닉네임을 입력해주세요.");
      return;
    }

    // 익명 로그인 시도
    try {
      setLoading(true);
      localStorage.setItem("nickname", nickname); // 로컬스토리지에 닉네임 저장

      const cred = await signInAnonymously(auth); // 익명 로그인 시도, 사용자 인증 정보 획득

      // Firestore에 사용자 정보 저장
      const userDocRef = doc(db, "users", cred.user.uid);
      await setDoc(
        userDocRef,
        {
          uid: cred.user.uid,
          anonymous: cred.user.isAnonymous,
          nickname: nickname,
          lastLogin: new Date().toISOString(),
        },
        { merge: true }
      );

      navigate("/home"); // 로그인 후 홈으로 이동
    } catch (err) {
      console.error("로그인 오류: ", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="content-gap" />
      <div className="text-title">
        Re-cord! <br />
        기록 시작 전, 당신의 닉네임을 알려주세요.
      </div>
      <div className="content-gap" />

      <div className="center">
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          className="input_box"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />

        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "로그인 중..." : "시작하기"}
        </Button>
      </div>

      <div className="shapes">
        <div className="shape close" />
        <div className="shape burst" />
        <div className="shape sparkle" />
      </div>
    </div>
  );
};

export default Greeting;
