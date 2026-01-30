import {
  doc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  increment,
  getAggregateFromServer,
  average,
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
    "memos",
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
    memoId,
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
  //console.log("Pin added successfully");
}

async function updatePinDesc(userId, recordId, pinId, newPinDesc) {
  const pinRef = getPinDoc(userId, recordId, pinId);

  await updateDoc(pinRef, {
    pinDesc: newPinDesc,
  });
  //console.log("Pin updated successfully");
}

async function deletePin(userId, recordId, pinId) {
  const pinRef = getPinDoc(userId, recordId, pinId);

  try {
    await deleteDoc(pinRef);
    //console.log("Pin deleted successfully");
  } catch (error) {
    console.error("Error deleting pin: ", error);
  }
}

async function fetchPins(userId, recordId) {
  const pinRef = getPinsCollection(userId, recordId);
  const pinSnap = await getDocs(pinRef);

  if (!pinSnap.empty) {
    return pinSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } else {
    //console.log("No such document!");
    return [];
  }
}

// --------------------------------------------------------------------------------------------------
async function updatePinAndRecordStats(
  userId,
  recordId,
  pinId,
  memoCountChange,
) {
  const recordDocRef = doc(db, "users", userId, "records", recordId);
  const pinDocRef = getPinDoc(userId, recordId, pinId);
  const memoRef = getMemosCollection(userId, recordId, pinId);

  const avgSnap = await getAggregateFromServer(memoRef, {
    avgRating: average("rating"),
  });
  const avgRating = Number(avgSnap.data().avgRating.toFixed(2)) || 0;

  // 핀 도큐먼트 업데이트(최근 기록일, 메모 개수, 평균 평점)
  await updateDoc(pinDocRef, {
    lastUpdated: serverTimestamp(),
    memoCount: increment(memoCountChange),
    avgRating,
  });

  // 레코드 도큐먼트 업데이트(전체 메모 개수)
  await updateDoc(recordDocRef, {
    totalMemoCount: increment(memoCountChange),
  });
}

async function addMemo(userId, recordId, pinId, newMemo) {
  const memoRef = getMemosCollection(userId, recordId, pinId);
  const newMemoDocRef = doc(memoRef);

  await setDoc(newMemoDocRef, {
    ...newMemo,
    memoId: newMemoDocRef.id,
  });
  //console.log("Memo added successfully");

  await updatePinAndRecordStats(userId, recordId, pinId, 1);
}

async function fetchMemos(userId, recordId, pinId) {
  const memoRef = getMemosCollection(userId, recordId, pinId);
  const memoSnap = await getDocs(memoRef);

  if (!memoSnap.empty) {
    return memoSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } else {
    //console.log("No such document!");
    return [];
  }
}

async function deleteMemo(userId, recordId, pinId, memoId) {
  const memoRef = getMemoDoc(userId, recordId, pinId, memoId);

  try {
    await deleteDoc(memoRef);
    //console.log(`${memoId} 문서 삭제 완료`);

    await updatePinAndRecordStats(userId, recordId, pinId, -1);
  } catch (error) {
    console.error("메모 삭제 중 오류: ", error);
  }
}

export {
  addPin,
  updatePinDesc,
  deletePin,
  fetchPins,
  addMemo,
  fetchMemos,
  deleteMemo,
};
