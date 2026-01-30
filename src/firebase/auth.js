import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "./firebase";

const auth = getAuth(app);

// 앱 시작 시 인증 상태 확인 (자동 로그인 유지)
export const checkAuthState = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // 한 번만 확인
      resolve(user); // user 있으면 user, 없으면 null
    });
  });
};

// 익명 로그인 + Firestore 저장 (Greeting에서 사용)
export const signInWithNickname = async (nickname) => {
  try {
    const cred = await signInAnonymously(auth);

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
      { merge: true },
    );

    return cred.user;
  } catch (error) {
    console.error("로그인 오류:", error);
    throw error;
  }
};

// 현재 유저 가져오기
export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getCurrentUserId = () => {
  const user = auth.currentUser;
  return user ? user.uid : null;
};

export { auth };
