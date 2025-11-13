import {
  doc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

async function addPin(userId, newPin, recordId) {
  const pinsRef = collection(db, "users", userId, "records", recordId, "pins"); // 사용자별 pins 서브컬렉션 참조
  const newPinDocRef = doc(pinsRef);

  await setDoc(newPinDocRef, {
    ...newPin,
    pinId: newPinDocRef.id,
  });
  console.log("Pin added successfully");
}

async function fetchPins(userId, recordId) {
  const recordsRef = collection(
    db,
    "users",
    userId,
    "records",
    recordId,
    "pins"
  );
  const recordSnap = await getDocs(recordsRef);

  if (!recordSnap.empty) {
    return recordSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } else {
    console.log("No such document!");
    return [];
  }
}

async function addMemo(userId, recordId, pinId, newMemo) {
  const memoRef = collection(
    db,
    "users",
    userId,
    "records",
    recordId,
    "pins",
    pinId,
    "memos"
  );
  const newMemoDocRef = doc(memoRef);

  await setDoc(newMemoDocRef, {
    ...newMemo,
    memoId: newMemoDocRef.id,
  });
  console.log("Memo added successfully");

  const pinDocRef = doc(
    db,
    "users",
    userId,
    "records",
    recordId,
    "pins",
    pinId
  );
  await updateDoc(pinDocRef, {
    lastUpdated: serverTimestamp(),
  });
}

async function fetchMemos(userId, recordId, pinId) {
  const memoRef = collection(
    db,
    "users",
    userId,
    "records",
    recordId,
    "pins",
    pinId,
    "memos"
  );
  const memoSnap = await getDocs(memoRef);

  if (!memoSnap.empty) {
    return memoSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } else {
    console.log("No such document!");
    return [];
  }
}

async function deleteMemo(userId, recordId, pinId, memoId) {
  const memoRef = doc(
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

  try {
    await deleteDoc(memoRef);
    console.log(`${memoId} 문서 삭제 완료`);
  } catch (error) {
    console.error("메모 삭제 중 오류: ", error);
  }
}

export { addPin, fetchPins, addMemo, fetchMemos, deleteMemo };
