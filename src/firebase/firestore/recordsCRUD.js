import {
  doc,
  collection,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

async function addRecord(userId, newRecord) {
  const recordsRef = collection(db, "users", userId, "records"); // 사용자별 records 서브컬렉션 참조
  const newRecordDocRef = doc(recordsRef);

  await setDoc(newRecordDocRef, {
    ...newRecord,
    recordId: newRecordDocRef.id,
  });
  //console.log("Record added successfully");
}

async function updateRecordName(userId, recordId, newRecordName) {
  const recordRef = doc(db, "users", userId, "records", recordId);

  await updateDoc(recordRef, {
    name: newRecordName,
  });

  //console.log("Record updated successfully");
}

async function deleteRecord(userId, recordId) {
  const recordRef = doc(db, "users", userId, "records", recordId);

  try {
    await deleteDoc(recordRef);
    //console.log("Record deleted successfully");
  } catch (error) {
    //console.error("Error deleting record: ", error);
  }
}

async function fetchRecords(userId) {
  const recordsRef = collection(db, "users", userId, "records");
  const recordSnap = await getDocs(recordsRef);

  if (!recordSnap.empty) {
    return recordSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } else {
    //console.log("No such document!");
    return [];
  }
}

export { addRecord, updateRecordName, deleteRecord, fetchRecords };
