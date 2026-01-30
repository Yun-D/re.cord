import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Greeting.css";
import Button from "../Components/Button";
import { signInWithNickname } from "../firebase/auth";

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

    try {
      setLoading(true);
      localStorage.setItem("nickname", nickname); //로컬스토리지에 닉네임 저장

      await signInWithNickname(nickname);
      navigate("/record"); //로그인 후 레코드 페이지(메인)로 이동
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
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
