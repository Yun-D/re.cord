import { doc, collection, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

async function addRecord(userId, newRecord) {
  const recordsRef = collection(db, "users", userId, "records"); // 사용자별 records 서브컬렉션 참조
  const newRecordDocRef = doc(recordsRef);

  await setDoc(newRecordDocRef, {
    ...newRecord,
    recordId: newRecordDocRef.id,
  });
  console.log("Record added successfully");
}

async function fetchRecords(userId) {
  const recordsRef = collection(db, "users", userId, "records");
  const recordSnap = await getDocs(recordsRef);

  if (!recordSnap.empty) {
    return recordSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } else {
    console.log("No such document!");
    return [];
  }
}

export { addRecord, fetchRecords };
