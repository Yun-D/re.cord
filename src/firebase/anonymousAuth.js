import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import app from "./firebase"; // 위에서 만든 Firebase 초기화 파일

const auth = getAuth(app);

// 익명 로그인 시도
const signInAsAnonymous = () => {
  signInAnonymously(auth)
    .then(() => {
      console.log("익명 로그인 성공");
    })
    .catch((error) => {
      console.error("익명 로그인 오류:", error.code, error.message);
    });
};

// 로그인 상태 감지
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user.isAnonymous) {
      console.log("익명 사용자 ID:", user.uid);
      // 여기에 사용자별 데이터 연동 코드 추가
    } else {
      console.log("로그인된 사용자:", user.uid);
    }
  } else {
    console.log("로그아웃 상태");
  }
});

// 페이지나 앱 시작 시 실행
signInAsAnonymous();
