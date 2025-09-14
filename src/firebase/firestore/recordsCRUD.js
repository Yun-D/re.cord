import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase";

async function addRecord(userId, newRecord) {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, {
    records: arrayUnion(newRecord),
  });
  console.log("Record added successfully");
}

async function fetchRecords(userId) {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data().records || [];
  } else {
    console.log("No such document!");
    return [];
  }
}

export { addRecord, fetchRecords };
