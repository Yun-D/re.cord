import { doc, collection, setDoc, getDocs } from "firebase/firestore";
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

export { addPin, fetchPins };
