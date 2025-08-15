import React, { useEffect, useState } from "react";

import { auth, db } from "../auth/firebase";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth"; //익명로그인, 로그인상태 변경 감지 기능
import { doc, setDoc } from "firebase/firestore"; //문서 참조 생성, 데이터 저장기능
import Button from "../Components/Button";

const Greeting = () => {
  const [nickname, setNickname] = useState(
    "" || localStorage.getItem("nickname")
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 로그인 상태 감지. 로그인,아웃 시 실행
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        //로그인 되었다면 user상태 업데이트
        setUser(currentUser);

        // user.uid 로컬스토리지에 저장
        localStorage.setItem("anonUserid", currentUser.uid);

        // 로그인 된 후 Firestore users/{uid} 에 사용자 정보 저장 (merge: true → 기존 데이터가 있으면 덮어쓰지않고 갱신만)
        if (nickname || localStorage.getItem("nickname")) {
          const finalName = nickname || localStorage.getItem("nickname");
          const userDocRef = doc(db, "users", currentUser.uid);
          await setDoc(
            userDocRef,
            {
              uid: currentUser.uid,
              anonymous: currentUser.isAnonymous,
              nickname: finalName,
              lastLogin: new Date().toISOString(),
            },
            { merge: true }
          );
        }
      } else {
        localStorage.removeItem("anonUserid");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); //클린업. onAuthStateChanged 리스너 제거
  }, [nickname]);

  // 최초 방문자 로그인 함수
  const handleLogin = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    // 로컬스토리지에 닉네임 저장
    localStorage.setItem("nickname", nickname);
    setLoading(true);

    // 익명 로그인 시도
    try {
      await signInAnonymously(auth);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <div>
      <div className="text-title">
        Re-cord! <br />
        기록 시작 전, 당신의 닉네임을 알려주세요.
      </div>

      <input
        type="text"
        placeholder="닉네임을 입력하세요"
        className="textinput"
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value);
        }}
      />

      <Button onClick={handleLogin}>시작하기</Button>
      {user ? (
        <div>
          <p>UID: {user.uid}</p>
          <p>익명 여부: {user.isAnonymous ? "예" : "아니오"}</p>
        </div>
      ) : (
        <p>로그인되지 않음</p>
      )}
    </div>
  );
};

export default Greeting;
