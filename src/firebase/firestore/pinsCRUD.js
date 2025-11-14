import {
  doc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";

// 컬렉션, 도큐먼트 참조 함수들 ------------------------------------------------------------------------
// 사용자별 pins 서브컬렉션 참조
function getPinsCollection(userId, recordId) {
  return collection(db, "users", userId, "records", recordId, "pins");
}

// 특정 핀 도큐먼트 참조
function getPinDoc(userId, recordId, pinId) {
  return doc(db, "users", userId, "records", recordId, "pins", pinId);
}

// 사용자별 memos 서브컬렉션 참조
function getMemosCollection(userId, recordId, pinId) {
  return collection(
    db,
    "users",
    userId,
    "records",
    recordId,
    "pins",
    pinId,
    "memos"
  );
}

// 특정 메모 도큐먼트 참조
function getMemoDoc(userId, recordId, pinId, memoId) {
  return doc(
    db,
    "users",
    userId,
    "records",
    recordId,
    "pins",
    pinId,
    "memos",
    memoId
  );
}
// --------------------------------------------------------------------------------------------------

async function addPin(userId, newPin, recordId) {
  const pinsRef = getPinsCollection(userId, recordId);
  const newPinDocRef = doc(pinsRef);

  await setDoc(newPinDocRef, {
    ...newPin,
    pinId: newPinDocRef.id,
  });
  console.log("Pin added successfully");
}

async function fetchPins(userId, recordId) {
  const pinRef = getPinsCollection(userId, recordId);
  const pinSnap = await getDocs(pinRef);

  if (!pinSnap.empty) {
    return pinSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } else {
    console.log("No such document!");
    return [];
  }
}

async function addMemo(userId, recordId, pinId, newMemo) {
  const memoRef = getMemosCollection(userId, recordId, pinId);
  const newMemoDocRef = doc(memoRef);

  await setDoc(newMemoDocRef, {
    ...newMemo,
    memoId: newMemoDocRef.id,
  });
  console.log("Memo added successfully");

  const pinDocRef = getPinDoc(userId, recordId, pinId);
  await updateDoc(pinDocRef, {
    lastUpdated: serverTimestamp(),
    memoCount: increment(1),
  });
}

async function fetchMemos(userId, recordId, pinId) {
  const memoRef = getMemosCollection(userId, recordId, pinId);
  const memoSnap = await getDocs(memoRef);

  if (!memoSnap.empty) {
    return memoSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } else {
    console.log("No such document!");
    return [];
  }
}

async function deleteMemo(userId, recordId, pinId, memoId) {
  const memoRef = getMemoDoc(userId, recordId, pinId, memoId);

  try {
    await deleteDoc(memoRef);
    console.log(`${memoId} 문서 삭제 완료`);

    const pinDocRef = getPinDoc(userId, recordId, pinId);
    await updateDoc(pinDocRef, {
      memoCount: increment(-1),
    });
  } catch (error) {
    console.error("메모 삭제 중 오류: ", error);
  }
}

export { addPin, fetchPins, addMemo, fetchMemos, deleteMemo };
