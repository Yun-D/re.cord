import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

async function addRecord(userId, newRecord) {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, {
    records: arrayUnion(newRecord),
  });
  console.log("Record added successfully");
}

export { addRecord };
